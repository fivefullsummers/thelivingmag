import prisma from "../libs/prismadb";

interface IParams {
  postId?: string;
}

export default async function getPostById(params: IParams) {
  try {
    const { postId } = params;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            favoriteIds: true,
            bio: true,
            instagramLink: true,
            behanceLink: true,
            gender: true,
            rating: true,
            country: true,
            state: true,
            city: true,
            posts: true,
            role: true,
            theme: true,
            photographer: true,
            FashionModel: true,
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    const postWithUser = {
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      user: {
        name: post.user.name,
        image: post.user.image,
        role: post.user.role,
        id: post.user.id,
        email: post.user.email,
        emailVerified: post.user.emailVerified,
        createdAt: post.user.createdAt.toISOString(),
        updatedAt: post.user.updatedAt.toISOString(),
        favoriteIds: post.user.favoriteIds,
        bio: post.user.bio,
        instagramLink: post.user.instagramLink,
        behanceLink: post.user.behanceLink,
        gender: post.user.gender,
        rating: post.user.rating,
        country: post.user.country,
        state: post.user.state,
        city: post.user.city,
        posts: post.user.posts,
        theme: post.user.theme,
        photographer: post.user.photographer,
        FashionModel: post.user.FashionModel,
      },
    };

    return postWithUser;
  } catch (error: any) {
    throw new Error(error);
  }
}
