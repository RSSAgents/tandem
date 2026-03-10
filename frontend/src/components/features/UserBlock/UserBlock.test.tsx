import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { UserBlock } from './UserBlock';

describe('UserBlock', () => {
  const defaultProps = {
    name: 'Alex',
    rank: 'Mage',
  };

  it('should render user name and rank correctly', () => {
    renderWithProviders(<UserBlock {...defaultProps} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.rank)).toBeInTheDocument();
  });
});
