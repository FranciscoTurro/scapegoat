import { redirect } from 'next/navigation';
import { AddNegationForm } from './add-negation-form';
import { getCardsInfo, getNegatingCards } from '../../../../data-access/cards';
import { auth } from '../../../../lib/auth/auth';
import { getDeck } from '../../../../data-access/decks';
import { getNegations } from '../../../../data-access/negations';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { deckId },
}: {
  params: { deckId: string };
}): Promise<Metadata> {
  const deck = await getDeck(deckId);

  return {
    title: {
      absolute: deck!.name + ' - Scapegoat' ?? 'Scapegoat',
      default: 'Scapegoat',
    },
  };
}

const NegationPage = async ({
  params: { deckId },
}: {
  params: { deckId: string };
}) => {
  const session = await auth();
  if (!session || !session.user || session.user.role != 'admin') redirect('/');

  const deck = await getDeck(deckId);
  const negatingCards = await getNegatingCards();
  const cards = await getCardsInfo();

  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 text-xl">Add negation for {deck?.name} deck</div>
      <AddNegationForm
        deckId={deckId}
        cards={cards}
        negatingCards={negatingCards}
      />
    </div>
  );
};

export default NegationPage;
