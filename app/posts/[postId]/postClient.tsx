"use client";

import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import { SafeUser } from "../../types";
import useLoginModal from "../../hooks/useLoginModal";
import { useState } from "react";
import Container from "../../components/container";
import Image from "next/image";

interface IPostClientProps {
  post: Post;
  currentUser?: SafeUser | null;
}

const PostClient: React.FC<IPostClientProps> = ({ post, currentUser }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [height, setHeight] = useState<string[]>([]);
  const [width, setWidth] = useState<string[]>([]);

  console.log("post Client: ", post);

  return (
    <Container>
      <div className="">
        <div className="flex flex-col gap-2 justify-center items-center">
          {post.images.map((image, index) => {
            return (
              <div
                key={`post ${index}`}
                className="aspect-auto flex justify-center items-center w-[90%] h-[90%]"
              >
                <Image
                  style={{
                    objectFit: "cover"
                  }}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  height={1000}
                  width={1000}
                  alt={`Post ${index}`}
                  src={image}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default PostClient;
