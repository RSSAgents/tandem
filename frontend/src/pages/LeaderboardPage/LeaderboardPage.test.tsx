import { describe, it, expect } from 'vitest';
import { data, getRankDisplay, sortedByScoreData } from '@/utils/leaderboardPage.utils';

describe('getRankDisplay', () => {
  it('returns 🥇 1 for rank 1', () => {
    expect(getRankDisplay(1)).toBe('🥇 1');
  });

  it('returns 🥈 2 for rank 2', () => {
    expect(getRankDisplay(2)).toBe('🥈 2');
  });

  it('returns 🥉 3 for rank 3', () => {
    expect(getRankDisplay(3)).toBe('🥉 3');
  });

  it('returns #4 for rank 4', () => {
    expect(getRankDisplay(4)).toBe('#4');
  });

  it('returns #10 for rank 10', () => {
    expect(getRankDisplay(10)).toBe('#10');
  });
});

describe('data', () => {
  it('has correct structure', () => {
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('score');
    expect(data[0]).toHaveProperty('widgetsAmount');
    expect(data[0].widgetsAmount).toHaveProperty('completed');
    expect(data[0].widgetsAmount).toHaveProperty('notCompleted');
  });
});

describe('data', () => {
  it('has correct data types', () => {
    expect(typeof data[0].name).toBe('string');
    expect(typeof data[0].score).toBe('number');
    expect(typeof data[0].widgetsAmount.completed).toBe('number');
    expect(typeof data[0].widgetsAmount.notCompleted).toBe('number');
  });

  it('all items have avatar', () => {
    data.forEach((item) => {
      expect(item.avatar).toBeDefined();
      expect(typeof item.avatar).toBe('string');
      expect(item.avatar.length).toBeGreaterThan(0);
    });
  });

  it('scores are between 1 and 1000', () => {
    data.forEach((item) => {
      expect(item.score).toBeGreaterThanOrEqual(1);
      expect(item.score).toBeLessThanOrEqual(1000);
    });
  });
});

it('is sorted by score in descending order', () => {
  const sorted = sortedByScoreData;
  for (let i = 0; i < sorted.length - 1; i++) {
    expect(sorted[i].score).toBeGreaterThanOrEqual(sorted[i + 1].score);
  }
});
