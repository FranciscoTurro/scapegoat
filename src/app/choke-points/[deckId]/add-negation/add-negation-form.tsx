'use client';

import { useState } from 'react';
import { addNegationAction } from './_actions/addNegation';
import Image from 'next/image';
import { Navigation2Off } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { CardInfo } from '../../../../types/CardInfo';
import { SetCardSearchbar } from '../../../_components/set-card-searchbar';
import { Textarea } from '../../../../components/ui/textarea';
import { Card } from '@prisma/client';
import { NegatingCardsSelect } from './_components/negating-cards-select';

export const AddNegationForm: React.FC<{
  cards: CardInfo[];
  deckId: string;
  negatingCards: Card[];
}> = ({ cards, deckId, negatingCards }) => {
  const [negatingCard, setNegatingCard] = useState<CardInfo>();
  const [negatedCard, setNegatedCard] = useState<CardInfo>();
  const [error, setError] = useState('');

  const clientAction = async (formData: FormData) => {
    if (!negatingCard || !negatedCard) setError('Must select both cards');

    const comment = formData.get('comment')?.toString();

    const result = await addNegationAction(
      negatingCard!,
      negatedCard!,
      comment,
      deckId
    );

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="pt-8 flex flex-col w-full items-center justify-center">
      <form
        action={clientAction}
        className="w-1/4 flex flex-col gap-2 items-start"
      >
        <div className="font-semibold">Negating card</div>
        <NegatingCardsSelect setter={setNegatingCard} cards={negatingCards} />
        <div className="font-semibold">Negated card</div>
        <SetCardSearchbar setter={setNegatedCard} cards={cards} />
        <div className="font-semibold">Comment (optional)</div>
        <Textarea name="comment" placeholder="Enter your comment" />
        <Button disabled={!negatedCard || !negatingCard} type="submit">
          Add negation
        </Button>
        {error ? (
          <div className="font-semibold text-red-500">{error}</div>
        ) : null}
      </form>
      <div className="flex w-full justify-center pt-10 gap-20">
        {negatingCard ? (
          <Image
            className="w-auto h-auto"
            src={negatingCard.small_image_path}
            width={100}
            height={100}
            alt={`${negatingCard.name}'s image`}
          />
        ) : null}
        {negatingCard ? (
          <div className="flex items-center">
            <Navigation2Off className="rotate-90" size={50} />
          </div>
        ) : null}{' '}
        {negatedCard ? (
          <Image
            className="w-auto h-auto"
            src={negatedCard.small_image_path}
            width={100}
            height={100}
            alt={`${negatedCard.name}'s image`}
          />
        ) : null}
      </div>
    </div>
  );
};
