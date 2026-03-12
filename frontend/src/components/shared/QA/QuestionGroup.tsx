import { useState } from 'react';
import { Stack } from '@mantine/core';
import { Question } from './Question';
import type { QuestionGroupProps } from './types';

export const QuestionGroup = ({ questions, value, onChange }: QuestionGroupProps) => {
  const [internalValue, setInternalValue] = useState<Record<string, string[]>>({});

  const answers = value ?? internalValue;

  const updateAnswer = (id: string, newValue: string[]) => {
    const updated = { ...answers, [id]: newValue };

    if (value === undefined) {
      setInternalValue(updated);
    }

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
          multiple={q.multiple}
          value={answers[q.id] ?? []}
          onChange={(val) => updateAnswer(q.id, val)}
        />
      ))}
    </Stack>
  );
};
