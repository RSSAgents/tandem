import { renderWithProviders as renderBase } from '@/utils/test-util';
import { TeacherSection } from '@components/AiAgentPage/TeacherSection';
import { Grid } from '@mantine/core';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

const renderWithProviders = (ui: ReactElement) => renderBase(<Grid>{ui}</Grid>);

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@pages/AiAgentPage/AiAgentPage.module.css', () => ({
  default: new Proxy({}, { get: (_t, k) => String(k) }),
}));

const defaultProps: Parameters<typeof TeacherSection>[0] = {
  activeTopic: 'TypeScript',
  onResetClick: vi.fn(),
  isMobile: false,
  messagesCount: 0,
  lastMessageText: '',
  renderMessages: () => <div data-testid="messages">rendered messages</div>,
  stressMode: 'normal',
  inputValue: '',
  onInputChange: vi.fn(),
  onSend: vi.fn(),
  isWaitingForAnswer: false,
};

describe('TeacherSection', () => {
  it('renders teacher label', () => {
    renderWithProviders(<TeacherSection {...defaultProps} />);

    expect(screen.getByText('teacher.label')).toBeInTheDocument();
  });

  it('renders messages via renderMessages', () => {
    renderWithProviders(<TeacherSection {...defaultProps} />);

    expect(screen.getByTestId('messages')).toBeInTheDocument();
  });

  it('shows unavailable message in stress mode', () => {
    renderWithProviders(<TeacherSection {...defaultProps} stressMode="stress" />);

    expect(screen.getByText('teacher.stressUnavailable')).toBeInTheDocument();
    expect(screen.queryByTestId('messages')).not.toBeInTheDocument();
  });

  it('input is disabled when activeTopic is null', () => {
    renderWithProviders(<TeacherSection {...defaultProps} activeTopic={null} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('input is disabled in stress mode', () => {
    renderWithProviders(<TeacherSection {...defaultProps} stressMode="stress" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('input is disabled when isWaitingForAnswer is true', () => {
    renderWithProviders(<TeacherSection {...defaultProps} isWaitingForAnswer={true} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('input is enabled when active topic set and normal mode', () => {
    renderWithProviders(<TeacherSection {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).not.toBeDisabled();
  });

  it('calls onInputChange when typing', async () => {
    const onInputChange = vi.fn();
    renderWithProviders(<TeacherSection {...defaultProps} onInputChange={onInputChange} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'a');

    expect(onInputChange).toHaveBeenCalled();
  });

  it('calls onSend when Enter is pressed without Shift', () => {
    const onSend = vi.fn();
    renderWithProviders(<TeacherSection {...defaultProps} onSend={onSend} inputValue="hello" />);

    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

    expect(onSend).toHaveBeenCalled();
  });

  it('does NOT call onSend when Shift+Enter is pressed', () => {
    const onSend = vi.fn();
    renderWithProviders(<TeacherSection {...defaultProps} onSend={onSend} inputValue="hello" />);

    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });

    expect(onSend).not.toHaveBeenCalled();
  });

  it('calls onResetClick when trash icon button is clicked', async () => {
    const onResetClick = vi.fn();
    renderWithProviders(<TeacherSection {...defaultProps} onResetClick={onResetClick} />);

    const trashButtons = screen.getAllByRole('button');
    const trashBtn = trashButtons.find((b) => b.querySelector('svg'));
    expect(trashBtn).toBeInTheDocument();
    if (trashBtn) {
      await userEvent.click(trashBtn);
    }

    expect(onResetClick).toHaveBeenCalled();
  });

  it('trash button is disabled when activeTopic is null', () => {
    renderWithProviders(<TeacherSection {...defaultProps} activeTopic={null} />);

    const buttons = screen.getAllByRole('button');
    const trashBtn = buttons.find((b) => b.querySelector('svg'));
    expect(trashBtn).toBeDisabled();
  });
});
