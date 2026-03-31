import { Avatar, Group, Stack, Text } from '@mantine/core';
import classes from './UserBlock.module.css';

interface UserBlockProps {
  name: string;
  score: number;
  avatarSize?: number;
}

export const UserBlock = ({ name, score, avatarSize = 44 }: UserBlockProps) => {
  return (
    <Group className={classes.userBlock}>
      <Avatar size={avatarSize} radius="100%" />
      <Stack gap={0}>
        <Text size="sm" className={classes.name}>
          {name}
        </Text>
        <Text size="xs" className={classes.rank}>
          {score} <span>⭐</span>
        </Text>
      </Stack>
    </Group>
  );
};
