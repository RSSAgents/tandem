import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect } from 'vitest';
import StackWidget from './Stack';
import { QUIZ_QUESTIONS, FEEDBACK_MESSAGES } from './Stack.constants';

const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe('StackWidget', () => {
  it('renders the component with title', () => {
    renderWithMantine(<StackWidget />);
    expect(screen.getByText('STACK')).toBeInTheDocument();
  });

  it('shows LIFO question initially', () => {
    renderWithMantine(<StackWidget />);
    expect(screen.getByText(QUIZ_QUESTIONS.lifo.question)).toBeInTheDocument();
  });

  it('shows both answer options for LIFO', () => {
    renderWithMantine(<StackWidget />);
    expect(screen.getByText(QUIZ_QUESTIONS.lifo.correctAnswer)).toBeInTheDocument();
    expect(screen.getByText(QUIZ_QUESTIONS.lifo.wrongAnswer)).toBeInTheDocument();
  });

  it('submit button is disabled when no answer is selected', () => {
    renderWithMantine(<StackWidget />);
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when answer is selected', async () => {
    const user = userEvent.setup();
    renderWithMantine(<StackWidget />);

    const correctRadio = screen.getByLabelText(QUIZ_QUESTIONS.lifo.correctAnswer);
    await user.click(correctRadio);

    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    expect(submitButton).toBeEnabled();
  });

  it('shows correct feedback for correct LIFO answer', async () => {
    const user = userEvent.setup();
    renderWithMantine(<StackWidget />);

    const correctRadio = screen.getByLabelText(QUIZ_QUESTIONS.lifo.correctAnswer);
    await user.click(correctRadio);

    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    await user.click(submitButton);

    expect(screen.getByText(FEEDBACK_MESSAGES.correct)).toBeInTheDocument();
  });

  it('shows incorrect feedback for wrong LIFO answer', async () => {
    const user = userEvent.setup();
    renderWithMantine(<StackWidget />);

    const wrongRadio = screen.getByLabelText(QUIZ_QUESTIONS.lifo.wrongAnswer);
    await user.click(wrongRadio);

    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    await user.click(submitButton);

    expect(screen.getByText(FEEDBACK_MESSAGES.incorrect)).toBeInTheDocument();
  });

  it('allows changing answer after selection', async () => {
    const user = userEvent.setup();
    renderWithMantine(<StackWidget />);

    const wrongRadio = screen.getByLabelText(QUIZ_QUESTIONS.lifo.wrongAnswer);
    await user.click(wrongRadio);

    const correctRadio = screen.getByLabelText(QUIZ_QUESTIONS.lifo.correctAnswer);
    await user.click(correctRadio);

    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    expect(submitButton).toBeEnabled();
  });

  it('does not show LIFO section before animation starts', () => {
    renderWithMantine(<StackWidget />);
    expect(screen.queryByText('LIFO')).not.toBeInTheDocument();
  });

  it('does not show FIFO section initially', () => {
    renderWithMantine(<StackWidget />);
    expect(screen.queryByText('FIFO')).not.toBeInTheDocument();
  });
});
