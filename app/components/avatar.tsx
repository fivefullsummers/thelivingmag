"use client";

import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface IAvatarProps {
  src?: string | null | undefined;
  size?: "sm" | "md" | "lg";
  isLink?: boolean;
  routeTo?: string;
}

const Avatar: React.FC<IAvatarProps> = ({ src, size, isLink, routeTo }) => {
  const [imageSize, setImageSize] = useState(30);
  const router = useRouter();

  useEffect(() => {
    handleSize();
  }, []);

  const handleSize = useCallback(() => {
    if (size === "sm") {
      setImageSize(30);
    }
    if (size === "md") {
      setImageSize(64);
    }
    if (size === "lg") {
      setImageSize(90);
    }
  }, [size, setImageSize]);

  if (isLink) {
    return (
      <div>
          <CldImage
            onClick={() => router.push(routeTo as string)}
            className="rounded-full aspect-square"
            height={imageSize}
            width={imageSize}
            format="webp"
            quality={100}
            alt="Avatar"
            style={{
              objectFit: "cover",
            }}
            src={src || "avatars/placeholder_lwzpw6.png"}
          />
      </div>
    );
  }

  return (
    <div>
      <CldImage
        className="rounded-full aspect-square"
        height={imageSize}
        width={imageSize}
        alt="Avatar"
        format="webp"
        quality={100}
        style={{
          objectFit: "cover",
        }}
        src={src || "avatars/placeholder_lwzpw6.png"}
      />
    </div>
  );
};

export default Avatar;
