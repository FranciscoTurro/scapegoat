import prisma from '../lib/db/db';

export const getDecksPaginated = async (
  page: number,
  perPage: number,
  filter: string
) => {
  const skip = (page - 1) * perPage;

  const decks = await prisma.deck.findMany({
    include: { cover_card: true },
    orderBy: { name: 'asc' },
    skip,
    take: perPage,
    where: {
      name: {
        contains: filter,
        mode: 'insensitive',
      },
    },
  });

  const totalDecks = await prisma.deck.count({
    where: {
      name: {
        contains: filter,
        mode: 'insensitive',
      },
    },
  });

  const totalPages = Math.ceil(totalDecks / perPage);

  return { decks, totalPages };
};

export const getDeck = async (id: string) => {
  return await prisma.deck.findFirst({
    where: { id },
    include: { cover_card: true },
  });
};

export const deleteDeck = async (id: string) => {
  await prisma.deck.delete({
    where: { id },
  });
};

export const createDeck = async (name: string, coverCardId: string) => {
  await prisma.deck.create({
    data: {
      name,
      coverCardId,
    },
  });
};
