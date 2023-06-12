"use client";

import { CldImage } from "next-cloudinary";

interface IImageClientProps {
  title: string;
  image: string;
}

const ImageClient: React.FC<IImageClientProps> = ({
  title,
  image
}) => {
  return (
    <CldImage
      alt={title}
      src={image}
      quality={100}
      width={640}
      height={640}
      preserveTransformations
      format="webp"
      className="object-cover aspect-square h-full w-full group-hover:scale-105 transition duration-500 ease-in-out"
    />
  );
};

export default ImageClient;
