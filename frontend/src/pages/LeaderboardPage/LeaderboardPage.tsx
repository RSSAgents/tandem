import { useTranslation } from 'react-i18next';
import { ScrollArea, Table, Paper, Stack, Box } from '@mantine/core';
import classes from './LeaderboardPage.module.css';
import { WINNERS_TABLE_HEADERS } from '@/constants/winnerTableHeaders';
import { Winner } from '@/types/winner.types';
import { LeaderboardRow } from './LeaderboardRow';

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

export const LeaderboardPage = () => {
  const { t } = useTranslation('leaderboard');

  return (
    <Box className={classes.wrapper}>
      <Paper withBorder p="md" radius="lg" className={classes.paper}>
        <Stack gap="lg">
          <ScrollArea className={classes.scrollArea}>
            <Table verticalSpacing="sm" className={classes.table}>
              <Table.Thead>
                <Table.Tr>
                  {WINNERS_TABLE_HEADERS.map((header) => (
                    <Table.Th key={header.key}>{t(header.label)}</Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {sortedByScoreData.map((item, index) => (
                  <LeaderboardRow key={index} item={item} rank={index + 1} />
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Stack>
      </Paper>
    </Box>
  );
};
