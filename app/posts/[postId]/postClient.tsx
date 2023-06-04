"use client";

import { Post } from "@prisma/client";
import { SafeUser } from "../../types";
import Container from "../../components/container";
import Image from "next/image";
import { bodoni } from "../../fonts";
import Button from "../../components/button";
import { useCallback } from "react";
import useDeletePostModal from "../../hooks/useDeletePostModal";

interface IPostClientProps {
  post: Post;
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
          <p className="text-center">{post.caption}</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          {post.images.map((image, index) => {
            return (
              <div
                key={`post ${index}`}
                className="aspect-auto flex justify-center items-center"
              >
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  className="post-image"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  height={500}
                  width={500}
                  alt={`Post ${index}`}
                  src={image}
                />
              </div>
            );
          })}
        </div>
        {isAuthor && (
          <div className="flex flex-col justify-center items-center w-full py-10">
            <div className="w-[50%]">
              <Button
                label="Delete post"
                onClick={deletePost}
                outline={true}
              />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default PostClient;
