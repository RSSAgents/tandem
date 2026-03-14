import { MantineProvider } from '@mantine/core';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';

export const renderWithProviders = (
  ui: ReactElement,
  routerProps: MemoryRouterProps = {},
  options?: RenderOptions,
) => {
  return render(
    <MantineProvider>
      <MemoryRouter {...routerProps}>{ui}</MemoryRouter>
    </MantineProvider>,
    options,
  );
};

export const setupUserEvent = (ui: ReactElement, routerProps?: MemoryRouterProps) => {
  return {
    user: userEvent.setup(),
    ...renderWithProviders(ui, routerProps),
  };
};
