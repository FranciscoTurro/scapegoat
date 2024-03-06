'use client';

import { Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../components/ui/input';
import Link from 'next/link';
import Image from 'next/image';

interface CardNames {
  id: string;
  name: string;
  small_image_path: string;
}

export const Searchbar: React.FC<{ names: CardNames[] }> = ({ names }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<CardNames[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
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

    const filteredSuggestions = names.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filteredSuggestions.slice(0, 10));
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: CardNames) => {
    setInputValue('');
    setFilteredItems([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="relative h-10 w-full">
      <Search className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
      <Input
        ring={false}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Quick card search"
        className="rounded-md border-gray-200 focus:border-primary flex h-10 border-2 bg-background px-3 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-3 py-2 text-md w-full"
      />
      {filteredItems.length > 0 && (
        <ul className="absolute bg-background w-full z-10 border-x-2 border-b-2 border-primary rounded shadow-lg">
          {filteredItems.map((item, index) => (
            <div className="flex items-center" key={item.id}>
              <Link href={`/card/${item.id}`}>
                <li
                  onClick={() => handleSuggestionClick(item)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-200/70 ${
                    index === selectedIndex ? 'bg-gray-200/70' : ''
                  }`}
                >
                  {item.name}
                </li>
              </Link>
              <Image
                src={item.small_image_path}
                width={20}
                height={20}
                alt={item.name}
              />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
