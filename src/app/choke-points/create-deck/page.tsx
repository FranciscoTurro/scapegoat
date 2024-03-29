import { redirect } from 'next/navigation';
import { getCardsInfo } from '../../../data-access/cards';
import { auth } from '../../../lib/auth/auth';
import { CreateDeckForm } from './create-deck-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create deck - Scapegoat',
};

const CreateDeckPage = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin') redirect('/');

  const cards = await getCardsInfo();

  return <CreateDeckForm cards={cards} />;
};

export default CreateDeckPage;
