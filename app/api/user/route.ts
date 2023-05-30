import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";
import getCurrentUser from "../../actions/getCurrentUser";
import { z } from "zod";



export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();
  const Role = z.enum(["READER", "PHOTOGRAPHER", "MODEL"]);

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { 
    name,
    email,
    image,
    bio,
    role,
    gender,
    instagramLink,
    behanceLink } = body;

  const userSchema = z.object({
    name: z.string().max(20).nullable(),
    email: z.string().email().nullable(),
    image: z.string().optional().nullable(),
    bio: z.string().max(400).optional().nullable(),
    role: Role.optional().nullable(),
    gender: z.string().optional().nullable(),
    instagramLink: z.string().optional().nullable(),
    behanceLink: z.string().optional().nullable()
  });

    const response = userSchema.safeParse(body);

    if (!response.success) {
      console.log(response.error.issues);
      return NextResponse.error();
    }

    const postData = {
      name,
      email,
      image,
      bio,
      role,
      gender,
      instagramLink,
      behanceLink
    };
    const post = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: postData,
    });
    return NextResponse.json(post, { status: 200 });
}
