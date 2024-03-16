'use client';
import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GetNegationsReturnType } from '../../../data-access/negations';
import { updatePrioAction } from './_actions/updatePrioAction';
import { getNegationId } from '../../../utils/utils';

interface DraggableNegationsProps {
  negations: GetNegationsReturnType;
}

export const DraggableNegations = ({ negations }: DraggableNegationsProps) => {
  const [negationsState, setNegationsState] = useState(negations);
  const [loading, setLoading] = useState(false);

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const newOrder = arrayMove(
      negationsState,
      negationsState.findIndex((item) => getNegationId(item) === active.id),
      negationsState.findIndex((item) => getNegationId(item) === over.id)
    );

    const newPrios = newOrder.map((item, index) => {
      return {
        ...item,
        priority: index + 1,
      };
    });

    setNegationsState(newPrios);
    setLoading(true);

    await updatePrioAction(newPrios).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="bg-red-400 border-4 flex gap-4 border-white p-2">
      <h1 className="bg-blue-600">{negations[0].negatingCard.name} negates:</h1>
      <DndContext
        id={negations[0].negatingCardId}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          disabled={loading}
          items={negationsState.map((item) => getNegationId(item))}
          strategy={horizontalListSortingStrategy}
        >
          {negationsState.map((negation) => (
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
  negation: GetNegationsReturnType[number];
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
