export type QuestionOption = {
  id: string;
  label: string;
};

export type QuestionItem = {
  id: string;
  question: string;
  options: QuestionOption[];
  multiple?: boolean;
};

export type QuestionProps = {
  id: string;
  question: string;
  options: QuestionOption[];
  multiple?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
};

export type QuestionGroupProps = {
  questions: QuestionItem[];
  value?: Record<string, string[]>;
  onChange?: (value: Record<string, string[]>) => void;
};
