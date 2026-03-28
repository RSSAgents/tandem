import { PageLoader } from '@/components/shared/PageLoader/PageLoader';
import { ErrorDisplay } from '@/components/shared/ErrorDisplay/ErrorDisplay';
import { CodeEditor } from '@/components/shared/CodeEditor/CodeEditor';
import { ResultDisplay } from '@/components/shared/ResultDisplay/ResultDisplay';
import { useWidgetFillBlanks } from '@/hooks/useWidgetFillBlanks';
import { Button, Container, Select, Stack, Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import { ScoreDisplayModal } from '../../../shared/ScoreDisplayModal/ScoreDisplayModal';
import classes from './WidgetFillBlanks.module.css';

const WidgetFillBlanks = () => {
  const {
    loading,
    error,
    currentTask,
    answers,
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

    correctAnswersCount,
    totalStatements,
    resetWidget,
  } = useWidgetFillBlanks();

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

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} />;
  if (!currentTask) return null;

  const getSelectStatus = (id: string) => {
    if (!showResult) return '';

    const key = `${currentTask.id}_${id}`;
    if (resultMap[key] === undefined) return '';

    return resultMap[key] ? 'correct' : 'incorrect';
  };

  const allCorrect = currentTask.payload.statements.every((s) => {
    const key = `${currentTask.id}_${s.id}`;
    return resultMap[key] === true;
  });

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

        <Button className={classes.button} disabled={!showResult} onClick={handleNextQuestion}>
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
        score={correctAnswersCount}
        total={totalStatements}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onTryAgain={() => {
          setModalOpened(false);
          resetWidget();
        }}
      />
    </Container>
  );
};

export default WidgetFillBlanks;
