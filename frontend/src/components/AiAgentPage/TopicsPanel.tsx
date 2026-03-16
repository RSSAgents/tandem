import { Button, Center, ScrollArea, Stack, Text } from '@mantine/core';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';
import { TOPICS } from '../../utils/aiAgentConstants';

interface TopicsPanelProps {
  activeTopic: string | null;
  scores: Record<string, number>;
  onTopicSelect: (topic: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export const TopicsPanel = ({
  activeTopic,
  scores,
  onTopicSelect,
  isMobile = false,
  onClose,
}: TopicsPanelProps) => {
  const handleTopicClick = (topic: string) => {
    onTopicSelect(topic);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <Stack gap="xs">
      <Text fw={700} size="xs" c="dimmed" tt="uppercase" mt="md">
        Learning Topics
      </Text>
      <ScrollArea h={isMobile ? 'auto' : 'calc(100vh - 400px)'} offsetScrollbars>
        <Stack gap="xs">
          {TOPICS.map((topic) => (
            <Button
              key={topic}
              className={classes.topicButton}
              variant={activeTopic === topic ? 'filled' : 'light'}
              color={activeTopic === topic ? 'blue' : 'gray'}
              fullWidth
              onClick={() => handleTopicClick(topic)}
              styles={{ inner: { justifyContent: 'space-between' } }}
              rightSection={
                <Center className={classes.historyIcon} data-type="i">
                  {scores[topic] || 0}
                </Center>
              }
            >
              <Text size="sm" truncate fw={500}>
                {topic}
              </Text>
            </Button>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};
