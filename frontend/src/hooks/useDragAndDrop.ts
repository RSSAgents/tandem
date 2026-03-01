import { IUseDragAndDropProps } from '@/types/dnd.types';
import { shuffleArray } from '@/utils/shuffleArray';
import { DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState, useCallback } from 'react';

export const useDragAndDrop = ({ initialOptions }: IUseDragAndDropProps) => {
  const [userOrder, setUserOrder] = useState(shuffleArray(initialOptions));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setUserOrder((currentOrder) => {
      const oldIndex = currentOrder.findIndex((item) => item === active.id);
      const newIndex = currentOrder.findIndex((item) => item === over.id);

      const newItems = [...currentOrder];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);

      return newItems;
    });
  }, []);

  const resetUserOrder = useCallback((newOptions: string[]) => {
    setUserOrder(shuffleArray(newOptions));
  }, []);

  return {
    userOrder,
    sensors,
    handleDragEnd,
    resetUserOrder,
    setUserOrder,
  };
};
