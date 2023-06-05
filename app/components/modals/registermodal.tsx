"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import { toast } from "react-hot-toast";
import Button from "../button";
import { signIn } from 'next-auth/react';
import useLoginModal from './../../hooks/useLoginModal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const onShowConfirmedPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("success");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(()=>{
    registerModal.onClose();
    loginModal.onOpen();
  },[loginModal, registerModal]);
  

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Wouldaposed!" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        extraOptions={{pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "invalid email address"
        }}}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Username"
        disabled={isLoading}
        register={register}
        errors={errors}
        extraOptions={{pattern: {
          value: /^[a-zA-Z0-9_-]+(?: [a-zA-Z0-9_-]+)*$/,
          message: "Username can only include letters, numbers, underscores, and hyphens"
        }}}
        required
      />
      <Input
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        disabled={isLoading}
        register={register}
        extraOptions={{pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: "Password must be at least 8 characters with lowercase, uppercase, digit, and special character."
        }}}
        errors={errors}
        required
        viewPassword={showPassword}
        onShowPassword={onShowPassword}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type={showConfirmedPassword ? "text" : "password"}
        disabled={isLoading}
        register={register}
        extraOptions={{
          pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: "Password must be at least 8 characters with lowercase, uppercase, digit, and special character."
        },
        validate: (val: string) => {
          if (val === password) {
            return true;
          }
          return "Passwords do not match";
        }
      }}
        errors={errors}
        required
        viewPassword={showConfirmedPassword}
        onShowPassword={onShowConfirmedPassword}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
        text-neutral-500 
          text-center
          mt-4
          font-light
        "
      >
        <div className="flex flex-row items-center gap-2 justify-center whitespace-nowrap">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
