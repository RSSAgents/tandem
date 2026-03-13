import { useTranslation } from 'react-i18next';
import { Avatar, Group, ScrollArea, Table, Text, Paper, Stack, Container } from '@mantine/core';
import { ProgressBar } from '@/components/features/ProgressBar/ProgressBar';
import classes from './LeaderboardPage.module.css';
import { WINNERS_TABLE_HEADERS } from '@/constants/winnerTableHeaders';
import { getRankDisplay, sortedByScoreData } from '@/utils/leaderboardPage.utils';

export const LeaderboardPage = () => {
  const { t } = useTranslation('leaderboard');

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
                  {WINNERS_TABLE_HEADERS.map((header) => (
                    <Table.Th key={header.key}>{t(header.label)}</Table.Th>
                  ))}
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
