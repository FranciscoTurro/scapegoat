import Image from 'next/image';

export const Level = ({ level }: { level: number }) => {
  return (
    <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
      <div>
        <div className="text-sm text-gray-400">Level</div>
        <div>{level}</div>
      </div>
      <Image src={'/misc/Level.png'} width={24} height={24} alt="Level" />
    </div>
  );
};
