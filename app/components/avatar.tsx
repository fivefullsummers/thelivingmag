'use client';

import Image from "next/image";

interface IAvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<IAvatarProps> = ({ src }) => {
  return (
    <Image 
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/images/placeholder.png"}
    />
  );
}

export default Avatar;