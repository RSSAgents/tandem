export const ANIMATION_DELAY = 600;
export const PAUSE_DELAY = 1000;
export const FEEDBACK_DELAY = 1500;
export const ITEMS_COUNT = 5;

export const QUIZ_QUESTIONS = {
  lifo: {
    question: 'What is LIFO?',
    correctAnswer: 'Last In, First Out - the last element added is the first to be removed',
    wrongAnswer: 'Linear Input, Final Output - elements are processed in linear order',
  },
  fifo: {
    question: 'What is FIFO?',
    correctAnswer: 'First In, First Out - the first element added is the first to be removed',
    wrongAnswer: 'Fast Input, Fast Output - elements are processed at high speed',
  },
} as const;

export const FEEDBACK_MESSAGES = {
  correct: 'Correct! Watch the animation...',
  incorrect: 'Incorrect. Try again!',
  completed: `Great job! You've completed the Stack!`,
} as const;

export const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: -50, scale: 0.5 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.5,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
} as const;

export const QUEUE_ANIMATION_CONFIG = {
  initial: { opacity: 0, x: 100, scale: 0.5 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.5,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
} as const;
