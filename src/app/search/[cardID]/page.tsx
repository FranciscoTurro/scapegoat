import Image from 'next/image';
import { getCard } from '../../../data-access/cards';
import { Construction, Shield, Swords, User } from 'lucide-react';
import { Attribute } from './_components/Attribute';
import { Type } from './_components/Type';

const CardPage = async ({
  params: { cardID },
}: {
  params: { cardID: string };
}) => {
  const card = await getCard(cardID);
  if (!card) return <div>error</div>;

  return (
    <div className="w-full container pt-8">
      ADD THE LINK VALUES YOU MORON
      <div className="rounded-sm gap-10 pl-6 pr-2 w-full justify-between flex py-8 flex-row">
        <Image
          className="rounded-md"
          src={card!.full_image_path}
          width={300}
          height={400}
          alt={`${card.name} artwork`}
        />
        <div className="w-full flex flex-col gap-3">
          <div className="pt-2 font-bold text-4xl">{card.name}</div>
          <div className="flex flex-col pt-2 gap-5">
            <div className="flex pt-2 gap-5">
              <div className="w-72 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
                <div>
                  <div className="text-sm text-gray-400">Type</div>
                  <div>{card.type}</div>
                </div>
                <Construction />
              </div>
              <Type type={card.race} />
            </div>
            <div className="flex pt-2 gap-5">
              {card.attribute ? <Attribute attribute={card.attribute} /> : null}
              {card.level ? (
                <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
                  <div>
                    <div className="text-sm text-gray-400">Level</div>
                    <div>{card.level}</div>
                  </div>
                  <Image
                    src={'/misc/Level.png'}
                    width={24}
                    height={24}
                    alt="Level"
                  />
                </div>
              ) : null}
              {card.atk ? (
                <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
                  <div>
                    <div className="text-sm text-gray-400">ATK</div>
                    <div>{card.atk}</div>
                  </div>
                  <Swords />
                </div>
              ) : null}
              {card.def ? (
                <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
                  <div>
                    <div className="text-sm text-gray-400">DEF</div>
                    <div>{card.def}</div>
                  </div>
                  <Shield />
                </div>
              ) : null}
            </div>
          </div>
          <div className="pt-2 text-lg">{card.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
