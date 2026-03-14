import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ModuleCard } from './WidgetCard';

describe('ModuleCard', () => {
  const defaultProps = {
    title: 'JavaScript Fundamentals',
    description: 'Variables and loops',
    status: 'In Progress',
    path: '/console-logs',
  };

  it('should render all content correctly', () => {
    renderWithProviders(<ModuleCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.status)).toBeInTheDocument();
  });

  it('should have the correct navigation path', () => {
    renderWithProviders(<ModuleCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', defaultProps.path);
  });
});
