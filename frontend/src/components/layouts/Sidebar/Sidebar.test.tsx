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

vi.mock('@/utils/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { user_metadata: { username: 'User' } } },
        error: null,
      }),
    },
  },
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
  const mockUser = { name: 'Alex', score: 150 };

  it('should render custom user and stats via props', () => {
    renderWithProviders(<Sidebar user={mockUser} />);
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  it('should contain the navigation section', () => {
    renderWithProviders(<Sidebar user={mockUser} />);
    expect(screen.getByTestId('sidebar-nav')).toBeInTheDocument();
  });
});
