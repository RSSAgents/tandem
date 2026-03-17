export const LIBRARY_ACCORDION = [
  {
    category: 'JavaScript Fundamentals',
    items: [
      {
        value: 'Modules in JavaScript',
        description:
          'Модули обеспечивают инкапсуляцию и чистоту глобального пространства. Типы: CommonJS (require/exports), AMD (асинхронный), UMD (универсальный), ES6 (import/export). Синтаксис: export default для одного экспорта, именованные экспорты и псевдонимы as. Dynamic imports: import() возвращает промис, позволяя загружать код по требованию.',
      },
      {
        value: 'Functionals Patterns',
        description:
          'Callbacks & IIFE: Callbacks — функции в аргументах; IIFE (Immediately Invoked Function Expression) — защита области видимости. Callback Hell: вложенность, затрудняющая чтение. Currying: преобразование f(a, b) в f(a)(b). Частичное применение: фиксация части аргументов функции.',
      },
      {
        value: 'OOP & Patterns',
        description:
          'new: создает объект, связывает с прототипом. Классы: синтаксический сахар над прототипами. super(): вызывает конструктор родителя. Доступ: публичные поля, приватные (через #) и статические (принадлежат классу).',
      },
      {
        value: 'Prototypal Inheritance',
        description:
          'Наследование через [[Prototype]]. Свойство __proto__ указывает на объект-прототип, а prototype используется в функциях-конструкторах. Object.create(proto) позволяет создать объект с заданным прототипом напрямую.',
      },
    ],
  },
  {
    category: 'Data Structures & Algorithms',
    items: [
      {
        value: 'Stack (LIFO)',
        description:
          'Структура данных "стек" работает по принципу LIFO (Last In, First Out) — последним пришёл, первым вышел. Основные операции: push (добавить в конец), pop (удалить с конца). Примеры: стек вызовов функций (call stack), история браузера (назад), операция Undo в редакторах.',
      },
      {
        value: 'Queue (FIFO)',
        description:
          'Структура данных "очередь" работает по принципу FIFO (First In, First Out) — первым пришёл, первым вышел. Основные операции: enqueue (добавить в конец), dequeue (удалить из начала). Примеры: очередь задач (task queue), обработка событий, печать документов.',
      },
      {
        value: 'Deque & Priority Queue',
        description:
          'Deque (double-ended queue) — двусторонняя очередь, позволяет добавлять и удалять элементы с обоих концов. Priority Queue — очередь с приоритетом: элементы с более высоким приоритетом обрабатываются раньше независимо от времени добавления (реализуется через heap).',
      },
    ],
  },
  {
    category: 'ECMAScript Advanced',
    items: [
      {
        value: 'Data Types: Set, Map, WeakSet, WeakMap',
        description:
          'Map/Set поддерживают любые ключи и уникальность. WeakMap/WeakSet хранят только объекты и не препятствуют сборке мусора (GC), что важно для предотвращения утечек памяти.',
      },
      {
        value: 'Error Handling',
        description:
          'Конструкция try..catch..finally для синхронного кода. Создание кастомных ошибок через наследование от Error (например, class ValidationError extends Error).',
      },
      {
        value: 'Asynchrony & Garbage Collection',
        description:
          'Event Loop: управление Call Stack, Microtasks (Promises) и Macrotasks (Timers). Garbage Collection: алгоритм "Mark-and-Sweep" для удаления недостижимых объектов.',
      },
    ],
  },
  {
    category: 'JavaScript in Browser',
    items: [
      {
        value: 'Window Object & Lifecycle',
        description:
          'Window: Location (URL), History (навигация), User Agent (данные о браузере). Lifecycle: DOMContentLoaded (DOM готов), load (все ресурсы загружены). Rendering: Parsing -> Reflow (геометрия) -> Repaint (отрисовка) -> Composite.',
      },
      {
        value: 'Network & Timers',
        description:
          'Requests: Fetch (Promise-based) vs устаревший XHR. Timers: setTimeout добавляет задачу в очередь макрозадач; requestAnimationFrame синхронизируется с обновлением экрана (обычно 60fps) для плавной анимации.',
      },
    ],
  },
  {
    category: 'Architecture & Methodology',
    items: [
      {
        value: 'Design Patterns & SOLID',
        description:
          'Patterns: Порождающие (Singleton, Factory), Структурные (Adapter, Decorator), Поведенческие (Observer, Strategy). SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
      },
      {
        value: 'Methodologies & Testing',
        description:
          'Methodologies: Agile (итеративность), Scrum (спринты), Kanban (поток), Waterfall (каскад). Testing: Unit (функции), Integration (связи), E2E (путь пользователя). TDD — тест перед кодом, BDD — тесты как спецификация поведения.',
      },
    ],
  },
  {
    category: 'Security & Protocols',
    items: [
      {
        value: 'Web Protocols & REST',
        description:
          'HTTP/HTTPS: HTTPS = HTTP + SSL/TLS. REST: архитектурный стиль (Stateless, Cacheable, Methods: GET, POST, PUT, DELETE). Статус коды: 2xx (Success), 4xx (Client error), 5xx (Server error).',
      },
      {
        value: 'Security Knowledge',
        description:
          'CORS: политика браузера для запросов между разными доменами. XSS: внедрение вредоносного скрипта. OWASP Top 10: список критических уязвимостей. Auth: JWT (токен в заголовке), OAuth (авторизация через сторонние сервисы).',
      },
    ],
  },
];
