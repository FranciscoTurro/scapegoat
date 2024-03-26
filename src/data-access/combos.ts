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
