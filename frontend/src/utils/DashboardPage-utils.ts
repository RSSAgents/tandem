import { ROUTE_PATHS } from '@/routes/routePaths';

export const DASHBOARD_WIDGETS = [
  {
    id: 'js-exec',
    title: 'widgets.js_execution.title',
    description: 'widgets.js_execution.description',
    path: ROUTE_PATHS.WIDGET_CONSOLE,
  },
  {
    id: 'js_stack',
    title: 'widgets.js_stack.title',
    description: 'widgets.js_stack.description',
    path: ROUTE_PATHS.STACK_WIDGET,
  },
] as const;

export const getCompletedIds = () => [] as string[];
export const getUserName = () => 'Alex';
