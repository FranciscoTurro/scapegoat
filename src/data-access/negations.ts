import prisma from '../lib/db/db';
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type GetNegationsReturnType = ThenArg<ReturnType<typeof getNegations>>;
export const getNegations = async (deckId: string) => {
  return await prisma.negation.findMany({
    where: { deckId },
    include: { deck: true, negatedCard: true, negatingCard: true },
    orderBy: [{ negatingCardId: 'asc' }, { priority: 'asc' }],
  });
};

export const getNegatedByCards = async (
  negatingCardId: string,
  deckId: string
) => {
  return await prisma.negation.findMany({
    where: { negatingCardId, deckId },
  });
};

export const createNegation = async (
  deckId: string,
  negatedCardId: string,
  negatingCardId: string,
  comment: string | undefined,
  priority: number
) => {
  await prisma.negation.create({
    data: {
      deckId,
      negatedCardId,
      negatingCardId,
      comment,
      priority,
    },
  });
};
