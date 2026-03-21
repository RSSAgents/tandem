import { IUseDragAndDropProps } from '@/types/dnd.types';
import { shuffleArray } from '@/utils/shuffleArray';
import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from '@dnd-kit/core';
import { useState, useCallback, useEffect } from 'react';

export const useDragAndDrop = ({ initialOptions }: IUseDragAndDropProps) => {
  const [userOrder, setUserOrder] = useState(shuffleArray(initialOptions));

  useEffect(() => {
    setUserOrder(shuffleArray(initialOptions));
  }, [initialOptions]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
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
