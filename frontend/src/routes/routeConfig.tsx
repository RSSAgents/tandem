import { WidgetConsole } from '@/components/features/widgets/WidgetConsole/WidgetConsole';
import { About } from '@/pages/About/About';
import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { ResultPage } from '@/pages/ResultPage/ResultPage';
import { lazy } from 'react';
import { MinimalLayout } from '@components/layouts/MinimalLayout/MinimalLayout';
import { ROUTE_PATHS } from './routePaths';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';

const LoginPage = lazy(() => import('@/components/features/auth/LoginPage'));

export const appRoutes = [
  {
    path: '/',
    element: <MinimalLayout />,
    children: [
      { index: true, element: <p>HomePage</p> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.ABOUT, element: <About /> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NotFoundPage /> },
      { path: ROUTE_PATHS.WIDGET_CONSOLE, element: <WidgetConsole /> },
      { path: ROUTE_PATHS.RESULT_PAGE, element: <ResultPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: ROUTE_PATHS.DASHBOARD, element: <p>Dashboard</p> },
      { path: ROUTE_PATHS.LIBRARY, element: <p>Library Page</p> },
      { path: ROUTE_PATHS.ACHIEVEMENTS, element: <p>Achievements Page</p> },
    ],
  },
];
