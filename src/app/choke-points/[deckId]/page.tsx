import Link from 'next/link';
import { getDeck } from '../../../data-access/decks';
import { getNegations } from '../../../data-access/negations';

const DeckNegatesPage = async ({
  params: { deckId },
}: {
  params: { deckId: string };
}) => {
  const deck = await getDeck(deckId);
  const negations = await getNegations(deckId);

  return (
    <div>
      <p>{deck?.name}</p>
      <p>{deck?.cover_card.name}</p>
      <Link
        className="bg-red-200"
        href={`/choke-points/${deckId}/add-negation`}
      >
        add negation
      </Link>
      {negations.map((negation) => (
        <div className="flex gap-2" key={negation.id}>
          <p>{negation.negatingCard.name}</p>
          <p>negates</p>
          <p>{negation.negatedCard.name}</p>
        </div>
      ))}
    </div>
  );
};

export default DeckNegatesPage;
