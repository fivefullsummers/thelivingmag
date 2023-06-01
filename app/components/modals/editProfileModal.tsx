"use client";

import Modal from "./modal";
import React, { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/input";
import { SafeUser } from "../../types";
import useEditProfileModal from "../../hooks/useEditProfileModal";
import AvatarUpload from "../inputs/avatarUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import CountryStateCity, { CountrySelectValue } from "../inputs/countryStateCity";

interface IEditProfileModalProps {
  currentUser?: SafeUser | null;
}

const EditProfileModal: React.FC<IEditProfileModalProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const editProfileModal = useEditProfileModal();
  let customFolderName = "sherwin";
  let currentLocationString = () => {
    let locationStr = "No location set";
    if (currentUser?.country !== "" || currentUser?.country !== undefined) {
      locationStr = `${currentUser?.country}`;
      if (currentUser?.state !== "" || currentUser?.state !== undefined) {
        locationStr += `, ${currentUser?.state}`;
      } 
      if (currentUser?.city !== "" || currentUser?.city !== undefined) {
        locationStr += `, ${currentUser?.city}`;
      }
    }
    return locationStr;
  }
  if (currentUser) {
    customFolderName = currentUser.id;
  }

  const [imagesTracker, setImagesTracker] = useState<string | undefined>();
  const [latlng, setLatlng] = useState([0.0,0.0]);
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCountry, setSelectedCountry] = useState<CountrySelectValue>();

  const handleLatLngUpdate = (latlngValue: number[]) => {
    setLatlng(latlngValue);
  }

  const handleCityUpdate = (city: string) => {
    setSelectedCity(city);
  };

  const handleCountryUpdate = (country: CountrySelectValue) => {
    setSelectedCountry(country);
  };

  const handleStateUpdate = (state: string) => {
    setSelectedState(state);
  };

  const DEFAULT_ROLE = "Select a role";

  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        ssr: false,
      }),
    [latlng]
  );

  useEffect(() => {

  }, )

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
      gender: currentUser?.gender || "Select gender",
      instagramLink: currentUser?.instagramLink,
      behanceLink: currentUser?.behanceLink,
      country: currentUser?.country,
      state: currentUser?.state,
      city: currentUser?.city
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
      setImagesTracker(value);
    }
  };


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const enrichedData: any = {
        ...data,
        country: selectedCountry?.label as string,
        state: selectedState as string,
        city: selectedCity as string
      }

      await axios
        .put("/api/user", enrichedData)
        .then((response: any) => {
          toast.success("Profile Updated");
          reset({
            image: enrichedData?.image,
            name: enrichedData?.name,
            email: enrichedData?.email,
            bio: enrichedData?.bio,
            role: enrichedData?.role,
            gender: enrichedData?.gender,
            instagramLink: enrichedData?.instagramLink,
            behanceLink: enrichedData?.behanceLink,
            country: response?.country,
            state: response?.state,
            city: response?.city
          });
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
    <div className="flex flex-col gap-3">
      <h1 className="font-semibold text-center">
        upload avatar
      </h1>
      <AvatarUpload
        value={images}
        onChange={(value) => setCustomValue("image", value)}
        folderName={customFolderName}
        trackedImage={imagesTracker || (currentUser?.image as string)}
      />
      <div className="flex flex-col h-full w-full gap-4 pt-1">
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
        <textarea
          id="bio"
          {...register("bio")}
          style={{
            fontSize:"16px"
          }}
          className="textarea textarea-bordered textarea-neutral-600 focus:textarea-primary rounded-md border-2 border-neutral leading-6"
          placeholder="Bio"
          rows={5}
          maxLength={100}
          wrap="hard"
          ></textarea>
        <Input id="instagramLink" label={"Instagram username"} register={register} errors={errors} />
        <Input id="behanceLink" label={"Behance username"} register={register} errors={errors} />
        <div className="flex justify-center gap-4">
          <select
            {...register("role")}
            defaultValue={currentUser?.role}
            className="select select-bordered select-sm w-[45%] max-w-xs font-sans rounded-md"
          >
            <option value={DEFAULT_ROLE} disabled>
              Select a role
            </option>
            <option value="PHOTOGRAPHER">Photographer</option>
            <option value="MODEL">Model</option>
            <option value="READER">Reader</option>
          </select>
          <select
            {...register("gender")}
            defaultValue={currentUser?.gender as string}
            className="select select-bordered select-sm w-[45%] max-w-xs font-sans rounded-md"
          >
            <option value="Select gender" disabled>
              Select a gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          {
            <p className="text-sm text-center">current location: {currentLocationString()}</p>
          }
          <CountryStateCity
            onLatlngUpdate={handleLatLngUpdate}
            onCityUpdate={handleCityUpdate}
            onCountryUpdate={handleCountryUpdate}
            onStateUpdate={handleStateUpdate}/>
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
