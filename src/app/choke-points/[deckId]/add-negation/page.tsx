import { redirect } from 'next/navigation';
import { getCardsInfo } from '../../../data-access/cards';
import { auth } from '../../../lib/auth/auth';
import { AddNegationForm } from './add-negation-form';

const NegationPage = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin') redirect('/');

  const cards = await getCardsInfo();

  return <AddNegationForm cards={cards} />;
};

export default NegationPage;
