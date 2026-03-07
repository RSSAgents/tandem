import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { About } from './About';

describe('About Page', () => {
  const setup = () => renderWithProviders(<About />);

  it('should render the main title and subtitle', () => {
    setup();
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
    expect(
      screen.getByText(
        /The creators behind Tandem - united by code, creativity, and the RS School spirit/i,
      ),
    ).toBeInTheDocument();
  });

  it('should render all 10 team member cards', () => {
    setup();
    const memberCards = screen.getAllByRole('link');
    expect(memberCards).toHaveLength(10);
  });

  it('should display team leader name and role', () => {
    setup();
    expect(screen.getByText('Shakhzod')).toBeInTheDocument();
    expect(screen.getByText('Team Lead - Mentor')).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: /Shakhzod/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Shakhzod235');
  });

  it('should render GitHub buttons for members', () => {
    setup();
    const buttons = screen.getAllByText('GitHub');
    expect(buttons).toHaveLength(10);
  });

  it('should open Github link in a new tab', () => {
    setup();
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('should display technical bio content for developers', () => {
    setup();
    expect(screen.getByText(/asynchrony/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Loop/i)).toBeInTheDocument();
    expect(screen.getByText(/technical strategist/i)).toBeInTheDocument();
  });
});
