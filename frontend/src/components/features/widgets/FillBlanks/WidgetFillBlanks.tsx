import { CodeEditor } from '@/components/shared/CodeEditor/CodeEditor';
import { ResultDisplay } from '@/components/shared/ResultDisplay/ResultDisplay';
import { useWidgetFillBlanks } from '@/hooks/useWidgetFillBlanks';
import { Button, Container, Select, Stack, Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import { ScoreDisplayModal } from '../../../shared/ScoreDisplayModal/ScoreDisplayModal';
import classes from './WidgetFillBlanks.module.css';

export const WidgetFillBlanks = () => {
  const {
    loading,
    error,
    currentTask,
    answers,
    score,
    handleChange,
    handleCheckResult,
    handleNextQuestion,
    handlePreviousQuestion,
    showResult,
    isAllAnswered,
    isLastQuestion,
    currentIndex,
    tasks,
    resultMap,
  } = useWidgetFillBlanks();

  const getSelectStatus = (id: string) => {
    if (!showResult) return '';
    if (resultMap[id] === undefined) return '';

    return resultMap[id] ? 'correct' : 'incorrect';
  };

  const allCorrect =
    currentTask?.payload.statements.every((s) => resultMap[s.id] === true) ?? false;
  const [modalOpened, setModalOpened] = useState(false);

  const onCheckClick = useCallback(async () => {
    await handleCheckResult();

    if (isLastQuestion) {
      setTimeout(async () => {
        await handleNextQuestion();
        setModalOpened(true);
      }, 500);
    }
  }, [handleCheckResult, handleNextQuestion, isLastQuestion]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!currentTask) return null;

  return (
    <Container className={classes.container}>
      <Title order={2}>Fill in the blanks</Title>
      <div className={classes.counter}>
        Question {currentIndex + 1} of {tasks.length}
      </div>

      <div className={classes.editorWrapper}>
        <CodeEditor />
      </div>

      <Stack mt="lg">
        {currentTask.payload.statements.map((s, index) => {
          const text = s.text.ru;
          const parts = text.split('{{blank}}');

          return (
            <div key={s.id} className={classes.statement}>
              <span className={classes.index}>{index + 1}.</span>
              <span>{parts[0]}</span>

              <Select
                data={s.options.ru.map((opt, index) => ({
                  value: String(index),
                  label: opt,
                }))}
                value={
                  answers[currentTask.id]?.[s.id] !== undefined
                    ? String(answers[currentTask.id][s.id])
                    : null
                }
                onChange={(val) => handleChange(s.id, val)}
                classNames={{
                  input: classes[getSelectStatus(s.id)],
                }}
                disabled={showResult}
              />

              <span>{parts[1] ?? ''}</span>
            </div>
          );
        })}
      </Stack>

      <div className={classes.actions}>
        <Button
          className={classes.button}
          disabled={currentIndex === 0}
          onClick={handlePreviousQuestion}
        >
          Previous
        </Button>

        <Button
          className={classes.button}
          disabled={!isAllAnswered || showResult}
          onClick={onCheckClick}
        >
          Check result
        </Button>

        <Button
          className={classes.button}
          disabled={showResult || isLastQuestion}
          onClick={handleNextQuestion}
        >
          Next
        </Button>
      </div>

      {showResult && (
        <ResultDisplay
          isCorrect={allCorrect}
          explanation={
            allCorrect ? 'Great job!' : 'Some answers are incorrect. Check highlighted answers.'
          }
        />
      )}

      <ScoreDisplayModal
        score={score}
        total={tasks.length}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onTryAgain={() => {
          setModalOpened(false);
          window.location.reload();
        }}
      />
    </Container>
  );
};

export default WidgetFillBlanks;
