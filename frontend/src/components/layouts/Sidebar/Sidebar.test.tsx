import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Sidebar } from './Sidebar';

interface TranslationOptions {
  current?: number;
  total?: number;
}

vi.mock('./SidebarNavigation', () => ({
  SidebarNavigation: () => <nav data-testid="sidebar-nav" />,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: TranslationOptions) => {
      if (key === 'shared:progress' && options) {
        return `${options.current}/${options.total}`;
      }
      return key;
    },
  }),
}));

describe('Sidebar', () => {
  const mockUser = { name: 'Alex', rank: 'Mage' };
  const mockStats = { current: 6, total: 6 };

  it('should render custom user and stats via props', () => {
    renderWithProviders(<Sidebar user={mockUser} stats={mockStats} />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockUser.rank, 'i'))).toBeInTheDocument();
    expect(screen.getByText('6/6')).toBeInTheDocument();
  });

  it('should render all prize cards correctly', () => {
    renderWithProviders(<Sidebar user={mockUser} stats={mockStats} />);

    expect(screen.getByText(/Bronze Badge/i)).toBeInTheDocument();
    expect(screen.getByText(/Silver Medal/i)).toBeInTheDocument();
    expect(screen.getByText(/Gold Trophy/i)).toBeInTheDocument();
  });

  it('should contain the navigation section', () => {
    renderWithProviders(<Sidebar user={mockUser} stats={mockStats} />);
    expect(screen.getByTestId('sidebar-nav')).toBeInTheDocument();
  });
});
