import { getRandomAvatar } from '@/images/icons';
import { Avatar, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import classes from './UserBlock.module.css';

interface UserBlockProps {
  name: string;
  score: number;
  avatarSize?: number;
}

export const UserBlock = ({ name, score, avatarSize = 44 }: UserBlockProps) => {
  const [avatarUrl] = useState(() => {
    const savedAvatar = sessionStorage.getItem('sidebarAvatar');
    if (savedAvatar) {
      return savedAvatar;
    }
    const newAvatar = getRandomAvatar();
    sessionStorage.setItem('sidebarAvatar', newAvatar);
    return newAvatar;
  });

  return (
    <Group className={classes.userBlock}>
      <Avatar src={avatarUrl} size={avatarSize} radius="100%" />
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
