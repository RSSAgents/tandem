import { About } from '@/pages/About/About';
import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { WidgetConsole } from '@/components/features/widgets/WidgetConsole/WidgetConsole';
import { ROUTE_PATHS } from './routePaths';
import { lazy } from 'react';

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
      { path: ROUTE_PATHS.WIDGET_CONSOLE, element: <WidgetConsole /> },
    ],
  },
];
