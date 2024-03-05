import { getCardNames } from '../data-access/cards';
import { Searchbar } from './_components/Searchbar';

const SearchPage = async () => {
  const cardNames = await getCardNames();
  return (
    <div>
      <div>
        <p>search</p>
        <Searchbar names={cardNames} />
      </div>
    </div>
  );
};

export default SearchPage;
