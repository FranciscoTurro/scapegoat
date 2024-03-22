'use client';
import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { CSS } from '@dnd-kit/utilities';
import { GetNegationsReturnType } from '../../../data-access/negations';
import { updatePrioAction } from '../../../actions/update-prio-action';
import { getNegationId } from '../../../utils/utils';
import Image from 'next/image';
import { ChevronRight, Navigation2Off } from 'lucide-react';

interface DraggableNegationsProps {
  negations: GetNegationsReturnType;
  isAuth: boolean;
}

export const DraggableNegations = ({
  negations,
  isAuth,
}: DraggableNegationsProps) => {
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
    <div className="bg-background border-2 rounded mx-10 flex border-border gap-4 p-2">
      <Image
        src={negations[0].negatingCard.small_image_path}
        width={80}
        height={80}
        alt={`${negations[0].negatingCard.name}`}
      />
      <div className="flex items-center mr-4 ml-1">
        <Navigation2Off className="rotate-90" size={50} />
      </div>
      <DndContext
        id={negations[0].negatingCardId}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          disabled={loading || isAuth == false}
          items={negationsState.map((item) => getNegationId(item))}
          strategy={horizontalListSortingStrategy}
        >
          {negationsState.map((negation, index) => {
            return (
              <SortableNegation
                isFirst={index == 0}
                key={getNegationId(negation)}
                negation={negation}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableNegation = ({
  isFirst,
  negation,
}: {
  isFirst: boolean;
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
    <div className="flex items-center gap-3">
      <div className="items-center flex">
        {isFirst ? null : <ChevronRight />}
      </div>
      <div
        className="flex flex-col w-20 h-20"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <TooltipProvider>
          <Tooltip delayDuration={250}>
            <TooltipTrigger>
              <Image
                src={negation.negatedCard.small_image_path}
                width={60}
                height={60}
                alt={`${negation.negatedCard.name}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{negation.negatedCard.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p>{negation.comment}</p>
      </div>
    </div>
  );
};
