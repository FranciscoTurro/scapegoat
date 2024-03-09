'use server';

import { revalidatePath } from 'next/cache';
import { CardInfo } from '../../../../types/CardInfo';
import { auth } from '../../../../lib/auth/auth';

export const createDeck = async (card: CardInfo, formData: FormData) => {
  //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin')
    throw new Error('NOT ADMIN');

  const name = formData.get('deck') as string;

  console.log(name, card.name);

  revalidatePath('/');
};
