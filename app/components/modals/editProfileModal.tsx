"use client";

import Modal from "./modal";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/input";
import { SafeUser } from "../../types";
import useEditProfileModal from "../../hooks/useEditProfileModal";
import AvatarUpload from "../inputs/avatarUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IEditProfileModalProps {
  currentUser?: SafeUser | null;
}

const EditProfileModal: React.FC<IEditProfileModalProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const editProfileModal = useEditProfileModal();
  let customFolderName = "sherwin";
  if (currentUser) {
    customFolderName = currentUser.id;
  }

  const [imagesTracker, setImagesTracker] = useState<string | undefined>();
  const DEFAULT_ROLE = "Select a role";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      image: currentUser?.image,
      name: currentUser?.name,
      email: currentUser?.email,
      bio: currentUser?.bio,
      role: currentUser?.role,
    },
  });

  const images = watch("image");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    if (id === "image") {
      console.log("avatar image:", value);
      setImagesTracker(value);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log("data in edit", data);

      await axios
        .put("/api/user", data)
        .then(() => {
          toast.success("Profile Updated");
          reset();
          router.refresh();
          editProfileModal.onClose();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    } catch (error) {
      console.log(error);
    }
  };

  let bodyContent = (
    <div className="flex flex-col gap-3 overflow-y-scroll">
      <h1 className="font-semibold text-neutral-800 text-center">
        upload avatar
      </h1>
      <AvatarUpload
        value={images}
        onChange={(value) => setCustomValue("image", value)}
        folderName={customFolderName}
        trackedImage={imagesTracker || (currentUser?.image as string)}
      />
      <div className="flex flex-col h-56 w-full gap-4">
        <Input
          id="name"
          label={"Username"}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="email"
          label={"Email"}
          register={register}
          disabled={true}
          errors={errors}
          required
        />
        <Input id="bio" label={"Bio"} register={register} errors={errors} />
        <div className="flex justify-start">
          <select
            {...register("role")}
            defaultValue={currentUser?.role}
            className="select select-bordered select-md w-full max-w-xs font-sans rounded-md"
          >
            <option value={DEFAULT_ROLE} disabled>
              Select a role
            </option>
            <option value="PHOTOGRAPHER">Photographer</option>
            <option value="MODEL">Model</option>
            <option value="READER">Reader</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Edit Profile"
      isOpen={editProfileModal.isOpen}
      onClose={editProfileModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Save"
      body={bodyContent}
      disabled={false}
    />
  );
};

export default EditProfileModal;
