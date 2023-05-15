"use client";

import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface IImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<IImageUploadProps> = ({ onChange, value }) => {
  const thumbnails = useRef<string[]>([]);
  const secureUrls = useRef<string[]>([]);
  const uploadedFiles = useRef<string[]>([]);
  const deletingIds = new Set<string>();

  useEffect(() => {
    thumbnails.current = [];
    uploadedFiles.current = [];
  }, [secureUrls.current]);

  const handleUpload = useCallback(
    (result: any) => {
      if (result.event === "success") {
        const thumbnailUrl = result.info.thumbnail_url;
        const imageUrl = result.info.secure_url;
        const publicId = result.info.public_id;
        console.log("result is: ", result.info);

        thumbnails.current.push(thumbnailUrl);
        secureUrls.current.push(imageUrl);
        uploadedFiles.current.push(publicId);

        onChange([...secureUrls.current, imageUrl]);
      }
    },
    [onChange, secureUrls]
  );

  const handleDelete = useCallback(
    async (index: number) => {
      try {
        const cloudDeleteId = uploadedFiles.current[index];
        console.log("handle delete: ", cloudDeleteId);

        if (deletingIds.has(cloudDeleteId)) {
          return;
        } 

        deletingIds.add(cloudDeleteId);

        const res = await axios.delete(`/api/cloudDelete/${cloudDeleteId}`);

        thumbnails.current.splice(index, 1)
        secureUrls.current.splice(index, 1)
        uploadedFiles.current.splice(index, 1);

        onChange([...secureUrls.current]);

        console.log("id was: ", cloudDeleteId);

        deletingIds.delete(cloudDeleteId);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    [onChange]
  );

  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="wghetvwj"
        options={{
          maxFiles: 5,
          folder: "sherwin"
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
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
      {thumbnails.current.length !== 0 && (
        <div className="h-20 w-full mt-10">
          <div className="grid grid-cols-5 gap-5 justify-center items-center">
            {thumbnails.current.map((thumbnail, index) => {
              return (
                <div key={thumbnail}>
                  <Image
                    alt={`Thumbnail ${index}`}
                    height={50}
                    width={50}
                    style={{ objectFit: "contain" }}
                    src={thumbnail}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                    className="m-1 rounded-full bg-rose-500 text-white"
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
