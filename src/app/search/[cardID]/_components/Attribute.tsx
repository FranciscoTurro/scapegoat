import { Attributes } from '@prisma/client';
import Image from 'next/image';

export const Attribute = ({ attribute }: { attribute: Attributes }) => {
  return (
    <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
      <div>
        <div className="text-sm text-gray-400">Attribute</div>
        <div>{attribute}</div>
      </div>
      <Image
        src={`/misc/${attribute}.png`}
        width={24}
        height={24}
        alt={`${attribute} attribute`}
      />
    </div>
  );
};
