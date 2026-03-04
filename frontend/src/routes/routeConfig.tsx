import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { lazy } from 'react';
import { ROUTE_PATHS } from './routePaths';

const LoginPage = lazy(() => import('@components/features/auth/LoginPage'));
const StackWidget = lazy(() => import('@components/features/widgets/Stack/Stack'));

export const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <p>HomePage</p> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.STACK_WIDGET, element: <StackWidget /> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
];
