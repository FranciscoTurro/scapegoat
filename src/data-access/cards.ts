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

export const getNegatingCards = async () => {
  return await prisma.card.findMany({
    where: {
      id: {
        in: [
          '14558127', //ash blossom
          '10045474', //imperm
          '97268402', //veiler
          '38814750', //gamma
          '59438930', //ogre
          '73642296', //belle
          '24508238', //crow
        ],
      },
    },
  });
};

//TODO:
//add new card to database
