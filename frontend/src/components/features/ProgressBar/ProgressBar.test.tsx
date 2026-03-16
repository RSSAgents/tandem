import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, options: { current: number; total: number }) =>
      `${options.current}/${options.total}`,
  }),
}));

describe('ProgressBar', () => {
  it('should render progress text correctly', () => {
    renderWithProviders(<ProgressBar current={2} total={5} />);

    expect(screen.getByText('2/5')).toBeInTheDocument();
  });

  it('should calculate the correct percentage', () => {
    renderWithProviders(<ProgressBar current={1} total={4} />);

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '25');
  });
});
