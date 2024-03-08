import Image from 'next/image';
import { getCard } from '../../../data-access/cards';

const CardPage = async ({
  params: { cardID },
}: {
  params: { cardID: string };
}) => {
  const card = await getCard(cardID);
  return (
    <div>
      <Image
        src={card!.full_image_path}
        width={300}
        height={400}
        alt="the cads"
      />
    </div>
  );
};

export default CardPage;
