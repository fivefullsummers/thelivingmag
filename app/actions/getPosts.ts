import prisma from "../libs/prismadb";

export interface IPostParams {
  userId?: string;
  category?: string;
}

export default async function getPosts(params: IPostParams) {
  try {
    const {
      userId,
      category
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    // if (category) {
    //   query.category = category;
    // }

    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            image: true,
          },
        },
      },
    });

    const postWithUserAvatar = posts.map((post)=> ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      user: {
        image: post.user.image
      }
    }));


    return postWithUserAvatar;
  } catch (error: any) {
    throw new Error(error);
  }
}
