import { WidgetConsole } from '@/components/features/widgets/WidgetConsole/WidgetConsole';
import { About } from '@/pages/About/About';
import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { lazy } from 'react';
import { MinimalLayout } from '@components/layouts/MinimalLayout/MinimalLayout';
import { ROUTE_PATHS } from './routePaths';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage/LeaderboardPage';
import { DashboardPage } from '../pages/DashboardPage/DashboardPage';

const LoginPage = lazy(() => import('@/components/features/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/components/features/auth/RegisterPage'));
const StackWidget = lazy(() => import('@components/features/widgets/Stack/Stack'));

export const appRoutes = [
  {
    path: '/',
    element: <MinimalLayout />,
    children: [
      { index: true, element: <p>HomePage</p> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.ABOUT, element: <About /> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NotFoundPage /> },
      { path: ROUTE_PATHS.REGISTER, element: <RegisterPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: ROUTE_PATHS.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTE_PATHS.LIBRARY, element: <p>Library Page</p> },
      { path: ROUTE_PATHS.ACHIEVEMENTS, element: <p>Achievements Page</p> },
      { path: ROUTE_PATHS.WIDGET_CONSOLE, element: <WidgetConsole /> },
      { path: ROUTE_PATHS.LEADERBOARD_PAGE, element: <LeaderboardPage /> },
      { path: ROUTE_PATHS.STACK_WIDGET, element: <StackWidget /> },
    ],
  },
];
