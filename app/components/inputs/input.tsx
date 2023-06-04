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
          input
          input-bordered
          p-4
          pt-8
          outline
          outline-1
          outline-base-300
          font-light
          rounded-md
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] && "border-rose-500"}
          ${errors[id] && "focus:border-rose-500"}
        `}
        />
        <label
          style={{ zIndex: 1 }}
          className={`
          absolute
          text-sm
          duration-150
          transform
          -translate-y-2
          top-3
          origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-2
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
