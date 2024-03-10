import Image from 'next/image';

export const Level = ({ level, isXYZ }: { level: number; isXYZ: boolean }) => {
  const title = isXYZ ? 'Rank' : 'Level';
  const image = isXYZ ? '/misc/Rank.png' : '/misc/Level.png';

  return (
    <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <div>{level}</div>
      </div>
      <Image src={image} width={24} height={24} alt="Level" />
    </div>
  );
};
