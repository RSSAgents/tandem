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
  TextInput
} from '@mantine/core';
import {
  IconAlarm,
  IconBulb,
  IconFileDownload,
  IconMicrophone,
  IconTerminal2
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from './AiAgentPage.module.css';

export const AiAgentPage = () => {
  const [role, setRole] = useState('strict');
  const [teacherMode, setTeacherMode] = useState('teacher');
  const [stressMode, setStressMode] = useState(false);
  const [audioMode, setAudioMode] = useState(false);

  const historyData = [
    { title: 'Closures & Scope', type: 'I' },
    { title: 'React Hooks', type: 'T' },
    { title: 'Async JS', type: 'I' },
    { title: 'Event Loop', type: 'T' }
  ];

  return (
    <Stack gap="md" className={classes.mainContent}>
      <Paper className={classes.glassPanel} p="md" radius="md">
        <Group justify="space-between">
          <Group gap="xl">
            <Select
              label="Select Topic"
              placeholder="JavaScript Basics"
              data={['JavaScript Basics', 'React Hooks', 'Async JS']}
              variant="filled"
              className={classes.neonInput}
            />
            <Stack gap={4}>
              <Text size="xs" fw={500} c="dimmed">Choose Role</Text>
              <SegmentedControl
                value={role}
                onChange={setRole}
                data={[
                  { label: 'STRICT MENTOR', value: 'strict' },
                  { label: 'GENTLE COACH', value: 'gentle' },
                ]}
                classNames={{
                  root: classes.roleSwitcher,
                  indicator: role === 'strict' ? classes.strictActive : classes.gentleActive
                }}
              />
            </Stack>
          </Group>

          <Group align="flex-end">
            <Button
              variant="light"
              color="indigo"
              leftSection={<IconTerminal2 size={18} />}
              radius="md"
            >
              CODE RUNNER
            </Button>
          </Group>
        </Group>
      </Paper>

      <Grid grow gutter="md" className={classes.gridContainer} styles={{ inner: { height: '100%', margin: 0 } }}>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Stack h="100%">
            <Paper className={classes.glassPanel} p="md" radius="md">
              <Stack align="center" gap="xs">
                <Text fw={700} size="sm">Skill Map</Text>
                <RingProgress
                  size={160}
                  thickness={14}
                  roundCaps
                  sections={[
                    { value: 40, color: 'cyan' },
                    { value: 25, color: 'pink' },
                    { value: 15, color: 'grape' },
                  ]}
                  label={<Text ta="center" fw={700} size="xl" c="white">75%</Text>}
                />
              </Stack>
            </Paper>

            <Paper className={classes.glassPanel} p="md" radius="md" flex={1} style={{ display: 'flex', flexDirection: 'column' }}>
              <Text fw={700} size="xs" c="dimmed" mb="md" tt="uppercase">Interview History</Text>
              <ScrollArea flex={1}>
                <Stack gap="xs">
                  {historyData.map((item, index) => (
                    <Button
                      key={index}
                      variant="light"
                      justify="space-between"
                      fullWidth
                      rightSection={
                        <Center className={item.type === 'I' ? classes.historyIconI : classes.historyIconT}>
                          {item.type}
                        </Center>
                      }
                    >
                      <Text size="sm" truncate>{item.title}</Text>
                    </Button>
                  ))}
                </Stack>
              </ScrollArea>
              <Button fullWidth variant="filled" mt="md" radius="md">New Interview</Button>
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4.5 }}>
          <Paper className={`${classes.glassPanel} ${classes.borderStrict}`} p="md" radius="md" h="100%" display="flex" style={{ flexDirection: 'column' }}>
            <Group justify="space-between" mb="md">
              <Badge variant="outline" color="pink" size="lg">INTERVIEWER</Badge>
              <Group gap="xs">
                <Switch
                  size="xs"
                  color="red"
                  label="Stress"
                  checked={stressMode}
                  onChange={(event) => setStressMode(event.currentTarget.checked)}
                  thumbIcon={stressMode ? <IconAlarm size={10} color="red" /> : undefined}
                />
                <Button size="compact-xs" variant="light" color="yellow" leftSection={<IconBulb size={14}/>}>HINT (2/3)</Button>
                <ActionIcon
                  variant={audioMode ? "filled" : "light"}
                  color="red"
                  onClick={() => setAudioMode(!audioMode)}
                >
                  <IconMicrophone size={18} />
                </ActionIcon>
              </Group>
            </Group>

            <ScrollArea flex={1} offsetScrollbars p="xs">
              <Stack gap="md">
                <Box className={classes.messageAi}>
                  <Text size="sm">Excellent work. We have completed the Closures topic. You've demonstrated solid understanding!</Text>
                </Box>

                <Box className={classes.reportBox}>
                  <Stack gap="xs">
                    <Text fw={700} size="sm" c="pink">Final Report: JavaScript Basics</Text>
                    <Text size="xs">
                      Status: <Text component="span" fw={700} c="green">PASSED</Text> |
                      Accuracy: 82%
                    </Text>
                    <Text size="xs" c="dimmed">Detailed breakdown of your strengths and areas for improvement is ready.</Text>
                    <Button
                      variant="outline"
                      color="pink"
                      size="xs"
                      fullWidth
                      leftSection={<IconFileDownload size={14} />}
                    >
                      Download PDF Report
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </ScrollArea>

            <Group mt="md" gap="xs">
              <TextInput flex={1} placeholder="Type your answer..." radius="md" classNames={{ input: classes.chatInput }} />
              <Button radius="md" px="xl">SEND</Button>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4.5 }}>
          <Paper className={`${classes.glassPanel} ${classes.borderGentle}`} p="md" radius="md" h="100%" display="flex" style={{ flexDirection: 'column' }}>
            <Group justify="stretch" mb="md">
              <SegmentedControl
                fullWidth
                value={teacherMode}
                onChange={setTeacherMode}
                data={[
                  {
                    label: (
                      <Group gap="xs" justify="center">
                        <Text size="sm" fw={600}>TEACHER</Text>
                      </Group>
                    ),
                    value: 'teacher'
                  },
                  {
                    label: (
                      <Group gap="xs" justify="center">
                        <Text size="sm" fw={600}>AI BATTLE</Text>
                      </Group>
                    ),
                    value: 'battle'
                  },
                ]}
                classNames={{
                  root: classes.modeSwitcher,
                  indicator: teacherMode === 'teacher' ? classes.teacherActive : classes.battleActive,
                  label: classes.modeLabel
                }}
              />
            </Group>

            <ScrollArea flex={1} offsetScrollbars p="xs">
                <Box className={classes.messageUser}>
                <Text size="sm">Could you explain why microtasks take priority over macrotasks in the Event Loop?</Text>
              </Box>
            </ScrollArea>

            <Group mt="md" gap="xs">
              <TextInput flex={1} placeholder="Ask anything..." radius="md" classNames={{ input: classes.chatInput }} />
              <Button radius="md" px="xl" variant="outline">SEND</Button>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
