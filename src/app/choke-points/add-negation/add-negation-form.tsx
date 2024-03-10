'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { CardInfo } from '../../../types/CardInfo';
import { SetCardSearchbar } from '../../_components/SetCardSearchbar';
import { addNegation } from './_actions/addNegation';
import Image from 'next/image';
import { Navigation2Off } from 'lucide-react';

export const AddNegationForm: React.FC<{ cards: CardInfo[] }> = ({ cards }) => {
  const [negatingCard, setNegatingCard] = useState<CardInfo>();
  const [negatedCard, setNegatedCard] = useState<CardInfo>();

  const addNegationWithCard = addNegation.bind(
    null,
    negatingCard!,
    negatedCard!
  );

  return (
    <div className="pt-16 flex flex-col w-full items-center justify-center">
      <form
        action={addNegationWithCard}
        className="w-1/4 flex flex-col gap-3 items-start"
      >
        <div className="font-semibold">Negating card</div>
        <SetCardSearchbar setter={setNegatingCard} cards={cards} />
        <div className="font-semibold">Negated card</div>
        <SetCardSearchbar setter={setNegatedCard} cards={cards} />
        <Button type="submit">Add negation</Button>
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
