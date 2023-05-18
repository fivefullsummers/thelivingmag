"use client";

import Modal from "./modal";
import useRentModal from "../../hooks/useRentModal";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Heading from "../heading";
import Counter from "../inputs/counter";
import CountrySelect from "../inputs/countrySelect";
import { categories, newCategories } from "../navbar/categories";
import CategoryInput from "../inputs/categoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import ImageUpload from "../inputs/imageUpload";
import Input from "../inputs/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import StateSelect from "../inputs/stateSelect";

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLocation, setMapLocation] = useState([0, 0]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      country: null,
      state: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const country = watch("country");
  const state = watch("state");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        ssr: false,
      }),
    [country, state]
  );

  useEffect(() => {
    console.log("use effect");
    mapCenter();
  }, [country, state]);

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

  const mapCenter = () => {
    if (state !== "undefined" && state?.latitude && state?.longitude) {
      setMapLocation(
        [state.latitude, state.longitude].map((str) => parseFloat(str!))
      );
      console.log("location:", mapLocation);
      return;
    }
    if (country?.latlng?.length !== 0) {
      setMapLocation(country?.latlng);
      console.log("location:", mapLocation);
      return;
    }
    setMapLocation([0,0]);
    return;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What role did you play on this project?"
        subtitle="Pick a category"
      />
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
      "
      >
        {newCategories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={country}
          onChange={(value) => {
            if (!value) {
              setCustomValue("state", null);
            }
            setCustomValue("country", value);
          }}
        />
        <StateSelect
          countryCode={country}
          value={state}
          onChange={(value) => setCustomValue("state", value)}
        />
        <Map center={mapLocation} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms doo you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
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
          id="description"
          label="description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          register={register}
          formatPrice
          type="number"
          disabled={isLoading}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Post a project"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
