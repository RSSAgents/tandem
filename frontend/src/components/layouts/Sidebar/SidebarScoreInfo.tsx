import { Box, Text, Paper, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './Sidebar.module.css';

export const SidebarScoreInfo = () => {
  const { t } = useTranslation('sidebar');

  return (
    <Paper p="sm" mt="md" radius="md" withBorder className={classes.infoBlock}>
      <Title order={6} className={classes.title}>
        {t('sidebar.scoreInfo.title')} ⭐
      </Title>
      <Box className={classes.list}>
        <Text size="xs" c="dimmed">
          ✓ {t('sidebar.scoreInfo.passWidget')}
        </Text>
        <Text size="xs" c="dimmed">
          ✓ {t('sidebar.scoreInfo.repeatWidget')}
        </Text>
        <Text size="xs" c="dimmed">
          ✓ {t('sidebar.scoreInfo.studyMaterials')}
        </Text>
      </Box>
    </Paper>
  );
};
