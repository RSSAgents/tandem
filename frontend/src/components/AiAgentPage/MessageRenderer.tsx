import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import { Box, Stack, Text } from '@mantine/core';
import { useMemo, useState } from 'react';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';
import { InterviewerMode, Message } from '../../types/aiAgentTypes';

interface MessageRendererProps {
  messages: Message[];
  startMessage: string;
  hasActiveTopic: boolean;
  mode?: InterviewerMode;
}

export const MessageRenderer = ({
  messages,
  startMessage,
  hasActiveTopic,
  mode,
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

  const renderTextWithCode = (text: string, sender: 'user' | 'ai' | 'candidate') => {
    const parts = text.split(/(```\w*\n[\s\S]*?```|`[^`]+`)/);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const match = part.match(/^```(\w*)\n([\s\S]*?)```$/);
        if (match) {
          const lang = match[1] || 'javascript';
          const code = match[2];
          const blockClass =
            sender === 'ai'
              ? classes.codeBlockAi
              : sender === 'candidate'
                ? classes.codeBlockCandidate
                : classes.codeBlockUser;
          return <CodeHighlight key={index} code={code} language={lang} className={blockClass} />;
        }
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        const codeClass =
          sender === 'ai'
            ? classes.codeAi
            : sender === 'candidate'
              ? classes.codeCandidate
              : classes.codeUser;
        return (
          <code key={index} className={codeClass}>
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <Stack gap="md">
      {messagesToShow.map((msg: Message) => {
        const isAiInterview = mode === 'ai-interview' && msg.sender === 'ai';
        const displayRole = isAiInterview ? msg.aiRole : msg.sender;

        return (
          <Box
            key={msg.id}
            className={
              displayRole === 'interviewer' || (displayRole === 'ai' && !isAiInterview)
                ? classes.messageAi
                : displayRole === 'candidate'
                  ? classes.messageCandidate
                  : classes.messageUser
            }
          >
            {isAiInterview && msg.aiRole === 'interviewer' && (
              <Text size="xs" fw={700} className={classes.interviewerLabel} mb={4}>
                INTERVIEWER
              </Text>
            )}
            {(msg.sender === 'candidate' || (isAiInterview && msg.aiRole === 'candidate')) && (
              <Text size="xs" fw={700} className={classes.candidateLabel} mb={4}>
                CANDIDATE
              </Text>
            )}
            <Box
              className={classes.messageText}
              style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}
            >
              {renderTextWithCode(
                msg.text
                  .replace(/FINAL_SCORE:\s*\d+/, '')
                  .replace(/^(Interviewer|INTERVIEWER|Candidate|CANDIDATE):\s*/, '')
                  .trim(),
                displayRole === 'interviewer' || (displayRole === 'ai' && !isAiInterview)
                  ? 'ai'
                  : displayRole === 'candidate'
                    ? 'candidate'
                    : 'user',
              )}
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
};
