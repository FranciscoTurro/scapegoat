'use client';

import { Card, Combo } from '@prisma/client';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useState } from 'react';
import { createComboAction } from '../create-combo/_actions/create-combo-action';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';

export const ComboWizard = ({
  cards,
  combo,
}: {
  cards: Card[];
  combo?: Combo;
}) => {
  const [error, setError] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const clientAction = async (formData: FormData) => {
    const result = await createComboAction(formData);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="pt-16 flex flex-col w-full items-center justify-center">
      <form
        action={clientAction}
        className="w-1/4 flex flex-col gap-3 items-start"
      >
        <div className="font-semibold">Name</div>
        <Input name="name" />
        <Button type="submit">Submit combo</Button>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isPublic}
            onCheckedChange={(e) => setIsPublic(e.valueOf())}
            id="public"
          />
          <Label htmlFor="public">Public combo</Label>
        </div>
        {error ? (
          <div className="font-semibold text-red-500">{error}</div>
        ) : null}
      </form>
    </div>
  );
};
