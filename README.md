# RS JS/FE Final Project: Tandem - SPA Application

**Tandem** is an interactive platform designed to help developers prepare for technical interviews and practice hard skills (JavaScript, TypeScript, Algorithms) through quizzes and coding challenges.

## 👥 Team - RSSAgents

This project was developed by the RSSAgents team as part of the RS School JS/FE course:

| Role                   | Name      | GitHub                           |
| ---------------------- | --------- | -------------------------------- |
| **Team Lead - Mentor** | Shakhzod  | (https://github.com/Shakhzod235) |
| **Mentor**             | Diana     | (https://github.com/bt-diana)    |
| **Mentor**             | Khayitbek | (https://github.com/Khayitbek03) |
| **Mentor**             | Daria     | (https://github.com/dashque)     |
| **Developer**          | Fayzullo  | (https://github.com/Fayzullo05)  |
| **Developer**          | Ilia      | (https://github.com/D15ND)       |
| **Developer**          | Margarita | (https://github.com/solarsungai) |
| **Developer**          | Marta     | (https://github.com/27moon)      |
| **Developer**          | Vika      | (https://github.com/oneilcode)   |

## 🏗️ Tech Stack

- **Frontend** | React, TypeScript
- **Design System** | Mantine
- **Routing** | React Router DOM
- **Forms** | React Hook Form
- **State Management** | Redux Toolkit
- **Backend** | Node.js, Fastify
- **Database & Auth** | Firebase / Supabase
- **Build Tool** | Vite
- **Code Quality** | ESLint, Prettier, Husky
- **Testing** | Unit tests (React Testing Library), End-to-end tests (Cypress), Vitest
- **CI/CD** | GitHub Actions (Dev → Staging, Main → Production)
- **API Client** | Axios

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

1.  Install Node.js

2.  Clone the project repository to your local machine

        https://github.com/RSSAgents/tandem.git

3.  Go to folder final-project

        cd tandem

4.  Install all dependencies:

        npm install (npm i)

5.  Create a new branch for your feature development:

        git checkout development
        git pull origin development
        git checkout -b feature/your-feature-name (or fix/your-fix-name)

    **feature/fix branches can be created only from the `development` branch**

## 🤝 Team Workflow & Branch Strategy (Development-first)

We follow a Git Flow-inspired model:

- `main` – production-ready releases.
- `development` – integration branch for completed features.
- `feature/*` – new feature branches from `development` branch (e.g., `feature/auth-page`).
- `fix/*` – bug fixes from `development` branch (e.g., `fix/header-bug`)
- `docs/*` – documentation updates only (e.g., `docs/update-readme`)
- `chore/*` – maintenance tasks, no functionality changes (e.g., `chore/package-updates`)
- `refactor/*` - code improvements without functional changes or bug fixes (e.g., `refactor/rename-variables`).

All changes are merged into `development` via **Pull Requests**, which require at least 3 team members and 1 mentor and passing CI checks. This ensures code review and collective ownership.

**main — merge only when release-ready, exception - development diary**

**development — no direct pushes; PR → review → merge (all tests must pass)**

**feature branches — do not delete after merge (kept for history tracking)**

## 👆 Commit Requirements

We follow the RS School Conventional Commits specification.

- The commit type MUST BE in lowercase only (init, feat, fix, refactor, docs etc.)
- Present tense ("add feature" not "added feature") should be used.
- Imperative mood ("move cursor to ..." not "moves cursor to ..." should be used).

📚 More information and examples here: https://rs.school/docs/en/git-convention

## 📂 Project Structure

```
src/
├── api/                             # API Service Layer
│   ├── client.ts                    # Axios instance with base configuration
│   ├── auth.api.ts                  # login, register, logout
│   ├── dashboard.api.ts             # getStats, getHistory
│   ├── widgets.api.ts               # getWidgetById, validateAnswer
│   └── ai.api.ts                    # sendMessage, startSession
│
├── components/
│   ├── ui/                          # Reusable UI components
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.module.css
│   │   │   └── Input.test.tsx
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.test.tsx
│   │   └── Card/
│   │       ├── Card.tsx
│   │       ├── Card.module.css
│   │       └── Card.test.tsx
│   │
│   ├── layouts/                     # Layout components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.module.css
│   │   │   └── Header.test.tsx
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Sidebar.module.css
│   │   │   └── Sidebar.test.tsx
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   ├── Footer.module.css
│   │   │   └── Footer.test.tsx
│   │   ├── MainLayout/
│   │   │   └── MainLayout.tsx       # Header, sidebar and footer
│   │   └── MinimalLayout/
│   │       └── MinimalLayout.tsx    # Header and footer
│   │
│   ├── features/                    # Feature components
│   │   ├── auth/                    # LoginForm, RegisterForm
│   │   ├── dashboard/               # StatsCard, HistoryList
│   │   ├── widgets/                 # WidgetCard, AnswerForm
│   │   └── chat/                    # ChatWindow, MessageBubble
│   │
│   └── shared/                      # Shared components
│       ├── ErrorBoundary.tsx
│       └── Loading.tsx
│
├── i18n/                            # Internationalization
│   └── locales/                     # Translation files for supported languages
│       ├── en/
│       └── ru/
│
├── pages/                           # Pages
│   ├── DashboardPage/               # Uses MainLayout
│   │   ├── DashboardPage.tsx
│   │   └── DashboardPage.module.css
│   ├── LandingPage/                 # Uses MinimalLayout / MainLayout
│   │   ├── LandingPage.tsx
│   │   └── LandingPage.module.css
│   ├── About/                       # Uses MinimalLayout
│   │   ├── About.tsx
│   │   ├── About.test.tsx
│   │   └── About.module.css
│   └── NotFoundPage/                # Uses MinimalLayout
│       ├── NotFoundPage.tsx
│       ├── NotFoundPage.test.tsx
│       └── NotFoundPage.module.css
│
├── hooks/                           # Custom hooks
│   ├── useAuth.ts                   # Authentication logic
│   ├── useDashboard.ts              # Dashboard data loading
│   └── useChat.ts                   # Chat management

├── store/                           # RTK store
│   ├── authStore.ts                 # User state
│   ├── dashboardStore.ts            # Dashboard cache
│   └── chatStore.ts                 # Chat history
│
├── types/                           # TypeScript types
│   ├── api.types.ts                 # API response types
│   ├── models.types.ts              # Data models (User, Widget)
│   └── common.types.ts              # Common types
│
├── utils/                           # Utilities
│   ├── validation.ts                # Form validation
│   └── formatters.ts                # Data formatting
│
├── constants/                       # Constants
│   └── api.ts                       # API constants
│
└── routes/                          # React Router
    ├── routePaths.ts                # Route paths
    ├── routeConfig.tsx              # Route configuration
    └── index.ts                     # Routes export
```

## 📈 Task Tracking

- Development progress is managed via [GitHub Projects](https://github.com/orgs/RSSAgents/projects/1/views/1).
- Development Diary - https://github.com/rolling-scopes-school/tasks/blob/master/stage2/tasks/rs-tandem/DEVELOPMENT_DIARY.md

## 🚀 Deployment

For deployment, the project will use Vercel.

🔗 **Ссылка на проект:** [Tandem](https://tandem-three.vercel.app/)
