import { Avatar, Group, ScrollArea, Table, Text, Paper, Stack, Container } from '@mantine/core';
import { ProgressBar } from '@/components/features/ProgressBar/ProgressBar';
import { Winner } from '@/types/winner.types';
import classes from './ResultPage.module.css';

const data: Winner[] = [
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Ivan Ivanov',
    score: 10,
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Marge',
    score: 20,
    widgetsAmount: { completed: 3, notCompleted: 2 },
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Liza',
    score: 30,
    widgetsAmount: { completed: 4, notCompleted: 1 },
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bart',
    score: 40,
    widgetsAmount: { completed: 5, notCompleted: 0 },
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Homer',
    score: 50,
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
];

const sortedByScoreData = [...data].sort((a, b) => b.score - a.score);

const getRankDisplay = (rank: number) => {
  if (rank === 1) return '🥇 1';
  if (rank === 2) return '🥈 2';
  if (rank === 3) return '🥉 3';
  return `#${rank}`;
};

export const ResultPage = () => {
  const rows = sortedByScoreData.map((item, index) => {
    const rank = index + 1;
    const totalAmountOfWidgets = item.widgetsAmount.completed + item.widgetsAmount.notCompleted;
    const completedWidgets = (item.widgetsAmount.completed / totalAmountOfWidgets) * 100;

    return (
      <Table.Tr key={index} className={rank <= 3 ? classes.topRank : ''}>
        <Table.Td>
          <Text size="sm" fw={500}>
            {getRankDisplay(rank)}
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
  });

  return (
    <Container size="xl" className={classes.wrapper}>
      <Paper withBorder p="md" radius="lg" className={classes.paper}>
        <Stack gap="lg">
          <ScrollArea className={classes.scrollArea}>
            <Table verticalSpacing="sm" className={classes.table}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Position</Table.Th>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Score</Table.Th>
                  <Table.Th>Progress</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        </Stack>
      </Paper>
    </Container>
  );
};
