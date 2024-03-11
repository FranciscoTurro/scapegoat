import { getCardsInfo } from '../../data-access/cards';
import { Searchbar } from './_components/Searchbar';

const SearchLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cards = await getCardsInfo();

  return (
    <>
      <Searchbar cards={cards} />
      {children}
    </>
  );
};

export default SearchLayout;
