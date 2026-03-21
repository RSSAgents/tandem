import { CodeEditor } from '@/components/shared/CodeEditor/CodeEditor';
import { useWidgetFillBlanks } from '@/hooks/useWidgetFillBlanks';
import { Button, Container, Select, Stack, Title } from '@mantine/core';
import styles from './WidgetFillBlanks.module.css';

export const WidgetFillBlanks = () => {
  const {
    loading,
    error,
    currentTask,
    answers,
    handleChange,
    handleCheckResult,
    handleNextQuestion,
    showResult,
    isAllAnswered,
  } = useWidgetFillBlanks();

  const getSelectStatus = (id: string, correctAnswer: string) => {
    if (!showResult) return '';

    return answers[id] === correctAnswer ? 'correct' : 'incorrect';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!currentTask) return null;

  return (
    <Container className={styles.container}>
      <Title order={2}>Fill in the blanks</Title>

      <div className={styles.editorWrapper}>
        <CodeEditor />
      </div>

      <Stack mt="lg">
        {currentTask.payload.statements.map((s) => {
          const parts = s.text.split('{{blank}}');

          return (
            <div key={s.id} className={styles.statement}>
              <span>{parts[0]}</span>

              <Select
                data={s.options}
                value={answers[s.id] || null}
                onChange={(val) => handleChange(s.id, val)}
                classNames={{
                  input: `${styles[getSelectStatus(s.id, s.correctAnswer)]}`,
                }}
                disabled={showResult}
              />

              <span>{parts[1] ?? ''}</span>
            </div>
          );
        })}
      </Stack>

      <div className={styles.actions}>
        <Button
          className={styles.button}
          disabled={!isAllAnswered || showResult}
          onClick={handleCheckResult}
        >
          Check result
        </Button>

        <Button className={styles.button} disabled={!showResult} onClick={handleNextQuestion}>
          Next
        </Button>
      </div>
    </Container>
  );
};
