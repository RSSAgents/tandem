import { Stack } from '@mantine/core';
import { Question } from './Question';
import type { QuestionGroupProps } from './types';
import { useControlledValue } from './useControlledValue';

export const QuestionGroup = ({
  questions,
  selectedOptionsByQuestionId,
  onChange,
}: QuestionGroupProps) => {
  const [answers, updateAnswers] = useControlledValue<Record<string, string[]>>(
    selectedOptionsByQuestionId,
    onChange,
    {},
  );

  const updateAnswer = (id: string, newValue: string[]) => {
    updateAnswers({
      ...answers,
      [id]: newValue,
    });
  };

  return (
    <Stack gap="lg">
      {questions.map((q) => (
        <Question
          key={q.id}
          id={q.id}
          questionText={q.questionText}
          answerOptions={q.answerOptions}
          isMultiple={q.isMultiple}
          selectedOptionIds={answers[q.id] ?? []}
          onChange={(val) => updateAnswer(q.id, val)}
        />
      ))}
    </Stack>
  );
};
