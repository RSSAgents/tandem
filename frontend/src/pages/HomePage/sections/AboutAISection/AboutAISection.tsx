import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Image,
  List,
  ThemeIcon,
  Stack,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import aiInterviewImage from './widget1.jpg';
import classes from './AboutAISection.module.css';

export function AboutAISection() {
  return (
    <Container size="lg" py={80}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
        <Paper withBorder radius="lg" style={{ overflow: 'hidden' }}>
          <Image
            src={aiInterviewImage}
            alt="AI Interviewer interface"
            fallbackSrc="https://placehold.co/600x500?text=AI+Interviewer+Preview"
          />
        </Paper>

        <Stack>
          <Title order={2} className={classes.title}>
            Simulate <span className={classes.highlight}>real interviews</span> with our AI
            assistant
          </Title>

          <Text size="lg" c="dimmed" mt="md">
            Practice with an AI that asks real interview questions, adapts to your answers, and
            gives instant feedback — just like a real interviewer.
          </Text>

          <List
            mt={30}
            spacing="md"
            size="md"
            icon={
              <ThemeIcon size={24} radius="xl" color="violet" variant="light">
                <IconCheck size={14} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Real interview questions</b> – from junior to staff level, covering JS, TS, and
              Algorithms
            </List.Item>
            <List.Item>
              <b>Adaptive follow-ups</b> – AI digs deeper based on your answers
            </List.Item>
            <List.Item>
              <b>Instant feedback</b> – get detailed scores and explanations
            </List.Item>
          </List>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
