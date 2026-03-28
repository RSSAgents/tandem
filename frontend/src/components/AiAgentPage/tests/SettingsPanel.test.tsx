import { renderWithProviders } from '@/utils/test-util';
import { SettingsPanel } from '@components/AiAgentPage/SettingsPanel';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const defaultProps: Parameters<typeof SettingsPanel>[0] = {
  role: 'gentle',
  stressMode: 'normal',
  readinessPercentage: 42,
  onRoleChange: vi.fn(),
  onStressModeChange: vi.fn(),
  onOpenCodeRunner: vi.fn(),
};

describe('SettingsPanel', () => {
  it('displays readinessPercentage value', () => {
    renderWithProviders(<SettingsPanel {...defaultProps} readinessPercentage={75} />);

    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('displays 0% when readinessPercentage is 0', () => {
    renderWithProviders(<SettingsPanel {...defaultProps} readinessPercentage={0} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders role segmented control options', () => {
    renderWithProviders(<SettingsPanel {...defaultProps} />);

    expect(screen.getByText('settings.gentle')).toBeInTheDocument();
    expect(screen.getByText('settings.strict')).toBeInTheDocument();
  });

  it('renders stress mode segmented control options', () => {
    renderWithProviders(<SettingsPanel {...defaultProps} />);

    expect(screen.getByText('settings.normal')).toBeInTheDocument();
    expect(screen.getByText('settings.stress')).toBeInTheDocument();
  });

  it('calls onRoleChange when strict option is clicked', async () => {
    const onRoleChange = vi.fn();
    renderWithProviders(<SettingsPanel {...defaultProps} onRoleChange={onRoleChange} />);

    await userEvent.click(screen.getByText('settings.strict'));

    expect(onRoleChange).toHaveBeenCalledWith('strict');
  });

  it('calls onStressModeChange when stress option is clicked', async () => {
    const onStressModeChange = vi.fn();
    renderWithProviders(
      <SettingsPanel {...defaultProps} onStressModeChange={onStressModeChange} />,
    );

    await userEvent.click(screen.getByText('settings.stress'));

    expect(onStressModeChange).toHaveBeenCalledWith('stress');
  });

  it('renders the Code Runner button', () => {
    renderWithProviders(<SettingsPanel {...defaultProps} />);

    expect(screen.getByText('settings.codeRunner')).toBeInTheDocument();
  });

  it('calls onOpenCodeRunner when Code Runner button is clicked', async () => {
    const onOpenCodeRunner = vi.fn();
    renderWithProviders(<SettingsPanel {...defaultProps} onOpenCodeRunner={onOpenCodeRunner} />);

    await userEvent.click(screen.getByText('settings.codeRunner'));

    expect(onOpenCodeRunner).toHaveBeenCalled();
  });

  it('shows readiness label text', () => {
    renderWithProviders(<SettingsPanel {...defaultProps} />);

    expect(screen.getByText('settings.ready')).toBeInTheDocument();
  });
});
