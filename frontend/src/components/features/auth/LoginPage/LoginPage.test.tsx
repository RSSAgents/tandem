import { screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { mockNavigate } from '../../../../../vitest.setup';
import { LoginPage } from './LoginPage';
import { setupUserEvent } from '@/utils/test-util';

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form elements', () => {
    setupUserEvent(<LoginPage />);

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('does not submit form when it is invalid', async () => {
    const { user } = setupUserEvent(<LoginPage />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to dashboard on valid submit', async () => {
    const { user } = setupUserEvent(<LoginPage />);

    await user.type(screen.getByRole('textbox', { name: /email/i }), 'test@test.com');

    await user.type(screen.getByLabelText(/password/i), '123456');

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
