import { WINNERS_TABLE_HEADERS } from '@/constants/winnerTableHeaders';
import { Box, Loader, Paper, ScrollArea, Stack, Table, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './LeaderboardPage.module.css';
import { LeaderboardRow } from './LeaderboardRow';
import { useLeaderboard } from '@/hooks/useLeaderboard';

export const LeaderboardPage = () => {
  const { t } = useTranslation('leaderboard');

  const { leaders, loading, error } = useLeaderboard();

  if (loading) {
    return (
      <Box className={classes.wrapper}>
        <Paper withBorder p="md" radius="lg" className={classes.paper}>
          <Loader size="lg" />
        </Paper>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.wrapper}>
        <Paper withBorder p="md" radius="lg" className={classes.paper}>
          <Text c="red" ta="center">
            {error}
          </Text>
        </Paper>
      </Box>
    );
  }

  if (leaders.length === 0) {
    return (
      <Box className={classes.wrapper}>
        <Paper withBorder p="md" radius="lg" className={classes.paper}>
          <Text c="dimmed" ta="center">
            No users yet. Be the first!
          </Text>
        </Paper>
      </Box>
    );
  }

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
                {leaders.map((user, index) => (
                  <LeaderboardRow key={user.username} user={user} rank={index + 1} />
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Stack>
      </Paper>
    </Box>
  );
};
