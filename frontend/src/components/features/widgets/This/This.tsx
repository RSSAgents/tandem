import { Alert, Box, Button, Center, Group, Loader, Paper, rem, Stack, Text } from '@mantine/core';
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { CodeEditor } from '@/components/shared/CodeEditor/CodeEditor';
import { setCodeEditor } from '@/components/shared/CodeEditor/slice/editorSlice';
import { useWidgetThis } from '@/hooks/useWidgetThis';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import classes from './This.module.css';

export default function WidgetThis() {
  const { t } = useTranslation(['dashboard', 'shared']);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    tasks,
    loading,
    error,
    currentTask,
    currentIndex,
    isCorrect,
    explanation,
    handleAnswer,
    handleNext,
    saveResult,
  } = useWidgetThis();

  const [selected, setSelected] = useState<string | null>(null);
  const isAnswered = isCorrect !== null;
  const isLastStep = tasks.length > 0 && currentIndex === tasks.length - 1;

  useEffect(() => {
    if (currentTask?.payload?.code) {
      dispatch(setCodeEditor(currentTask.payload.code));
    }
  }, [currentTask?.id, currentTask?.payload?.code, dispatch]);

  const onActionClick = useCallback(async () => {
    if (!isAnswered) {
      if (selected) await handleAnswer(selected);
    } else {
      if (isLastStep) {
        await saveResult();
        navigate('/dashboard');
      } else {
        setSelected(null);
        handleNext();
      }
    }
  }, [isAnswered, selected, isLastStep, handleAnswer, handleNext, saveResult, navigate]);

  if (loading && tasks.length === 0) {
    return (
      <Center h={400}>
        <Loader variant="dots" color="brand" size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle />} title="Error" color="red" variant="filled">
        {error}
      </Alert>
    );
  }

  if (!currentTask) return null;

  return (
    <Paper className={classes.wrapper} p="xl" radius="xl" withBorder shadow="xl">
      <Stack gap="md" className={classes.contentStack}>
        <Group className={classes.header}>
          <Stack gap={0}>
            <Text size="xl" fw={900} tt="uppercase" lts={1.8}>
              "this"
            </Text>
            <Text size="xs" c="dimmed" fw={700}>
              {currentIndex + 1} / {tasks.length}
            </Text>
          </Stack>
        </Group>

        <Box className={classes.editorContainer}>
          {currentTask?.payload?.code && <CodeEditor key={currentTask.id} />}
        </Box>

        <Stack gap="xs" className={classes.optionsStack}>
          {currentTask?.payload?.options?.map((opt) => {
            const isSelected = selected === opt;
            const status = !isAnswered || !isSelected ? undefined : isCorrect ? 'correct' : 'wrong';

            return (
              <Button
                key={`${currentTask.id}-${opt}`}
                className={classes.optionButton}
                data-selected={isSelected}
                data-result={status}
                variant="unstyled"
                onClick={() => !isAnswered && setSelected(opt)}
                disabled={isAnswered && !isSelected}
                fullWidth
                size="md"
                leftSection={
                  isAnswered &&
                  isSelected &&
                  (isCorrect ? <IconCheck size={rem(18)} /> : <IconX size={rem(18)} />)
                }
              >
                {opt}
              </Button>
            );
          })}
        </Stack>

        <Box className={classes.footerArea}>
          <Box className={`${classes.explanation} ${isAnswered ? classes.explanationActive : ''}`}>
            <Text fw={800} size="xs" c="brand" mb={4} tt="uppercase">
              {t('widgets.this_quiz.explanation')}
            </Text>
            <Box className={classes.explanationScrollArea}>
              <Text size="sm" lh="md">
                {explanation}
              </Text>
            </Box>
          </Box>

          <Button
            className={classes.mainAction}
            size="lg"
            fullWidth
            radius="lg"
            onClick={onActionClick}
            disabled={!selected && !isAnswered}
            color="brand"
            variant={isAnswered ? 'light' : 'filled'}
          >
            {!isAnswered
              ? t('widgets.this_quiz.verify')
              : isLastStep
                ? t('widgets.this_quiz.finish')
                : t('shared:continue')}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
