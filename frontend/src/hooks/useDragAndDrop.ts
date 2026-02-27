import { IUseDragAndDropProps } from '@/types/dnd.types';
import { shuffleArray } from '@/utils/shuffleArray';
import { DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';

export const useDragAndDrop = ({ initialOptions }: IUseDragAndDropProps) => {
  const [userOrder, setUserOrder] = useState(shuffleArray(initialOptions));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = userOrder.findIndex((item) => item === active.id);
    const newIndex = userOrder.findIndex((item) => item === over.id);

    const newItems = [...userOrder];
    const [movedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedItem);

    setUserOrder(newItems);
  };

  const resetUserOrder = (newOptions: string[]) => {
    setUserOrder(shuffleArray(newOptions));
  };

  return {
    userOrder,
    sensors,
    handleDragEnd,
    resetUserOrder,
    setUserOrder,
  };
};
