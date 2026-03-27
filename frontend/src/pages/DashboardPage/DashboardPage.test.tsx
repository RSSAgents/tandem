import * as Utils from '@/utils/DashboardPage-utils';
import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DashboardPage } from './DashboardPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { name?: string; percent?: number }) => {
      if (key === 'welcome') return `Hello, ${options?.name}!`;
      if (key === 'progress_zero') return 'Your journey starts here. Choose your first module!';
      if (key === 'progress_finished') return "Path completed! You're a legend.";
      if (key === 'status.completed') return 'Finished';
      if (key === 'status.todo') return 'Start';
      return key;
    },
  }),
}));

describe('DashboardPage', () => {
  const renderDashboard = () => renderWithProviders(<DashboardPage />);

  it('should render correctly for a new user', () => {
    vi.spyOn(Utils, 'getCompletedIds').mockImplementation(() => []);
    vi.spyOn(Utils, 'getUserName').mockImplementation(() => 'Alex');

    renderDashboard();

    expect(screen.getByText(/Hello, Alex!/i)).toBeInTheDocument();
    expect(
      screen.getByText('Your journey starts here. Choose your first module!'),
    ).toBeInTheDocument();
    const startButtons = screen.getAllByText('Start');
    expect(startButtons).toHaveLength(3);
  });

  it('should render correctly when modules are completed', () => {
    vi.spyOn(Utils, 'getCompletedIds').mockImplementation(() => [
      'js-exec',
      'js_stack',
      'fill_blanks',
    ]);
    vi.spyOn(Utils, 'getUserName').mockImplementation(() => 'Alex');

    renderDashboard();

    expect(screen.getByText(/Hello, Alex!/i)).toBeInTheDocument();
    expect(screen.getByText("Path completed! You're a legend.")).toBeInTheDocument();

    const finishedButtons = screen.getAllByText('Finished');
    expect(finishedButtons).toHaveLength(3);
  });
});
