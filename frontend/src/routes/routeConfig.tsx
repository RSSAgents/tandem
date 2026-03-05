import { About } from '@/pages/About/About';
import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { lazy } from 'react';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { ROUTE_PATHS } from './routePaths';

const LoginPage = lazy(() => import('@components/features/auth/LoginPage'));

export const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <p>HomePage</p> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.ABOUT, element: <About /> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
];
