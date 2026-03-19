import { Container, Title, Group, Text } from '@mantine/core';
import classes from './AudienceSection.module.css';

export function AudienceSection() {
  const TITLE = 'Perfect for';
  const SUB_TITLE = `Whether you're just starting out or you've been coding for years, Tandem meets you where you
        are. Practice at your own pace, at your own level`;

  const AUDIENCE_DATA = [
    { icon: '🌱', label: 'Junior Devs', color: 'green', row: 1 },
    { icon: '🚀', label: 'Mid-Level', color: 'orange', row: 1 },
    { icon: '⚡', label: 'Seniors', color: 'yellow', row: 1 },
    { icon: '🔄', label: 'Career Changers', color: 'purple', row: 2 },
    { icon: '🎓', label: 'Students', color: 'blue', row: 2 },
    { icon: '💼', label: 'Job Seekers', color: 'red', row: 3 },
    { icon: '👨‍💻', label: 'Freelancers', color: 'teal', row: 3 },
    { icon: '📚', label: 'Self-taught', color: 'lime', row: 3 },
  ];

  const rows = [1, 2, 3];

  return (
    <Container size="lg" className={classes.section} py="150">
      <Title order={2} ta="center" className={classes.sectionTitle}>
        {TITLE}
      </Title>
      <Text c="dimmed" className={classes.sectionDescription} ta="center" mb={50}>
        {SUB_TITLE}
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
