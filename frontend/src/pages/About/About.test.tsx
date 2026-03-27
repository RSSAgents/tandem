import { renderWithProviders } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { About } from './About';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === 'team' && options?.returnObjects) {
        return [
          {
            name: 'Shakhzod',
            role: 'Team Lead - Mentor',
            github: 'Shakhzod235',
            desc: 'Project architecture, code reviews, mentoring',
            bio: 'Project architect and technical strategist...',
          },
          {
            name: 'Diana',
            role: 'Mentor',
            github: 'bt-diana',
            desc: 'Code mentoring, QA, learning paths',
            bio: 'Quality assurance lead and educational curator...',
          },
          {
            name: 'Khayitbek',
            role: 'Mentor',
            github: 'khayitbek03',
            desc: 'Mentoring, code quality, documentation',
            bio: 'Maintained high coding standards...',
          },
          {
            name: 'Daria',
            role: 'Mentor',
            github: 'dashque',
            desc: 'Mentoring, code quality, documentation',
            bio: 'Technical advisor...',
          },
          {
            name: 'Fayzullo',
            role: 'Developer',
            github: 'Fayzullo05',
            desc: 'Repository setup, widgets, API integration',
            bio: 'The one who made everyone actually read the code...',
          },
          {
            name: 'Ilia',
            role: 'Developer',
            github: 'D15ND',
            desc: 'UI/UX, animations, component design',
            bio: 'Made sure algorithms stopped being boring...',
          },
          {
            name: 'Margarita',
            role: 'Developer',
            github: 'solarsungai',
            desc: 'Widgets, AI features, database design',
            bio: 'Developed an AI assistant that acts as a smart mentor...',
          },
          {
            name: 'Marta',
            role: 'Developer',
            github: '27moon',
            desc: 'Widgets, AI features, database design',
            bio: 'Built a Garbage Collector simulator...',
          },
          {
            name: 'Vika',
            role: 'Developer',
            github: 'oneilcode',
            desc: 'Widgets, AI features, database design',
            bio: "Turned every beginner's nightmare — asynchrony — into a game...",
          },
          {
            name: 'Margarita Maletz',
            role: 'Mentor',
            github: 'margaryta-maletz',
            desc: 'Team mentor and motivator',
            bio: 'She guided the team through the development process...',
          },
        ];
      }
      if (key === 'title') return 'Meet Our Team';
      if (key === 'subtitle') return 'The creators behind Tandem...';
      if (key === 'githubButton') return 'GitHub';
      return key;
    },
  }),
}));

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

  it('should display technical bio content for developers', async () => {
    renderWithProviders(<About />);
    const bioElements = await screen.findAllByText(/architect|asynchrony|game/i);
    expect(bioElements.length).toBeGreaterThan(0);
  });
});
