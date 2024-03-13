'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '../../../lib/auth/auth';
import prisma from '../../../lib/db/db';

export const deleteDeck = async (id: string) => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin')
    throw new Error('NOT ADMIN');

  await prisma.deck.delete({
    where: { id },
  });

  revalidatePath('/');
};
