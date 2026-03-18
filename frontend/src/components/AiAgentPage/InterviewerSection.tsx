import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  Paper,
  Progress,
  ScrollArea,
  SegmentedControl,
  Text,
  Textarea,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';
import { AiLevelType, InterviewerMode, ThreadType } from '../../types/aiAgentTypes';

interface InterviewerSectionProps {
  interviewerMode: InterviewerMode;
  onInterviewerModeChange: (mode: InterviewerMode) => void;
  activeTopic: string | null;
  onResetClick: () => void;
  questionCount: number;
  messagesCount: number;
  timer: number | null;
  isMobile: boolean;
  renderMessages: (type: ThreadType, mode?: InterviewerMode) => React.ReactNode;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onGenerateAi: () => void;
  isWaitingForAnswer: boolean;
  aiInterviewLevel: AiLevelType;
  onAiLevelChange: (level: AiLevelType) => void;
}

export const InterviewerSection = ({
  interviewerMode,
  onInterviewerModeChange,
  activeTopic,
  onResetClick,
  questionCount,
  messagesCount,
  timer,
  isMobile,
  renderMessages,
  inputValue,
  onInputChange,
  onSend,
  onGenerateAi,
  isWaitingForAnswer,
  aiInterviewLevel,
  onAiLevelChange,
}: InterviewerSectionProps) => {
  const timerColor = timer !== null && timer < 15 ? 'red' : undefined;
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
        <Box mb="md">
          <Group justify="space-between" align="center" mb="xs">
            <SegmentedControl
              value={interviewerMode}
              onChange={(value) => onInterviewerModeChange(value as InterviewerMode)}
              data={[
                { label: 'INTERVIEWER', value: 'interviewer' },
                { label: 'AI INTERVIEW', value: 'ai-interview' },
              ]}
              classNames={{
                root: classes.modeSwitcher,
              }}
            />
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

          {activeTopic && (
            <Box className={classes.progressBlock} mt="md">
              <Group justify="space-between" mb={6}>
                <Text className={classes.progressLabel}>INTERVIEW PROGRESS</Text>
                <Text className={classes.progressCount}>{Math.min(questionCount, 20)} / 20</Text>
              </Group>
              <Progress
                value={(Math.min(questionCount, 20) / 20) * 100}
                classNames={{ root: classes.progressRoot, section: classes.progressSection }}
                size="xs"
                radius="xl"
              />
              {interviewerMode === 'interviewer' && timer !== null && (
                <Text className={classes.timerText} c={timerColor}>
                  Time left: {timer}s
                </Text>
              )}
            </Box>
          )}
        </Box>

        {interviewerMode === 'ai-interview' && (
          <Group justify="flex-start" mb="md">
            <SegmentedControl
              size="xs"
              value={aiInterviewLevel}
              onChange={(value) => onAiLevelChange(value as AiLevelType)}
              disabled={questionCount > 0}
              data={[
                { label: 'Junior', value: 'junior' },
                { label: 'Middle', value: 'middle' },
                { label: 'Senior', value: 'senior' },
              ]}
            />
          </Group>
        )}

        <ScrollArea ref={scrollAreaRef} flex={1} p="xs" pr="md" className={classes.smoothScroll}>
          {renderMessages(interviewerMode as ThreadType, interviewerMode)}
        </ScrollArea>

        <Box mt="md">
          {interviewerMode === 'ai-interview' ? (
            <Button
              fullWidth
              variant="light"
              color="#1971c2"
              onClick={onGenerateAi}
              disabled={!activeTopic || isWaitingForAnswer}
            >
              Generate Next Question & Answer
            </Button>
          ) : (
            <Group gap="xs" align="flex-end">
              <Textarea
                flex={1}
                placeholder="Type your answer..."
                autosize
                minRows={1}
                maxRows={5}
                disabled={!activeTopic || (timer !== null && timer === 0) || isWaitingForAnswer}
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
              />
              <Button
                variant="outline"
                onClick={onSend}
                disabled={!activeTopic || (timer !== null && timer === 0) || isWaitingForAnswer}
              >
                Send
              </Button>
            </Group>
          )}
        </Box>
      </Paper>
    </Grid.Col>
  );
};
