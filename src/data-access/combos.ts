import prisma from '../lib/db/db';

export const createCombo = async (
  name: string,
  coverCardId: string,
  userId: string,
  content: string,
  isPublic: boolean
) => {
  await prisma.combo.create({
    data: {
      name,
      cardId: coverCardId,
      content,
      userId,
      public: isPublic,
    },
  });
};

export const getCombosPaginated = async (
  page: number,
  perPage: number,
  filter: string
) => {
  const skip = (page - 1) * perPage;

  const combos = await prisma.combo.findMany({
    include: { cover_card: true, creator: true },
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

  const totalCombos = await prisma.combo.count({
    where: {
      name: {
        contains: filter,
        mode: 'insensitive',
      },
    },
  });

  const totalPages = Math.ceil(totalCombos / perPage);

  return { combos, totalPages };
};

export const getCombo = async (id: string) => {
  return await prisma.combo.findFirst({
    where: { id },
    include: { cover_card: true },
  });
};
