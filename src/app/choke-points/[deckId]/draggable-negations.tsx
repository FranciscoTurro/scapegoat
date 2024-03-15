'use client';

import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Negation } from '@prisma/client';
import { GetNegationsReturnType } from '../../../data-access/negations';

const getNegationId = (negation: Negation) => {
  return negation.negatedCardId + negation.negatingCardId + negation.deckId;
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
      key={getNegationId(negation)}
    >
      <p>{negation.negatedCard.name}</p>
      <p>{negation.priority}</p>
    </div>
  );
};

export const DraggableNegations = ({
  negations,
}: {
  negations: GetNegationsReturnType;
}) => {
  const [items, setItems] = useState(negations);

  const negatingCardName = negations[0].negatingCard.name;

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    setItems((items) => {
      const oldIndex = items.findIndex(
        (item) => getNegationId(item) === active.id
      );
      const newIndex = items.findIndex(
        (item) => getNegationId(item) === over.id
      );
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <div className="bg-red-400 border-4 flex gap-4 border-white p-2">
      <h1 className="bg-blue-600">{negatingCardName} negates: </h1>
      <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
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
