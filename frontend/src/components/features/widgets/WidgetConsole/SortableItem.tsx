import { Text } from '@mantine/core';
import { useSortable } from '@dnd-kit/sortable';
import { ISortableItemProps } from '@/types/sortable';
import { CSS } from '@dnd-kit/utilities';
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
