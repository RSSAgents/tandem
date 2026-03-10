import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  Grid,
  Group,
  Paper,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconMicrophone, IconTerminal2 } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './AiAgentPage.module.css';

export type ThreadType = 'interviewer' | 'teacher' | 'battle';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface Thread {
  id: string;
  topic: string;
  type: ThreadType;
  messages: Message[];
}

const TOPICS = [
  'Computer Science Fundamentals',
  'HTML & CSS Basics',
  'JavaScript Essentials',
  'Execution Context & Memory Management',
  'Functions & Patterns',
  'Context (this)',
  'Advanced Objects & Collections',
  'OOP & Classes',
  'Async JS',
  'DOM Events',
  'Browser Environment & Web API',
  'Network & Security',
  'TypeScript',
  'Architecture & Design Patterns',
  'SDLC & Testing',
];

type InputsState = Record<string, Partial<Record<ThreadType, string>>>;

export const AiAgentPage = () => {
  const isMobile = useMediaQuery('(max-width: 992px)');
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [drawerType, setDrawerType] = useState<'menu' | 'topics'>('menu');

  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [inputs, setInputs] = useState<InputsState>({});

  const [role, setRole] = useState('strict');
  const [teacherMode, setTeacherMode] = useState<'teacher' | 'battle'>('teacher');
  const [mobileActiveView, setMobileActiveView] = useState<'interviewer' | 'teacher'>(
    'interviewer',
  );
  const [stressMode, setStressMode] = useState('normal');
  const [audioMode, setAudioMode] = useState(false);

  const simulateAiReply = (threadId: string, userText: string) => {
    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: `AI reply for message: "${userText.substring(0, 20)}..."`,
        timestamp: Date.now(),
      };
      setThreads((current) =>
        current.map((t) =>
          t.id === threadId ? { ...t, messages: [...t.messages, aiMessage] } : t,
        ),
      );
    }, 1000);
  };

  const handleSend = (type: ThreadType) => {
    if (!activeTopic) return;
    const text = inputs[activeTopic]?.[type]?.trim() ?? '';
    if (!text) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    let targetThreadId = '';

    setThreads((current) => {
      const idx = current.findIndex((t) => t.topic === activeTopic && t.type === type);
      if (idx !== -1) {
        targetThreadId = current[idx].id;
        const updated = [...current];
        updated[idx] = { ...updated[idx], messages: [...updated[idx].messages, userMessage] };
        return updated;
      }
      const newThread: Thread = {
        id: crypto.randomUUID(),
        topic: activeTopic,
        type,
        messages: [userMessage],
      };
      targetThreadId = newThread.id;
      return [...current, newThread];
    });

    setInputs((prev) => ({ ...prev, [activeTopic]: { ...prev[activeTopic], [type]: '' } }));
    simulateAiReply(targetThreadId, text);
  };

  const getInput = (type: ThreadType) => (activeTopic ? (inputs[activeTopic]?.[type] ?? '') : '');
  const setInput = (type: ThreadType, val: string) => {
    if (!activeTopic) return;
    setInputs((prev) => ({ ...prev, [activeTopic]: { ...prev[activeTopic], [type]: val } }));
  };

  const renderMessages = (type: ThreadType) => {
    if (!activeTopic) {
      return (
        <Center h="100%">
          <Text c="dimmed" size="sm">
            Please select a topic to start conversation
          </Text>
        </Center>
      );
    }
    const thread = threads.find((t) => t.topic === activeTopic && t.type === type);
    return (
      <Stack gap="md">
        {thread?.messages.map((msg) => (
          <Box
            key={msg.id}
            className={msg.sender === 'ai' ? classes.messageAi : classes.messageUser}
          >
            <Text size="sm">{msg.text}</Text>
          </Box>
        ))}
      </Stack>
    );
  };

  const TopicsList = (
    <Stack gap="xs">
      <Text fw={700} size="xs" c="dimmed" tt="uppercase" mt="md">
        Learning Topics
      </Text>
      <ScrollArea h={isMobile ? 'auto' : 'calc(100vh - 400px)'} offsetScrollbars>
        <Stack gap="xs">
          {TOPICS.map((topic) => (
            <Button
              key={topic}
              variant={activeTopic === topic ? 'filled' : 'light'}
              fullWidth
              onClick={() => {
                setActiveTopic(topic);
                if (isMobile) {
                  closeDrawer();
                }
              }}
              styles={{ inner: { justifyContent: 'space-between' } }}
              rightSection={
                <Center className={classes.historyIcon} data-type="i">
                  0
                </Center>
              }
            >
              <Text size="sm" truncate fw={500}>
                {topic}
              </Text>
            </Button>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );

  const SettingsPanel = (
    <Paper className={classes.glassPanel} p="sm" radius="md">
      <Group gap="xs" align="stretch" wrap="nowrap">
        <Stack
          gap={0}
          justify="center"
          align="center"
          style={{ borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '12px' }}
        >
          <Text fw={700} size="10px" c="dimmed" tt="uppercase">
            Ready
          </Text>
          <Text fw={900} size="24px" c="cyan">
            0%
          </Text>
        </Stack>
        <Stack gap={4} flex={1}>
          <SegmentedControl
            fullWidth
            size="xs"
            value={role}
            onChange={setRole}
            data={[
              { label: 'STRICT', value: 'strict' },
              { label: 'GENTLE', value: 'gentle' },
            ]}
            classNames={{
              root: classes.roleSwitcher,
              indicator: role === 'strict' ? classes.gradientPink : classes.gradientCyan,
            }}
          />
          <SegmentedControl
            fullWidth
            size="xs"
            value={stressMode}
            onChange={setStressMode}
            data={[
              { label: 'NORMAL', value: 'normal' },
              { label: 'STRESS', value: 'stress' },
            ]}
            classNames={{
              root: classes.roleSwitcher,
              indicator: stressMode === 'stress' ? classes.gradientPink : classes.gradientCyan,
            }}
          />
          <Button
            variant="light"
            color="indigo"
            leftSection={<IconTerminal2 size={14} />}
            radius="md"
            size="xs"
            fullWidth
          >
            CODE RUNNER
          </Button>
        </Stack>
      </Group>
    </Paper>
  );

  return (
    <div className={classes.mainContent}>
      {isMobile && (
        <>
          <Button
            onClick={() => {
              setDrawerType('menu');
              openDrawer();
            }}
            variant="filled"
            color="pink"
            className={classes.tabButton}
            style={{ top: '150px' }}
          >
            <Text size="9px" fw={700} style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
              MENU
            </Text>
          </Button>
          <Button
            onClick={() => {
              setDrawerType('topics');
              openDrawer();
            }}
            variant="filled"
            color="cyan"
            className={classes.tabButton}
            style={{ top: '260px' }}
          >
            <Text size="9px" fw={700} style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
              TOPICS
            </Text>
          </Button>
        </>
      )}

      {isMobile && (
        <Center mb="md">
          <SegmentedControl
            size="sm"
            value={mobileActiveView}
            onChange={(val) => {
              if (val === 'interviewer' || val === 'teacher') {
                setMobileActiveView(val);
              }
            }}
            data={[
              { label: 'Interviewer', value: 'interviewer' },
              { label: 'Teacher', value: 'teacher' },
            ]}
          />
        </Center>
      )}

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={drawerType === 'menu' ? 'Settings' : 'Topics'}
        size="xs"
        padding="md"
      >
        <ScrollArea h="calc(100vh - 80px)" offsetScrollbars>
          {drawerType === 'menu' ? SettingsPanel : TopicsList}
        </ScrollArea>
      </Drawer>

      <Grid gutter="md" align="stretch">
        {!isMobile && (
          <Grid.Col span={3}>
            <Stack gap="md">
              {SettingsPanel}
              {TopicsList}
            </Stack>
          </Grid.Col>
        )}

        {(!isMobile || mobileActiveView === 'interviewer') && (
          <Grid.Col span={isMobile ? 12 : 4.5}>
            <Paper
              className={`${classes.glassPanel} ${classes.borderStrict}`}
              p="md"
              radius="md"
              h={isMobile ? '70vh' : 'calc(100vh - 250px)'}
              display="flex"
              style={{ flexDirection: 'column' }}
            >
              <Group justify="space-between" mb="md">
                <Badge variant="outline" color="pink" size="lg">
                  INTERVIEWER
                </Badge>
                <ActionIcon
                  variant={audioMode ? 'filled' : 'light'}
                  color="red"
                  onClick={() => setAudioMode(!audioMode)}
                >
                  <IconMicrophone size={18} />
                </ActionIcon>
              </Group>
              <ScrollArea flex={1} p="xs">
                {renderMessages('interviewer')}
              </ScrollArea>
              <Box mt="md">
                <Group gap="xs">
                  <TextInput
                    flex={1}
                    placeholder="Type your answer..."
                    disabled={!activeTopic}
                    value={getInput('interviewer')}
                    onChange={(e) => setInput('interviewer', e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend('interviewer')}
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleSend('interviewer')}
                    disabled={!activeTopic}
                  >
                    Send
                  </Button>
                </Group>
              </Box>
            </Paper>
          </Grid.Col>
        )}

        {(!isMobile || mobileActiveView === 'teacher') && (
          <Grid.Col span={isMobile ? 12 : 4.5}>
            <Paper
              className={`${classes.glassPanel} ${classes.borderGentle}`}
              p="md"
              radius="md"
              h={isMobile ? '70vh' : 'calc(100vh - 250px)'}
              display="flex"
              style={{ flexDirection: 'column' }}
            >
              <SegmentedControl
                fullWidth
                mb="md"
                value={teacherMode}
                onChange={(val) => {
                  if (val === 'teacher' || val === 'battle') {
                    setTeacherMode(val);
                  }
                }}
                data={[
                  { label: 'TEACHER', value: 'teacher' },
                  { label: 'BATTLE', value: 'battle' },
                ]}
                classNames={{
                  root: classes.modeSwitcher,
                  indicator:
                    teacherMode === 'teacher' ? classes.gradientCyan : classes.gradientOrange,
                }}
              />
              <ScrollArea flex={1} p="xs">
                {renderMessages(teacherMode)}
              </ScrollArea>
              <Box mt="md">
                <Group gap="xs">
                  <TextInput
                    flex={1}
                    placeholder={teacherMode === 'teacher' ? 'Ask something...' : 'Battle input...'}
                    disabled={!activeTopic}
                    value={getInput(teacherMode)}
                    onChange={(e) => setInput(teacherMode, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(teacherMode)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleSend(teacherMode)}
                    disabled={!activeTopic}
                  >
                    Send
                  </Button>
                </Group>
              </Box>
            </Paper>
          </Grid.Col>
        )}
      </Grid>
    </div>
  );
};
