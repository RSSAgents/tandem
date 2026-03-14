import { ISortableItemProps } from '@/types/dnd.types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Text } from '@mantine/core';
import styles from './WidgetConsole.module.css';

export function SortableItem({ value }: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: value,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.dndItemWrapper}
    >
      <Text className={styles.dndItem}>{value}</Text>
    </Box>
  );
}
