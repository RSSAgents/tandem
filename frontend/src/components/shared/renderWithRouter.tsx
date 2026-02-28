import { MantineProvider } from '@mantine/core';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const renderNotFound = (route = '/invalid-route') => {
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
