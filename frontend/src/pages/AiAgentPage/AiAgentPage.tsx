import { DrawerType, InterviewerMode, Thread, ThreadType } from '@/types/aiAgentTypes';
import { loadThreadHistory } from '@api/aiAgent.api';
import { CodeRunnerModal } from '@components/AiAgentPage/CodeRunnerModal';
import { InterviewerSection } from '@components/AiAgentPage/InterviewerSection';
import { MessageRenderer } from '@components/AiAgentPage/MessageRenderer';
import { SettingsPanel } from '@components/AiAgentPage/SettingsPanel';
import { TeacherSection } from '@components/AiAgentPage/TeacherSection';
import { TopicsPanel } from '@components/AiAgentPage/TopicsPanel';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT, TIMER_SECONDS } from '@constants/aiAgentConstants';
import { useAiAgentState } from '@hooks/useAiAgentState';
import { useAiInterviewLogic } from '@hooks/useAiInterviewLogic';
import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  Transition,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './AiAgentPage.module.css';

export const AiAgentPage = () => {
  const { t } = useTranslation('aiAgent');
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const isTablet = useMediaQuery(`(max-width: ${TABLET_BREAKPOINT}px)`);
  const [openPanel, setOpenPanel] = useState<DrawerType | null>(null);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  const topicsBtnRef = useRef<HTMLButtonElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const topicsPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openPanel) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        openPanel === 'menu' &&
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(target) &&
        !settingsBtnRef.current?.contains(target)
      ) {
        setOpenPanel(null);
      }
      if (
        openPanel === 'topics' &&
        topicsPanelRef.current &&
        !topicsPanelRef.current.contains(target) &&
        !topicsBtnRef.current?.contains(target)
      ) {
        setOpenPanel(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openPanel]);

  const [codeRunnerOpened, setCodeRunnerOpened] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    document.body.classList.add('ai-agent-page');
    return () => document.body.classList.remove('ai-agent-page');
  }, []);
  const state = useAiAgentState();

  useEffect(() => {
    if (!isMobile && state.interviewerMode === 'teacher') {
      state.setInterviewerMode('interviewer');
    }
  }, [isMobile]);
  const { handleSend, startAiInterviewSimulation, getStartMessageForType } =
    useAiInterviewLogic(state);

  useEffect(() => {
    if (state.timer === 0) {
      handleSend('interviewer', t('errors.timesUp', { timerSeconds: TIMER_SECONDS }));
      state.setTimer(null);
    }
  }, [state, handleSend, t]);

  const { activeTopic: stateActiveTopic, createOrUpdateThread } = state;

  useEffect(() => {
    if (!stateActiveTopic) return;
    const topic = stateActiveTopic;

    const threadTypes: Array<{ dbType: string; type: ThreadType }> = [
      { dbType: 'interviewer', type: 'interviewer' },
      { dbType: 'teacher', type: 'teacher' },
      { dbType: 'ai-interview-junior', type: 'ai-interview' },
      { dbType: 'ai-interview-middle', type: 'ai-interview' },
      { dbType: 'ai-interview-senior', type: 'ai-interview' },
    ];

    Promise.resolve()
      .then(() => {
        setIsLoadingHistory(true);
        return Promise.all(
          threadTypes.map(async ({ dbType, type }) => {
            const messages = await loadThreadHistory(topic, dbType).catch(() => []);
            if (messages.length === 0) return;

            const thread: Thread = {
              id: crypto.randomUUID(),
              topic,
              type,
              messages,
            };
            createOrUpdateThread(thread);
          }),
        );
      })
      .finally(() => {
        setIsLoadingHistory(false);
      });
  }, [stateActiveTopic, createOrUpdateThread]);

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
      <Modal
        opened={state.resetInterviewerModalOpen}
        onClose={state.closeResetInterviewer}
        title={t('modals.resetInterview.title')}
        centered
      >
        <Text size="sm" mb="md">
          {t('modals.resetInterview.body')}
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={state.closeResetInterviewer}>
            {t('modals.cancel')}
          </Button>
          <Button
            color="red"
            onClick={() => state.clearHistory(state.interviewerMode as ThreadType)}
          >
            {t('modals.resetInterview.confirm')}
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={state.resetTeacherModalOpen}
        onClose={state.closeResetTeacher}
        title={t('modals.resetTeacher.title')}
        centered
      >
        <Text size="sm" mb="md">
          {t('modals.resetTeacher.body')}
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={state.closeResetTeacher}>
            {t('modals.cancel')}
          </Button>
          <Button color="red" onClick={() => state.clearHistory('teacher')}>
            {t('modals.resetTeacher.confirm')}
          </Button>
        </Group>
      </Modal>

      {isTablet && (
        <>
          <Button
            ref={settingsBtnRef}
            onClick={() => setOpenPanel(openPanel === 'menu' ? null : 'menu')}
            variant="filled"
            color="#ae3ec9"
            className={`${classes.tabButton} ${classes.tabButtonSettings}`}
          >
            <Text size="9px" fw={700} className={classes.tabButtonLabel}>
              {t('mobile.settings')}
            </Text>
          </Button>
          <Transition mounted={openPanel === 'menu'} transition="slide-right" duration={200}>
            {(style) => (
              <Paper
                ref={settingsPanelRef}
                className={`${classes.slidePanel} ${classes.slidePanelSettings}`}
                style={style}
                shadow="lg"
                p="md"
                radius="0 md md 0"
              >
                <SettingsPanel
                  role={state.role}
                  stressMode={state.stressMode}
                  readinessPercentage={state.readinessPercentage}
                  onRoleChange={state.setRole}
                  onStressModeChange={state.setStressMode}
                  onOpenCodeRunner={() => setCodeRunnerOpened(true)}
                />
              </Paper>
            )}
          </Transition>

          <Button
            ref={topicsBtnRef}
            onClick={() => setOpenPanel(openPanel === 'topics' ? null : 'topics')}
            variant="filled"
            color="#22b8cf"
            className={`${classes.tabButton} ${classes.tabButtonTopics}`}
          >
            <Text size="9px" fw={700} className={classes.tabButtonLabel}>
              {t('mobile.topics')}
            </Text>
          </Button>
          <Transition mounted={openPanel === 'topics'} transition="slide-right" duration={200}>
            {(style) => (
              <Paper
                ref={topicsPanelRef}
                className={`${classes.slidePanel} ${classes.slidePanelTopics}`}
                style={style}
                shadow="lg"
                p="md"
                radius="0 md md 0"
              >
                <TopicsPanel
                  activeTopic={state.activeTopic}
                  scores={state.scores}
                  onTopicSelect={state.setActiveTopic}
                  isMobile={true}
                  onClose={() => setOpenPanel(null)}
                />
              </Paper>
            )}
          </Transition>
        </>
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
