import { getCard } from '../../../data-access/cards';

const CardPage = async ({
  params: { cardID },
}: {
  params: { cardID: string };
}) => {
  const card = await getCard(cardID);
  return <div>{card?.name}</div>;
};

export default CardPage;
