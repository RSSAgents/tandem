import { Avatar, Group, Stack, Text } from '@mantine/core';
import classes from './UserBlock.module.css';

interface UserBlockProps {
  name: string;
  rank: string;
  avatarSize?: number;
}

export const UserBlock = ({ name, rank, avatarSize = 44 }: UserBlockProps) => {
  return (
    <Group className={classes.userBlock}>
      <Avatar size={avatarSize} radius="100%" />
      <Stack gap={0}>
        <Text size="sm" className={classes.name}>
          {name}
        </Text>
        <Text size="xs" className={classes.rank}>
          {rank}
        </Text>
      </Stack>
    </Group>
  );
};
