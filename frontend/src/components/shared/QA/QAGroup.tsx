import { useState } from 'react';
import { Stack } from '@mantine/core';
import { QA } from './QA';
import type { QAGroupProps } from './types';

export const QAGroup = ({ questions, value, onChange }: QAGroupProps) => {
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
        <QA
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
