import { StressModeType } from '@/types/aiAgentTypes';
import { PANEL_HEIGHT_OFFSET } from '@constants/aiAgentConstants';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Text,
  Textarea,
} from '@mantine/core';
import classes from '@pages/AiAgentPage/AiAgentPage.module.css';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TeacherSectionProps {
  activeTopic: string | null;
  onResetClick: () => void;
  isMobile: boolean;
  messagesCount: number;
  lastMessageText: string;
  renderMessages: () => React.ReactNode;
  stressMode: StressModeType;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isWaitingForAnswer: boolean;
  isLoadingHistory?: boolean;
}

export const TeacherSection = ({
  activeTopic,
  onResetClick,
  isMobile,
  messagesCount,
  lastMessageText,
  renderMessages,
  stressMode,
  inputValue,
  onInputChange,
  onSend,
  isWaitingForAnswer,
  isLoadingHistory,
}: TeacherSectionProps) => {
  const { t } = useTranslation('aiAgent');
  const isDisabled = !activeTopic || stressMode === 'stress' || isWaitingForAnswer;

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
  }, [messagesCount, lastMessageText]);

  return (
    <Grid.Col span={isMobile ? 12 : 4.5}>
      <Paper
        className={`${classes.glassPanel} ${classes.border} ${classes.panelColumn}`}
        p="md"
        radius="md"
        h={isMobile ? '70vh' : `calc(100vh - ${PANEL_HEIGHT_OFFSET}px)`}
        display="flex"
      >
        <Group justify="space-between" align="center" mb="md">
          <Badge variant="outline" color="#1971c2" className={classes.teacherBadge}>
            {t('teacher.label')}
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
          {isLoadingHistory ? (
            <Center h="100%">
              <Loader size="sm" />
            </Center>
          ) : stressMode === 'stress' ? (
            <Center h="100%">
              <Text c="dimmed" fw={700}>
                {t('teacher.stressUnavailable')}
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
              placeholder={t('teacher.placeholder')}
              autosize
              minRows={1}
              maxRows={5}
              classNames={{ input: classes.chatTextareaInput }}
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
              {t('teacher.ask')}
            </Button>
          </Group>
        </Box>
      </Paper>
    </Grid.Col>
  );
};
