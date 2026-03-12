export function updateControlledState<T>(
  externalValue: T | undefined,
  setState: (value: T) => void,
  newValue: T
) {
  if (externalValue === undefined) {
    setState(newValue);
  }
}