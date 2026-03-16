import { useCallback } from 'react';
import { Checkbox, Radio, Stack } from '@mantine/core';
import type { QuestionProps } from './types';
import styles from './Question.module.css';
import { useControlledValue } from './useControlledValue';

export const Question = ({
  id,
  questionText,
  answerOptions,
  isMultiple = false,
  selectedOptionIds,
  onChange,
  disabled = false,
}: QuestionProps) => {
  const [selected = [], updateValue] = useControlledValue<string[]>(
    selectedOptionIds,
    onChange,
    [],
  );

  const handleSelect = useCallback(
    (optionId: string) => {
      if (isMultiple) {
        updateValue(
          selected.includes(optionId)
            ? selected.filter((id) => id !== optionId)
            : [...selected, optionId],
        );
      } else {
        updateValue([optionId]);
      }
    },
    [isMultiple, selected, updateValue],
  );

  return (
    <fieldset className={styles.question}>
      <legend className={styles.legend}>{questionText}</legend>

      <Stack gap="sm">
        {isMultiple ? (
          answerOptions.map((option) => (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={selected.includes(option.id)}
              disabled={disabled}
              onChange={() => handleSelect(option.id)}
            />
          ))
        ) : (
          <Radio.Group
            name={id}
            value={selected[0] ?? ''}
            onChange={(value) => handleSelect(value)}
          >
            <Stack gap="sm">
              {answerOptions.map((option) => (
                <Radio key={option.id} value={option.id} label={option.label} disabled={disabled} />
              ))}
            </Stack>
          </Radio.Group>
        )}
      </Stack>
    </fieldset>
  );
};
