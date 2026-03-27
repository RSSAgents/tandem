import { SCROLL_AREA_HEIGHT_OFFSET, TOPICS } from '@constants/aiAgentConstants';
import { Button, Center, ScrollArea, Stack, Text } from '@mantine/core';
import classes from '@pages/AiAgentPage/AiAgentPage.module.css';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('aiAgent');

  const handleTopicClick = (topic: string) => {
    onTopicSelect(topic);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <Stack gap="xs">
      <Text fw={700} size="xs" c="dimmed" tt="uppercase" mt="md">
        {t('topics.title')}
      </Text>
      <ScrollArea
        h={isMobile ? 'auto' : `calc(100vh - ${SCROLL_AREA_HEIGHT_OFFSET}px)`}
        offsetScrollbars
      >
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
                scores[topic] ? (
                  <Center className={classes.historyIcon} data-type="i">
                    {scores[topic]}
                  </Center>
                ) : null
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
