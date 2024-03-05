'use client';

import { Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../../components/ui/input';

interface CardNames {
  id: string;
  name: string;
}

export const Searchbar: React.FC<{ names: CardNames[] }> = ({ names }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<CardNames[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMouseOver, setIsMouseOver] = useState(false); // Flag to track mouse hover
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input when component mounts
    }
  }, []);

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
    setFilteredItems(filteredSuggestions.slice(0, 15));
    setSelectedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isMouseOver && event.key !== 'Enter') {
      event.preventDefault(); // Prevent arrow key navigation if mouse is over the list
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (selectedIndex < filteredItems.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedIndex >= 0) {
        setInputValue(filteredItems[selectedIndex].name);
        setFilteredItems([]);
        setSelectedIndex(-1);
        setIsMouseOver(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion: CardNames) => {
    setInputValue(suggestion.name);
    setFilteredItems([]);
    setSelectedIndex(-1);
    setIsMouseOver(false);
    console.log(suggestion.id);
  };

  return (
    <div className="container lg:px-20 w-full mx-auto flex flex-row items-center justify-center gap-4 pt-0 h-16 my-2">
      <div className="relative h-10 w-1/2 rounded-md">
        <Search className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
        <Input
          ring={false}
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="focus:border-primary border-gray-200 flex h-10 border-2 bg-background px-3 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-3 py-2 text-md w-full rounded-lg"
        />
        {filteredItems.length > 0 && (
          <ul
            className="absolute w-11/12 left-6 z-10 border-x-2 border-b-2 border-primary rounded shadow-lg"
            onMouseEnter={() => {
              setIsMouseOver(true);
              setSelectedIndex(-1); // Clear selected index when mouse enters
            }}
            onMouseLeave={() => setIsMouseOver(false)}
          >
            {filteredItems.map((item, index) => (
              <li
                key={item.id}
                onClick={() => handleSuggestionClick(item)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200/70 ${
                  index === selectedIndex ? 'bg-gray-200/70' : ''
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
