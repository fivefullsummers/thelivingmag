"use client";

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
    <Link href={`/posts/${data.id}`}>
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
              <div className="card-body">
                <div className="card-actions justify-end">
                  <div className="absolute left-5 bottom-5">
                    {showUser && <Avatar src={data.user.image} routeTo={`/profile/${data.userId}`} isLink={true}/>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
