import { redirect } from 'next/navigation';
import { AddNegationForm } from './add-negation-form';
import { getCardsInfo } from '../../../../data-access/cards';
import { auth } from '../../../../lib/auth/auth';
import { getDeck } from '../../../../data-access/decks';
import { getNegations } from '../../../../data-access/negations';

const NegationPage = async ({
  params: { deckId },
}: {
  params: { deckId: string };
}) => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin') redirect('/');

  const deck = await getDeck(deckId);

  const cards = await getCardsInfo();

  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 text-xl">Add negation for {deck?.name} deck</div>
      <AddNegationForm deckId={deckId} cards={cards} />
    </div>
  );
};

export default NegationPage;
