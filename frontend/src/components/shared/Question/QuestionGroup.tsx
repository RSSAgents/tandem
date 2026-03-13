import { useState } from 'react';
import { Stack } from '@mantine/core';
import { Question } from './Question';
import type { QuestionGroupProps } from './types';
import { updateControlledState } from './utils';

export const QuestionGroup = ({ questions, valueList, onChange }: QuestionGroupProps) => {
  const [internalValue, setInternalValue] = useState<Record<string, string[]>>({});

  const answers = valueList ?? internalValue;

  const updateAnswer = (id: string, newValue: string[]) => {
    const updated = { ...answers, [id]: newValue };

    updateControlledState(valueList, setInternalValue, updated);

    onChange?.(updated);
  };

  return (
    <Stack gap="lg">
      {questions.map((q) => (
        <Question
          key={q.id}
          id={q.id}
          question={q.question}
          options={q.options}
          isMultiple={q.isMultiple}
          valueList={answers[q.id] ?? []}
          onChange={(val) => updateAnswer(q.id, val)}
        />
      ))}
    </Stack>
  );
};
