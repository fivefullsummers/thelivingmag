"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./menuitem";

import useRegisterModal from "./../../hooks/useRegisterModal";
import useLoginModal from "./../../hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import usePostModal from "../../hooks/usePostModal";
import useRoleModal from "../../hooks/useRoleModal";
import { motion } from "framer-motion";

interface IUserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const roleModal = useRoleModal();
  const postModal = usePostModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [setIsOpen]);

  const onPost = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    if (currentUser?.role === "READER") {
      roleModal.onOpen();
    } else {
      postModal.onOpen();
    }

    //Open Post Modal
  }, [currentUser, loginModal, postModal, roleModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flow-row items-center gap-3">
        <div
          onClick={onPost}
          className="
            hidden
            md:flex
            flex-row
            text-sm
            font-semibold
            py-2
            px-3
            rounded-full
            outline
            outline-1
            outline-neutral-300
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Upload
        </div>
        <div
          onClick={toggleOpen}
          className="
            py-1
            px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            hover
            cursor-pointer
            hover:shadow-md
            transition
          ">
          { !isOpen ? 
          <AiOutlineMenu /> :
          <AiOutlineClose /> 
          }
          <div className="block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      

      {isOpen && (
        <motion.div 
          animate={{
            scale: 1
          }}
          initial={{
            scale: 0.5
          }}
          exit={{
            scale: 0.5
          }}
          transition={{
            type: "spring",
            stiffness: 1000,
            damping: 20
          }}
          className="absolute z-10 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => toggleOpen}
                  label="My Profile"
                  route={`/profile/${currentUser.id}`}
                  isLink={true}
                />
                <MenuItem onClick={() => onPost()} label="Upload" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserMenu;
