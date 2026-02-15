import { createBrowserRouter } from 'react-router-dom';
import EndPage from '../pages/EndPage/EndPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import StartPage from '../pages/StartPage/StartPage';
import { RootLayout } from './RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/start',
        element: <StartPage />,
      },
      {
        path: '/end',
        element: <EndPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
