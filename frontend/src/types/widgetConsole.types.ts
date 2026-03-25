export interface IConsoleTaskPayload {
  code: string;
  options: string[];
  explanation?: { ru: string; en: string };
}

export interface IConsoleTask {
  id: string;
  type: 'console' | 'console-order';
  topic?: string;
  difficulty?: number;
  tags?: string[];
  version?: number;
  payload: IConsoleTaskPayload;
}

export interface IConsoleAnswer {
  taskId: string;
  userSequence: string[];
  timestamp: number;
}
