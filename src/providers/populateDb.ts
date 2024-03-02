import * as cards from '../../../../Desktop/cardinfo.php.json';
import prisma from '../lib/db/db';

export const loadPrismaFromJSON = async () => {
  //make a call to the api, get all cards and download it as a json. seems like the easiest way to populate the db
  const obj = JSON.parse(JSON.stringify(cards));

  const cardDataArray: any[] = [];

  await obj.data.forEach((card: any) => {
    let atk: number | null = null;
    let def: number | null = null;
    let level: number | null = null;
    let attribute: string | null = null;

    if (card.atk) atk = card.atk;
    if (card.def) def = card.def;
    if (card.level) level = card.level;
    if (card.attribute) attribute = card.attribute;

    const cardData = {
      id: card.id.toString() as string,
      name: card.name as string,
      type: card.type as string,
      desc: card.desc as string,
      race: card.race as string,
      atk,
      def,
      level,
      attribute,
      full_image_path: card.card_images[0].image_url,
      small_image_path: card.card_images[0].image_url_small,
    };

    cardDataArray.push(cardData);
    console.log(card.id);
  });

  await prisma.card.createMany({
    data: cardDataArray,
  });
};
