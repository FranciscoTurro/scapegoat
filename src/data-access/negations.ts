import prisma from '../lib/db/db';

export const getNegations = async (deckId: string) => {
  return await prisma.negation.findMany({
    where: { deckId },
    include: { deck: true, negatedCard: true, negatingCard: true },
    orderBy: [{ negatingCardId: 'asc' }, { priority: 'asc' }],
  });
};

export const getNegatedByCards = async (
  negatingCardId: string,
  deckId: string
) => {
  return await prisma.negation.findMany({
    where: { negatingCardId, deckId },
  });
};

export const createNegation = async (
  deckId: string,
  negatedCardId: string,
  negatingCardId: string,
  comment: string | undefined,
  priority: number
) => {
  await prisma.negation.create({
    data: {
      deckId,
      negatedCardId,
      negatingCardId,
      comment,
      priority,
    },
  });
};
