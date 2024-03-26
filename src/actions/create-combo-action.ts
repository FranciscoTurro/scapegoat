'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '../lib/auth/auth';
import { redirect } from 'next/navigation';
import { getErrorMessage } from '../utils/utils';
import { CardInfo } from '../types/CardInfo';
import { createCombo } from '../data-access/combos';

export const createComboAction = async (
  coverCard: CardInfo,
  content: string,
  formData: FormData
) => {
  const session = await auth();
  if (!session || !session.user) throw new Error('NOT LOGGED IN');

  const name = formData.get('name') as string;
  const isPublic = formData.get('public') as string;

  if (!name)
    return {
      error: 'Combos must have a name',
    };

  if (!coverCard)
    return {
      error: 'Combos must have a cover card',
    };

  if (
    //jesus christ man
    !content ||
    content ==
      '[{"type":"orderedList","attrs":{"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph"}]}]}]'
  )
    return {
      error: 'Bro come on',
    };

  try {
    createCombo(name, coverCard.id, session.user.id, content, !!isPublic);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath('/');

  redirect('/combos');
};
