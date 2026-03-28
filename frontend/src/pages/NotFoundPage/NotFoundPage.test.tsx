import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { DashboardPage } from '../DashboardPage/DashboardPage';
import { NotFoundPage } from './NotFoundPage';

const renderNotFound = (route = '/invalid-route') => {
  return render(
    <MantineProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </MantineProvider>,
  );
};

describe('NotFoundPage', () => {
  it('render 404 on invalid route', () => {
    renderNotFound();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('button')).toBeInTheDocument();
  });

  it('does not render 404 on existing route', () => {
    render(
      <MantineProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(screen.queryByText('404')).not.toBeInTheDocument();
  });
});
