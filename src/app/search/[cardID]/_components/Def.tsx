import { Shield } from 'lucide-react';

export const Def = ({ def }: { def: number }) => {
  return (
    <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
      <div>
        <div className="text-sm text-gray-400">DEF</div>
        <div>{def}</div>
      </div>
      <Shield />
    </div>
  );
};
