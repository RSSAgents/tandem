export interface Winner {
  avatar: string;
  name: string;
  score: number;
  widgetsAmount: {
    completed: number;
    notCompleted: number;
  };
}
