'use client';

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

interface IAvatarProps {
  src?: string | null | undefined;
  size?: "sm" | "md" | "lg";
}

const Avatar: React.FC<IAvatarProps> = ({ src, size }) => {
  const [imageSize, setImageSize] = useState(30);

  useEffect(()=>{
    handleSize();
  },[]);

  const handleSize = useCallback(() => {
    if (size === "sm") {
      setImageSize(30);
    };
    if (size === "md") {
      setImageSize(60);
    }
    if (size === "lg") {
      setImageSize(90);;
    }
  }, [size, setImageSize]);

  return (
    <Image 
      className="rounded-full"
      height={imageSize}
      width={imageSize}
      alt="Avatar"
      src={src || "/images/placeholder.png"}
    />
  );
}

export default Avatar;