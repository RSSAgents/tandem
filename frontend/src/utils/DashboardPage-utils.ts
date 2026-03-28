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
  {
    id: 'js-this-quiz',
    title: 'widgets.this_quiz.title',
    description: 'widgets.this_quiz.description',
    path: ROUTE_PATHS.WIDGET_THIS_QUIZ,
  },
  {
    id: 'ai-interviewer',
    title: 'widgets.ai_interviewer.title',
    description: 'widgets.ai_interviewer.description',
    path: ROUTE_PATHS.AI_TANDEM,
  },
  {
    id: 'fill_blanks',
    title: 'widgets.fill_blanks.title',
    description: 'widgets.fill_blanks.description',
    path: ROUTE_PATHS.FILL_BLANKS_WIDGET,
  },
] as const;

export const getCompletedIds = () => [] as string[];
export const getUserName = () => 'Alex';
