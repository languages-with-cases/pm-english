/* Product event definitions and stable event-case records. */
var PRODUCT_EVENTS = [
  {
    "id": "ev01",
    "title": "Business Trip",
    "place": "Singapore",
    "meters": [
      "Team trust",
      "Local insight",
      "Budget"
    ],
    "story": "Northwind Bank is launching a new savings product in its Singapore office. Head office sends you on a two-week business trip to help the local team. You will meet new colleagues, a different culture and a tight budget. Every answer changes three numbers: team trust, local insight and budget.",
    "endings": {
      "good": "You fly home with the trust of the local team, real insight about the market and a budget you protected. The Singapore launch starts strong.",
      "mid": "The trip was useful, but some trust and some budget were lost along the way. The launch will need extra care.",
      "bad": "The trip was hard. Trust is thin, insight is limited and the budget is stretched, but you learned how much a new market asks from a PM."
    },
    "levels": [
      {
        "topic": "Onboarding",
        "day": "Day 1",
        "sender": [
          "Mei",
          "Local Product Lead",
          "Slack"
        ],
        "scene": "You land in Singapore after a twelve-hour flight. The local office is bright and busy, and everyone is polite, but you can tell they are waiting to see what kind of manager head office has sent.",
        "endings": {
          "good": "The local team opens up, and you learn that families save together. A real insight is waiting to be tested.",
          "mid": "The team is polite, but you only know half of the story, and trust grows slowly.",
          "bad": "The team keeps its distance, and important facts stay hidden from you."
        },
        "steps": [
          {
            "msg": "Mei: 'Welcome! The team has built the savings feature for three months. Head office expects quick results. How will you spend your first week?'",
            "alt": null,
            "options": [
              {
                "t": "Meet each teammate one-on-one this week and ask what they have already tried and what blocks them.",
                "p": 15,
                "ok": true,
                "e": [
                  8,
                  10,
                  0
                ],
                "c": "Начинает со слушания: так появляется доверие и видна реальная картина.",
                "r": "You hear three problems no report mentioned, and the team feels respected."
              },
              {
                "t": "Study the project documents alone for two days and then share your conclusions with the team.",
                "p": 7,
                "ok": false,
                "e": [
                  -2,
                  4,
                  0
                ],
                "c": "Документы полезны, но два дня в одиночку выглядят как дистанция.",
                "r": "You learn the background, but the team wonders why you are not talking to them."
              },
              {
                "t": "Present the head office plan on day one so that everyone knows what the bank expects from you.",
                "p": 0,
                "ok": false,
                "e": [
                  -10,
                  -5,
                  0
                ],
                "c": "Готовый план без вопросов: местная команда чувствует давление.",
                "r": "The team goes quiet, and some people feel their work is being ignored."
              },
              {
                "t": "Join every daily standup, observe quietly for a week and take notes before giving any opinion.",
                "p": 10,
                "ok": false,
                "e": [
                  3,
                  6,
                  0
                ],
                "c": "Многое узнаёт, но молчание легко принять за безразличие.",
                "r": "You learn how the team works, but nobody knows what you think yet."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "one-on-one",
                "ru": "личная встреча один на один",
                "how": "Разговор двух людей без других участников.",
                "ex": "I had a one-on-one with every engineer."
              },
              {
                "w": "blocker",
                "ru": "блокер, препятствие",
                "how": "То, что мешает двигаться дальше.",
                "ex": "Missing access is the main blocker."
              }
            ]
          },
          {
            "msg": "Wei says local families usually save together in one shared account, but head office designed only individual savings goals. Customers do not use them. What do you do?",
            "alt": null,
            "options": [
              {
                "t": "Ask Wei to introduce five local customers, and interview them about how families save before you change anything.",
                "p": 15,
                "ok": true,
                "e": [
                  5,
                  12,
                  -3
                ],
                "c": "Проверяет гипотезу на людях до изменений: дёшево и надёжно.",
                "r": "The interviews confirm that goals are shared, and the team sees you take local habits seriously."
              },
              {
                "t": "Build a quick shared-goal prototype and show it to a few customers next week to see if the idea fits.",
                "p": 10,
                "ok": false,
                "e": [
                  4,
                  8,
                  -3
                ],
                "c": "Хорошо, но прототип строится до того, как понята привычка.",
                "r": "The prototype gets good reactions, but you built it before knowing why."
              },
              {
                "t": "Ask head office for global research that proves individual goals work, and use it to convince Wei.",
                "p": 0,
                "ok": false,
                "e": [
                  -8,
                  -8,
                  0
                ],
                "c": "Спор с местной командой данными из других стран ломает доверие.",
                "r": "Wei feels overruled, and the team stops sharing what they see in the market."
              },
              {
                "t": "Keep the individual goals and add a short tutorial that explains how family members can use them.",
                "p": 7,
                "ok": false,
                "e": [
                  0,
                  2,
                  0
                ],
                "c": "Это лечит симптом, а настоящая причина остаётся нетронутой.",
                "r": "A few customers read the tutorial, but the habit stays the same."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "shared account",
                "ru": "общий счёт",
                "how": "Счёт, которым пользуются несколько человек, например семья.",
                "ex": "Families often use a shared account."
              },
              {
                "w": "prototype",
                "ru": "прототип",
                "how": "Быстрая пробная версия, чтобы проверить идею.",
                "ex": "We built a prototype in two days."
              }
            ]
          }
        ],
        "c": {
          "id": "ev01_1",
          "type": "special",
          "scn": true,
          "ev": "ev01",
          "evIdx": 0,
          "level": 0,
          "topic": "Onboarding",
          "sender": {
            "name": "Mei",
            "role": "Local Product Lead",
            "channel": "Slack"
          },
          "meters": [
            "Team trust",
            "Local insight",
            "Budget"
          ],
          "endings": {
            "good": "The local team opens up, and you learn that families save together. A real insight is waiting to be tested.",
            "mid": "The team is polite, but you only know half of the story, and trust grows slowly.",
            "bad": "The team keeps its distance, and important facts stay hidden from you."
          },
          "steps": [
            {
              "msg": "Mei: 'Welcome! The team has built the savings feature for three months. Head office expects quick results. How will you spend your first week?'",
              "alt": null,
              "options": [
                {
                  "t": "Meet each teammate one-on-one this week and ask what they have already tried and what blocks them.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    8,
                    10,
                    0
                  ],
                  "c": "Начинает со слушания: так появляется доверие и видна реальная картина.",
                  "r": "You hear three problems no report mentioned, and the team feels respected."
                },
                {
                  "t": "Study the project documents alone for two days and then share your conclusions with the team.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    -2,
                    4,
                    0
                  ],
                  "c": "Документы полезны, но два дня в одиночку выглядят как дистанция.",
                  "r": "You learn the background, but the team wonders why you are not talking to them."
                },
                {
                  "t": "Present the head office plan on day one so that everyone knows what the bank expects from you.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -10,
                    -5,
                    0
                  ],
                  "c": "Готовый план без вопросов: местная команда чувствует давление.",
                  "r": "The team goes quiet, and some people feel their work is being ignored."
                },
                {
                  "t": "Join every daily standup, observe quietly for a week and take notes before giving any opinion.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    3,
                    6,
                    0
                  ],
                  "c": "Многое узнаёт, но молчание легко принять за безразличие.",
                  "r": "You learn how the team works, but nobody knows what you think yet."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "one-on-one",
                  "ru": "личная встреча один на один",
                  "how": "Разговор двух людей без других участников.",
                  "ex": "I had a one-on-one with every engineer."
                },
                {
                  "w": "blocker",
                  "ru": "блокер, препятствие",
                  "how": "То, что мешает двигаться дальше.",
                  "ex": "Missing access is the main blocker."
                }
              ]
            },
            {
              "msg": "Wei says local families usually save together in one shared account, but head office designed only individual savings goals. Customers do not use them. What do you do?",
              "alt": null,
              "options": [
                {
                  "t": "Ask Wei to introduce five local customers, and interview them about how families save before you change anything.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    5,
                    12,
                    -3
                  ],
                  "c": "Проверяет гипотезу на людях до изменений: дёшево и надёжно.",
                  "r": "The interviews confirm that goals are shared, and the team sees you take local habits seriously."
                },
                {
                  "t": "Build a quick shared-goal prototype and show it to a few customers next week to see if the idea fits.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    4,
                    8,
                    -3
                  ],
                  "c": "Хорошо, но прототип строится до того, как понята привычка.",
                  "r": "The prototype gets good reactions, but you built it before knowing why."
                },
                {
                  "t": "Ask head office for global research that proves individual goals work, and use it to convince Wei.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -8,
                    -8,
                    0
                  ],
                  "c": "Спор с местной командой данными из других стран ломает доверие.",
                  "r": "Wei feels overruled, and the team stops sharing what they see in the market."
                },
                {
                  "t": "Keep the individual goals and add a short tutorial that explains how family members can use them.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    0,
                    2,
                    0
                  ],
                  "c": "Это лечит симптом, а настоящая причина остаётся нетронутой.",
                  "r": "A few customers read the tutorial, but the habit stays the same."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "shared account",
                  "ru": "общий счёт",
                  "how": "Счёт, которым пользуются несколько человек, например семья.",
                  "ex": "Families often use a shared account."
                },
                {
                  "w": "prototype",
                  "ru": "прототип",
                  "how": "Быстрая пробная версия, чтобы проверить идею.",
                  "ex": "We built a prototype in two days."
                }
              ]
            }
          ]
        }
      },
      {
        "topic": "Communication",
        "day": "Day 3",
        "sender": [
          "Wei",
          "Local Engineering Lead",
          "Slack"
        ],
        "scene": "By the third day you sit in your first big team meeting. The talk is in English, but for most people it is a second language, and the room is quieter than you expected.",
        "endings": {
          "good": "Meetings become clear and safe. People share risks early instead of staying silent.",
          "mid": "Communication improves, but some people still keep their doubts to themselves.",
          "bad": "Silence grows in the meetings, and risks appear only when it is too late."
        },
        "steps": [
          {
            "msg": "Wei: 'In the meeting you said let's circle back on that. People nodded, but nobody knew what to do next. How will you make sure the team understands?'",
            "alt": null,
            "options": [
              {
                "t": "Send a written summary after each meeting with owners and dates, and ask everyone to confirm or correct it.",
                "p": 15,
                "ok": true,
                "e": [
                  6,
                  6,
                  0
                ],
                "c": "Письменная фиксация с владельцами и сроками снимает зависимость от языка и скорости речи.",
                "r": "Two people correct the summary the next morning, and the plan becomes clear for all."
              },
              {
                "t": "Speak more slowly and ask does everyone understand after every point, so nobody stays silent.",
                "p": 7,
                "ok": false,
                "e": [
                  3,
                  3,
                  0
                ],
                "c": "Вопрос «всем понятно?» редко работает: люди отвечают «да» из вежливости.",
                "r": "Everyone says yes, but two tasks are still done in a different way."
              },
              {
                "t": "Tell the team to ask questions when something is unclear, and assume that silence means all is fine.",
                "p": 0,
                "ok": false,
                "e": [
                  -6,
                  -3,
                  0
                ],
                "c": "Молчание не равно согласию, особенно в другой культуре.",
                "r": "Nobody asks, and the misunderstanding appears a week later in the release."
              },
              {
                "t": "Avoid idioms, use short sentences and share the agenda in advance so people can prepare questions.",
                "p": 10,
                "ok": false,
                "e": [
                  5,
                  5,
                  0
                ],
                "c": "Хорошо и полезно, но без письменных итогов договорённости теряются.",
                "r": "The meeting feels easier, but nobody writes down who does what."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "idiom",
                "ru": "идиома, устойчивое выражение",
                "how": "Фраза, смысл которой не следует из отдельных слов.",
                "ex": "'Circle back' is an idiom many people do not know."
              },
              {
                "w": "action items",
                "ru": "задачи после встречи",
                "how": "Конкретные дела с исполнителем и сроком.",
                "ex": "Send the action items after the meeting."
              }
            ]
          },
          {
            "msg": "Jun, a young engineer, privately tells you that the release date is unrealistic. In meetings nobody disagrees with the manager. What do you do?",
            "alt": null,
            "options": [
              {
                "t": "Thank Jun, ask for details privately, raise the risk in the team channel as a question without a name, and ask for new estimates.",
                "p": 15,
                "ok": true,
                "e": [
                  8,
                  5,
                  0
                ],
                "c": "Защищает человека, поднимает риск и даёт команде безопасный способ пересмотреть сроки.",
                "r": "The team shares new estimates, and Jun feels safe to speak again."
              },
              {
                "t": "Tell Wei about Jun's message and ask Wei to handle the date change with the team.",
                "p": 7,
                "ok": false,
                "e": [
                  -3,
                  0,
                  0
                ],
                "c": "Рискует доверием Джуна, а решение передаёт другому.",
                "r": "Wei changes the date, but Jun learns his private message was passed on."
              },
              {
                "t": "Announce in the meeting that Jun thinks the date is unrealistic, and ask Jun to explain why.",
                "p": 0,
                "ok": false,
                "e": [
                  -12,
                  0,
                  0
                ],
                "c": "Публичное раскрытие личного сообщения разрушает доверие.",
                "r": "Jun is embarrassed, and nobody sends you honest feedback after that."
              },
              {
                "t": "Ask each engineer for an anonymous estimate in a form, and compare the results with the current plan.",
                "p": 10,
                "ok": false,
                "e": [
                  5,
                  4,
                  0
                ],
                "c": "Анонимно и безопасно, но без обсуждения риска команда не учится говорить открыто.",
                "r": "The form shows the date is too tight, but the team still avoids saying it aloud."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "raise a concern",
                "ru": "поднять беспокойство, озвучить риск",
                "how": "Сказать о проблеме открыто.",
                "ex": "Jun raised a concern about the date."
              },
              {
                "w": "estimate",
                "ru": "оценка сроков или трудозатрат",
                "how": "Прикидка, сколько времени займёт работа.",
                "ex": "We need a new estimate."
              }
            ]
          }
        ],
        "c": {
          "id": "ev01_2",
          "type": "special",
          "scn": true,
          "ev": "ev01",
          "evIdx": 1,
          "level": 0,
          "topic": "Communication",
          "sender": {
            "name": "Wei",
            "role": "Local Engineering Lead",
            "channel": "Slack"
          },
          "meters": [
            "Team trust",
            "Local insight",
            "Budget"
          ],
          "endings": {
            "good": "Meetings become clear and safe. People share risks early instead of staying silent.",
            "mid": "Communication improves, but some people still keep their doubts to themselves.",
            "bad": "Silence grows in the meetings, and risks appear only when it is too late."
          },
          "steps": [
            {
              "msg": "Wei: 'In the meeting you said let's circle back on that. People nodded, but nobody knew what to do next. How will you make sure the team understands?'",
              "alt": null,
              "options": [
                {
                  "t": "Send a written summary after each meeting with owners and dates, and ask everyone to confirm or correct it.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    6,
                    6,
                    0
                  ],
                  "c": "Письменная фиксация с владельцами и сроками снимает зависимость от языка и скорости речи.",
                  "r": "Two people correct the summary the next morning, and the plan becomes clear for all."
                },
                {
                  "t": "Speak more slowly and ask does everyone understand after every point, so nobody stays silent.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    3,
                    3,
                    0
                  ],
                  "c": "Вопрос «всем понятно?» редко работает: люди отвечают «да» из вежливости.",
                  "r": "Everyone says yes, but two tasks are still done in a different way."
                },
                {
                  "t": "Tell the team to ask questions when something is unclear, and assume that silence means all is fine.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -6,
                    -3,
                    0
                  ],
                  "c": "Молчание не равно согласию, особенно в другой культуре.",
                  "r": "Nobody asks, and the misunderstanding appears a week later in the release."
                },
                {
                  "t": "Avoid idioms, use short sentences and share the agenda in advance so people can prepare questions.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    5,
                    5,
                    0
                  ],
                  "c": "Хорошо и полезно, но без письменных итогов договорённости теряются.",
                  "r": "The meeting feels easier, but nobody writes down who does what."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "idiom",
                  "ru": "идиома, устойчивое выражение",
                  "how": "Фраза, смысл которой не следует из отдельных слов.",
                  "ex": "'Circle back' is an idiom many people do not know."
                },
                {
                  "w": "action items",
                  "ru": "задачи после встречи",
                  "how": "Конкретные дела с исполнителем и сроком.",
                  "ex": "Send the action items after the meeting."
                }
              ]
            },
            {
              "msg": "Jun, a young engineer, privately tells you that the release date is unrealistic. In meetings nobody disagrees with the manager. What do you do?",
              "alt": null,
              "options": [
                {
                  "t": "Thank Jun, ask for details privately, raise the risk in the team channel as a question without a name, and ask for new estimates.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    8,
                    5,
                    0
                  ],
                  "c": "Защищает человека, поднимает риск и даёт команде безопасный способ пересмотреть сроки.",
                  "r": "The team shares new estimates, and Jun feels safe to speak again."
                },
                {
                  "t": "Tell Wei about Jun's message and ask Wei to handle the date change with the team.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    -3,
                    0,
                    0
                  ],
                  "c": "Рискует доверием Джуна, а решение передаёт другому.",
                  "r": "Wei changes the date, but Jun learns his private message was passed on."
                },
                {
                  "t": "Announce in the meeting that Jun thinks the date is unrealistic, and ask Jun to explain why.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -12,
                    0,
                    0
                  ],
                  "c": "Публичное раскрытие личного сообщения разрушает доверие.",
                  "r": "Jun is embarrassed, and nobody sends you honest feedback after that."
                },
                {
                  "t": "Ask each engineer for an anonymous estimate in a form, and compare the results with the current plan.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    5,
                    4,
                    0
                  ],
                  "c": "Анонимно и безопасно, но без обсуждения риска команда не учится говорить открыто.",
                  "r": "The form shows the date is too tight, but the team still avoids saying it aloud."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "raise a concern",
                  "ru": "поднять беспокойство, озвучить риск",
                  "how": "Сказать о проблеме открыто.",
                  "ex": "Jun raised a concern about the date."
                },
                {
                  "w": "estimate",
                  "ru": "оценка сроков или трудозатрат",
                  "how": "Прикидка, сколько времени займёт работа.",
                  "ex": "We need a new estimate."
                }
              ]
            }
          ]
        }
      },
      {
        "topic": "Localization",
        "day": "Day 6",
        "sender": [
          "Aisha",
          "Local Marketing Manager",
          "Slack"
        ],
        "scene": "The launch is two weeks away. Marketing has a global campaign and a translation budget ready, and the local team has strong opinions about both.",
        "endings": {
          "good": "The campaign sounds local and passes legal review. Clicks are up, and the budget is under control.",
          "mid": "The campaign works, but it is either too plain or needed late fixes. It could have done more.",
          "bad": "The campaign misses the market or creates legal trouble, and the money is wasted."
        },
        "steps": [
          {
            "msg": "Aisha: 'Head office sent a global campaign and a 40,000 dollar translation budget. Local customers prefer messaging apps and QR payments, and competitors use local slang. What do we do?'",
            "alt": null,
            "options": [
              {
                "t": "Use the global campaign as the base, adapt the language and examples with local copywriters, and test one channel.",
                "p": 15,
                "ok": true,
                "e": [
                  4,
                  10,
                  5
                ],
                "c": "Берёт сильную основу и адаптирует её, а остаток бюджета отдаёт на проверку.",
                "r": "The adapted campaign keeps the brand voice, and the saved budget funds a clean test."
              },
              {
                "t": "Translate the global campaign exactly as it is, since the bank needs one brand voice in every country.",
                "p": 7,
                "ok": false,
                "e": [
                  0,
                  -3,
                  5
                ],
                "c": "Единый голос важен, но буквальный перевод звучит чуждо на местном рынке.",
                "r": "The campaign is correct but flat, and local customers barely react."
              },
              {
                "t": "Cancel the global campaign and create a new local one from scratch with the whole budget.",
                "p": 0,
                "ok": false,
                "e": [
                  -3,
                  5,
                  -12
                ],
                "c": "Выбрасывает готовую работу и тратит весь бюджет за две недели до запуска.",
                "r": "The new campaign sounds local, but the budget runs out before the launch."
              },
              {
                "t": "Test both versions with 500 customers, and choose which one to scale after one week.",
                "p": 10,
                "ok": false,
                "e": [
                  3,
                  8,
                  0
                ],
                "c": "Данные лучше мнений, но неделя теста съедает время до запуска.",
                "r": "The test gives a clear winner, but the launch has only one week left."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "localization",
                "ru": "локализация, адаптация под рынок",
                "how": "Адаптация продукта и текстов под язык и привычки страны.",
                "ex": "Localization is more than translation."
              },
              {
                "w": "copywriter",
                "ru": "копирайтер",
                "how": "Человек, который пишет рекламные и продуктовые тексты.",
                "ex": "A local copywriter fixed the tone."
              }
            ]
          },
          {
            "msg": "The test shows that slang raises clicks. But legal warns that some local phrases may sound like a guaranteed return on savings. What now?",
            "alt": null,
            "options": [
              {
                "t": "Keep slang where it is safe, rewrite the risky phrases with legal and add the required disclaimers before launch.",
                "p": 15,
                "ok": true,
                "e": [
                  4,
                  6,
                  0
                ],
                "c": "Сохраняет эффективность и снимает юридический риск до запуска.",
                "r": "The campaign keeps its local voice and passes the legal review in two days."
              },
              {
                "t": "Use slang everywhere because it performs best, and fix the legal comments after launch if someone complains.",
                "p": 0,
                "ok": false,
                "e": [
                  -10,
                  3,
                  -5
                ],
                "c": "Юридический риск для банка нельзя исправлять после жалоб.",
                "r": "A regulator notices a phrase about guaranteed returns, and the campaign is stopped."
              },
              {
                "t": "Remove all slang and use only formal language to avoid any legal risk.",
                "p": 7,
                "ok": false,
                "e": [
                  0,
                  -5,
                  0
                ],
                "c": "Безопасно, но убирает то, что работало лучше всего.",
                "r": "Legal is happy, but the click rate falls back to the old level."
              },
              {
                "t": "Ask head office compliance to approve every phrase, and delay the launch until the full review ends.",
                "p": 10,
                "ok": false,
                "e": [
                  -2,
                  2,
                  -5
                ],
                "c": "Надёжно, но откладывает запуск и тратит бюджет на ожидание.",
                "r": "Every phrase is approved, but the launch slips by two weeks."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "disclaimer",
                "ru": "оговорка, юридическое уведомление",
                "how": "Текст, который объясняет ограничения или риски.",
                "ex": "Add a disclaimer about returns."
              },
              {
                "w": "guaranteed return",
                "ru": "гарантированная доходность",
                "how": "Обещание, что клиент точно получит определённую прибыль.",
                "ex": "We cannot promise a guaranteed return."
              }
            ]
          }
        ],
        "c": {
          "id": "ev01_3",
          "type": "special",
          "scn": true,
          "ev": "ev01",
          "evIdx": 2,
          "level": 0,
          "topic": "Localization",
          "sender": {
            "name": "Aisha",
            "role": "Local Marketing Manager",
            "channel": "Slack"
          },
          "meters": [
            "Team trust",
            "Local insight",
            "Budget"
          ],
          "endings": {
            "good": "The campaign sounds local and passes legal review. Clicks are up, and the budget is under control.",
            "mid": "The campaign works, but it is either too plain or needed late fixes. It could have done more.",
            "bad": "The campaign misses the market or creates legal trouble, and the money is wasted."
          },
          "steps": [
            {
              "msg": "Aisha: 'Head office sent a global campaign and a 40,000 dollar translation budget. Local customers prefer messaging apps and QR payments, and competitors use local slang. What do we do?'",
              "alt": null,
              "options": [
                {
                  "t": "Use the global campaign as the base, adapt the language and examples with local copywriters, and test one channel.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    4,
                    10,
                    5
                  ],
                  "c": "Берёт сильную основу и адаптирует её, а остаток бюджета отдаёт на проверку.",
                  "r": "The adapted campaign keeps the brand voice, and the saved budget funds a clean test."
                },
                {
                  "t": "Translate the global campaign exactly as it is, since the bank needs one brand voice in every country.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    0,
                    -3,
                    5
                  ],
                  "c": "Единый голос важен, но буквальный перевод звучит чуждо на местном рынке.",
                  "r": "The campaign is correct but flat, and local customers barely react."
                },
                {
                  "t": "Cancel the global campaign and create a new local one from scratch with the whole budget.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -3,
                    5,
                    -12
                  ],
                  "c": "Выбрасывает готовую работу и тратит весь бюджет за две недели до запуска.",
                  "r": "The new campaign sounds local, but the budget runs out before the launch."
                },
                {
                  "t": "Test both versions with 500 customers, and choose which one to scale after one week.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    3,
                    8,
                    0
                  ],
                  "c": "Данные лучше мнений, но неделя теста съедает время до запуска.",
                  "r": "The test gives a clear winner, but the launch has only one week left."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "localization",
                  "ru": "локализация, адаптация под рынок",
                  "how": "Адаптация продукта и текстов под язык и привычки страны.",
                  "ex": "Localization is more than translation."
                },
                {
                  "w": "copywriter",
                  "ru": "копирайтер",
                  "how": "Человек, который пишет рекламные и продуктовые тексты.",
                  "ex": "A local copywriter fixed the tone."
                }
              ]
            },
            {
              "msg": "The test shows that slang raises clicks. But legal warns that some local phrases may sound like a guaranteed return on savings. What now?",
              "alt": null,
              "options": [
                {
                  "t": "Keep slang where it is safe, rewrite the risky phrases with legal and add the required disclaimers before launch.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    4,
                    6,
                    0
                  ],
                  "c": "Сохраняет эффективность и снимает юридический риск до запуска.",
                  "r": "The campaign keeps its local voice and passes the legal review in two days."
                },
                {
                  "t": "Use slang everywhere because it performs best, and fix the legal comments after launch if someone complains.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -10,
                    3,
                    -5
                  ],
                  "c": "Юридический риск для банка нельзя исправлять после жалоб.",
                  "r": "A regulator notices a phrase about guaranteed returns, and the campaign is stopped."
                },
                {
                  "t": "Remove all slang and use only formal language to avoid any legal risk.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    0,
                    -5,
                    0
                  ],
                  "c": "Безопасно, но убирает то, что работало лучше всего.",
                  "r": "Legal is happy, but the click rate falls back to the old level."
                },
                {
                  "t": "Ask head office compliance to approve every phrase, and delay the launch until the full review ends.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    -2,
                    2,
                    -5
                  ],
                  "c": "Надёжно, но откладывает запуск и тратит бюджет на ожидание.",
                  "r": "Every phrase is approved, but the launch slips by two weeks."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "disclaimer",
                  "ru": "оговорка, юридическое уведомление",
                  "how": "Текст, который объясняет ограничения или риски.",
                  "ex": "Add a disclaimer about returns."
                },
                {
                  "w": "guaranteed return",
                  "ru": "гарантированная доходность",
                  "how": "Обещание, что клиент точно получит определённую прибыль.",
                  "ex": "We cannot promise a guaranteed return."
                }
              ]
            }
          ]
        }
      },
      {
        "topic": "Budget",
        "day": "Day 9",
        "sender": [
          "Marta",
          "Finance Partner",
          "Email"
        ],
        "scene": "A message from finance arrives just as you finish the user tests. The trip and the pilot cost more than planned, and head office wants an answer this week.",
        "endings": {
          "good": "You cut costs without hurting the pilot, and finance trusts your numbers.",
          "mid": "The budget gap closes, but it costs the team or the quality of the work.",
          "bad": "The cuts damage the pilot and the team's trust, and the savings do not last."
        },
        "steps": [
          {
            "msg": "Marta: 'The trip and the local pilot are 12,000 dollars over budget. Head office finance asks you to cut costs this week. What is your plan?'",
            "alt": null,
            "options": [
              {
                "t": "List all spending, mark what supports the main pilot goal, and cut the rest first, keeping the user tests.",
                "p": 15,
                "ok": true,
                "e": [
                  3,
                  3,
                  10
                ],
                "c": "Режет по ценности для цели, а не поровну и не вслепую.",
                "r": "You find 9,000 dollars in extra costs, and the user tests stay untouched."
              },
              {
                "t": "Pause the user tests since the interviews already gave enough information, and use the money for the gap.",
                "p": 0,
                "ok": false,
                "e": [
                  -3,
                  -12,
                  6
                ],
                "c": "Убирает именно то, что даёт знание о рынке.",
                "r": "The gap closes, but you lose the only source of fresh local feedback."
              },
              {
                "t": "Ask head office for the extra 12,000 dollars and explain that this market needs more investment.",
                "p": 10,
                "ok": false,
                "e": [
                  0,
                  0,
                  0
                ],
                "c": "Честная просьба, но она не решает задачу, которую поставили финансы.",
                "r": "Finance listens, but says that new money is not an option this quarter."
              },
              {
                "t": "Reduce every budget line by 15 percent and let each team decide how to manage it.",
                "p": 6,
                "ok": false,
                "e": [
                  -5,
                  -3,
                  7
                ],
                "c": "Равные сокращения просты, но бьют по важному и неважному одинаково.",
                "r": "The gap closes, but the research and the launch both lose important work."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "over budget",
                "ru": "сверх бюджета",
                "how": "Расходы больше, чем запланировано.",
                "ex": "The trip is 12,000 dollars over budget."
              },
              {
                "w": "line item",
                "ru": "статья расходов",
                "how": "Отдельная строка в бюджете.",
                "ex": "Review each line item."
              }
            ]
          },
          {
            "msg": "To save 5,000 dollars, finance suggests replacing Aisha's agency with an in-house freelancer. Aisha says the agency knows local slang best. What do you do?",
            "alt": null,
            "options": [
              {
                "t": "Ask Aisha what the agency does that a freelancer cannot, and test the freelancer on one campaign before the contract ends.",
                "p": 15,
                "ok": true,
                "e": [
                  6,
                  6,
                  6
                ],
                "c": "Сначала проверяет различие в качестве, потом решает: экономия без риска запуску.",
                "r": "The freelancer handles the simple work, and you keep the agency only for the slang."
              },
              {
                "t": "Keep the agency for this quarter, and plan the change for the next quarter so the launch is not at risk.",
                "p": 10,
                "ok": false,
                "e": [
                  4,
                  4,
                  -2
                ],
                "c": "Безопасно для запуска, но откладывает экономию.",
                "r": "The launch stays safe, but finance has to wait for its savings."
              },
              {
                "t": "Switch to the freelancer now, and tell Aisha's team the decision comes from finance.",
                "p": 0,
                "ok": false,
                "e": [
                  -12,
                  -8,
                  8
                ],
                "c": "Решение сверху без объяснений рушит доверие и качество.",
                "r": "Aisha's team feels ignored, and the first freelancer texts need a lot of fixing."
              },
              {
                "t": "Let Aisha decide alone since she knows the market, and ask her to stay within the new budget.",
                "p": 7,
                "ok": false,
                "e": [
                  2,
                  2,
                  2
                ],
                "c": "Доверяет эксперту, но не даёт ей данных и не проверяет альтернативу.",
                "r": "Aisha keeps the agency and cuts elsewhere, and nobody tests the freelancer idea."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "contract",
                "ru": "договор",
                "how": "Письменное соглашение о работе и оплате.",
                "ex": "The agency contract ends in June."
              },
              {
                "w": "trial",
                "ru": "пробный запуск",
                "how": "Проверка на небольшом объёме до полного решения.",
                "ex": "Run a trial before you switch."
              }
            ]
          }
        ],
        "c": {
          "id": "ev01_4",
          "type": "special",
          "scn": true,
          "ev": "ev01",
          "evIdx": 3,
          "level": 0,
          "topic": "Budget",
          "sender": {
            "name": "Marta",
            "role": "Finance Partner",
            "channel": "Email"
          },
          "meters": [
            "Team trust",
            "Local insight",
            "Budget"
          ],
          "endings": {
            "good": "You cut costs without hurting the pilot, and finance trusts your numbers.",
            "mid": "The budget gap closes, but it costs the team or the quality of the work.",
            "bad": "The cuts damage the pilot and the team's trust, and the savings do not last."
          },
          "steps": [
            {
              "msg": "Marta: 'The trip and the local pilot are 12,000 dollars over budget. Head office finance asks you to cut costs this week. What is your plan?'",
              "alt": null,
              "options": [
                {
                  "t": "List all spending, mark what supports the main pilot goal, and cut the rest first, keeping the user tests.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    3,
                    3,
                    10
                  ],
                  "c": "Режет по ценности для цели, а не поровну и не вслепую.",
                  "r": "You find 9,000 dollars in extra costs, and the user tests stay untouched."
                },
                {
                  "t": "Pause the user tests since the interviews already gave enough information, and use the money for the gap.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -3,
                    -12,
                    6
                  ],
                  "c": "Убирает именно то, что даёт знание о рынке.",
                  "r": "The gap closes, but you lose the only source of fresh local feedback."
                },
                {
                  "t": "Ask head office for the extra 12,000 dollars and explain that this market needs more investment.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    0,
                    0,
                    0
                  ],
                  "c": "Честная просьба, но она не решает задачу, которую поставили финансы.",
                  "r": "Finance listens, but says that new money is not an option this quarter."
                },
                {
                  "t": "Reduce every budget line by 15 percent and let each team decide how to manage it.",
                  "p": 6,
                  "ok": false,
                  "e": [
                    -5,
                    -3,
                    7
                  ],
                  "c": "Равные сокращения просты, но бьют по важному и неважному одинаково.",
                  "r": "The gap closes, but the research and the launch both lose important work."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "over budget",
                  "ru": "сверх бюджета",
                  "how": "Расходы больше, чем запланировано.",
                  "ex": "The trip is 12,000 dollars over budget."
                },
                {
                  "w": "line item",
                  "ru": "статья расходов",
                  "how": "Отдельная строка в бюджете.",
                  "ex": "Review each line item."
                }
              ]
            },
            {
              "msg": "To save 5,000 dollars, finance suggests replacing Aisha's agency with an in-house freelancer. Aisha says the agency knows local slang best. What do you do?",
              "alt": null,
              "options": [
                {
                  "t": "Ask Aisha what the agency does that a freelancer cannot, and test the freelancer on one campaign before the contract ends.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    6,
                    6,
                    6
                  ],
                  "c": "Сначала проверяет различие в качестве, потом решает: экономия без риска запуску.",
                  "r": "The freelancer handles the simple work, and you keep the agency only for the slang."
                },
                {
                  "t": "Keep the agency for this quarter, and plan the change for the next quarter so the launch is not at risk.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    4,
                    4,
                    -2
                  ],
                  "c": "Безопасно для запуска, но откладывает экономию.",
                  "r": "The launch stays safe, but finance has to wait for its savings."
                },
                {
                  "t": "Switch to the freelancer now, and tell Aisha's team the decision comes from finance.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -12,
                    -8,
                    8
                  ],
                  "c": "Решение сверху без объяснений рушит доверие и качество.",
                  "r": "Aisha's team feels ignored, and the first freelancer texts need a lot of fixing."
                },
                {
                  "t": "Let Aisha decide alone since she knows the market, and ask her to stay within the new budget.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    2,
                    2,
                    2
                  ],
                  "c": "Доверяет эксперту, но не даёт ей данных и не проверяет альтернативу.",
                  "r": "Aisha keeps the agency and cuts elsewhere, and nobody tests the freelancer idea."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "contract",
                  "ru": "договор",
                  "how": "Письменное соглашение о работе и оплате.",
                  "ex": "The agency contract ends in June."
                },
                {
                  "w": "trial",
                  "ru": "пробный запуск",
                  "how": "Проверка на небольшом объёме до полного решения.",
                  "ex": "Run a trial before you switch."
                }
              ]
            }
          ]
        }
      },
      {
        "topic": "Presentation",
        "day": "Day 12",
        "sender": [
          "Elena",
          "Regional Director",
          "Slack"
        ],
        "scene": "It is your last week. On Friday you will present to the regional leadership, and your flight home leaves on Saturday.",
        "endings": {
          "good": "Leadership approves the next phase, and the local team shares the credit. You fly home with a great result.",
          "mid": "Leadership likes the work but asks for more proof before they decide.",
          "bad": "The presentation raises more doubts than answers, and the local team feels forgotten."
        },
        "steps": [
          {
            "msg": "Elena: 'On Friday you present to regional leadership. The pilot reached 18 percent of the target, but customers with shared goals save 2.5 times more. How will you present it?'",
            "alt": null,
            "options": [
              {
                "t": "Open with the key finding about shared goals, show the 18 percent against the target with reasons, and propose the next step.",
                "p": 15,
                "ok": true,
                "e": [
                  5,
                  8,
                  3
                ],
                "c": "Начинает с главного вывода, честно показывает цифру и предлагает действие.",
                "r": "Leadership understands the value at once and asks about the next step."
              },
              {
                "t": "Present the timeline from the first week, so leadership sees the whole story and all the work behind it.",
                "p": 7,
                "ok": false,
                "e": [
                  0,
                  0,
                  0
                ],
                "c": "Хронология скрывает главное: вывод теряется в деталях.",
                "r": "The story is complete, but leadership waits ten minutes for the point."
              },
              {
                "t": "Highlight only the shared goals result and avoid the 18 percent so the presentation stays positive.",
                "p": 0,
                "ok": false,
                "e": [
                  -10,
                  0,
                  0
                ],
                "c": "Замалчивание цифры подрывает доверие к остальным данным.",
                "r": "A director asks about the target, and your silence costs credibility."
              },
              {
                "t": "Show the 18 percent and the shared goals finding side by side, and ask leadership what they want to explore.",
                "p": 10,
                "ok": false,
                "e": [
                  3,
                  5,
                  0
                ],
                "c": "Честно, но без рекомендации руководству приходится думать за вас.",
                "r": "Leadership likes the honesty, but nobody knows what you recommend."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "key finding",
                "ru": "главный вывод исследования",
                "how": "Самый важный результат анализа.",
                "ex": "Open with the key finding."
              },
              {
                "w": "against the target",
                "ru": "относительно цели",
                "how": "Сравнение результата с запланированным значением.",
                "ex": "We reached 18 percent against the target."
              }
            ]
          },
          {
            "msg": "A director asks: 'Why should we invest more in this market when head office results are better?' What do you answer?",
            "alt": null,
            "options": [
              {
                "t": "Compare the cost of getting a customer and the savings per customer in both markets, and explain what local insight changed.",
                "p": 15,
                "ok": true,
                "e": [
                  6,
                  6,
                  3
                ],
                "c": "Отвечает данными по одной шкале и связывает результат с причиной.",
                "r": "The director sees that the local model costs less per customer and saves more."
              },
              {
                "t": "Say that every market is different, so the results cannot be compared.",
                "p": 0,
                "ok": false,
                "e": [
                  -6,
                  -3,
                  0
                ],
                "c": "Уход от сравнения выглядит как отсутствие данных.",
                "r": "The director takes the silence as a lack of numbers."
              },
              {
                "t": "Say that you need time to prepare the comparison and promise an answer next week.",
                "p": 7,
                "ok": false,
                "e": [
                  0,
                  0,
                  0
                ],
                "c": "Честно, но упускает шанс убедить в тот момент, когда внимание есть.",
                "r": "The director agrees to wait, but the moment of attention is gone."
              },
              {
                "t": "Share warm customer quotes from the local interviews to show that the product fits the market.",
                "p": 10,
                "ok": false,
                "e": [
                  2,
                  6,
                  0
                ],
                "c": "Цитаты полезны, но не отвечают на вопрос про инвестиции.",
                "r": "The room smiles at the quotes, but the money question is still open."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "customer acquisition cost",
                "ru": "стоимость привлечения клиента",
                "how": "Сколько компания тратит, чтобы получить одного клиента.",
                "ex": "Customer acquisition cost is lower locally."
              },
              {
                "w": "compare",
                "ru": "сравнивать",
                "how": "Сопоставлять данные по общим показателям.",
                "ex": "Compare both markets with the same metric."
              }
            ]
          },
          {
            "msg": "Wei and Aisha ask if their team will get credit. Head office leaders are also in the room. How do you handle the credit?",
            "alt": null,
            "options": [
              {
                "t": "Name Wei, Aisha and Jun in the presentation, explain what each did, and invite them to present their parts.",
                "p": 15,
                "ok": true,
                "e": [
                  10,
                  5,
                  0
                ],
                "c": "Публично признаёт вклад и даёт людям слово: доверие остаётся надолго.",
                "r": "The team presents with you, and head office sees a strong local group."
              },
              {
                "t": "Thank the local team at the end of the presentation, and keep the main message about your own work.",
                "p": 7,
                "ok": false,
                "e": [
                  3,
                  0,
                  0
                ],
                "c": "Благодарность в конце формальна и не показывает, что именно сделали люди.",
                "r": "The team feels thanked, but not really seen."
              },
              {
                "t": "Present the results as your own achievement since you led the trip.",
                "p": 0,
                "ok": false,
                "e": [
                  -15,
                  -3,
                  0
                ],
                "c": "Присваивание результата ломает отношения с командой.",
                "r": "The local team hears it and stops answering your messages."
              },
              {
                "t": "Send a thank-you email to the local team after the event with the results attached.",
                "p": 10,
                "ok": false,
                "e": [
                  5,
                  0,
                  0
                ],
                "c": "Приятно, но признание после события не помогает команде в глазах руководства.",
                "r": "The team likes the email, but leadership never learns who did what."
              }
            ],
            "explain": "",
            "words": [
              {
                "w": "credit",
                "ru": "признание заслуг",
                "how": "Публичное признание чьей-то работы.",
                "ex": "Give the team credit."
              },
              {
                "w": "contribute",
                "ru": "вносить вклад",
                "how": "Помогать делу своей работой.",
                "ex": "Everyone contributed to the launch."
              }
            ]
          }
        ],
        "c": {
          "id": "ev01_5",
          "type": "special",
          "scn": true,
          "ev": "ev01",
          "evIdx": 4,
          "level": 0,
          "topic": "Presentation",
          "sender": {
            "name": "Elena",
            "role": "Regional Director",
            "channel": "Slack"
          },
          "meters": [
            "Team trust",
            "Local insight",
            "Budget"
          ],
          "endings": {
            "good": "Leadership approves the next phase, and the local team shares the credit. You fly home with a great result.",
            "mid": "Leadership likes the work but asks for more proof before they decide.",
            "bad": "The presentation raises more doubts than answers, and the local team feels forgotten."
          },
          "steps": [
            {
              "msg": "Elena: 'On Friday you present to regional leadership. The pilot reached 18 percent of the target, but customers with shared goals save 2.5 times more. How will you present it?'",
              "alt": null,
              "options": [
                {
                  "t": "Open with the key finding about shared goals, show the 18 percent against the target with reasons, and propose the next step.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    5,
                    8,
                    3
                  ],
                  "c": "Начинает с главного вывода, честно показывает цифру и предлагает действие.",
                  "r": "Leadership understands the value at once and asks about the next step."
                },
                {
                  "t": "Present the timeline from the first week, so leadership sees the whole story and all the work behind it.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    0,
                    0,
                    0
                  ],
                  "c": "Хронология скрывает главное: вывод теряется в деталях.",
                  "r": "The story is complete, but leadership waits ten minutes for the point."
                },
                {
                  "t": "Highlight only the shared goals result and avoid the 18 percent so the presentation stays positive.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -10,
                    0,
                    0
                  ],
                  "c": "Замалчивание цифры подрывает доверие к остальным данным.",
                  "r": "A director asks about the target, and your silence costs credibility."
                },
                {
                  "t": "Show the 18 percent and the shared goals finding side by side, and ask leadership what they want to explore.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    3,
                    5,
                    0
                  ],
                  "c": "Честно, но без рекомендации руководству приходится думать за вас.",
                  "r": "Leadership likes the honesty, but nobody knows what you recommend."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "key finding",
                  "ru": "главный вывод исследования",
                  "how": "Самый важный результат анализа.",
                  "ex": "Open with the key finding."
                },
                {
                  "w": "against the target",
                  "ru": "относительно цели",
                  "how": "Сравнение результата с запланированным значением.",
                  "ex": "We reached 18 percent against the target."
                }
              ]
            },
            {
              "msg": "A director asks: 'Why should we invest more in this market when head office results are better?' What do you answer?",
              "alt": null,
              "options": [
                {
                  "t": "Compare the cost of getting a customer and the savings per customer in both markets, and explain what local insight changed.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    6,
                    6,
                    3
                  ],
                  "c": "Отвечает данными по одной шкале и связывает результат с причиной.",
                  "r": "The director sees that the local model costs less per customer and saves more."
                },
                {
                  "t": "Say that every market is different, so the results cannot be compared.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -6,
                    -3,
                    0
                  ],
                  "c": "Уход от сравнения выглядит как отсутствие данных.",
                  "r": "The director takes the silence as a lack of numbers."
                },
                {
                  "t": "Say that you need time to prepare the comparison and promise an answer next week.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    0,
                    0,
                    0
                  ],
                  "c": "Честно, но упускает шанс убедить в тот момент, когда внимание есть.",
                  "r": "The director agrees to wait, but the moment of attention is gone."
                },
                {
                  "t": "Share warm customer quotes from the local interviews to show that the product fits the market.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    2,
                    6,
                    0
                  ],
                  "c": "Цитаты полезны, но не отвечают на вопрос про инвестиции.",
                  "r": "The room smiles at the quotes, but the money question is still open."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "customer acquisition cost",
                  "ru": "стоимость привлечения клиента",
                  "how": "Сколько компания тратит, чтобы получить одного клиента.",
                  "ex": "Customer acquisition cost is lower locally."
                },
                {
                  "w": "compare",
                  "ru": "сравнивать",
                  "how": "Сопоставлять данные по общим показателям.",
                  "ex": "Compare both markets with the same metric."
                }
              ]
            },
            {
              "msg": "Wei and Aisha ask if their team will get credit. Head office leaders are also in the room. How do you handle the credit?",
              "alt": null,
              "options": [
                {
                  "t": "Name Wei, Aisha and Jun in the presentation, explain what each did, and invite them to present their parts.",
                  "p": 15,
                  "ok": true,
                  "e": [
                    10,
                    5,
                    0
                  ],
                  "c": "Публично признаёт вклад и даёт людям слово: доверие остаётся надолго.",
                  "r": "The team presents with you, and head office sees a strong local group."
                },
                {
                  "t": "Thank the local team at the end of the presentation, and keep the main message about your own work.",
                  "p": 7,
                  "ok": false,
                  "e": [
                    3,
                    0,
                    0
                  ],
                  "c": "Благодарность в конце формальна и не показывает, что именно сделали люди.",
                  "r": "The team feels thanked, but not really seen."
                },
                {
                  "t": "Present the results as your own achievement since you led the trip.",
                  "p": 0,
                  "ok": false,
                  "e": [
                    -15,
                    -3,
                    0
                  ],
                  "c": "Присваивание результата ломает отношения с командой.",
                  "r": "The local team hears it and stops answering your messages."
                },
                {
                  "t": "Send a thank-you email to the local team after the event with the results attached.",
                  "p": 10,
                  "ok": false,
                  "e": [
                    5,
                    0,
                    0
                  ],
                  "c": "Приятно, но признание после события не помогает команде в глазах руководства.",
                  "r": "The team likes the email, but leadership never learns who did what."
                }
              ],
              "explain": "",
              "words": [
                {
                  "w": "credit",
                  "ru": "признание заслуг",
                  "how": "Публичное признание чьей-то работы.",
                  "ex": "Give the team credit."
                },
                {
                  "w": "contribute",
                  "ru": "вносить вклад",
                  "how": "Помогать делу своей работой.",
                  "ex": "Everyone contributed to the launch."
                }
              ]
            }
          ]
        }
      }
    ]
  }
];
var PRODUCT_EVENT_CASES = [
  {
    "id": "ev01_1",
    "type": "special",
    "scn": true,
    "ev": "ev01",
    "evIdx": 0,
    "level": 0,
    "topic": "Onboarding",
    "sender": {
      "name": "Mei",
      "role": "Local Product Lead",
      "channel": "Slack"
    },
    "meters": [
      "Team trust",
      "Local insight",
      "Budget"
    ],
    "endings": {
      "good": "The local team opens up, and you learn that families save together. A real insight is waiting to be tested.",
      "mid": "The team is polite, but you only know half of the story, and trust grows slowly.",
      "bad": "The team keeps its distance, and important facts stay hidden from you."
    },
    "steps": [
      {
        "msg": "Mei: 'Welcome! The team has built the savings feature for three months. Head office expects quick results. How will you spend your first week?'",
        "alt": null,
        "options": [
          {
            "t": "Meet each teammate one-on-one this week and ask what they have already tried and what blocks them.",
            "p": 15,
            "ok": true,
            "e": [
              8,
              10,
              0
            ],
            "c": "Начинает со слушания: так появляется доверие и видна реальная картина.",
            "r": "You hear three problems no report mentioned, and the team feels respected."
          },
          {
            "t": "Study the project documents alone for two days and then share your conclusions with the team.",
            "p": 7,
            "ok": false,
            "e": [
              -2,
              4,
              0
            ],
            "c": "Документы полезны, но два дня в одиночку выглядят как дистанция.",
            "r": "You learn the background, but the team wonders why you are not talking to them."
          },
          {
            "t": "Present the head office plan on day one so that everyone knows what the bank expects from you.",
            "p": 0,
            "ok": false,
            "e": [
              -10,
              -5,
              0
            ],
            "c": "Готовый план без вопросов: местная команда чувствует давление.",
            "r": "The team goes quiet, and some people feel their work is being ignored."
          },
          {
            "t": "Join every daily standup, observe quietly for a week and take notes before giving any opinion.",
            "p": 10,
            "ok": false,
            "e": [
              3,
              6,
              0
            ],
            "c": "Многое узнаёт, но молчание легко принять за безразличие.",
            "r": "You learn how the team works, but nobody knows what you think yet."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "one-on-one",
            "ru": "личная встреча один на один",
            "how": "Разговор двух людей без других участников.",
            "ex": "I had a one-on-one with every engineer."
          },
          {
            "w": "blocker",
            "ru": "блокер, препятствие",
            "how": "То, что мешает двигаться дальше.",
            "ex": "Missing access is the main blocker."
          }
        ]
      },
      {
        "msg": "Wei says local families usually save together in one shared account, but head office designed only individual savings goals. Customers do not use them. What do you do?",
        "alt": null,
        "options": [
          {
            "t": "Ask Wei to introduce five local customers, and interview them about how families save before you change anything.",
            "p": 15,
            "ok": true,
            "e": [
              5,
              12,
              -3
            ],
            "c": "Проверяет гипотезу на людях до изменений: дёшево и надёжно.",
            "r": "The interviews confirm that goals are shared, and the team sees you take local habits seriously."
          },
          {
            "t": "Build a quick shared-goal prototype and show it to a few customers next week to see if the idea fits.",
            "p": 10,
            "ok": false,
            "e": [
              4,
              8,
              -3
            ],
            "c": "Хорошо, но прототип строится до того, как понята привычка.",
            "r": "The prototype gets good reactions, but you built it before knowing why."
          },
          {
            "t": "Ask head office for global research that proves individual goals work, and use it to convince Wei.",
            "p": 0,
            "ok": false,
            "e": [
              -8,
              -8,
              0
            ],
            "c": "Спор с местной командой данными из других стран ломает доверие.",
            "r": "Wei feels overruled, and the team stops sharing what they see in the market."
          },
          {
            "t": "Keep the individual goals and add a short tutorial that explains how family members can use them.",
            "p": 7,
            "ok": false,
            "e": [
              0,
              2,
              0
            ],
            "c": "Это лечит симптом, а настоящая причина остаётся нетронутой.",
            "r": "A few customers read the tutorial, but the habit stays the same."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "shared account",
            "ru": "общий счёт",
            "how": "Счёт, которым пользуются несколько человек, например семья.",
            "ex": "Families often use a shared account."
          },
          {
            "w": "prototype",
            "ru": "прототип",
            "how": "Быстрая пробная версия, чтобы проверить идею.",
            "ex": "We built a prototype in two days."
          }
        ]
      }
    ]
  },
  {
    "id": "ev01_2",
    "type": "special",
    "scn": true,
    "ev": "ev01",
    "evIdx": 1,
    "level": 0,
    "topic": "Communication",
    "sender": {
      "name": "Wei",
      "role": "Local Engineering Lead",
      "channel": "Slack"
    },
    "meters": [
      "Team trust",
      "Local insight",
      "Budget"
    ],
    "endings": {
      "good": "Meetings become clear and safe. People share risks early instead of staying silent.",
      "mid": "Communication improves, but some people still keep their doubts to themselves.",
      "bad": "Silence grows in the meetings, and risks appear only when it is too late."
    },
    "steps": [
      {
        "msg": "Wei: 'In the meeting you said let's circle back on that. People nodded, but nobody knew what to do next. How will you make sure the team understands?'",
        "alt": null,
        "options": [
          {
            "t": "Send a written summary after each meeting with owners and dates, and ask everyone to confirm or correct it.",
            "p": 15,
            "ok": true,
            "e": [
              6,
              6,
              0
            ],
            "c": "Письменная фиксация с владельцами и сроками снимает зависимость от языка и скорости речи.",
            "r": "Two people correct the summary the next morning, and the plan becomes clear for all."
          },
          {
            "t": "Speak more slowly and ask does everyone understand after every point, so nobody stays silent.",
            "p": 7,
            "ok": false,
            "e": [
              3,
              3,
              0
            ],
            "c": "Вопрос «всем понятно?» редко работает: люди отвечают «да» из вежливости.",
            "r": "Everyone says yes, but two tasks are still done in a different way."
          },
          {
            "t": "Tell the team to ask questions when something is unclear, and assume that silence means all is fine.",
            "p": 0,
            "ok": false,
            "e": [
              -6,
              -3,
              0
            ],
            "c": "Молчание не равно согласию, особенно в другой культуре.",
            "r": "Nobody asks, and the misunderstanding appears a week later in the release."
          },
          {
            "t": "Avoid idioms, use short sentences and share the agenda in advance so people can prepare questions.",
            "p": 10,
            "ok": false,
            "e": [
              5,
              5,
              0
            ],
            "c": "Хорошо и полезно, но без письменных итогов договорённости теряются.",
            "r": "The meeting feels easier, but nobody writes down who does what."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "idiom",
            "ru": "идиома, устойчивое выражение",
            "how": "Фраза, смысл которой не следует из отдельных слов.",
            "ex": "'Circle back' is an idiom many people do not know."
          },
          {
            "w": "action items",
            "ru": "задачи после встречи",
            "how": "Конкретные дела с исполнителем и сроком.",
            "ex": "Send the action items after the meeting."
          }
        ]
      },
      {
        "msg": "Jun, a young engineer, privately tells you that the release date is unrealistic. In meetings nobody disagrees with the manager. What do you do?",
        "alt": null,
        "options": [
          {
            "t": "Thank Jun, ask for details privately, raise the risk in the team channel as a question without a name, and ask for new estimates.",
            "p": 15,
            "ok": true,
            "e": [
              8,
              5,
              0
            ],
            "c": "Защищает человека, поднимает риск и даёт команде безопасный способ пересмотреть сроки.",
            "r": "The team shares new estimates, and Jun feels safe to speak again."
          },
          {
            "t": "Tell Wei about Jun's message and ask Wei to handle the date change with the team.",
            "p": 7,
            "ok": false,
            "e": [
              -3,
              0,
              0
            ],
            "c": "Рискует доверием Джуна, а решение передаёт другому.",
            "r": "Wei changes the date, but Jun learns his private message was passed on."
          },
          {
            "t": "Announce in the meeting that Jun thinks the date is unrealistic, and ask Jun to explain why.",
            "p": 0,
            "ok": false,
            "e": [
              -12,
              0,
              0
            ],
            "c": "Публичное раскрытие личного сообщения разрушает доверие.",
            "r": "Jun is embarrassed, and nobody sends you honest feedback after that."
          },
          {
            "t": "Ask each engineer for an anonymous estimate in a form, and compare the results with the current plan.",
            "p": 10,
            "ok": false,
            "e": [
              5,
              4,
              0
            ],
            "c": "Анонимно и безопасно, но без обсуждения риска команда не учится говорить открыто.",
            "r": "The form shows the date is too tight, but the team still avoids saying it aloud."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "raise a concern",
            "ru": "поднять беспокойство, озвучить риск",
            "how": "Сказать о проблеме открыто.",
            "ex": "Jun raised a concern about the date."
          },
          {
            "w": "estimate",
            "ru": "оценка сроков или трудозатрат",
            "how": "Прикидка, сколько времени займёт работа.",
            "ex": "We need a new estimate."
          }
        ]
      }
    ]
  },
  {
    "id": "ev01_3",
    "type": "special",
    "scn": true,
    "ev": "ev01",
    "evIdx": 2,
    "level": 0,
    "topic": "Localization",
    "sender": {
      "name": "Aisha",
      "role": "Local Marketing Manager",
      "channel": "Slack"
    },
    "meters": [
      "Team trust",
      "Local insight",
      "Budget"
    ],
    "endings": {
      "good": "The campaign sounds local and passes legal review. Clicks are up, and the budget is under control.",
      "mid": "The campaign works, but it is either too plain or needed late fixes. It could have done more.",
      "bad": "The campaign misses the market or creates legal trouble, and the money is wasted."
    },
    "steps": [
      {
        "msg": "Aisha: 'Head office sent a global campaign and a 40,000 dollar translation budget. Local customers prefer messaging apps and QR payments, and competitors use local slang. What do we do?'",
        "alt": null,
        "options": [
          {
            "t": "Use the global campaign as the base, adapt the language and examples with local copywriters, and test one channel.",
            "p": 15,
            "ok": true,
            "e": [
              4,
              10,
              5
            ],
            "c": "Берёт сильную основу и адаптирует её, а остаток бюджета отдаёт на проверку.",
            "r": "The adapted campaign keeps the brand voice, and the saved budget funds a clean test."
          },
          {
            "t": "Translate the global campaign exactly as it is, since the bank needs one brand voice in every country.",
            "p": 7,
            "ok": false,
            "e": [
              0,
              -3,
              5
            ],
            "c": "Единый голос важен, но буквальный перевод звучит чуждо на местном рынке.",
            "r": "The campaign is correct but flat, and local customers barely react."
          },
          {
            "t": "Cancel the global campaign and create a new local one from scratch with the whole budget.",
            "p": 0,
            "ok": false,
            "e": [
              -3,
              5,
              -12
            ],
            "c": "Выбрасывает готовую работу и тратит весь бюджет за две недели до запуска.",
            "r": "The new campaign sounds local, but the budget runs out before the launch."
          },
          {
            "t": "Test both versions with 500 customers, and choose which one to scale after one week.",
            "p": 10,
            "ok": false,
            "e": [
              3,
              8,
              0
            ],
            "c": "Данные лучше мнений, но неделя теста съедает время до запуска.",
            "r": "The test gives a clear winner, but the launch has only one week left."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "localization",
            "ru": "локализация, адаптация под рынок",
            "how": "Адаптация продукта и текстов под язык и привычки страны.",
            "ex": "Localization is more than translation."
          },
          {
            "w": "copywriter",
            "ru": "копирайтер",
            "how": "Человек, который пишет рекламные и продуктовые тексты.",
            "ex": "A local copywriter fixed the tone."
          }
        ]
      },
      {
        "msg": "The test shows that slang raises clicks. But legal warns that some local phrases may sound like a guaranteed return on savings. What now?",
        "alt": null,
        "options": [
          {
            "t": "Keep slang where it is safe, rewrite the risky phrases with legal and add the required disclaimers before launch.",
            "p": 15,
            "ok": true,
            "e": [
              4,
              6,
              0
            ],
            "c": "Сохраняет эффективность и снимает юридический риск до запуска.",
            "r": "The campaign keeps its local voice and passes the legal review in two days."
          },
          {
            "t": "Use slang everywhere because it performs best, and fix the legal comments after launch if someone complains.",
            "p": 0,
            "ok": false,
            "e": [
              -10,
              3,
              -5
            ],
            "c": "Юридический риск для банка нельзя исправлять после жалоб.",
            "r": "A regulator notices a phrase about guaranteed returns, and the campaign is stopped."
          },
          {
            "t": "Remove all slang and use only formal language to avoid any legal risk.",
            "p": 7,
            "ok": false,
            "e": [
              0,
              -5,
              0
            ],
            "c": "Безопасно, но убирает то, что работало лучше всего.",
            "r": "Legal is happy, but the click rate falls back to the old level."
          },
          {
            "t": "Ask head office compliance to approve every phrase, and delay the launch until the full review ends.",
            "p": 10,
            "ok": false,
            "e": [
              -2,
              2,
              -5
            ],
            "c": "Надёжно, но откладывает запуск и тратит бюджет на ожидание.",
            "r": "Every phrase is approved, but the launch slips by two weeks."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "disclaimer",
            "ru": "оговорка, юридическое уведомление",
            "how": "Текст, который объясняет ограничения или риски.",
            "ex": "Add a disclaimer about returns."
          },
          {
            "w": "guaranteed return",
            "ru": "гарантированная доходность",
            "how": "Обещание, что клиент точно получит определённую прибыль.",
            "ex": "We cannot promise a guaranteed return."
          }
        ]
      }
    ]
  },
  {
    "id": "ev01_4",
    "type": "special",
    "scn": true,
    "ev": "ev01",
    "evIdx": 3,
    "level": 0,
    "topic": "Budget",
    "sender": {
      "name": "Marta",
      "role": "Finance Partner",
      "channel": "Email"
    },
    "meters": [
      "Team trust",
      "Local insight",
      "Budget"
    ],
    "endings": {
      "good": "You cut costs without hurting the pilot, and finance trusts your numbers.",
      "mid": "The budget gap closes, but it costs the team or the quality of the work.",
      "bad": "The cuts damage the pilot and the team's trust, and the savings do not last."
    },
    "steps": [
      {
        "msg": "Marta: 'The trip and the local pilot are 12,000 dollars over budget. Head office finance asks you to cut costs this week. What is your plan?'",
        "alt": null,
        "options": [
          {
            "t": "List all spending, mark what supports the main pilot goal, and cut the rest first, keeping the user tests.",
            "p": 15,
            "ok": true,
            "e": [
              3,
              3,
              10
            ],
            "c": "Режет по ценности для цели, а не поровну и не вслепую.",
            "r": "You find 9,000 dollars in extra costs, and the user tests stay untouched."
          },
          {
            "t": "Pause the user tests since the interviews already gave enough information, and use the money for the gap.",
            "p": 0,
            "ok": false,
            "e": [
              -3,
              -12,
              6
            ],
            "c": "Убирает именно то, что даёт знание о рынке.",
            "r": "The gap closes, but you lose the only source of fresh local feedback."
          },
          {
            "t": "Ask head office for the extra 12,000 dollars and explain that this market needs more investment.",
            "p": 10,
            "ok": false,
            "e": [
              0,
              0,
              0
            ],
            "c": "Честная просьба, но она не решает задачу, которую поставили финансы.",
            "r": "Finance listens, but says that new money is not an option this quarter."
          },
          {
            "t": "Reduce every budget line by 15 percent and let each team decide how to manage it.",
            "p": 6,
            "ok": false,
            "e": [
              -5,
              -3,
              7
            ],
            "c": "Равные сокращения просты, но бьют по важному и неважному одинаково.",
            "r": "The gap closes, but the research and the launch both lose important work."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "over budget",
            "ru": "сверх бюджета",
            "how": "Расходы больше, чем запланировано.",
            "ex": "The trip is 12,000 dollars over budget."
          },
          {
            "w": "line item",
            "ru": "статья расходов",
            "how": "Отдельная строка в бюджете.",
            "ex": "Review each line item."
          }
        ]
      },
      {
        "msg": "To save 5,000 dollars, finance suggests replacing Aisha's agency with an in-house freelancer. Aisha says the agency knows local slang best. What do you do?",
        "alt": null,
        "options": [
          {
            "t": "Ask Aisha what the agency does that a freelancer cannot, and test the freelancer on one campaign before the contract ends.",
            "p": 15,
            "ok": true,
            "e": [
              6,
              6,
              6
            ],
            "c": "Сначала проверяет различие в качестве, потом решает: экономия без риска запуску.",
            "r": "The freelancer handles the simple work, and you keep the agency only for the slang."
          },
          {
            "t": "Keep the agency for this quarter, and plan the change for the next quarter so the launch is not at risk.",
            "p": 10,
            "ok": false,
            "e": [
              4,
              4,
              -2
            ],
            "c": "Безопасно для запуска, но откладывает экономию.",
            "r": "The launch stays safe, but finance has to wait for its savings."
          },
          {
            "t": "Switch to the freelancer now, and tell Aisha's team the decision comes from finance.",
            "p": 0,
            "ok": false,
            "e": [
              -12,
              -8,
              8
            ],
            "c": "Решение сверху без объяснений рушит доверие и качество.",
            "r": "Aisha's team feels ignored, and the first freelancer texts need a lot of fixing."
          },
          {
            "t": "Let Aisha decide alone since she knows the market, and ask her to stay within the new budget.",
            "p": 7,
            "ok": false,
            "e": [
              2,
              2,
              2
            ],
            "c": "Доверяет эксперту, но не даёт ей данных и не проверяет альтернативу.",
            "r": "Aisha keeps the agency and cuts elsewhere, and nobody tests the freelancer idea."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "contract",
            "ru": "договор",
            "how": "Письменное соглашение о работе и оплате.",
            "ex": "The agency contract ends in June."
          },
          {
            "w": "trial",
            "ru": "пробный запуск",
            "how": "Проверка на небольшом объёме до полного решения.",
            "ex": "Run a trial before you switch."
          }
        ]
      }
    ]
  },
  {
    "id": "ev01_5",
    "type": "special",
    "scn": true,
    "ev": "ev01",
    "evIdx": 4,
    "level": 0,
    "topic": "Presentation",
    "sender": {
      "name": "Elena",
      "role": "Regional Director",
      "channel": "Slack"
    },
    "meters": [
      "Team trust",
      "Local insight",
      "Budget"
    ],
    "endings": {
      "good": "Leadership approves the next phase, and the local team shares the credit. You fly home with a great result.",
      "mid": "Leadership likes the work but asks for more proof before they decide.",
      "bad": "The presentation raises more doubts than answers, and the local team feels forgotten."
    },
    "steps": [
      {
        "msg": "Elena: 'On Friday you present to regional leadership. The pilot reached 18 percent of the target, but customers with shared goals save 2.5 times more. How will you present it?'",
        "alt": null,
        "options": [
          {
            "t": "Open with the key finding about shared goals, show the 18 percent against the target with reasons, and propose the next step.",
            "p": 15,
            "ok": true,
            "e": [
              5,
              8,
              3
            ],
            "c": "Начинает с главного вывода, честно показывает цифру и предлагает действие.",
            "r": "Leadership understands the value at once and asks about the next step."
          },
          {
            "t": "Present the timeline from the first week, so leadership sees the whole story and all the work behind it.",
            "p": 7,
            "ok": false,
            "e": [
              0,
              0,
              0
            ],
            "c": "Хронология скрывает главное: вывод теряется в деталях.",
            "r": "The story is complete, but leadership waits ten minutes for the point."
          },
          {
            "t": "Highlight only the shared goals result and avoid the 18 percent so the presentation stays positive.",
            "p": 0,
            "ok": false,
            "e": [
              -10,
              0,
              0
            ],
            "c": "Замалчивание цифры подрывает доверие к остальным данным.",
            "r": "A director asks about the target, and your silence costs credibility."
          },
          {
            "t": "Show the 18 percent and the shared goals finding side by side, and ask leadership what they want to explore.",
            "p": 10,
            "ok": false,
            "e": [
              3,
              5,
              0
            ],
            "c": "Честно, но без рекомендации руководству приходится думать за вас.",
            "r": "Leadership likes the honesty, but nobody knows what you recommend."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "key finding",
            "ru": "главный вывод исследования",
            "how": "Самый важный результат анализа.",
            "ex": "Open with the key finding."
          },
          {
            "w": "against the target",
            "ru": "относительно цели",
            "how": "Сравнение результата с запланированным значением.",
            "ex": "We reached 18 percent against the target."
          }
        ]
      },
      {
        "msg": "A director asks: 'Why should we invest more in this market when head office results are better?' What do you answer?",
        "alt": null,
        "options": [
          {
            "t": "Compare the cost of getting a customer and the savings per customer in both markets, and explain what local insight changed.",
            "p": 15,
            "ok": true,
            "e": [
              6,
              6,
              3
            ],
            "c": "Отвечает данными по одной шкале и связывает результат с причиной.",
            "r": "The director sees that the local model costs less per customer and saves more."
          },
          {
            "t": "Say that every market is different, so the results cannot be compared.",
            "p": 0,
            "ok": false,
            "e": [
              -6,
              -3,
              0
            ],
            "c": "Уход от сравнения выглядит как отсутствие данных.",
            "r": "The director takes the silence as a lack of numbers."
          },
          {
            "t": "Say that you need time to prepare the comparison and promise an answer next week.",
            "p": 7,
            "ok": false,
            "e": [
              0,
              0,
              0
            ],
            "c": "Честно, но упускает шанс убедить в тот момент, когда внимание есть.",
            "r": "The director agrees to wait, but the moment of attention is gone."
          },
          {
            "t": "Share warm customer quotes from the local interviews to show that the product fits the market.",
            "p": 10,
            "ok": false,
            "e": [
              2,
              6,
              0
            ],
            "c": "Цитаты полезны, но не отвечают на вопрос про инвестиции.",
            "r": "The room smiles at the quotes, but the money question is still open."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "customer acquisition cost",
            "ru": "стоимость привлечения клиента",
            "how": "Сколько компания тратит, чтобы получить одного клиента.",
            "ex": "Customer acquisition cost is lower locally."
          },
          {
            "w": "compare",
            "ru": "сравнивать",
            "how": "Сопоставлять данные по общим показателям.",
            "ex": "Compare both markets with the same metric."
          }
        ]
      },
      {
        "msg": "Wei and Aisha ask if their team will get credit. Head office leaders are also in the room. How do you handle the credit?",
        "alt": null,
        "options": [
          {
            "t": "Name Wei, Aisha and Jun in the presentation, explain what each did, and invite them to present their parts.",
            "p": 15,
            "ok": true,
            "e": [
              10,
              5,
              0
            ],
            "c": "Публично признаёт вклад и даёт людям слово: доверие остаётся надолго.",
            "r": "The team presents with you, and head office sees a strong local group."
          },
          {
            "t": "Thank the local team at the end of the presentation, and keep the main message about your own work.",
            "p": 7,
            "ok": false,
            "e": [
              3,
              0,
              0
            ],
            "c": "Благодарность в конце формальна и не показывает, что именно сделали люди.",
            "r": "The team feels thanked, but not really seen."
          },
          {
            "t": "Present the results as your own achievement since you led the trip.",
            "p": 0,
            "ok": false,
            "e": [
              -15,
              -3,
              0
            ],
            "c": "Присваивание результата ломает отношения с командой.",
            "r": "The local team hears it and stops answering your messages."
          },
          {
            "t": "Send a thank-you email to the local team after the event with the results attached.",
            "p": 10,
            "ok": false,
            "e": [
              5,
              0,
              0
            ],
            "c": "Приятно, но признание после события не помогает команде в глазах руководства.",
            "r": "The team likes the email, but leadership never learns who did what."
          }
        ],
        "explain": "",
        "words": [
          {
            "w": "credit",
            "ru": "признание заслуг",
            "how": "Публичное признание чьей-то работы.",
            "ex": "Give the team credit."
          },
          {
            "w": "contribute",
            "ru": "вносить вклад",
            "how": "Помогать делу своей работой.",
            "ex": "Everyone contributed to the launch."
          }
        ]
      }
    ]
  }
];
