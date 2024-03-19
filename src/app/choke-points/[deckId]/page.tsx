import Link from 'next/link';
import { getDeck } from '../../../data-access/decks';
import {
  GetNegationsReturnType,
  getNegations,
} from '../../../data-access/negations';
import { DraggableNegations } from './draggable-negations';
import { Button } from '../../../components/ui/button';
import { auth } from '../../../lib/auth/auth';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { deckId },
}: {
  params: { deckId: string };
}): Promise<Metadata> {
  const deck = await getDeck(deckId);

  return {
    title: {
      absolute: deck!.name + ' choke points - Scapegoat' ?? 'Scapegoat',
      default: 'Scapegoat',
    },
  };
}

interface NegationsByNegatingCard {
  [negatingCardId: string]: GetNegationsReturnType;
}

const DeckNegatesPage = async ({
  params: { deckId },
}: {
  params: { deckId: string };
}) => {
  const session = await auth();
  const authorizedUser =
    session && session.user && session.user.role == 'admin';

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
    <div className="flex flex-col">
      <div className="py-5 flex flex-col items-center">
        <h1 className="text-3xl font-bold">{deck?.name}</h1>
        <div className="container px-20 flex justify-between w-full">
          {authorizedUser ? (
            <Link
              className="mx-48"
              href={`/choke-points/${deckId}/add-negation`}
            >
              <Button className="font-bold" variant="ghost">
                Add negation
              </Button>
            </Link>
          ) : null}
          <p className="text-white/70 flex items-center text-sm">
            You can hover over cards to see their name
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-1">
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
