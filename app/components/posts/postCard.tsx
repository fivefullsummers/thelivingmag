"use client";

import { PostUserAvatar, SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Avatar from "../avatar";
import { motion, AnimatePresence } from "framer-motion";

interface IPostCardProps {
  data: PostUserAvatar;
  isVisible?: boolean;
}

const PostCard: React.FC<IPostCardProps> = ({ data, isVisible }) => {
  const router = useRouter();
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
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="card card-compact bg-base-100 overflow-hidden rounded-md shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0}}
            >
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
                      <Avatar src={data.user.image} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PostCard;
