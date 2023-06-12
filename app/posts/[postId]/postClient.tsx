"use client";

import { Post, User } from "@prisma/client";
import { SafePostUser, SafeUser } from "../../types";
import Container from "../../components/container";
import { bodoni } from "../../fonts";
import Button from "../../components/button";
import { Suspense, useCallback } from "react";
import useDeletePostModal from "../../hooks/useDeletePostModal";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

interface IPostClientProps {
  post: SafePostUser;
  currentUser?: SafeUser | null;
}

const PostClient: React.FC<IPostClientProps> = ({ post, currentUser }) => {
  const deletePostModal = useDeletePostModal();
  const isAuthor = currentUser?.id === post.userId ? true : false;

  const deletePost = useCallback(() => {
    deletePostModal.onOpen();
  }, []);

  return (
    <Container>
      <div className="bg-base-100">
        <div className="flex flex-col gap-2 py-10">
          <h1
            className={`text-center font-semibold text-2xl ${
              bodoni.className || "font-serif"
            }`}
          >
            {post.title}
          </h1>
          <p className="text-center text-sm">
            {"By "}
            <Link href={`/profile/${post.user.id}`} className="underline">
              {post.user.name}
            </Link>
          </p>
          <p className="text-center">{post.caption}</p>
        </div>
        <div
          className="
        grid
        grid-cols-1 
      "
        >
          {post.images.map((image, index) => {
            return (
              <div
                className="
                  col-span-1
                  group
                "
                key={`${post.title}-${index}`}
              >
                <div className="flex flex-col w-full justify-center items-center">
                  <div className="min-full h-full relative image-container">
                    <CldImage
                      fill
                      key={`${post.title}-${index}`}
                      className="h-full w-full py-1 image"
                      sizes="(max-width: 768px) 100vw"
                      format="webp"
                      quality={90}
                      alt={`${post.id}-${index}`}
                      src={image}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {isAuthor && (
          <div className="flex flex-col justify-center items-center w-full py-10">
            <div className="w-[50%]">
              <Button label="Delete post" onClick={deletePost} outline={true} />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default PostClient;
