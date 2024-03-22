'use client';

import { Card, Combo } from '@prisma/client';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useState } from 'react';
import { createComboAction } from '../../../actions/create-combo-action';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Tiptap } from './tiptap';

export const ComboWizard = ({
  cards,
  combo,
}: {
  cards: Card[];
  combo?: Combo;
}) => {
  const [error, setError] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [value, setValue] = useState('');

  const clientAction = async (formData: FormData) => {
    const result = await createComboAction(formData);

    if (result.error) {
      setError(result.error);
    }
  };

  const appendTextToLast = (value: any) => {
    const currentValue = JSON.parse(value);
    currentValue[0].content[
      currentValue[0].content.length - 1
    ].content[0].content[
      currentValue[0].content[currentValue[0].content.length - 1].content[0]
        .content.length - 1
    ].text += 'HELLOFRIEND';
    setValue(JSON.stringify(currentValue));
  }; //single worst piece of code i have written in my entire life. its hacky, unreadable, fragile, doesnt
  //follow one clean code axiom..... im almost proud of it

  return (
    <div className="pt-16 flex flex-col w-full items-center justify-center">
      <form
        action={clientAction}
        className="w-1/2 flex flex-col gap-3 items-start"
      >
        <div className="font-semibold">Name</div>
        <Input name="name" />
        <div className="font-semibold">Combo</div>
        <Tiptap value={value} setter={setValue} />
        <div className="flex gap-10 justify-between w-full items-center">
          <Button type="submit">Submit combo</Button>
          <div className="flex flex-col gap-1 items-center">
            <Label htmlFor="public">Public</Label>
            <Switch
              checked={isPublic}
              onCheckedChange={(e) => setIsPublic(e.valueOf())}
              id="public"
            />
          </div>
        </div>
        <div>{value}</div>
        <Button onClick={() => appendTextToLast(value)} type="button">
          testing
        </Button>
        {error ? (
          <div className="font-semibold text-red-500">{error}</div>
        ) : null}
      </form>
    </div>
  );
};
