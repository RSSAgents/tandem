import { CodeEditor } from '@/components/shared/CodeEditor/CodeEditor';
import { useWidgetFillBlanks } from '@/hooks/useWidgetFillBlanks';
import { Button, Container, Select, Stack, Title } from '@mantine/core';
import classes from './WidgetFillBlanks.module.css';
import { ResultDisplay } from '@/components/shared/ResultDisplay/ResultDisplay';

export const WidgetFillBlanks = () => {
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
    currentIndex,
    tasks,
  } = useWidgetFillBlanks();

  const getSelectStatus = (id: string, correctAnswer: string) => {
    if (!showResult) return '';

    return answers[id] === correctAnswer ? 'correct' : 'incorrect';
  };

  const allCorrect =
    currentTask?.payload.statements.every((s) => answers[s.id] === s.correctAnswer) ?? false;

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
          const parts = s.text.split('{{blank}}');

          return (
            <div key={s.id} className={classes.statement}>
              <span className={classes.index}>{index + 1}.</span>
              <span>{parts[0]}</span>

              <Select
                data={s.options}
                value={answers[s.id] || null}
                onChange={(val) => handleChange(s.id, val)}
                classNames={{
                  input: `${classes[getSelectStatus(s.id, s.correctAnswer)]}`,
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
          disabled={!isAllAnswered || showResult}
          onClick={handleCheckResult}
        >
          Check result
        </Button>

        <Button className={classes.button} onClick={handleNextQuestion}>
          Next
        </Button>

        <Button
          className={classes.button}
          disabled={currentIndex === 0}
          onClick={handlePreviousQuestion}
        >
          Previous
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
    </Container>
  );
};
