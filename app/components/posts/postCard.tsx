"use client";

import { Listing, Post, Reservation } from "@prisma/client";
import { SafeListing, SafeReservation, SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import useCountries from "../../hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../heartButton";
import Button from "../button";
import Avatar from "../avatar";

interface IPostCardProps {
  data: Post;
  currentUser?: SafeUser | null;
}

const PostCard: React.FC<IPostCardProps> = ({ data, currentUser }) => {
  const router = useRouter();
  console.log("data in PostCard: ", data);
  return (
    <div
      onClick={() => router.push(`/posts/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        group
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          {data.images.map((image, index) => {
            return (
              <Image
                fill
                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                alt="Post"
                key={`post ${index}`}
                src={image}
                className="object-cover h-full w-full group-hover:scale-105 transition duration-500 ease-in-out"
              />
            );
          })}

          <div className="absolute left-5 bottom-5">
            <Avatar src={currentUser?.image} />
          </div>
          <div className="absolute bottom-5 right-5">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
