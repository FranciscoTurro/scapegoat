'use client';
import { Input } from '../../../components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { GetCardsInfoType } from '../../../data-access/cards';
import Image from 'next/image';

export const ComboWizardCards = ({
  cards,
  onCardClick,
}: {
  cards: GetCardsInfoType;
  onCardClick: (name: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<GetCardsInfoType>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === '') {
      setFilteredItems([]);
      return;
    }

    const filteredSuggestions = cards.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filteredSuggestions.slice(0, 500));
  };

  return (
    <div className="w-1/5 p-2 mx-7 border-2 overflow-scroll border-border rounded">
      <div className="relative h-10 w-full">
        <Search className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          value={inputValue}
          type="text"
          onChange={handleInputChange}
          placeholder="Search cards..."
          className="rounded-md border-border focus:border-white flex h-10 border-2 bg-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-3 text-md w-full"
        />
      </div>
      <div className="flex gap-2 my-2 ml-4 content-start h-96 justify-start flex-wrap">
        {filteredItems.map((card) => (
          <Image
            key={card.id}
            className="cursor-pointer h-28 w-auto"
            src={card.small_image_path}
            height={100}
            width={100}
            alt={card.name}
            onClick={() => onCardClick(card.name)}
          />
        ))}
      </div>
    </div>
  );
};
