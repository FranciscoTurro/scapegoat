import prisma from '../lib/db/db';
import {
  ASH_BLOSSOM_ID,
  BELLE_ID,
  CROW_ID,
  GAMMA_ID,
  IMPERM_ID,
  OGRE_ID,
  VEILER_ID,
} from '../types/constants.d';

export const getCardsInfo = async () => {
  return await prisma.card.findMany({
    select: { name: true, id: true, small_image_path: true },
    orderBy: { name: 'asc' },
  });
};

export const getCard = async (id: string) => {
  return await prisma.card.findFirst({ where: { id } });
};

export const getCards = async () => {
  return await prisma.card.findMany();
};

export const getNegatingCards = async () => {
  return await prisma.card.findMany({
    where: {
      id: {
        in: [
          ASH_BLOSSOM_ID,
          IMPERM_ID,
          VEILER_ID,
          GAMMA_ID,
          OGRE_ID,
          BELLE_ID,
          CROW_ID,
        ],
      },
    },
    orderBy: { name: 'asc' },
  });
};

//TODO:
//add new card to database
