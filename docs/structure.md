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
