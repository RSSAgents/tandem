import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { AuthLayout } from '../components/layouts/AuthLayout/AuthLayout';
import { LoginPage } from '../components/features/auth/LoginPage';
import { ROUTE_PATHS } from './routePaths';

export const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <p>HomePage</p> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [{ path: ROUTE_PATHS.LOGIN, element: <LoginPage /> }],
  },
];
