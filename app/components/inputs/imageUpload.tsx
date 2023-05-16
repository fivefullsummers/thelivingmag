"use client";

import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface IImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
  folderName: string;
}

const ImageUpload: React.FC<IImageUploadProps> = ({ onChange, value, folderName }) => {
  const secureUrls = useRef<string[]>([]);
  const uploadedFiles = useRef<string[]>([]);
  const deletingIds = new Set<string>();
  console.log("folder: ", folderName);

  useEffect(() => {
    uploadedFiles.current = [];
  }, [secureUrls.current]);

  const handleUpload = useCallback(
    (result: any) => {
      if (result.event === "success") {
        const imageUrl = result.info.secure_url;
        const publicId = result.info.public_id;
        console.log("result is: ", result.info);

        secureUrls.current.push(imageUrl);
        uploadedFiles.current.push(publicId);
        let enforceUniqueValues = Array.from(new Set([...secureUrls.current, imageUrl]));

        onChange(enforceUniqueValues);
      }
    },
    [onChange, secureUrls]
  );

  const handleDelete = useCallback(
    async (index: number) => {
      try {
        const cloudDeleteId = uploadedFiles.current[index];
        console.log("cloudDeleteId: ", cloudDeleteId)

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
    },
    [onChange, secureUrls.current.length]
  );

  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="wghetvwj"
        options={{
          maxFiles: 5,
          folder: folderName,
          theme: "minimal",
          defaultSource: "local",
          sources: ["local", "google_drive"],
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => {
                if (secureUrls.current.length <= 5) {
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
              text-neutral-600
              "
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Click to upload</div>
            </div>
          );
        }}
      </CldUploadWidget>
      {secureUrls.current.length !== 0 && (
        <div className="max-h-full w-full pb-10 mt-10 gap-1 overflow-x-scroll">
          <div className="grid grid-cols-5 gap-5 justify-center items-center w-max">
            {secureUrls.current.map((thumbnail, index) => {
              return (
                <div key={thumbnail}
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    alt={`Thumbnail ${index}`}
                    height={200}
                    width={200}
                    style={{ objectFit: "contain" }}
                    src={thumbnail}
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
