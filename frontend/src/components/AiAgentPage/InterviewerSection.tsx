import { AiLevelType, InterviewerMode, ThreadType } from '@/types/aiAgentTypes';
import {
  MAX_QUESTIONS,
  PANEL_HEIGHT_OFFSET,
  TIMER_WARNING_THRESHOLD,
} from '@constants/aiAgentConstants';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  Progress,
  ScrollArea,
  SegmentedControl,
  Text,
  Textarea,
} from '@mantine/core';
import classes from '@pages/AiAgentPage/AiAgentPage.module.css';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface InterviewerSectionProps {
  interviewerMode: InterviewerMode;
  onInterviewerModeChange: (mode: InterviewerMode) => void;
  activeTopic: string | null;
  onResetClick: () => void;
  questionCount: number;
  messagesCount: number;
  lastMessageText: string;
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
  isLoadingHistory?: boolean;
}

export const InterviewerSection = ({
  interviewerMode,
  onInterviewerModeChange,
  activeTopic,
  onResetClick,
  questionCount,
  messagesCount,
  lastMessageText,
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
  isLoadingHistory,
}: InterviewerSectionProps) => {
  const { t } = useTranslation('aiAgent');
  const timerColor = timer !== null && timer < TIMER_WARNING_THRESHOLD ? 'red' : undefined;
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
            behavior: isLoadingHistory ? 'instant' : 'smooth',
          });
        }, 0);
      }
    }
  }, [messagesCount, lastMessageText, isLoadingHistory]);

  return (
    <Grid.Col span={isMobile ? 12 : 4.5}>
      <Paper
        className={`${classes.glassPanel} ${classes.border} ${classes.panelColumn}`}
        p="md"
        radius="md"
        h={isMobile ? '70vh' : `calc(100vh - ${PANEL_HEIGHT_OFFSET}px)`}
        display="flex"
      >
        <Box mb="md">
          <Group justify="space-between" align="center" mb="xs">
            <SegmentedControl
              value={interviewerMode}
              onChange={(value) => onInterviewerModeChange(value as InterviewerMode)}
              data={[
                { label: t('interviewer.label'), value: 'interviewer' },
                { label: t('interviewer.aiInterview'), value: 'ai-interview' },
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
                <Text className={classes.progressLabel}>{t('interviewer.progress')}</Text>
                <Text className={classes.progressCount}>
                  {t('interviewer.progressCount', {
                    current: Math.min(questionCount, MAX_QUESTIONS),
                    max: MAX_QUESTIONS,
                  })}
                </Text>
              </Group>
              <Progress
                value={(Math.min(questionCount, MAX_QUESTIONS) / MAX_QUESTIONS) * 100}
                classNames={{ root: classes.progressRoot, section: classes.progressSection }}
                size="xs"
                radius="xl"
              />
              {interviewerMode === 'interviewer' && timer !== null && (
                <Text className={classes.timerText} c={timerColor}>
                  {t('interviewer.timeLeft', { seconds: timer })}
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
                { label: t('interviewer.junior'), value: 'junior' },
                { label: t('interviewer.middle'), value: 'middle' },
                { label: t('interviewer.senior'), value: 'senior' },
              ]}
            />
          </Group>
        )}

        <ScrollArea ref={scrollAreaRef} flex={1} p="xs" pr="md" className={classes.smoothScroll}>
          {isLoadingHistory ? (
            <Center h="100%">
              <Loader size="sm" />
            </Center>
          ) : (
            renderMessages(interviewerMode as ThreadType, interviewerMode)
          )}
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
              {t('interviewer.generateNext')}
            </Button>
          ) : (
            <Group gap="xs" align="flex-end">
              <Textarea
                flex={1}
                placeholder={t('interviewer.placeholder')}
                autosize
                minRows={1}
                maxRows={5}
                classNames={{ input: classes.chatTextareaInput }}
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
                {t('interviewer.send')}
              </Button>
            </Group>
          )}
        </Box>
      </Paper>
    </Grid.Col>
  );
};
