import { ROUTE_PATHS } from '@/routes/routePaths';

export const DASHBOARD_WIDGETS = [
  {
    id: 'js-exec',
    title: 'widgets.js_execution.title',
    description: 'widgets.js_execution.description',
    path: ROUTE_PATHS.WIDGET_CONSOLE,
  },
  // {
  //   id: 'js-this-quiz',
  //   title: 'widgets.this_quiz.title',
  //   description: 'widgets.this_quiz.description',
  //   path: ROUTE_PATHS.WIDGET_THIS_QUIZ,
  // },
] as const;

export const getCompletedIds = () => [] as string[];
export const getUserName = () => 'Alex';
