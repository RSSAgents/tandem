import editorReducer from '@/components/shared/CodeEditor/slice/editorSlice';
import { useWidgetThis } from '@/hooks/useWidgetThis';
import { MantineProvider } from '@mantine/core';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import WidgetThis from './This';

vi.mock('@/hooks/useWidgetThis');
const mockUseWidgetThis = useWidgetThis as Mock;

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

const renderComponent = () => {
  const store = configureStore({
    reducer: { editorStore: editorReducer },
  });

  return render(
    <MantineProvider>
      <Provider store={store}>
        <MemoryRouter>
          <WidgetThis />
        </MemoryRouter>
      </Provider>
    </MantineProvider>,
  );
};

describe('WidgetThis Component', () => {
  const mockTasks = [
    { id: '1', payload: { code: 'console.log(this)', options: ['window', 'undefined'] } },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display the task and available choices', () => {
    mockUseWidgetThis.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      error: null,
      currentTask: mockTasks[0],
      currentIndex: 0,
      isCorrect: null,
    });

    renderComponent();

    expect(screen.getByText('window')).toBeInTheDocument();
    expect(screen.getByText('undefined')).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument();
  });

  it('should call handleAnswer on check', async () => {
    const handleAnswer = vi.fn();
    mockUseWidgetThis.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      currentTask: mockTasks[0],
      currentIndex: 0,
      isCorrect: null,
      handleAnswer,
    });

    renderComponent();

    const option = screen.getByText('window');
    fireEvent.click(option);

    const verifyBtn = screen.getByText(/verify/i);
    fireEvent.click(verifyBtn);

    expect(handleAnswer).toHaveBeenCalledWith('window');
  });

  it('should go back to Dashboard on finish', async () => {
    const saveResult = vi.fn().mockResolvedValue({});
    mockUseWidgetThis.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      currentTask: mockTasks[0],
      currentIndex: 0,
      isCorrect: true,
      isLastStep: true,
      saveResult,
    });

    renderComponent();

    const finishBtn = screen.getByRole('button', { name: /finish/i });
    fireEvent.click(finishBtn);

    await waitFor(() => {
      expect(saveResult).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
