'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dispatch, SetStateAction } from 'react';
import { CardInfo } from '../../../../../types/CardInfo';

export const NegatingCardsSelect: React.FC<{
  cards: CardInfo[];
  setter: Dispatch<SetStateAction<CardInfo | undefined>>;
}> = ({ cards, setter }) => {
  return (
    <Select
      onValueChange={(value) => {
        const card = cards.find((card) => card.id === value); //too expensive methinks
        setter(card);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a card" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Negating Cards</SelectLabel>
          {cards.map((card) => (
            <SelectItem key={card.id} value={card.id}>
              {card.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
