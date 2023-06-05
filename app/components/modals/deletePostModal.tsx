"use client";

import { useCallback, useState } from "react";
import Modal from "./modal";
import Heading from "../heading";
import { toast } from "react-hot-toast";
import Button from "../button";
import { useParams, useRouter } from "next/navigation";
import useDeletePostModal from "../../hooks/useDeletePostModal";
import axios from "axios";

const DeletePostModal = () => {
  const router = useRouter();
  const postId  = useParams();

  const deletePostModal = useDeletePostModal();
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = useCallback(async(e: React.MouseEvent<HTMLButtonElement>, postId: string)=>{
    e.stopPropagation();
    console.log("delete post", postId);
    if (postId === undefined || postId === "") {
      toast.error("invalid id");
      return;
    }
    await axios.delete(`/api/posts/${postId}`)
    .then(()=> {
      toast.success("Post deleted");
      deletePostModal.onClose();
      router.back();
    })
    .catch((err) => {
      toast.error("Something is error");
    }).finally(() => {
      router.refresh();
    })
    
  },[postId, router]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Are you sure you want to delete this post?" 
        subtitle="This action is irreversabile" />
      <Button
        warning
        label="Delete"
        onClick={(e) => deletePost(e, postId?.postId as string)}
      />
      <Button
        outline
        label="Cancel"
        onClick={() => deletePostModal.onClose()}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={deletePostModal.isOpen}
      title="Delete post"
      onClose={deletePostModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
    />
  );
};

export default DeletePostModal;
