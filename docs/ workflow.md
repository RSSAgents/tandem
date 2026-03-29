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
