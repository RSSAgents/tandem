import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import { ActionIcon, Box, Stack, Text } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useCallback, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';
import { InterviewerMode, Message } from '../../types/aiAgentTypes';
import { CodeRunnerModal } from './CodeRunnerModal';

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
  const [runnerCode, setRunnerCode] = useState('');
  const [runnerLang, setRunnerLang] = useState('javascript');
  const [runnerOpened, setRunnerOpened] = useState(false);

  const openRunner = useCallback((code: string, language: string) => {
    setRunnerCode(code);
    setRunnerLang(language);
    setRunnerOpened(true);
  }, []);

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

  const renderMarkdown = useCallback((text: string, sender: 'user' | 'ai' | 'candidate') => {
    const blockClass =
      sender === 'ai'
        ? classes.codeBlockAi
        : sender === 'candidate'
          ? classes.codeBlockCandidate
          : classes.codeBlockUser;
    const inlineClass =
      sender === 'ai'
        ? classes.codeAi
        : sender === 'candidate'
          ? classes.codeCandidate
          : classes.codeUser;

    return (
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeStr = String(children).replace(/\n$/, '');
            if (match) {
              const lang = match[1];
              return (
                <Box style={{ position: 'relative' }}>
                  <CodeHighlight code={codeStr} language={lang} className={blockClass} withCopyButton={false} />
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="gray"
                    className={classes.runButton}
                    onClick={() => openRunner(codeStr, lang)}
                    title="Run code"
                  >
                    <IconPlayerPlay size={14} />
                  </ActionIcon>
                </Box>
              );
            }
            return <code className={inlineClass} {...props}>{children}</code>;
          },
          pre({ children }) {
            return <>{children}</>;
          },
        }}
      >
        {text}
      </ReactMarkdown>
    );
  }, [openRunner]);

  return (
    <>
    <Stack gap="md">
      {messagesToShow.map((msg: Message) => {
        const isAiInterview = mode === 'ai-interview' && msg.sender === 'ai';
        const displayRole = isAiInterview && msg.aiRole ? msg.aiRole : msg.sender;

        return (
          <Box
            key={msg.id}
            className={
              msg.sender === 'ai' && (!isAiInterview || !msg.aiRole || msg.aiRole === 'interviewer')
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
              className={`${classes.messageText} ${classes.markdown}`}
              style={{ fontSize: '14px' }}
            >
              {renderMarkdown(
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
    <CodeRunnerModal
      opened={runnerOpened}
      onClose={() => setRunnerOpened(false)}
      code={runnerCode}
      language={runnerLang}
    />
    </>
  );
};
