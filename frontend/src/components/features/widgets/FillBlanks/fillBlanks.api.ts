import { IFillBlanksTask } from '@/types/fillBlanks.types';
import { delay } from '@/utils/delay';
import { MOCK_FILL_BLANKS } from './fillBlanks.mock';

export const getFillBlanksTasks = async (options?: RequestInit): Promise<IFillBlanksTask[]> => {
  await delay(300);

  if (options?.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  return MOCK_FILL_BLANKS;
};
