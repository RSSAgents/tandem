import { Box, Button, Drawer, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { CodeRunnerModal } from '../../components/AiAgentPage/CodeRunnerModal';
import { InterviewerSection } from '../../components/AiAgentPage/InterviewerSection';
import { MessageRenderer } from '../../components/AiAgentPage/MessageRenderer';
import { SettingsPanel } from '../../components/AiAgentPage/SettingsPanel';
import { TeacherSection } from '../../components/AiAgentPage/TeacherSection';
import { TopicsPanel } from '../../components/AiAgentPage/TopicsPanel';
import { useAiAgentState } from '../../hooks/useAiAgentState';
import { useAiInterviewLogic } from '../../hooks/useAiInterviewLogic';
import { DrawerType, ThreadType } from '../../types/aiAgentTypes';
import classes from './AiAgentPage.module.css';

export const AiAgentPage = () => {
  const isMobile = useMediaQuery('(max-width: 992px)');
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [drawerType, setDrawerType] = useState<DrawerType>('menu');

  const [codeRunnerOpened, setCodeRunnerOpened] = useState(false);
  const state = useAiAgentState();
  const { handleSend, startAiInterviewSimulation, getStartMessageForType } =
    useAiInterviewLogic(state);

  useEffect(() => {
    if (state.timer === 0) {
      handleSend('interviewer', "Time's up! I couldn't answer in 90 seconds.");
      state.setTimer(null);
    }
  }, [state, handleSend]);

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

  return (
    <div className={classes.mainContent}>
      <Modal
        opened={state.resetInterviewerModalOpen}
        onClose={state.closeResetInterviewer}
        title="Start New Interview"
        centered
      >
        <Text size="sm" mb="md">
          Are you sure you want to start a new interview? The current message history for this topic
          will be deleted.
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={state.closeResetInterviewer}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => state.clearHistory(state.interviewerMode as ThreadType)}
          >
            Confirm & Start
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={state.resetTeacherModalOpen}
        onClose={state.closeResetTeacher}
        title="Clear Teacher History"
        centered
      >
        <Text size="sm" mb="md">
          Are you sure you want to clear the conversation history with the Teacher for this topic?
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={state.closeResetTeacher}>
            Cancel
          </Button>
          <Button color="red" onClick={() => state.clearHistory('teacher')}>
            Clear History
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
            className={classes.tabButton}
            style={{ top: '150px' }}
          >
            <Text size="9px" fw={700} style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
              SETTINGS
            </Text>
          </Button>
          <Button
            onClick={() => {
              setDrawerType('topics');
              openDrawer();
            }}
            variant="filled"
            color="#22b8cf"
            className={classes.tabButton}
            style={{ top: '260px' }}
          >
            <Text size="9px" fw={700} style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
              TOPICS
            </Text>
          </Button>
        </>
      )}

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={drawerType === 'menu' ? 'Settings' : 'Topics'}
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
        code={'// Write your code here\nconsole.log("Hello, world!");'}
        language="javascript"
      />
    </div>
  );
};
