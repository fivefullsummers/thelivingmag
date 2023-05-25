"use client";

import { useCallback, useState } from "react";
import Modal from "./modal";
import Heading from "../heading";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useRoleModal from "../../hooks/useRoleModal";
import usePostModal from "../../hooks/usePostModal";
import Image from "next/image";
import { Role } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

export type RoleCard = {
  title: Role;
  subtitle?: string;
  image?: string;
} | null;

const RoleModal = () => {
  const router = useRouter();
  const roleModal = useRoleModal();
  const postModal = usePostModal();
  const [selectedRole, setSelectedRole] = useState<RoleCard>();
  const [role, setRole] = useState("READER");

  const onSubmit = useCallback(async () => {
    try {
      if (selectedRole?.title === "PHOTOGRAPHER") {
        await axios
          .patch("/api/user/createPhotographer")
          .catch((err) => {
            toast.error("error creating role");
            return;
          })
          .then(() => {
            toast.success("created role");
          });
      }
      if (selectedRole?.title === "MODEL") {
        await axios
          .patch("/api/user/createModel")
          .catch((err) => {
            toast.error("error creating role");
            return;
          })
          .then(() => {
            toast.success("created role");
          });
      }
      toggle();
    } catch (error) {
      console.log(error);
    }
  }, [router, selectedRole?.title]);

  const toggle = useCallback(() => {
    roleModal.onClose();
    postModal.onOpen();
  }, [roleModal, postModal]);

  const toggleRole = (selectedRole: string) => {
    console.log("role toggle run");
    if (selectedRole === "PHOTOGRAPHER") {
      console.log("role Photographer toggled");
      setSelectedRole(RoleObject.find((role) => selectedRole === role?.title));
    } else if (selectedRole== "MODEL") {
      console.log("role model toggled");
      setSelectedRole(RoleObject.find((role) => selectedRole === role?.title));
    } else {
      console.log("role null toggled");
      setSelectedRole(null);
    }
  };

  const RoleObject: RoleCard[] = [
    {
      title: "PHOTOGRAPHER",
      subtitle: "I am a Photographer",
      image: "/images/photographer_bag.jpg",
    },
    {
      title: "MODEL",
      subtitle: "I am a Model",
      image: "/images/model_role.jpg",
    },
  ];

  const bodyContent = (
    <div className="flex flex-col col-span-1 gap-4">
      <Heading title="Select Your Role" subtitle="What do you do?" />
      <div className="flex justify-center gap-4">
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            toggleRole(e.target.value);
          }}
          className="select select-bordered select-lg w-full max-w-xs font-sans"
        >
          <option value="Select a role" defaultValue="Select a role">
            Select a role
          </option>
          <option value="PHOTOGRAPHER">Photographer</option>
          <option value="MODEL">Model</option>
        </select>
      </div>
      <div className="flex justify-center gap-4 pt-8">
        <AnimatePresence mode="wait">
          {selectedRole && (
            <motion.div
              className="card card-compact w-96 h-[500px] bg-base-100 shadow-xl"
              key={selectedRole?.title}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, type: "spring", bounce: 0.25 },
              }}
            >
              <figure>
                <Image
                  priority
                  style={{
                    objectFit: "cover",
                  }}
                  width={500}
                  height={500}
                  src={selectedRole?.image || ""}
                  alt={selectedRole?.title || "role"}
                />
              </figure>
              <div className="card-body">
                <div className="card-title">{selectedRole?.title}</div>
                <div>{selectedRole?.subtitle}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={!selectedRole?.title}
      isOpen={roleModal.isOpen}
      title="Role"
      actionLabel="Submit"
      onClose={roleModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default RoleModal;
