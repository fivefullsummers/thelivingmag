"use client";

import { CldUploadWidget, CldUploadWidgetPropsOptions } from "next-cloudinary";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { TbPhotoPlus } from "react-icons/tb";
import Avatar from "../avatar";

declare global {
  var cloudinary: any;
}

interface IImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  folderName: string;
  trackedImage: string | undefined;
}

const AvatarUpload: React.FC<IImageUploadProps> = ({
  onChange,
  value,
  folderName,
  trackedImage,
}) => {
  const maxUploads = 1;

  const handleUpload = useCallback(
    (result: any) => {
      if (result.event === "success") {
        const imageUrl = result.info.secure_url;

        onChange(imageUrl);
      }
      return;
    },
    [onChange, maxUploads, trackedImage]
  );

  const uploadOptions = {
    maxFiles: 1,
    folder: `avatars/${folderName}`,
    multiple: false,
    maxImageFileSize: 10000000,
    theme: "office",
    defaultSource: "local",
    sources: ["local"],
    resourceType: "image",
    styles: {
      palette: {
        window: "#ffffff",
        sourceBg: "#f4f4f5",
        windowBorder: "#90a0b3",
        tabIcon: "#000000",
        inactiveTabIcon: "#555a5f",
        menuIcons: "#555a5f",
        link: "#0433ff",
        action: "#339933",
        inProgress: "#0433ff",
        complete: "#339933",
        error: "#cc0000",
        textDark: "#000000",
        textLight: "#fcfffd",
      },
      fonts: {
        default: null,
        "sans-serif": {
          url: null,
          active: true,
        },
      },
    },
  } as CldUploadWidgetPropsOptions;

  return (
    <div className="flex w-full justify-center items-center">
      <div className="grid grid-cols-2 gap-8 justify-center items-center">
      {maxUploads > 0 && (
        <CldUploadWidget
          onUpload={handleUpload}
          uploadPreset="wghetvwj"
          options={uploadOptions}
        >
          {({ open }) => {
            return (
              <div
                onClick={() => {
                  if (maxUploads > 0) {
                    open?.();
                  } else {
                    toast.error("maximum files uploaded");
                  }
                }}
                className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              border-neutral-300
              p-4
              flex
              flex-col
              justify-center
              items-center
              rounded-full
              "
              >
                <TbPhotoPlus size={20} />
                <div className="font-semibold text-sm">Upload</div>
              </div>
            );
          }}
        </CldUploadWidget>
      )}
      {trackedImage !== "" ? (
        <Avatar size="md" src={trackedImage} />
      ) : (
        <Avatar size="md" src={""} />
      )}
      </div>
    </div>
  );
};

export default AvatarUpload;
