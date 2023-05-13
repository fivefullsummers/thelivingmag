"use client";

import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import { SafeUser } from "../../types";
import useLoginModal from "../../hooks/useLoginModal";
import { useState } from "react";
import Container from "../../components/container";


interface IPostClientProps {
  post: Post
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<IPostClientProps> = ({
  post,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  console.log("post Client: ", post);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          Post Client
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
