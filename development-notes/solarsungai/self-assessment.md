# Self-Assessment - Solarsungai

## Таблица фич

| # | Категория | Фича | Баллы | Ссылка на код / PR |
|---|-----------|------|-------|--------------------|
| 1 | My Components | **Complex Component:** AI Agent Chat UI - интерфейс с тремя режимами (Interviewer / Teacher / AI Battle), таймером Stress Mode, прогресс-баром, автопрокруткой | +25 | [AiAgentPage.tsx](../../frontend/src/pages/AiAgentPage/AiAgentPage.tsx) |
| 2 | My Components | **Complex Component:** Code Runner - встроенный редактор на Sandpack, изолированное выполнение кода в iframe через base64-кодирование, перехват `console.log/error/warn` | +25 | [CodeRunnerModal.tsx](../../frontend/src/components/AiAgentPage/CodeRunnerModal.tsx) |
| 3 | My Components | **Rich UI Screen:** AI Agent Page - сложный экран с многоуровневым состоянием (темы, треды, роли, режимы, таймер, мобильный/планшетный layout, история) | +20 | [AiAgentPage.tsx](../../frontend/src/pages/AiAgentPage/AiAgentPage.tsx) |
| 4 | My Components | **Сложный бэкенд-сервис:** AI Context Manager — управление системными промптами, автоматическая смена модели при исчерпании квоты, стриминг через SSE, сборка полного текста до сохранения в БД | +30 | [groqApiService.ts](../../frontend/src/api/groqApiService.ts), [groq.ts](../../frontend/api/groq.ts) |
| 5 | Backend & Data | **BaaS Auth:** Supabase Auth - `signIn`, `signUp` с проверкой уникальности, `signOut`, `resetPasswordForEmail`, `AuthProvider` с `onAuthStateChange`, `ProtectedRoute` | +15 | [auth.api.ts](../../frontend/src/api/auth.api.ts), [AuthProvider.tsx](../../frontend/src/providers/AuthProvider.tsx) |
| 6 | Backend & Data | **BaaS CRUD:** Supabase DB - таблицы `profiles`, `ai_topic_scores`, `ai_message_history`, `widget_scores`; `upsert` очков, сохранение истории переписки, RPC `check_registration_available` | +15 | [aiAgent.api.ts](../../frontend/src/api/aiAgent.api.ts) |
| 7 | Backend & Data | **Real-time:** SSE-стриминг ответов LLM через `ReadableStream` + `requestAnimationFrame` для типизированной анимации печати | +20 | [groqApiService.ts](../../frontend/src/api/groqApiService.ts) |
| 8 | AI | **AI Chat UI:** интерфейс чата с тремя независимыми тредами (interviewer / teacher / ai-interview), отправкой промпта и отображением ответа LLM | +20 | [InterviewerSection.tsx](../../frontend/src/components/AiAgentPage/InterviewerSection.tsx), [TeacherSection.tsx](../../frontend/src/components/AiAgentPage/TeacherSection.tsx) |
| 9 | AI | **AI Streaming:** посимвольный вывод ответа через SSE + анимация печати с `TYPING_CHARS_PER_FRAME` | +10 | [groqApiService.ts](../../frontend/src/api/groqApiService.ts), [useAiInterviewLogic.ts](../../frontend/src/hooks/useAiInterviewLogic.ts) |
| 10 | AI | **Raw LLM API:** интеграция Groq без SDK - `native fetch` + `ReadableStream`, разбор SSE-чанков вручную, Edge Function (`runtime: 'edge'`) как прокси | +10 | [groq.ts](../../frontend/api/groq.ts) |
| 11 | UI & Interaction | **Code Editor:** Sandpack (CodeSandbox) в модальном окне с поддержкой JS/TS, вывод консоли, кнопки Run / Clear | +15 | [CodeRunnerModal.tsx](../../frontend/src/components/AiAgentPage/CodeRunnerModal.tsx) |
| 12 | UI & Interaction | **i18n:** полная локализация AI-агента на EN/RU через i18next; все системные промпты, сообщения об ошибках, стартовые сообщения - в JSON-локалях с параметрами | +10 | [src/i18n/locales/](../../frontend/src/i18n/locales/) |
| 13 | UI & Interaction | **Theme Switcher:** поддержка Light/Dark темы в AI-агенте через Mantine `useMantineColorScheme` | +10 | [AiAgentPage.module.css](../../frontend/src/pages/AiAgentPage/AiAgentPage.module.css) |
| 14 | UI & Interaction | **Responsive:** адаптация AI Agent под мобильные (320px+) и планшетные разрешения; бургер-меню через CSS-переменные AppShell на `body.ai-agent-page` | +5 | [AiAgentPage.tsx](../../frontend/src/pages/AiAgentPage/AiAgentPage.tsx) |
| 15 | Quality | **Unit Tests (Basic):** покрытие API-слоя AI-агента - `groqApiService.test.tsx` (7 тестов: нормальный ответ, пустой choices, ошибка API, SSE-стриминг, chunked-буфер), `aiAgent.api.test.tsx` (loadAllScores, saveTopicScore, saveThreadHistory, clearThreadHistory) | +10 | [tests/](../../frontend/src/api/tests/) |
| 16 | DevOps & Role | **Auto-deploy:** деплой на Vercel, `vercel.json` с rewrites для SPA, Edge Function для Groq API-прокси | +5 | [vercel.json](../../frontend/vercel.json), [groq.ts](../../frontend/api/groq.ts) |
| 17 | DevOps & Role | **Prompt Engineering:** документирование 3+ итераций промптов - (1) gentle/strict роли с разным тоном, (2) stress-mode с таймером и финальным баллом `FINAL_SCORE:N`, (3) AI Battle с форматом `Interviewer:`/`Candidate:`, (4) параметры `temperature`/`max_tokens` под каждый режим | +15 | [aiAgentConstants.ts](../../frontend/src/constants/aiAgentConstants.ts), [locales](../../frontend/src/i18n/locales/) |
| 18 | Architecture | **API Layer:** изоляция всех запросов в `src/api/` (`aiAgent.api.ts`, `auth.api.ts`, `groqApiService.ts`) - UI компоненты не обращаются к Supabase напрямую | +10 | [src/api/](../../frontend/src/api/) |
| 19 | Frameworks | **React** | +5 | — |

