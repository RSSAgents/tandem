export interface IFillBlankStatement {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface IFillBlanksTask {
  id: string;
  type: 'fill-blanks';
  payload: {
    code: string;
    statements: IFillBlankStatement[];
  };
}
