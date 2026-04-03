import i18n from '@/i18n/config';
import enStack from '@/i18n/locales/en/stack.json';
import { renderWithProviders, setupUserEvent } from '@/utils/test-util';
import { screen, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import StackWidget from './Stack';
import classes from './Stack.module.css';

const withI18n = (component: React.ReactNode) => (
  <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
);

const renderStackWidget = () => {
  return renderWithProviders(withI18n(<StackWidget />));
};

const setupStackWidget = () => {
  const { user } = setupUserEvent(withI18n(<StackWidget />));
  return { user };
};

const stackQueue = enStack.stackQueue;

describe('StackWidget', () => {
  const waitForLoad = async () => {
    await waitFor(() => {
      expect(screen.getByText('STACK')).toBeInTheDocument();
    });
  };

  it('renders the component with title', async () => {
    renderStackWidget();
    await waitForLoad();
    expect(screen.getByText('STACK')).toBeInTheDocument();
  });

  it('shows LIFO question initially', async () => {
    renderStackWidget();
    await waitForLoad();
    expect(screen.getByText(stackQueue.stack.title)).toBeInTheDocument();
  });

  it('shows both answer options for LIFO', async () => {
    renderStackWidget();
    await waitForLoad();
    expect(screen.getByText(stackQueue.stack.options[0])).toBeInTheDocument();
    expect(screen.getByText(stackQueue.stack.options[1])).toBeInTheDocument();
  });

  it('submit button is disabled when no answer is selected', async () => {
    renderStackWidget();
    await waitForLoad();
    expect(screen.getByRole('button', { name: stackQueue.button })).toBeDisabled();
  });

  it('enables submit button when answer is selected', async () => {
    const { user } = setupStackWidget();
    await waitForLoad();

    await user.click(screen.getByLabelText(stackQueue.stack.options[0]));
    expect(screen.getByRole('button', { name: stackQueue.button })).toBeEnabled();
  });

  it('shows correct feedback for correct LIFO answer', async () => {
    const { user } = setupStackWidget();
    await waitForLoad();

    await user.click(screen.getByLabelText(stackQueue.stack.options[0]));
    await user.click(screen.getByRole('button', { name: stackQueue.button }));

    expect(screen.getByText(stackQueue.feedback.correct)).toBeInTheDocument();
  });

  it('shows incorrect feedback for wrong LIFO answer', async () => {
    const { user } = setupStackWidget();
    await waitForLoad();

    await user.click(screen.getByLabelText(stackQueue.stack.options[1]));
    await user.click(screen.getByRole('button', { name: stackQueue.button }));

    expect(screen.getByText(stackQueue.feedback.incorrect)).toBeInTheDocument();
  });

  it('allows changing answer after selection', async () => {
    const { user } = setupStackWidget();
    await waitForLoad();

    await user.click(screen.getByLabelText(stackQueue.stack.options[1]));
    await user.click(screen.getByLabelText(stackQueue.stack.options[0]));

    expect(screen.getByRole('button', { name: stackQueue.button })).toBeEnabled();
  });

  it('does not show LIFO section before animation starts', async () => {
    renderStackWidget();
    await waitForLoad();
    expect(screen.queryByText('LIFO')).not.toBeInTheDocument();
  });

it('does not show FIFO section initially (should be hidden)', async () => {
  renderStackWidget();
  await waitForLoad();

  const fifoTitle = screen.getByText('FIFO');
  const fifoSection = fifoTitle.closest(`.${classes.section}`);
  expect(fifoSection).toHaveClass(classes.sectionHidden);
});
});
