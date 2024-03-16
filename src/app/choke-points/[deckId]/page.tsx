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
  const deckNegations = await getNegations(deckId);

  const negationsByNegatingCard: NegationsByNegatingCard = {};

  deckNegations.forEach((negation) => {
    if (!negationsByNegatingCard[negation.negatingCardId]) {
      negationsByNegatingCard[negation.negatingCardId] = [];
    }
    negationsByNegatingCard[negation.negatingCardId].push(negation);
  });

  return (
    <div>
      <p>{deck?.name}</p>
      <p>{deck?.cover_card.name}</p>
      <p className="text-white/70 text-sm">
        You can hover over the card to see it&apos;s name
      </p>
      <Link
        className="bg-red-200"
        href={`/choke-points/${deckId}/add-negation`}
      >
        add negation
      </Link>
      <div className="flex flex-col gap-1">
        {Object.entries(negationsByNegatingCard).map(
          ([negatingCardId, negationsForCard]) => (
            <DraggableNegations
              key={negatingCardId}
              negations={negationsForCard}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DeckNegatesPage;
