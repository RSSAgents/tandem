import { DrawerType, Thread, ThreadType } from '@/types/aiAgentTypes';
import { loadThreadHistory } from '@api/aiAgent.api';
import { CodeRunnerModal } from '@components/AiAgentPage/CodeRunnerModal';
import { InterviewerSection } from '@components/AiAgentPage/InterviewerSection';
import { MessageRenderer } from '@components/AiAgentPage/MessageRenderer';
import { SettingsPanel } from '@components/AiAgentPage/SettingsPanel';
import { TeacherSection } from '@components/AiAgentPage/TeacherSection';
import { TopicsPanel } from '@components/AiAgentPage/TopicsPanel';
import { MOBILE_BREAKPOINT, TIMER_SECONDS } from '@constants/aiAgentConstants';
import { useAiAgentState } from '@hooks/useAiAgentState';
import { useAiInterviewLogic } from '@hooks/useAiInterviewLogic';
import { Box, Button, Drawer, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './AiAgentPage.module.css';

export const AiAgentPage = () => {
  const { t } = useTranslation('aiAgent');
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [drawerType, setDrawerType] = useState<DrawerType>('menu');

  const [codeRunnerOpened, setCodeRunnerOpened] = useState(false);
  const state = useAiAgentState();
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

    threadTypes.forEach(async ({ dbType, type }) => {
      const messages = await loadThreadHistory(topic, dbType).catch(() => []);
      if (messages.length === 0) return;

      const thread: Thread = {
        id: crypto.randomUUID(),
        topic,
        type,
        messages,
      };
      createOrUpdateThread(thread);
    });
  }, [stateActiveTopic, createOrUpdateThread]);

  const renderMessagesWrapper = (type: ThreadType, mode?: 'interviewer' | 'ai-interview') => {
    const startMsg = getStartMessageForType(type, state.activeTopic);
    const thread = state.threads.find((t) => t.topic === state.activeTopic && t.type === type);
    const messages = thread?.messages || [];

    return (
      <MessageRenderer
        messages={messages}
        startMessage={startMsg}
        hasActiveTopic={state.activeTopic !== null}
        mode={mode === 'ai-interview' ? 'ai-interview' : undefined}
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

      {isMobile && (
        <>
          <Button
            onClick={() => {
              setDrawerType('menu');
              openDrawer();
            }}
            variant="filled"
            color="#ae3ec9"
            className={`${classes.tabButton} ${classes.tabButtonSettings}`}
          >
            <Text size="9px" fw={700} className={classes.tabButtonLabel}>
              {t('mobile.settings')}
            </Text>
          </Button>
          <Button
            onClick={() => {
              setDrawerType('topics');
              openDrawer();
            }}
            variant="filled"
            color="#22b8cf"
            className={`${classes.tabButton} ${classes.tabButtonTopics}`}
          >
            <Text size="9px" fw={700} className={classes.tabButtonLabel}>
              {t('mobile.topics')}
            </Text>
          </Button>
        </>
      )}

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={drawerType === 'menu' ? t('mobile.drawerSettings') : t('mobile.drawerTopics')}
        size="xs"
        padding="md"
      >
        <Box>
          {drawerType === 'menu' ? (
            <SettingsPanel
              role={state.role}
              stressMode={state.stressMode}
              readinessPercentage={state.readinessPercentage}
              onRoleChange={state.setRole}
              onStressModeChange={state.setStressMode}
              onOpenCodeRunner={() => setCodeRunnerOpened(true)}
            />
          ) : (
            <TopicsPanel
              activeTopic={state.activeTopic}
              scores={state.scores}
              onTopicSelect={state.setActiveTopic}
              isMobile={true}
              onClose={closeDrawer}
            />
          )}
        </Box>
      </Drawer>

      <Grid gutter="md" align="stretch">
        {!isMobile && (
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

        {(!isMobile || state.mobileActiveView === 'interviewer') && (
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
          />
        )}

        {(!isMobile || state.mobileActiveView === 'teacher') && (
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
