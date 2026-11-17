/* Product report-writing exercises. */
var PRODUCT_REPORTS = [
  {
    "to": "Anna",
    "subj": "Export feature will miss Friday",
    "t": "Hi Anna,\n\nQuick update on the export feature. The Excel export is {1}: testing found 14 bugs in the first build, and 6 of them are critical.\n\nMy suggestion: {2} Users get the core value on time, and we do not risk a broken release.\n\nCould you {3}?",
    "g": [
      [
        "running about three days behind schedule",
        "almost ready and there is nothing to worry about",
        "not working, but it is not our fault",
        "Нужны факты и срок: честно, без оправданий и без приукрашивания."
      ],
      [
        "ship the CSV export on Friday and move Excel to next week.",
        "delay the whole release until Excel is ready.",
        "ship both on Friday and fix the bugs later.",
        "Конкретный план, который сохраняет дату и не рискует качеством."
      ],
      [
        "confirm this plan by tomorrow noon so I can update the team",
        "tell me what to do, because I am not sure",
        "ignore this message if you are busy",
        "Чёткая просьба с дедлайном, а не расплывчатое «скажите, что делать»."
      ]
    ]
  },
  {
    "to": "Mark",
    "subj": "Week-1 retention dropped after the new onboarding",
    "t": "Hi Mark,\n\nWeek-1 retention fell from 41% to 33% after the new onboarding went live two weeks ago. {1} Most users leave on the third screen, where we ask for access to contacts.\n\nI recommend that we {2}. We can run it as an A/B test on 20% of new users.\n\nI will share the first results {3}.",
    "g": [
      [
        "The timing points to the new onboarding as the main cause.",
        "Retention always goes up and down, so we can ignore it.",
        "Our users are not interested in the product anymore.",
        "Вывод основан на данных: время совпадает с релизом, а не на догадках."
      ],
      [
        "move the contacts request to after the first successful action",
        "remove the onboarding completely",
        "wait one more month and see what happens",
        "Решение бьёт в конкретную точку, где уходят пользователи."
      ],
      [
        "next Thursday, once we have 7 days of data",
        "when they are ready",
        "at some point later",
        "Конкретный срок, привязанный к данным."
      ]
    ]
  },
  {
    "to": "the team",
    "subj": "Checkout outage yesterday",
    "t": "Hi team,\n\nYesterday between 14:10 and 15:05 the checkout was down. About 1,200 orders were affected, which is around 4% of daily revenue. {1}\n\nTo prevent this, {2}. {3}",
    "g": [
      [
        "The cause was an expired payment certificate, and it is now fixed.",
        "Something broke, and we are still guessing why.",
        "It was a small problem and nobody noticed.",
        "Причина и статус: что случилось и что уже сделано."
      ],
      [
        "we will add an alert 30 days before any certificate expires",
        "we will ask engineers to be more careful",
        "we hope it will not happen again",
        "Системная мера, а не надежда или призыв «быть внимательнее»."
      ],
      [
        "A full post-mortem will be shared on Friday.",
        "No further updates are planned.",
        "We will talk about it if someone asks.",
        "Обещаешь следующий шаг и срок."
      ]
    ]
  },
  {
    "to": "Olga",
    "subj": "Pricing page test results",
    "t": "Hi Olga,\n\nWe finished the test of the new pricing page. Conversion went from 3.1% to 3.6% (+16%), with 95% confidence. {1} However, refunds grew from 2% to 3.5%.\n\nBecause of this, {2}. I need {3}.",
    "g": [
      [
        "The result is statistically significant and positive.",
        "The result is random, so it means nothing.",
        "The new page is a total success.",
        "Уверенность 95% позволяет назвать результат значимым, но не «полным успехом»."
      ],
      [
        "I suggest we roll out to 50% of users and watch the refunds for two weeks",
        "we should roll out to everyone today",
        "we should cancel the test immediately",
        "Осторожный шаг: учитываем и плюс, и рост возвратов."
      ],
      [
        "your approval to extend the test by two weeks",
        "nothing from you, I will decide alone",
        "more time, but I cannot say why",
        "Понятная просьба о решении."
      ]
    ]
  },
  {
    "to": "Dmitry",
    "subj": "Sprint 14 summary",
    "t": "Hi Dmitry,\n\nThis sprint we completed 18 of 26 story points. {1} The main reason is two urgent bugs from support that took 6 points.\n\nNext sprint I plan to {2}, so the team is not overloaded. {3}",
    "g": [
      [
        "That is 69%, below our usual 85%.",
        "That is a great result, with no problems at all.",
        "The team did not work enough.",
        "Сравнение с нормой и без обвинений: факты, а не оценки людей."
      ],
      [
        "reserve 20% of capacity for urgent bugs",
        "add more tasks to catch up",
        "stop fixing bugs from support",
        "Закладываем буфер под известную причину срыва."
      ],
      [
        "Please tell me if you see any risks in this approach.",
        "This is final and there is nothing to discuss.",
        "I do not need any feedback.",
        "Просишь обратную связь, а не ставишь перед фактом."
      ]
    ]
  },
  {
    "to": "Anna",
    "subj": "Request from Sales: custom reports for Acme",
    "t": "Hi Anna,\n\nSales asked us to build custom reports for one large client, Acme. It would take about six weeks and delay the mobile app. {1} Acme brings 5% of our revenue, while the mobile app can reach 30% of new users.\n\nMy recommendation is to {2}. In the meantime, {3}.",
    "g": [
      [
        "I compared the numbers, and the trade-off is not in favour of Acme.",
        "Sales is wrong, and I will not talk to them.",
        "Both options are equally good, so you decide.",
        "Решение опирается на цифры и не обесценивает коллег."
      ],
      [
        "keep the mobile app as the priority and offer Acme a simpler export",
        "build custom reports first because the client is important",
        "stop all work until both teams agree",
        "Приоритет по влиянию плюс альтернатива для клиента."
      ],
      [
        "I will explain the reasons to the Sales lead personally",
        "I will say nothing to Sales",
        "Sales can wait without any explanation",
        "Работа с ожиданиями стейкхолдера."
      ]
    ]
  },
  {
    "to": "Mark",
    "subj": "Cloud costs this quarter",
    "t": "Hi Mark,\n\nOur cloud costs grew by 22% this quarter and reached $48,000. {1} Two services use 60% of the budget, and one of them runs at only 15% capacity.\n\nI propose to {2}. This could save around $6,000 per month, {3}.",
    "g": [
      [
        "The growth is faster than our user growth, which was 9%.",
        "The costs are fine because we are a big company.",
        "Nobody knows why the costs are growing.",
        "Рост затрат сравнивается с ростом пользователей, поэтому видно проблему."
      ],
      [
        "downsize the underused service and set up monthly cost reviews",
        "buy a bigger plan to be safe",
        "switch off the second service for a week",
        "Действие по конкретной точке потерь плюс регулярный контроль."
      ],
      [
        "with no impact on users according to engineering",
        "but I have not checked the risks",
        "if we are lucky",
        "Экономия подкреплена оценкой рисков."
      ]
    ]
  },
  {
    "to": "Elena",
    "subj": "What churned customers told us",
    "t": "Hi Elena,\n\nI interviewed 12 churned customers last week. {1} Nine of them said that setup was too complicated, and only two mentioned the price.\n\nThis means {2}. I would like to {3}.",
    "g": [
      [
        "The pattern is clear enough to act on.",
        "The interviews were not useful.",
        "Every customer said something different, so I have no idea.",
        "9 из 12 — устойчивая закономерность."
      ],
      [
        "our biggest problem is onboarding, not pricing",
        "we should lower the price immediately",
        "customers do not understand our product at all",
        "Вывод точно следует из данных, без обобщений."
      ],
      [
        "start a small project to simplify setup next sprint",
        "do more interviews for six months before any action",
        "ask customers to read the manual",
        "Небольшой шаг сразу, а не бесконечные исследования."
      ]
    ]
  },
  {
    "to": "Anna",
    "subj": "Search launch: risk to the 15th",
    "t": "Hi Anna,\n\nThe launch of the new search is planned for the 15th. Right now we have 3 open blockers, and QA needs five more days. {1}\n\nThere are two options: {2}. I prefer the second one, {3}.",
    "g": [
      [
        "There is a real risk that we miss the date.",
        "The launch date is safe, so do not worry.",
        "The launch is cancelled.",
        "Честно называешь риск, не паникуя и не скрывая."
      ],
      [
        "launch on the 15th with limited features, or move the date to the 22nd",
        "launch on the 15th no matter what, or never",
        "ask QA to work faster, or ask users to wait",
        "Два реальных варианта, из которых можно выбрать."
      ],
      [
        "because a broken search would hurt more than a one-week delay",
        "because it is easier for me",
        "because I do not like the first option",
        "Рекомендация объяснена влиянием на пользователей."
      ]
    ]
  },
  {
    "to": "the team",
    "subj": "Weekly update",
    "t": "Hi team,\n\nHere is the weekly summary. Active users grew by 4% to 52,000, {1}. The main risk is support: the average response time is now 9 hours instead of 4.\n\nThis week I will {2}. {3}",
    "g": [
      [
        "but the growth is slower than our goal of 6%",
        "and everything is perfect",
        "which means nothing",
        "Цифра сравнивается с целью: видно и рост, и отставание."
      ],
      [
        "hire two temporary agents and review the top five ticket types",
        "wait and see if it gets better",
        "ask customers to write less",
        "Конкретное действие против конкретного риска."
      ],
      [
        "I will report the response time again next Monday.",
        "Please do not ask me about it.",
        "I will not report it again.",
        "Следующий отчёт по метрике и срок."
      ]
    ]
  }
];
