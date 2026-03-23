export interface IFillBlankStatement {
  id: string;
  text: { ru: string; en: string };
  options: { ru: string[]; en: string[] };
}

export interface IFillBlanksTask {
  id: string;
  type: 'fill-blanks';
  payload: {
    code: string;
    statements: IFillBlankStatement[];
  };
}
