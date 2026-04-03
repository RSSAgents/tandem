import { Avatar, Group, Table, Text } from '@mantine/core';
import { RANK_DISPLAY } from '@/constants/rankDisplay';
import classes from './LeaderboardPage.module.css';
import { LeaderboardUser } from '@/api/leaderboard.api';
import { getRandomAvatar } from '@/images/icons';
import { SidebarSnailProgress } from '@/components/layouts/Sidebar/SidebarSnailProgress';

interface LeaderboardRowProps {
  user: LeaderboardUser;
  rank: number;
}

export const LeaderboardRow = ({ user, rank }: LeaderboardRowProps) => {
  const avatar = getRandomAvatar();
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
          <Avatar size={26} src={avatar} radius={26} alt="" />
          <Text size="sm" fw={500}>
            {user.username}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <span>⭐</span>
          {user.total_score}
        </Group>
      </Table.Td>
      <Table.Td>
        <SidebarSnailProgress percent={user.total_percent_ai} showTitle={false} compact={true} />
      </Table.Td>
    </Table.Tr>
  );
};
