import { NextResponse } from "next/server";

import prisma from '../../libs/prismadb';
import getCurrentUser from "../../actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    caption,
    images
  } = body;

  const postData = {
    title,
    caption,
    images,
    userId: currentUser.id
  }

  const post = await prisma.post.create({
    data: postData
  });

  return NextResponse.json(post);

}