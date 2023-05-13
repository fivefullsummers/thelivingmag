"use client";

import Modal from "./modal";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Heading from "../heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/imageUpload";
import Input from "../inputs/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import usePostModal from "../../hooks/usePostModal";

const PostModal = () => {
  const router = useRouter();
  const postModal = usePostModal();

  enum STEPS {
    IMAGES = 1,
    CAPTION = 2,
  }

  const [step, setStep] = useState(STEPS.IMAGES);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      images: [""],
      title: "",
      caption: "",
    },
  });

  const images = watch("images");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
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

    axios
      .post("/api/posts", data)
      .then(() => {
        toast.success("Post Created!");
        router.refresh();
        reset();
        setStep(STEPS.IMAGES);
        postModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CAPTION) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add your work!"
        subtitle="You can upload up to 5 photos."
      />
      <ImageUpload
        value={images}
        onChange={(value) => setCustomValue("images", value)}
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
      title="Post a project"
      isOpen={postModal.isOpen}
      onClose={postModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.IMAGES ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default PostModal;
