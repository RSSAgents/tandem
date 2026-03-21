import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { PrizeCard } from './PrizeCard';

describe('PrizeCard', () => {
  const defaultProps = {
    title: 'Golden Trophy',
    description: 'Complete all modules to win',
  };

  it('should render title and description correctly', () => {
    renderWithProviders(<PrizeCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    const iconTestId = 'prize-icon';
    const Icon = <span data-testid={iconTestId}>🏆</span>;

    renderWithProviders(<PrizeCard {...defaultProps} icon={Icon} />);

    expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
  });
});
