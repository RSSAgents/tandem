import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { WidgetConsole } from '@/components/features/widgets/WidgetConsole/WidgetConsole';
import { ROUTE_PATHS } from './routePaths';

export const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <p>HomePage</p> },
      { path: ROUTE_PATHS.LOGIN, element: <p>LoginPage</p> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NotFoundPage /> },
      { path: ROUTE_PATHS.WIDGET_CONSOLE, element: <WidgetConsole /> },
    ],
  },
];
