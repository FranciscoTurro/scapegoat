'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { CardInfo } from '../../../types/CardInfo';
import { SetCardSearchbar } from '../../_components/set-card-searchbar';
import { createDeck } from './_actions/createDeck';
import { Input } from '../../../components/ui/input';

export const CreateDeckForm: React.FC<{ cards: CardInfo[] }> = ({ cards }) => {
  const [coverCard, setCoverCard] = useState<CardInfo>();
  const [error, setError] = useState('');

  const clientAction = async (formData: FormData) => {
    const result = await createDeck(coverCard!, formData);

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
        <div className="font-semibold">Cover card</div>
        <SetCardSearchbar setter={setCoverCard} cards={cards} />
        <Button disabled={!coverCard} type="submit">
          Create deck
        </Button>
        {error ? (
          <div className="font-semibold text-red-500">{error}</div>
        ) : null}
      </form>
    </div>
  );
};
