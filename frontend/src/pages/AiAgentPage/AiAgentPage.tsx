import { InterviewerMode, ThreadType } from '@/types/aiAgentTypes';
import { CodeRunnerModal } from '@components/AiAgentPage/CodeRunnerModal';
import { InterviewerSection } from '@components/AiAgentPage/InterviewerSection';
import { MessageRenderer } from '@components/AiAgentPage/MessageRenderer';
import { ResetModals } from '@components/AiAgentPage/ResetModals';
import { SettingsPanel } from '@components/AiAgentPage/SettingsPanel';
import { TabletSidePanels } from '@components/AiAgentPage/TabletSidePanels';
import { TeacherSection } from '@components/AiAgentPage/TeacherSection';
import { TopicsPanel } from '@components/AiAgentPage/TopicsPanel';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT, TIMER_SECONDS } from '@constants/aiAgentConstants';
import { useAiAgentState } from '@hooks/useAiAgentState';
import { useAiInterviewLogic } from '@hooks/useAiInterviewLogic';
import { useClickOutsidePanel } from '@hooks/useClickOutsidePanel';
import { useThreadHistory } from '@hooks/useThreadHistory';
import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './AiAgentPage.module.css';

export const AiAgentPage = () => {
  const { t } = useTranslation('aiAgent');
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const isTablet = useMediaQuery(`(max-width: ${TABLET_BREAKPOINT}px)`);
  const panelState = useClickOutsidePanel();
  const [codeRunnerOpened, setCodeRunnerOpened] = useState(false);

  useEffect(() => {
    document.body.classList.add('ai-agent-page');
    return () => document.body.classList.remove('ai-agent-page');
  }, []);

  const state = useAiAgentState();
  const { isLoadingHistory } = useThreadHistory(state.activeTopic, state.createOrUpdateThread);
  const { interviewerMode, setInterviewerMode } = state;

  useEffect(() => {
    if (!isMobile && interviewerMode === 'teacher') {
      setInterviewerMode('interviewer');
    }
  }, [isMobile, interviewerMode, setInterviewerMode]);

  const { handleSend, startAiInterviewSimulation, getStartMessageForType } =
    useAiInterviewLogic(state);

  useEffect(() => {
    if (state.timer === 0) {
      handleSend('interviewer', t('errors.timesUp', { timerSeconds: TIMER_SECONDS }));
      state.setTimer(null);
    }
  }, [state, handleSend, t]);

  const renderMessagesWrapper = (type: ThreadType, mode?: InterviewerMode) => {
    const startMsg = getStartMessageForType(type, state.activeTopic);
    const thread = state.threads.find((t) => t.topic === state.activeTopic && t.type === type);
    const messages = thread?.messages || [];
    const isThinking = state.isWaitingForAnswer && state.waitingForType === type;

    return (
      <MessageRenderer
        messages={messages}
        startMessage={startMsg}
        hasActiveTopic={state.activeTopic !== null}
        mode={mode === 'ai-interview' ? 'ai-interview' : undefined}
        isWaitingForAnswer={isThinking}
      />
    );
  };

  const getMessagesCount = (type: ThreadType): number => {
    const thread = state.threads.find((t) => t.topic === state.activeTopic && t.type === type);
    return thread?.messages.length || 0;
  };

  const getLastMessageText = (type: ThreadType): string => {
    const thread = state.threads.find((t) => t.topic === state.activeTopic && t.type === type);
    const msgs = thread?.messages;
    return msgs?.length ? msgs[msgs.length - 1].text : '';
  };

  return (
    <div className={classes.mainContent}>
      <ResetModals
        resetInterviewerModalOpen={state.resetInterviewerModalOpen}
        closeResetInterviewer={state.closeResetInterviewer}
        clearInterviewerHistory={() => state.clearHistory(state.interviewerMode as ThreadType)}
        resetTeacherModalOpen={state.resetTeacherModalOpen}
        closeResetTeacher={state.closeResetTeacher}
        clearTeacherHistory={() => state.clearHistory('teacher')}
      />

      {isTablet && (
        <TabletSidePanels
          {...panelState}
          role={state.role}
          stressMode={state.stressMode}
          readinessPercentage={state.readinessPercentage}
          onRoleChange={state.setRole}
          onStressModeChange={state.setStressMode}
          onOpenCodeRunner={() => setCodeRunnerOpened(true)}
          activeTopic={state.activeTopic}
          scores={state.scores}
          onTopicSelect={state.setActiveTopic}
        />
      )}

      <Grid gutter="md" align="stretch">
        {!isTablet && (
          <Grid.Col span={3}>
            <Stack gap="md">
              <SettingsPanel
                role={state.role}
                stressMode={state.stressMode}
                readinessPercentage={state.readinessPercentage}
                onRoleChange={state.setRole}
                onStressModeChange={state.setStressMode}
                onOpenCodeRunner={() => setCodeRunnerOpened(true)}
              />
              <TopicsPanel
                activeTopic={state.activeTopic}
                scores={state.scores}
                onTopicSelect={state.setActiveTopic}
              />
            </Stack>
          </Grid.Col>
        )}

        {(!isMobile || state.interviewerMode !== 'teacher') && (
          <InterviewerSection
            interviewerMode={state.interviewerMode}
            onInterviewerModeChange={state.setInterviewerMode}
            activeTopic={state.activeTopic}
            onResetClick={state.openResetInterviewer}
            questionCount={state.questionCount}
            messagesCount={getMessagesCount(state.interviewerMode as ThreadType)}
            lastMessageText={getLastMessageText(state.interviewerMode as ThreadType)}
            timer={state.timer}
            isMobile={isMobile}
            renderMessages={renderMessagesWrapper}
            inputValue={state.getInput('interviewer')}
            onInputChange={(val) => state.setInput('interviewer', val)}
            onSend={() => handleSend('interviewer')}
            onGenerateAi={startAiInterviewSimulation}
            isWaitingForAnswer={state.isWaitingForAnswer}
            aiInterviewLevel={state.aiInterviewLevel}
            onAiLevelChange={state.setAiInterviewLevel}
            isLoadingHistory={isLoadingHistory}
            colSpan={isMobile ? 12 : isTablet ? 6 : 4.5}
          />
        )}

        {isMobile && state.interviewerMode === 'teacher' && (
          <InterviewerSection
            interviewerMode={state.interviewerMode}
            onInterviewerModeChange={state.setInterviewerMode}
            activeTopic={state.activeTopic}
            onResetClick={state.openResetTeacher}
            questionCount={state.questionCount}
            messagesCount={getMessagesCount('teacher')}
            lastMessageText={getLastMessageText('teacher')}
            timer={state.timer}
            isMobile={isMobile}
            renderMessages={renderMessagesWrapper}
            inputValue={state.getInput('interviewer')}
            onInputChange={(val) => state.setInput('interviewer', val)}
            onSend={() => handleSend('interviewer')}
            onGenerateAi={startAiInterviewSimulation}
            isWaitingForAnswer={state.isWaitingForAnswer}
            aiInterviewLevel={state.aiInterviewLevel}
            onAiLevelChange={state.setAiInterviewLevel}
            isLoadingHistory={isLoadingHistory}
            colSpan={12}
            teacherContent={
              <>
                <ScrollArea flex={1} p="xs" pr="md" className={classes.smoothScroll}>
                  {isLoadingHistory ? (
                    <Center h="100%">
                      <Loader size="sm" />
                    </Center>
                  ) : state.stressMode === 'stress' ? (
                    <Center h="100%">
                      <Text c="dimmed" fw={700}>
                        {t('teacher.stressUnavailable')}
                      </Text>
                    </Center>
                  ) : (
                    renderMessagesWrapper('teacher')
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
                      disabled={
                        !state.activeTopic ||
                        state.stressMode === 'stress' ||
                        state.isWaitingForAnswer
                      }
                      value={state.getInput('teacher')}
                      onChange={(e) => state.setInput('teacher', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend('teacher');
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleSend('teacher')}
                      className={classes.actionBtn}
                      disabled={
                        !state.activeTopic ||
                        state.stressMode === 'stress' ||
                        state.isWaitingForAnswer
                      }
                    >
                      {t('teacher.ask')}
                    </Button>
                  </Group>
                </Box>
              </>
            }
          />
        )}

        {!isMobile && (
          <TeacherSection
            activeTopic={state.activeTopic}
            onResetClick={state.openResetTeacher}
            messagesCount={getMessagesCount('teacher')}
            lastMessageText={getLastMessageText('teacher')}
            isMobile={isMobile}
            renderMessages={() => renderMessagesWrapper('teacher')}
            stressMode={state.stressMode}
            inputValue={state.getInput('teacher')}
            onInputChange={(val) => state.setInput('teacher', val)}
            onSend={() => handleSend('teacher')}
            isWaitingForAnswer={state.isWaitingForAnswer}
            isLoadingHistory={isLoadingHistory}
            colSpan={isMobile ? 12 : isTablet ? 6 : 4.5}
          />
        )}
      </Grid>
      <CodeRunnerModal
        opened={codeRunnerOpened}
        onClose={() => setCodeRunnerOpened(false)}
        code={t('codeRunnerModal.defaultCode')}
        language="javascript"
      />
    </div>
  );
};
