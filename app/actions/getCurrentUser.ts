import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/component/pages/api/auth/[...nextauth]';
import prisma from '../libs/prismadb';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
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

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    }
  } catch (error: any) {
    return null;
  }
}