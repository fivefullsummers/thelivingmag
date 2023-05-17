import { Post } from "@prisma/client";
import prisma from "../libs/prismadb";

export interface IPostParams {
  userId?: string;
}

export default async function getOnlyFirstImageFromPosts(params: IPostParams) {
  try {
    const {
      userId
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const postsWithFirstImage = posts.map((post) => {
      const image = post.images.length > 0 ? post.images[0] : null;
      return {
        ...post,
        images: [image] || [],
      };
    }) as Post[];

    return postsWithFirstImage;
  } catch (error: any) {
    throw new Error(error);
  }
}
