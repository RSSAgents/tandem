import { Container, Title, Text, Paper, Image, List, ThemeIcon, Stack } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import aiInterviewImage from './ai.jpg';
import classes from './AboutAISection.module.css';

const TITLE = (
  <>
    Simulate <span className={classes.highlight}>real interviews</span> with our AI assistant
  </>
);
const SUB_TITLE = `Practice with an AI that asks real interview questions, adapts to your answers, and gives instant feedback — just like a real interviewer.
`;

const AI_FEATURES = {
  'Real interview questions': '– from junior to staff level, covering JS, TS, and Algorithms',
  'Adaptive follow-ups': '– AI digs deeper based on your answers',
  'Instant feedback': '– get detailed scores and explanations',
};

export function AboutAISection() {
  return (
    <Container className={classes.section} size="lg" py="150">
      <Paper className={classes.imageWrapper} withBorder={false} radius="md" shadow="xl">
        <Image src={aiInterviewImage} alt="AI Interviewer interface" className={classes.image} />
      </Paper>
      <Stack>
        <Title order={2} className={classes.sectionTitle}>
          {TITLE}
        </Title>
        <Text c="dimmed" size="lg">
          {SUB_TITLE}
        </Text>
        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl" color="blue" variant="light">
              <IconCheck size={12} stroke={1.5} />
            </ThemeIcon>
          }
        >
          {Object.entries(AI_FEATURES).map(([bold, text], index) => (
            <List.Item key={index}>
              <Text span fw={700}>
                {bold}
              </Text>{' '}
              – {text}
            </List.Item>
          ))}
        </List>
      </Stack>
    </Container>
  );
}
