'use client';

import { Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../../components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { CardInfo } from '../../../types/CardInfo';

export const Searchbar: React.FC<{ cards: CardInfo[] }> = ({ cards }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<CardInfo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('ul')
      ) {
        setFilteredItems([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

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
    setFilteredItems(filteredSuggestions.slice(0, 10));
  };

  const handleSuggestionClick = () => {
    setInputValue('');
    setFilteredItems([]);
  };

  return (
    <div className="container lg:px-20 w-full mx-auto flex flex-row items-center justify-center gap-4 pt-0 h-16 my-2">
      <div className="relative h-10 w-4/6">
        <Search className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search a card by name..."
          className="rounded-md border-border focus:border-white flex h-10 border-2 bg-background px-3 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-3 py-2 text-md w-full"
        />
        {filteredItems.length > 0 && (
          <ul className="absolute bg-background w-full z-10 border-x-2 border-b-2 border-white rounded shadow-lg">
            {filteredItems.map((item) => (
              <div className="flex items-center " key={item.id}>
                <Link
                  onClick={handleSuggestionClick}
                  className="hover:bg-accent  flex w-full"
                  href={`/search/${item.id}`}
                >
                  <li className="w-full flex items-center px-4 py-2 cursor-pointer">
                    {item.name}
                  </li>
                  <Image
                    className="w-auto"
                    src={item.small_image_path}
                    height={30}
                    width={20}
                    alt={item.name}
                  />
                </Link>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
