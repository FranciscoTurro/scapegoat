'use server';

import { revalidatePath } from 'next/cache';
import { CardInfo } from '../../../../types/CardInfo';
import { auth } from '../../../../lib/auth/auth';
import { redirect } from 'next/navigation';
import { getErrorMessage } from '../../../../utils/utils';
import { createDeck } from '../../../../data-access/decks';

export const createDeckAction = async (
  coverCard: CardInfo,
  formData: FormData
) => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin')
    throw new Error('NOT ADMIN');

  const name = formData.get('name') as string;

  if (!name)
    return {
      error: 'Decks must have a name',
    };

  if (!coverCard)
    return {
      error: 'Decks must have a cover card',
    };

  try {
    createDeck(name, coverCard.id);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath('/');

  redirect('/choke-points');
};
