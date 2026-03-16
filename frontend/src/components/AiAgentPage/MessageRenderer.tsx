import { Box, Stack, Text } from '@mantine/core';
import { useMemo, useState } from 'react';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';
import { Message } from '../../types/aiAgentTypes';

interface MessageRendererProps {
  messages: Message[];
  startMessage: string;
  hasActiveTopic: boolean;
}

export const MessageRenderer = ({
  messages,
  startMessage,
  hasActiveTopic,
}: MessageRendererProps) => {
  const [initialTimestamp] = useState(() => Date.now());

  const messagesToShow = useMemo(() => {
    if (!hasActiveTopic) {
      return [
        {
          id: 'start',
          sender: 'ai' as const,
          text: startMessage,
          timestamp: initialTimestamp,
        },
      ];
    }
    return messages.length > 0
      ? messages
      : [
          {
            id: 'start',
            sender: 'ai' as const,
            text: startMessage,
            timestamp: initialTimestamp,
          },
        ];
  }, [messages, startMessage, hasActiveTopic, initialTimestamp]);

  return (
    <Stack gap="md">
      {messagesToShow.map((msg: Message) => (
        <Box
          key={msg.id}
          className={
            msg.sender === 'ai'
              ? classes.messageAi
              : msg.sender === 'candidate'
                ? classes.messageCandidate
                : classes.messageUser
          }
        >
          {msg.sender === 'candidate' && (
            <Text size="xs" fw={700} className={classes.candidateLabel} mb={4}>
              CANDIDATE
            </Text>
          )}
          <Text size="sm" className={classes.messageText}>
            {msg.text.replace(/FINAL_SCORE:\s*\d+/, '').trim()}
          </Text>
        </Box>
      ))}
    </Stack>
  );
};
