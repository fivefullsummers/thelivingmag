import prisma from '../libs/prismadb';

interface IParams {
  profileId?: string;
}

export default async function getUserById(params: IParams) {
  try {
    const { profileId } = params;

    const user = await prisma.user.findMany({
      where: {
        id: profileId
      },
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
      }
    });

    if (!user) {
      return null;
    }
    return {...user[0],
    createdAt: user[0]?.createdAt.toISOString(),
    updatedAt: user[0]?.updatedAt.toISOString(),
    emailVerified: user[0]?.emailVerified?.toISOString() || null
    }
  } catch (error: any) {
      throw new Error(error);
  }
}