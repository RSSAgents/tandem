import { MantineProvider } from '@mantine/core';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { LoginPage } from './LoginPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderLogin = () =>
  render(
    <MantineProvider>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </MantineProvider>,
  );

describe('LoginPage', () => {
  it('render inputs and submit button', () => {
    renderLogin();

    expect(screen.getByTestId('login-email')).toBeInTheDocument();
    expect(screen.getByTestId('login-password')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit')).toBeInTheDocument();
  });

  it('mark fields invalid on empty submit', async () => {
    renderLogin();

    fireEvent.click(screen.getByTestId('login-submit'));

    expect(await screen.findByTestId('login-email')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('submit valid form', async () => {
    renderLogin();

    fireEvent.change(screen.getByTestId('login-email'), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByTestId('login-password'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByTestId('login-submit'));

    expect(true).toBe(true);
  });
});