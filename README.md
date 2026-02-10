# RS JS/FE Final Project: Tandem

**Tandem** is an interactive platform designed to help developers prepare for technical interviews and practice hard skills (JavaScript, TypeScript, Algorithms) through quizzes and coding challenges.

## 👥 Team - RSSAgents

This project was developed by the RSSAgents team as part of the RS School JS/FE course:

| Role | Name | GitHub |

| **Team Lead - Mentor** | Shakhzod |(https://github.com/Shakhzod235) |
| **Mentor** | Diana |(https://github.com/bt-diana) |
| **Developer** | Fayzullo | (https://github.com/Fayzullo05) |
| **Developer** | Ilia | (https://github.com/D15ND) |
| **Developer** | Margarita| (https://github.com/solarsungai) |
| **Developer** | Marta| (https://github.com/27moon) |
| **Developer** | Vika| (https://github.com/oneilcode) |

## 🏗️ Tech Stack

| **Frontend** | React, TypeScript |
| **State Management** | Redux Toolkit |
| **Backend** | Node.js, Fastify |
| **Database & Auth** | Firebase / Supabase |
| **Build Tool** | Vite |
| **Code Quality** | ESLint, Prettier, Husky |
| **Testing** | Unit tests (Vitest), End-to-end tests (Cypress) |
| **CI/CD** | GitHub Actions (Dev → Staging, Main → Production) |

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

1.  **Install Node.js** if you haven't already
2.  **Clone the project repository** to your local machine (https://github.com/RSSAgents/final-project.git)
3.  **Go to folder final-project** - cd final-project
4.  **Install all dependencies:** - npm install (npm i)
5.  **Create a new branch** for your feature development:

        git checkout development
        git pull origin development
        git checkout -b feature/your-feature-name (or fix/your-feature-name)

    --
    ❗❗❗ _Always create feature/fix branches from the `development` branch, not from `main`_.

## 🤝 Team Workflow & Branch Strategy (Development-first)

We follow a Git Flow-inspired model:

- `main` – production-ready releases.
- `development` – integration branch for completed features.
- `feature/*` – new feature branches from `development` branch (e.g., `feature/auth-page`).
- `fix/*` – bug fixes from `development` branch (e.g., `fix/header-bug`)

All changes are merged into `development` via **Pull Requests**, which require at least one **approval from another team member** (or mentor) and passing CI checks. This ensures code review and collective ownership.

❗❗❗ Merging into `main`: Only permitted when the application is release-ready.
❗❗❗ No direct pushes to `development` branch. PR → review → merge (PR can only be merged when all tests pass successfully.)
❗❗❗ Do not delete feature branches after merge — we keep them for history tracking.

## 👆 Commit Requirements

We follow the RS School Conventional Commits specification.

- The commit type MUST BE in lowercase only (init, feat, fix, refactor, docs etc.)
- Present tense ("add feature" not "added feature") should be used.
- Imperative mood ("move cursor to ..." not "moves cursor to ..." should be used).

📚 More information and examples here: https://rs.school/docs/en/git-convention

## 📂 Project Structure

Will be added late (добавлю позже)

## 📈 Task Tracking

- Development progress is managed via [GitHub Projects](https://github.com/orgs/RSSAgents/projects/1/views/1).
- Development Diary - https://github.com/rolling-scopes-school/tasks/blob/master/stage2/tasks/rs-tandem/DEVELOPMENT_DIARY.md
