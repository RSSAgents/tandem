import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { About } from './About';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const renderAbout = () => {
  return render(
    <MantineProvider>
      <MemoryRouter>
        <About />
      </MemoryRouter>
    </MantineProvider>,
  );
};

describe('About Page', () => {
  it('should render the main title and subtitle', () => {
    renderAbout();

    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
    expect(
      screen.getByText(
        /The creators behind Tandem - united by code, creativity, and the RS School spirit/i,
      ),
    ).toBeInTheDocument();
  });

  it('should render all 10 team member cards', () => {
    renderAbout();

    const memberCards = screen.getAllByRole('link');
    expect(memberCards).toHaveLength(10);
  });

  it('should display specific info for a team leader', () => {
    renderAbout();

    expect(screen.getByText('Shakhzod')).toBeInTheDocument();
    expect(screen.getByText('Team Lead - Mentor')).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: /Shakhzod/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Shakhzod235');
  });

  it('should render GitHub buttons for members', () => {
    renderAbout();

    const buttons = screen.getAllByText('GitHub');
    expect(buttons).toHaveLength(10);
  });

  it('should verify that external links open in a new tab', () => {
    renderAbout();

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('should display technical bio content for developers', () => {
    renderAbout();
    expect(screen.getByText(/asynchrony/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Loop/i)).toBeInTheDocument();
    expect(screen.getByText(/technical strategist/i)).toBeInTheDocument();
  });
});
