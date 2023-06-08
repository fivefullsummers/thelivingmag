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
    image,
    bio,
    role,
    gender,
    instagramLink,
    behanceLink,
    country,
    state,
    city
  } = body;

  const userSchema = z.object({
    name: z.string().trim().toLowerCase().max(20).nullable(),
    image: z.string().optional().nullable(),
    role: Role.optional().nullable(),
    gender: z.string().optional().nullable(),
    instagramLink: z.string().trim().optional().nullable(),
    behanceLink: z.string().trim().optional().nullable(),
    country: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    city: z.string().optional().nullable()

  });

    const response = userSchema.safeParse(body);

    if (!response.success) {
      console.log(response.error.issues);
      return NextResponse.error();
    }

    const postData = {
      name,
      image,
      bio,
      role,
      gender,
      instagramLink,
      behanceLink,
      country,
      state,
      city
    };
    const post = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {...postData, bio },
    });
    return NextResponse.json(post, { status: 200 });
}
