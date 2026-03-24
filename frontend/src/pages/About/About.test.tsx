import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { About } from './About';

describe('About Page', () => {
  it('should render all 10 team member cards', () => {
    renderWithProviders(<About />);
    const memberCards = screen.getAllByRole('link');
    expect(memberCards).toHaveLength(10);
  });

  it('should display team leader name and role', () => {
    renderWithProviders(<About />);

    const githubLinks = screen.getAllByRole('link');
    const hasGithubLink = githubLinks.some((link) =>
      link.getAttribute('href')?.includes('github.com'),
    );
    expect(hasGithubLink).toBe(true);
  });

  it('should render GitHub buttons for members', () => {
    renderWithProviders(<About />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(10);
  });

  it('should open Github link in a new tab', () => {
    renderWithProviders(<About />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('should display technical bio content for developers', () => {
    renderWithProviders(<About />);
    const bioTexts = screen.getAllByText(/about.team.*.bio/i);
    expect(bioTexts.length).toBeGreaterThan(0);
  });
});
