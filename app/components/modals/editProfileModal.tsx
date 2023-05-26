"use client";

import Modal from "./modal";
import React, {
  useState,
  useMemo
} from "react";
import Heading from "../heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/imageUpload";
import Input from "../inputs/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "../../types";
import useEditProfileModal from "../../hooks/useEditProfileModal";
import AvatarUpload from "../inputs/avatarUpload";

interface IEditProfileModalProps {
  currentUser?: SafeUser | null;
}

const EditProfileModal: React.FC<IEditProfileModalProps> = ({ currentUser }) => {
  const router = useRouter();
  const editProfileModal = useEditProfileModal();
  let customFolderName = "sherwin";
  if (currentUser) {
    customFolderName = currentUser.id;
  }

  enum STEPS {
    IMAGES = 1,
    CAPTION = 2,
  }

  const [step, setStep] = useState(STEPS.IMAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesTracker, setImagesTracker] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      image: "",
      title: "",
      caption: "",
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

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.CAPTION) {
      return onNext();
    }

    setIsLoading(true);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CAPTION) {
      return "Create";
    }
    return "Next";
  }, [step, STEPS.CAPTION]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return undefined;
    }
    return "Back";
  }, [step, STEPS.IMAGES]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Upload your avatar"
      />
      <AvatarUpload
        value={images}
        onChange={(value) => setCustomValue("image", value)}
        folderName={customFolderName}
        trackedImage={imagesTracker}
      />
    </div>
  );

  if (step === STEPS.CAPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Write a title and caption for your post!"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="caption"
          label="caption"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Edit Profile"
      isOpen={editProfileModal.isOpen}
      onClose={editProfileModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.IMAGES ? undefined : onBack}
      body={bodyContent}
      disabled={images.length === 0}
    />
  );
};

export default EditProfileModal;
