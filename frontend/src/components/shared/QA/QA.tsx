import { useState } from 'react';
import { Checkbox, Radio, Stack } from '@mantine/core';
import type { QAProps } from './types';
import styles from './QA.module.css';

export const QA = ({
  id,
  question,
  options,
  multiple = false,
  value,
  onChange,
  disabled = false,
}: QAProps) => {
  const [internalValue, setInternalValue] = useState<string[]>([]);

  const selected = value ?? internalValue;

  const updateValue = (newValue: string[]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  const handleSelect = (optionId: string) => {
    if (multiple) {
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
        {multiple ? (
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
          <Radio.Group value={selected[0] || ''} onChange={(value) => handleSelect(value)}>
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
