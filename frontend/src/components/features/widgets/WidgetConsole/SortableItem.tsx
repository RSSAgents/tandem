import { ISortableItemProps } from '@/types/dnd.types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Text } from '@mantine/core';
import styles from './WidgetConsole.module.css';

export function SortableItem({ value }: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: value });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Text className={styles.dndItem}>{value}</Text>
    </div>
  );
}
