"use client";

import axios from "axios";
import { CldUploadWidget, CldUploadWidgetPropsOptions } from "next-cloudinary";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

interface IImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
  folderName: string;
  trackedImages: string[];
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  onChange,
  value,
  folderName,
  trackedImages,
}) => {
  const secureUrls = useRef<string[]>([]);
  const uploadedFiles = useRef<string[]>([]);
  const deletingIds = new Set<string>();
  const maxUploads = (5 - trackedImages.length) * 1;

  useEffect(() => {
    uploadedFiles.current = [];
  }, [secureUrls.current]);

  const handleUpload = useCallback(
    (result: any) => {
      if (maxUploads > 0) {
        if (result.event === "success") {
          const imageUrl = result.info.secure_url;
          const publicId = result.info.public_id;

          secureUrls.current.push(imageUrl);
          uploadedFiles.current.push(publicId);

          let enforceUniqueValues = Array.from(
            new Set([...secureUrls.current, imageUrl])
          );

          onChange(enforceUniqueValues);
        }
      }
      return;
    },
    [onChange, secureUrls.current, maxUploads, trackedImages]
  );

  const handleDelete = useCallback(
    async (index: number) => {
      if (index >= 0) {
        try {
          const cloudDeleteId = uploadedFiles.current[index];

          if (deletingIds.has(cloudDeleteId)) {
            return;
          }

          deletingIds.add(cloudDeleteId);
          const cloudId = JSON.stringify({ cloudDeleteId: cloudDeleteId });
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          await axios
            .post("/api/cloudDelete", cloudId, config)
            .catch((err) => console.error(err));

          secureUrls.current.splice(index, 1);
          uploadedFiles.current.splice(index, 1);

          onChange([...secureUrls.current]);

          deletingIds.delete(cloudDeleteId);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [onChange, trackedImages, secureUrls.current]
  );

  const uploadOptions = {
    maxFiles: (5 - trackedImages.length) * 1,
    folder: `posts/${folderName}`,
    theme: "office",
    defaultSource: "local",
    maxFileSize: 10000000,
    maxImageFileSize: 10000000,
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
    <div>
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
              p-2
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              "
              >
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
              </div>
            );
          }}
        </CldUploadWidget>
      )}
      {trackedImages.length !== 0 && (
        <div className="max-h-full w-full pb-10 mt-10 gap-1 overflow-x-scroll">
          <div className="grid grid-cols-5 gap-5 justify-center items-center w-max">
            {trackedImages.map((thumbnail, index) => {
              return (
                <div
                  key={thumbnail}
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    alt={`Thumbnail ${index}`}
                    height={200}
                    width={200}
                    style={{ objectFit: "contain" }}
                    src={thumbnail}
                    priority
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                    className="m-[-20px] text-center p-2 w-10 h-10 rounded-full bg-rose-500 text-white"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
