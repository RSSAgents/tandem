import i18n from '@/i18n/config';
import enLibrary from '@/i18n/locales/en/library.json';
import { renderWithProviders, setupUserEvent } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import LibraryPage from './LibraryPage';

const withI18n = (component: React.ReactNode) => (
  <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
);

const renderLibraryPage = () => {
  return renderWithProviders(withI18n(<LibraryPage />));
};

describe('LibraryPage', () => {
  it('renders all category titles', () => {
    renderLibraryPage();

    enLibrary.libraryData.forEach((category) => {
      expect(
        screen.getByRole('heading', { name: category.category, level: 2 }),
      ).toBeInTheDocument();
    });
  });

  it('renders all accordion item controls', () => {
    renderLibraryPage();

    enLibrary.libraryData.forEach((category) => {
      category.items.forEach((item) => {
        expect(screen.getByRole('button', { name: item.value })).toBeInTheDocument();
      });
    });
  }, 10000);

  it('accordion panels are collapsed by default', () => {
    renderLibraryPage();

    enLibrary.libraryData.forEach((category) => {
      category.items.forEach((item) => {
        const button = screen.getByRole('button', { name: item.value });
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  it('opens and closes accordion panel on click', async () => {
    const { user } = setupUserEvent(withI18n(<LibraryPage />));

    const firstItem = enLibrary.libraryData[0].items[0];
    const button = screen.getByRole('button', { name: firstItem.value });

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
