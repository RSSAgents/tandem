import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Text,
  Textarea,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';
import { InterviewerMode, StressModeType } from '../../types/aiAgentTypes';

interface TeacherSectionProps {
  activeTopic: string | null;
  onResetClick: () => void;
  isMobile: boolean;
  messagesCount: number;
  renderMessages: () => React.ReactNode;
  stressMode: StressModeType;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isWaitingForAnswer: boolean;
  isInterviewerWaitingForUser: boolean;
  interviewerMode: InterviewerMode;
}

export const TeacherSection = ({
  activeTopic,
  onResetClick,
  isMobile,
  messagesCount,
  renderMessages,
  stressMode,
  inputValue,
  onInputChange,
  onSend,
  isWaitingForAnswer,
  isInterviewerWaitingForUser,
  interviewerMode,
}: TeacherSectionProps) => {
  const isDisabled =
    !activeTopic ||
    stressMode === 'stress' ||
    isWaitingForAnswer ||
    (interviewerMode === 'interviewer' && isInterviewerWaitingForUser);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[style*="overflow"]',
      ) as HTMLElement;
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scroll({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth',
          });
        }, 0);
      }
    }
  }, [messagesCount]);

  return (
    <Grid.Col span={isMobile ? 12 : 4.5}>
      <Paper
        className={`${classes.glassPanel} ${classes.border}`}
        p="md"
        radius="md"
        h={isMobile ? '70vh' : 'calc(100vh - 250px)'}
        display="flex"
        style={{ flexDirection: 'column' }}
      >
        <Group justify="space-between" align="center" mb="md">
          <Badge
            variant="outline"
            color="#1971c2"
            style={{
              height: 30,
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: '#74c0fc',
              borderColor: '#1971c2',
              textTransform: 'uppercase',
            }}
          >
            TEACHER
          </Badge>
          <ActionIcon
            className={classes.trashIconBtn}
            onClick={onResetClick}
            disabled={!activeTopic}
            variant="subtle"
            size="sm"
          >
            <IconTrash size={14} />
          </ActionIcon>
        </Group>

        <ScrollArea ref={scrollAreaRef} flex={1} p="xs" pr="md" className={classes.smoothScroll}>
          {stressMode === 'stress' ? (
            <Center h="100%">
              <Text c="dimmed" fw={700}>
                Teacher help is unavailable in Stress mode.
              </Text>
            </Center>
          ) : (
            renderMessages()
          )}
        </ScrollArea>

        <Box mt="md">
          <Group gap="xs" align="flex-end">
            <Textarea
              flex={1}
              placeholder="Ask teacher..."
              autosize
              minRows={1}
              maxRows={5}
              disabled={isDisabled}
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
            />
            <Button variant="outline" onClick={onSend} disabled={isDisabled}>
              Ask
            </Button>
          </Group>
        </Box>
      </Paper>
    </Grid.Col>
  );
};
