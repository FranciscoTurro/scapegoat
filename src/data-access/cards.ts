import prisma from '../lib/db/db';

export const getCardsInfo = async () => {
  return await prisma.card.findMany({
    select: { name: true, id: true, small_image_path: true },
    orderBy: { name: 'asc' },
  });
};

export const getCard = async (id: string) => {
  return await prisma.card.findFirst({ where: { id } });
};

//TODO:
//add new card to database
