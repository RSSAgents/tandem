import { useState, useCallback } from 'react';

export function useControlledValue<T>(
  externalValue: T | undefined,
  onChange: ((value: T) => void) | undefined,
  defaultValue: T,
) {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  const value = externalValue !== undefined ? externalValue : internalValue;

  const updateValue = useCallback(
    (newValue: T) => {
      if (externalValue === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [externalValue, onChange],
  );

  return [value, updateValue] as const;
}
