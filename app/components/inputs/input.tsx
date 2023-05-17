"use client";

import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface IInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  extraOptions?: FieldValues;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  viewPassword?: boolean;
  onShowPassword?: () => void;
}

const Input: React.FC<IInputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  extraOptions,
  viewPassword,
  onShowPassword,
}) => {
  return (
    <div>
      <div className="w-full relative">
        {formatPrice && (
          <BiDollar
            size={24}
            className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
          />
        )}
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required, ...extraOptions })}
          placeholder=" "
          type={type}
          className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        />
        <label
          className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
        >
          {label}
        </label>
        {(id === "password" || id === "confirmPassword") && (
          <div
            onClick={onShowPassword}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 h-full w-12 cursor-pointer"
          >
            <div className="relative flex justify-center items-center h-full w-full">
              <div
                className="
                flex
                justify-center
                items-center
                h-[50%]
                w-full
                border-l-2
              border-neutral-300"
              >
                {viewPassword ? (
                  <IoMdEye className="fill-neutral-400" size={24} />
                ) : (
                  <IoMdEyeOff className="fill-neutral-400" size={24} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-sm text-rose-500 gap-1">
        {errors[id] && errors[id]?.message?.toString()}
      </div>
    </div>
  );
};

export default Input;
