import { useState } from 'react';
import { Checkbox, Radio, Stack } from '@mantine/core';
import type { QuestionProps } from './types';
import styles from './Question.module.css';

export const Question = ({
  id,
  question,
  options,
  isMultiple = false,
  valueList,
  onChange,
  disabled = false,
}: QuestionProps) => {
  const [internalValue, setInternalValue] = useState<string[]>([]);

  const selected = valueList ?? internalValue;

  const updateValue = (newValue: string[]) => {
    if (valueList === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  const handleSelect = (optionId: string) => {
    if (isMultiple) {
      if (selected.includes(optionId)) {
        updateValue(selected.filter((id) => id !== optionId));
      } else {
        updateValue([...selected, optionId]);
      }
    } else {
      updateValue([optionId]);
    }
  };

  return (
    <fieldset className={styles.question}>
      <legend className={styles.legend}>{question}</legend>

      <Stack gap="sm">
        {isMultiple ? (
          options.map((option) => (
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
            value={selected[0] || ''}
            onChange={(value) => handleSelect(value)}
          >
            <Stack gap="sm">
              {options.map((option) => (
                <Radio key={option.id} value={option.id} label={option.label} disabled={disabled} />
              ))}
            </Stack>
          </Radio.Group>
        )}
      </Stack>
    </fieldset>
  );
};
