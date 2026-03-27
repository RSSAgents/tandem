import { renderWithProviders as renderBase } from '@/utils/test-util';
import { InterviewerSection } from '@components/AiAgentPage/InterviewerSection';
import { MAX_QUESTIONS } from '@constants/aiAgentConstants';
import { Grid } from '@mantine/core';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

const renderWithProviders = (ui: ReactElement) => renderBase(<Grid>{ui}</Grid>);

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (opts) {
        let result = key;
        Object.entries(opts).forEach(([k, v]) => {
          result = result.replace(`{{${k}}}`, String(v));
        });
        return result;
      }
      return key;
    },
  }),
}));

vi.mock('@pages/AiAgentPage/AiAgentPage.module.css', () => ({
  default: new Proxy({}, { get: (_t, k) => String(k) }),
}));

const renderMessages = vi.fn(() => <div data-testid="messages">messages</div>);

const defaultProps: Parameters<typeof InterviewerSection>[0] = {
  interviewerMode: 'interviewer',
  onInterviewerModeChange: vi.fn(),
  activeTopic: 'TypeScript',
  onResetClick: vi.fn(),
  questionCount: 0,
  messagesCount: 0,
  lastMessageText: '',
  timer: null,
  isMobile: false,
  renderMessages,
  inputValue: '',
  onInputChange: vi.fn(),
  onSend: vi.fn(),
  onGenerateAi: vi.fn(),
  isWaitingForAnswer: false,
  aiInterviewLevel: 'junior',
  onAiLevelChange: vi.fn(),
};

describe('InterviewerSection', () => {
  it('renders mode segmented control with both options', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} />);

    expect(screen.getByText('interviewer.label')).toBeInTheDocument();
    expect(screen.getByText('interviewer.aiInterview')).toBeInTheDocument();
  });

  it('renders messages via renderMessages', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} />);

    expect(screen.getByTestId('messages')).toBeInTheDocument();
  });

  it('shows progress block when activeTopic is set', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} />);

    expect(screen.getByText('interviewer.progress')).toBeInTheDocument();
  });

  it('does not show progress block when activeTopic is null', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} activeTopic={null} />);

    expect(screen.queryByText('interviewer.progress')).not.toBeInTheDocument();
  });

  it('shows question count progress text', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} questionCount={5} />);

    expect(
      screen.getByText(
        'interviewer.progressCount'
          .replace('{{current}}', '5')
          .replace('{{max}}', String(MAX_QUESTIONS)),
      ),
    ).toBeInTheDocument();
  });

  it('shows timer text when timer is set in interviewer mode', () => {
    renderWithProviders(
      <InterviewerSection {...defaultProps} timer={42} interviewerMode="interviewer" />,
    );

    expect(screen.getByText('interviewer.timeLeft')).toBeInTheDocument();
  });

  it('does not show timer in ai-interview mode', () => {
    renderWithProviders(
      <InterviewerSection {...defaultProps} timer={42} interviewerMode="ai-interview" />,
    );

    expect(screen.queryByText('interviewer.timeLeft')).not.toBeInTheDocument();
  });

  it('shows level selector only in ai-interview mode', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} interviewerMode="ai-interview" />);

    expect(screen.getByText('interviewer.junior')).toBeInTheDocument();
    expect(screen.getByText('interviewer.middle')).toBeInTheDocument();
    expect(screen.getByText('interviewer.senior')).toBeInTheDocument();
  });

  it('does not show level selector in interviewer mode', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} interviewerMode="interviewer" />);

    expect(screen.queryByText('interviewer.junior')).not.toBeInTheDocument();
  });

  it('level selector is disabled when questionCount > 0', () => {
    renderWithProviders(
      <InterviewerSection {...defaultProps} interviewerMode="ai-interview" questionCount={3} />,
    );

    const levelControl = screen.getByText('interviewer.junior').closest('[data-disabled]');
    expect(levelControl).not.toBeNull();
  });

  it('shows input and send button in interviewer mode', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} interviewerMode="interviewer" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('interviewer.send')).toBeInTheDocument();
  });

  it('shows Generate Next button in ai-interview mode', () => {
    renderWithProviders(<InterviewerSection {...defaultProps} interviewerMode="ai-interview" />);

    expect(screen.getByText('interviewer.generateNext')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('calls onSend when Send button is clicked', async () => {
    const onSend = vi.fn();
    renderWithProviders(
      <InterviewerSection
        {...defaultProps}
        interviewerMode="interviewer"
        onSend={onSend}
        inputValue="hello"
      />,
    );

    await userEvent.click(screen.getByText('interviewer.send'));

    expect(onSend).toHaveBeenCalled();
  });

  it('calls onGenerateAi when Generate Next is clicked', async () => {
    const onGenerateAi = vi.fn();
    renderWithProviders(
      <InterviewerSection
        {...defaultProps}
        interviewerMode="ai-interview"
        onGenerateAi={onGenerateAi}
      />,
    );

    await userEvent.click(screen.getByText('interviewer.generateNext'));

    expect(onGenerateAi).toHaveBeenCalled();
  });

  it('Generate Next is disabled when isWaitingForAnswer is true', () => {
    renderWithProviders(
      <InterviewerSection
        {...defaultProps}
        interviewerMode="ai-interview"
        isWaitingForAnswer={true}
      />,
    );

    const btn = screen.getByText('interviewer.generateNext').closest('button');
    expect(btn).toBeDisabled();
  });

  it('calls onSend when Enter (no Shift) is pressed in input', () => {
    const onSend = vi.fn();
    renderWithProviders(
      <InterviewerSection
        {...defaultProps}
        interviewerMode="interviewer"
        onSend={onSend}
        inputValue="text"
      />,
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

    expect(onSend).toHaveBeenCalled();
  });

  it('does NOT call onSend when Shift+Enter is pressed', () => {
    const onSend = vi.fn();
    renderWithProviders(
      <InterviewerSection
        {...defaultProps}
        interviewerMode="interviewer"
        onSend={onSend}
        inputValue="text"
      />,
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });

    expect(onSend).not.toHaveBeenCalled();
  });

  it('calls onInterviewerModeChange when mode label is clicked', async () => {
    const onInterviewerModeChange = vi.fn();
    renderWithProviders(
      <InterviewerSection {...defaultProps} onInterviewerModeChange={onInterviewerModeChange} />,
    );

    await userEvent.click(screen.getByText('interviewer.aiInterview'));

    expect(onInterviewerModeChange).toHaveBeenCalledWith('ai-interview');
  });

  it('trash button calls onResetClick', async () => {
    const onResetClick = vi.fn();
    renderWithProviders(<InterviewerSection {...defaultProps} onResetClick={onResetClick} />);

    const buttons = screen.getAllByRole('button');
    const trashBtn = buttons.find((b) => b.querySelector('svg'));
    expect(trashBtn).toBeInTheDocument();
    if (trashBtn) {
      await userEvent.click(trashBtn);
    }

    expect(onResetClick).toHaveBeenCalled();
  });
});
