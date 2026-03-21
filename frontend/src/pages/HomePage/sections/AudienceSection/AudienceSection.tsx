import { Container, Title, Group, Text } from '@mantine/core';
import classes from './AudienceSection.module.css';
import { useTranslation } from 'react-i18next';

export function AudienceSection() {
  const { t } = useTranslation('audience');

  const AUDIENCE_DATA = [
    { icon: '🌱', label: t('audience.junior'), color: 'green', row: 1 },
    { icon: '🚀', label: t('audience.mid'), color: 'orange', row: 1 },
    { icon: '⚡', label: t('audience.senior'), color: 'yellow', row: 1 },
    { icon: '🔄', label: t('audience.career'), color: 'purple', row: 2 },
    { icon: '🎓', label: t('audience.student'), color: 'blue', row: 2 },
    { icon: '💼', label: t('audience.jobSeeker'), color: 'red', row: 3 },
    { icon: '👨‍💻', label: t('audience.freelancer'), color: 'teal', row: 3 },
    { icon: '📚', label: t('audience.selftaught'), color: 'lime', row: 3 },
  ];

  const rows = [1, 2, 3];

  return (
    <Container size="lg" className={classes.section} py={{ base: 60, sm: 80, md: 100 }}>
      <Title
        order={2}
        ta="center"
        className={classes.sectionTitle}
        fz={{ base: 32, sm: 36, md: 40, lg: 48 }}
        mb={{ base: 16, sm: 18, md: 20, lg: 24 }}
      >
        {t('title')}
      </Title>
      <Text c="dimmed" className={classes.sectionDescription} ta="center" mb={50}>
        {t('subtitle')}
      </Text>
      <Group justify="center" gap="xl" className={classes.grid}>
        {rows.map((rowNum) => (
          <Group key={`row-${rowNum}`} justify="center" gap="md" className={classes.row}>
            {AUDIENCE_DATA.filter((item) => item.row === rowNum).map((item, index) => (
              <Group
                key={`${rowNum}-${index}`}
                className={classes.sticker}
                data-color={item.color}
                gap="xs"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Group>
            ))}
          </Group>
        ))}
      </Group>
    </Container>
  );
}
