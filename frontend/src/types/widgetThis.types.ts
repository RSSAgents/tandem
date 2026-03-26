export interface IThisTask {
  id: string;
  payload: {
    code: string;
    options: string[];
    explanation: {
      en: string;
      ru: string;
      [key: string]: string;
    };
  };
}
