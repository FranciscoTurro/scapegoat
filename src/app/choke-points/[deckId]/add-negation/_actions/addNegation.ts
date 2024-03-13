'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '../../../../../lib/auth/auth';
import { CardInfo } from '../../../../../types/CardInfo';
import prisma from '../../../../../lib/db/db';
import { redirect } from 'next/navigation';
import { getErrorMessage } from '../../../../../utils/utils';

export const addNegation = async (
  negatingCard: CardInfo,
  negatedCard: CardInfo,
  deckId: string
) => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin')
    throw new Error('NOT ADMIN');

  if (!negatingCard)
    return {
      error: 'Must choose a negating card',
    };
  if (!negatedCard)
    return {
      error: 'Must choose a negated card',
    };

  try {
    await prisma.negation.create({
      data: {
        deckId,
        negatedCardId: negatedCard.id,
        negatingCardId: negatingCard.id,
        priority: 1,
      },
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath('/');
  redirect(`/choke-points/${deckId}`);
};
