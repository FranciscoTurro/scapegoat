import prisma from '../../lib/db/db';

export const getCardNames = async () => {
  return await prisma.card.findMany({
    select: { name: true, id: true },
    orderBy: { name: 'asc' },
  });
};
