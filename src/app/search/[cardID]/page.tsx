import Image from 'next/image';
import { getCard } from '../../../data-access/cards';
import { Attribute } from './_components/Attribute';
import { Typing } from './_components/Typing';
import { Atk } from './_components/Atk';
import { Def } from './_components/Def';
import { Level } from './_components/Level';
import { LinkVal } from './_components/Linkval';
import { Type } from './_components/Type';

const CardPage = async ({
  params: { cardID },
}: {
  params: { cardID: string };
}) => {
  const card = await getCard(cardID);
  if (!card) return <div>error</div>;

  const descriptionWithLineBreaks = card.desc
    .split('\\n')
    .map((str) => <p key={str}>{str}</p>); //would love a cleaner solution

  return (
    <div className="w-full container pt-2">
      <div className="rounded-sm gap-10 pl-6 pr-2 w-full justify-between flex py-8 flex-row">
        <Image
          className="rounded-md"
          src={card!.full_image_path}
          width={400}
          height={500}
          alt={`${card.name} artwork`}
        />
        <div className="w-full flex flex-col gap-3">
          <div className="pt-2 font-bold text-4xl">{card.name}</div>
          <div className="flex flex-col pt-2 gap-5">
            <div className="flex pt-2 gap-5">
              <Type id={card.id} type={card.type} />
              <Typing type={card.race} />
            </div>
            <div className="flex pt-2 gap-5">
              {card.attribute ? <Attribute attribute={card.attribute} /> : null}
              {card.linkval ? <LinkVal linkval={card.linkval} /> : null}
              {card.level ? <Level level={card.level} /> : null}
              {card.atk ? <Atk atk={card.atk} /> : null}
              {card.def ? <Def def={card.def} /> : null}
            </div>
          </div>
          <div className="pt-2 text-lg">{descriptionWithLineBreaks}</div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
