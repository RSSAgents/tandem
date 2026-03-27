import { screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { mockNavigate } from '../../../../../vitest.setup';
import RegisterPage from './RegisterPage';
import { setupUserEvent } from '@/utils/test-util';

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders register form elements', () => {
    setupUserEvent(<RegisterPage />);

    const passwordInputs = screen.getAllByLabelText(/password/i);

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(passwordInputs).toHaveLength(2);
    expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
  });

  it('does not submit form when it is invalid', async () => {
    const { user } = setupUserEvent(<RegisterPage />);

    await user.click(screen.getByRole('button', { name: /signup/i }));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows error when passwords do not match', async () => {
    const { user } = setupUserEvent(<RegisterPage />);
    const [password, confirmPassword] = screen.getAllByLabelText(/password/i);

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Mike');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'test@test.com');
    await user.type(password, '123456');
    await user.type(confirmPassword, '654321');
    await user.click(screen.getByRole('button', { name: /signup/i }));

    expect(await screen.findByText(/passwordsDontMatch/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows confirmation message on valid submit', async () => {
    const { user } = setupUserEvent(<RegisterPage />);
    const [password, confirmPassword] = screen.getAllByLabelText(/password/i);

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Mike');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'test@test.com');
    await user.type(password, '123456');
    await user.type(confirmPassword, '123456');

    await user.click(screen.getByRole('button', { name: /signup/i }));

    expect(await screen.findByText(/confirmEmailSent/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
