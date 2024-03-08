import Image from 'next/image';

export const Type = ({ type, id }: { type: string; id: string }) => {
  return (
    <div className="w-80 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
      <div>
        <div className="text-sm text-gray-400">Type</div>
        <div>{type}</div>
      </div>
      <Image src={`/cards/${id}_small.jpg`} width={24} height={24} alt="card" />
    </div>
  );
};
