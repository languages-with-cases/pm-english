/* Authored even-level task-three variants for all seven Project Management chapters. */
var PROJECT_CAREER_PRACTICE_DATA = [
  {
    "id": "pm-c1-l02-gantt-v1",
    "track": "pm",
    "chapter": 1,
    "level": 2,
    "caseId": "b02",
    "format": "gantt",
    "difficulty": 1,
    "title": "Chase the design handoff with a usable forecast",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Mia’s final files gate development. The first sprint reservation is already in the baseline. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 2 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 12,
        "rows": [
          [
            "A · Final design files",
            "Day 1",
            "Day 2",
            "None",
            1,
            2
          ],
          [
            "B · Build landing page",
            "Day 3",
            "Day 5",
            "A",
            3,
            5
          ],
          [
            "C · Acceptance test",
            "Day 6",
            "Day 7",
            "B",
            6,
            7
          ],
          [
            "R · Release",
            "Day 8",
            "Day 8",
            "C",
            8,
            8
          ],
          [
            "D · Write help copy",
            "Day 1",
            "Day 3",
            "None",
            1,
            3
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 3 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 3,
        "options": [
          {
            "id": "B",
            "text": "Build landing page",
            "feedback": "B: дни 3–5 → 5–7. Даты меняются."
          },
          {
            "id": "C",
            "text": "Acceptance test",
            "feedback": "C: дни 6–7 → 8–9. Даты меняются."
          },
          {
            "id": "R",
            "text": "Release",
            "feedback": "R: дни 8–8 → 10–10. Даты меняются."
          },
          {
            "id": "D",
            "text": "Write help copy",
            "feedback": "D: дни 1–3 → 1–3. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "C",
          "R"
        ],
        "explain": "A: дни 1–2 → 3–4; B: 3–5 → 5–7; C: 6–7 → 8–9; R: 8 → 10. Независимая D остаётся на днях 1–3. Handoff — передача результата; downstream work — последующие зависимые работы."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "10",
            "text": "Day 10 — build moves to days 5–7 and acceptance to days 8–9.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "8",
            "text": "Day 8 — keep acceptance unchanged because only the design files are late.",
            "feedback": "Тестирование ждёт разработку, а разработка — финальные файлы."
          },
          {
            "id": "12",
            "text": "Day 12 — apply the two-day delay separately to build and to acceptance.",
            "feedback": "Одна исходная задержка не прибавляется заново к каждому звену."
          }
        ],
        "key": [
          "10"
        ],
        "explain": "A: дни 1–2 → 3–4; B: 3–5 → 5–7; C: 6–7 → 8–9; R: 8 → 10. Независимая D остаётся на днях 1–3. Handoff — передача результата; downstream work — последующие зависимые работы."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 2,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c1-l04-status-v1",
    "track": "pm",
    "chapter": 1,
    "level": 4,
    "caseId": "b04",
    "format": "status",
    "difficulty": 1,
    "title": "Report the misdirected email accurately",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — After noticing the budget email went to Chloe, report only facts established at 10:15. Julia owns the client response. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "The incident record now contains the recipient, timestamp and the exact attachment that was sent."
          },
          {
            "id": "B",
            "text": "Chloe has not replied; she could use the margin figure in the next negotiation."
          },
          {
            "id": "C",
            "text": "The agreed client update cannot be sent: the required legal review has not been provided."
          },
          {
            "id": "D",
            "text": "Julia, choose whether we send the reviewed correction today or arrange a call first; approval is needed by 11:00."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision"
        },
        "explain": "A — Progress: запись об инциденте уже составлена. B — Risk: реакция клиента пока неизвестна и относится к будущему. C — Blocker: отправка уже остановлена отсутствующим обязательным review. D — Decision needed: Julia должна выбрать один из двух вариантов. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c1-l06-scope-v1",
    "track": "pm",
    "chapter": 1,
    "level": 6,
    "caseId": "b06",
    "format": "scope",
    "difficulty": 1,
    "title": "Add a workshop without inventing calendar capacity",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — After confirming London, New York and Singapore availability, Chloe asks for a same-day rehearsal. Julia must approve the revised workshop scope. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Facilitator hours",
            "≤",
            "4"
          ],
          [
            "Developer hours",
            "≤",
            "2"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Facilitator hours",
          "Developer hours"
        ],
        "rows": [
          [
            "A",
            "4",
            "2"
          ],
          [
            "B",
            "5",
            "2"
          ],
          [
            "C",
            "4",
            "3"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can add the rehearsal by replacing the optional walkthrough; Plan A uses four facilitator hours and two developer hours. Please approve the workshop swap before I update the invitation and the agenda.",
            "feedback": "Обе роли укладываются; Julia должна подтвердить замену."
          },
          {
            "id": "B",
            "text": "We can retain the walkthrough and add the rehearsal under Plan B; five facilitator hours fit because the developer needs only two. Please approve the expanded agenda and I will keep the same meeting window.",
            "feedback": "5 часов фасилитатора > 4; часы разработчика не компенсируют перегрузку."
          },
          {
            "id": "C",
            "text": "We can keep the same window under Plan C by splitting the rehearsal across the facilitator and developer; four facilitator hours meet the limit. Please approve this plan while engineering absorbs its extra hour.",
            "feedback": "3 часа разработчика > 2; согласие на scope не создаёт свободного времени."
          }
        ],
        "key": [
          "A"
        ],
        "explain": "План A: 4 часа фасилитатора ≤ 4 и 2 часа разработчика ≤ 2. План B требует 5 > 4 часов фасилитатора; C — 3 > 2 часов разработчика. Scope swap — согласованная замена объёма. Часы разных ролей не взаимозаменяемы."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c1-l08-gantt-v1",
    "track": "pm",
    "chapter": 1,
    "level": 8,
    "caseId": "b08",
    "format": "gantt",
    "difficulty": 1,
    "title": "Recover the missed review without moving unrelated work",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The missed client review is A. The copywriter’s reserved start has no dependency on that meeting. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 3 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 12,
        "rows": [
          [
            "A · Client review",
            "Day 2",
            "Day 2",
            "None",
            2,
            2
          ],
          [
            "B · Apply approved edits",
            "Day 3",
            "Day 4",
            "A",
            3,
            4
          ],
          [
            "C · QA check",
            "Day 5",
            "Day 5",
            "B",
            5,
            5
          ],
          [
            "R · Release",
            "Day 6",
            "Day 6",
            "C",
            6,
            6
          ],
          [
            "D · Prepare support copy",
            "Day 3",
            "Day 5",
            "None",
            3,
            5
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 3 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 3,
        "options": [
          {
            "id": "B",
            "text": "Apply approved edits",
            "feedback": "B: дни 3–4 → 6–7. Даты меняются."
          },
          {
            "id": "C",
            "text": "QA check",
            "feedback": "C: дни 5–5 → 8–8. Даты меняются."
          },
          {
            "id": "R",
            "text": "Release",
            "feedback": "R: дни 6–6 → 9–9. Даты меняются."
          },
          {
            "id": "D",
            "text": "Prepare support copy",
            "feedback": "D: дни 3–5 → 3–5. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "C",
          "R"
        ],
        "explain": "A: день 2 → 5; B: дни 3–4 → 6–7; C: 5 → 8; R: 6 → 9. D остаётся на днях 3–5: зависимости от A нет. Reschedule — перенести встречу; follow-up — последующее действие. Одна задержка не прибавляется заново на каждом звене."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "9",
            "text": "Day 9 — the review is on day 5, edits take days 6–7 and QA takes day 8.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "6",
            "text": "Day 6 — the missed review affects the invitation but not the approved release plan.",
            "feedback": "Изменение встречи сдвигает зависимые правки и QA, не только приглашение."
          },
          {
            "id": "12",
            "text": "Day 12 — add three days for the missed meeting and another three for its follow-up.",
            "feedback": "Задержка встречи и её последствие — не две независимые задержки."
          }
        ],
        "key": [
          "9"
        ],
        "explain": "A: день 2 → 5; B: дни 3–4 → 6–7; C: 5 → 8; R: 6 → 9. D остаётся на днях 3–5: зависимости от A нет. Reschedule — перенести встречу; follow-up — последующее действие. Одна задержка не прибавляется заново на каждом звене."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 3,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c1-l10-status-v1",
    "track": "pm",
    "chapter": 1,
    "level": 10,
    "caseId": "b10",
    "format": "status",
    "difficulty": 1,
    "title": "Turn a vague brief into a factual update",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The landing-page brief is being clarified. Use the latest evidence rather than treating all client comments as approval. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "Chloe confirmed the target age range in the shared brief; the confirmation is linked."
          },
          {
            "id": "B",
            "text": "The brand owner has not reviewed the visual direction; the review could require changes next week."
          },
          {
            "id": "C",
            "text": "Design work is paused because the mandatory brand assets have not been supplied."
          },
          {
            "id": "D",
            "text": "Chloe, select the primary conversion goal from the two documented options before we baseline the brief."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision"
        },
        "explain": "A — Progress: целевая аудитория подтверждена в документе. B — Risk: будущая правка возможна, но ещё не потребовалась. C — Blocker: дизайн уже остановлен из-за отсутствующих материалов. D — Decision needed: клиент должен выбрать цель до фиксации brief. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c1-l12-scope-v1",
    "track": "pm",
    "chapter": 1,
    "level": 12,
    "caseId": "b12",
    "format": "scope",
    "difficulty": 1,
    "title": "Make room for invoice clarification",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Paul asks for a checked invoice allocation before posting. The client also requests a cost summary. The plan must preserve verification of the missing project code; Julia approves any reporting swap. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Finance hours",
            "≤",
            "3"
          ],
          [
            "Coordinator hours",
            "≤",
            "4"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Finance hours",
          "Coordinator hours"
        ],
        "rows": [
          [
            "A",
            "4",
            "4"
          ],
          [
            "B",
            "3",
            "4"
          ],
          [
            "C",
            "3",
            "5"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can complete verification and add the full summary under Plan A within the same window. Four finance hours should fit because coordinator time stays at four; please approve the reporting addition before posting.",
            "feedback": "4 часа финансового специалиста > 3."
          },
          {
            "id": "B",
            "text": "We can replace the optional chart with the cost summary under Plan B, using three finance hours and four coordinator hours. Please approve the swap; we will verify the project code before any posting.",
            "feedback": "Обе роли укладываются, обязательная проверка кода проекта сохранена."
          },
          {
            "id": "C",
            "text": "We can keep the optional chart and prepare the summary under Plan C because finance stays within three hours. Please approve the full package; the fifth coordinator hour can be absorbed into the same window.",
            "feedback": "5 часов координатора > 4."
          }
        ],
        "key": [
          "B"
        ],
        "explain": "A требует 4 > 3 часов финансового специалиста. B укладывается: 3 ≤ 3 и 4 ≤ 4. C требует 5 > 4 часов координатора. Cost allocation — отнесение затрат; posting — проведение записи. Проверка кода проекта сохраняется до проведения счёта."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c2-l02-gantt-v1",
    "track": "pm",
    "chapter": 2,
    "level": 2,
    "caseId": "b14",
    "format": "gantt",
    "difficulty": 2,
    "title": "Find whether a blog dependency moves the release",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The blog’s content approval is A. Site testing waits for both the blog build and the existing core build. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 3 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 12,
        "rows": [
          [
            "A · Approve blog content",
            "Day 1",
            "Day 2",
            "None",
            1,
            2
          ],
          [
            "B · Build blog section",
            "Day 3",
            "Day 5",
            "A",
            3,
            5
          ],
          [
            "C · Build core site",
            "Day 1",
            "Day 6",
            "None",
            1,
            6
          ],
          [
            "D · Combined acceptance",
            "Day 7",
            "Day 8",
            "B, C",
            7,
            8
          ],
          [
            "R · Release",
            "Day 9",
            "Day 9",
            "D",
            9,
            9
          ],
          [
            "E · Prepare newsletter",
            "Day 1",
            "Day 4",
            "None",
            1,
            4
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 3 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 3,
        "options": [
          {
            "id": "B",
            "text": "Build blog section",
            "feedback": "B: дни 3–5 → 6–8. Даты меняются."
          },
          {
            "id": "C",
            "text": "Build core site",
            "feedback": "C: дни 1–6 → 1–6. Даты не меняются."
          },
          {
            "id": "D",
            "text": "Combined acceptance",
            "feedback": "D: дни 7–8 → 9–10. Даты меняются."
          },
          {
            "id": "R",
            "text": "Release",
            "feedback": "R: дни 9–9 → 11–11. Даты меняются."
          },
          {
            "id": "E",
            "text": "Prepare newsletter",
            "feedback": "E: дни 1–4 → 1–4. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "D",
          "R"
        ],
        "explain": "A: дни 1–2 → 4–5; B: 3–5 → 6–8. C заканчивается в день 6 без изменений. D: 7–8 → 9–10; R: 9 → 11. Трёхдневная задержка сдвигает релиз на два дня: один день поглощает исходный запас ветки B. Float — запас по срокам."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "11",
            "text": "Day 11 — the blog finishes day 8, combined acceptance runs days 9–10.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "12",
            "text": "Day 12 — the entire three-day content delay must move the original release by three days.",
            "feedback": "Один день из трёх поглощает исходный запас ветки блога."
          },
          {
            "id": "9",
            "text": "Day 9 — core finishes day 6, so combined acceptance can still use days 7–8.",
            "feedback": "Общая приёмка ждёт и core, и blog; одного готового core недостаточно."
          }
        ],
        "key": [
          "11"
        ],
        "explain": "A: дни 1–2 → 4–5; B: 3–5 → 6–8. C заканчивается в день 6 без изменений. D: 7–8 → 9–10; R: 9 → 11. Трёхдневная задержка сдвигает релиз на два дня: один день поглощает исходный запас ветки B. Float — запас по срокам."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 3,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c2-l04-status-v1",
    "track": "pm",
    "chapter": 2,
    "level": 4,
    "caseId": "b16",
    "format": "status",
    "difficulty": 2,
    "title": "Report backlog readiness without claiming full completion",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Raj needs a usable sprint backlog. Report items independently; finishing ticket cleanup does not prove the whole backlog is ready. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "The team added acceptance criteria to the twelve tickets selected for the next sprint; Raj checked those twelve."
          },
          {
            "id": "B",
            "text": "The remaining sixty-eight tickets are still unrefined; several could contain dependencies that affect the following sprint."
          },
          {
            "id": "C",
            "text": "Estimation of the payment ticket has stopped because the required provider specification is missing."
          },
          {
            "id": "D",
            "text": "Julia, choose whether the two unestimated requests move out of the sprint or the sprint goal changes before planning closes."
          },
          {
            "id": "E",
            "text": "The duplicate tickets were merged and their original references remain in the audit trail."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress"
        },
        "explain": "A — Progress: проверены именно 12 выбранных tickets, не весь backlog. B — Risk: в оставшихся tickets могут проявиться будущие зависимости. C — Blocker: оценка конкретной задачи уже остановилась. D — Decision needed: Julia должна выбрать изменение scope или цели sprint. E — Progress: объединение дублей завершено и проверяемо. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c2-l06-scope-v1",
    "track": "pm",
    "chapter": 2,
    "level": 6,
    "caseId": "b18",
    "format": "scope",
    "difficulty": 2,
    "title": "Bound another round of client design changes",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — After the retrospective, Chloe requests another visual revision. The plans include rework and regression testing. Julia and Chloe must approve the version and the scope change together. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Design days",
            "≤",
            "3"
          ],
          [
            "Developer days",
            "≤",
            "4"
          ],
          [
            "Remaining cost $",
            "≤",
            "2400"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Design days",
          "Developer days",
          "Remaining cost $"
        ],
        "rows": [
          [
            "A",
            "3",
            "4",
            "2300"
          ],
          [
            "B",
            "4",
            "4",
            "2300"
          ],
          [
            "C",
            "3",
            "4",
            "2700"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can replace the optional illustration with the agreed revision under Plan A, including regression testing, for $2,300. Please confirm the reference version and approve the swap before the team starts rework.",
            "feedback": "Роли и стоимость укладываются; версия и замена требуют согласования."
          },
          {
            "id": "B",
            "text": "We can retain the illustration and deliver the revision under Plan B for $2,300. The four design days should fit alongside four developer days; please confirm the version and approve the expanded scope.",
            "feedback": "4 дня дизайна > 3; параллельная разработка не компенсирует это."
          },
          {
            "id": "C",
            "text": "We can use Plan C to preserve every visual item within three design days and four developer days. Please approve the change within the current $2,400 allowance; its $2,700 total is close enough to absorb.",
            "feedback": "$2,700 > $2,400; близость к лимиту не разрешает превышение."
          }
        ],
        "key": [
          "A"
        ],
        "explain": "A проходит все пределы: 3 дня дизайна, 4 дня разработки, $2,300 ≤ $2,400. B требует 4 > 3 дней дизайна; C стоит $2,700 > $2,400. Reference version — согласованная версия; rework — повторная работа, которая тоже занимает оплачиваемую ёмкость команды."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c2-l08-gantt-v1",
    "track": "pm",
    "chapter": 2,
    "level": 8,
    "caseId": "b20",
    "format": "gantt",
    "difficulty": 2,
    "title": "Trace the late test report through two approvals",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Ben’s test report is B; the security review can continue independently. Release requires both the defect follow-up and client acceptance. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only B starts 2 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 13,
        "rows": [
          [
            "A · Prepare test build",
            "Day 1",
            "Day 3",
            "None",
            1,
            3
          ],
          [
            "B · Complete test report",
            "Day 4",
            "Day 5",
            "A",
            4,
            5
          ],
          [
            "C · Security review",
            "Day 2",
            "Day 6",
            "None",
            2,
            6
          ],
          [
            "D · Resolve report findings",
            "Day 6",
            "Day 7",
            "B",
            6,
            7
          ],
          [
            "E · Client acceptance",
            "Day 8",
            "Day 8",
            "C, D",
            8,
            8
          ],
          [
            "R · Release",
            "Day 9",
            "Day 9",
            "E",
            9,
            9
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 3 последующие задачи, у которых изменятся даты. Саму задержанную B не выбирайте.",
        "count": 3,
        "options": [
          {
            "id": "A",
            "text": "Prepare test build",
            "feedback": "A: дни 1–3 → 1–3. Даты не меняются."
          },
          {
            "id": "C",
            "text": "Security review",
            "feedback": "C: дни 2–6 → 2–6. Даты не меняются."
          },
          {
            "id": "D",
            "text": "Resolve report findings",
            "feedback": "D: дни 6–7 → 8–9. Даты меняются."
          },
          {
            "id": "E",
            "text": "Client acceptance",
            "feedback": "E: дни 8–8 → 10–10. Даты меняются."
          },
          {
            "id": "R",
            "text": "Release",
            "feedback": "R: дни 9–9 → 11–11. Даты меняются."
          }
        ],
        "key": [
          "D",
          "E",
          "R"
        ],
        "explain": "B: дни 4–5 → 6–7; D: 6–7 → 8–9; E: 8 → 10; R: 9 → 11. A и независимая проверка C не сдвигаются. Client acceptance — клиентская приёмка; findings — выявленные замечания. Приёмка ждёт все свои зависимости."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "11",
            "text": "Day 11 — findings move to days 8–9 and client acceptance moves to day 10.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "9",
            "text": "Day 9 — security still ends day 6, so client acceptance can keep its original slot.",
            "feedback": "Приёмка ждёт и проверку безопасности, и исправление замечаний из отчёта."
          },
          {
            "id": "13",
            "text": "Day 13 — add two days to the report and another two to the client approval.",
            "feedback": "Двухдневная задержка не суммируется повторно на согласовании."
          }
        ],
        "key": [
          "11"
        ],
        "explain": "B: дни 4–5 → 6–7; D: 6–7 → 8–9; E: 8 → 10; R: 9 → 11. A и независимая проверка C не сдвигаются. Client acceptance — клиентская приёмка; findings — выявленные замечания. Приёмка ждёт все свои зависимости."
      }
    ],
    "audit": {
      "delayedTask": "B",
      "delayDays": 2,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c2-l10-status-v1",
    "track": "pm",
    "chapter": 2,
    "level": 10,
    "caseId": "s01",
    "format": "status",
    "difficulty": 2,
    "title": "Report an unapproved expansion as decisions and facts",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Three pages and another payment method have been requested; the signed baseline is unchanged. Distinguish the request from authorization. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "The impact assessment for the requested pages is complete and linked to the change record."
          },
          {
            "id": "B",
            "text": "The new payment method could require another compliance review; the provider has not confirmed that requirement."
          },
          {
            "id": "C",
            "text": "Implementation of the new payment method is stopped because mandatory sandbox access is absent."
          },
          {
            "id": "D",
            "text": "Chloe and Julia, choose a funded extension or the documented scope swap; no change has been authorized yet."
          },
          {
            "id": "E",
            "text": "The original payment flow passed its existing regression suite yesterday."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress"
        },
        "explain": "A — Progress: оценка последствий готова, новые страницы ещё не реализованы. B — Risk: будущее требование compliance пока не подтверждено. C — Blocker: реализация уже остановлена отсутствующим доступом. D — Decision needed: изменение ещё не разрешено, нужен выбор владельцев. E — Progress: исходный flow уже прошёл свою проверку. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c2-l12-scope-v1",
    "track": "pm",
    "chapter": 2,
    "level": 12,
    "caseId": "s03",
    "format": "scope",
    "difficulty": 2,
    "title": "Respond to a request while the budget is burning",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Only $3,000 remains authorized after the forecast review. Chloe requests a reporting addition. The proposals include ALL remaining committed work; Julia and the client must sign the selected change. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Developer days",
            "≤",
            "5"
          ],
          [
            "QA days",
            "≤",
            "2"
          ],
          [
            "Remaining cost $",
            "≤",
            "3000"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Developer days",
          "QA days",
          "Remaining cost $"
        ],
        "rows": [
          [
            "A",
            "5",
            "3",
            "2900"
          ],
          [
            "B",
            "5",
            "2",
            "3300"
          ],
          [
            "C",
            "5",
            "2",
            "2950"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can add the report under Plan A for $2,900 while keeping the current scope. The third QA day can fit because developer effort stays at five days; please sign the addition against the remaining budget.",
            "feedback": "3 дня QA > 2, хотя стоимость укладывается."
          },
          {
            "id": "B",
            "text": "We can preserve the complete scope under Plan B within five developer days and two QA days. Please sign it under the existing $3,000 authorization; its $3,300 cost should be recovered through later efficiency.",
            "feedback": "Будущая неподтверждённая экономия не покрывает $3,300 > $3,000."
          },
          {
            "id": "C",
            "text": "We can replace the optional export with the report under Plan C, including testing, for $2,950. Please sign the scope swap; the remaining totals stay within five developer days and two QA days.",
            "feedback": "Единственный вариант проходит все ограничения."
          }
        ],
        "key": [
          "C"
        ],
        "explain": "A нарушает предел QA: 3 > 2 дней. B требует $3,300 > $3,000. C укладывается: 5 дней разработки, 2 дня QA, $2,950. Estimate to complete — оставшиеся затраты. Процент потраченного бюджета не равен проценту выполненного объёма."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c3-l02-gantt-v1",
    "track": "pm",
    "chapter": 3,
    "level": 2,
    "caseId": "b23",
    "format": "gantt",
    "difficulty": 3,
    "title": "Trace the approved extra feature after change control",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The undocumented feature has now been assessed. Only its specification approval A is delayed; unchanged core work remains independently scheduled. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 4 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 15,
        "rows": [
          [
            "A · Approve feature specification",
            "Day 1",
            "Day 2",
            "None",
            1,
            2
          ],
          [
            "B · Build the approved extra",
            "Day 3",
            "Day 6",
            "A",
            3,
            6
          ],
          [
            "C · Core regression",
            "Day 1",
            "Day 7",
            "None",
            1,
            7
          ],
          [
            "D · Combined validation",
            "Day 8",
            "Day 9",
            "B, C",
            8,
            9
          ],
          [
            "E · Client sign-off",
            "Day 10",
            "Day 10",
            "D",
            10,
            10
          ],
          [
            "R · Release",
            "Day 11",
            "Day 11",
            "E",
            11,
            11
          ],
          [
            "F · Update internal handbook",
            "Day 2",
            "Day 5",
            "None",
            2,
            5
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 4 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 4,
        "options": [
          {
            "id": "B",
            "text": "Build the approved extra",
            "feedback": "B: дни 3–6 → 7–10. Даты меняются."
          },
          {
            "id": "C",
            "text": "Core regression",
            "feedback": "C: дни 1–7 → 1–7. Даты не меняются."
          },
          {
            "id": "D",
            "text": "Combined validation",
            "feedback": "D: дни 8–9 → 11–12. Даты меняются."
          },
          {
            "id": "E",
            "text": "Client sign-off",
            "feedback": "E: дни 10–10 → 13–13. Даты меняются."
          },
          {
            "id": "R",
            "text": "Release",
            "feedback": "R: дни 11–11 → 14–14. Даты меняются."
          },
          {
            "id": "F",
            "text": "Update internal handbook",
            "feedback": "F: дни 2–5 → 2–5. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "D",
          "E",
          "R"
        ],
        "explain": "A: 1–2 → 5–6; B: 3–6 → 7–10; D: 8–9 → 11–12; E: 10 → 13; R: 11 → 14. C и F не сдвигаются. Один день исходного запаса поглощён. Change control — управление изменениями; sign-off — формальное подтверждение готовности."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "14",
            "text": "Day 14 — the extra finishes day 10; combined validation is days 11–12 and sign-off is day 13.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "15",
            "text": "Day 15 — add all four approval-delay days to the original day-11 release.",
            "feedback": "Один день исходного запаса ветки B поглощает задержку."
          },
          {
            "id": "11",
            "text": "Day 11 — the core regression still ends day 7, so retain the baseline release.",
            "feedback": "Общая проверка ждёт дополнительную функцию B, а не только core C."
          }
        ],
        "key": [
          "14"
        ],
        "explain": "A: 1–2 → 5–6; B: 3–6 → 7–10; D: 8–9 → 11–12; E: 10 → 13; R: 11 → 14. C и F не сдвигаются. Один день исходного запаса поглощён. Change control — управление изменениями; sign-off — формальное подтверждение готовности."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 4,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c3-l04-status-v1",
    "track": "pm",
    "chapter": 3,
    "level": 4,
    "caseId": "b25",
    "format": "status",
    "difficulty": 3,
    "title": "Separate a sandbox blocker from a release risk",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The provider’s sandbox date slipped. Integration is currently stopped; the launch consequence is still being assessed. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "Integration work has no usable sandbox today; the team has stopped that workstream."
          },
          {
            "id": "B",
            "text": "The provider confirmed the revised sandbox date in writing; the confirmation is stored."
          },
          {
            "id": "C",
            "text": "The revised date could miss the last validation slot; the provider has not committed to an earlier slot."
          },
          {
            "id": "D",
            "text": "Julia, approve the assessed mock-based work package or move its capacity to the core site by 14:00."
          },
          {
            "id": "E",
            "text": "The mock-based package might expose fewer provider-specific defects than a real sandbox run."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "blocker",
          "B": "progress",
          "C": "risk",
          "D": "decision",
          "E": "risk"
        },
        "explain": "A — Blocker: интеграционная работа уже остановлена сегодня. B — Progress: подтверждение даты получено, но sandbox ещё не готов. C — Risk: будущий пропуск окна пока возможен, а не установлен. D — Decision needed: Julia должна выбрать использование выделенного ресурса. E — Risk: неполная проверка на mock может оставить будущие дефекты. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c3-l06-scope-v1",
    "track": "pm",
    "chapter": 3,
    "level": 6,
    "caseId": "b27",
    "format": "scope",
    "difficulty": 3,
    "title": "Protect validation while responding to a late request",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Five project days remain before go/no-go. The client asks for another payment option while bugs are being triaged. Each plan includes the required regression suite; no plan may omit it. Julia and the release owner approve any scope swap. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Developer days",
            "≤",
            "6"
          ],
          [
            "QA days",
            "≤",
            "3"
          ],
          [
            "Finish by day",
            "≤",
            "5"
          ],
          [
            "Remaining cost $",
            "≤",
            "5000"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Developer days",
          "QA days",
          "Finish by day",
          "Remaining cost $"
        ],
        "rows": [
          [
            "A",
            "6",
            "4",
            "5",
            "4800"
          ],
          [
            "B",
            "6",
            "3",
            "5",
            "4900"
          ],
          [
            "C",
            "6",
            "3",
            "6",
            "4700"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can retain the visual polish and add the payment option under Plan A before go/no-go for $4,800. Its fourth QA day can overlap development; please approve the full addition without changing the five-day window.",
            "feedback": "4 человеко-дня QA > 3, даже при перекрытии работ по календарю."
          },
          {
            "id": "B",
            "text": "We can replace the optional visual polish with the payment option under Plan B for $4,900, finishing by day 5 with the required tests. Please approve the swap; go/no-go still depends on the actual test evidence.",
            "feedback": "Роли, дата и стоимость укладываются; go/no-go остаётся отдельным решением."
          },
          {
            "id": "C",
            "text": "We can retain the complete scope under Plan C for $4,700 within six developer days and three QA days. Please approve it against the existing go/no-go date; finishing on day 6 does not change that commitment.",
            "feedback": "День 6 позже обязательного дня 5."
          }
        ],
        "key": [
          "B"
        ],
        "explain": "A требует 4 > 3 дней QA. C заканчивается в день 6, позже предела 5. B укладывается: 6 дней разработки, 3 дня QA, день 5, $4,900 ≤ $5,000. Person-days — объём труда, а не календарная длительность. Go/no-go остаётся решением по фактическим результатам тестов."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c3-l08-gantt-v1",
    "track": "pm",
    "chapter": 3,
    "level": 8,
    "caseId": "b29",
    "format": "gantt",
    "difficulty": 3,
    "title": "Forecast discovery before a fixed-price baseline",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The fixed-price draft requires a usable scope baseline. Its assumptions review A is late; no unlisted fast-tracking or contract waiver is available. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 2 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 15,
        "rows": [
          [
            "A · Review assumptions",
            "Day 1",
            "Day 3",
            "None",
            1,
            3
          ],
          [
            "B · Estimate delivery",
            "Day 4",
            "Day 6",
            "A",
            4,
            6
          ],
          [
            "C · Review commercial terms",
            "Day 1",
            "Day 5",
            "None",
            1,
            5
          ],
          [
            "D · Agree scope baseline",
            "Day 7",
            "Day 8",
            "B, C",
            7,
            8
          ],
          [
            "E · Contract review",
            "Day 9",
            "Day 10",
            "D",
            9,
            10
          ],
          [
            "R · Authorize delivery",
            "Day 11",
            "Day 11",
            "E",
            11,
            11
          ],
          [
            "F · Portfolio planning",
            "Day 1",
            "Day 6",
            "None",
            1,
            6
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 4 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 4,
        "options": [
          {
            "id": "B",
            "text": "Estimate delivery",
            "feedback": "B: дни 4–6 → 6–8. Даты меняются."
          },
          {
            "id": "C",
            "text": "Review commercial terms",
            "feedback": "C: дни 1–5 → 1–5. Даты не меняются."
          },
          {
            "id": "D",
            "text": "Agree scope baseline",
            "feedback": "D: дни 7–8 → 9–10. Даты меняются."
          },
          {
            "id": "E",
            "text": "Contract review",
            "feedback": "E: дни 9–10 → 11–12. Даты меняются."
          },
          {
            "id": "R",
            "text": "Authorize delivery",
            "feedback": "R: дни 11–11 → 13–13. Даты меняются."
          },
          {
            "id": "F",
            "text": "Portfolio planning",
            "feedback": "F: дни 1–6 → 1–6. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "D",
          "E",
          "R"
        ],
        "explain": "A: 1–3 → 3–5; B: 4–6 → 6–8; D: 7–8 → 9–10; E: 9–10 → 11–12; R: 11 → 13. C и F остаются на месте. Fixed price — цена за согласованный объём; assumptions — предпосылки оценки. Параллельная коммерческая проверка не заменяет оценку разработки."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "13",
            "text": "Day 13 — estimation ends day 8, scope agreement is days 9–10 and contract review is days 11–12.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "11",
            "text": "Day 11 — commercial terms finish day 5, so the fixed-price baseline remains usable on schedule.",
            "feedback": "Коммерческая проверка — лишь одна из двух зависимостей согласования scope."
          },
          {
            "id": "15",
            "text": "Day 15 — both estimation and contract review each add the original two-day delay.",
            "feedback": "Последовательная цепочка переносит задержку, а не удваивает её."
          }
        ],
        "key": [
          "13"
        ],
        "explain": "A: 1–3 → 3–5; B: 4–6 → 6–8; D: 7–8 → 9–10; E: 9–10 → 11–12; R: 11 → 13. C и F остаются на месте. Fixed price — цена за согласованный объём; assumptions — предпосылки оценки. Параллельная коммерческая проверка не заменяет оценку разработки."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 2,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c3-l10-status-v1",
    "track": "pm",
    "chapter": 3,
    "level": 10,
    "caseId": "s04",
    "format": "status",
    "difficulty": 3,
    "title": "Report design rejection without rewriting the approval history",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The client dislikes the final design. Use the recorded approval history and the current assessed response, not assumptions about fault. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "The earlier sketch approval is recorded with its version and date; it has not been withdrawn from the project record."
          },
          {
            "id": "B",
            "text": "The client could reject the revised visual direction again; acceptance criteria are being clarified while the team continues core work."
          },
          {
            "id": "C",
            "text": "Final visual implementation is paused because the mandatory current reference version is still missing."
          },
          {
            "id": "D",
            "text": "Chloe, choose the assessed revision or accept the current version against the documented criteria by tomorrow."
          },
          {
            "id": "E",
            "text": "The team completed the difference log between the approved sketches and the final screens."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress"
        },
        "explain": "A — Progress: прошлое согласование версии — завершённый факт, не приёмка final design. B — Risk: повторный отказ возможен в будущем; core-работа продолжается. C — Blocker: реализация конкретного направления уже стоит. D — Decision needed: клиенту предложен явный выбор с датой. E — Progress: сравнение версий готово, новый дизайн ещё не согласован. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c3-l12-scope-v1",
    "track": "pm",
    "chapter": 3,
    "level": 12,
    "caseId": "s06",
    "format": "scope",
    "difficulty": 3,
    "title": "Offer a bounded answer to an unscoped app request",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Sales wants an app in three months from a one-page brief. Only discovery can currently be estimated. The authorized immediate stage must fit the limits below and may NOT promise an assessed production date; Julia and the client approve the stage. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Discovery team-days",
            "≤",
            "8"
          ],
          [
            "Immediate stage cost $",
            "≤",
            "6000"
          ],
          [
            "Unassessed production commitments",
            "≤",
            "0"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Discovery team-days",
          "Immediate stage cost $",
          "Unassessed production commitments"
        ],
        "rows": [
          [
            "A",
            "8",
            "5800",
            "0"
          ],
          [
            "B",
            "8",
            "5800",
            "1"
          ],
          [
            "C",
            "10",
            "5900",
            "0"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can offer the eight-team-day discovery stage under Plan A for $5,800, with a reviewed scope and delivery forecast as outputs. Please approve that stage; we cannot yet confirm a three-month production commitment from the brief.",
            "feedback": "Ограниченный оценённый этап не выдаётся за обязательство по всему приложению."
          },
          {
            "id": "B",
            "text": "We can offer the same discovery stage under Plan B for $5,800 and confirm production in three months now. Please approve the stage; the later forecast will refine details without changing the promised release commitment.",
            "feedback": "Неоценённое обещание production нарушает явный запрет."
          },
          {
            "id": "C",
            "text": "We can offer Plan C without promising a production date and deliver a reviewed forecast for $5,900. Please approve the ten-team-day discovery stage within the existing eight-team-day reservation; it will reduce uncertainty before contracting.",
            "feedback": "10 командо-дней не помещаются в выделенные 8."
          }
        ],
        "key": [
          "A"
        ],
        "explain": "A проходит: 8 командо-дней ≤ 8, $5,800 ≤ $6,000, неподтверждённых обязательств нет. B обещает неоценённый срок production; C требует 10 > 8 командо-дней. Bounded commitment — ограниченное обещание. Forecast — прогноз, который ещё не равен подписанному сроку."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c4-l02-gantt-v1",
    "track": "pm",
    "chapter": 4,
    "level": 2,
    "caseId": "b32",
    "format": "gantt",
    "difficulty": 4,
    "title": "Correct the client plan from the actual dependencies",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Dan’s corrected plan must wait for the verified date review A. The two downstream streams join at client approval; no date is silently overwritten. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 3 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 15,
        "rows": [
          [
            "A · Verify corrected dates",
            "Day 1",
            "Day 2",
            "None",
            1,
            2
          ],
          [
            "B · Rebaseline delivery plan",
            "Day 3",
            "Day 5",
            "A",
            3,
            5
          ],
          [
            "C · Review commercial impact",
            "Day 3",
            "Day 4",
            "A",
            3,
            4
          ],
          [
            "D · Client approval",
            "Day 6",
            "Day 6",
            "B, C",
            6,
            6
          ],
          [
            "E · Prepare deployment",
            "Day 7",
            "Day 8",
            "D",
            7,
            8
          ],
          [
            "R · Release",
            "Day 9",
            "Day 9",
            "E",
            9,
            9
          ],
          [
            "F · Training notes",
            "Day 1",
            "Day 5",
            "None",
            1,
            5
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 5 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 5,
        "options": [
          {
            "id": "B",
            "text": "Rebaseline delivery plan",
            "feedback": "B: дни 3–5 → 6–8. Даты меняются."
          },
          {
            "id": "C",
            "text": "Review commercial impact",
            "feedback": "C: дни 3–4 → 6–7. Даты меняются."
          },
          {
            "id": "D",
            "text": "Client approval",
            "feedback": "D: дни 6–6 → 9–9. Даты меняются."
          },
          {
            "id": "E",
            "text": "Prepare deployment",
            "feedback": "E: дни 7–8 → 10–11. Даты меняются."
          },
          {
            "id": "R",
            "text": "Release",
            "feedback": "R: дни 9–9 → 12–12. Даты меняются."
          },
          {
            "id": "F",
            "text": "Training notes",
            "feedback": "F: дни 1–5 → 1–5. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "C",
          "D",
          "E",
          "R"
        ],
        "explain": "A: 1–2 → 4–5; B: 3–5 → 6–8; C: 3–4 → 6–7; D: 6 → 9; E: 7–8 → 10–11; R: 9 → 12. F не меняется. Rebaseline — согласованно обновить базовый план. Задержки параллельных веток не складываются: приёмка ждёт более позднюю из них."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "12",
            "text": "Day 12 — rebaselining ends day 8, approval is day 9 and deployment preparation is days 10–11.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "9",
            "text": "Day 9 — the shorter commercial review still fits within rebaselining, so no downstream dates change.",
            "feedback": "Обе ветки начинаются после A; более короткая C тоже сдвигается."
          },
          {
            "id": "15",
            "text": "Day 15 — add three days for each of the two affected review streams to the baseline release.",
            "feedback": "Параллельные трёхдневные сдвиги не складываются в шесть дней."
          }
        ],
        "key": [
          "12"
        ],
        "explain": "A: 1–2 → 4–5; B: 3–5 → 6–8; C: 3–4 → 6–7; D: 6 → 9; E: 7–8 → 10–11; R: 9 → 12. F не меняется. Rebaseline — согласованно обновить базовый план. Задержки параллельных веток не складываются: приёмка ждёт более позднюю из них."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 3,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c4-l04-status-v1",
    "track": "pm",
    "chapter": 4,
    "level": 4,
    "caseId": "b34",
    "format": "status",
    "difficulty": 4,
    "title": "Write a margin recovery status with decisions separated",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The margin forecast is 12% against a 25% target. Classify concrete work and decisions rather than labelling a forecast as a finished recovery. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "Finance reconciled the actual cost ledger with the project timesheets; the signed reconciliation is linked."
          },
          {
            "id": "B",
            "text": "The remaining integration estimate has a wide range; its high case could further reduce forecast margin."
          },
          {
            "id": "C",
            "text": "The billable milestone cannot be invoiced today because the required client acceptance is missing."
          },
          {
            "id": "D",
            "text": "Julia and Paul, select the scope renegotiation or approve the bounded recovery spend by Friday."
          },
          {
            "id": "E",
            "text": "The client signed the agreed change order yesterday; its reference is in the baseline."
          },
          {
            "id": "F",
            "text": "The subcontractor might raise its rate at renewal; no new rate is contracted yet."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress",
          "F": "risk"
        },
        "explain": "A — Progress: сверка затрат завершена, целевая маржа этим не достигнута. B — Risk: будущие затраты могут ухудшить прогноз. C — Blocker: выставление счёта уже остановлено отсутствующей приёмкой. D — Decision needed: нужен выбор уполномоченных владельцев. E — Progress: изменение уже подписано и не требует повторного решения. F — Risk: новая ставка ещё не определена и относится к будущему. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c4-l06-scope-v1",
    "track": "pm",
    "chapter": 4,
    "level": 6,
    "caseId": "b36",
    "format": "scope",
    "difficulty": 4,
    "title": "Share a design-system update without double-booking",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Two clients need the same design-system update. The plans include both clients’ committed work and regression checks; capacity is already net of other reservations. Julia and both client owners must approve sequencing changes. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Designer days",
            "≤",
            "6"
          ],
          [
            "Developer days",
            "≤",
            "8"
          ],
          [
            "QA days",
            "≤",
            "4"
          ],
          [
            "Remaining cost $",
            "≤",
            "9000"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Designer days",
          "Developer days",
          "QA days",
          "Remaining cost $"
        ],
        "rows": [
          [
            "A",
            "7",
            "8",
            "4",
            "8800"
          ],
          [
            "B",
            "6",
            "8",
            "5",
            "8700"
          ],
          [
            "C",
            "6",
            "8",
            "4",
            "8900"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can keep both separate implementations under Plan A for $8,800 and retain both client dates. Seven design days can be spread across the same reservation; please approve the unchanged feature scope for both teams.",
            "feedback": "7 дней дизайнера > 6."
          },
          {
            "id": "B",
            "text": "We can share implementation under Plan B for $8,700 and keep design and development within capacity. Please approve the sequence for both clients; the fifth QA day can be covered by reusing the shared component test results.",
            "feedback": "Повторное использование уже учтено в оценке; 5 дней QA > 4."
          },
          {
            "id": "C",
            "text": "We can use Plan C’s shared core and replace each optional styling extra with the required update, including both regression checks, for $8,900. Please approve both scope swaps; the combined role totals stay within the reserved capacity.",
            "feedback": "Оба клиента и все отдельные роли учтены в пределах лимитов."
          }
        ],
        "key": [
          "C"
        ],
        "explain": "A требует 7 > 6 дней дизайнера; B — 5 > 4 дней QA. C укладывается: 6 дней дизайна, 8 дней разработки, 4 дня QA, $8,900 ≤ $9,000. Shared capacity — общий ресурс. Повторное использование компонента уже учтено в оценке и не отменяет клиентские проверки."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c4-l08-gantt-v1",
    "track": "pm",
    "chapter": 4,
    "level": 8,
    "caseId": "b38",
    "format": "gantt",
    "difficulty": 4,
    "title": "Forecast vacation-adjusted delivery capacity",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The baseline includes an August absence as a reserved start: specialist review C cannot start before day 7. This reservation stays unchanged; the design package A is late. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 2 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 14,
        "rows": [
          [
            "A · Complete design package",
            "Day 1",
            "Day 3",
            "None",
            1,
            3
          ],
          [
            "B · Build client flow",
            "Day 4",
            "Day 7",
            "A",
            4,
            7
          ],
          [
            "C · Specialist review after leave",
            "Day 7",
            "Day 8",
            "None",
            7,
            8
          ],
          [
            "D · Integrated acceptance",
            "Day 9",
            "Day 10",
            "B, C",
            9,
            10
          ],
          [
            "E · Client sign-off",
            "Day 11",
            "Day 11",
            "D",
            11,
            11
          ],
          [
            "R · Release",
            "Day 12",
            "Day 12",
            "E",
            12,
            12
          ],
          [
            "F · Unrelated reporting",
            "Day 1",
            "Day 5",
            "None",
            1,
            5
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 1 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 4,
        "options": [
          {
            "id": "B",
            "text": "Build client flow",
            "feedback": "B: дни 4–7 → 6–9. Даты меняются."
          },
          {
            "id": "C",
            "text": "Specialist review after leave",
            "feedback": "C: дни 7–8 → 7–8. Даты не меняются."
          },
          {
            "id": "D",
            "text": "Integrated acceptance",
            "feedback": "D: дни 9–10 → 10–11. Даты меняются."
          },
          {
            "id": "E",
            "text": "Client sign-off",
            "feedback": "E: дни 11–11 → 12–12. Даты меняются."
          },
          {
            "id": "R",
            "text": "Release",
            "feedback": "R: дни 12–12 → 13–13. Даты меняются."
          },
          {
            "id": "F",
            "text": "Unrelated reporting",
            "feedback": "F: дни 1–5 → 1–5. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "D",
          "E",
          "R"
        ],
        "explain": "A: 1–3 → 3–5; B: 4–7 → 6–9. C сохраняет зарезервированные дни 7–8. D: 9–10 → 10–11; E: 11 → 12; R: 12 → 13. Один день задержки поглощён запасом. Reserved capacity — заранее выделенный ресурс; отпуск не создаёт новую зависимость от A."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "12",
            "text": "Day 12 — the specialist review remains on days 7–8, so acceptance can retain its original dates despite the late build.",
            "feedback": "Приёмка ждёт также B, которая теперь заканчивается только в день 9."
          },
          {
            "id": "14",
            "text": "Day 14 — add the two-day design delay to the original release without checking the specialist reservation.",
            "feedback": "Один день задержки поглощает исходный запас перед приёмкой."
          },
          {
            "id": "13",
            "text": "Day 13 — build finishes day 9, acceptance takes days 10–11, sign-off is day 12 and release is day 13.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          }
        ],
        "key": [
          "13"
        ],
        "explain": "A: 1–3 → 3–5; B: 4–7 → 6–9. C сохраняет зарезервированные дни 7–8. D: 9–10 → 10–11; E: 11 → 12; R: 12 → 13. Один день задержки поглощён запасом. Reserved capacity — заранее выделенный ресурс; отпуск не создаёт новую зависимость от A."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 2,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c4-l10-status-v1",
    "track": "pm",
    "chapter": 4,
    "level": 10,
    "caseId": "b40",
    "format": "status",
    "difficulty": 4,
    "title": "Report pitch-learning evidence without blaming price",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The pitch was lost. Julia needs a quick learning review that separates completed evidence collection from untested explanations. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "The client debrief was completed and its verbatim notes are linked to the bid record."
          },
          {
            "id": "B",
            "text": "Our next price recommendation could be misleading if the competing bids include services we did not price; their full scope is not yet verified."
          },
          {
            "id": "C",
            "text": "The bid-comparison analysis has stopped because the required scoring sheet is unavailable."
          },
          {
            "id": "D",
            "text": "Julia, choose a bounded follow-up study or close the review with the documented evidence gaps by Monday."
          },
          {
            "id": "E",
            "text": "The proposal-length figures were checked across the last five bids; the dataset is ready."
          },
          {
            "id": "F",
            "text": "A pricing change based only on this lost bid could reduce margin without improving win rate."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress",
          "F": "risk"
        },
        "explain": "A — Progress: разбор с клиентом проведён, причина проигрыша ещё не доказана. B — Risk: будущая рекомендация может быть ошибочной из-за несопоставимых bids. C — Blocker: сравнение уже остановлено без обязательного документа. D — Decision needed: Julia должна выбрать масштаб дальнейшего исследования. E — Progress: набор данных проверен, причинный вывод ещё не сделан. F — Risk: непроверенная ценовая гипотеза может ухудшить будущую маржу. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c4-l12-scope-v1",
    "track": "pm",
    "chapter": 4,
    "level": 12,
    "caseId": "s08",
    "format": "scope",
    "difficulty": 4,
    "title": "Offer an assessed earlier launch",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The event launch must be no later than project day 20. The original full scope finishes day 30. Each assessed alternative retains mandatory security and acceptance checks. Julia and the client CEO must approve any reduced launch baseline. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Developer days",
            "≤",
            "18"
          ],
          [
            "QA days",
            "≤",
            "6"
          ],
          [
            "Launch day",
            "≤",
            "20"
          ],
          [
            "Remaining cost $",
            "≤",
            "20000"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Developer days",
          "QA days",
          "Launch day",
          "Remaining cost $"
        ],
        "rows": [
          [
            "A",
            "18",
            "6",
            "20",
            "19800"
          ],
          [
            "B",
            "20",
            "6",
            "20",
            "19700"
          ],
          [
            "C",
            "18",
            "6",
            "22",
            "19500"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can target day 20 with Plan A’s event scope, deferring the optional reporting package and retaining security and acceptance checks for $19,800. Please approve the reduced baseline; the original full scope remains scheduled separately.",
            "feedback": "Ранняя дата относится к сокращённому оценённому объёму."
          },
          {
            "id": "B",
            "text": "We can keep the reporting package under Plan B and target day 20 for $19,700. Please approve the full scope; twenty developer days should fit because the QA reservation remains within six days.",
            "feedback": "20 дней разработки > 18; скрытой дополнительной ёмкости нет."
          },
          {
            "id": "C",
            "text": "We can retain the full scope under Plan C within eighteen developer days and six QA days for $19,500. Please approve it for the day-20 event; the assessed day-22 launch is close enough to preserve that promise.",
            "feedback": "День 22 позже даты события 20."
          }
        ],
        "key": [
          "A"
        ],
        "explain": "A проходит: 18 дней разработки, 6 дней QA, релиз в день 20, $19,800 ≤ $20,000. B требует 20 > 18 дней разработки. C выходит в день 22, позже события в день 20. Reduced baseline — согласованный сокращённый план. Ранняя дата относится к оценённому составу, а не ко всему исходному объёму."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c5-l02-gantt-v1",
    "track": "pm",
    "chapter": 5,
    "level": 2,
    "caseId": "b42",
    "format": "gantt",
    "difficulty": 5,
    "title": "Trace a shared login delay through the program",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Project B needs A’s login module. Project C’s reporting pipeline is separate. Release R has authorized windows on days 12, 19 and 26. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 3 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task. Release R is a one-day milestone allowed ONLY on the listed release days; choose the first allowed day after its predecessors finish. These windows are already authorized."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 26,
        "rows": [
          [
            "A · Project A login module",
            "Day 1",
            "Day 4",
            "None",
            1,
            4
          ],
          [
            "B · Project B integration",
            "Day 5",
            "Day 7",
            "A",
            5,
            7
          ],
          [
            "C · Project B test",
            "Day 8",
            "Day 9",
            "B",
            8,
            9
          ],
          [
            "D · Project C reporting",
            "Day 1",
            "Day 8",
            "None",
            1,
            8
          ],
          [
            "E · Program acceptance",
            "Day 10",
            "Day 11",
            "C, D",
            10,
            11
          ],
          [
            "R · Program release",
            "Day 12",
            "Day 12",
            "E",
            12,
            12
          ],
          [
            "F · Training pack",
            "Day 1",
            "Day 6",
            "None",
            1,
            6
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Authorized release days",
        "headers": [
          "Milestone",
          "Allowed project days"
        ],
        "rows": [
          [
            "R",
            "12, 19, 26"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 4 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 4,
        "options": [
          {
            "id": "B",
            "text": "Project B integration",
            "feedback": "B: дни 5–7 → 8–10. Даты меняются."
          },
          {
            "id": "C",
            "text": "Project B test",
            "feedback": "C: дни 8–9 → 11–12. Даты меняются."
          },
          {
            "id": "D",
            "text": "Project C reporting",
            "feedback": "D: дни 1–8 → 1–8. Даты не меняются."
          },
          {
            "id": "E",
            "text": "Program acceptance",
            "feedback": "E: дни 10–11 → 13–14. Даты меняются."
          },
          {
            "id": "R",
            "text": "Program release",
            "feedback": "R: дни 12–12 → 19–19. Даты меняются."
          },
          {
            "id": "F",
            "text": "Training pack",
            "feedback": "F: дни 1–6 → 1–6. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "C",
          "E",
          "R"
        ],
        "explain": "A: 1–4 → 4–7; B: 5–7 → 8–10; C: 8–9 → 11–12; E: 10–11 → 13–14. Следующий после готовности разрешённый R — день 19. D и F не меняются. Release window — разрешённое окно выпуска; cross-project dependency — межпроектная зависимость."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "19",
            "text": "Day 19 — acceptance completes day 14, so the first authorized release window is day 19.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "15",
            "text": "Day 15 — acceptance finishes day 14, so release can start immediately the next day.",
            "feedback": "День 15 удовлетворяет зависимостям, но отсутствует среди разрешённых окон."
          },
          {
            "id": "26",
            "text": "Day 26 — missing day 12 requires skipping the next release window as well.",
            "feedback": "Окно 19 уже допустимо; пропускать ещё одно окно не требуется."
          }
        ],
        "key": [
          "19"
        ],
        "explain": "A: 1–4 → 4–7; B: 5–7 → 8–10; C: 8–9 → 11–12; E: 10–11 → 13–14. Следующий после готовности разрешённый R — день 19. D и F не меняются. Release window — разрешённое окно выпуска; cross-project dependency — межпроектная зависимость."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 3,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c5-l04-status-v1",
    "track": "pm",
    "chapter": 5,
    "level": 4,
    "caseId": "b44",
    "format": "status",
    "difficulty": 5,
    "title": "Separate program actuals from the full-year forecast",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The first-half program spend is 8% over baseline. Report the current evidence and governance requests; do not extrapolate the percentage as a full-year certainty. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "Finance closed and reconciled the first-half actuals; the 8% variance is verified in the ledger."
          },
          {
            "id": "B",
            "text": "The remaining vendor rate is not fixed; the full-year forecast could worsen at renewal."
          },
          {
            "id": "C",
            "text": "The recovery workstream is stopped because the required client data extract has not arrived."
          },
          {
            "id": "D",
            "text": "Steering committee, select the scoped recovery or authorize the assessed reserve draw by Friday."
          },
          {
            "id": "E",
            "text": "The supplier approved the revised milestone invoice yesterday; the signed document is stored."
          },
          {
            "id": "F",
            "text": "Shared specialist absence next month could delay two remaining milestones; cover is not confirmed."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress",
          "F": "risk"
        },
        "explain": "A — Progress: сверка фактических затрат завершена; перерасход этим не устранён. B — Risk: будущая ставка поставщика пока не зафиксирована. C — Blocker: конкретная работа уже остановлена без данных. D — Decision needed: steering committee должен выбрать вариант и финансирование. E — Progress: согласование счёта уже получено. F — Risk: будущее отсутствие специалиста может вызвать задержку. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c5-l06-scope-v1",
    "track": "pm",
    "chapter": 5,
    "level": 6,
    "caseId": "b46",
    "format": "scope",
    "difficulty": 5,
    "title": "Add interviews without taking delivery capacity twice",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — After the PM interview debrief, hiring requests another panel this week. Candidate evaluation must keep the approved evidence rubric. Delivery reservations have already been deducted from the capacities below; Hannah approves any hiring-work swap. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Panel hours",
            "≤",
            "8"
          ],
          [
            "Senior PM hours",
            "≤",
            "4"
          ],
          [
            "Hiring spend $",
            "≤",
            "2000"
          ],
          [
            "Unapproved rubric changes",
            "≤",
            "0"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Panel hours",
          "Senior PM hours",
          "Hiring spend $",
          "Unapproved rubric changes"
        ],
        "rows": [
          [
            "A",
            "8",
            "5",
            "1900",
            "0"
          ],
          [
            "B",
            "8",
            "4",
            "1950",
            "0"
          ],
          [
            "C",
            "8",
            "4",
            "1800",
            "1"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can add the full panel under Plan A for $1,900, retaining the evidence rubric and eight panel hours. Please approve it; the fifth Senior PM hour can be borrowed from the delivery reservation already excluded from the capacity table.",
            "feedback": "Ресурс, уже выделенный delivery, нельзя использовать второй раз."
          },
          {
            "id": "B",
            "text": "We can replace the optional presentation round with the additional evidence interview under Plan B for $1,950, retaining the rubric. Please approve the hiring swap; it fits eight panel hours and four Senior PM hours without touching delivery capacity.",
            "feedback": "Все четыре ограничения соблюдены."
          },
          {
            "id": "C",
            "text": "We can add the panel under Plan C for $1,800 within eight panel hours and four Senior PM hours. Please approve the interview addition; we will replace the evidence rubric with informal discussion while the evaluation policy remains unchanged.",
            "feedback": "Изменение шкалы без разрешения нарушает отдельное ограничение."
          }
        ],
        "key": [
          "B"
        ],
        "explain": "A требует 5 > 4 часов Senior PM. C меняет обязательную шкалу интервью без разрешения. B проходит: 8 часов панели, 4 часа Senior PM, $1,950 ≤ $2,000, изменений шкалы нет. Protected capacity — ресурс, уже выделенный другой работе; structured interview — интервью по единой системе оценки."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c5-l08-gantt-v1",
    "track": "pm",
    "chapter": 5,
    "level": 8,
    "caseId": "b48",
    "format": "gantt",
    "difficulty": 5,
    "title": "Separate delivery completion from benefit measurement",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The benefit-measurement plan requires B’s client data approval as well as deployed functionality. R marks the first valid benefits-readout release, not proof that benefits were achieved. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only B starts 4 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 19,
        "rows": [
          [
            "A · Deploy functional increment",
            "Day 1",
            "Day 5",
            "None",
            1,
            5
          ],
          [
            "B · Approve client data access",
            "Day 1",
            "Day 3",
            "None",
            1,
            3
          ],
          [
            "C · Instrument benefit metric",
            "Day 6",
            "Day 8",
            "A, B",
            6,
            8
          ],
          [
            "D · Observe agreed outcome window",
            "Day 9",
            "Day 12",
            "C",
            9,
            12
          ],
          [
            "E · Validate readout",
            "Day 13",
            "Day 14",
            "D",
            13,
            14
          ],
          [
            "R · Benefits-readout release",
            "Day 15",
            "Day 15",
            "E",
            15,
            15
          ],
          [
            "F · Training completion",
            "Day 1",
            "Day 7",
            "None",
            1,
            7
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 4 последующие задачи, у которых изменятся даты. Саму задержанную B не выбирайте.",
        "count": 4,
        "options": [
          {
            "id": "A",
            "text": "Deploy functional increment",
            "feedback": "A: дни 1–5 → 1–5. Даты не меняются."
          },
          {
            "id": "C",
            "text": "Instrument benefit metric",
            "feedback": "C: дни 6–8 → 8–10. Даты меняются."
          },
          {
            "id": "D",
            "text": "Observe agreed outcome window",
            "feedback": "D: дни 9–12 → 11–14. Даты меняются."
          },
          {
            "id": "E",
            "text": "Validate readout",
            "feedback": "E: дни 13–14 → 15–16. Даты меняются."
          },
          {
            "id": "R",
            "text": "Benefits-readout release",
            "feedback": "R: дни 15–15 → 17–17. Даты меняются."
          },
          {
            "id": "F",
            "text": "Training completion",
            "feedback": "F: дни 1–7 → 1–7. Даты не меняются."
          }
        ],
        "key": [
          "C",
          "D",
          "E",
          "R"
        ],
        "explain": "B: 1–3 → 5–7; C: 6–8 → 8–10; D: 9–12 → 11–14; E: 13–14 → 15–16; R: 15 → 17. A и F не сдвигаются. Два дня задержки поглощены исходным запасом доступа. Benefit realization — достижение ценности; observation window нельзя пропустить ради раннего отчёта."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "17",
            "text": "Day 17 — access finishes day 7, instrumentation runs days 8–10 and the outcome window is days 11–14.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "19",
            "text": "Day 19 — move the original day-15 readout by the entire four-day access delay.",
            "feedback": "Два дня задержки поглощает исходный запас доступа относительно deploy A."
          },
          {
            "id": "15",
            "text": "Day 15 — functionality still deploys on day 5, so the original benefits readout remains valid.",
            "feedback": "Готового функционала A недостаточно: инструментирование ждёт доступ B."
          }
        ],
        "key": [
          "17"
        ],
        "explain": "B: 1–3 → 5–7; C: 6–8 → 8–10; D: 9–12 → 11–14; E: 13–14 → 15–16; R: 15 → 17. A и F не сдвигаются. Два дня задержки поглощены исходным запасом доступа. Benefit realization — достижение ценности; observation window нельзя пропустить ради раннего отчёта."
      }
    ],
    "audit": {
      "delayedTask": "B",
      "delayDays": 4,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c5-l10-status-v1",
    "track": "pm",
    "chapter": 5,
    "level": 10,
    "caseId": "b50",
    "format": "status",
    "difficulty": 5,
    "title": "Report the testing-cut proposal to steering",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The client CFO wants to remove testing. Contractual release checks still apply unless the authorized release owner formally changes the control; no such change exists. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "The test-impact assessment is complete; the signed release criteria are linked in the steering pack."
          },
          {
            "id": "B",
            "text": "Removing the agreed tests could leave payment defects undetected in the release."
          },
          {
            "id": "C",
            "text": "Release execution is stopped today because the mandatory payment test evidence is missing."
          },
          {
            "id": "D",
            "text": "Authorized release owner, reject the cut or approve an assessed compliant alternative by Thursday; the CFO request alone is not authorization."
          },
          {
            "id": "E",
            "text": "The client completed its separate exploratory session; that evidence is recorded without replacing our release suite."
          },
          {
            "id": "F",
            "text": "The client’s promised later testing might start after the warranty support team has rolled off."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress",
          "F": "risk"
        },
        "explain": "A — Progress: оценка последствий готова; исключение из правил ещё не разрешено. B — Risk: возможны будущие невыявленные дефекты. C — Blocker: релиз уже остановлен без необходимого результата проверки. D — Decision needed: решение требуется от release owner, а не от любого инициатора запроса. E — Progress: отдельная проверка клиента завершена, но не заменяет обязательную suite. F — Risk: обещанная поздняя проверка может не совпасть с периодом поддержки. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c5-l12-scope-v1",
    "track": "pm",
    "chapter": 5,
    "level": 12,
    "caseId": "s10",
    "format": "scope",
    "difficulty": 5,
    "title": "Offer a gated pilot while client IT access is unavailable",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Client IT cannot provide production access this quarter. An approved sandbox is available for a bounded pilot; production exposure without IT approval is prohibited. Steering and the client sponsor must approve the staged scope and its separate production dependency. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Engineering days",
            "≤",
            "12"
          ],
          [
            "Security days",
            "≤",
            "3"
          ],
          [
            "Pilot finish day",
            "≤",
            "18"
          ],
          [
            "Remaining cost $",
            "≤",
            "15000"
          ],
          [
            "Unapproved production exposures",
            "≤",
            "0"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Engineering days",
          "Security days",
          "Pilot finish day",
          "Remaining cost $",
          "Unapproved production exposures"
        ],
        "rows": [
          [
            "A",
            "12",
            "3",
            "18",
            "14500",
            "0"
          ],
          [
            "B",
            "12",
            "3",
            "18",
            "14000",
            "1"
          ],
          [
            "C",
            "12",
            "4",
            "18",
            "14300",
            "0"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can replace the production launch with Plan A’s approved-sandbox pilot for $14,500 by day 18. Please approve the staged baseline; production remains gated on client IT authorization and a separately assessed rollout, rather than being silently declared delivered.",
            "feedback": "Пилот в sandbox не выдаётся за production-запуск."
          },
          {
            "id": "B",
            "text": "We can use Plan B for $14,000 by day 18 within the engineering and security reservations. Please approve the current launch scope; one temporary production exposure before IT authorization will preserve the commitment until formal access arrives.",
            "feedback": "Временный характер не отменяет запрета на неразрешённый доступ."
          },
          {
            "id": "C",
            "text": "We can deliver the sandbox pilot under Plan C for $14,300 by day 18 without production exposure. Please approve the staged baseline; the fourth security day can fit because the engineering reservation stays within twelve days.",
            "feedback": "4 дня безопасности > 3; время разработчиков не заменяет эту роль."
          }
        ],
        "key": [
          "A"
        ],
        "explain": "A проходит: 12 дней разработки, 3 дня безопасности, день 18, $14,500 ≤ $15,000, неразрешённых production-запусков нет. B нарушает контроль доступа; C требует 4 > 3 дней безопасности. Gated pilot — ограниченный пилот. Согласие спонсора не заменяет разрешение IT на production."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c6-l02-gantt-v1",
    "track": "pm",
    "chapter": 6,
    "level": 2,
    "caseId": "b52",
    "format": "gantt",
    "difficulty": 6,
    "title": "Plan a quality readout across shared delivery resources",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Two client releases share a QA lead. The dependency C after B is an explicit capacity reservation, not a technical requirement; keep it. R is the organization-level quality-readout milestone. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 2 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 17,
        "rows": [
          [
            "A · Confirm metric definitions",
            "Day 1",
            "Day 3",
            "None",
            1,
            3
          ],
          [
            "B · Audit client One",
            "Day 4",
            "Day 6",
            "A",
            4,
            6
          ],
          [
            "C · Audit client Two after shared QA",
            "Day 7",
            "Day 9",
            "B",
            7,
            9
          ],
          [
            "D · Close evidence gaps",
            "Day 10",
            "Day 11",
            "B, C",
            10,
            11
          ],
          [
            "E · Review portfolio findings",
            "Day 12",
            "Day 12",
            "D",
            12,
            12
          ],
          [
            "R · Quality-readout release",
            "Day 13",
            "Day 13",
            "E",
            13,
            13
          ],
          [
            "F · Collect satisfaction survey",
            "Day 1",
            "Day 8",
            "None",
            1,
            8
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 5 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 5,
        "options": [
          {
            "id": "B",
            "text": "Audit client One",
            "feedback": "B: дни 4–6 → 6–8. Даты меняются."
          },
          {
            "id": "C",
            "text": "Audit client Two after shared QA",
            "feedback": "C: дни 7–9 → 9–11. Даты меняются."
          },
          {
            "id": "D",
            "text": "Close evidence gaps",
            "feedback": "D: дни 10–11 → 12–13. Даты меняются."
          },
          {
            "id": "E",
            "text": "Review portfolio findings",
            "feedback": "E: дни 12–12 → 14–14. Даты меняются."
          },
          {
            "id": "R",
            "text": "Quality-readout release",
            "feedback": "R: дни 13–13 → 15–15. Даты меняются."
          },
          {
            "id": "F",
            "text": "Collect satisfaction survey",
            "feedback": "F: дни 1–8 → 1–8. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "C",
          "D",
          "E",
          "R"
        ],
        "explain": "A: 1–3 → 3–5; B: 4–6 → 6–8; C: 7–9 → 9–11; D: 10–11 → 12–13; E: 12 → 14; R: 13 → 15. F не зависит от A. Resource-levelled plan — план с учётом ресурсов. Техническая независимость двух аудитов не создаёт второго QA-специалиста."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "15",
            "text": "Day 15 — client One audit ends day 8, client Two ends day 11 and evidence closure is days 12–13.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "13",
            "text": "Day 13 — run the two audits in parallel because they are technically independent.",
            "feedback": "Параллельные аудиты потребовали бы второго QA lead, которого не выделили."
          },
          {
            "id": "17",
            "text": "Day 17 — add the two-day slip once per client audit to the original day-13 milestone.",
            "feedback": "Одна задержка не начисляется заново на каждом клиентском аудите."
          }
        ],
        "key": [
          "15"
        ],
        "explain": "A: 1–3 → 3–5; B: 4–6 → 6–8; C: 7–9 → 9–11; D: 10–11 → 12–13; E: 12 → 14; R: 13 → 15. F не зависит от A. Resource-levelled plan — план с учётом ресурсов. Техническая независимость двух аудитов не создаёт второго QA-специалиста."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 2,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c6-l04-status-v1",
    "track": "pm",
    "chapter": 6,
    "level": 4,
    "caseId": "b54",
    "format": "status",
    "difficulty": 6,
    "title": "Report concentration exposure without claiming diversification",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — One client produces 38% of revenue. Ava needs a delivery view of concentration mitigation, not a claim that signed pipeline already replaces revenue. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "The concentration analysis was reconciled to recognized revenue; the 38% figure is verified."
          },
          {
            "id": "B",
            "text": "The largest account could reduce its next renewal; no cancellation has been received."
          },
          {
            "id": "C",
            "text": "The diversification pilot has stopped because required delivery capacity is not released from the current account."
          },
          {
            "id": "D",
            "text": "Ava, approve a ring-fenced pilot team or keep its capacity on the existing account; the choice is due before staffing locks."
          },
          {
            "id": "E",
            "text": "Two discovery statements of work are signed; their delivery has not started and revenue is not yet earned."
          },
          {
            "id": "F",
            "text": "The new prospects might require the same specialist as the large account next month."
          },
          {
            "id": "G",
            "text": "The renewal scenario workshop is complete and its downside actions have named owners."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress",
          "F": "risk",
          "G": "progress"
        },
        "explain": "A — Progress: анализ сверён с выручкой; сама зависимость от клиента остаётся. B — Risk: будущее сокращение контракта пока не подтверждено. C — Blocker: пилот уже остановлен отсутствием выделенного ресурса. D — Decision needed: Ava должна выбрать распределение ресурса. E — Progress: договоры подписаны, но будущая выручка ещё не заработана. F — Risk: будущий конфликт по специалисту ещё не наступил. G — Progress: сценарный workshop проведён и владельцы действий назначены. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c6-l06-scope-v1",
    "track": "pm",
    "chapter": 6,
    "level": 6,
    "caseId": "b56",
    "format": "scope",
    "difficulty": 6,
    "title": "Add responsive variants without hiding handoff work",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Design and development agreed a joint handoff checklist. The client now requests two more responsive variants. Capacity totals include existing delivery, checklist reviews and regression tests; Hannah and the client owner approve any scope swap. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Design days",
            "≤",
            "8"
          ],
          [
            "Developer days",
            "≤",
            "10"
          ],
          [
            "QA days",
            "≤",
            "5"
          ],
          [
            "Remaining cost $",
            "≤",
            "18000"
          ],
          [
            "Unapproved handoff waivers",
            "≤",
            "0"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Design days",
          "Developer days",
          "QA days",
          "Remaining cost $",
          "Unapproved handoff waivers"
        ],
        "rows": [
          [
            "A",
            "8",
            "10",
            "6",
            "17500",
            "0"
          ],
          [
            "B",
            "8",
            "10",
            "5",
            "17600",
            "0"
          ],
          [
            "C",
            "8",
            "10",
            "5",
            "17200",
            "1"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can keep all visual extras and add both variants under Plan A for $17,500 within design and development capacity. Please approve it; the sixth QA day can be absorbed because the components use the shared design system.",
            "feedback": "Оценка уже учитывает общий компонент; 6 дней QA > 5."
          },
          {
            "id": "B",
            "text": "We can replace the optional animation with both variants under Plan B for $17,600, retaining the handoff checklist and all tests. Please approve the swap; design, development and QA totals remain within their separate reservations.",
            "feedback": "Единственный вариант сохраняет все ограничения."
          },
          {
            "id": "C",
            "text": "We can add both variants under Plan C for $17,200 within all three role reservations. Please approve the addition; omitting one mandatory handoff review will keep the current date while the checklist formally remains in place.",
            "feedback": "Одно неразрешённое исключение нарушает предел 0."
          }
        ],
        "key": [
          "B"
        ],
        "explain": "A требует 6 > 5 дней QA; C предполагает неразрешённый отказ от обязательной проверки. B проходит: дизайн 8, разработка 10, QA 5, $17,600 ≤ $18,000, исключений нет. Handoff checklist — условия передачи результата. Общий компонент не означает нулевых проверок каждого состояния."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c6-l08-gantt-v1",
    "track": "pm",
    "chapter": 6,
    "level": 8,
    "caseId": "b58",
    "format": "gantt",
    "difficulty": 6,
    "title": "Forecast the PM handover without double-booking a successor",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Hannah’s handover A is delayed. Her successor must finish B before taking over the second client C; this dependency reserves one person’s capacity. R is the stable-service review, with authorized windows days 16, 23 and 30. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 2 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task. Release R is a one-day milestone allowed ONLY on the listed release days; choose the first allowed day after its predecessors finish. These windows are already authorized."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 30,
        "rows": [
          [
            "A · Hannah handover",
            "Day 1",
            "Day 4",
            "None",
            1,
            4
          ],
          [
            "B · Client One transition",
            "Day 5",
            "Day 7",
            "A",
            5,
            7
          ],
          [
            "C · Client Two transition",
            "Day 8",
            "Day 10",
            "B",
            8,
            10
          ],
          [
            "D · Validate account coverage",
            "Day 11",
            "Day 13",
            "C",
            11,
            13
          ],
          [
            "E · Independent continuity checklist",
            "Day 1",
            "Day 14",
            "None",
            1,
            14
          ],
          [
            "R · Stable-service review",
            "Day 16",
            "Day 16",
            "D, E",
            16,
            16
          ],
          [
            "F · Recruiting update",
            "Day 2",
            "Day 6",
            "None",
            2,
            6
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Authorized release days",
        "headers": [
          "Milestone",
          "Allowed project days"
        ],
        "rows": [
          [
            "R",
            "16, 23, 30"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 3 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 3,
        "options": [
          {
            "id": "B",
            "text": "Client One transition",
            "feedback": "B: дни 5–7 → 7–9. Даты меняются."
          },
          {
            "id": "C",
            "text": "Client Two transition",
            "feedback": "C: дни 8–10 → 10–12. Даты меняются."
          },
          {
            "id": "D",
            "text": "Validate account coverage",
            "feedback": "D: дни 11–13 → 13–15. Даты меняются."
          },
          {
            "id": "E",
            "text": "Independent continuity checklist",
            "feedback": "E: дни 1–14 → 1–14. Даты не меняются."
          },
          {
            "id": "R",
            "text": "Stable-service review",
            "feedback": "R: дни 16–16 → 16–16. Даты не меняются."
          },
          {
            "id": "F",
            "text": "Recruiting update",
            "feedback": "F: дни 2–6 → 2–6. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "C",
          "D"
        ],
        "explain": "A: 1–4 → 3–6; B: 5–7 → 7–9; C: 8–10 → 10–12; D: 11–13 → 13–15. E остаётся на днях 1–14. R сохраняет день 16: обе зависимости уже завершены. Milestone может удержаться при сдвиге промежуточных работ. Succession coverage — покрытие роли при передаче."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "16",
            "text": "Day 16 — account coverage moves to days 13–15, still ready for the authorized day-16 review.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "18",
            "text": "Day 18 — add the full two-day handover slip to the original day-16 review.",
            "feedback": "День 18 не разрешён; кроме того, исходный запас сохраняет окно 16."
          },
          {
            "id": "23",
            "text": "Day 23 — any change to account-transition dates must move the review to the next window.",
            "feedback": "Промежуточные даты меняются, но обе зависимости R готовы к дню 16."
          }
        ],
        "key": [
          "16"
        ],
        "explain": "A: 1–4 → 3–6; B: 5–7 → 7–9; C: 8–10 → 10–12; D: 11–13 → 13–15. E остаётся на днях 1–14. R сохраняет день 16: обе зависимости уже завершены. Milestone может удержаться при сдвиге промежуточных работ. Succession coverage — покрытие роли при передаче."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 2,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c6-l10-status-v1",
    "track": "pm",
    "chapter": 6,
    "level": 10,
    "caseId": "b60",
    "format": "status",
    "difficulty": 6,
    "title": "Report a sensitive staffing transition factually",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The contract decision is owned by Ava and HR. Report operational items without treating a planned conversation as a completed termination or exposing personal speculation. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "HR completed the contract and notice review; its approved checklist is stored with restricted access."
          },
          {
            "id": "B",
            "text": "The handover could overrun if the replacement’s start date changes; that date is not confirmed."
          },
          {
            "id": "C",
            "text": "Client escalation coverage has stopped because no authorized alternate currently holds the required account access."
          },
          {
            "id": "D",
            "text": "Ava and HR, choose the lawful notice route and authorized communication owner before any contract action."
          },
          {
            "id": "E",
            "text": "The replacement access request was submitted and acknowledged; access itself has not been granted."
          },
          {
            "id": "F",
            "text": "Loss of undocumented account knowledge could affect next month’s renewal support."
          },
          {
            "id": "G",
            "text": "The approved communication plan is signed; the meeting remains scheduled for tomorrow."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress",
          "F": "risk",
          "G": "progress"
        },
        "explain": "A — Progress: проверка договора завершена, а не само прекращение работы. B — Risk: будущий сдвиг старта может увеличить длительность передачи. C — Blocker: покрытие эскалаций уже отсутствует из-за текущего доступа. D — Decision needed: Ava и HR должны выбрать законный порядок и владельца сообщения. E — Progress: заявка подана, но сам доступ ещё не выдан. F — Risk: будущая потеря знаний может повлиять на поддержку. G — Progress: план уже подписан, завтрашняя встреча ещё не проведена. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c6-l12-scope-v1",
    "track": "pm",
    "chapter": 6,
    "level": 12,
    "caseId": "s12",
    "format": "scope",
    "difficulty": 6,
    "title": "Offer continuity instead of an uncosted PM replacement",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Greg requests a different PM. Three assessed transition options include existing client delivery, successor onboarding and shadowing; the minimum projected margin must be preserved. Ava and Greg approve the selected continuity baseline. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Senior PM days",
            "≤",
            "8"
          ],
          [
            "Successor PM days",
            "≤",
            "10"
          ],
          [
            "Transition cost $",
            "≤",
            "12000"
          ],
          [
            "Projected margin %",
            "≥",
            "20"
          ],
          [
            "Uncovered escalation days",
            "≤",
            "0"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Senior PM days",
          "Successor PM days",
          "Transition cost $",
          "Projected margin %",
          "Uncovered escalation days"
        ],
        "rows": [
          [
            "A",
            "9",
            "10",
            "11500",
            "21",
            "0"
          ],
          [
            "B",
            "8",
            "10",
            "11800",
            "18",
            "0"
          ],
          [
            "C",
            "8",
            "10",
            "11900",
            "20",
            "0"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can retain every workshop and add the full replacement shadow under Plan A for $11,500 at 21% projected margin. Please approve it; nine Senior PM days can fit because successor time remains within its ten-day reservation.",
            "feedback": "9 дней Senior PM > 8; время преемника не заменяет эту роль."
          },
          {
            "id": "B",
            "text": "We can use Plan B’s complete transition for $11,800 within both PM reservations and with continuous escalation cover. Please approve it against the current margin rule; its 18% projected margin is acceptable because spend stays below the cash cap.",
            "feedback": "Маржа 18% ниже отдельного минимального предела 20%."
          },
          {
            "id": "C",
            "text": "We can replace optional workshops with Plan C’s bounded shadowing and staged handover for $11,900 at 20% projected margin. Please approve the continuity baseline; both PM reservations and uninterrupted escalation cover remain protected.",
            "feedback": "Ресурсы, финансы и непрерывное покрытие проходят все условия."
          }
        ],
        "key": [
          "C"
        ],
        "explain": "A требует 9 > 8 дней Senior PM; B даёт маржу 18% < 20%, хотя денежный лимит соблюдён. C проходит: 8 и 10 дней двух ролей, $11,900 ≤ $12,000, маржа 20%, дней без покрытия нет. Continuity baseline — согласованный план непрерывности сервиса. Cash cap и margin floor — разные ограничения."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c7-l02-gantt-v1",
    "track": "pm",
    "chapter": 7,
    "level": 2,
    "caseId": "b62",
    "format": "gantt",
    "difficulty": 7,
    "title": "Trace the operating-plan launch through board gates",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The three-year strategy needs a validated operating scenario A. Board release R has authorized slots on days 18, 25 and 32; do not treat a draft strategy as an approved launch. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only A starts 3 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task. Release R is a one-day milestone allowed ONLY on the listed release days; choose the first allowed day after its predecessors finish. These windows are already authorized."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 32,
        "rows": [
          [
            "A · Validate operating scenario",
            "Day 1",
            "Day 4",
            "None",
            1,
            4
          ],
          [
            "B · Model delivery capacity",
            "Day 5",
            "Day 8",
            "A",
            5,
            8
          ],
          [
            "C · Assess cash and downside",
            "Day 5",
            "Day 7",
            "A",
            5,
            7
          ],
          [
            "D · Executive alignment",
            "Day 9",
            "Day 10",
            "B, C",
            9,
            10
          ],
          [
            "E · Legal and people review",
            "Day 11",
            "Day 13",
            "D",
            11,
            13
          ],
          [
            "F · Board pack validation",
            "Day 14",
            "Day 16",
            "E",
            14,
            16
          ],
          [
            "R · Operating-plan release",
            "Day 18",
            "Day 18",
            "F",
            18,
            18
          ],
          [
            "G · Market evidence update",
            "Day 1",
            "Day 9",
            "None",
            1,
            9
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Authorized release days",
        "headers": [
          "Milestone",
          "Allowed project days"
        ],
        "rows": [
          [
            "R",
            "18, 25, 32"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 6 последующие задачи, у которых изменятся даты. Саму задержанную A не выбирайте.",
        "count": 6,
        "options": [
          {
            "id": "B",
            "text": "Model delivery capacity",
            "feedback": "B: дни 5–8 → 8–11. Даты меняются."
          },
          {
            "id": "C",
            "text": "Assess cash and downside",
            "feedback": "C: дни 5–7 → 8–10. Даты меняются."
          },
          {
            "id": "D",
            "text": "Executive alignment",
            "feedback": "D: дни 9–10 → 12–13. Даты меняются."
          },
          {
            "id": "E",
            "text": "Legal and people review",
            "feedback": "E: дни 11–13 → 14–16. Даты меняются."
          },
          {
            "id": "F",
            "text": "Board pack validation",
            "feedback": "F: дни 14–16 → 17–19. Даты меняются."
          },
          {
            "id": "R",
            "text": "Operating-plan release",
            "feedback": "R: дни 18–18 → 25–25. Даты меняются."
          },
          {
            "id": "G",
            "text": "Market evidence update",
            "feedback": "G: дни 1–9 → 1–9. Даты не меняются."
          }
        ],
        "key": [
          "B",
          "C",
          "D",
          "E",
          "F",
          "R"
        ],
        "explain": "A: 1–4 → 4–7; B: 5–8 → 8–11; C: 5–7 → 8–10; D: 9–10 → 12–13; E: 11–13 → 14–16; F: 14–16 → 17–19. R переносится с 18 на ближайшее разрешённое окно 25; G не меняется. Downside — неблагоприятный сценарий; board gate — необходимое утверждение совета."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "25",
            "text": "Day 25 — the board pack finishes day 19, so the first authorized release slot is day 25.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "20",
            "text": "Day 20 — the board pack finishes day 19 and the next day is the earliest possible operating-plan release.",
            "feedback": "Готовность по зависимостям не даёт разрешения на неутверждённое окно 20."
          },
          {
            "id": "21",
            "text": "Day 21 — add the full three-day scenario delay to the original day-18 release.",
            "feedback": "Прибавление трёх дней к релизу не учитывает календарь совета."
          }
        ],
        "key": [
          "25"
        ],
        "explain": "A: 1–4 → 4–7; B: 5–8 → 8–11; C: 5–7 → 8–10; D: 9–10 → 12–13; E: 11–13 → 14–16; F: 14–16 → 17–19. R переносится с 18 на ближайшее разрешённое окно 25; G не меняется. Downside — неблагоприятный сценарий; board gate — необходимое утверждение совета."
      }
    ],
    "audit": {
      "delayedTask": "A",
      "delayDays": 3,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c7-l04-status-v1",
    "track": "pm",
    "chapter": 7,
    "level": 4,
    "caseId": "b64",
    "format": "status",
    "difficulty": 7,
    "title": "Keep the cost-response status evidence-based",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Revenue fell 20%. Ava is assessing lawful, costed alternatives; neither layoffs nor a company-wide pay change has been authorized. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "Finance reconciled cash on hand and the current burn; the dated scenario workbook is approved for review."
          },
          {
            "id": "B",
            "text": "Two overdue invoices could slip again, reducing runway below the downside scenario."
          },
          {
            "id": "C",
            "text": "The cost-option comparison is stopped because the mandatory local employment-law assessment is missing."
          },
          {
            "id": "D",
            "text": "Ava and the board, select the lawful cost-response package and its funding limit before any people action is communicated."
          },
          {
            "id": "E",
            "text": "The supplier accepted a payment deferral in writing; the revised dates are recorded."
          },
          {
            "id": "F",
            "text": "The agency may lose delivery capability if all cost cuts target the same specialist group."
          },
          {
            "id": "G",
            "text": "The approved nonessential-spend pause is active and its owner list is published."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "risk",
          "C": "blocker",
          "D": "decision",
          "E": "progress",
          "F": "risk",
          "G": "progress"
        },
        "explain": "A — Progress: денежная модель сверена и подготовлена, будущие деньги не гарантированы. B — Risk: будущее поступление денег может задержаться. C — Blocker: анализ уже остановлен без обязательной правовой проверки. D — Decision needed: совет и Ava ещё должны выбрать допустимый вариант. E — Progress: поставщик уже согласовал отсрочку платежа. F — Risk: будущие сокращения могут разрушить нужную способность delivery. G — Progress: ранее одобренная мера уже введена в действие. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c7-l06-scope-v1",
    "track": "pm",
    "chapter": 7,
    "level": 6,
    "caseId": "b66",
    "format": "scope",
    "difficulty": 7,
    "title": "Fund coverage without breaking the working-hours policy",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Leadership requests a new out-of-hours client service. Three assessed options include the existing support load. Staff schedules and consent have been reviewed for the compliant rota; Ava and the client approve any new service baseline. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Support hours",
            "≤",
            "40"
          ],
          [
            "Senior escalation hours",
            "≤",
            "8"
          ],
          [
            "Weekly service cost $",
            "≤",
            "5000"
          ],
          [
            "Unapproved rest-policy exceptions",
            "≤",
            "0"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Support hours",
          "Senior escalation hours",
          "Weekly service cost $",
          "Unapproved rest-policy exceptions"
        ],
        "rows": [
          [
            "A",
            "40",
            "8",
            "4800",
            "0"
          ],
          [
            "B",
            "40",
            "8",
            "4600",
            "1"
          ],
          [
            "C",
            "44",
            "8",
            "4900",
            "0"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can replace optional after-hours reporting with Plan A’s bounded rota for $4,800, protecting rest periods and named escalation cover. Please approve the service swap and response window; this is staffed coverage rather than an expectation of unpaid midnight replies.",
            "feedback": "Реальный график дежурств укладывается в ёмкость и правила отдыха."
          },
          {
            "id": "B",
            "text": "We can use Plan B’s broader coverage for $4,600 within both role reservations. Please approve the service addition; one informal exception to the rest policy will preserve the current response promise without requiring an explicit policy change.",
            "feedback": "Неформальное исключение тоже требует разрешения; предел здесь 0."
          },
          {
            "id": "C",
            "text": "We can retain all reporting and add the rota under Plan C for $4,900 while senior escalation stays at eight hours. Please approve the same service window; forty-four support hours can be treated as forty by spreading replies across the week.",
            "feedback": "44 часа > 40; распределение по неделе не уменьшает трудозатраты."
          }
        ],
        "key": [
          "A"
        ],
        "explain": "A проходит: 40 часов поддержки, 8 часов эскалации, $4,800 ≤ $5,000, исключений из правил отдыха нет. B предполагает неразрешённое исключение; C требует 44 > 40 часов поддержки. Rota — график дежурств; bounded response window — явно ограниченное окно ответа, а не постоянная доступность."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c7-l08-gantt-v1",
    "track": "pm",
    "chapter": 7,
    "level": 8,
    "caseId": "b68",
    "format": "gantt",
    "difficulty": 7,
    "title": "Trace an AI delivery policy through client consent",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The AI policy requires reviewed data controls A and client-contract evidence B. Shared legal capacity reserves F after D. R can occur only on days 18, 25 or 32; publication is not permission to expose unapproved client data. All dates are numbered project days, including weekends; durations are inclusive. Finish-to-start links mean the successor starts the NEXT day after ALL predecessors finish. Planned starts are the earliest reserved slots; no task can move earlier than shown. Only B starts 5 days later; its duration and all other durations stay unchanged. Recalculate downstream starts; do not add the full delay to every task. Release R is a one-day milestone allowed ONLY on the listed release days; choose the first allowed day after its predecessors finish. These windows are already authorized."
      },
      {
        "kind": "gantt",
        "title": "Approved baseline — project days",
        "headers": [
          "ID / Task",
          "Start",
          "Finish",
          "Depends on",
          "Project-day timeline"
        ],
        "dayLabel": "Day ",
        "endDay": 32,
        "rows": [
          [
            "A · Review AI data controls",
            "Day 1",
            "Day 4",
            "None",
            1,
            4
          ],
          [
            "B · Collect contract evidence",
            "Day 1",
            "Day 6",
            "None",
            1,
            6
          ],
          [
            "C · Assess approved tool workflow",
            "Day 5",
            "Day 8",
            "A",
            5,
            8
          ],
          [
            "D · Client consent review",
            "Day 9",
            "Day 11",
            "B, C",
            9,
            11
          ],
          [
            "E · Train delivery leads",
            "Day 12",
            "Day 14",
            "D",
            12,
            14
          ],
          [
            "F · Final legal sign-off after consent review",
            "Day 12",
            "Day 15",
            "D",
            12,
            15
          ],
          [
            "R · Policy release",
            "Day 18",
            "Day 18",
            "E, F",
            18,
            18
          ],
          [
            "G · Independent pricing research",
            "Day 1",
            "Day 10",
            "None",
            1,
            10
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Authorized release days",
        "headers": [
          "Milestone",
          "Allowed project days"
        ],
        "rows": [
          [
            "R",
            "18, 25, 32"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите ровно 4 последующие задачи, у которых изменятся даты. Саму задержанную B не выбирайте.",
        "count": 4,
        "options": [
          {
            "id": "A",
            "text": "Review AI data controls",
            "feedback": "A: дни 1–4 → 1–4. Даты не меняются."
          },
          {
            "id": "C",
            "text": "Assess approved tool workflow",
            "feedback": "C: дни 5–8 → 5–8. Даты не меняются."
          },
          {
            "id": "D",
            "text": "Client consent review",
            "feedback": "D: дни 9–11 → 12–14. Даты меняются."
          },
          {
            "id": "E",
            "text": "Train delivery leads",
            "feedback": "E: дни 12–14 → 15–17. Даты меняются."
          },
          {
            "id": "F",
            "text": "Final legal sign-off after consent review",
            "feedback": "F: дни 12–15 → 15–18. Даты меняются."
          },
          {
            "id": "R",
            "text": "Policy release",
            "feedback": "R: дни 18–18 → 25–25. Даты меняются."
          },
          {
            "id": "G",
            "text": "Independent pricing research",
            "feedback": "G: дни 1–10 → 1–10. Даты не меняются."
          }
        ],
        "key": [
          "D",
          "E",
          "F",
          "R"
        ],
        "explain": "B: 1–6 → 6–11; D: 9–11 → 12–14; E: 12–14 → 15–17; F: 12–15 → 15–18. R нельзя выпустить в день окончания F: нужен следующий день, а разрешённое окно после него — 25. A, C, G не сдвигаются. Consent — необходимое разрешение; публикация политики не разрешает любой клиентский сценарий."
      },
      {
        "kind": "select",
        "prompt": "Выберите ближайший допустимый день релиза и точное английское объяснение.",
        "count": 1,
        "options": [
          {
            "id": "25",
            "text": "Day 25 — consent review is days 12–14 and final legal sign-off ends day 18, missing the day-18 release slot.",
            "feedback": "Верно учтены все зависимости, исходный запас и разрешённые окна, если они заданы."
          },
          {
            "id": "18",
            "text": "Day 18 — final legal sign-off finishes on day 18, so the policy can publish in that same authorized slot.",
            "feedback": "Finish-to-start требует следующий день после окончания F, а не тот же день."
          },
          {
            "id": "19",
            "text": "Day 19 — publish immediately after sign-off because all required consent evidence is then ready.",
            "feedback": "День 19 подходит по зависимостям, но не является разрешённым окном."
          }
        ],
        "key": [
          "25"
        ],
        "explain": "B: 1–6 → 6–11; D: 9–11 → 12–14; E: 12–14 → 15–17; F: 12–15 → 15–18. R нельзя выпустить в день окончания F: нужен следующий день, а разрешённое окно после него — 25. A, C, G не сдвигаются. Consent — необходимое разрешение; публикация политики не разрешает любой клиентский сценарий."
      }
    ],
    "audit": {
      "delayedTask": "B",
      "delayDays": 5,
      "releaseTask": "R"
    }
  },
  {
    "id": "pm-c7-l10-status-v1",
    "track": "pm",
    "chapter": 7,
    "level": 10,
    "caseId": "b70",
    "format": "status",
    "difficulty": 7,
    "title": "Separate public incident facts from executive decisions",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — The complaint is public. Marketing’s proposal is not an incident finding; classify verified actions, current service stops and accountable pending choices. Classify each reportable item by its current state: Progress = verified completed work or an already recorded decision; Risk = an uncertain future event while work can continue; Blocker = required work is already stopped; Decision needed = an explicit pending choice by an authorized owner. Do not treat a forecast as a completed result or a completed approval as a pending decision. Categories can be used more than once."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждое сообщение с разделом статуса. Одна категория может подходить нескольким сообщениям; до проверки соответствия можно изменить.",
        "left": [
          {
            "id": "A",
            "text": "The incident team reproduced the checkout failure and linked the failing request IDs to the record."
          },
          {
            "id": "B",
            "text": "The live checkout remains unavailable; customers cannot complete orders while the required fix is absent."
          },
          {
            "id": "C",
            "text": "The public post could trigger more cancellations before the next evidence-based update."
          },
          {
            "id": "D",
            "text": "Ava, choose the reviewed remediation package and authorize the customer-credit ceiling before the next update."
          },
          {
            "id": "E",
            "text": "The customer received the factual holding statement; its delivery receipt is recorded."
          },
          {
            "id": "F",
            "text": "Client compensation processing is stopped because the approved payer account is unavailable."
          },
          {
            "id": "G",
            "text": "If more affected clients are found, they could miss the next remediation window; wider impact is still being sampled."
          }
        ],
        "right": [
          {
            "id": "progress",
            "text": "Progress"
          },
          {
            "id": "risk",
            "text": "Risk"
          },
          {
            "id": "blocker",
            "text": "Blocker"
          },
          {
            "id": "decision",
            "text": "Decision needed"
          }
        ],
        "key": {
          "A": "progress",
          "B": "blocker",
          "C": "risk",
          "D": "decision",
          "E": "progress",
          "F": "blocker",
          "G": "risk"
        },
        "explain": "A — Progress: сбой воспроизведён, но не объявлен исправленным. B — Blocker: checkout уже не позволяет оформить заказ. C — Risk: будущие отказы клиентов возможны, но не подтверждены. D — Decision needed: нужно утверждение варианта и предела компенсации. E — Progress: фактическое сообщение доставлено, восстановление ещё не обещано. F — Blocker: выплата компенсации уже остановлена из-за отсутствующего счёта. G — Risk: дополнительные затронутые клиенты могут не попасть в будущее окно исправления. Progress описывает выполненную работу, Risk — будущую неопределённость, Blocker — текущую остановку, Decision needed — ожидающий решения выбор."
      }
    ],
    "audit": {}
  },
  {
    "id": "pm-c7-l12-scope-v1",
    "track": "pm",
    "chapter": 7,
    "level": 12,
    "caseId": "s14",
    "format": "scope",
    "difficulty": 7,
    "title": "Make the first CEO commitment executable",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — Ava hands over a request to accelerate a strategic client pilot. The board protects a $100k closing-cash reserve, delivery staffing and mandatory controls. All alternatives include existing commitments and assessed implementation costs; the board and client must approve the selected baseline. The table contains assessed alternatives for the SAME remaining delivery window. Each figure is a TOTAL for that plan, including existing commitments, implementation, handover and required testing; do not add baseline work again. Limits apply independently: spare capacity in one role cannot replace another role. No unlisted overtime, extra staff, borrowing or waived controls is available. Choose the email proposing the only plan that meets EVERY stated limit; obtain the named approval before changing the baseline."
      },
      {
        "kind": "table",
        "title": "Binding limits",
        "headers": [
          "Measure",
          "Rule",
          "Limit"
        ],
        "rows": [
          [
            "Delivery team-weeks",
            "≤",
            "20"
          ],
          [
            "Pilot finish day",
            "≤",
            "30"
          ],
          [
            "Closing cash $k",
            "≥",
            "100"
          ],
          [
            "Unapproved control exceptions",
            "≤",
            "0"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Assessed alternatives",
        "headers": [
          "Plan",
          "Delivery team-weeks",
          "Pilot finish day",
          "Closing cash $k",
          "Unapproved control exceptions"
        ],
        "rows": [
          [
            "A",
            "20",
            "30",
            "90",
            "0"
          ],
          [
            "B",
            "20",
            "30",
            "105",
            "0"
          ],
          [
            "C",
            "20",
            "30",
            "110",
            "1"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите выполнимое письмо: проверьте ресурсы, сроки и все остальные ограничения.",
        "count": 1,
        "options": [
          {
            "id": "A",
            "text": "We can retain all strategic extras and accelerate the pilot under Plan A within twenty team-weeks and day 30. Please approve it; the $90k closing reserve can stand in for the board’s $100k floor because revenue may arrive next month.",
            "feedback": "Неподтверждённая будущая выручка не заменяет минимальный денежный резерв."
          },
          {
            "id": "B",
            "text": "We can defer the optional expansion and deliver Plan B’s assessed pilot within twenty team-weeks by day 30, preserving $105k closing cash and all controls. Please approve the staged baseline; we will report evidence before committing to the deferred expansion.",
            "feedback": "Все условия соблюдены; расширение не обещано без отдельной оценки."
          },
          {
            "id": "C",
            "text": "We can use Plan C to preserve $110k closing cash and finish by day 30 within twenty team-weeks. Please approve the strategic pilot; one temporary control exception can be treated as covered by the board’s general growth mandate.",
            "feedback": "Общий стратегический мандат не разрешает конкретное исключение из контроля."
          }
        ],
        "key": [
          "B"
        ],
        "explain": "A оставляет $90k < $100k обязательного резерва. C предполагает неразрешённое исключение из контроля. B проходит: 20 командо-недель, день 30, $105k ≥ $100k, исключений нет. Cash reserve — денежный резерв. Executive accountability — ответственность за исполнимые согласованные обязательства, а не безусловное обещание роста."
      }
    ],
    "audit": {}
  }
];
CAREER_PRACTICE_DATA = CAREER_PRACTICE_DATA.concat(PROJECT_CAREER_PRACTICE_DATA);
