import prisma from '../lib/db/db';

export const getDecks = async () => {
  return await prisma.deck.findMany({
    include: { cover_card: true },
  });
};
