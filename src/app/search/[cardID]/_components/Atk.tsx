import { Swords } from 'lucide-react';

export const Atk = ({ atk }: { atk: number }) => {
  return (
    <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
      <div>
        <div className="text-sm text-gray-400">ATK</div>
        <div>{atk}</div>
      </div>
      <Swords />
    </div>
  );
};
