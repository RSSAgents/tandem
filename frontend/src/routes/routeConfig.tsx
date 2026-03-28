import { WidgetConsole } from '@/components/features/widgets/WidgetConsole/WidgetConsole';
import ProtectedRoute from '@/components/shared/ProtectedRoute/ProtectedRoute';
import { About } from '@/pages/About/About';
import { LeaderboardPage } from '@/pages/LeaderboardPage/LeaderboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { MinimalLayout } from '@components/layouts/MinimalLayout/MinimalLayout';
import { lazy } from 'react';
import { ROUTE_PATHS } from './routePaths';
import { DashboardPage } from '@/pages/DashboardPage/DashboardPage';
import { HomePage } from '@/pages/HomePage/HomePage';

const LoginPage = lazy(() => import('@/components/features/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/components/features/auth/RegisterPage'));
const StackWidget = lazy(() => import('@components/features/widgets/Stack/Stack'));
const LibraryPage = lazy(() => import('@pages/LibraryPage/LibraryPage'));
const FillBlanksWidget = lazy(() => import('@components/features/widgets/FillBlanks/WidgetFillBlanks'))

export const appRoutes = [
  {
    path: '/',
    element: <MinimalLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NotFoundPage /> },
      { path: ROUTE_PATHS.REGISTER, element: <RegisterPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTE_PATHS.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTE_PATHS.ABOUT, element: <About /> },
      { path: ROUTE_PATHS.LIBRARY, element: <LibraryPage /> },
      { path: ROUTE_PATHS.WIDGET_CONSOLE, element: <WidgetConsole /> },
      { path: ROUTE_PATHS.STACK_WIDGET, element: <StackWidget /> },
      { path: ROUTE_PATHS.FILL_BLANKS_WIDGET, element: <FillBlanksWidget /> },
      { path: ROUTE_PATHS.LEADERBOARD_PAGE, element: <LeaderboardPage /> },
      { path: ROUTE_PATHS.ACHIEVEMENTS, element: <p>Achievements Page</p> },
    ],
  },
];
