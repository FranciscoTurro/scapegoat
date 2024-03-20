'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '../../../../lib/auth/auth';
import { redirect } from 'next/navigation';
import { getErrorMessage } from '../../../../utils/utils';

export const createComboAction = async (formData: FormData) => {
  const session = await auth();
  if (!session || !session.user) throw new Error('NOT LOGGED IN');

  const name = formData.get('name') as string;

  if (!name)
    return {
      error: 'Combos must have a name',
    };

  try {
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath('/');

  redirect('/');
};
