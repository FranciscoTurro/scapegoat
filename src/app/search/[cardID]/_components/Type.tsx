import { Types } from '@prisma/client';
import Image from 'next/image';

export const Type = ({ type }: { type: Types }) => {
  const value = getValue(type);

  return (
    <div className="w-72 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
      <div>
        <div className="text-sm text-gray-400">Typing</div>
        <div>{value}</div>
      </div>
      <Image src={`/misc/${type}.png`} width={24} height={24} alt={`${type}`} />
    </div>
  );
};

const getValue = (type: Types) => {
  switch (type) {
    case 'Beast_Warrior':
      return 'Beast-Warrior';
    case 'Creator_God':
      return 'Creator God';
    case 'Divine_Beast':
      return 'Divine-Beast';
    case 'Quick_Play':
      return 'Quick-Play';
    case 'Sea_Serpent':
      return 'Sea Serpent';
    case 'Winged_Beast':
      return 'Winged Beast';
    default:
      return type;
  }
};
