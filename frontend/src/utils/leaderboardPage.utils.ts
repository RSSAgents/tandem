import { Winner } from '@/types/winner.types';

export const data: Winner[] = [
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Ivan Ivanov',
    score: 10,
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Marge',
    score: 20,
    widgetsAmount: { completed: 3, notCompleted: 2 },
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Liza',
    score: 30,
    widgetsAmount: { completed: 4, notCompleted: 1 },
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bart',
    score: 40,
    widgetsAmount: { completed: 5, notCompleted: 0 },
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Homer',
    score: 50,
    widgetsAmount: { completed: 2, notCompleted: 3 },
  },
];

export const getRankDisplay = (rank: number) => {
  if (rank === 1) return '🥇 1';
  if (rank === 2) return '🥈 2';
  if (rank === 3) return '🥉 3';
  return `#${rank}`;
};

export const sortedByScoreData = [...data].sort((a, b) => b.score - a.score);
