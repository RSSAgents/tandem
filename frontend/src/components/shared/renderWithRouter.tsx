import { MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

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
