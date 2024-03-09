'use client';

import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { SetCardSearchbar } from '../../../_components/SetCardSearchbar';
import { CardInfo } from '../../../../types/CardInfo';
import { createDeck } from '../_actions/create-deck';

export const CreateDeckForm: React.FC<{ cards: CardInfo[] }> = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState<CardInfo>();
  const createDeckWithCard = createDeck.bind(null, selectedCard!);

  return (
    <div className="pt-16 flex justify-center">
      <form
        action={createDeckWithCard}
        className="w-1/4 flex flex-col gap-3 items-start"
      >
        <div className="font-semibold">Deck name</div>
        <Input name="deck" />
        <div className="font-semibold">Cover card</div>
        <SetCardSearchbar setter={setSelectedCard} cards={cards} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
