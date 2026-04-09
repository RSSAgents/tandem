import { useUserScore } from '@/hooks/useUserScore';
import { UserBlock } from '@components/features/UserBlock/UserBlock';
import { ActionIcon, Box, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import classes from './Sidebar.module.css';
import { SidebarNavigation } from './SidebarNavigation';
import { SidebarScoreInfo } from './SidebarScoreInfo';
import { SidebarSnailProgress } from './SidebarSnailProgress';
import { useAiAgentState } from '@/hooks/useAiAgentState';

interface SidebarProps {
  user?: { score: number };
  stats?: { current: number; total: number };
  onClose?: () => void;
  mobileBreakpoint?: string | number;
}

const DEFAULT_USER = { score: 150 };

export const Sidebar = ({ user = DEFAULT_USER, onClose, mobileBreakpoint }: SidebarProps) => {
  const { score } = useUserScore();
  const { readinessPercentage } = useAiAgentState();

  const bp =
    typeof mobileBreakpoint === 'number' ? `${mobileBreakpoint}px` : (mobileBreakpoint ?? '48em');
  const isMobile = useMediaQuery(`(max-width: ${bp})`);

  return (
    <Stack className={classes.sidebar}>
      <Box>
        {isMobile && onClose && (
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            size="lg"
            radius="md"
            aria-label="Close navigation"
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginBottom: 'var(--mantine-spacing-xs)',
            }}
          >
            <IconX size={18} />
          </ActionIcon>
        )}
        <UserBlock score={score ?? user.score ?? 0} />
        <SidebarSnailProgress percent={readinessPercentage || 0} />
        <SidebarNavigation onClose={onClose} />
      </Box>
      <SidebarScoreInfo />
    </Stack>
  );
};
