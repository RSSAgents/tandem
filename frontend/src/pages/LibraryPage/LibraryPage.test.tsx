import { renderWithProviders, setupUserEvent } from '@/utils/test-util';
import { LIBRARY_ACCORDION } from '@constants/library';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LibraryPage from './LibraryPage';

describe('LibraryPage', () => {
  it('renders the main title', () => {
    renderWithProviders(<LibraryPage />);
    expect(screen.getByRole('heading', { name: 'Knowledge Base', level: 1 })).toBeInTheDocument();
  });

  it('renders all category titles', () => {
    renderWithProviders(<LibraryPage />);
    LIBRARY_ACCORDION.forEach((category) => {
      expect(
        screen.getByRole('heading', { name: category.category, level: 2 }),
      ).toBeInTheDocument();
    });
  });

  it('renders all accordion item controls', () => {
    renderWithProviders(<LibraryPage />);
    LIBRARY_ACCORDION.forEach((category) => {
      category.items.forEach((item) => {
        expect(screen.getByRole('button', { name: item.value })).toBeInTheDocument();
      });
    });
  });

  it('accordion panels are collapsed by default', () => {
    renderWithProviders(<LibraryPage />);
    LIBRARY_ACCORDION.forEach((category) => {
      category.items.forEach((item) => {
        expect(screen.getByRole('button', { name: item.value })).toHaveAttribute(
          'aria-expanded',
          'false',
        );
      });
    });
  });

  it('opens accordion panel on click', async () => {
    const { user } = setupUserEvent(<LibraryPage />);
    const firstItem = LIBRARY_ACCORDION[0].items[0];
    const button = screen.getByRole('button', { name: firstItem.value });

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes accordion panel on second click', async () => {
    const { user } = setupUserEvent(<LibraryPage />);
    const firstItem = LIBRARY_ACCORDION[0].items[0];
    const button = screen.getByRole('button', { name: firstItem.value });

    await user.click(button);
    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
