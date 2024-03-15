import Link from 'next/link';
import { getDeck } from '../../../data-access/decks';
import {
  GetNegationsReturnType,
  getNegations,
} from '../../../data-access/negations';
import { DraggableNegations } from './draggable-negations';

interface NegationsByNegatingCard {
  [negatingCardId: string]: GetNegationsReturnType;
}

const DeckNegatesPage = async ({
  params: { deckId },
}: {
  params: { deckId: string };
}) => {
  const deck = await getDeck(deckId);
  const negations = await getNegations(deckId);

  const negationsByNegatingCard: NegationsByNegatingCard = {};

  negations.forEach((negation) => {
    const negatingCardId = negation.negatingCardId;
    if (!negationsByNegatingCard[negatingCardId]) {
      negationsByNegatingCard[negatingCardId] = [];
    }
    negationsByNegatingCard[negatingCardId].push(negation);
  });

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
      {Object.entries(negationsByNegatingCard).map(
        ([negatingCardId, negationsForCard]) => {
          return (
            <DraggableNegations
              key={negatingCardId}
              negations={negationsForCard}
            />
          );
        }
      )}
    </div>
  );
};

export default DeckNegatesPage;
