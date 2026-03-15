import { FEEDBACK_MESSAGES, QUIZ_QUESTIONS } from '@/constants/stack';
import { renderWithProviders, setupUserEvent } from '@/utils/test-util';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StackWidget from './Stack';

describe('StackWidget', () => {
  it('renders the component with title', () => {
    renderWithProviders(<StackWidget />);
    expect(screen.getByText('STACK')).toBeInTheDocument();
  });

  it('shows LIFO question initially', () => {
    renderWithProviders(<StackWidget />);
    expect(screen.getByText(QUIZ_QUESTIONS.lifo.question)).toBeInTheDocument();
  });

  it('shows both answer options for LIFO', () => {
    renderWithProviders(<StackWidget />);
    expect(screen.getByText(QUIZ_QUESTIONS.lifo.correctAnswer)).toBeInTheDocument();
    expect(screen.getByText(QUIZ_QUESTIONS.lifo.wrongAnswer)).toBeInTheDocument();
  });

  it('submit button is disabled when no answer is selected', () => {
    renderWithProviders(<StackWidget />);
    expect(screen.getByRole('button', { name: /Submit Answer/i })).toBeDisabled();
  });

  it('enables submit button when answer is selected', async () => {
    const { user } = setupUserEvent(<StackWidget />);

    await user.click(screen.getByLabelText(QUIZ_QUESTIONS.lifo.correctAnswer));
    expect(screen.getByRole('button', { name: /Submit Answer/i })).toBeEnabled();
  });

  it('shows correct feedback for correct LIFO answer', async () => {
    const { user } = setupUserEvent(<StackWidget />);

    await user.click(screen.getByLabelText(QUIZ_QUESTIONS.lifo.correctAnswer));
    await user.click(screen.getByRole('button', { name: /Submit Answer/i }));

    expect(screen.getByText(FEEDBACK_MESSAGES.correct)).toBeInTheDocument();
  });

  it('shows incorrect feedback for wrong LIFO answer', async () => {
    const { user } = setupUserEvent(<StackWidget />);

    await user.click(screen.getByLabelText(QUIZ_QUESTIONS.lifo.wrongAnswer));
    await user.click(screen.getByRole('button', { name: /Submit Answer/i }));

    expect(screen.getByText(FEEDBACK_MESSAGES.incorrect)).toBeInTheDocument();
  });

  it('allows changing answer after selection', async () => {
    const { user } = setupUserEvent(<StackWidget />);

    await user.click(screen.getByLabelText(QUIZ_QUESTIONS.lifo.wrongAnswer));
    await user.click(screen.getByLabelText(QUIZ_QUESTIONS.lifo.correctAnswer));

    expect(screen.getByRole('button', { name: /Submit Answer/i })).toBeEnabled();
  });

  it('does not show LIFO section before animation starts', () => {
    renderWithProviders(<StackWidget />);
    expect(screen.queryByText('LIFO')).not.toBeInTheDocument();
  });

  it('does not show FIFO section initially', () => {
    renderWithProviders(<StackWidget />);
    expect(screen.queryByText('FIFO')).not.toBeInTheDocument();
  });
});
