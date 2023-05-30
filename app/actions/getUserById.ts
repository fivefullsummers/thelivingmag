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