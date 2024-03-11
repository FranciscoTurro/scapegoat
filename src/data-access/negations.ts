import prisma from '../lib/db/db';

export const getNegations = async (deckId: string) => {
  return await prisma.negation.findMany({
    where: { deckId },
    include: { Deck: true, negatedCard: true, negatingCard: true },
  });
};
