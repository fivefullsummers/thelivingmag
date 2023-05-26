import { Prisma, Role } from "@prisma/client";
import prisma from "../libs/prismadb";

export interface IPostParams {
  userId?: string;
  role?: string;
}

export default async function getPosts(params: IPostParams) {
  try {
    const {
      userId,
      role
    } = params;

    let query: Prisma.PostWhereInput = {};

    if (userId) {
      query.userId = userId;
    }

    if (role) {
      query.user = {
        role: {
          equals: role.toUpperCase() as Role
        }
      }
    }

    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            image: true,
            role: true,
          },
        },
      },
    });

    const postWithUserAvatar = posts.map((post)=> ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      user: {
        image: post.user.image,
        role: post.user.role
      }
    }));


    return postWithUserAvatar;
  } catch (error: any) {
    throw new Error(error);
  }
}
