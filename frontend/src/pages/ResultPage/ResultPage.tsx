import {
  Avatar,
  Group,
  ScrollArea,
  Table,
  Text,
  Progress,
  Paper,
  Title,
  Stack,
  Badge,
} from '@mantine/core';
import classes from './ResultPage.module.css';

const data = [
  {
    id: '1',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Ivan Ivanov',
    score: 10,
    email: 'test@gmail.com',
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
  {
    id: '2',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Marge',
    score: 20,
    email: 'test@gmail.com',
    widgetsAmount: { completed: 3, notCompleted: 2 },
  },
  {
    id: '3',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Liza',
    score: 30,
    email: 'test@gmail.com',
    widgetsAmount: { completed: 4, notCompleted: 1 },
  },
  {
    id: '4',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bart',
    score: 40,
    email: 'test@gmail.com',
    widgetsAmount: { completed: 5, notCompleted: 0 },
  },
  {
    id: '5',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Homer',
    score: 50,
    email: 'test@gmail.com',
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
];

export const ResultPage = () => {
  const rows = data.map((item) => {
    const totalAmountOfWidgets = item.widgetsAmount.completed + item.widgetsAmount.notCompleted;
    const completedWidgets = (item.widgetsAmount.completed / totalAmountOfWidgets) * 100;

    return (
      <Table.Tr key={item.id}>
        <Table.Td>
          <Text size="sm" fw={500}>
            #{item.id}
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
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.score}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              {completedWidgets.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={completedWidgets}
              color="teal"
              aria-label="Completed widgets"
            />
          </Progress.Root>
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
                <Table.Th>Email</Table.Th>
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
