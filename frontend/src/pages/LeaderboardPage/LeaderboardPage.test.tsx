import { it, expect, beforeAll, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-util';
import { LeaderboardPage } from './LeaderboardPage';

beforeAll(() => {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

vi.mock('@/hooks/useLeaderboard', () => ({
  useLeaderboard: () => ({
    leaders: [
      { username: 'User 1', total_score: 100, total_percent_ai: 10 },
      { username: 'User 2', total_score: 50, total_percent_ai: 5 },
    ],
    loading: false,
    error: null,
  }),
}));

it('displays user rows when data exists', () => {
  renderWithProviders(<LeaderboardPage />);

  const rows = document.querySelectorAll('tbody tr');
  expect(rows.length).toBe(2);
});

it('displays scores for each user', () => {
  renderWithProviders(<LeaderboardPage />);

  expect(screen.getByText('100')).toBeDefined();
  expect(screen.getByText('50')).toBeDefined();
});
