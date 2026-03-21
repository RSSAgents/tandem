import { Avatar, Group, Table, Text } from '@mantine/core';
import { ProgressBar } from '@/components/features/ProgressBar/ProgressBar';
import { Winner } from '@/types/winner.types';
import { RANK_DISPLAY } from '@/constants/rankDisplay';
import classes from './LeaderboardPage.module.css';

interface LeaderboardRowProps {
  item: Winner;
  rank: number;
}

export const LeaderboardRow = ({ item, rank }: LeaderboardRowProps) => {
  const totalAmountOfWidgets = item.widgetsAmount.completed + item.widgetsAmount.notCompleted;
  const completedWidgets = (item.widgetsAmount.completed / totalAmountOfWidgets) * 100;
  const rankDisplay = RANK_DISPLAY[rank as keyof typeof RANK_DISPLAY] || `#${rank}`;

  return (
    <Table.Tr key={rank} className={rank <= 3 ? classes.topRank : ''}>
      <Table.Td>
        <Text size="sm" fw={500}>
          {rankDisplay}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={26} src={item.avatar} radius={26} alt="" />
          <Text size="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <span>⭐</span>
          {item.score}
        </Group>
      </Table.Td>
      <Table.Td>
        <Group justify="space-between">
          <Text fz="xs" c="teal" fw={700}>
            {completedWidgets.toFixed(0)}%
          </Text>
        </Group>
        <ProgressBar current={item.widgetsAmount.completed} total={totalAmountOfWidgets} />
      </Table.Td>
    </Table.Tr>
  );
};
