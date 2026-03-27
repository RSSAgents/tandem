import { renderWithProviders } from '@/utils/test-util';
import { CodeRunnerModal } from '@components/AiAgentPage/CodeRunnerModal';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@codesandbox/sandpack-react', () => ({
  SandpackProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sandpack-provider">{children}</div>
  ),
  SandpackCodeEditor: () => <div data-testid="sandpack-editor" />,
  useSandpack: () => ({
    sandpack: {
      files: { '/index.js': { code: 'console.log("test")' } },
    },
  }),
}));

const defaultProps = {
  opened: true,
  onClose: vi.fn(),
  code: 'console.log("hello")',
  language: 'javascript',
};

describe('CodeRunnerModal', () => {
  it('does not render modal content when opened=false', () => {
    renderWithProviders(<CodeRunnerModal {...defaultProps} opened={false} />);

    expect(screen.queryByTestId('sandpack-provider')).not.toBeInTheDocument();
  });

  it('renders SandpackProvider when opened=true', () => {
    renderWithProviders(<CodeRunnerModal {...defaultProps} />);

    expect(screen.getByTestId('sandpack-provider')).toBeInTheDocument();
  });

  it('renders the code editor', () => {
    renderWithProviders(<CodeRunnerModal {...defaultProps} />);

    expect(screen.getByTestId('sandpack-editor')).toBeInTheDocument();
  });

  it('calls onClose when modal close button is clicked', async () => {
    const onClose = vi.fn();
    renderWithProviders(<CodeRunnerModal {...defaultProps} onClose={onClose} />);

    const closeButton = document.querySelector<HTMLButtonElement>('.mantine-Modal-close');
    expect(closeButton).toBeTruthy();
    if (closeButton) {
      await userEvent.click(closeButton);
    }

    expect(onClose).toHaveBeenCalled();
  });

  it('shows run and clear action buttons', () => {
    renderWithProviders(<CodeRunnerModal {...defaultProps} />);

    const runButton = screen.getByRole('button', { name: 'codeRunnerModal.run' });
    const clearButton = screen.getByRole('button', { name: 'codeRunnerModal.clear' });

    expect(runButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  it('shows console placeholder text initially', () => {
    renderWithProviders(<CodeRunnerModal {...defaultProps} />);

    expect(screen.getByText('codeRunnerModal.placeholder')).toBeInTheDocument();
  });

  it('clears console logs when clear button is clicked', async () => {
    renderWithProviders(<CodeRunnerModal {...defaultProps} />);

    const clearButton = screen.getByRole('button', { name: 'codeRunnerModal.clear' });
    await userEvent.click(clearButton);

    expect(screen.getByText('codeRunnerModal.placeholder')).toBeInTheDocument();
  });
});
