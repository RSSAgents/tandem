export type QuestionId = string;
export type AnswerOptionId = string;
export type SelectedOptionIds = AnswerOptionId[];
export type AnswersByQuestionId = Record<QuestionId, SelectedOptionIds>;

export type AnswerOption = {
  id: AnswerOptionId;
  label: string;
};

export type QuestionData = {
  id: QuestionId;
  questionText: string;
  answerOptions: AnswerOption[];
  isMultiple?: boolean;
};

export type QuestionProps = {
  id: QuestionId;
  questionText: string;
  answerOptions: AnswerOption[];
  isMultiple?: boolean;
  selectedOptionIds?: SelectedOptionIds;
  onChange?: (selectedOptionIds: SelectedOptionIds) => void;
  disabled?: boolean;
};

export type QuestionGroupProps = {
  questions: QuestionData[];
  selectedOptionsByQuestionId?: AnswersByQuestionId;
  onChange?: (answersByQuestionId: AnswersByQuestionId) => void;
};
