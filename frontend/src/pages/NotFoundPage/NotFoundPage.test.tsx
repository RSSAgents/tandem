import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('render 404 on invalid route', () => {
    render(
      <MantineProvider>
        <MemoryRouter initialEntries={['/invalid/route']}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText(/wandered off the learning path/i)).toBeDefined();
    expect(screen.getByText('Back to learning')).toBeDefined();
  });

  it('does not render 404 on existing route', () => {
    render(
      <MantineProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<p>HomePage</p>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(screen.queryByText('404')).toBeNull();
  });
});
