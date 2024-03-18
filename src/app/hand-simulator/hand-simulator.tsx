'use client';

import { Card } from '@prisma/client';
import { CardInfo } from '../../types/CardInfo';
import { useState } from 'react';
import { SetArraySearchbar } from './_components/set-array-searchbar';
import Image from 'next/image';

export const HandSimulator = ({ cards }: { cards: Card[] }) => {
  const [state, setState] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card>();

  const cardInfo: CardInfo[] = cards.map((card) => {
    return {
      id: card.id,
      name: card.name,
      small_image_path: card.small_image_path,
    };
  });

  const descriptionWithLineBreaks = selectedCard?.desc
    .split('\\n')
    .map((str) => <p key={str}>{str}</p>); //would love a cleaner solution

  return (
    <div className="flex flex-col items-center">
      <div className="container px-20 w-full mx-auto flex flex-col items-center justify-center h-16 my-2">
        <div className="relative h-10 w-4/6">
          <SetArraySearchbar setter={setState} state={state} cards={cardInfo} />
        </div>
      </div>
      <div className="pt-12 mx-10 flex flex-wrap gap-4">
        {state!
          ? state.map((cardId, index) => {
              const card = cards.find((card) => cardId === card.id);
              if (!card) return;
              return (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => setSelectedCard(card)}
                >
                  <Image
                    src={card?.full_image_path}
                    height={150}
                    width={150}
                    alt={card.name}
                  />
                </div>
              );
            })
          : null}
      </div>
      <div className="pt-12">
        {selectedCard ? (
          <div className="flex items-center justify-center gap-2">
            <Image
              className="border-2 border-white"
              src={selectedCard.full_image_path}
              height={200}
              width={200}
              alt={selectedCard.name}
            />
            <p className="w-1/3">{descriptionWithLineBreaks}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
