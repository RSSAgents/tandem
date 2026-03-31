import { renderWithProviders } from '@/utils/test-util';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { UserBlock } from './UserBlock';

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

describe('UserBlock', () => {
  const defaultProps = {
    name: 'User',
    score: 150,
  };

  it('should render user name and rank correctly', async () => {
    renderWithProviders(<UserBlock {...defaultProps} />);

    expect(screen.getByText(String(defaultProps.score))).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('User')).toBeInTheDocument();
    });
  });
});
