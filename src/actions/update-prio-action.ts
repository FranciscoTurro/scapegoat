'use server';

import { revalidatePath } from 'next/cache';
import { GetNegationsReturnType, updatePrio } from '../data-access/negations';
import { getErrorMessage } from '../utils/utils';
import { auth } from '../lib/auth/auth';

export const updatePrioAction = async (newPrios: GetNegationsReturnType) => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin')
    throw new Error('NOT ADMIN');

  try {
    await updatePrio(newPrios);
  } catch (error) {
    getErrorMessage(error);
  }

  revalidatePath('/');
};
