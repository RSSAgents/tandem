import { WidgetConsole } from '@/components/features/widgets/WidgetConsole/WidgetConsole';
import ProtectedRoute from '@/components/shared/ProtectedRoute/ProtectedRoute';
import { About } from '@/pages/About/About';
import { DashboardPage } from '@/pages/DashboardPage/DashboardPage';
import { HomePage } from '@/pages/HomePage/HomePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage/LeaderboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { MinimalLayout } from '@components/layouts/MinimalLayout/MinimalLayout';
import { lazy } from 'react';
import { ROUTE_PATHS } from './routePaths';

const LoginPage = lazy(() => import('@/components/features/auth/LoginPage'));
const StackWidget = lazy(() => import('@components/features/widgets/Stack/Stack'));
const LibraryPage = lazy(() => import('@pages/LibraryPage/LibraryPage'));
const FillBlanksWidget = lazy(
  () => import('@components/features/widgets/FillBlanks/WidgetFillBlanks'),
);

export const appRoutes = [
  {
    path: '/',
    element: <MinimalLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.ABOUT, element: <About /> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_PATHS.DASHBOARD,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATHS.LIBRARY,
        element: (
          <ProtectedRoute>
            <LibraryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATHS.WIDGET_CONSOLE,
        element: (
          <ProtectedRoute>
            <WidgetConsole />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATHS.STACK_WIDGET,
        element: (
          <ProtectedRoute>
            <StackWidget />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATHS.FILL_BLANKS_WIDGET,
        element: (
          <ProtectedRoute>
            <FillBlanksWidget />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATHS.LEADERBOARD_PAGE,
        element: (
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATHS.ACHIEVEMENTS,
        element: (
          <ProtectedRoute>
            <p>Achievements Page</p>
          </ProtectedRoute>
        ),
      },
    ],
  },
];
