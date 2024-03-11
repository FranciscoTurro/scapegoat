import prisma from '../lib/db/db';

export const getDecks = async () => {
  return await prisma.deck.findMany({
    include: { cover_card: true },
    orderBy: { name: 'asc' },
  });
};

export const getDeck = async (id: string) => {
  return await prisma.deck.findFirst({
    where: { id },
    include: { cover_card: true },
  });
};
