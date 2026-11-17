/* Product reading material. Author-maintained; not generated with career cases. */
var PRODUCT_ARTICLES = [
  {
    "id": "a01",
    "title": "Your first week in a bank product team",
    "topic": "Basics",
    "text": [
      "A bank is not a normal tech startup. Every feature touches money, personal data and rules from regulators, so product teams work closely with [[compliance|compliance]], risk and legal. In your first week, your main job is to learn how the team works and who the [[stakeholders|stakeholder]] are.",
      "Meet the people around the product: engineers who build it, designers who shape it, analysts who measure it, and support agents who hear customers every day. Ask each person the same simple question: what is the biggest problem in this product right now? Different answers show you where the real risks are.",
      "Next, read the [[backlog|backlog]], the list of work waiting to be done, and join the daily [[standup|standup]]. Do not try to fix things yet. Take notes, write down the words you do not know, and look for the numbers the team checks every week.",
      "Good interns ask questions early and clearly. A question like 'Which metric tells us this feature works?' shows that you think about results. By Friday, write a one-page summary of what you learned and share it with your manager."
    ],
    "words": [
      {
        "w": "compliance",
        "ru": "комплаенс, соблюдение правил",
        "how": "Отдел или процесс, который следит за выполнением правил и законов.",
        "ex": "Compliance reviews every new feature."
      },
      {
        "w": "stakeholder",
        "ru": "заинтересованная сторона",
        "how": "Человек или группа, на которых влияет продукт или которым важен результат.",
        "ex": "Sales is an important stakeholder."
      },
      {
        "w": "backlog",
        "ru": "бэклог",
        "how": "Список задач, которые ждут выполнения.",
        "ex": "The backlog has forty items."
      },
      {
        "w": "standup",
        "ru": "стендап, короткая ежедневная встреча",
        "how": "Быстрая встреча команды, где каждый рассказывает о прогрессе.",
        "ex": "Our standup starts at ten."
      }
    ],
    "quiz": [
      {
        "q": "Why do bank product teams work closely with compliance, risk and legal?",
        "ok": "Because every feature touches money, data and regulation",
        "wrong": [
          "Because banks do not have engineers of their own",
          "Because compliance teams design the app screens",
          "Because customers ask to talk to them directly"
        ],
        "e": "Банковские функции затрагивают деньги, данные и правила, поэтому нужны комплаенс, риск и юристы.",
        "w": null
      },
      {
        "q": "What is a backlog?",
        "ok": "The list of work waiting to be done",
        "wrong": [
          "A report about last month's revenue",
          "A meeting for the whole company",
          "A list of customer complaints only"
        ],
        "e": "Бэклог это список задач, ожидающих выполнения.",
        "w": null
      },
      {
        "q": "The text advises you to start fixing problems in your first week.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "В тексте советуют сначала наблюдать, делать заметки и не торопиться с исправлениями.",
        "w": null
      },
      {
        "q": "In the text, 'stakeholders' means:",
        "ok": "people who are affected by the product or care about its results",
        "wrong": [
          "people who own shares in a restaurant chain and its brands",
          "only the engineers who write the code for the product",
          "customers who are angry with the bank and its services"
        ],
        "e": "Stakeholders это заинтересованные стороны: те, на кого влияет продукт.",
        "w": "stakeholder"
      },
      {
        "q": "What simple question does the text suggest asking each person?",
        "ok": "What is the biggest problem in this product right now?",
        "wrong": [
          "How much do you earn in this company?",
          "Who is responsible for the team budget?",
          "When will this product finally be finished?"
        ],
        "e": "Один и тот же вопрос разным людям показывает, где настоящие риски.",
        "w": null
      }
    ]
  },
  {
    "id": "a02",
    "title": "Reading the numbers: users and funnels",
    "topic": "Metrics",
    "text": [
      "A bank app collects thousands of numbers every day, but only a few matter. Start with [[active users|active users]], the people who actually open the app in a period. Daily active users show habits, and monthly active users show reach.",
      "Next, look at the [[funnel|funnel]]. It is the path a customer follows, for example: opens the app, starts account opening, uploads an ID, gets the account. At each step some people leave. The step with the biggest loss is where you should look first.",
      "A [[conversion rate|conversion rate]] is the share of people who complete a step. If 1,000 customers start and 300 finish, the conversion rate is 30%. Always compare the same period and the same group of customers, or the comparison will mislead you.",
      "Numbers tell you what happened, but not why. When a number looks strange, check its [[definition|definition]], then talk to customers or watch their sessions. Never present a number without saying where it comes from."
    ],
    "words": [
      {
        "w": "active users",
        "ru": "активные пользователи",
        "how": "Люди, которые реально пользуются продуктом за период.",
        "ex": "We have 50,000 active users."
      },
      {
        "w": "funnel",
        "ru": "воронка",
        "how": "Шаги, которые проходит клиент, и доля людей на каждом шаге.",
        "ex": "The funnel shows where customers quit."
      },
      {
        "w": "conversion rate",
        "ru": "коэффициент конверсии",
        "how": "Доля людей, которые завершили нужный шаг.",
        "ex": "The conversion rate is 30%."
      },
      {
        "w": "definition",
        "ru": "определение (показателя)",
        "how": "Точное правило, как считается показатель.",
        "ex": "Check the definition before you compare."
      }
    ],
    "quiz": [
      {
        "q": "What do daily active users show?",
        "ok": "How many people open the app on a given day",
        "wrong": [
          "How many people downloaded the app in total",
          "How much money customers keep in the bank",
          "How many customers called the support line"
        ],
        "e": "DAU показывает, сколько людей пользуются продуктом в течение дня.",
        "w": null
      },
      {
        "q": "A funnel starts with 1,000 customers and 300 finish. What is the conversion rate?",
        "ok": "30%",
        "wrong": [
          "3%",
          "70%",
          "300%"
        ],
        "e": "300 из 1000 это 30%.",
        "w": null
      },
      {
        "q": "A single number is enough to understand why customers behave in a certain way.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Цифры показывают, что произошло, но не почему. Нужны интервью и наблюдения.",
        "w": null
      },
      {
        "q": "In the text, 'funnel' means:",
        "ok": "the steps a customer takes, with some people leaving at each step",
        "wrong": [
          "a tool used to pour liquid into a small bottle quickly",
          "a ranking of the app's features by their popularity",
          "a group of people who work together on the same app"
        ],
        "e": "Воронка это путь клиента по шагам, на каждом часть людей уходит.",
        "w": "funnel"
      },
      {
        "q": "Why should you compare the same period and the same group of customers?",
        "ok": "Otherwise the comparison can mislead you",
        "wrong": [
          "Because the app only stores one month of data",
          "Because regulators demand identical reports",
          "Because customers prefer simple numbers"
        ],
        "e": "Разные периоды и группы дают неверные выводы.",
        "w": null
      }
    ]
  },
  {
    "id": "a03",
    "title": "Talking to customers",
    "topic": "Discovery",
    "text": [
      "[[Discovery|discovery]] means learning about customers before you build. In a bank this matters a lot, because people are careful with money and often say one thing and do another. A good interview helps you hear what really happens in their lives.",
      "Ask about the past, not the future. 'Tell me about the last time you sent money abroad' gives real details. 'Would you use a new transfer feature?' gives polite guesses. Ask [[open questions|open questions]] that start with what, how or when, and avoid [[leading questions|leading question]] that suggest an answer.",
      "Listen more than you speak. Write down exact words, and notice the [[pain points|pain points]]: moments of effort, fear or confusion. When someone says 'I always check twice,' ask why. The reason is often the real problem.",
      "After five or six interviews, look for a [[pattern|pattern]]. One story is only a story, but the same story three times is a signal. Share your notes with the team, so everyone hears the customer, not only you."
    ],
    "words": [
      {
        "w": "discovery",
        "ru": "исследование потребностей клиентов",
        "how": "Изучение клиентов и их проблем до разработки.",
        "ex": "Discovery saves months of wrong work."
      },
      {
        "w": "open questions",
        "ru": "открытые вопросы",
        "how": "Вопросы, на которые нельзя ответить просто да или нет.",
        "ex": "Open questions start with what or how."
      },
      {
        "w": "leading question",
        "ru": "наводящий вопрос",
        "how": "Вопрос, который подсказывает нужный ответ.",
        "ex": "A leading question gives false answers."
      },
      {
        "w": "pain points",
        "ru": "болевые точки клиента",
        "how": "Моменты, когда клиенту трудно, страшно или непонятно.",
        "ex": "Slow transfers are a pain point."
      },
      {
        "w": "pattern",
        "ru": "закономерность",
        "how": "Повторяющаяся история в нескольких интервью.",
        "ex": "We found a pattern in the interviews."
      }
    ],
    "quiz": [
      {
        "q": "Which question follows the advice of the text?",
        "ok": "Tell me about the last time you sent money abroad.",
        "wrong": [
          "Would you use a new transfer feature next year?",
          "Don't you think transfers are too slow today?",
          "How much would you pay for a better app?"
        ],
        "e": "Вопрос о прошлом даёт реальные детали, а о будущем только вежливые догадки.",
        "w": null
      },
      {
        "q": "Why does the author warn about questions about the future?",
        "ok": "They usually produce polite guesses, not real details",
        "wrong": [
          "They are not allowed in banks",
          "They take too long for customers to answer",
          "They always upset the people you ask"
        ],
        "e": "Люди плохо предсказывают своё поведение.",
        "w": null
      },
      {
        "q": "One interview is enough to see a pattern.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Закономерность видна, когда одна и та же история повторяется несколько раз.",
        "w": null
      },
      {
        "q": "In the text, 'pain point' means:",
        "ok": "a moment of effort, fear or confusion for the customer",
        "wrong": [
          "a physical injury during the use of an app",
          "a feature that earns the most revenue",
          "a complaint that the bank has already solved"
        ],
        "e": "Pain point это болевая точка клиента.",
        "w": "pain points"
      },
      {
        "q": "What should you do after five or six interviews?",
        "ok": "Look for repeated stories and share the notes",
        "wrong": [
          "Choose the idea of the most interesting customer",
          "Stop talking to customers completely",
          "Write the final design of the feature"
        ],
        "e": "После серии интервью ищут повторы и делятся выводами с командой.",
        "w": null
      }
    ]
  },
  {
    "id": "a04",
    "title": "Writing a clear user story",
    "topic": "Delivery",
    "text": [
      "Engineers cannot build what they do not understand. A [[user story|user story]] describes a need from the customer's point of view in one sentence: 'As a business owner, I want to export my statement to a spreadsheet, so that I can send it to my accountant.' The last part, the reason, matters most.",
      "Next come [[acceptance criteria|acceptance criteria]]: simple checks that tell the team when the story is done. For example: the export works for the last 12 months, the file opens in Excel, and customers see an error message if the export fails. Each check should be clear enough to test.",
      "Good stories are small. If a story needs more than a few days of work, split it into a smaller [[slice|slice]] that still brings value, for example a one-month export first and a full year later. Small slices reduce risk and bring feedback faster.",
      "In banking, check each [[edge case|edge case]] early: what if the account is closed, the statement is empty, or the customer has no permission? Writing these down with the team prevents surprises close to the release."
    ],
    "words": [
      {
        "w": "user story",
        "ru": "пользовательская история",
        "how": "Короткое описание потребности клиента: кто, что и зачем.",
        "ex": "Each user story starts with the customer."
      },
      {
        "w": "acceptance criteria",
        "ru": "критерии приёмки",
        "how": "Проверки, по которым понятно, что задача готова.",
        "ex": "The acceptance criteria are clear."
      },
      {
        "w": "slice",
        "ru": "часть, порция работы",
        "how": "Меньшая часть большой задачи, которая всё равно даёт ценность.",
        "ex": "Let's ship the first slice this week."
      },
      {
        "w": "edge case",
        "ru": "редкий граничный случай",
        "how": "Необычная ситуация, о которой легко забыть.",
        "ex": "An empty statement is an edge case."
      }
    ],
    "quiz": [
      {
        "q": "Which part of a user story matters most, according to the text?",
        "ok": "The reason why the customer needs the feature",
        "wrong": [
          "The name of the person who requested it",
          "The exact screen where the button appears",
          "The date when the work will start"
        ],
        "e": "Причина объясняет ценность и помогает найти лучшее решение.",
        "w": null
      },
      {
        "q": "What are acceptance criteria?",
        "ok": "Checks that show when the story is complete",
        "wrong": [
          "Rules for how engineers should write code",
          "A list of customers who approved the idea",
          "The budget approved for the feature"
        ],
        "e": "Критерии приёмки показывают, когда задача считается выполненной.",
        "w": null
      },
      {
        "q": "A story that needs several weeks of work is a good size.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Хорошие истории маленькие, большие нужно делить на части.",
        "w": null
      },
      {
        "q": "In the text, 'slice' means:",
        "ok": "a smaller part of larger work that still brings value",
        "wrong": [
          "a time period of about one week for the whole team",
          "a bug that appears for only a small group of users",
          "a discount that is given to a few important clients"
        ],
        "e": "Slice это небольшая часть работы, которая сама по себе полезна.",
        "w": "slice"
      },
      {
        "q": "Which of these is an edge case in the text?",
        "ok": "The customer's account is closed",
        "wrong": [
          "The customer exports a normal monthly statement",
          "The export button is blue on the screen",
          "Many customers use the feature every week"
        ],
        "e": "Закрытый счёт это редкий случай, который легко пропустить.",
        "w": null
      }
    ]
  },
  {
    "id": "a05",
    "title": "Prioritizing with RICE",
    "topic": "Prioritization",
    "text": [
      "Every product team has more ideas than time. The hard part is choosing what to build first. A [[prioritization framework|prioritization framework]] helps you decide in a clear and fair way, instead of following a [[gut feeling|gut feeling]] or the loudest voice in the meeting.",
      "RICE scores each idea with four factors. [[Reach|reach]] is how many customers it affects in a period, for example 20,000 per quarter. Impact is how much it changes things for each customer. Confidence is how sure you are about your estimates. [[Effort|effort]] is the work needed, counted in person-months.",
      "The score is reach times impact times confidence, divided by effort. A small fix that helps many customers can beat a big feature that helps few. For example, a clearer error message in card payments may score higher than a new investment dashboard.",
      "RICE is a tool, not a judge. If the result looks strange, question the [[assumption|assumption]] behind it. Strategy and regulation also matter: a low-scoring idea may be required by law or support an important goal."
    ],
    "words": [
      {
        "w": "prioritization framework",
        "ru": "система приоритизации",
        "how": "Правила, по которым сравнивают идеи и выбирают порядок.",
        "ex": "A framework makes decisions fairer."
      },
      {
        "w": "gut feeling",
        "ru": "интуиция, чутьё",
        "how": "Решение на основе ощущений, а не данных.",
        "ex": "He decided on a gut feeling."
      },
      {
        "w": "reach",
        "ru": "охват",
        "how": "Сколько людей затронет идея за период.",
        "ex": "The reach is about 20,000 customers."
      },
      {
        "w": "effort",
        "ru": "трудозатраты",
        "how": "Сколько работы нужно для идеи.",
        "ex": "The effort is two person-months."
      },
      {
        "w": "assumption",
        "ru": "допущение",
        "how": "То, что считаем верным, но ещё не проверили.",
        "ex": "This estimate rests on a big assumption."
      }
    ],
    "quiz": [
      {
        "q": "What does 'reach' mean in RICE?",
        "ok": "How many customers the idea affects in a period",
        "wrong": [
          "How much each customer benefits from the idea",
          "How many engineers are needed to build it",
          "How certain the team is about the numbers"
        ],
        "e": "Reach это охват: сколько людей затронет идея.",
        "w": null
      },
      {
        "q": "How is the RICE score calculated?",
        "ok": "Reach times impact times confidence, divided by effort",
        "wrong": [
          "Reach plus impact plus confidence plus effort",
          "Effort times reach, divided by impact",
          "Impact divided by confidence times effort"
        ],
        "e": "Перемножаем охват, влияние и уверенность и делим на трудозатраты.",
        "w": null
      },
      {
        "q": "A low-scoring idea should never be built.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Идея с низким баллом может быть нужна по закону или стратегии.",
        "w": null
      },
      {
        "q": "In the text, 'assumption' means:",
        "ok": "something you believe is true but have not yet checked",
        "wrong": [
          "a final decision that was already approved by the board",
          "a number copied from the bank's annual financial report",
          "a rule that was written by the compliance team"
        ],
        "e": "Assumption это допущение, которое ещё не проверено.",
        "w": "assumption"
      },
      {
        "q": "Why does the author call RICE 'a tool, not a judge'?",
        "ok": "The score should start a discussion, not decide alone",
        "wrong": [
          "The score is usually wrong by a large margin",
          "Only managers are allowed to read the score",
          "The score replaces strategy and regulation"
        ],
        "e": "Балл начинает обсуждение, но не заменяет мышление.",
        "w": null
      }
    ]
  },
  {
    "id": "a06",
    "title": "A/B testing basics",
    "topic": "Experiments",
    "text": [
      "An [[A/B test|A/B test]] compares two versions of something, for example two texts on a loan banner. Half of the customers see version A, and the other half see version B. If B performs better, you have evidence that the change helps, not just an opinion.",
      "Before you start, decide three things: the goal, the [[main metric|main metric]] and the [[sample size|sample size]]. If you look at the results first and then choose the metric that looks best, you will fool yourself. A tiny sample can show big differences by pure chance.",
      "Let the test run long enough, usually at least one or two full weeks, so that weekdays and weekends are both included. Do not stop the test on the first day you see a winner. Early results often change.",
      "Also watch the [[guardrail metric|guardrail metric]], a number that must not get worse, such as complaints or loan approvals. A banner that gets more clicks but creates more confusion is not a win."
    ],
    "words": [
      {
        "w": "A/B test",
        "ru": "A/B-тест",
        "how": "Сравнение двух версий на разных группах клиентов.",
        "ex": "The A/B test ran for two weeks."
      },
      {
        "w": "main metric",
        "ru": "основная метрика",
        "how": "Показатель, по которому решают, кто победил.",
        "ex": "Applications are the main metric."
      },
      {
        "w": "sample size",
        "ru": "размер выборки",
        "how": "Сколько людей участвует в тесте.",
        "ex": "The sample size was too small."
      },
      {
        "w": "guardrail metric",
        "ru": "защитная метрика",
        "how": "Показатель, который не должен ухудшиться из-за теста.",
        "ex": "Complaints are our guardrail metric."
      }
    ],
    "quiz": [
      {
        "q": "In an A/B test, who sees version B?",
        "ok": "A separate half of the customers",
        "wrong": [
          "Only the customers who complained",
          "The whole team of the bank",
          "Customers who saw version A before"
        ],
        "e": "Версию B видит отдельная половина клиентов.",
        "w": null
      },
      {
        "q": "What should you decide before starting the test?",
        "ok": "The goal, the main metric and the sample size",
        "wrong": [
          "The date of the next release only",
          "Which version the VP prefers",
          "How many people will read the result"
        ],
        "e": "Цель, метрика и размер выборки определяются до старта.",
        "w": null
      },
      {
        "q": "You should stop the test on the first day when one version is ahead.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Ранние результаты часто меняются, тест нужно довести до конца.",
        "w": null
      },
      {
        "q": "In the text, 'guardrail metric' means:",
        "ok": "a number that must not get worse while you test",
        "wrong": [
          "the main number that decides who wins",
          "a rule that blocks customers from the test",
          "a report that regulators ask for"
        ],
        "e": "Это защитный показатель, например число жалоб.",
        "w": "guardrail metric"
      },
      {
        "q": "Why does a tiny sample cause trouble?",
        "ok": "Big differences can appear by pure chance",
        "wrong": [
          "The bank must pay more for small tests",
          "Customers notice that they are in a test",
          "The result always favors version A"
        ],
        "e": "На малой выборке случайность даёт большие различия.",
        "w": null
      }
    ]
  },
  {
    "id": "a07",
    "title": "Retention and cohorts",
    "topic": "Metrics",
    "text": [
      "Getting a customer is expensive. Keeping them is what makes a bank product grow. [[Retention|retention]] shows how many customers are still active after a period, for example after 30 or 90 days. If retention is low, new signups only fill a leaking bucket.",
      "To see what is really happening, group customers into [[cohorts|cohort]]: people who joined in the same month. A table of cohorts shows whether customers who joined in March keep using the app better than those who joined in January. If newer cohorts do better, your changes are working.",
      "Average numbers can hide problems. Total active users may grow while each cohort quietly shrinks, because many new people hide the loss of old ones. Always check retention by cohort, not just the total.",
      "When retention falls, look for the [[moment of value|moment of value]]. Customers who make a first transfer or set up a salary deposit often stay. Find that moment, also called [[activation|activation]], and help more customers reach it faster."
    ],
    "words": [
      {
        "w": "retention",
        "ru": "удержание клиентов",
        "how": "Доля клиентов, которые продолжают пользоваться продуктом.",
        "ex": "Retention improved after the change."
      },
      {
        "w": "cohort",
        "ru": "когорта",
        "how": "Группа клиентов, которые начали пользоваться в одно время.",
        "ex": "The March cohort retains better."
      },
      {
        "w": "moment of value",
        "ru": "момент ценности",
        "how": "Момент, когда клиент впервые получает пользу.",
        "ex": "The first transfer is the moment of value."
      },
      {
        "w": "activation",
        "ru": "активация",
        "how": "Первое реальное получение ценности от продукта.",
        "ex": "Activation is the first real use."
      }
    ],
    "quiz": [
      {
        "q": "What does retention show?",
        "ok": "How many customers are still active after a period",
        "wrong": [
          "How many customers joined the bank",
          "How much money the bank earned from fees",
          "How many customers left a bad review"
        ],
        "e": "Retention это удержание: доля тех, кто остался.",
        "w": null
      },
      {
        "q": "What is a cohort?",
        "ok": "A group of customers who joined in the same period",
        "wrong": [
          "A team of engineers working on a feature",
          "A set of the bank's most active branches",
          "A list of products with the same price"
        ],
        "e": "Когорта это группа клиентов, пришедших в один период.",
        "w": null
      },
      {
        "q": "Growing total active users always proves that retention is healthy.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Новые клиенты могут скрывать потерю старых.",
        "w": null
      },
      {
        "q": "In the text, 'moment of value' means:",
        "ok": "the moment when a customer first gets real benefit",
        "wrong": [
          "the day the bank approves a new product",
          "a campaign that wakes inactive customers",
          "the process of checking a customer's identity"
        ],
        "e": "Момент, когда клиент впервые получает пользу.",
        "w": "moment of value"
      },
      {
        "q": "What often helps customers stay, according to the text?",
        "ok": "Making a first transfer or setting up a salary deposit",
        "wrong": [
          "Receiving many reminder emails from the bank each week",
          "Reading the terms and conditions of the account carefully",
          "Seeing a new design of the app every single month"
        ],
        "e": "Первые реальные действия делают клиента лояльным.",
        "w": null
      }
    ]
  },
  {
    "id": "a08",
    "title": "Roadmaps: outcomes over outputs",
    "topic": "Roadmap",
    "text": [
      "Many roadmaps are lists of features: 'Build a chatbot in Q2, redesign cards in Q3.' These are [[outputs|output]], things the team produces. But customers and the bank do not need features. They need results, which are called [[outcomes|outcome]].",
      "An outcome describes a change in behavior or results: 'Reduce account opening drop-off from 45% to 30%.' It leaves room for the team to find the best solution. A feature list closes that room and also hides whether the work helped.",
      "A good roadmap shows problems and goals in [[time horizons|time horizon]]: now, next and later. Items in 'now' are clear and detailed, while items in 'later' stay flexible. Dates for far-off work are guesses, and stakeholders should know that.",
      "Do not promise exact dates for uncertain work. Say what you are trying to achieve, what you know, and when you will know more. Share the [[roadmap|roadmap]] regularly and explain changes openly, so sales and clients can plan with you."
    ],
    "words": [
      {
        "w": "output",
        "ru": "результат работы (выпуск)",
        "how": "То, что команда произвела, например функция.",
        "ex": "A new screen is an output."
      },
      {
        "w": "outcome",
        "ru": "эффект, результат для клиента",
        "how": "Изменение поведения или показателей, которого хотят добиться.",
        "ex": "The outcome is a higher completion rate."
      },
      {
        "w": "time horizon",
        "ru": "горизонт планирования",
        "how": "Период, на который смотрит план: сейчас, дальше, потом.",
        "ex": "Each time horizon has a different detail level."
      },
      {
        "w": "roadmap",
        "ru": "дорожная карта продукта",
        "how": "План развития продукта во времени.",
        "ex": "We share the roadmap every month."
      }
    ],
    "quiz": [
      {
        "q": "Which of these is an outcome?",
        "ok": "Reduce account opening drop-off from 45% to 30%",
        "wrong": [
          "Build a chatbot for account opening",
          "Redesign the card management screen",
          "Add a new menu to the mobile app"
        ],
        "e": "Эффект это изменение результата, а не выпущенная функция.",
        "w": null
      },
      {
        "q": "What is a problem with feature-list roadmaps?",
        "ok": "They hide whether the work helped customers",
        "wrong": [
          "They are too short for engineers to read",
          "They never include any dates at all",
          "They only list customer complaints"
        ],
        "e": "Список функций не показывает, помогла ли работа.",
        "w": null
      },
      {
        "q": "The text recommends giving exact dates for work far in the future.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Для далёкой и неопределённой работы даты это только догадки.",
        "w": null
      },
      {
        "q": "In the text, 'output' means:",
        "ok": "something the team produces, like a feature",
        "wrong": [
          "the result of a customer's decision",
          "money earned from a product",
          "a meeting that sums up the quarter"
        ],
        "e": "Output это то, что произвела команда.",
        "w": "output"
      },
      {
        "q": "What should you share with stakeholders about uncertain work?",
        "ok": "The goal, what you know, and when you will know more",
        "wrong": [
          "Only the final date, to keep it simple",
          "Nothing, until the work is finished",
          "A detailed list of technical risks"
        ],
        "e": "Честность о неопределённости помогает людям планировать.",
        "w": null
      }
    ]
  },
  {
    "id": "a09",
    "title": "Working with stakeholders",
    "topic": "Stakeholders",
    "text": [
      "In a bank, many people have a say in your product: sales, support, legal, compliance, risk and executives. They are your [[stakeholders|stakeholder]]. They are not enemies. Each one sees a part of the picture that you cannot see alone.",
      "Start by understanding what each person cares about. Sales cares about deals, compliance about rules, support about customer calls. When you know their goals, you can explain your decisions in their language. Use data and examples, not opinions.",
      "When someone asks for something you cannot do, avoid a plain 'no'. Explain the [[trade-off|trade-off]]: what the team would stop doing to [[make room|make room]], and what the risk would be. Offer options, such as a smaller first version, and let the person choose with full information.",
      "Keep people informed before they have to ask. A short weekly note about progress, risks and decisions builds [[trust|trust]]. If something goes wrong, tell them early. Nobody likes surprises, and bad news gets worse with time."
    ],
    "words": [
      {
        "w": "stakeholder",
        "ru": "заинтересованная сторона",
        "how": "Тот, кто влияет на продукт или кому важен его результат.",
        "ex": "Legal is a key stakeholder."
      },
      {
        "w": "trade-off",
        "ru": "компромисс, цена выбора",
        "how": "Выбор, где за одно приходится жертвовать другим.",
        "ex": "Every priority has a trade-off."
      },
      {
        "w": "make room",
        "ru": "освободить место",
        "how": "Убрать другие задачи, чтобы поместилась новая.",
        "ex": "We must make room for this request."
      },
      {
        "w": "trust",
        "ru": "доверие",
        "how": "Уверенность, что человек или компания не подведут.",
        "ex": "Weekly updates build trust."
      }
    ],
    "quiz": [
      {
        "q": "Why does the text say stakeholders are not enemies?",
        "ok": "Each person sees a part of the picture you cannot see",
        "wrong": [
          "They always agree with the product team",
          "They are paid to solve your problems",
          "They rarely ask for anything unusual"
        ],
        "e": "У каждого своя часть картины, вместе они дают целое.",
        "w": null
      },
      {
        "q": "What should you do when you cannot do what someone asks?",
        "ok": "Explain the trade-off and offer options",
        "wrong": [
          "Say no and end the conversation",
          "Promise it now and check the facts later",
          "Send the request to the executives"
        ],
        "e": "Объясните цену выбора и предложите варианты.",
        "w": null
      },
      {
        "q": "A short weekly update helps build trust.",
        "ok": "True",
        "wrong": [
          "False"
        ],
        "e": "Регулярные короткие апдейты создают доверие.",
        "w": null
      },
      {
        "q": "In the text, 'trade-off' means:",
        "ok": "a choice where gaining one thing means giving up another",
        "wrong": [
          "a deal where both sides lose a large amount of money",
          "an exchange of employees between two product teams",
          "a discount that is offered to a very large client"
        ],
        "e": "Trade-off это компромисс: за одно платим другим.",
        "w": "trade-off"
      },
      {
        "q": "What does the text say about bad news?",
        "ok": "It gets worse with time, so tell people early",
        "wrong": [
          "It should wait for the weekly meeting",
          "It should be shared only with executives",
          "It is better to fix it before telling anyone"
        ],
        "e": "Плохие новости лучше сообщать рано.",
        "w": null
      }
    ]
  },
  {
    "id": "a10",
    "title": "Choosing a north star metric",
    "topic": "Metrics",
    "text": [
      "Teams can drown in numbers. A [[north star metric|north star metric]] is one number that shows whether customers get real value from the product. It helps many teams point in the same direction, even when they work on different features.",
      "A good north star reflects value for customers and leads to money for the bank. 'Number of registered users' is weak, because people can register and never come back. 'Customers who make three card payments a month' is stronger, because it shows real use.",
      "Check the metric with a few questions. Does it move when customers get more value? Can the team influence it? Is it easy to explain? Can it be [[gamed|game the metric]]? If a team can raise the number without helping customers, choose a better one.",
      "Support the north star with an [[input metric|input metric]], a smaller number that teams can move directly, such as the time to open an account. Also add a [[guardrail|guardrail]], for example complaints, so that growth does not hurt quality."
    ],
    "words": [
      {
        "w": "north star metric",
        "ru": "ключевая метрика продукта",
        "how": "Главный показатель, который отражает ценность для клиента.",
        "ex": "The north star metric guides all teams."
      },
      {
        "w": "game the metric",
        "ru": "накрутить показатель",
        "how": "Поднять число, не принося реальной пользы.",
        "ex": "Do not game the metric."
      },
      {
        "w": "input metric",
        "ru": "входная метрика",
        "how": "Меньший показатель, на который команда влияет напрямую.",
        "ex": "Time to open an account is an input metric."
      },
      {
        "w": "guardrail",
        "ru": "защитный показатель",
        "how": "Показатель качества, который не должен падать при росте главной метрики.",
        "ex": "Complaints are a guardrail."
      }
    ],
    "quiz": [
      {
        "q": "Why is 'registered users' a weak north star?",
        "ok": "People can register and never use the product",
        "wrong": [
          "It is too difficult to measure in banks",
          "It does not change from month to month",
          "It only includes business customers"
        ],
        "e": "Регистрация не равна пользе.",
        "w": null
      },
      {
        "q": "Which question helps test a north star metric?",
        "ok": "Can the team raise it without helping customers?",
        "wrong": [
          "Is it the same as last year's number?",
          "Does the board already track it?",
          "Is it measured in money only?"
        ],
        "e": "Хорошую метрику нельзя поднять без пользы клиентам.",
        "w": null
      },
      {
        "q": "A north star metric should be used without any other metrics.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Ей нужны входные метрики и защитные показатели.",
        "w": null
      },
      {
        "q": "In the text, 'input metric' means:",
        "ok": "a smaller number that teams can move directly",
        "wrong": [
          "the main number at the top of a report",
          "a metric given by an outside regulator",
          "a number that comes from customer surveys"
        ],
        "e": "Входная метрика это показатель, на который команда влияет напрямую.",
        "w": "input metric"
      },
      {
        "q": "What is the role of a guardrail?",
        "ok": "It protects quality while the main metric grows",
        "wrong": [
          "It replaces the north star when it falls",
          "It tells engineers when to release",
          "It measures the total revenue of the bank"
        ],
        "e": "Защитный показатель следит, чтобы качество не страдало.",
        "w": null
      }
    ]
  },
  {
    "id": "a11",
    "title": "Leading work across teams",
    "topic": "Delivery",
    "text": [
      "At Senior PM level, the biggest problems cross team borders. Checkout, for example, may be owned by three teams: payments, identity and the app. When nobody owns the whole result, problems fall between teams and stay there.",
      "Start by naming one [[owner|owner]] for the outcome, and agree who decides what. A simple tool is a table of roles: who decides, who is consulted, who is informed. Write it down. Clear [[ownership|ownership]] removes many arguments before they start.",
      "Map each [[dependency|dependency]] early: what one team needs from another, and by when. A late dependency is the most common reason for a missed date. Meet other teams every week for a short check, and track the shared plan in a single place.",
      "You do not have authority over other teams, so you need [[influence|influence]]. Build it with clear goals, honest data and small wins. When teams see that your plan helps them reach their own goals, they work with you, not for you."
    ],
    "words": [
      {
        "w": "owner",
        "ru": "ответственный",
        "how": "Человек, который отвечает за результат.",
        "ex": "Each outcome needs one owner."
      },
      {
        "w": "ownership",
        "ru": "ответственность за результат",
        "how": "Чёткое понимание, кто за что отвечает.",
        "ex": "Clear ownership prevents arguments."
      },
      {
        "w": "dependency",
        "ru": "зависимость",
        "how": "То, что одной команде нужно от другой для работы.",
        "ex": "The release has a dependency on identity."
      },
      {
        "w": "influence",
        "ru": "влияние",
        "how": "Способность менять решения без формальной власти.",
        "ex": "A PM needs influence, not orders."
      }
    ],
    "quiz": [
      {
        "q": "What happens when nobody owns the whole outcome?",
        "ok": "Problems fall between teams and stay there",
        "wrong": [
          "Teams work faster without rules",
          "The budget grows automatically",
          "Customers solve the problems themselves"
        ],
        "e": "Без единого владельца проблемы остаются нерешёнными.",
        "w": null
      },
      {
        "q": "What is the purpose of a table of roles?",
        "ok": "To show who decides, who is consulted and who is informed",
        "wrong": [
          "To list who works in each office building of the bank",
          "To rank all employees by their performance each year",
          "To record the salary level of each team member"
        ],
        "e": "Таблица ролей убирает споры о том, кто решает.",
        "w": null
      },
      {
        "q": "A late dependency is rare and rarely causes missed dates.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Поздняя зависимость самая частая причина сорванных сроков.",
        "w": null
      },
      {
        "q": "In the text, 'influence' means:",
        "ok": "the ability to change decisions without formal authority",
        "wrong": [
          "a legal right to give orders to other teams",
          "a small payment the bank makes for each decision",
          "a report that the board approves every quarter"
        ],
        "e": "Влияние строится на целях, данных и маленьких победах.",
        "w": "influence"
      },
      {
        "q": "How does the text suggest building influence?",
        "ok": "Clear goals, honest data and small wins",
        "wrong": [
          "Strong opinions and long emails",
          "Escalating every problem to the CEO",
          "Asking teams to follow your plan"
        ],
        "e": "Влияние растёт, когда ваш план помогает другим достичь их целей.",
        "w": null
      }
    ]
  },
  {
    "id": "a12",
    "title": "Experiments at scale",
    "topic": "Experiments",
    "text": [
      "Bigger products run many experiments at once, and mistakes become expensive. Two ideas protect you from false conclusions: [[statistical significance|statistical significance]] and a [[confidence interval|confidence interval]].",
      "Statistical significance tells you how unlikely it is that a difference is just [[noise|noise]]. A common rule is 95%: if there were really no difference, you would see a result this strong only 5 times in 100. It does not tell you that the effect is big or useful.",
      "A confidence interval shows the range where the true effect probably lies. 'Conversion up 3%, with an interval from minus 1% to plus 7%' means the real result could even be negative. Wide intervals mean you need more data.",
      "Watch out for [[cherry-picking|cherry-pick]]: looking at many groups and reporting only the one that looks good. If you test 20 groups, one will look significant by chance. Decide your groups before the test, and be honest about everything you looked at."
    ],
    "words": [
      {
        "w": "statistical significance",
        "ru": "статистическая значимость",
        "how": "Показатель того, что различие вряд ли случайное.",
        "ex": "The result reached statistical significance."
      },
      {
        "w": "confidence interval",
        "ru": "доверительный интервал",
        "how": "Диапазон, где, скорее всего, находится настоящий эффект.",
        "ex": "The confidence interval is very wide."
      },
      {
        "w": "noise",
        "ru": "шум, случайные колебания",
        "how": "Случайные отклонения, не связанные с реальной причиной.",
        "ex": "Small changes may be just noise."
      },
      {
        "w": "cherry-pick",
        "ru": "выбирать только удобное",
        "how": "Показывать только те результаты, которые выглядят хорошо.",
        "ex": "Do not cherry-pick the best group."
      }
    ],
    "quiz": [
      {
        "q": "What does statistical significance tell you?",
        "ok": "How unlikely it is that the difference is just noise",
        "wrong": [
          "How large and useful the effect is for customers",
          "How many customers joined the test in each group",
          "How long the test should run before a decision"
        ],
        "e": "Значимость говорит о вероятности случайности, но не о размере эффекта.",
        "w": null
      },
      {
        "q": "What does a confidence interval show?",
        "ok": "The range where the true effect probably lies",
        "wrong": [
          "The exact day when the test should end",
          "The number of customers in each group",
          "The cost of running the experiment"
        ],
        "e": "Доверительный интервал показывает диапазон реального эффекта.",
        "w": null
      },
      {
        "q": "If the interval includes negative values, the real effect could be negative.",
        "ok": "True",
        "wrong": [
          "False"
        ],
        "e": "Если интервал переходит через ноль, эффект может быть и отрицательным.",
        "w": null
      },
      {
        "q": "In the text, 'cherry-pick' means:",
        "ok": "to report only the results that look good",
        "wrong": [
          "to choose the best customers for a test",
          "to remove errors from the data",
          "to pick the cheapest tool for analysis"
        ],
        "e": "Cherry-pick это выбирать удобные результаты.",
        "w": "cherry-pick"
      },
      {
        "q": "Why can testing 20 groups be a problem?",
        "ok": "One of them will look significant by chance",
        "wrong": [
          "The test becomes too expensive to run",
          "Customers will see too many versions",
          "Regulators do not allow many groups"
        ],
        "e": "При множестве групп одна из них случайно покажет эффект.",
        "w": null
      }
    ]
  },
  {
    "id": "a13",
    "title": "Coaching product managers",
    "topic": "Leadership",
    "text": [
      "As a Group PM, your success is measured by the success of your team. You can no longer solve every problem yourself. You help each PM grow, and the first step is regular [[one-on-one|one-on-one]] meetings, at least every two weeks.",
      "Use these meetings to listen, not to check status. Ask: what is the hardest decision you face now? What would you do if you were sure? Often the person already knows the answer and needs space to say it. Give your view after they speak.",
      "Give [[feedback|feedback]] early and specifically. 'Your presentation was confusing' helps little. 'The first slide had five metrics, and I could not tell which one mattered' is something the person can use. Praise in public, and discuss problems in private.",
      "[[Delegate|delegate]] decisions, not only tasks. Let the PM [[own the decision|own the decision]], and agree how you will support without taking over. When they make a mistake, ask what they learned. People who are afraid of mistakes stop making decisions."
    ],
    "words": [
      {
        "w": "one-on-one",
        "ru": "личная встреча тет-а-тет",
        "how": "Регулярный разговор руководителя и сотрудника без других людей.",
        "ex": "We have a one-on-one every Friday."
      },
      {
        "w": "feedback",
        "ru": "обратная связь",
        "how": "Информация о том, что получилось и что можно улучшить.",
        "ex": "I asked for feedback after the demo."
      },
      {
        "w": "delegate",
        "ru": "делегировать",
        "how": "Передать право решать или выполнять задачу другому.",
        "ex": "Delegate the decision to the PM."
      },
      {
        "w": "own the decision",
        "ru": "отвечать за решение",
        "how": "Принимать решение и нести за него ответственность.",
        "ex": "Let her own the decision."
      }
    ],
    "quiz": [
      {
        "q": "What should one-on-one meetings be used for?",
        "ok": "Listening and helping the person think through decisions",
        "wrong": [
          "Checking each task on the status list one by one",
          "Announcing new company rules to the whole team",
          "Measuring how fast the person completes the work"
        ],
        "e": "Встречи нужны, чтобы слушать и помогать думать, а не проверять статус.",
        "w": null
      },
      {
        "q": "Which feedback does the text prefer?",
        "ok": "The first slide had five metrics, so I could not tell which one mattered",
        "wrong": [
          "Your presentation was confusing and I did not enjoy it",
          "You need to be a lot clearer next time you present",
          "The meeting did not go well, so please improve it"
        ],
        "e": "Конкретная обратная связь показывает, что именно улучшить.",
        "w": null
      },
      {
        "q": "The text says to discuss problems in public and praise in private.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Наоборот: хвалить публично, а проблемы обсуждать наедине.",
        "w": null
      },
      {
        "q": "In the text, 'delegate' means:",
        "ok": "to give someone the right to decide or do a task",
        "wrong": [
          "to cancel a project after a long review process",
          "to ask a manager for an opinion about a task",
          "to hire a new person from another product team"
        ],
        "e": "Делегировать это передать право решать или делать.",
        "w": "delegate"
      },
      {
        "q": "What should you ask when a PM makes a mistake?",
        "ok": "What did you learn from it?",
        "wrong": [
          "Who approved this decision?",
          "How much did it cost the bank?",
          "Why did you not ask me first?"
        ],
        "e": "Вопрос об уроке помогает расти и не бояться решений.",
        "w": null
      }
    ]
  },
  {
    "id": "a14",
    "title": "Aligning roadmaps across teams",
    "topic": "Roadmap",
    "text": [
      "When several PMs build their own roadmaps, conflicts appear: two teams need the same engineers, or two features collide on the same screen. A Group PM makes sure the plans fit together and point to the same bank-level goals.",
      "Start by sharing the goal. If every roadmap shows how it supports the company's priorities, it becomes easier to see what matters most. Then put all plans on one page, and look for [[conflicts|conflict]], shared dependencies and gaps.",
      "In a planning meeting, ask each PM to explain their top three [[bets|bet]] and what they need from others. Use a simple rule for tough choices: work that supports the biggest company goal with the least risk goes first. Write decisions down so nobody has to guess.",
      "Alignment is not a one-time event. Review the combined roadmap every month, and watch for [[drift|drift]], the slow move away from the agreed plan. A short written summary after each review keeps everyone [[on the same page|on the same page]]."
    ],
    "words": [
      {
        "w": "conflict",
        "ru": "конфликт, пересечение",
        "how": "Ситуация, когда два плана мешают друг другу.",
        "ex": "The two roadmaps have a conflict."
      },
      {
        "w": "bet",
        "ru": "ставка, инициатива",
        "how": "Крупная идея с риском и потенциальной выгодой.",
        "ex": "Each PM has three bets this quarter."
      },
      {
        "w": "drift",
        "ru": "дрейф, постепенный уход от плана",
        "how": "Медленное отклонение от согласованного плана.",
        "ex": "Watch for drift in the plan."
      },
      {
        "w": "on the same page",
        "ru": "в одном понимании",
        "how": "Одинаково понимать ситуацию и планы.",
        "ex": "The summary keeps everyone on the same page."
      }
    ],
    "quiz": [
      {
        "q": "What is a common problem when PMs make separate roadmaps?",
        "ok": "Two teams may need the same engineers",
        "wrong": [
          "Roadmaps become too short to read",
          "Customers cannot see the plans",
          "Engineers refuse to use roadmaps"
        ],
        "e": "Планы разных команд часто конкурируют за одних и тех же людей.",
        "w": null
      },
      {
        "q": "What does the text say to do after sharing the goal?",
        "ok": "Put all plans on one page and look for conflicts",
        "wrong": [
          "Ask engineers to choose the best plan",
          "Cancel the plans that look risky",
          "Wait for customers to confirm priorities"
        ],
        "e": "Общая картина помогает увидеть конфликты и пробелы.",
        "w": null
      },
      {
        "q": "Alignment needs to be done only once a year.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Согласование нужно повторять регулярно, например каждый месяц.",
        "w": null
      },
      {
        "q": "In the text, 'drift' means:",
        "ok": "a slow move away from the agreed plan",
        "wrong": [
          "a sudden failure in the system",
          "a change of the team leader",
          "the delay of a payment"
        ],
        "e": "Drift это постепенное расхождение с планом.",
        "w": "drift"
      },
      {
        "q": "Which work goes first, according to the rule in the text?",
        "ok": "Work that supports the biggest goal with the least risk",
        "wrong": [
          "Work that the loudest PM in the meeting requests",
          "Work that costs the smallest amount of money overall",
          "Work that the oldest team in the bank owns"
        ],
        "e": "Приоритет у работы, которая лучше поддерживает главную цель при малом риске.",
        "w": null
      }
    ]
  },
  {
    "id": "a15",
    "title": "OKRs in plain English",
    "topic": "Strategy",
    "text": [
      "OKR means Objectives and Key Results. An [[objective|objective]] is a goal that explains where you want to go, in words people remember: 'Make account opening easy.' It should feel a bit ambitious and give direction.",
      "[[Key results|key result]] are numbers that show whether you reached the goal. For the objective above, they could be: 'Raise account opening completion from 30% to 55%' and 'Cut support questions about ID photos by half.' A good key result is [[measurable|measurable]] and has a clear target.",
      "Keep it short: one objective, with two to four key results. Too many goals mean no goals. Also separate OKRs from regular work. They show the most important change you want this quarter, not everything the team does.",
      "Review OKRs regularly. Score progress honestly, and discuss what you learned. If you reach every key result easily, the goals were too safe. If you miss them by a lot, ask whether the target, the plan or the situation was wrong. The point is [[alignment|alignment]] and learning, not punishment."
    ],
    "words": [
      {
        "w": "objective",
        "ru": "цель",
        "how": "Запоминающаяся формулировка того, куда команда идёт.",
        "ex": "Our objective is to make onboarding easy."
      },
      {
        "w": "key result",
        "ru": "ключевой результат",
        "how": "Измеримый показатель достижения цели.",
        "ex": "Each objective has three key results."
      },
      {
        "w": "measurable",
        "ru": "измеримый",
        "how": "Такой, который можно проверить числом.",
        "ex": "A key result must be measurable."
      },
      {
        "w": "alignment",
        "ru": "согласованность",
        "how": "Ситуация, когда команды движутся к одной цели.",
        "ex": "OKRs create alignment."
      }
    ],
    "quiz": [
      {
        "q": "What is an objective in OKRs?",
        "ok": "A memorable goal that gives direction",
        "wrong": [
          "A number that the team checks every single day",
          "A task list for the whole team to complete",
          "A report that must be sent to the regulator"
        ],
        "e": "Objective это цель, дающая направление.",
        "w": null
      },
      {
        "q": "Which is a good key result?",
        "ok": "Raise account opening completion from 30% to 55%",
        "wrong": [
          "Improve the customer experience of account opening",
          "Work harder on onboarding during the next months",
          "Make the whole app feel friendly and modern"
        ],
        "e": "Хороший ключевой результат измерим и имеет цель.",
        "w": null
      },
      {
        "q": "A team should have ten objectives each quarter.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Лучше одна цель и два-четыре ключевых результата.",
        "w": null
      },
      {
        "q": "In the text, 'measurable' means:",
        "ok": "possible to check with a number",
        "wrong": [
          "very difficult to achieve",
          "approved by the manager",
          "visible to all customers"
        ],
        "e": "Measurable это измеримый, то есть проверяемый числом.",
        "w": "measurable"
      },
      {
        "q": "What does the text say about missing every key result by a lot?",
        "ok": "Ask whether the target, the plan or the situation was wrong",
        "wrong": [
          "Punish the team to improve motivation next quarter",
          "Set the same targets again for the following quarter",
          "Remove the objective from the list of company goals"
        ],
        "e": "Промах это повод разобраться, а не наказывать.",
        "w": null
      }
    ]
  },
  {
    "id": "a16",
    "title": "Pricing: from cost to value",
    "topic": "Pricing",
    "text": [
      "Many banks set prices by adding a margin to costs: 'This account costs us 3 dollars a month, so we charge 5.' This is simple, but it ignores what customers value. A customer who gets great service may happily pay more, while another will refuse any fee.",
      "[[Value-based pricing|value-based pricing]] starts with the customer. Ask: what problem does this solve, and what is it worth? A business that saves hours of accounting each month may accept a higher fee than a student with a basic account. Prices should match perceived value.",
      "Use each [[segment|segment]] to avoid one price for everyone. Offer a basic plan, a standard plan and a premium plan, each with a clear difference in benefits. Test prices with small groups, and measure [[price elasticity|price elasticity]]: how much demand changes when the price changes.",
      "Remember trust. [[Hidden fees|hidden fees]] and surprising charges damage a bank more than low prices. Explain what customers pay for, announce changes early, and when you raise a price, show what they get in return. A fair price is one that customers understand."
    ],
    "words": [
      {
        "w": "value-based pricing",
        "ru": "ценообразование по ценности",
        "how": "Цена, которая основана на пользе для клиента, а не на затратах.",
        "ex": "Value-based pricing needs customer research."
      },
      {
        "w": "segment",
        "ru": "сегмент",
        "how": "Группа клиентов со схожими потребностями.",
        "ex": "Each segment has a different plan."
      },
      {
        "w": "price elasticity",
        "ru": "эластичность цены",
        "how": "Насколько спрос зависит от изменения цены.",
        "ex": "Price elasticity is high for small accounts."
      },
      {
        "w": "hidden fees",
        "ru": "скрытые комиссии",
        "how": "Платежи, о которых клиент не знал заранее.",
        "ex": "Hidden fees destroy trust."
      }
    ],
    "quiz": [
      {
        "q": "What is the weakness of cost-plus pricing?",
        "ok": "It ignores what customers value",
        "wrong": [
          "It makes prices too difficult to calculate",
          "It cannot be used for bank accounts",
          "It always creates the highest price"
        ],
        "e": "Цена от затрат не учитывает ценность для клиента.",
        "w": null
      },
      {
        "q": "What is price elasticity?",
        "ok": "How much demand changes when the price changes",
        "wrong": [
          "How much the bank earns from each customer",
          "How fast competitors copy a price",
          "How many fees a customer must pay"
        ],
        "e": "Эластичность показывает чувствительность спроса к цене.",
        "w": null
      },
      {
        "q": "Hidden fees damage trust more than low prices.",
        "ok": "True",
        "wrong": [
          "False"
        ],
        "e": "Скрытые комиссии подрывают доверие сильнее, чем низкие цены.",
        "w": null
      },
      {
        "q": "In the text, 'segment' means:",
        "ok": "a group of customers with similar needs",
        "wrong": [
          "a part of the bank's building",
          "a single step in a payment",
          "a type of report for the board"
        ],
        "e": "Segment это сегмент клиентов.",
        "w": "segment"
      },
      {
        "q": "What should you do when you raise a price?",
        "ok": "Show what customers get in return",
        "wrong": [
          "Announce it quietly after the change",
          "Remove the cheaper plans at once",
          "Wait until competitors do the same"
        ],
        "e": "Повышение цены должно сопровождаться понятной ценностью.",
        "w": null
      }
    ]
  },
  {
    "id": "a17",
    "title": "Hiring and growing product managers",
    "topic": "Hiring",
    "text": [
      "A Head of Product builds the team that builds the product. Hiring is one of the most important decisions you make, and mistakes are costly. Start with the role: what must this person own in the first six months, and what skills does the job need?",
      "Test [[product sense|product sense]], the ability to understand customers and find good solutions. Give a real problem, such as 'Customers abandon the card activation screen,' and listen to how the candidate thinks. Do they ask questions, form a [[hypothesis|hypothesis]], and explain trade-offs?",
      "Look at how the person works with others. Ask for stories about conflicts with engineers or executives. Strong candidates describe what they did, what they learned, and admit mistakes. Be careful with those who only say 'we': it can be a [[red flag|red flag]].",
      "Hiring is only the beginning. Give new people a clear [[onboarding|onboarding]] plan, a first project that is small but real, and regular feedback. A good PM who is left alone can fail, and a good manager can help an average PM become strong."
    ],
    "words": [
      {
        "w": "product sense",
        "ru": "продуктовое чутьё",
        "how": "Умение понимать клиентов и находить хорошие решения.",
        "ex": "She shows strong product sense."
      },
      {
        "w": "hypothesis",
        "ru": "гипотеза",
        "how": "Идея о причине или решении, которую можно проверить.",
        "ex": "Our hypothesis is that the step is too long."
      },
      {
        "w": "red flag",
        "ru": "тревожный сигнал",
        "how": "Признак возможной проблемы.",
        "ex": "Blaming others is a red flag."
      },
      {
        "w": "onboarding",
        "ru": "адаптация нового сотрудника",
        "how": "План, который помогает новичку быстро включиться в работу.",
        "ex": "A good onboarding plan saves months."
      }
    ],
    "quiz": [
      {
        "q": "What is product sense?",
        "ok": "The ability to understand customers and find good solutions",
        "wrong": [
          "Knowing how to write code for a banking product",
          "Remembering every single feature that exists in the app",
          "Being able to read the financial reports of the bank"
        ],
        "e": "Product sense это продуктовое чутьё.",
        "w": null
      },
      {
        "q": "What does the text suggest giving a candidate?",
        "ok": "A real problem, like customers abandoning card activation",
        "wrong": [
          "A list of the bank's internal rules and policies",
          "A test about the history of banking in the country",
          "A task to write a long contract with a vendor"
        ],
        "e": "Реальная задача показывает, как человек думает.",
        "w": null
      },
      {
        "q": "A candidate who only says 'we' may be a red flag.",
        "ok": "True",
        "wrong": [
          "False"
        ],
        "e": "Если кандидат не говорит, что сделал сам, это повод насторожиться.",
        "w": null
      },
      {
        "q": "In the text, 'hypothesis' means:",
        "ok": "an idea about a cause or solution that you can test",
        "wrong": [
          "a final decision approved by leadership",
          "a customer complaint sent by email",
          "a plan for the next quarter's budget"
        ],
        "e": "Гипотеза это идея, которую можно проверить.",
        "w": "hypothesis"
      },
      {
        "q": "What helps a new hire succeed?",
        "ok": "A clear onboarding plan, a small real project and feedback",
        "wrong": [
          "A large project with no guidance from the manager",
          "Waiting a full month before giving any feedback",
          "A long list of company rules to read in a week"
        ],
        "e": "Новичку нужны понятный план, реальная задача и обратная связь.",
        "w": null
      }
    ]
  },
  {
    "id": "a18",
    "title": "Presenting to the executive team",
    "topic": "Communication",
    "text": [
      "Executives have little time and many priorities. When you present, start with the [[bottom line|bottom line]]: what you recommend and what you need from them. Then give the reasons. A story that begins with background loses the room before the point arrives.",
      "Structure your message in three parts: the situation, the options and your [[recommendation|recommendation]]. Show two or three options with costs, risks and expected results. Executives like to choose, but they also want to hear what you think is best, and why.",
      "Use numbers carefully. One clear chart is stronger than ten tables. Say what the number means for the business: 'Closed accounts rose 2%, which costs us about 400,000 dollars a year.' Be honest about what you do not yet know, and say how you will find out.",
      "Prepare for questions. Think about what the CFO, the CEO and the head of risk will ask, and prepare short answers. If you do not know something, say so, and promise to [[follow up|follow-up]] by a date. Calm, honest answers build more [[credibility|credibility]] than perfect slides."
    ],
    "words": [
      {
        "w": "bottom line",
        "ru": "главный вывод",
        "how": "Самое важное, с чего начинают сообщение.",
        "ex": "Start with the bottom line."
      },
      {
        "w": "recommendation",
        "ru": "рекомендация",
        "how": "Ваш совет: что делать и почему.",
        "ex": "Our recommendation is to run a pilot."
      },
      {
        "w": "follow-up",
        "ru": "вернуться с ответом позже",
        "how": "Дополнительное действие после встречи.",
        "ex": "I will follow up by Friday."
      },
      {
        "w": "credibility",
        "ru": "доверие к вам как к эксперту",
        "how": "Репутация человека, которому верят.",
        "ex": "Honest answers build credibility."
      }
    ],
    "quiz": [
      {
        "q": "How should you start a presentation to executives?",
        "ok": "With the bottom line: your recommendation and what you need",
        "wrong": [
          "With a long history of the project and its background",
          "With a joke to relax the room before the point",
          "With a list of all possible risks and problems"
        ],
        "e": "Руководителям сначала нужен вывод и просьба.",
        "w": null
      },
      {
        "q": "What are the three parts of the message?",
        "ok": "The situation, the options and your recommendation",
        "wrong": [
          "The budget, the schedule and the team",
          "The problem, the apology and the plan",
          "The data, the charts and the summary"
        ],
        "e": "Ситуация, варианты, рекомендация.",
        "w": null
      },
      {
        "q": "It is better to hide what you do not know.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Честность о неизвестном повышает доверие.",
        "w": null
      },
      {
        "q": "In the text, 'credibility' means:",
        "ok": "the quality of being trusted and believed",
        "wrong": [
          "the amount of money you can approve",
          "the speed at which you answer questions",
          "the number of people who attend"
        ],
        "e": "Credibility это доверие к вам.",
        "w": "credibility"
      },
      {
        "q": "What should you do if you cannot answer a question?",
        "ok": "Say so, and promise to follow up by a date",
        "wrong": [
          "Give your best guess to keep the meeting moving",
          "Ask another person to answer for you",
          "Say that the question is not relevant"
        ],
        "e": "Честно скажите, что не знаете, и назовите срок ответа.",
        "w": null
      }
    ]
  },
  {
    "id": "a19",
    "title": "Product vision and strategy",
    "topic": "Strategy",
    "text": [
      "A [[vision|vision]] describes the future you want to create for customers, for example: 'Every small business in the country manages its money in one app.' A [[strategy|strategy]] explains how you will get there with limited time and money. A vision without strategy is a wish, and a strategy without vision is a list of tasks.",
      "A good strategy makes choices. It says where you will play, such as which customers, and where you will not. It also says how you will win: faster service, better prices, or a better experience. This is your [[competitive advantage|competitive advantage]]. If everything is a priority, nothing is.",
      "Test your strategy with simple questions. Could a competitor say the same thing? Does it help a team decide what to stop doing? Can a new employee explain it in one minute? If not, simplify it until they can.",
      "A strategy lives through decisions. Review it every year, and listen for [[signals|signal]] that the market has changed: new regulations, new competitors, new customer habits. Be ready to change the plan, but stay stable about the vision."
    ],
    "words": [
      {
        "w": "vision",
        "ru": "видение",
        "how": "Образ будущего, которое вы хотите создать для клиентов.",
        "ex": "The vision is clear and short."
      },
      {
        "w": "strategy",
        "ru": "стратегия",
        "how": "План, как достичь цели при ограниченных ресурсах.",
        "ex": "Our strategy focuses on small businesses."
      },
      {
        "w": "competitive advantage",
        "ru": "конкурентное преимущество",
        "how": "То, в чём вы сильнее других.",
        "ex": "Speed is our competitive advantage."
      },
      {
        "w": "signal",
        "ru": "сигнал",
        "how": "Признак того, что что-то на рынке меняется.",
        "ex": "New regulation is a strong signal."
      }
    ],
    "quiz": [
      {
        "q": "What is the difference between vision and strategy?",
        "ok": "Vision is the future you want, and strategy is how to get there",
        "wrong": [
          "Vision is for customers and strategy is for investors",
          "Vision lasts one year and strategy lasts ten",
          "Vision is written by engineers and strategy by sales"
        ],
        "e": "Видение это куда, стратегия это как.",
        "w": null
      },
      {
        "q": "What does a good strategy do?",
        "ok": "It makes choices, including what you will not do",
        "wrong": [
          "It lists all the ideas that the team has collected",
          "It copies what the strongest competitors are saying",
          "It promises strong results in every area of the bank"
        ],
        "e": "Стратегия включает отказы, а не только планы.",
        "w": null
      },
      {
        "q": "A new employee should be able to explain the strategy in one minute.",
        "ok": "True",
        "wrong": [
          "False"
        ],
        "e": "Если новичок не может объяснить стратегию за минуту, она слишком сложная.",
        "w": null
      },
      {
        "q": "In the text, 'signal' means:",
        "ok": "a sign that something in the market is changing",
        "wrong": [
          "a message that the bank sends to its customers",
          "a button inside the mobile banking application",
          "a rule issued by the financial regulator"
        ],
        "e": "Signal это сигнал об изменении рынка.",
        "w": "signal"
      },
      {
        "q": "What should stay stable when the market changes?",
        "ok": "The vision",
        "wrong": [
          "The detailed plan",
          "The list of competitors",
          "The budget of each team"
        ],
        "e": "План можно менять, а видение остаётся устойчивым.",
        "w": null
      }
    ]
  },
  {
    "id": "a20",
    "title": "Trust and risk in banking products",
    "topic": "Risk",
    "text": [
      "In banking, trust is the product. Customers give you their money and their data, and they expect both to be safe. One serious incident can undo years of work, so a CPO thinks about [[risk|risk]] as part of every product decision, not as a final check.",
      "Build safety into the process. Involve compliance and security from the start, not the day before a release. Use a [[risk assessment|risk assessment]] for every feature that touches money or personal data, and agree who owns each risk.",
      "Plan for failure. Systems break, and people make mistakes. Prepare an incident plan: who leads, how to inform customers and regulators, and how to learn afterwards. A [[blameless|blameless]] review focuses on fixing the process, so people report problems early instead of hiding them.",
      "When something goes wrong, be fast and honest. Say what happened, what data was affected, and what you are doing. Customers forgive mistakes more easily than secrecy. After the incident, share what changed, because trust returns through [[transparency|transparency]]."
    ],
    "words": [
      {
        "w": "risk",
        "ru": "риск",
        "how": "Вероятность того, что что-то пойдёт не так, и цена ошибки.",
        "ex": "Every release has a risk."
      },
      {
        "w": "risk assessment",
        "ru": "оценка рисков",
        "how": "Анализ того, что может пойти не так и как это предотвратить.",
        "ex": "We completed the risk assessment."
      },
      {
        "w": "blameless",
        "ru": "без поиска виноватых",
        "how": "Разбор, где ищут причины, а не людей.",
        "ex": "We held a blameless review."
      },
      {
        "w": "transparency",
        "ru": "прозрачность",
        "how": "Открытость в том, что произошло и что делается.",
        "ex": "Transparency rebuilds trust."
      }
    ],
    "quiz": [
      {
        "q": "Why does the text say trust is the product in banking?",
        "ok": "Customers give you their money and data and expect safety",
        "wrong": [
          "Banks have few other features to offer",
          "Customers read the terms of service carefully",
          "Regulators measure trust every month"
        ],
        "e": "Клиенты доверяют банку деньги и данные.",
        "w": null
      },
      {
        "q": "When should compliance and security join?",
        "ok": "From the start of the work",
        "wrong": [
          "The day before the release",
          "After customers report a problem",
          "Only when a regulator asks"
        ],
        "e": "Безопасность закладывают с самого начала.",
        "w": null
      },
      {
        "q": "Customers usually forgive secrecy more easily than mistakes.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Наоборот: ошибки прощают легче, чем скрытность.",
        "w": null
      },
      {
        "q": "In the text, 'blameless' means:",
        "ok": "focused on fixing the process, not on blaming people",
        "wrong": [
          "without any records of what happened during the event",
          "not connected with the bank's rules and policies",
          "done only by outside experts hired for the review"
        ],
        "e": "Blameless это без поиска виноватых.",
        "w": "blameless"
      },
      {
        "q": "What should a message after an incident include?",
        "ok": "What happened, what data was affected and what you are doing",
        "wrong": [
          "Only an apology that is signed by the chief executive",
          "A promise that this will never happen again in the bank",
          "The name of the person who is responsible for the bug"
        ],
        "e": "Нужны факты, затронутые данные и действия.",
        "w": null
      }
    ]
  },
  {
    "id": "a21",
    "title": "Build, buy or partner",
    "topic": "Strategy",
    "text": [
      "Every product leader faces this choice: should we build a capability ourselves, buy it, or work with a partner? There is no universal answer. The right choice depends on how important the capability is, how fast you need it, and what you want to learn.",
      "Build when the capability is your [[core|core]], something that makes your bank different, such as your risk model or your customer experience. Building takes time and talent, but you keep control and learn deeply.",
      "Buy or [[license|license]] when the capability is common and speed matters, such as card processing or identity checks. Compare the total cost over several years, not only the first price. Check the vendor's reliability, security and what happens if you want to leave, which is called [[exit cost|exit cost]].",
      "Partner when another company has strengths you lack and you can share the benefits. A good partnership has clear roles, shared goals and an agreement on data. Whatever you choose, review the decision every year, and think about [[time to market|time to market]] and risk."
    ],
    "words": [
      {
        "w": "core",
        "ru": "ядро, основа бизнеса",
        "how": "То, что делает ваш банк особенным.",
        "ex": "Risk scoring is our core."
      },
      {
        "w": "license",
        "ru": "лицензировать, купить право использовать",
        "how": "Заплатить за право использовать чужую технологию.",
        "ex": "We license the identity check."
      },
      {
        "w": "exit cost",
        "ru": "стоимость выхода",
        "how": "Сколько стоит уйти от поставщика или партнёра.",
        "ex": "A high exit cost creates lock-in."
      },
      {
        "w": "time to market",
        "ru": "время выхода на рынок",
        "how": "Сколько нужно времени, чтобы запустить продукт.",
        "ex": "Buying shortens time to market."
      }
    ],
    "quiz": [
      {
        "q": "When does the text say to build?",
        "ok": "When the capability is core and makes your bank different",
        "wrong": [
          "When the capability is very common across all banks",
          "When you need the capability as fast as possible",
          "When another company already offers the same thing"
        ],
        "e": "Строят то, что отличает банк от других.",
        "w": null
      },
      {
        "q": "What should you compare when buying?",
        "ok": "The total cost over several years, not only the first price",
        "wrong": [
          "The size and the location of the vendor's offices",
          "The number of the vendor's other clients, and nothing else",
          "The price of the cheapest competitor on the market"
        ],
        "e": "Смотрите на полную стоимость за несколько лет.",
        "w": null
      },
      {
        "q": "A decision to build, buy or partner never needs to be reviewed.",
        "ok": "False",
        "wrong": [
          "True"
        ],
        "e": "Рынок и потребности меняются, решение нужно пересматривать.",
        "w": null
      },
      {
        "q": "In the text, 'exit cost' means:",
        "ok": "the cost of leaving a vendor or partner",
        "wrong": [
          "the fee paid at the end of a month",
          "the price of closing a customer account",
          "the cost of removing an old feature"
        ],
        "e": "Exit cost это стоимость ухода от поставщика.",
        "w": "exit cost"
      },
      {
        "q": "What does a good partnership need?",
        "ok": "Clear roles, shared goals and an agreement on data",
        "wrong": [
          "A very long contract with many clauses",
          "One company that makes all decisions",
          "Public announcements before the launch"
        ],
        "e": "Хорошему партнёрству нужны роли, общие цели и договорённости о данных.",
        "w": null
      }
    ]
  }
];
