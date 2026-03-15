import * as Utils from '@/utils/DashboardPage-utils';
import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DashboardPage } from './DashboardPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { name?: string }) =>
      key === 'welcome' ? `Welcome, ${options?.name}` : key,
  }),
}));

describe('DashboardPage', () => {
  const renderDashboard = () => renderWithProviders(<DashboardPage />);

  it('should render correctly for a new user', () => {
    vi.spyOn(Utils, 'getCompletedIds').mockReturnValue([]);
    vi.spyOn(Utils, 'getUserName').mockReturnValue('Alex');

    renderDashboard();

    expect(screen.getByText(/Welcome, Alex/i)).toBeInTheDocument();
    expect(screen.getByText('progress_zero')).toBeInTheDocument();
    expect(screen.getByText('status.todo')).toBeInTheDocument();
  });

  it('should render correctly when modules are completed', () => {
    vi.spyOn(Utils, 'getCompletedIds').mockReturnValue(['js-exec']);

    renderDashboard();

    expect(screen.getByText('progress_finished')).toBeInTheDocument();
    expect(screen.getByText('status.completed')).toBeInTheDocument();
  });
});
