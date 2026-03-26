import { ActionIcon, Box, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { PrizeCard } from '../../features/PrizeCard/PrizeCard';
import { ProgressBar } from '../../features/ProgressBar/ProgressBar';
import { UserBlock } from '../../features/UserBlock/UserBlock';
import classes from './Sidebar.module.css';
import { SidebarNavigation } from './SidebarNavigation';

interface SidebarProps {
  user?: { name: string; rank: string };
  stats?: { current: number; total: number };
  onClose?: () => void;
  mobileBreakpoint?: string | number;
}

const DEFAULT_USER = { name: 'Alex', rank: 'Mage' };
const DEFAULT_STATS = { current: 3, total: 6 };

const MOCK_PRIZES = [
  { id: 1, title: 'Bronze Badge', description: 'Complete 1 module' },
  { id: 2, title: 'Silver Medal', description: 'Complete 3 modules' },
  { id: 3, title: ' Gold Trophy', description: 'Complete 6 modules' },
];

export const Sidebar = ({ user = DEFAULT_USER, stats = DEFAULT_STATS, onClose, mobileBreakpoint }: SidebarProps) => {
  const bp = typeof mobileBreakpoint === 'number' ? `${mobileBreakpoint}px` : mobileBreakpoint ?? '48em';
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
            style={{ display: 'block', marginLeft: 'auto', marginBottom: 'var(--mantine-spacing-xs)' }}
          >
            <IconX size={18} />
          </ActionIcon>
        )}
        <UserBlock name={user.name} rank={user.rank} />
        <SidebarNavigation />
      </Box>
      <Stack gap="md">
        <ProgressBar current={stats.current} total={stats.total} />
        {MOCK_PRIZES.map((prize) => (
          <PrizeCard key={prize.id} {...prize} />
        ))}
      </Stack>
    </Stack>
  );
};
