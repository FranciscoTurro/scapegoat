'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../../../components/ui/input';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export const FilterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('filter', term);
      params.delete('page');
    } else {
      params.delete('filter');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="container px-20 w-full mx-auto flex flex-row items-center justify-center h-16 my-2">
      <div className="relative h-10 w-4/6">
        <Search className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
        <Input
          type="text"
          defaultValue={searchParams.get('filter')?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          placeholder="Filter decks by name..."
          className="rounded-md border-border focus:border-white flex h-10 border-2 bg-background px-3 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-3 py-2 text-md w-full"
        />
      </div>
    </div>
  );
};
