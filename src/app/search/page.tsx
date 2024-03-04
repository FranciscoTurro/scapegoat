import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';

const SearchPage = () => {
  return (
    <div className="container lg:px-20 w-full mx-auto flex flex-row items-center justify-center gap-4 pt-0 h-16 my-2">
      <div className="relative h-10 w-1/2 rounded-md">
        <Search className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
        <Input className="border-primary flex h-10 border-2 bg-background px-3 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/90 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-3 py-2 text-md w-full rounded-lg" />
      </div>
    </div>
  );
};

export default SearchPage;
