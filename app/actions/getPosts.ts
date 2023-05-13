import prisma from "../libs/prismadb";

export interface IPostParams {
  userId?: string;
}

export default async function getPosts(params: IPostParams) {
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

    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
}
