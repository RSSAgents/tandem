import { renderWithProviders } from '@/utils/test-util';
import { TopicsPanel } from '@components/AiAgentPage/TopicsPanel';
import { TOPICS } from '@constants/aiAgentConstants';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@pages/AiAgentPage/AiAgentPage.module.css', () => ({
  default: new Proxy({}, { get: (_t, k) => String(k) }),
}));

const defaultProps = {
  activeTopic: null,
  scores: {},
  onTopicSelect: vi.fn(),
};

describe('TopicsPanel', () => {
  it('renders all 15 topics', () => {
    renderWithProviders(<TopicsPanel {...defaultProps} />);

    TOPICS.forEach((topic) => {
      expect(screen.getByText(topic)).toBeInTheDocument();
    });
  });

  it('shows topic title label', () => {
    renderWithProviders(<TopicsPanel {...defaultProps} />);

    expect(screen.getByText('topics.title')).toBeInTheDocument();
  });

  it('calls onTopicSelect with the topic name when a button is clicked', async () => {
    const onTopicSelect = vi.fn();
    renderWithProviders(<TopicsPanel {...defaultProps} onTopicSelect={onTopicSelect} />);

    await userEvent.click(screen.getByText('TypeScript'));

    expect(onTopicSelect).toHaveBeenCalledWith('TypeScript');
  });

  it('does not call onClose when isMobile=false', async () => {
    const onTopicSelect = vi.fn();
    const onClose = vi.fn();
    renderWithProviders(
      <TopicsPanel
        {...defaultProps}
        onTopicSelect={onTopicSelect}
        isMobile={false}
        onClose={onClose}
      />,
    );

    await userEvent.click(screen.getByText('TypeScript'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose after topic selection when isMobile=true', async () => {
    const onTopicSelect = vi.fn();
    const onClose = vi.fn();
    renderWithProviders(
      <TopicsPanel {...defaultProps} onTopicSelect={onTopicSelect} isMobile onClose={onClose} />,
    );

    await userEvent.click(screen.getByText('TypeScript'));

    expect(onTopicSelect).toHaveBeenCalledWith('TypeScript');
    expect(onClose).toHaveBeenCalled();
  });

  it('shows score badge next to a topic when score exists', () => {
    renderWithProviders(<TopicsPanel {...defaultProps} scores={{ TypeScript: 7 }} />);

    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('does not show badge when score is 0', () => {
    renderWithProviders(<TopicsPanel {...defaultProps} scores={{ TypeScript: 0 }} />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});
