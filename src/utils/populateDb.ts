import * as cards from '../../../../Desktop/cardinfo.php.json';
import prisma from '../lib/db/db';
import * as fs from 'fs';
import * as path from 'path';

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

export const downloadImages = async () => {
  const obj = JSON.parse(JSON.stringify(cards));
  const downloadFolder = 'D:\\scapegoat_images';
  const delayBetweenRequests = 150;

  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
  }

  for (const card of obj.data) {
    const fullImageName = `${card.id}.jpg`;
    const smallImageName = `${card.id}_small.jpg`;

    await downloadImage(
      card.card_images[0].image_url,
      path.join(downloadFolder, fullImageName)
    );

    await downloadImage(
      card.card_images[0].image_url_small,
      path.join(downloadFolder, smallImageName)
    );

    console.log(`Downloaded images for card: ${card.name}`);

    await delay(delayBetweenRequests);
  }
};

export const renameImageRoutes = async () => {
  await prisma.$transaction(
    (
      await prisma.card.findMany()
    ).map((card) =>
      prisma.card.update({
        where: { id: card.id },
        data: {
          full_image_path: `/cards/${card.id}.jpg`,
          small_image_path: `/cards/${card.id}_small.jpg`,
        },
      })
    )
  );
  console.log('renamed all images');
};

const downloadImage = async (url: string, filePath: string) => {
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
