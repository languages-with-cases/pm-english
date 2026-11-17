/* Authored task-three variants: only even levels of Product chapters 1 and 2. */
var CAREER_PRACTICE_DATA = [
  {
    "id": "product-c1-l02-ab-v1",
    "track": "product",
    "chapter": 1,
    "level": 2,
    "caseId": "b03",
    "format": "ab",
    "title": "Checkout experiment: promising is not conclusive",
    "ru": "Принять решение по A/B-тесту",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Primary rule: the 95% confidence interval for relative conversion lift must be entirely above zero. Error-rate increase must be at most 0.10 percentage points. The planned sample and observation window are complete; instrumentation and the pre-registered allocation were checked. Launch only if BOTH the primary-effect interval and the stated guardrail pass. A positive point estimate alone is insufficient."
      },
      {
        "kind": "table",
        "title": "Decision readout",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Conversion lift",
            "+10% relative"
          ],
          [
            "95% CI for conversion lift",
            "−2% to +22% relative"
          ],
          [
            "Error rate: control → treatment",
            "0.40% → 0.45%"
          ],
          [
            "Allowed error-rate increase",
            "≤ 0.10 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите решение, которое правильно применяет оба заранее заданных условия.",
        "count": 1,
        "options": [
          {
            "id": "hold",
            "text": "Hold the rollout: the conversion interval includes zero. The error increase is 0.05 percentage points and passes its guardrail; we still lack a confirmed positive primary result.",
            "feedback": "Primary не проходит; guardrail проходит. Это не подтверждённый win."
          },
          {
            "id": "launch",
            "text": "Launch gradually: the conversion point estimate is positive and the error guardrail passes. Keep monitoring because the confidence interval still allows a small negative effect on conversion.",
            "feedback": "Gradual rollout не отменяет обязательное условие: весь CI должен быть выше нуля."
          },
          {
            "id": "reverse",
            "text": "Reject the variant for safety: errors rose by 12.5% relative, exceeding the 0.10 threshold. Conversion looks promising, so the main reason to stop is the error guardrail.",
            "feedback": "Порог задан в процентных пунктах: 0.45−0.40=0.05 п.п., не12.5 п.п."
          }
        ],
        "key": [
          "hold"
        ],
        "explain": "CI −2…+22 включает0. Error increase = 0.45−0.40=0.05 п.п. ≤0.10. По заданному правилу rollout пока не разрешён: не проходит primary criterion."
      }
    ],
    "audit": {
      "lower": -2,
      "guardBefore": 0.4,
      "guardAfter": 0.45,
      "guardMax": 0.1,
      "decision": "hold"
    }
  },
  {
    "id": "product-c1-l04-funnel-v1",
    "track": "product",
    "chapter": 1,
    "level": 4,
    "caseId": "b05",
    "format": "funnel",
    "title": "Find the engagement bottleneck",
    "ru": "Прочитать воронку",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — comparable cohorts and the same event definitions. Calculate step-to-step conversion, using the previous stage as each denominator. This before/after comparison alone does not prove causality."
      },
      {
        "kind": "table",
        "title": "Verified funnel counts",
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
            "Signed in",
            "8,000",
            "7,500"
          ],
          [
            "Payment started",
            "4,000",
            "3,000"
          ],
          [
            "Payment completed",
            "2,000",
            "1,800"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Visitors → Signed in",
            "feedback": "80% → 75%: -5 п.п."
          },
          {
            "id": "step2",
            "text": "Signed in → Payment started",
            "feedback": "50% → 40%: -10 п.п."
          },
          {
            "id": "step3",
            "text": "Payment started → Payment completed",
            "feedback": "50% → 60%: +10 п.п."
          }
        ],
        "key": [
          "step2"
        ],
        "explain": "Conversions: 80→75% (−5 п.п.), 50→40% (−10 п.п.), 50→60% (+10 п.п.). Наибольшее падение — Signed in → Payment started; relative decline =20%."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное английское сообщение о результате.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Payment-start conversion fell from 50% to 40%, a decline of 10 percentage points. We should investigate that transition; this comparison does not identify the cause.",
            "feedback": "Верны знаменатель, размер изменения и граница причинного вывода."
          },
          {
            "id": "relative",
            "text": "Payment-start conversion fell from 50% to 40%, a relative decline of 10%. We should investigate the transition before choosing whether the release or campaign explains the change.",
            "feedback": "Относительное падение20%, а не10%; абсолютная разница10 п.п."
          },
          {
            "id": "cause",
            "text": "Payment-start conversion fell from 50% to 40%, a decline of 10 percentage points. This proves the latest product release caused the engagement decrease rather than the campaign pause.",
            "feedback": "Before/after без контроля не отделяет release от campaign."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Conversions: 80→75% (−5 п.п.), 50→40% (−10 п.п.), 50→60% (+10 п.п.). Наибольшее падение — Signed in → Payment started; relative decline =20%."
      }
    ],
    "audit": {
      "before": [
        10000,
        8000,
        4000,
        2000
      ],
      "after": [
        10000,
        7500,
        3000,
        1800
      ],
      "largestDeclineStage": 2
    }
  },
  {
    "id": "product-c1-l06-priority-v1",
    "track": "product",
    "chapter": 1,
    "level": 6,
    "caseId": "b07",
    "format": "priority",
    "title": "Prepare a supported launch",
    "ru": "Расставить функции по приоритету",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Support has limited capacity. Use the assessed impact and effort below to sequence readiness work. Start with no completed dependencies. Repeatedly select the AVAILABLE item with the highest impact / effort score. Finish a prerequisite before selecting its dependent item. This exercise uses that explicit rule; it is not a universal prioritization framework."
      },
      {
        "kind": "table",
        "title": "Assessed work items",
        "headers": [
          "ID / Work",
          "Impact points",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Confirm the support FAQ",
            "12",
            "2",
            "None"
          ],
          [
            "B · Configure escalation routing",
            "15",
            "3",
            "A"
          ],
          [
            "C · Add approved in-app guidance",
            "18",
            "2",
            "A"
          ],
          [
            "D · Publish office-hours coverage",
            "8",
            "2",
            "None"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите порядок по правилу impact / effort с учётом зависимостей. Выбранную карточку можно убрать и добавить заново.",
        "cards": [
          {
            "id": "A",
            "text": "A · Confirm the support FAQ"
          },
          {
            "id": "B",
            "text": "B · Configure escalation routing"
          },
          {
            "id": "C",
            "text": "C · Add approved in-app guidance"
          },
          {
            "id": "D",
            "text": "D · Publish office-hours coverage"
          }
        ],
        "keys": [
          [
            "A",
            "C",
            "B",
            "D"
          ]
        ],
        "explain": "A=6, B=5, C=9, D=4. Сначала доступны A и D: A открывает B/C. Затем C(9), B(5), D(4). Высокая оценка C не отменяет обязательную готовность A."
      }
    ],
    "audit": {
      "scores": {
        "A": 6.0,
        "B": 5.0,
        "C": 9.0,
        "D": 4.0
      },
      "expectedOrder": [
        "A",
        "C",
        "B",
        "D"
      ]
    }
  },
  {
    "id": "product-c1-l08-funnel-v1",
    "track": "product",
    "chapter": 1,
    "level": 8,
    "caseId": "b11",
    "format": "funnel",
    "title": "Campaign growth: counts and rates",
    "ru": "Прочитать воронку",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — comparable cohorts and the same event definitions. Calculate step-to-step conversion, using the previous stage as each denominator. This before/after comparison alone does not prove causality."
      },
      {
        "kind": "table",
        "title": "Verified funnel counts",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Campaign visitors",
            "10,000",
            "10,000"
          ],
          [
            "Signed up",
            "1,000",
            "2,000"
          ],
          [
            "Activated",
            "600",
            "800"
          ],
          [
            "Retained at week 4",
            "180",
            "360"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Campaign visitors → Signed up",
            "feedback": "10% → 20%: +10 п.п."
          },
          {
            "id": "step2",
            "text": "Signed up → Activated",
            "feedback": "60% → 40%: -20 п.п."
          },
          {
            "id": "step3",
            "text": "Activated → Retained at week 4",
            "feedback": "30% → 45%: +15 п.п."
          }
        ],
        "key": [
          "step2"
        ],
        "explain": "Переходы: 10→20% (+10), 60→40% (−20), 30→45% (+15 п.п.). Week-4 retention per sign-up =18% до и после, но count180→360. Наибольшее падение — activation среди sign-ups."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное английское сообщение о результате.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Activation among sign-ups fell from 60% to 40%, down 20 percentage points. Sign-ups doubled, while week-four retention per sign-up stayed at 18%; retained customer count doubled.",
            "feedback": "180/1000 и360/2000 дают18%; absolute retained count вырос."
          },
          {
            "id": "retention",
            "text": "Activation among sign-ups fell from 60% to 40%, down 20 percentage points. Because the week-four retention rate stayed at 18%, the number of retained customers did not increase.",
            "feedback": "Равная доля при удвоенной базе означает вдвое больше retained customers."
          },
          {
            "id": "denominator",
            "text": "Activation among sign-ups fell from 6% to 8%, so it improved by 2 percentage points. Week-four retention stayed at 18%, confirming the campaign also improved the activation transition.",
            "feedback": "6% и8% здесь доли visitors; переход Signed up → Activated использует sign-ups в знаменателе."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Переходы: 10→20% (+10), 60→40% (−20), 30→45% (+15 п.п.). Week-4 retention per sign-up =18% до и после, но count180→360. Наибольшее падение — activation среди sign-ups."
      }
    ],
    "audit": {
      "before": [
        10000,
        1000,
        600,
        180
      ],
      "after": [
        10000,
        2000,
        800,
        360
      ],
      "largestDeclineStage": 2
    }
  },
  {
    "id": "product-c1-l10-priority-v1",
    "track": "product",
    "chapter": 1,
    "level": 10,
    "caseId": "b16",
    "format": "priority",
    "title": "Compare requests with assessed value",
    "ru": "Расставить функции по приоритету",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Discovery has produced the following estimates. Dark-theme implementation requires the shared theme tokens; do not rank by support-request count alone. Start with no completed dependencies. Repeatedly select the AVAILABLE item with the highest impact / effort score. Finish a prerequisite before selecting its dependent item. This exercise uses that explicit rule; it is not a universal prioritization framework."
      },
      {
        "kind": "table",
        "title": "Assessed work items",
        "headers": [
          "ID / Work",
          "Impact points",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Improve contrast in statements",
            "10",
            "2",
            "None"
          ],
          [
            "B · Implement dark theme",
            "16",
            "4",
            "D"
          ],
          [
            "C · Add statement shortcuts",
            "18",
            "3",
            "None"
          ],
          [
            "D · Prepare shared theme tokens",
            "9",
            "3",
            "None"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите порядок по правилу impact / effort с учётом зависимостей. Выбранную карточку можно убрать и добавить заново.",
        "cards": [
          {
            "id": "A",
            "text": "A · Improve contrast in statements"
          },
          {
            "id": "B",
            "text": "B · Implement dark theme"
          },
          {
            "id": "C",
            "text": "C · Add statement shortcuts"
          },
          {
            "id": "D",
            "text": "D · Prepare shared theme tokens"
          }
        ],
        "keys": [
          [
            "C",
            "A",
            "D",
            "B"
          ]
        ],
        "explain": "C=6, A=5, D=3; B=4, но заблокирован D. Сначала C, затем A, затем D, затем разблокированный B. Нельзя выбирать B до prerequisite даже при более высоком score."
      }
    ],
    "audit": {
      "scores": {
        "A": 5.0,
        "B": 4.0,
        "C": 6.0,
        "D": 3.0
      },
      "expectedOrder": [
        "C",
        "A",
        "D",
        "B"
      ]
    }
  },
  {
    "id": "product-c1-l12-ab-v1",
    "track": "product",
    "chapter": 1,
    "level": 12,
    "caseId": "b52",
    "format": "ab",
    "title": "Validate growth before expanding it",
    "ru": "Принять решение по A/B-тесту",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — A sign-up experiment also measures verified activation. Primary: activation-lift CI must be entirely above zero. Duplicate-account-rate increase must be at most 0.30 percentage points. The planned sample and observation window are complete; instrumentation and the pre-registered allocation were checked. Launch only if BOTH the primary-effect interval and the stated guardrail pass. A positive point estimate alone is insufficient."
      },
      {
        "kind": "table",
        "title": "Decision readout",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Raw sign-up lift",
            "+30% relative"
          ],
          [
            "Verified activation lift",
            "+1.0% relative"
          ],
          [
            "95% CI for activation lift",
            "+0.2% to +1.8% relative"
          ],
          [
            "Duplicate rate: control → treatment",
            "1.00% → 1.60%"
          ],
          [
            "Allowed duplicate-rate increase",
            "≤ 0.30 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите решение, которое правильно применяет оба заранее заданных условия.",
        "count": 1,
        "options": [
          {
            "id": "hold",
            "text": "Hold rollout: verified activation passes the positive-interval rule, but duplicate rate rose by 0.60 percentage points, above the 0.30-point limit. Investigate the quality breach before another launch decision.",
            "feedback": "Positive primary не компенсирует guardrail breach."
          },
          {
            "id": "launch",
            "text": "Launch gradually: verified activation is conclusively positive and raw sign-ups rose by 30%. The extra duplicate accounts can be handled operationally while the broader campaign continues to generate new customers.",
            "feedback": "Raw growth и operational workaround не отменяют заданную границу качества."
          },
          {
            "id": "extend",
            "text": "Keep treatment running another week to tighten the activation interval before deciding. The duplicate issue should be assessed only after the primary effect is sufficiently precise to support a commercial conclusion.",
            "feedback": "Primary уже проходит; известный quality breach требует ответа, не произвольного продления завершённого теста."
          }
        ],
        "key": [
          "hold"
        ],
        "explain": "CI +0.2…+1.8 выше0. Duplicate increase =1.60−1.00=0.60 п.п. >0.30. Raw sign-ups не primary и не основание отменять guardrail."
      }
    ],
    "audit": {
      "lower": 0.2,
      "guardBefore": 1.0,
      "guardAfter": 1.6,
      "guardMax": 0.3,
      "decision": "hold"
    }
  },
  {
    "id": "product-c2-l02-priority-v1",
    "track": "product",
    "chapter": 2,
    "level": 2,
    "caseId": "b09",
    "format": "priority",
    "title": "Sequence vendor-value work",
    "ru": "Расставить функции по приоритету",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Before the renewal decision, product has assessed four independent work packages. The automated usage report requires a reviewed vendor data contract. Start with no completed dependencies. Repeatedly select the AVAILABLE item with the highest impact / effort score. Finish a prerequisite before selecting its dependent item. This exercise uses that explicit rule; it is not a universal prioritization framework."
      },
      {
        "kind": "table",
        "title": "Assessed work items",
        "headers": [
          "ID / Work",
          "Impact points",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Review the vendor data contract",
            "10",
            "2",
            "None"
          ],
          [
            "B · Automate the usage report",
            "18",
            "3",
            "A"
          ],
          [
            "C · Analyze payment terms",
            "8",
            "2",
            "None"
          ],
          [
            "D · Set renewal reminders",
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
        "prompt": "Соберите порядок по правилу impact / effort с учётом зависимостей. Выбранную карточку можно убрать и добавить заново.",
        "cards": [
          {
            "id": "A",
            "text": "A · Review the vendor data contract"
          },
          {
            "id": "B",
            "text": "B · Automate the usage report"
          },
          {
            "id": "C",
            "text": "C · Analyze payment terms"
          },
          {
            "id": "D",
            "text": "D · Set renewal reminders"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "C",
            "D"
          ]
        ],
        "explain": "Сначала A(5), C(4), D(3). После A становится доступен B(6): A → B → C → D. Discount сам по себе не правило приоритета; здесь применяем заданные score и dependency."
      }
    ],
    "audit": {
      "scores": {
        "A": 5.0,
        "B": 6.0,
        "C": 4.0,
        "D": 3.0
      },
      "expectedOrder": [
        "A",
        "B",
        "C",
        "D"
      ]
    }
  },
  {
    "id": "product-c2-l04-funnel-v1",
    "track": "product",
    "chapter": 2,
    "level": 4,
    "caseId": "b14",
    "format": "funnel",
    "title": "Turn an onboarding objective into evidence",
    "ru": "Прочитать воронку",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — comparable cohorts and the same event definitions. Calculate step-to-step conversion, using the previous stage as each denominator. This before/after comparison alone does not prove causality."
      },
      {
        "kind": "table",
        "title": "Verified funnel counts",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Landing visitors",
            "5,000",
            "5,000"
          ],
          [
            "Application started",
            "3,000",
            "3,250"
          ],
          [
            "Identity verified",
            "2,400",
            "1,950"
          ],
          [
            "First banking task completed",
            "1,200",
            "1,170"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Landing visitors → Application started",
            "feedback": "60% → 65%: +5 п.п."
          },
          {
            "id": "step2",
            "text": "Application started → Identity verified",
            "feedback": "80% → 60%: -20 п.п."
          },
          {
            "id": "step3",
            "text": "Identity verified → First banking task completed",
            "feedback": "50% → 60%: +10 п.п."
          }
        ],
        "key": [
          "step2"
        ],
        "explain": "60→65% (+5), 80→60% (−20), 50→60% (+10 п.п.). Identity step падает сильнее всего. Relative decline25%; final completion24%→23.4% visitors, не неизменность."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное английское сообщение о результате.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Identity-verification conversion fell from 80% to 60%, down 20 percentage points. First-task completion among verified customers improved; we should localize the identity-step issue before claiming overall onboarding success.",
            "feedback": "Верно разделяет разные переходы и не объявляет общий успех по одной метрике."
          },
          {
            "id": "relative",
            "text": "Identity-verification conversion fell from 80% to 60%, a relative decline of 20%. First-task completion among verified customers improved, so the remaining investigation should focus on the identity step.",
            "feedback": "Relative decline=(80−60)/80=25%;20 — это п.п."
          },
          {
            "id": "overall",
            "text": "Identity-verification conversion fell from 80% to 60%, down 20 percentage points. The later completion rate rose to 60%, so those equal and opposite changes cancel and overall onboarding stayed unchanged.",
            "feedback": "Проценты разных знаменателей нельзя складывать; final completed count1200→1170."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "60→65% (+5), 80→60% (−20), 50→60% (+10 п.п.). Identity step падает сильнее всего. Relative decline25%; final completion24%→23.4% visitors, не неизменность."
      }
    ],
    "audit": {
      "before": [
        5000,
        3000,
        2400,
        1200
      ],
      "after": [
        5000,
        3250,
        1950,
        1170
      ],
      "largestDeclineStage": 2
    }
  },
  {
    "id": "product-c2-l06-ab-v1",
    "track": "product",
    "chapter": 2,
    "level": 6,
    "caseId": "b23",
    "format": "ab",
    "title": "Do more support tickets mean a worse rate?",
    "ru": "Принять решение по A/B-тесту",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The pre-registered exposure allocation is 20:23; its checks passed. Primary conversion-lift CI must be entirely positive. Support tickets per exposed customer may increase by at most 0.20 percentage points. The planned sample and observation window are complete; instrumentation and the pre-registered allocation were checked. Launch only if BOTH the primary-effect interval and the stated guardrail pass. A positive point estimate alone is insufficient."
      },
      {
        "kind": "table",
        "title": "Decision readout",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Conversion lift",
            "+3% relative"
          ],
          [
            "95% CI for conversion lift",
            "+1% to +5% relative"
          ],
          [
            "Control: exposed customers / tickets",
            "10,000 / 200"
          ],
          [
            "Treatment: exposed customers / tickets",
            "11,500 / 230"
          ],
          [
            "Allowed ticket-rate increase",
            "≤ 0.20 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите решение, которое правильно применяет оба заранее заданных условия.",
        "count": 1,
        "options": [
          {
            "id": "launch",
            "text": "Launch within the approved scope: the conversion interval is positive, and ticket rates are 2% in both groups. The 15% rise in ticket count matches the larger exposure, so both criteria pass.",
            "feedback": "200/10000=230/11500=2%, delta0 п.п."
          },
          {
            "id": "hold",
            "text": "Hold rollout: conversion is positive, but support tickets increased from 200 to 230, a 15% rise. That exceeds the 0.20 threshold, so the quality guardrail fails despite the stronger primary metric.",
            "feedback": "Guardrail задан для rate в п.п., не relative raw count."
          },
          {
            "id": "extend",
            "text": "Extend the test before deciding: the positive conversion interval is encouraging, but unequal exposure makes the experiment unusable. Continue collecting data until both groups contain exactly the same number of customers.",
            "feedback": "Неравный размер соответствует заранее проверенному allocation20:23; равенство counts не обязательное условие."
          }
        ],
        "key": [
          "launch"
        ],
        "explain": "CI +1…+5 выше0. Ticket rate control200/10000=2%; treatment230/11500=2%. Delta0 п.п. ≤0.20. Абсолютных tickets на15% больше, но exposure тоже на15% больше."
      }
    ],
    "audit": {
      "lower": 1,
      "guardBefore": 2.0,
      "guardAfter": 2.0,
      "guardMax": 0.2,
      "decision": "launch"
    }
  },
  {
    "id": "product-c2-l08-priority-v1",
    "track": "product",
    "chapter": 2,
    "level": 8,
    "caseId": "b31",
    "format": "priority",
    "title": "Sequence export-path remediation",
    "ru": "Расставить функции по приоритету",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The release review uses an agreed, bounded remediation backlog. The assessed fix requires a reproduced failing export case before implementation. Start with no completed dependencies. Repeatedly select the AVAILABLE item with the highest impact / effort score. Finish a prerequisite before selecting its dependent item. This exercise uses that explicit rule; it is not a universal prioritization framework."
      },
      {
        "kind": "table",
        "title": "Assessed work items",
        "headers": [
          "ID / Work",
          "Impact points",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Reproduce the export failure",
            "12",
            "2",
            "None"
          ],
          [
            "B · Fix and regression-test the path",
            "20",
            "4",
            "A"
          ],
          [
            "C · Document the support workaround",
            "9",
            "3",
            "None"
          ],
          [
            "D · Validate export telemetry",
            "12",
            "3",
            "None"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите порядок по правилу impact / effort с учётом зависимостей. Выбранную карточку можно убрать и добавить заново.",
        "cards": [
          {
            "id": "A",
            "text": "A · Reproduce the export failure"
          },
          {
            "id": "B",
            "text": "B · Fix and regression-test the path"
          },
          {
            "id": "C",
            "text": "C · Document the support workaround"
          },
          {
            "id": "D",
            "text": "D · Validate export telemetry"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "D",
            "C"
          ]
        ],
        "explain": "A=6, B=5, D=4, C=3. Сначала A, затем доступен B, далее D и C. Это учебная последовательность по заданному rule, а не утверждение, что support guide всегда менее важен."
      }
    ],
    "audit": {
      "scores": {
        "A": 6.0,
        "B": 5.0,
        "C": 3.0,
        "D": 4.0
      },
      "expectedOrder": [
        "A",
        "B",
        "D",
        "C"
      ]
    }
  },
  {
    "id": "product-c2-l10-funnel-v1",
    "track": "product",
    "chapter": 2,
    "level": 10,
    "caseId": "s01",
    "format": "funnel",
    "title": "Locate the payment incident in the funnel",
    "ru": "Прочитать воронку",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — comparable cohorts and the same event definitions. Calculate step-to-step conversion, using the previous stage as each denominator. This before/after comparison alone does not prove causality."
      },
      {
        "kind": "table",
        "title": "Verified funnel counts",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Store visits",
            "10,000",
            "10,000"
          ],
          [
            "Checkout started",
            "5,000",
            "5,000"
          ],
          [
            "Payment submitted",
            "4,000",
            "4,000"
          ],
          [
            "Payment succeeded",
            "3,960",
            "3,800"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Store visits → Checkout started",
            "feedback": "50% → 50%: +0 п.п."
          },
          {
            "id": "step2",
            "text": "Checkout started → Payment submitted",
            "feedback": "80% → 80%: +0 п.п."
          },
          {
            "id": "step3",
            "text": "Payment submitted → Payment succeeded",
            "feedback": "99% → 95%: -4 п.п."
          }
        ],
        "key": [
          "step3"
        ],
        "explain": "50→50%, 80→80%, 99→95%: последний переход −4 п.п. Failure1→5% при submitted-payment denominator. Нужны incident evidence и reconciliation, а не causal вывод только по времени."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное английское сообщение о результате.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Payment success fell from 99% to 95%, down 4 percentage points. Earlier funnel transitions stayed unchanged; submitted-payment failure rose from 1% to 5%, but the table alone does not prove a release cause.",
            "feedback": "Success иfailure — дополнения при одном denominator; cause требует дополнительных данных."
          },
          {
            "id": "failure",
            "text": "Payment success fell from 99% to 95%, down 4 percentage points. This means the failure rate rose by 4% relative, while the earlier funnel stages remained stable during the incident.",
            "feedback": "Failure1%→5%: +4 п.п., +400% relative, не4%."
          },
          {
            "id": "recovery",
            "text": "Payment success fell from 99% to 95%, down 4 percentage points. The unchanged submission count proves no orders need reconciliation; only the displayed conversion metric requires correction after the release.",
            "feedback": "Стабильное число submissions не доказывает финансовую корректность или отсутствие unresolved payments."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "50→50%, 80→80%, 99→95%: последний переход −4 п.п. Failure1→5% при submitted-payment denominator. Нужны incident evidence и reconciliation, а не causal вывод только по времени."
      }
    ],
    "audit": {
      "before": [
        10000,
        5000,
        4000,
        3960
      ],
      "after": [
        10000,
        5000,
        4000,
        3800
      ],
      "largestDeclineStage": 3
    }
  },
  {
    "id": "product-c2-l12-ab-v1",
    "track": "product",
    "chapter": 2,
    "level": 12,
    "caseId": "s03",
    "format": "ab",
    "title": "Evaluate a mature pricing result",
    "ru": "Принять решение по A/B-тесту",
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Legal and customer-notice requirements for this limited new-customer test were met. Primary contribution-per-eligible-visitor CI must be entirely positive. Mature D30 churn increase must be at most 0.40 percentage points. The planned sample and observation window are complete; instrumentation and the pre-registered allocation were checked. Launch only if BOTH the primary-effect interval and the stated guardrail pass. A positive point estimate alone is insufficient."
      },
      {
        "kind": "table",
        "title": "Decision readout",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Conversion lift",
            "−2% relative"
          ],
          [
            "Revenue per paying customer lift",
            "+9% relative"
          ],
          [
            "Contribution per eligible visitor lift",
            "+6% relative"
          ],
          [
            "95% CI for contribution lift",
            "+2% to +10% relative"
          ],
          [
            "D30 churn: control → treatment",
            "4.00% → 4.30%"
          ],
          [
            "Allowed D30 churn increase",
            "≤ 0.40 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите решение, которое правильно применяет оба заранее заданных условия.",
        "count": 1,
        "options": [
          {
            "id": "launch",
            "text": "Launch within the approved cohort: the contribution interval is positive and D30 churn rose by 0.30 percentage points, within the 0.40-point limit. Keep the agreed monitoring; conversion decline alone is not the decision rule.",
            "feedback": "Оба заданных условия проходят; cohort иhorizon остаются ограничениями."
          },
          {
            "id": "reject",
            "text": "Reject the price change: conversion fell by 2%, so the experiment failed even though contribution improved. Keep the old price because acquisition conversion should dominate the pre-registered contribution objective in this decision.",
            "feedback": "Нельзя менять primary criterion после просмотра результата."
          },
          {
            "id": "hold",
            "text": "Hold rollout for churn: treatment churn is 4.30%, above the allowed 0.40% threshold. Contribution is positive, but the guardrail fails because the treatment level exceeds the stated tolerance.",
            "feedback": "Допуск относится к изменению:4.30−4.00=0.30 п.п., не к уровню4.30%."
          }
        ],
        "key": [
          "launch"
        ],
        "explain": "Primary CI +2…+10 выше0. D30 churn delta4.30−4.00=0.30 п.п. ≤0.40. По данному правилу разрешён approved cohort rollout; нельзя заменять primary на conversion или путать уровень с delta."
      }
    ],
    "audit": {
      "lower": 2,
      "guardBefore": 4.0,
      "guardAfter": 4.3,
      "guardMax": 0.4,
      "decision": "launch"
    }
  }
];
