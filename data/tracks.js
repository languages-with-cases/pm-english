/* Track picker metadata and shared narrative openers. */
var TRACKS = [
  {
    "id": "product",
    "b": "Product",
    "name": "Product Manager English",
    "field": "product management",
    "company": "Northwind Bank",
    "short": [
      "Intern",
      "Associate PM",
      "PM",
      "Senior PM",
      "Group PM",
      "Head of Product",
      "CPO"
    ],
    "en": "Work through real product cases at Northwind Bank, a bank that moves fast into mobile banking. Prioritization, roadmaps, experiments, metrics, pricing and hard talks with stakeholders.",
    "ru": "Для продакт-менеджеров: приоритизация, роадмап, эксперименты, метрики, работа со стейкхолдерами. Путь от стажёра до Chief Product Officer."
  },
  {
    "id": "dev",
    "b": "Developer",
    "name": "Developer English",
    "field": "software development",
    "company": "Orbit",
    "short": [
      "Intern",
      "Junior",
      "Developer",
      "Senior",
      "Tech Lead",
      "Eng. Manager",
      "CTO"
    ],
    "en": "Join Orbit, a platform for online shops, and grow from intern to CTO. Code review, pull requests, estimates, bugs, incidents, security and working with product and design.",
    "ru": "Для разработчиков: код-ревью, пулл-реквесты, оценки сроков, баги и инциденты, безопасность, общение с продактами и командой. От стажёра до CTO."
  },
  {
    "id": "pm",
    "b": "Project",
    "name": "Project Manager English",
    "field": "project management",
    "company": "Atlas Digital",
    "short": [
      "Coordinator",
      "Junior PM",
      "PM",
      "Senior PM",
      "Program Mgr",
      "Head of Delivery",
      "COO"
    ],
    "en": "Run projects at Atlas Digital, an agency that builds websites and apps for clients. Kickoffs, scope, deadlines, risks, budgets, status reports and difficult client emails.",
    "ru": "Для проджект-менеджеров: клиенты, сроки, риски, бюджет, статус-репорты, сложные письма и созвоны. От координатора до COO."
  },
  {
    "id": "an",
    "b": "Analytics",
    "name": "Analytics English",
    "field": "product and data analytics",
    "company": "Pulse",
    "short": [
      "Intern",
      "Junior",
      "Product Analyst",
      "Senior",
      "Lead",
      "Head of Analytics",
      "CDO"
    ],
    "en": "Work with data at Pulse, a marketplace of local services. Metrics and definitions, SQL and dashboards, A/B tests, data quality and explaining numbers to people who are not analysts.",
    "ru": "Для продуктовых и дата-аналитиков: метрики, SQL, дашборды, A/B-тесты, качество данных, объяснение цифр команде. От стажёра до Chief Data Officer."
  },
  {
    "id": "ba",
    "b": "BA",
    "name": "Business Analyst English",
    "field": "business and systems analysis",
    "company": "Nordline Bank",
    "short": [
      "Trainee",
      "Junior BA",
      "BA",
      "Senior BA",
      "Lead SA",
      "Head of BA",
      "CDO"
    ],
    "en": "Analyze requirements at Nordline Bank, a regional bank going digital. Interviews, user stories, acceptance criteria, process diagrams and talks with developers, operations and compliance.",
    "ru": "Для бизнес- и системных аналитиков: интервью, требования, user stories, процессы, общение с разработчиками и риск-комплаенсом. От стажёра до Chief Digital Officer."
  }
];
var OPENERS_GEN = [
  {
    "en": "Your workday has just started, and your coffee is still hot.",
    "ru": "Рабочий день только начался, а кофе ещё горячий."
  },
  {
    "en": "It is a quiet afternoon at the office, and then your phone buzzes.",
    "ru": "В офисе тихий день, и вдруг вибрирует телефон."
  },
  {
    "en": "You are halfway through your lunch when a new notification arrives.",
    "ru": "Ты в середине обеда, когда приходит новое уведомление."
  },
  {
    "en": "The team is busy preparing for tomorrow's planning meeting.",
    "ru": "Команда занята подготовкой к завтрашней планёрке."
  },
  {
    "en": "The office is almost empty, but someone still needs your answer.",
    "ru": "Офис почти опустел, но твой ответ всё ещё кому-то нужен."
  },
  {
    "en": "You open your laptop on Monday morning, and your inbox is already full.",
    "ru": "Ты открываешь ноутбук в понедельник утром, а почта уже полна."
  },
  {
    "en": "A meeting ends early, and you have ten free minutes. Of course, a message arrives.",
    "ru": "Встреча закончилась раньше, и у тебя есть десять свободных минут. Конечно, приходит сообщение."
  },
  {
    "en": "You are checking your task list when a message pops up on your screen.",
    "ru": "Ты просматриваешь список задач, и тут на экране всплывает сообщение."
  },
  {
    "en": "It is Friday afternoon, and everyone wants to close their tasks before the weekend.",
    "ru": "Пятница, день, и все хотят закрыть задачи до выходных."
  },
  {
    "en": "Right after the weekly sync, a colleague follows up with you.",
    "ru": "Сразу после еженедельной синхронизации с тобой связывается коллега."
  },
  {
    "en": "A big deadline is coming soon, and the team feels the pressure.",
    "ru": "Большой дедлайн уже скоро, и команда чувствует давление."
  },
  {
    "en": "The end of the quarter is near, and every decision counts.",
    "ru": "Конец квартала близко, и каждое решение на счету."
  }
];
