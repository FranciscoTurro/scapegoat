'use client';
import { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Negation } from '@prisma/client';
import { GetNegationsReturnType } from '../../../data-access/negations';

interface DraggableNegationsProps {
  negations: GetNegationsReturnType;
  changePrio: (order: GetNegationsReturnType) => void;
}

const getNegationId = (negation: Negation) => {
  return negation.negatedCardId + negation.negatingCardId + negation.deckId;
};

export const DraggableNegations = ({
  negations,
  changePrio,
}: DraggableNegationsProps) => {
  const [items, setItems] = useState(negations);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    setItems((items) => {
      const newOrder = arrayMove(
        items,
        items.findIndex((item) => getNegationId(item) === active.id),
        items.findIndex((item) => getNegationId(item) === over.id)
      );
      changePrio(newOrder);

      return newOrder;
    });
  };

  return (
    <div className="bg-red-400 border-4 flex gap-4 border-white p-2">
      <h1 className="bg-blue-600">
        {negations[0].negatingCard.name} negates:{' '}
      </h1>
      <DndContext
        id={negations[0].negatingCardId}
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={items.map((item) => getNegationId(item))}
          strategy={horizontalListSortingStrategy}
        >
          {items.map((negation) => (
            <SortableNegation
              key={getNegationId(negation)}
              negation={negation}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableNegation = ({
  negation,
}: {
  negation: GetNegationsReturnType[0];
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: getNegationId(negation),
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex flex-col"
    >
      <p>{negation.negatedCard.name}</p>
      <p>{negation.priority}</p>
    </div>
  );
};
