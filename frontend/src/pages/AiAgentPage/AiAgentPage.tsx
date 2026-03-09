import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Paper,
  RingProgress,
  ScrollArea,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { IconBulb, IconMicrophone, IconRefresh, IconTerminal2 } from '@tabler/icons-react';
import { KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../../store';
import {
  addUserMessage,
  fetchAiResponse,
  resetBattle,
  setActiveTopic,
} from '../../store/AiAgentSlice';
import classes from './AiAgentPage.module.css';

export const AiAgentPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [role, setRole] = useState('strict');
  const [teacherMode, setTeacherMode] = useState<'teacher' | 'battle'>('teacher');
  const [stressMode, setStressMode] = useState(false);
  const [audioMode, setAudioMode] = useState(false);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  const { threads, activeTopic } = useSelector((state: RootState) => state.interview);

  const historyThreads = threads
    .filter((t) => t.type !== 'battle' && t.messages.length > 0)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const interviewThread = threads.find((t) => t.topic === activeTopic && t.type === 'interviewer');
  const secondaryThread = threads.find((t) => t.topic === activeTopic && t.type === teacherMode);

  const handleSend = (type: 'interviewer' | 'teacher' | 'battle') => {
    if (!activeTopic) return;

    const inputKey = `${activeTopic}-${type}`;
    const text = inputs[inputKey] || '';

    if (!text.trim()) return;

    dispatch(addUserMessage({ topic: activeTopic, type, text }));

    setTimeout(() => {
      const currentState = store.getState() as RootState;
      const updatedThread = currentState.interview.threads.find(
        (t) => t.topic === activeTopic && t.type === type,
      );
      if (updatedThread) {
        dispatch(fetchAiResponse({ threadId: updatedThread.id, text }));
      }
    }, 0);

    setInputs((prev) => ({ ...prev, [inputKey]: '' }));
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    type: 'interviewer' | 'teacher' | 'battle',
  ) => {
    if (e.key === 'Enter') handleSend(type);
  };

  return (
    <Stack gap="md" className={classes.mainContent}>
      <Paper className={classes.glassPanel} p="md" radius="md">
        <Group justify="space-between">
          <Group gap="xl">
            <Select
              label="Select Topic"
              placeholder="Pick a topic"
              data={['JavaScript Basics', 'React Hooks', 'Async JS', 'Event Loop']}
              value={activeTopic}
              onChange={(val) => val && dispatch(setActiveTopic(val))}
              variant="filled"
              className={classes.neonInput}
            />
            <Stack gap={4}>
              <Text size="xs" fw={500} c="dimmed">
                Choose Role
              </Text>
              <SegmentedControl
                value={role}
                onChange={setRole}
                data={[
                  { label: 'STRICT MENTOR', value: 'strict' },
                  { label: 'GENTLE COACH', value: 'gentle' },
                ]}
                classNames={{
                  root: classes.roleSwitcher,
                  indicator: role === 'strict' ? classes.strictActive : classes.gentleActive,
                }}
              />
            </Stack>
          </Group>
          <Button
            variant="light"
            color="indigo"
            leftSection={<IconTerminal2 size={18} />}
            radius="md"
          >
            CODE RUNNER
          </Button>
        </Group>
      </Paper>

      <Grid
        grow
        gutter="md"
        className={classes.gridContainer}
        styles={{ inner: { height: '100%', margin: 0 } }}
      >
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Stack h="100%">
            <Paper className={classes.glassPanel} p="md" radius="md">
              <Stack align="center" gap="xs">
                <Text fw={700} size="sm">
                  Skill Map
                </Text>
                <RingProgress
                  size={160}
                  thickness={14}
                  roundCaps
                  sections={[
                    { value: 40, color: 'cyan' },
                    { value: 25, color: 'pink' },
                    { value: 15, color: 'grape' },
                  ]}
                  label={
                    <Text ta="center" fw={700} size="xl" c="white">
                      75%
                    </Text>
                  }
                />
              </Stack>
            </Paper>

            <Paper
              className={classes.glassPanel}
              p="md"
              radius="md"
              flex={1}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Text fw={700} size="xs" c="dimmed" mb="md" tt="uppercase">
                Interview History
              </Text>
              <ScrollArea flex={1}>
                <Stack gap="xs">
                  {historyThreads.map((t) => (
                    <Button
                      key={t.id}
                      variant={activeTopic === t.topic ? 'filled' : 'light'}
                      justify="space-between"
                      fullWidth
                      onClick={() => dispatch(setActiveTopic(t.topic))}
                      rightSection={
                        <Center
                          className={
                            t.type === 'interviewer' ? classes.historyIconI : classes.historyIconT
                          }
                        >
                          {t.type === 'interviewer' ? 'I' : 'T'}
                        </Center>
                      }
                    >
                      <Text size="sm" truncate>
                        {t.topic}
                      </Text>
                    </Button>
                  ))}
                </Stack>
              </ScrollArea>
              <Button
                fullWidth
                variant="filled"
                mt="md"
                radius="md"
                onClick={() => dispatch(setActiveTopic(`Topic ${threads.length / 3 + 1}`))}
              >
                New Interview
              </Button>
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4.5 }}>
          <Paper
            className={`${classes.glassPanel} ${classes.borderStrict}`}
            p="md"
            radius="md"
            h="100%"
            display="flex"
            style={{ flexDirection: 'column' }}
          >
            <Group justify="space-between" mb="md">
              <Badge variant="outline" color="pink" size="lg">
                INTERVIEWER
              </Badge>
              <Group gap="xs">
                <Switch
                  size="xs"
                  color="red"
                  label="Stress"
                  checked={stressMode}
                  onChange={(e) => setStressMode(e.currentTarget.checked)}
                />
                <Button
                  size="compact-xs"
                  variant="light"
                  color="yellow"
                  leftSection={<IconBulb size={14} />}
                >
                  HINT (2/3)
                </Button>
                <ActionIcon
                  variant={audioMode ? 'filled' : 'light'}
                  color="red"
                  onClick={() => setAudioMode(!audioMode)}
                >
                  <IconMicrophone size={18} />
                </ActionIcon>
              </Group>
            </Group>

            <ScrollArea flex={1} offsetScrollbars p="xs">
              <Stack gap="md">
                {interviewThread?.messages.map((msg) => (
                  <Box
                    key={msg.id}
                    className={msg.sender === 'ai' ? classes.messageAi : classes.messageUser}
                  >
                    <Text size="sm">{msg.text}</Text>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>

            <Group mt="md" gap="xs">
              <TextInput
                flex={1}
                placeholder="Type your answer..."
                value={inputs[`${activeTopic}-interviewer`] || ''}
                onChange={(e) =>
                  setInputs({ ...inputs, [`${activeTopic}-interviewer`]: e.target.value })
                }
                onKeyDown={(e) => handleKeyDown(e, 'interviewer')}
              />
              <Button variant="outline" onClick={() => handleSend('interviewer')}>
                Send
              </Button>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4.5 }}>
          <Paper
            className={`${classes.glassPanel} ${classes.borderGentle}`}
            p="md"
            radius="md"
            h="100%"
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
                { label: 'AI BATTLE', value: 'battle' },
              ]}
              classNames={{
                root: classes.modeSwitcher,
                indicator: teacherMode === 'teacher' ? classes.teacherActive : classes.battleActive,
              }}
            />

            <ScrollArea flex={1} offsetScrollbars p="xs">
              <Stack gap="md">
                {secondaryThread?.messages.map((msg) => (
                  <Box
                    key={msg.id}
                    className={msg.sender === 'ai' ? classes.messageAi : classes.messageUser}
                    style={teacherMode === 'battle' ? { borderLeftColor: '#f08c00' } : {}}
                  >
                    <Text size="sm">{msg.text}</Text>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>

            {teacherMode === 'battle' && (
              <Button
                variant="subtle"
                color="orange"
                size="xs"
                leftSection={<IconRefresh size={14} />}
                onClick={() => activeTopic && dispatch(resetBattle(activeTopic))}
              >
                Reset Battle
              </Button>
            )}

            <Group mt="md" gap="xs">
              <TextInput
                flex={1}
                placeholder={teacherMode === 'teacher' ? 'Ask teacher...' : 'Battle input...'}
                value={inputs[`${activeTopic}-${teacherMode}`] || ''}
                onChange={(e) =>
                  setInputs({ ...inputs, [`${activeTopic}-${teacherMode}`]: e.target.value })
                }
                onKeyDown={(e) => handleKeyDown(e, teacherMode)}
              />
              <Button variant="outline" onClick={() => handleSend(teacherMode)}>
                Send
              </Button>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
