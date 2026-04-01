import { WINNERS_TABLE_HEADERS } from '@/constants/winnerTableHeaders';
import { getRandomAvatar } from '@/images/icons';
import { Winner } from '@/types/winner.types';
import { Box, Paper, ScrollArea, Stack, Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './LeaderboardPage.module.css';
import { LeaderboardRow } from './LeaderboardRow';

const data: Winner[] = [
  {
    avatar: getRandomAvatar(),
    name: 'Ivan Ivanov',
    score: 10,
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
  {
    avatar: getRandomAvatar(),
    name: 'Marge',
    score: 20,
    widgetsAmount: { completed: 3, notCompleted: 2 },
  },
  {
    avatar: getRandomAvatar(),
    name: 'Liza',
    score: 30,
    widgetsAmount: { completed: 4, notCompleted: 1 },
  },
  {
    avatar: getRandomAvatar(),
    name: 'Bart',
    score: 40,
    widgetsAmount: { completed: 5, notCompleted: 0 },
  },
  {
    avatar: getRandomAvatar(),
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