**Итого заявлено: 295 баллов → зачет: 250 баллов** (cap)

---

## Описание моей работы

### Инструменты и технологии

Работала с **React 19 + TypeScript** (strict mode), **Mantine 8**, **Supabase** (PostgreSQL + Auth), **Groq API** (LLaMA / Gemma модели), **Vite**, **Vitest**, **i18next**, **Sandpack** (CodeSandbox), **Vercel Edge Functions**.

---

### Что именно я сделала

#### CI/CD и деплой (февраль)

Начала с настройки инфраструктуры: создала **CI/CD** workflow на github, настроила **Vercel** для автодеплоя, разобралась с тем, как дать доступ команде через общий аккаунт. Записала видео с демо CI/CD конфигурации ([ссылка](https://youtu.be/JMJYCz-o8_o)).
Разобралась с тем, почему Vercel не подходил (ограничение на 2 участника в бесплатном плане), рассмаотрела вариант с cloudflare pages, но в итоге нашлось решение с общим email - остались на Vercel.

#### About Page (март, начало)

Сделала страницу About. Тут начала знакомиться с React и Mantine, попробовала верстку с использованием этих технологий.

#### AI Agent — проектирование (февраль–март)

Долго обдумывала архитектуру и UX: как хранить историю, какой контекст передавать в каждом запросе, какие именно экраны и фичи сделать для удобства пользователя.
Изучила форматы SSE-ответов Groq API, чтобы реализовать стриминг без SDK.
Выбрала **Groq** вместо локальной LLM — осознанный компромисс: бесплатный API с быстрыми моделями против сложной инфраструктуры для локального деплоя.

#### AI Agent — реализация (март)

**Что сделано:**

- Вся логика `useAiInterviewLogic.ts` - отправка сообщений, формирование системных промптов, режимы Interviewer / Teacher / AI Battle, парсинг `Interviewer:`/`Candidate:` меток, форматирование `FINAL_SCORE:N` в читаемый текст, логика `isWaitingForRestartConfirm`.
- `useAiAgentState.ts` - централизованное состояние: треды, тема, роль, режим, таймер, очки.
- `useThreadHistory.ts` - загрузка истории из Supabase при смене темы, флаг `isLoadingHistory`.
- `groqApiService.ts` - два варианта запроса (`callGroqAPI` / `callGroqAPIStream`), ручной разбор SSE-чанков, накопление `fullText` для сохранения полного ответа, автоматический fallback между моделями.
- `api/groq.ts` - Edge Function на Vercel: прокси к Groq API, поддержка стрима и обычного запроса, изоляция API-ключа на сервере.
- `CodeRunnerModal.tsx` - Sandpack редактор + iframe-sandbox с перехватом `console.*`, base64-кодирование кода перед выполнением чтобы не ломались template literals.

**Сложные моменты:**

- **Стриминг**: SSE-чанки приходят произвольными кусками; пришлось реализовать буфер `buffer += decoder.decode(value, { stream: true })` и сплит по `\n`, чтобы не ломать JSON на границах чанков.
- **Сохранение полного ответа**: потоковый ответ разбивался на части, а в Supabase сохранялся только первый фрагмент. Решение: `callGroqAPIStream` аккумулирует весь текст в `fullText`, `saveThreadHistory` вызывается через `setTimeout(0)`.
- **Таймер Stress Mode**: нужно было запускать таймер только после того как интервьюер задал вопрос и останавливать при смене режима или получении ответа.
- **AI Battle парсинг**: нельзя было полагаться на разделитель `|||` — LLM не соблюдал формат стабильно. Перешла на парсинг по меткам `Interviewer:` / `Candidate:` и обновила промт, чтобы модель всегда их использовала.

#### Supabase — база данных (март, конец)

Взяла на себя бэкенд, когда стало ясно, что другой участник не успевает.
Спроектировала структуру: единая таблица `questions` с полем `payload JSONB` вместо отдельных таблиц под каждый виджет - гибко, не надо менять схему при добавлении нового виджета.
View `questions_public` скрывает `correctAnswer` - правильный ответ никогда не покидает базу. Проверка через серверную функцию возвращает только `true`/`false`.
Для локализации вопросов виджетов использовала уже готовую утилиту `getLocalizedString`: текст и варианты ответов хранятся как `{ "ru": "...", "en": "..." }` прямо в JSONB payload.

#### Supabase — авторизация (март–апрель)

`signUp` с проверкой уникальности email и username через RPC-функцию `check_registration_available` с `SECURITY DEFINER` — чтобы не расширять RLS-политику.
Триггер `on_auth_user_created` автоматически создаёт запись в `profiles` после регистрации. Обработка дублей: если email уже занят - предложение сбросить пароль через `resetPasswordForEmail`.
`AuthProvider` слушает `onAuthStateChange` - сессия восстанавливается автоматически после перезагрузки страницы.
Все ошибки (дубль email, дубль username, неверный пароль) и сообщения об успехе полностью локализованы на EN/RU.

#### Унификация дизайна

Сделала рефакторинг дизайна сайта, чтобы соблюсти единый стиль. 

---

## Мои два личных Feature Component

### 1. AI Agent - Chat UI + Interview Logic

**Что это:** полноценный AI-ассистент для подготовки к техническому интервью с тремя независимыми режимами работы.

**Что реализовано:**

- Три режима чата в одном экране: **Interviewer** (AI задаёт вопросы и оценивает ответы), **Teacher** (свободный вопрос-ответ с объяснениями), **AI Battle** (AI симулирует диалог между кандидатом и интервьюером).
- **Stress Mode**: на ответ пользователю дается только 90 секунд.
- **Роли**: Gentle и Strict - разные системные промпты, разный тон, разная строгость оценки.
- **Финальный балл**: `FINAL_SCORE:N` в ответе LLM парсится и форматируется в читаемый UI, после интервью предлагается начать новое.
- **Персистенция**: история каждого треда (topic + thread_type) сохраняется в таблицу `ai_message_history` и загружается при следующем визите.
- **Очки**: по итогам интервью балл сохраняется в `ai_topic_scores`, отображается в `TopicsPanel` рядом с темой.
- **Стриминг с анимацией печати**: `requestAnimationFrame` + `TYPING_CHARS_PER_FRAME` - ответ появляется постепенно, как в ChatGPT.
- **Полная локализация**: все системные промпты, стартовые сообщения, ошибки - в JSON-локалях, переключение EN/RU меняет и интерфейс, и инструкции для AI.

**Почему это сложный компонент:** это не просто чат-окно. Это state machine с 5+ независимыми состояниями, тремя параллельными тредами на одну тему, персистенцией в базу, стримингом, таймером и локализацией промптов.

**Ключевые файлы:** [AiAgentPage.tsx](../../frontend/src/pages/AiAgentPage/AiAgentPage.tsx), [useAiInterviewLogic.ts](../../frontend/src/hooks/useAiInterviewLogic.ts), [useAiAgentState.ts](../../frontend/src/hooks/useAiAgentState.ts), [groqApiService.ts](../../frontend/src/api/groqApiService.ts), [aiAgent.api.ts](../../frontend/src/api/aiAgent.api.ts)

---

### 2. Supabase - полная интеграция с базой данных

**Что это:** полный бэкенд-слой приложения на Supabase (PostgreSQL + Auth) без собственного сервера.

#### Схема базы данных и подключение

Спроектировала и создала структуру таблиц в Supabase Dashboard:

- `profiles` - профиль пользователя (username, email), создаtтся автоматически триггером `on_auth_user_created` после регистрации.
- `questions` - единая таблица для вопросов всех виджетов с полем `payload JSONB`. Вместо отдельной таблицы под каждый виджет - одна гибкая структура: при добавлении нового виджета схема не меняется.
- `questions_public` (View) - публичное представление таблицы `questions`, которое **скрывает поле `correctAnswer`**. Правильный ответ никогда не уходит на клиент.
- `ai_topic_scores` - баллы пользователя по темам AI-агента (`user_id`, `topic`, `score`).
- `ai_message_history` - история переписки AI-агента (`user_id`, `topic`, `thread_type`, `messages JSONB`).
- `widget_scores` - баллы по виджетам (`user_id`, `widget_type`, `score`, `max_score`).

Подключение к проекту - единый клиент через `createClient` в [`supabase.ts`](../../frontend/src/utils/supabase.ts), ключи вынесены в `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Все модули импортируют только этот инстанс - нет дублирования клиентов.

#### Загрузка вопросов и проверка ответов

Для каждого виджета - отдельный API-модуль в `src/api/`. Запросы читают только из View `questions_public` (без `correctAnswer`), проверка правильности - через RPC-функции на стороне базы:
- `getWidgetTasks()` — загружает вопросы виджета из `questions_public` по фильтру `type`.
- `check_console_answer(question_id, user_answer)` - RPC-функция, сравнивает ответ пользователя с `correctAnswer` из защищённой таблицы и возвращает только `{ isCorrect, score, explanation }`. Фронтенд не видит правильный ответ никогда.
- Текст вопросов и варианты ответов хранятся как `{ "ru": "...", "en": "..." }` прямо в JSONB payload - локализация на уровне данных через готовую утилиту `getLocalizedString`.

#### Сохранение и загрузка истории AI-агента

История каждого треда (тема + тип треда) сохраняется в `ai_message_history` и загружается при открытии диалога:
- `saveThreadHistory(topic, threadType, messages)` - `upsert` по ключу `user_id + topic + thread_type`; если запись уже есть — обновляется, не дублируется.
- `loadThreadHistory(topic, threadType)` - загружает массив сообщений при смене темы; в `useThreadHistory.ts` управляет флагом `isLoadingHistory`, чтобы не показывать старую историю во время загрузки.
- `clearThreadHistory(topic, threadType)` - удаляет историю конкретного треда при сбросе диалога.

#### Сохранение баллов

Единая таблица `widget_scores` для всех виджетов + отдельная `ai_topic_scores` для тем AI-агента:
- `saveTopicScore(topic, score)` - `upsert` по `user_id + topic`; обновляет лучший результат по теме.
- `saveAiAgentWidgetScore(totalScore, maxScore)` - сохраняет итоговый балл AI-агента в `widget_scores` с `widget_type: 'ai-agent'`.
- `saveStackScore(score)` - аналогично для виджета Stack в [`widgetStack.api.ts`](../../frontend/src/api/widgetStack.api.ts).
- Все `upsert` используют `onConflict` - нет дублирования строк, всегда актуальный результат.

#### Авторизация

- `signUp` с **предварительной проверкой уникальности** email и username через RPC-функцию `check_registration_available` (`SECURITY DEFINER`).
   Cтандартный `signUp` в Supabase при дублировании тихо отправляет повторное письмо без ошибки; RPC-функция проверяет `auth.users` и `profiles` до вызова `signUp`.
- Если email уже занят - вместо ошибки пользователь получает **предложение восстановить пароль** через `resetPasswordForEmail`.
- `AuthProvider` с `onAuthStateChange` - сессия восстанавливается после F5, logout обрабатывается везде.
- Все ошибки и сообщения об успехе **полностью локализованы** на EN/RU.
 
**Ключевые файлы:** [supabase.ts](../../frontend/src/utils/supabase.ts), [auth.api.ts](../../frontend/src/api/auth.api.ts), [aiAgent.api.ts](../../frontend/src/api/aiAgent.api.ts), [widgetConsole.api.ts](../../frontend/src/api/widgetConsole.api.ts), [widgetStack.api.ts](../../frontend/src/api/widgetStack.api.ts), [AuthProvider.tsx](../../frontend/src/providers/AuthProvider.tsx)

**PR link:** [Self Assessment PR](https://github.com/RSSAgents/tandem/pull/247)
