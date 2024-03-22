'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '../lib/auth/auth';
import { deleteDeck } from '../data-access/decks';
import { getErrorMessage } from '../utils/utils';

export const deleteDeckAction = async (id: string) => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin')
    throw new Error('NOT ADMIN');

  try {
    await deleteDeck(id);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath('/');
};
