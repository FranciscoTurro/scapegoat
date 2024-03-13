'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '../../../../../lib/auth/auth';
import { CardInfo } from '../../../../../types/CardInfo';
import prisma from '../../../../../lib/db/db';
import { redirect } from 'next/navigation';
import { getErrorMessage } from '../../../../../utils/utils';
import {
  createNegation,
  getNegatedByCards,
} from '../../../../../data-access/negations';

export const addNegationAction = async (
  negatingCard: CardInfo,
  negatedCard: CardInfo,
  comment: string | undefined,
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
    const cardsNegatedByNegatingCard = await getNegatedByCards(
      negatingCard.id,
      deckId
    );
    let priority = 1;

    await cardsNegatedByNegatingCard.forEach((card) => {
      if (card.priority >= priority) {
        priority = card.priority + 1;
      }
    });

    await createNegation(
      deckId,
      negatedCard.id,
      negatingCard.id,
      comment,
      priority
    );
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath('/');
  redirect(`/choke-points/${deckId}`);
};
