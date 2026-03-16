import { describe, it, expect, beforeAll, vi } from 'vitest';
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

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('LeaderboardPage', () => {
  it('displays table headers', () => {
    renderWithProviders(<LeaderboardPage />);

    const headers = document.querySelectorAll('thead th');
    expect(headers.length).toBeGreaterThan(0);
  });

  it('displays all participants', () => {
    renderWithProviders(<LeaderboardPage />);

    expect(screen.getByText('Homer')).toBeDefined();
    expect(screen.getByText('Bart')).toBeDefined();
    expect(screen.getByText('Liza')).toBeDefined();
    expect(screen.getByText('Marge')).toBeDefined();
    expect(screen.getByText('Ivan Ivanov')).toBeDefined();
  });

  it('displays avatars for all participants', () => {
    renderWithProviders(<LeaderboardPage />);

    const avatars = document.querySelectorAll('img');
    expect(avatars.length).toBe(5);
  });

  it('displays Homer as first place', () => {
    renderWithProviders(<LeaderboardPage />);

    const homerElement = screen.getByText('Homer');
    const parentRow = homerElement.closest('tr');
    expect(parentRow?.textContent).toContain('50');
    expect(parentRow?.textContent).toContain('1');
  });

  it('displays Ivan Ivanov with 10 points', () => {
    renderWithProviders(<LeaderboardPage />);

    const ivanElement = screen.getByText('Ivan Ivanov');
    const parentRow = ivanElement.closest('tr');
    expect(parentRow?.textContent).toContain('10');
  });

  it('sorts participants by score in descending order', () => {
    renderWithProviders(<LeaderboardPage />);

    const rows = document.querySelectorAll('tbody tr');

    expect(rows[0]?.textContent).toContain('Homer');
    expect(rows[1]?.textContent).toContain('Bart');
    expect(rows[2]?.textContent).toContain('Liza');
    expect(rows[3]?.textContent).toContain('Marge');
    expect(rows[4]?.textContent).toContain('Ivan Ivanov');
  });
});
