export type QuestionOption = {
  id: string;
  label: string;
};

export type QuestionItem = {
  id: string;
  question: string;
  options: QuestionOption[];
  isMultiple?: boolean;
};

export type QuestionProps = {
  id: string;
  question: string;
  options: QuestionOption[];
  isMultiple?: boolean;
  valueList?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
};

export type QuestionGroupProps = {
  questions: QuestionItem[];
  valueList?: Record<string, string[]>;
  onChange?: (value: Record<string, string[]>) => void;
};
