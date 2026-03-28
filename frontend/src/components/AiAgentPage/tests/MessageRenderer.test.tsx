import { Message } from '@/types/aiAgentTypes';
import { renderWithProviders } from '@/utils/test-util';
import { MessageRenderer } from '@components/AiAgentPage/MessageRenderer';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@mantine/code-highlight', () => ({
  CodeHighlight: ({ code }: { code: string }) => <pre data-testid="code-highlight">{code}</pre>,
}));

vi.mock('@mantine/code-highlight/styles.css', () => ({}));

vi.mock('@components/AiAgentPage/CodeRunnerModal', () => ({
  CodeRunnerModal: ({ opened }: { opened: boolean }) =>
    opened ? <div data-testid="code-runner-modal" /> : null,
}));

vi.mock('@pages/AiAgentPage/AiAgentPage.module.css', () => ({
  default: new Proxy({}, { get: (_t, k) => String(k) }),
}));

const makeMessage = (overrides: Partial<Message> = {}): Message => ({
  id: 'm1',
  sender: 'ai',
  text: 'Hello world',
  timestamp: 1000,
  ...overrides,
});

describe('MessageRenderer', () => {
  it('shows startMessage when hasActiveTopic is false', () => {
    renderWithProviders(
      <MessageRenderer
        messages={[]}
        startMessage="Welcome! Pick a topic to begin."
        hasActiveTopic={false}
      />,
    );

    expect(screen.getByText('Welcome! Pick a topic to begin.')).toBeInTheDocument();
  });

  it('shows startMessage when messages array is empty and topic is active', () => {
    renderWithProviders(
      <MessageRenderer messages={[]} startMessage="Let's get started!" hasActiveTopic={true} />,
    );

    expect(screen.getByText("Let's get started!")).toBeInTheDocument();
  });

  it('renders message text content', () => {
    const messages = [makeMessage({ text: 'What is TypeScript?' })];
    renderWithProviders(
      <MessageRenderer messages={messages} startMessage="start" hasActiveTopic={true} />,
    );

    expect(screen.getByText('What is TypeScript?')).toBeInTheDocument();
  });

  it('renders multiple messages', () => {
    const messages = [
      makeMessage({ id: '1', sender: 'ai', text: 'Question one?' }),
      makeMessage({ id: '2', sender: 'user', text: 'My answer' }),
    ];
    renderWithProviders(
      <MessageRenderer messages={messages} startMessage="start" hasActiveTopic={true} />,
    );

    expect(screen.getByText('Question one?')).toBeInTheDocument();
    expect(screen.getByText('My answer')).toBeInTheDocument();
  });

  it('strips FINAL_SCORE from message text', () => {
    const messages = [makeMessage({ text: 'Great work! FINAL_SCORE: 8' })];
    renderWithProviders(
      <MessageRenderer messages={messages} startMessage="start" hasActiveTopic={true} />,
    );

    expect(screen.queryByText(/FINAL_SCORE/)).not.toBeInTheDocument();
    expect(screen.getByText('Great work!')).toBeInTheDocument();
  });

  it('strips "Interviewer:" prefix from message text', () => {
    const messages = [makeMessage({ text: 'Interviewer: Tell me about classes.' })];
    renderWithProviders(
      <MessageRenderer messages={messages} startMessage="start" hasActiveTopic={true} />,
    );

    expect(screen.getByText('Tell me about classes.')).toBeInTheDocument();
    expect(screen.queryByText(/^Interviewer:/)).not.toBeInTheDocument();
  });

  it('strips "Candidate:" prefix from message text', () => {
    const messages = [makeMessage({ sender: 'candidate', text: 'Candidate: My answer here.' })];
    renderWithProviders(
      <MessageRenderer messages={messages} startMessage="start" hasActiveTopic={true} />,
    );

    expect(screen.queryByText(/^Candidate:/)).not.toBeInTheDocument();
  });

  it('shows interviewer label in ai-interview mode', () => {
    const messages = [
      makeMessage({ id: '1', sender: 'ai', aiRole: 'interviewer', text: 'Question?' }),
    ];
    renderWithProviders(
      <MessageRenderer
        messages={messages}
        startMessage="start"
        hasActiveTopic={true}
        mode="ai-interview"
      />,
    );

    expect(screen.getByText('messages.interviewer')).toBeInTheDocument();
  });

  it('shows candidate label in ai-interview mode', () => {
    const messages = [
      makeMessage({ id: '1', sender: 'ai', aiRole: 'candidate', text: 'Answer text' }),
    ];
    renderWithProviders(
      <MessageRenderer
        messages={messages}
        startMessage="start"
        hasActiveTopic={true}
        mode="ai-interview"
      />,
    );

    expect(screen.getByText('messages.candidate')).toBeInTheDocument();
  });

  it('renders a fenced code block with CodeHighlight', () => {
    const messages = [
      makeMessage({
        text: '```javascript\nconsole.log("hi")\n```',
      }),
    ];
    renderWithProviders(
      <MessageRenderer messages={messages} startMessage="start" hasActiveTopic={true} />,
    );

    expect(screen.getByTestId('code-highlight')).toBeInTheDocument();
  });

  it('renders a run button for code blocks', () => {
    const messages = [
      makeMessage({
        text: '```javascript\nconsole.log("hi")\n```',
      }),
    ];
    renderWithProviders(
      <MessageRenderer messages={messages} startMessage="start" hasActiveTopic={true} />,
    );

    expect(screen.getByTitle('messages.runCode')).toBeInTheDocument();
  });

  it('does not show labels in interviewer (non-ai-interview) mode', () => {
    const messages = [makeMessage({ sender: 'ai', text: 'Question?' })];
    renderWithProviders(
      <MessageRenderer
        messages={messages}
        startMessage="start"
        hasActiveTopic={true}
        mode="interviewer"
      />,
    );

    expect(screen.queryByText('messages.interviewer')).not.toBeInTheDocument();
    expect(screen.queryByText('messages.candidate')).not.toBeInTheDocument();
  });
});
