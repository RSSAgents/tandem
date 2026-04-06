# Self-Assessment: Project Frontend Development

**Студент:** 27moon

---

## 🐝 Key Feature Components

### 1. Widget "This" Quiz
Интерактивный виджет для отработки контекста `this` в JavaScript.

Квиз: загрузка задач, ответы, переходы.
Система проверки ответов и динамическое отображение объяснений.
Взаимодействие: (answer → feedback → next).

### 2. Global i18n & Theme System
Система приложения, обеспечивающая масштабируемость.
- **i18n:** конфигурация `i18next` с неймспейсами, детектом языка и типизацией.
Интерфейс  - в JSON файлах.
Виджеты - формат LocalizedString.
- **Theming:** Централизованная система тем через Mantine + CSS Variables Resolver.
Поддержка Light / Dark режимов на уровне токенов.

---

## 🌻 Подсчет баллов


| Категория | Фича |  | Баллы |
| :--- | :--- | :--- | :--- |
| **My Components** | **Complex Component** | `WidgetThis` https://github.com/RSSAgents/tandem/pull/203| +25 |
| | **Rich UI Screen** | `DashboardPage` (Sidebar + Main Layout + Dashboard) https://github.com/RSSAgents/tandem/pull/164 https://github.com/RSSAgents/tandem/pull/138 | +20 |
| **UI & Interaction**| **i18n** | Реализация системы локализации https://github.com/RSSAgents/tandem/pull/96 | +10 |
|| **Theme Switcher**| Переключение тем (Light/Dark) - Mantine| +10 |
| **Architecture** | **Design Patterns** | Явное и обоснованное применение паттернов в коде | +10 |
| **Frameworks** | **React** | Использование библиотеки React | +5 |
| **Quality** | **Unit Tests (Full)** | Покрытие тестами ключевой логики и утилит (>50%) | +20 |

**ИТОГО: 100 баллов**

---

## ➕ Additional Contribution:
### 🏗 Design System

Спроектирована и внедрена единая дизайн-система приложения на базе Mantine.

Реализован централизованный слой конфигурации (MantineProviderWrapper), который управляет:

темами (Light / Dark),

цветовыми токенами,

типографикой,

системой отступов и радиусов.

Расширена стандартная тема Mantine: добавлены кастомные токены и унифицированы стили для всех компонентов проекта.

Обеспечена консистентность UI между страницами за счёт отказа от «произвольных значений» в пользу системных токенов.

https://github.com/RSSAgents/tandem/pull/115
https://github.com/RSSAgents/tandem/pull/99
https://github.com/RSSAgents/tandem/pull/51

### 🎨 Product Thinking & UI Design

Визуальный концепт ключевых экранов: Dashboard, Login, 404, About Us.

Формирование Sidebar как центра пользовательского контекста (прогресс, статус, навигация).


### 🌍 Internationalization (i18n)

Спроектирована гибкая система локализации, разделённая на два уровня:

UI-интерфейс (через i18next и namespace-based JSON),

контент виджетов (через типизированный LocalizedString).

Реализованы:

детект языка,

fallback-логика,

сохранение пользовательского выбора.

Интегрирована типизация переводов через TypeScript.

Добавлены утилиты (getLocalizedString, useWidgetTranslation), упрощающие работу с мультиязычным контентом.
