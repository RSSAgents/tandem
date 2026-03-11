import { Avatar, Group, ScrollArea, Table, Text, Paper, Title, Stack, Badge } from '@mantine/core';
import { ProgressBar } from '@/components/features/ProgressBar/ProgressBar';
import { Winner } from '@/types/winner.types';

const data: Winner[] = [
  {
    rank: 1,
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Ivan Ivanov',
    score: 10,
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
  {
    rank: 2,
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Marge',
    score: 20,
    widgetsAmount: { completed: 3, notCompleted: 2 },
  },
  {
    rank: 3,
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Liza',
    score: 30,
    widgetsAmount: { completed: 4, notCompleted: 1 },
  },
  {
    rank: 4,
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bart',
    score: 40,
    widgetsAmount: { completed: 5, notCompleted: 0 },
  },
  {
    rank: 5,
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Homer',
    score: 50,
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
];

export const ResultPage = () => {
  const rows = data.map((item) => {
    const totalAmountOfWidgets = item.widgetsAmount.completed + item.widgetsAmount.notCompleted;
    const completedWidgets = (item.widgetsAmount.completed / totalAmountOfWidgets) * 100;

    return (
      <Table.Tr key={item.rank}>
        <Table.Td>
          <Text size="sm" fw={500}>
            #{item.rank}
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
        <Table.Td>{item.score}</Table.Td>
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
    <Paper p="md" radius="lg" withBorder>
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={2}>🏆 Leaderboard</Title>
          <Badge size="lg" variant="light" color="blue">
            Total participants: {data.length}
          </Badge>
        </Group>
        <ScrollArea>
          <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={40} aria-label="Select all rows"></Table.Th>
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
  );
};
