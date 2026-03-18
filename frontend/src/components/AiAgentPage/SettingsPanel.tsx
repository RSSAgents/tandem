import { Button, Group, Paper, SegmentedControl, Stack, Text } from '@mantine/core';
import { IconTerminal2 } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';
import { RoleType, StressModeType } from '../../types/aiAgentTypes';

interface SettingsPanelProps {
  role: RoleType;
  stressMode: StressModeType;
  readinessPercentage: number;
  onRoleChange: (role: RoleType) => void;
  onStressModeChange: (mode: StressModeType) => void;
  onOpenCodeRunner: () => void;
}

export const SettingsPanel = ({
  role,
  stressMode,
  readinessPercentage,
  onRoleChange,
  onStressModeChange,
  onOpenCodeRunner,
}: SettingsPanelProps) => {
  const { t } = useTranslation('aiAgent');

  return (
    <Paper className={classes.glassPanel} p="sm" radius="md">
      <Group gap="xs" align="stretch" wrap="nowrap">
        <Stack className={classes.statsDivider}>
          <Text fw={700} size="10px" c="dimmed" tt="uppercase">
            {t('settings.ready')}
          </Text>
          <Text fw={900} size="24px" c="cyan">
            {readinessPercentage}%
          </Text>
        </Stack>
        <Stack gap={4} flex={1}>
          <SegmentedControl
            fullWidth
            size="xs"
            value={role}
            onChange={(value) => onRoleChange(value as RoleType)}
            data={[
              { label: t('settings.gentle'), value: 'gentle' },
              { label: t('settings.strict'), value: 'strict' },
            ]}
            classNames={{
              root: classes.roleSwitcher,
              indicator: role === 'strict' ? classes.gradientPink : classes.gradientCyan,
            }}
          />
          <SegmentedControl
            fullWidth
            size="xs"
            value={stressMode}
            onChange={(value) => onStressModeChange(value as StressModeType)}
            data={[
              { label: t('settings.normal'), value: 'normal' },
              { label: t('settings.stress'), value: 'stress' },
            ]}
            classNames={{
              root: classes.roleSwitcher,
              indicator: stressMode === 'stress' ? classes.gradientPink : classes.gradientCyan,
            }}
          />
          <Button
            variant="light"
            color="indigo"
            leftSection={<IconTerminal2 size={14} />}
            radius="md"
            size="xs"
            fullWidth
            onClick={onOpenCodeRunner}
          >
            {t('settings.codeRunner')}
          </Button>
        </Stack>
      </Group>
    </Paper>
  );
};
