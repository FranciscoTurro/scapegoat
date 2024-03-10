'use server';

import { revalidatePath } from 'next/cache';
import { CardInfo } from '../../../../types/CardInfo';
import { auth } from '../../../../lib/auth/auth';

export const addNegation = async (
  negatingCard: CardInfo,
  negatedCard: CardInfo
) => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin')
    throw new Error('NOT ADMIN');

  console.log(negatingCard, negatedCard);

  revalidatePath('/');
};
