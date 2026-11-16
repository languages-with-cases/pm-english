/* Stable content IDs: change suffix when grading semantics change. */
var PRACTICE_DATA = [
  {
    "track": "product",
    "id": "product-funnel-v1",
    "title": "Read a conversion funnel",
    "ru": "Прочитать воронку",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — mobile account opening. Compare step-to-step conversion for equal-sized cohorts. A percentage-point change is after minus before; counts are unique customers."
      },
      {
        "kind": "table",
        "title": "Account opening: before vs after",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Visitors",
            "10,000",
            "10,000"
          ],
          [
            "Application started",
            "6,000",
            "5,500"
          ],
          [
            "Identity check passed",
            "3,000",
            "2,200"
          ],
          [
            "Account opened",
            "1,800",
            "1,540"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите один переход с наибольшим падением конверсии в процентных пунктах.",
        "options": [
          {
            "id": "start",
            "text": "Visitors → Application started",
            "feedback": "60% → 55%: −5 п.п., падение меньше, чем на проверке личности."
          },
          {
            "id": "identity",
            "text": "Application started → Identity check passed",
            "feedback": "50% → 40%: −10 п.п., самое большое падение."
          },
          {
            "id": "open",
            "text": "Identity check passed → Account opened",
            "feedback": "60% → 70%: +10 п.п., это улучшение."
          }
        ],
        "key": [
          "identity"
        ],
        "count": 1,
        "explain": "Переходы: 60% → 55% (−5 п.п.), 50% → 40% (−10 п.п.), 60% → 70% (+10 п.п.). Сравниваем доли на каждом переходе, а не абсолютную потерю людей."
      },
      {
        "kind": "select",
        "prompt": "Выберите одно точное сообщение команде.",
        "options": [
          {
            "id": "precise",
            "text": "Identity-check conversion fell from 50% to 40%, a drop of 10 percentage points. The funnel alone does not establish the cause.",
            "feedback": "Верно различает процентные пункты, проценты и причинность."
          },
          {
            "id": "relative",
            "text": "Identity-check conversion fell from 50% to 40%, a relative drop of 10%. We should investigate the identity-check flow before expanding the update.",
            "feedback": "Относительное падение равно 20%, а не 10%: (50−40)/50."
          },
          {
            "id": "causal",
            "text": "Identity-check conversion fell from 50% to 40%, a drop of 10 percentage points. The update therefore caused the decline in identity-check completion.",
            "feedback": "Число верное, но сравнение до/после без контроля не доказывает причинность."
          }
        ],
        "key": [
          "precise"
        ],
        "count": 1,
        "explain": "Say “10 percentage points” for 50% → 40%. The relative decline is 20%. Before/after data identifies where to investigate, not why it happened."
      }
    ]
  },
  {
    "track": "product",
    "id": "product-priority-v1",
    "title": "Prioritize features",
    "ru": "Расставить функции по приоритету",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — onboarding backlog. Start with no completed dependencies. Repeatedly choose the available feature with the highest impact / effort score. A dependency must be completed first. Scores have no ties."
      },
      {
        "kind": "table",
        "title": "Candidate features",
        "headers": [
          "ID / Feature",
          "Impact points",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Event instrumentation",
            "8",
            "2",
            "None"
          ],
          [
            "B · Checkout recovery",
            "18",
            "3",
            "A"
          ],
          [
            "C · Search shortcuts",
            "10",
            "2",
            "None"
          ],
          [
            "D · Help copy",
            "6",
            "2",
            "None"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Нажимайте карточки по правилу. Для удаления нажмите выбранную карточку в последовательности.",
        "cards": [
          {
            "id": "A",
            "text": "A · Event instrumentation"
          },
          {
            "id": "B",
            "text": "B · Checkout recovery"
          },
          {
            "id": "C",
            "text": "C · Search shortcuts"
          },
          {
            "id": "D",
            "text": "D · Help copy"
          }
        ],
        "keys": [
          [
            "C",
            "A",
            "B",
            "D"
          ]
        ],
        "explain": "Scores: A = 4, B = 6, C = 5, D = 3. Сначала доступны A/C/D: выбираем C, затем A. После A доступна B, её 6 выше D=3. Порядок: C → A → B → D. Это заданное правило, а не универсальный метод приоритизации."
      }
    ]
  },
  {
    "track": "product",
    "id": "product-ab-v1",
    "title": "Make an A/B decision",
    "ru": "Принять решение по A/B-тесту",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — pre-registered checkout experiment. Launch only if the 95% confidence interval for conversion lift is entirely above 0 AND the crash-rate increase is at most 0.10 percentage points. The planned sample and 14-day window are complete."
      },
      {
        "kind": "table",
        "title": "Experiment readout",
        "headers": [
          "Metric",
          "Result"
        ],
        "rows": [
          [
            "Conversion lift",
            "+1.2% relative"
          ],
          [
            "95% CI for conversion lift",
            "−0.2% to +2.6% relative"
          ],
          [
            "Crash rate: control → treatment",
            "0.20% → 0.35%"
          ],
          [
            "Allowed crash-rate increase",
            "≤ 0.10 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите одно решение с полным обоснованием по обоим условиям запуска.",
        "options": [
          {
            "id": "hold",
            "text": "Do not launch: the conversion interval includes zero, and crashes increased by 0.15 percentage points, above the 0.10-point guardrail. Investigate before a new test.",
            "feedback": "Оба обязательных условия нарушены."
          },
          {
            "id": "launch",
            "text": "Launch with monitoring: conversion is up 1.2%, and a 0.15-point crash increase is small in absolute terms. Keep a holdback for the next two weeks.",
            "feedback": "Положительная точечная оценка не заменяет CI; размер guardrail нельзя менять после теста."
          },
          {
            "id": "extend",
            "text": "Extend the current test: the conversion interval includes zero, but the crash guardrail passes because treatment crashes remain below 0.35%. Reassess after another week.",
            "feedback": "Guardrail задан для изменения, не для уровня. 0.35−0.20=0.15 п.п. >0.10; плановое окно уже завершено."
          }
        ],
        "key": [
          "hold"
        ],
        "count": 1,
        "explain": "−0.2% ≤ 0, поэтому CI не целиком положительный. Crash increase = 0.35% − 0.20% = 0.15 п.п. > 0.10 п.п. Нельзя объявить запуск или автоматически продлевать тест вопреки заранее заданному решению."
      }
    ]
  },
  {
    "track": "dev",
    "id": "dev-review-v1",
    "title": "Review shipping logic",
    "ru": "Провести код-ревью",
    "artifacts": [
      {
        "kind": "text",
        "body": "Orbit — free shipping applies when the discounted total is at least $100. Amounts below $100 must include an $8 shipping fee. All amounts in this example are whole dollars."
      },
      {
        "kind": "code",
        "title": "shipping.js",
        "lines": [
          "function totalWithShipping(subtotal, discount) {",
          "  const total = subtotal - discount;",
          "  const shippingFee = 8;",
          "  if (total > 100) return total;",
          "  return total + shippingFee;",
          "}"
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите одну строку с логической ошибкой.",
        "options": [
          {
            "id": "2",
            "text": "Line 2",
            "feedback": "Проверка граничного значения находится в строке 4; строка 2 не задаёт порог бесплатной доставки."
          },
          {
            "id": "3",
            "text": "Line 3",
            "feedback": "Проверка граничного значения находится в строке 4; строка 3 не задаёт порог бесплатной доставки."
          },
          {
            "id": "4",
            "text": "Line 4",
            "feedback": "Строка 4 использует > вместо >= и исключает ровно $100."
          },
          {
            "id": "5",
            "text": "Line 5",
            "feedback": "Проверка граничного значения находится в строке 4; строка 5 не задаёт порог бесплатной доставки."
          }
        ],
        "key": [
          "4"
        ],
        "count": 1,
        "explain": "При total = 100 условие total > 100 ложно и добавляется $8. В строке 4 нужно total >= 100."
      },
      {
        "kind": "select",
        "prompt": "Выберите один комментарий, который исправляет именно нарушенное правило.",
        "options": [
          {
            "id": "boundary",
            "text": "Could we use total >= 100 here? Free shipping includes exactly $100; please add tests at $99, $100 and $101 after applying the discount.",
            "feedback": "Порог проверяется после скидки, включая границу."
          },
          {
            "id": "subtotal",
            "text": "Could we compare subtotal >= 100 here? That includes the exact threshold; please add tests at $99, $100 and $101 before applying the discount.",
            "feedback": "Правило относится к сумме после скидки, а не subtotal."
          },
          {
            "id": "fee",
            "text": "Could we subtract the shipping fee before comparing total > 100? That keeps the threshold strict; please add tests around $108 to cover the shipping boundary.",
            "feedback": "Вычитание fee меняет правило и не исправляет включение ровно $100."
          }
        ],
        "key": [
          "boundary"
        ],
        "count": 1,
        "explain": "“At least” включает границу. Правильный review comment называет условие, бизнес-причину и boundary tests. Пример: subtotal 110 − discount 10 = 100 → итог 100, не 108."
      }
    ]
  },
  {
    "track": "dev",
    "id": "dev-incident-v1",
    "title": "Reconstruct an incident",
    "ru": "Восстановить ход инцидента",
    "artifacts": [
      {
        "kind": "text",
        "body": "Orbit — all timestamps are UTC on the same day. Treat correlation as a hypothesis until investigation confirms the cause. The deployment log does not show whether any payments were lost."
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите хронологию по времени подтверждённых событий.",
        "cards": [
          {
            "id": "deploy",
            "text": "10:02 · Deploy log: cart v42 completed."
          },
          {
            "id": "alert",
            "text": "10:04 · Alert: checkout errors reached 7%."
          },
          {
            "id": "rollback",
            "text": "10:06 · Team: rollback to v41 started."
          },
          {
            "id": "recovery",
            "text": "10:09 · Monitor: checkout errors returned below 1%."
          }
        ],
        "keys": [
          [
            "deploy",
            "alert",
            "rollback",
            "recovery"
          ]
        ],
        "explain": "10:02 deploy → 10:04 alert → 10:06 rollback started → 10:09 recovery. Сообщение о начале отката ещё не означает восстановления."
      },
      {
        "kind": "select",
        "prompt": "Выберите один статус только на основе подтверждённых фактов.",
        "options": [
          {
            "id": "facts",
            "text": "Checkout errors rose after the 10:02 deployment and returned below 1% at 10:09 after rollback began. Root cause and payment impact are still under investigation.",
            "feedback": "Указаны времена, наблюдение и пределы знания."
          },
          {
            "id": "cause",
            "text": "Cart v42 caused the checkout failure; rollback fixed it at 10:09. We have ruled out payment loss because the error rate is now below 1%.",
            "feedback": "Хронология не доказывает root cause или отсутствие потерь."
          },
          {
            "id": "early",
            "text": "Checkout recovered at 10:06 when rollback started, with errors below 1%. We are still investigating the root cause and whether payments were affected.",
            "feedback": "Восстановление подтверждено только в 10:09, не в 10:06."
          }
        ],
        "key": [
          "facts"
        ],
        "count": 1,
        "explain": "Наблюдение “after” не равно доказанному “caused by”. Начало rollback — 10:06, подтверждённое восстановление — 10:09. О платёжных потерях данные отсутствуют."
      }
    ]
  },
  {
    "track": "dev",
    "id": "dev-bug-v1",
    "title": "Build a bug report",
    "ru": "Собрать баг-репорт",
    "artifacts": [
      {
        "kind": "text",
        "body": "Orbit — checkout address form. A valid five-digit postal code should clear its validation error without reloading the page."
      },
      {
        "kind": "screens",
        "title": "Observed screen sequence",
        "screens": [
          {
            "title": "1 · Address form",
            "value": "",
            "error": "",
            "action": "Click Continue with the field empty."
          },
          {
            "title": "2 · Validation",
            "value": "",
            "error": "Enter a five-digit postal code.",
            "action": "Type 12345 after the error appears."
          },
          {
            "title": "3 · After editing",
            "value": "12345",
            "error": "Enter a five-digit postal code.",
            "action": "Observe: the error remains visible."
          }
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждую фразу с полем bug report. Поле можно использовать несколько раз.",
        "left": [
          {
            "id": "step1",
            "text": "Leave Postal code empty and click Continue."
          },
          {
            "id": "step2",
            "text": "Enter 12345 in Postal code after the error appears."
          },
          {
            "id": "expected",
            "text": "The validation error clears when a valid five-digit code is entered."
          },
          {
            "id": "actual",
            "text": "The validation error remains visible after entering 12345."
          }
        ],
        "right": [
          {
            "id": "steps",
            "text": "Steps to reproduce"
          },
          {
            "id": "expected",
            "text": "Expected result"
          },
          {
            "id": "actual",
            "text": "Actual result"
          }
        ],
        "key": {
          "step1": "steps",
          "step2": "steps",
          "expected": "expected",
          "actual": "actual"
        },
        "explain": "Два действия относятся к Steps to reproduce. Expected описывает правило, Actual — наблюдение на экране 3. Один и тот же раздел Steps используется дважды."
      }
    ]
  },
  {
    "track": "pm",
    "id": "pm-gantt-v1",
    "title": "Find the release dependency",
    "ru": "Найти, что задерживает релиз",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — all durations use consecutive calendar days; no weekends are skipped. Finish-to-start dependencies: a successor starts the next day. Release is a one-day milestone after testing. API is delayed by exactly 4 days; all other durations stay unchanged."
      },
      {
        "kind": "gantt",
        "title": "Baseline · June 1–10",
        "headers": [
          "Task",
          "Start",
          "Finish",
          "Depends on",
          "Timeline: June 1–12"
        ],
        "rows": [
          [
            "Design",
            "Jun 1",
            "Jun 3",
            "None",
            1,
            3
          ],
          [
            "Frontend",
            "Jun 4",
            "Jun 7",
            "Design",
            4,
            7
          ],
          [
            "API",
            "Jun 1",
            "Jun 5",
            "None",
            1,
            5
          ],
          [
            "Integration test",
            "Jun 8",
            "Jun 9",
            "Frontend + API",
            8,
            9
          ],
          [
            "Release",
            "Jun 10",
            "Jun 10",
            "Integration test",
            10,
            10
          ],
          [
            "Help copy",
            "Jun 1",
            "Jun 4",
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
        "prompt": "Выберите ровно две последующие задачи, даты которых сдвинутся из-за задержки API (сам API не выбирайте).",
        "options": [
          {
            "id": "frontend",
            "text": "Frontend",
            "feedback": "Frontend зависит от Design и остаётся Jun 4–7."
          },
          {
            "id": "test",
            "text": "Integration test",
            "feedback": "Ждёт API до Jun 9, поэтому теперь Jun 10–11."
          },
          {
            "id": "release",
            "text": "Release",
            "feedback": "После тестирования Jun 10–11 релиз сдвинется на Jun 12."
          },
          {
            "id": "copy",
            "text": "Help copy",
            "feedback": "Не зависит от API, остаётся Jun 1–4."
          }
        ],
        "key": [
          "test",
          "release"
        ],
        "count": 2,
        "explain": "API завершится Jun 9 вместо Jun 5. Frontend закончится Jun 7. Test начнётся max(Jun 7, Jun 9)+1 = Jun 10, закончится Jun 11; Release = Jun 12."
      },
      {
        "kind": "select",
        "prompt": "Выберите одну ближайшую дату релиза.",
        "options": [
          {
            "id": "12",
            "text": "June 12 — testing runs June 10–11 after the delayed API.",
            "feedback": "Обе зависимости test готовы к Jun 9."
          },
          {
            "id": "14",
            "text": "June 14 — add the full four-day API delay to the original release.",
            "feedback": "Часть задержки поглощает исходный запас: API Jun 5 → test Jun 8."
          },
          {
            "id": "10",
            "text": "June 10 — frontend still finishes June 7, leaving testing unchanged.",
            "feedback": "Test ждёт и Frontend, и API, а не только Frontend."
          }
        ],
        "key": [
          "12"
        ],
        "count": 1,
        "explain": "Задержка API на 4 дня сдвигает релиз на 2 дня: исходный запас API до testing поглощает 2 дня. Самые ранние даты: test Jun 10–11, release Jun 12."
      }
    ]
  },
  {
    "track": "pm",
    "id": "pm-scope-v1",
    "title": "Respond to a scope change",
    "ru": "Ответить на изменение объёма работ",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — client requests a blog requiring 3 developer-days. Release is Friday. Exactly 4 developer-days remain and all 4 are committed. The approved animation requires 3 of those days and is independent of the core site. No overtime, extra staff or parallel capacity is available. Existing acceptance testing is already included; the blog estimate includes its tests."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите одно письмо с выполнимым вариантом и явным согласованием изменения.",
        "options": [
          {
            "id": "swap",
            "text": "We can keep Friday by replacing the three-day animation with the three-day blog. Please approve that scope swap before work starts; the remaining core work and testing stay unchanged.",
            "feedback": "4−3+3=4 developer-days: объём помещается, замена требует approval."
          },
          {
            "id": "parallel",
            "text": "We can keep Friday and both features by starting the three-day blog alongside the animation. Please approve the addition; we will split the same four developer-days between both workstreams.",
            "feedback": "Для обоих нужно 7 developer-days; параллельность без capacity не создаёт дополнительные дни."
          },
          {
            "id": "later",
            "text": "We can keep Friday and both features by moving one day of core work to Monday. Please approve the change; the three-day blog will use the capacity released from Friday.",
            "feedback": "Освобождается только 1 день, требуется 3; кроме того, core уже не готов к Friday."
          }
        ],
        "key": [
          "swap"
        ],
        "count": 1,
        "explain": "4 committed days − 3 animation days + 3 blog days = 4. Для обоих нужно 7 дней. “Scope swap” — согласованная замена, а не бесплатное добавление работы."
      }
    ]
  },
  {
    "track": "pm",
    "id": "pm-status-v1",
    "title": "Assemble a project status",
    "ru": "Собрать статус проекта",
    "artifacts": [
      {
        "kind": "text",
        "body": "Atlas Digital — classify by the current state. Progress = completed work. Risk = uncertain future event. Blocker = work already stopped. Decision needed = an explicit choice by an authorized owner."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте сообщения с разделами статуса.",
        "left": [
          {
            "id": "done",
            "text": "The design is approved; all five screens passed the agreed review."
          },
          {
            "id": "risk",
            "text": "The vendor may miss next Tuesday’s delivery; our backup is not confirmed."
          },
          {
            "id": "blocked",
            "text": "Integration cannot start: the required sandbox access is still missing."
          },
          {
            "id": "decision",
            "text": "Sponsor: choose the scope cut or approve an extra $6,000 by 16:00."
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
          "done": "progress",
          "risk": "risk",
          "blocked": "blocker",
          "decision": "decision"
        },
        "explain": "May miss — будущий Risk. Cannot start — текущий Blocker. Approved/passed — Progress. Явный выбор с полномочиями и сроком — Decision needed."
      }
    ]
  },
  {
    "track": "an",
    "id": "an-reconcile-v1",
    "title": "Explain different revenue totals",
    "ru": "Объяснить расхождение в цифрах",
    "artifacts": [
      {
        "kind": "text",
        "body": "Pulse — both dashboards use USD, the same UTC day (June 3) and the same order source. No refunds or currency conversions occurred. Their only differing filter is order status."
      },
      {
        "kind": "table",
        "title": "Dashboard A · created-order value",
        "headers": [
          "Filter / metric",
          "Value"
        ],
        "rows": [
          [
            "Day / timezone",
            "June 3 / UTC"
          ],
          [
            "Status filter",
            "All statuses"
          ],
          [
            "Order value",
            "$500"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Dashboard B · completed-order revenue",
        "headers": [
          "Filter / metric",
          "Value"
        ],
        "rows": [
          [
            "Day / timezone",
            "June 3 / UTC"
          ],
          [
            "Status filter",
            "Completed only"
          ],
          [
            "Revenue",
            "$420"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Source reconciliation",
        "headers": [
          "Status",
          "Value"
        ],
        "rows": [
          [
            "Completed",
            "$420"
          ],
          [
            "Cancelled",
            "$80"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите одну подтверждённую причину расхождения.",
        "options": [
          {
            "id": "status",
            "text": "A includes $80 of cancelled orders; B excludes them.",
            "feedback": "500−420=80, ровно cancelled orders."
          },
          {
            "id": "timezone",
            "text": "A and B cut the reporting day in different time zones.",
            "feedback": "Оба используют June 3 / UTC."
          },
          {
            "id": "refund",
            "text": "A shows gross revenue; B subtracts $80 of refunds.",
            "feedback": "Refunds отсутствуют; cancelled orders — другой статус, не возврат."
          }
        ],
        "key": [
          "status"
        ],
        "count": 1,
        "explain": "A = 420 completed + 80 cancelled = 500. B = 420 completed. Время и валюта совпадают; причина — status filter."
      },
      {
        "kind": "select",
        "prompt": "Выберите одно точное английское объяснение.",
        "options": [
          {
            "id": "clear",
            "text": "Both dashboards use June 3 in UTC. A includes $80 of cancelled orders, while B counts completed orders only; the $80 gap is a definition difference.",
            "feedback": "Указаны одинаковые границы и конкретный фильтр."
          },
          {
            "id": "wrong",
            "text": "Both dashboards use June 3 in UTC. B is missing $80 of valid revenue, so we should backfill those rows and make its total match A.",
            "feedback": "Cancelled orders не являются completed revenue; backfill исказит метрику."
          },
          {
            "id": "time",
            "text": "Both totals are valid but reflect different reporting windows. A includes late-night orders that B will count the following day; the $80 gap should reconcile tomorrow.",
            "feedback": "Временные границы одинаковы; нет основания ждать автоматического reconciliation."
          }
        ],
        "key": [
          "clear"
        ],
        "count": 1,
        "explain": "Используйте “definition difference”, не “missing revenue”. Подписи и фильтры нужно согласовать с решением, а не подгонять один total под другой."
      }
    ]
  },
  {
    "track": "an",
    "id": "an-sql-v1",
    "title": "Predict a JOIN result",
    "ru": "Предсказать результат SQL-запроса",
    "artifacts": [
      {
        "kind": "table",
        "title": "orders",
        "headers": [
          "order_id",
          "amount"
        ],
        "rows": [
          [
            "1",
            "20"
          ],
          [
            "2",
            "30"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "order_items",
        "headers": [
          "order_id",
          "sku"
        ],
        "rows": [
          [
            "1",
            "A"
          ],
          [
            "1",
            "B"
          ],
          [
            "2",
            "C"
          ]
        ]
      },
      {
        "kind": "code",
        "title": "SQL · prepared result, no database call",
        "lines": [
          "SELECT o.order_id, o.amount, i.sku",
          "FROM orders o",
          "JOIN order_items i ON i.order_id = o.order_id",
          "ORDER BY o.order_id, i.sku;"
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите одну результирующую таблицу. Порядок строк задан ORDER BY.",
        "options": [
          {
            "id": "three",
            "text": "order_id | amount | sku\n1 | 20 | A\n1 | 20 | B\n2 | 30 | C",
            "feedback": "Один заказ 1 соответствует двум строкам items."
          },
          {
            "id": "two",
            "text": "order_id | amount | sku\n1 | 20 | A\n2 | 30 | C",
            "feedback": "Обычный JOIN не выбирает только первый item каждого заказа."
          },
          {
            "id": "summed",
            "text": "order_id | amount | sku\n1 | 40 | A,B\n2 | 30 | C",
            "feedback": "В запросе нет GROUP BY или агрегирования; строки не сворачиваются."
          }
        ],
        "key": [
          "three"
        ],
        "count": 1,
        "explain": "JOIN вернёт три совпадения: (1,20,A), (1,20,B), (2,30,C). ORDER BY сначала order_id, затем sku."
      },
      {
        "kind": "select",
        "prompt": "Выберите одно объяснение риска для суммы amount после такого JOIN.",
        "options": [
          {
            "id": "grain",
            "text": "The result is at item grain, so order 1 appears twice. SUM(amount) over these rows is 70, not the original order total of 50.",
            "feedback": "20+20+30=70; исходные orders дают 20+30=50."
          },
          {
            "id": "distinct",
            "text": "The JOIN preserves order grain, so SUM(amount) remains 50. The repeated order ID only labels its items and does not repeat its monetary value.",
            "feedback": "SQL суммирует строки результата; повторённые значения тоже учитываются."
          },
          {
            "id": "dedupe",
            "text": "The result contains duplicate items, so SUM(DISTINCT amount) is the general fix. It always preserves each order even when two orders have the same amount.",
            "feedback": "Items различны. DISTINCT amount ошибочно объединит разные заказы с одинаковой суммой."
          }
        ],
        "key": [
          "grain"
        ],
        "count": 1,
        "explain": "“Grain” — что представляет строка. Здесь item, не order. Для order-level revenue агрегируйте на уровне заказа или используйте подходящий semi-join; DISTINCT amount не универсальная дедупликация."
      }
    ]
  },
  {
    "track": "an",
    "id": "an-charts-v1",
    "title": "Match a chart to a question",
    "ru": "Подобрать график под вопрос",
    "artifacts": [
      {
        "kind": "charts",
        "title": "Prepared charts · use the chart labels and values",
        "charts": [
          {
            "id": "trend",
            "title": "A · Line: weekly completed orders",
            "kind": "line",
            "labels": [
              "W1",
              "W2",
              "W3",
              "W4"
            ],
            "values": [
              20,
              35,
              30,
              50
            ],
            "unit": "orders"
          },
          {
            "id": "distribution",
            "title": "B · Histogram: time to first booking",
            "kind": "histogram",
            "labels": [
              "0–4",
              "5–9",
              "10–14",
              "15–19"
            ],
            "values": [
              8,
              18,
              10,
              4
            ],
            "unit": "users per minute bin"
          },
          {
            "id": "segments",
            "title": "C · Bar: conversion by acquisition channel",
            "kind": "bar",
            "labels": [
              "Organic",
              "Paid",
              "Referral"
            ],
            "values": [
              8,
              5,
              10
            ],
            "unit": "% conversion"
          }
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте каждый вопрос с одним из готовых графиков.",
        "left": [
          {
            "id": "time",
            "text": "How did completed orders change over the last four weeks?"
          },
          {
            "id": "spread",
            "text": "How are users distributed across time-to-first-booking intervals?"
          },
          {
            "id": "compare",
            "text": "Which acquisition channel has the highest conversion rate?"
          }
        ],
        "right": [
          {
            "id": "trend",
            "text": "A · Weekly orders"
          },
          {
            "id": "distribution",
            "text": "B · Booking-time histogram"
          },
          {
            "id": "segments",
            "text": "C · Channel conversion"
          }
        ],
        "key": {
          "time": "trend",
          "spread": "distribution",
          "compare": "segments"
        },
        "explain": "Line A показывает динамику. Histogram B группирует числовое время по интервалам. Bar C сравнивает категории: Referral 10% выше Organic 8% и Paid 5%."
      }
    ]
  },
  {
    "track": "ba",
    "id": "ba-question-v1",
    "title": "Clarify a boundary rule",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — draft requirement: “Transfers above $500 require an SMS code.” Product confirms the normal path, but the behavior at exactly $500 is not approved. Your immediate task is to close that boundary gap, not design a new security policy."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите один вопрос, который закрывает конкретный пробел.",
        "options": [
          {
            "id": "boundary",
            "text": "For a transfer of exactly $500, should we require an SMS code or allow the standard confirmation path?",
            "feedback": "Вопрос проверяет неутверждённую границу."
          },
          {
            "id": "channel",
            "text": "For transfers requiring confirmation, should we send the code by SMS only or also support an authenticator app?",
            "feedback": "Это другой полезный вопрос, но он не определяет поведение при $500."
          },
          {
            "id": "expiry",
            "text": "For an SMS-confirmed transfer, how long should the code remain valid before the customer must request another one?",
            "feedback": "Expiry важен, но граничное условие остаётся неизвестным."
          }
        ],
        "key": [
          "boundary"
        ],
        "count": 1,
        "explain": "“Above” обычно означает >, но здесь правило на границе ещё не подтверждено. BA не должен молча превращать трактовку текста в согласованное бизнес-решение.",
        "response": "Stakeholder: “Exactly $500 uses the standard confirmation path. Require SMS only when the amount is greater than $500. Please add tests for $499.99, $500.00 and $500.01.”"
      }
    ]
  },
  {
    "track": "ba",
    "id": "ba-process-v1",
    "title": "Build an application process",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — main scenario only: a customer requests a new card. The customer must submit before validation. Identity validation must pass before eligibility is checked. Only an eligible request may create an application. Failures create no application. Then the customer sees confirmation."
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите основной успешный сценарий по условиям процесса.",
        "cards": [
          {
            "id": "submit",
            "text": "Customer submits the card request."
          },
          {
            "id": "identity",
            "text": "System validates customer identity."
          },
          {
            "id": "eligibility",
            "text": "System checks card eligibility."
          },
          {
            "id": "create",
            "text": "System creates one application."
          },
          {
            "id": "confirm",
            "text": "System shows the application reference."
          }
        ],
        "keys": [
          [
            "submit",
            "identity",
            "eligibility",
            "create",
            "confirm"
          ]
        ],
        "explain": "Submit → identity → eligibility → create → confirmation. Порядок задан preconditions: нельзя создать заявку до обеих успешных проверок."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте исход проверки со следующим действием. Failure не создаёт заявку.",
        "left": [
          {
            "id": "invalid",
            "text": "Identity validation fails."
          },
          {
            "id": "ineligible",
            "text": "Identity passes; eligibility fails."
          },
          {
            "id": "eligible",
            "text": "Identity and eligibility both pass."
          }
        ],
        "right": [
          {
            "id": "identityerror",
            "text": "Show identity error; create no application."
          },
          {
            "id": "eligibilityerror",
            "text": "Show eligibility reason; create no application."
          },
          {
            "id": "create",
            "text": "Create one application, then show its reference."
          }
        ],
        "key": {
          "invalid": "identityerror",
          "ineligible": "eligibilityerror",
          "eligible": "create"
        },
        "explain": "Ошибка identity останавливает процесс до eligibility. Отказ eligibility тоже не создаёт application. Только две успешные проверки разрешают создание."
      }
    ]
  },
  {
    "track": "ba",
    "id": "ba-acceptance-v1",
    "title": "Check acceptance criteria",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — application form. A valid submission includes consent and a request ID. Repeated submissions with the SAME request ID must return the same application. A new request ID is a separate submission. Missing consent prevents creation. Consent is present in all scenarios except the one explicitly marked missing."
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте пограничные ситуации с критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "double",
            "text": "The customer double-clicks Submit; both requests use ID R1."
          },
          {
            "id": "retry",
            "text": "The network retries the valid request with the same ID R1."
          },
          {
            "id": "new",
            "text": "The customer sends valid details with a new request ID R2."
          },
          {
            "id": "consent",
            "text": "The customer clicks Submit without giving consent."
          }
        ],
        "right": [
          {
            "id": "idempotent",
            "text": "Given an existing R1 application, When R1 is submitted again, Then return the same reference and create no duplicate."
          },
          {
            "id": "new",
            "text": "Given a new valid request ID, When consented details are submitted, Then create one new application and return its reference."
          },
          {
            "id": "invalid",
            "text": "Given consent is missing, When Submit is clicked, Then show a consent error and create no application."
          }
        ],
        "key": {
          "double": "idempotent",
          "retry": "idempotent",
          "new": "new",
          "consent": "invalid"
        },
        "explain": "Повторный request ID означает тот же запрос: duplicate click и network retry используют один критерий. Новый ID — новая valid submission; missing consent всегда блокирует создание. Для double-click критерий применяется ко второму запросу после создания первым."
      }
    ]
  }
];
