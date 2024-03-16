'use server';

import { revalidatePath } from 'next/cache';
import {
  GetNegationsReturnType,
  updatePrio,
} from '../../../../data-access/negations';
import { getErrorMessage } from '../../../../utils/utils';

export const updatePrioAction = async (newPrios: GetNegationsReturnType) => {
  try {
    await updatePrio(newPrios);
  } catch (error) {
    getErrorMessage(error);
  }

  revalidatePath('/');
};
