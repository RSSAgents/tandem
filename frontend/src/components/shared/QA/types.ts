export type QAOption = {
  id: string;
  label: string;
};

export type QAQuestion = {
  id: string;
  question: string;
  options: QAOption[];
  multiple?: boolean;
};

export type QAProps = {
  id: string;
  question: string;
  options: QAOption[];
  multiple?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
};

export type QAGroupProps = {
  questions: QAQuestion[];
  value?: Record<string, string[]>;
  onChange?: (value: Record<string, string[]>) => void;
};
