import { Searchbar } from '../_components/Searchbar';
import { getCardsInfo } from '../../data-access/cards';

const SearchLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cards = await getCardsInfo();

  return (
    <div>
      <Searchbar cards={cards} />
      {children}
    </div>
  );
};

export default SearchLayout;
