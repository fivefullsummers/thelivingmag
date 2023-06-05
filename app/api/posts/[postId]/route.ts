import getCurrentUser from "@/component/app/actions/getCurrentUser";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  postId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;
  
  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid Id");
  }

  const post = await prisma.post.deleteMany({
    where: {
      id: postId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(post);
}
