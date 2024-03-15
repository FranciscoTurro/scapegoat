import Link from 'next/link';
import { getDeck } from '../../../data-access/decks';
import {
  GetNegationsReturnType,
  getNegations,
} from '../../../data-access/negations';
import { DraggableNegations } from './draggable-negations';
import { unstable_noStore } from 'next/cache';

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
    if (!negationsByNegatingCard[negation.negatingCardId]) {
      negationsByNegatingCard[negation.negatingCardId] = [];
    }
    negationsByNegatingCard[negation.negatingCardId].push(negation);
  });

  // Function to log the order of negations
  const changePrio = async (order: GetNegationsReturnType) => {
    'use server';

    const newPrios = order.map((item, index) => {
      return {
        ...item,
        priority: index + 1,
      };
    });

    console.log(
      `Negation Order for ${order[0].negatingCard.name}: `,
      newPrios.map(
        (order) => `${order.negatedCard.name} with prio ${order.priority}`
      )
    );
  };

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
      <div>
        {Object.entries(negationsByNegatingCard).map(
          ([negatingCardId, negationsForCard]) => (
            <DraggableNegations
              key={negatingCardId}
              negations={negationsForCard}
              changePrio={changePrio} // Pass the log function as prop
            />
          )
        )}
      </div>
    </div>
  );
};

export default DeckNegatesPage;
