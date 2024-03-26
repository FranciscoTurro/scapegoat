'use client';
import { Input } from '../../../components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { GetCardsInfoType } from '../../../data-access/cards';
import Image from 'next/image';
import { CardInfo } from '../../../types/CardInfo';
import { useDebouncedCallback } from 'use-debounce';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';

export const ComboWizardCards = ({
  cards,
  onCardClick,
}: {
  cards: GetCardsInfoType;
  onCardClick: (name: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<GetCardsInfoType>([]);
  const [recents, setRecents] = useState<CardInfo[]>([]);

  const updateRecents = (card: CardInfo) => {
    if (recents.find((recent) => recent.id === card.id)) return;

    if (recents.length < 6) {
      setRecents([...recents, card]);
    } else {
      const shiftedArray = [...recents, card];
      shiftedArray.shift();
      setRecents(shiftedArray);
    }
  };

  const handleInputChange = useDebouncedCallback((event) => {
    const value = event;
    setInputValue(value);

    if (value === '') {
      setFilteredItems([]);
      return;
    }

    const filteredSuggestions = cards.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredItems(filteredSuggestions.slice(0, 500));
  }, 200);

  return (
    <div className="w-1/3 mx-7 border-2 p-2 overflow-scroll border-border rounded">
      <div className="relative h-10 w-full">
        <Search className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          defaultValue={inputValue}
          type="text"
          onChange={(e) => {
            handleInputChange(e.target.value);
          }}
          placeholder="Search cards..."
          className="rounded-md border-border focus:border-white flex h-10 border-2 bg-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-3 text-md w-full"
        />
      </div>
      <div>
        {recents.length > 0 ? (
          <div className="flex mt-1 border-b-2 items-center border-border">
            <p className="text-white/60 p-0 m-0">Recents</p>
            <div className="flex gap-2 pb-1 ml-6 justify-center flex-wrap">
              {recents.map((card) => (
                <Image
                  key={`${card.id}_recent`}
                  className="cursor-pointer h-28 w-auto"
                  src={card.small_image_path}
                  height={100}
                  width={100}
                  alt={card.name}
                  onClick={() => {
                    onCardClick(card.name);
                  }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex gap-2 my-2 ml-6 content-start h-96 justify-start flex-wrap">
        {filteredItems.map((card) => (
          <div key={card.id}>
            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <TooltipTrigger>
                  <Image
                    className="cursor-pointer h-32 w-auto"
                    src={card.small_image_path}
                    height={100}
                    width={100}
                    alt={card.name}
                    onClick={() => {
                      onCardClick(card.name);
                      updateRecents(card);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{card.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </div>
  );
};
