import { Attributes, Types } from '@prisma/client';
import * as cards from '../../../../Desktop/cardinfo.php.json';
import prisma from '../lib/db/db';
import * as fs from 'fs';
import * as path from 'path';

export const loadDbFromJSON = async () => {
  //make a call to the api, get all cards and download it as a json. seems like the easiest way to populate the db

  const cardDataArray: any[] = [];

  const obj = JSON.parse(JSON.stringify(cards));

  await obj.data.forEach((card: any) => {
    let atk: number | null = null;
    let def: number | null = null;
    let level: number | null = null;
    let attribute: Attributes | null = null;
    let linkval: number | null = null;

    if (card.atk) atk = card.atk;
    if (card.def) def = card.def;
    if (card.level) level = card.level;
    if (card.linkval) linkval = card.linkval;
    if (card.attribute) attribute = getAttribute(card.attribute as string);

    let race = getRace(card.race as string);

    const cardData = {
      id: card.id.toString() as string,
      name: card.name as string,
      type: card.type as string,
      desc: card.desc.replace(/\n/g, '\\n') as string,
      race,
      atk,
      def,
      level,
      linkval,
      attribute,
      full_image_path: `/cards/${card.id}.jpg`,
      small_image_path: `/cards/${card.id}_small.jpg`,
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

const getAttribute = (attribute: string) => {
  switch (attribute) {
    case 'DARK':
      return Attributes.DARK;
    case 'LIGHT':
      return Attributes.LIGHT;
    case 'EARTH':
      return Attributes.EARTH;
    case 'WIND':
      return Attributes.WIND;
    case 'FIRE':
      return Attributes.FIRE;
    case 'WATER':
      return Attributes.WATER;
    case 'DIVINE':
      return Attributes.DIVINE;
    default:
      return Attributes.DARK; //awful
  }
};

const getRace = (race: string) => {
  switch (race) {
    case 'Beast-Warrior':
      return Types.Beast_Warrior;
    case 'Creator God':
      return Types.Creator_God;
    case 'Divine-Beast':
      return Types.Divine_Beast;
    case 'Sea Serpent':
      return Types.Sea_Serpent;
    case 'Winged Beast':
      return Types.Winged_Beast;
    case 'Quick-Play':
      return Types.Quick_Play;
    case 'Aqua':
      return Types.Aqua;
    case 'Beast':
      return Types.Beast;
    case 'Continuous':
      return Types.Continuous;
    case 'Counter':
      return Types.Counter;
    case 'Cyberse':
      return Types.Cyberse;
    case 'Dinosaur':
      return Types.Dinosaur;
    case 'Dragon':
      return Types.Dragon;
    case 'Equip':
      return Types.Equip;
    case 'Fairy':
      return Types.Fairy;
    case 'Field':
      return Types.Field;
    case 'Fiend':
      return Types.Fiend;
    case 'Fish':
      return Types.Fish;
    case 'Insect':
      return Types.Insect;
    case 'Machine':
      return Types.Machine;
    case 'Normal':
      return Types.Normal;
    case 'Plant':
      return Types.Plant;
    case 'Psychic':
      return Types.Psychic;
    case 'Pyro':
      return Types.Pyro;
    case 'Reptile':
      return Types.Reptile;
    case 'Ritual':
      return Types.Ritual;
    case 'Rock':
      return Types.Rock;
    case 'Spellcaster':
      return Types.Spellcaster;
    case 'Thunder':
      return Types.Thunder;
    case 'Warrior':
      return Types.Warrior;
    case 'Wyrm':
      return Types.Wyrm;
    case 'Zombie':
      return Types.Zombie;
    default:
      return Types.Warrior; //awful
  }
};
