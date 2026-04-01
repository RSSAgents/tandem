import { getRandomAvatar } from '@/images/icons';
import { supabase } from '@/utils/supabase';
import { Avatar, Group, Loader, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from './UserBlock.module.css';

interface UserBlockProps {
  score: number;
  avatarSize?: number;
}

export const UserBlock = ({ score, avatarSize = 44 }: UserBlockProps) => {
  const [userName, setUserName] = useState<React.ReactNode>(<Loader size={12} />);
  const [avatarUrl] = useState(() => {
    const savedAvatar = sessionStorage.getItem('sidebarAvatar');
    if (savedAvatar) return savedAvatar;
    const newAvatar = getRandomAvatar();
    sessionStorage.setItem('sidebarAvatar', newAvatar);
    return newAvatar;
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setUserName('User');
        return;
      }
      const username = data?.user?.user_metadata?.username ?? 'User';
      setUserName(username);
    };

    fetchUser();
  }, []);

  return (
    <Group className={classes.userBlock}>
      <Avatar src={avatarUrl} size={avatarSize} radius="100%" />
      <Stack gap={0}>
        <Text size="sm" className={classes.name}>
          {userName}
        </Text>
        <Text size="xs" className={classes.rank}>
          {score} <span>⭐</span>
        </Text>
      </Stack>
    </Group>
  );
};
