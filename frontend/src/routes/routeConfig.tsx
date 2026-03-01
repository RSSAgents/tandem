import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { MinimalLayout } from '../components/layouts/MinimalLayout/MinimalLayout';
import { ROUTE_PATHS } from './routePaths';

export const appRoutes = [
  {
    path: '/',
    element: <MinimalLayout />,
    children: [
      { index: true, element: <p>HomePage</p> },
      { path: ROUTE_PATHS.LOGIN, element: <p>LoginPage</p> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <p>Not Found</p> },
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
