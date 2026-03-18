import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuestionGroup } from './QuestionGroup';
import { setupUserEvent } from '@/utils/test-util';

const questions = [
  {
    id: 'q1',
    questionText: 'What is 2 + 2?',
    answerOptions: [
      { id: '1', label: '3' },
      { id: '2', label: '4' },
    ],
  },
  {
    id: 'q2',
    questionText: 'Choose languages',
    isMultiple: true,
    answerOptions: [
      { id: 'js', label: 'JavaScript' },
      { id: 'py', label: 'Python' },
    ],
  },
];

describe('QuestionGroup', () => {
  it('renders question text', () => {
    setupUserEvent(<QuestionGroup questions={questions} />);

    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  it('renders answer option', () => {
    setupUserEvent(<QuestionGroup questions={questions} />);

    expect(screen.getByLabelText('4')).toBeInTheDocument();
  });

  it('selects radio option for single choice question', async () => {
    const { user } = setupUserEvent(<QuestionGroup questions={questions} />);
    const option = screen.getByLabelText('4');

    await user.click(option);

    expect(option).toBeChecked();
  });

  it('allows selecting multiple checkbox options', async () => {
    const { user } = setupUserEvent(<QuestionGroup questions={questions} />);
    const js = screen.getByLabelText('JavaScript');

    await user.click(js);

    expect(js).toBeChecked();
  });

  it('calls onChange when answer changes', async () => {
    const handleChange = vi.fn();
    const { user } = setupUserEvent(
      <QuestionGroup questions={questions} onChange={handleChange} />,
    );

    await user.click(screen.getByLabelText('4'));

    expect(handleChange).toHaveBeenCalled();
  });
});
