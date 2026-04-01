import { renderWithProviders } from '@/utils/test-util';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Sidebar } from './Sidebar';

vi.mock('@/utils/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { user_metadata: { username: 'Alex' } } },
        error: null,
      }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [{ score: 150 }],
          error: null,
        }),
      }),
    }),
  },
}));

const mockUser = {
  name: 'Alex',
  score: 150,
};

describe('Sidebar', () => {
  it('should render custom user and stats via props', async () => {
    renderWithProviders(<Sidebar user={mockUser} />);

    await waitFor(() => {
      expect(screen.getByText('Alex')).toBeInTheDocument();
    });
  });
});
