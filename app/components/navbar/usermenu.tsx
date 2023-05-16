"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./menuitem";

import useRegisterModal from "./../../hooks/useRegisterModal";
import useLoginModal from "./../../hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import usePostModal from "../../hooks/usePostModal";

interface IUserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const postModal = usePostModal()
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onPost = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    //Open Rent Modal
    postModal.onOpen();
  }, [currentUser, loginModal, postModal]);

  const routeThenCloseMenu = useCallback((route: string) => {
    router.push(route);
    toggleOpen();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
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
            py-3
            px-4
            rounded-full
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
            p-4
            md:py-1
            md:px-2
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
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => routeThenCloseMenu("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => routeThenCloseMenu("/favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => routeThenCloseMenu("/reservations")}
                  label="My reservations"
                />
                <MenuItem onClick={() => routeThenCloseMenu("/properties")} label="My properties" />
                <MenuItem
                  onClick={() => postModal.onOpen()}
                  label="Upload"
                />
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
        </div>
      )}
    </div>
  );
};

export default UserMenu;
