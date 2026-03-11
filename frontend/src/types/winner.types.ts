export interface Winner {
  rank: number;
  avatar: string;
  name: string;
  score: number;
  widgetsAmount: {
    completed: number;
    notCompleted: number;
  };
}
