import getCurrentUser from '@/component/app/actions/getCurrentUser';
import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function UPDATE() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      role: 'PHOTOGRAPHER'
    }
  });

  return NextResponse.json(user);
}