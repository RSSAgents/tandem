export interface IConsoleTaskPayload {
  code: string;
  options: string[];
}

export interface IConsoleTask {
  id: string;
  type: 'console-order';
  topic: string;
  difficulty: number;
  tags: string[];
  version: number;
  payload: IConsoleTaskPayload;
}

export interface IConsoleAnswer {
  taskId: string;
  userSequence: string[];
  timestamp: number;
}
