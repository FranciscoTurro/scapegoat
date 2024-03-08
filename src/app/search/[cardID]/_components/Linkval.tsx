import { Cable } from 'lucide-react';

export const LinkVal = ({ linkval }: { linkval: number }) => {
  return (
    <div className="w-56 flex items-center justify-between border px-4 py-2 rounded-sm border-border">
      <div>
        <div className="text-sm text-gray-400">Link</div>
        <div>{linkval}</div>
      </div>
      <Cable />
    </div>
  );
};
