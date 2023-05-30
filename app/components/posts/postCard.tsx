"use client";

import { bodoni } from "../../fonts";

import { PostUserAvatar } from "../../types";
import Image from "next/image";
import Avatar from "../avatar";
import { motion } from "framer-motion";
import Link from "next/link";

interface IPostCardProps {
  data: PostUserAvatar;
  showUser?: boolean;
}

const PostCard: React.FC<IPostCardProps> = ({ data, showUser }) => {
  return (
    <div
      className="
        col-span-1
        cursor-pointer
        group
        "
    >
      <div className="flex flex-col gap-2 w-full">
        <motion.div className="card card-compact bg-base-100 overflow-hidden rounded-md shadow-xl">
          <div className="aspect-square">
            <Link href={`/posts/${data.id}`}>
              <figure>
                <Image
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  alt={data.title}
                  src={data.images[0]}
                  className="object-cover h-full w-full group-hover:scale-105 transition duration-500 ease-in-out"
                />
              </figure>
              <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-600 ease-in-out">
                <div
                  style={{ zIndex: 1 }}
                  className="absolute opacity-0 h-full w-full bg-zinc-950 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-50 transition duration-500 ease-in-out"
                ></div>
                <div
                  style={{ zIndex: 1 }}
                  className={`absolute z-2 text-center text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-white ${
                    bodoni.className || "font-serif"
                  }`}
                >
                  <p className="text-lg">{data.title}</p>
                  <p className="text-sm">by</p>
                  <p className="text-sm">{data.user.name}</p>
                </div>
              </div>
            </Link>
            <div className="card-body">
              <div className="card-actions justify-end">
                <div style={{ zIndex: 3 }} className="absolute left-3 bottom-3">
                  {showUser && (
                    <Avatar
                      src={data.user.image}
                      routeTo={`/profile/${data.userId}`}
                      isLink={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostCard;
