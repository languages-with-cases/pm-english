/* Authored task-three variants: even levels of all seven Product career chapters. */
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
  },
  {
    "id": "product-c3-l02-priority-v1",
    "track": "product",
    "chapter": 3,
    "level": 2,
    "caseId": "b18",
    "format": "priority",
    "title": "Keep the three-week promise within scope",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 3,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Sales and engineering agreed to ship a smaller core by the fixed date. These are assessed packages for that core and its later follow-up. Sequence the backlog, not a promise to finish it all in three weeks. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. After that, repeatedly choose the AVAILABLE item with the highest impact / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Impact",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Agree core acceptance",
            "18",
            "3",
            "None"
          ],
          [
            "B · Build the core path",
            "40",
            "5",
            "A"
          ],
          [
            "C · Prepare the client demo",
            "14",
            "2",
            "B, E"
          ],
          [
            "D · Add deferred reporting",
            "12",
            "4",
            "B"
          ],
          [
            "E · Confirm test accounts",
            "10",
            "2",
            "A"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Agree core acceptance"
          },
          {
            "id": "B",
            "text": "B · Build the core path"
          },
          {
            "id": "C",
            "text": "C · Prepare the client demo"
          },
          {
            "id": "D",
            "text": "D · Add deferred reporting"
          },
          {
            "id": "E",
            "text": "E · Confirm test accounts"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "E",
            "C",
            "D"
          ]
        ],
        "explain": "A=6, B=8, C=7, D=3, E=5. Изначально доступна только A; после неё B, затем E. C требует одновременно B и E. Порядок A→B→E→C→D не означает, что весь backlog поместится в deadline. Acceptance — согласованные условия приёмки; deferred scope — отложенный объём."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "ratio",
      "mandatory": null,
      "expectedOrder": [
        "A",
        "B",
        "E",
        "C",
        "D"
      ]
    }
  },
  {
    "id": "product-c3-l04-ab-v1",
    "track": "product",
    "chapter": 3,
    "level": 4,
    "caseId": "b32",
    "format": "ab",
    "title": "Distinguish a positive effect from a worthwhile one",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 3,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — A follow-up to the one-week redesign observation now has the planned sample. The launch hurdle is a relative conversion lift above 2%, not merely above zero. All intervals below are in relative percent. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative conversion lift (%)"
          ],
          [
            "95% CI for primary effect",
            "0.8 to 5.2"
          ],
          [
            "Required lower bound",
            "> 2"
          ],
          [
            "Validity / maturity",
            "Pass: planned sample, allocation and observation window verified"
          ],
          [
            "Refund rate: control → treatment",
            "1.2% → 1.3%"
          ],
          [
            "Allowed Refund rate increase",
            "≤ 0.2 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "hold",
            "text": "Hold rollout: the interval clears zero but not the 2% commercial hurdle. Refunds increased by 0.1 percentage points, within the limit; the primary launch condition still fails.",
            "feedback": "Положительный CI не обязательно превышает business hurdle."
          },
          {
            "id": "launch",
            "text": "Launch within scope: the interval clears zero and the refund guardrail passes. The 2% hurdle can be assessed after rollout because the experiment already establishes a positive conversion effect.",
            "feedback": "Нельзя переносить обязательный порог после запуска."
          },
          {
            "id": "reject",
            "text": "Hold rollout for refunds: their 8.3% relative increase exceeds the 0.2-point limit. The primary interval supports a launch, but customer quality should take precedence over the commercial result.",
            "feedback": "8.3% relative нельзя сравнить с0.2 п.п.; primary тоже не проходит порог2%."
          }
        ],
        "key": [
          "hold"
        ],
        "explain": "Нижняя граница0.8% ≤2%: нужная минимальная ценность не подтверждена. Refund delta1.3−1.2=0.1 п.п. ≤0.2. Hurdle — минимально приемлемый эффект; statistically positive — не то же, что commercially sufficient."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "hold",
      "guardLabels": [
        "Refund rate"
      ]
    }
  },
  {
    "id": "product-c3-l06-funnel-v1",
    "track": "product",
    "chapter": 3,
    "level": 6,
    "caseId": "b40",
    "format": "funnel",
    "title": "Find where paid acquisition loses value",
    "ru": "Прочитать воронку",
    "difficulty": 3,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Target: paid-ad cohorts at the same 30-day maturity. The acquisition budget changed between periods; diagnose the conditional conversion before recommending a budget move. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Ad visits",
            "10,000",
            "12,000"
          ],
          [
            "Sign-ups",
            "2,000",
            "3,000"
          ],
          [
            "Activated accounts",
            "1,000",
            "1,200"
          ],
          [
            "First purchase",
            "500",
            "660"
          ],
          [
            "Repeat purchase",
            "200",
            "264"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Ad visits → Sign-ups",
            "feedback": "20% → 25%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step2",
            "text": "Sign-ups → Activated accounts",
            "feedback": "50% → 40%: -10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step3",
            "text": "Activated accounts → First purchase",
            "feedback": "50% → 55%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step4",
            "text": "First purchase → Repeat purchase",
            "feedback": "40% → 40%: +0 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step2"
        ],
        "explain": "Sign-up25% против20%; activation40% против50% (−10 п.п.); purchase55% против50%; repeat40% в обоих периодах. 1200 activated не доказывает улучшения rate. Paid cohort — когорта платного привлечения; scale — увеличивать объём."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Paid sign-ups increased, but activation per sign-up fell from 50% to 40%, down 10 percentage points. Later transitions held or improved; the acquisition change alone does not establish the cause.",
            "feedback": "Верны cohort, denominator, delta и ограничение вывода."
          },
          {
            "id": "count",
            "text": "Paid activation improved because activated accounts rose from 1,000 to 1,200, a 20% increase. Later transitions held or improved, so we should scale the campaign before revisiting the sign-up experience.",
            "feedback": "Больше activated counts при ещё большем росте denominator скрывает падение rate."
          },
          {
            "id": "relative",
            "text": "Paid sign-ups increased, but activation per sign-up fell from 50% to 40%, down 10% relative. Later transitions held or improved; the next step is to investigate why activation weakened.",
            "feedback": "Relative decline20%;10 — п.п."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Sign-up25% против20%; activation40% против50% (−10 п.п.); purchase55% против50%; repeat40% в обоих периодах. 1200 activated не доказывает улучшения rate. Paid cohort — когорта платного привлечения; scale — увеличивать объём."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 2
    }
  },
  {
    "id": "product-c3-l08-priority-v1",
    "track": "product",
    "chapter": 3,
    "level": 8,
    "caseId": "b43",
    "format": "priority",
    "title": "Prioritize evidence behind the promotion spike",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 3,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — WAU grew without revenue. Assess the promotion cohort before committing to monetization changes; work packages have different confidence levels. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. After that, repeatedly choose the AVAILABLE item with the highest impact × (confidence / 100) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Impact",
          "Confidence %",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Validate promotion tagging",
            "30",
            "80",
            "3",
            "None"
          ],
          [
            "B · Test the paid-value prompt",
            "60",
            "60",
            "3",
            "A"
          ],
          [
            "C · Interview active free users",
            "35",
            "80",
            "4",
            "None"
          ],
          [
            "D · Expand the promotion",
            "100",
            "20",
            "5",
            "A"
          ],
          [
            "E · Read mature conversion",
            "45",
            "80",
            "4",
            "A, C"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Validate promotion tagging"
          },
          {
            "id": "B",
            "text": "B · Test the paid-value prompt"
          },
          {
            "id": "C",
            "text": "C · Interview active free users"
          },
          {
            "id": "D",
            "text": "D · Expand the promotion"
          },
          {
            "id": "E",
            "text": "E · Read mature conversion"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "C",
            "E",
            "D"
          ]
        ],
        "explain": "Confidence-adjusted score: A=8, B=12, C=7, D=4, E=9. A→B→C разблокирует E; затем E→D. High upside у D не равно expected value. Confidence — уверенность в оценке; mature conversion — конверсия после полного окна наблюдения."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "confidence",
      "mandatory": null,
      "expectedOrder": [
        "A",
        "B",
        "C",
        "E",
        "D"
      ]
    }
  },
  {
    "id": "product-c3-l10-ab-v1",
    "track": "product",
    "chapter": 3,
    "level": 10,
    "caseId": "s04",
    "format": "ab",
    "title": "Test an enterprise SSO pilot safely",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 3,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The key account approved a limited SSO pilot after security review. Primary: relative successful-sign-in lift must clear zero. Security failures remain a separate guardrail; renewal pressure does not waive it. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative successful-sign-in lift (%)"
          ],
          [
            "95% CI for primary effect",
            "1 to 7"
          ],
          [
            "Required lower bound",
            "> 0"
          ],
          [
            "Validity / maturity",
            "Pass: planned sample and complete seven-day follow-up"
          ],
          [
            "Support contact rate: control → treatment",
            "2% → 2.1%"
          ],
          [
            "Allowed Support contact rate increase",
            "≤ 0.3 percentage points"
          ],
          [
            "Security failure rate: control → treatment",
            "0.1% → 0.18%"
          ],
          [
            "Allowed Security failure rate increase",
            "≤ 0.05 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "hold",
            "text": "Hold broader rollout: successful sign-in passes, and support remains within tolerance, but security failures rose by 0.08 percentage points against a 0.05-point limit. Investigate the breach with security before reconsidering.",
            "feedback": "Нужно пройти оба guardrail, а не выбрать удобный."
          },
          {
            "id": "launch",
            "text": "Launch to the approved account: successful sign-in is positive and support stays within tolerance. Security failures increased by less than one tenth of a point, so the account’s renewal risk justifies the expansion.",
            "feedback": "0.08 п.п. больше0.05; urgency не отменяет control."
          },
          {
            "id": "extend",
            "text": "Continue the completed test until the security interval becomes narrower: primary sign-in gains are confirmed, but the support increase is the only unresolved guardrail. Revisit security after the next renewal checkpoint.",
            "feedback": "Support проходит, security нет; произвольное продолжение не решение по правилу."
          }
        ],
        "key": [
          "hold"
        ],
        "explain": "Primary CI1…7 >0. Support+0.1≤0.3 п.п.; security+0.08>0.05. Hold относится к tested variant, не к отказу от SSO навсегда. Guardrail breach — нарушение ограничения; broader rollout — расширение запуска."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "hold",
      "guardLabels": [
        "Support contact rate",
        "Security failure rate"
      ]
    }
  },
  {
    "id": "product-c3-l12-funnel-v1",
    "track": "product",
    "chapter": 3,
    "level": 12,
    "caseId": "s06",
    "format": "funnel",
    "title": "Read evidence from the simplified design",
    "ru": "Прочитать воронку",
    "difficulty": 3,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — After a joint design-engineering review, two comparable seven-day product-telemetry cohorts used the simplified flow. Target: all eligible invited users; do not substitute the number of screens for user success. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Eligible invited users",
            "2,000",
            "2,500"
          ],
          [
            "Task started",
            "1,600",
            "2,000"
          ],
          [
            "Review reached",
            "1,200",
            "1,500"
          ],
          [
            "Task submitted",
            "960",
            "1,200"
          ],
          [
            "Confirmation understood",
            "768",
            "840"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Eligible invited users → Task started",
            "feedback": "80% → 80%: +0 п.п."
          },
          {
            "id": "step2",
            "text": "Task started → Review reached",
            "feedback": "75% → 75%: +0 п.п."
          },
          {
            "id": "step3",
            "text": "Review reached → Task submitted",
            "feedback": "80% → 80%: +0 п.п."
          },
          {
            "id": "step4",
            "text": "Task submitted → Confirmation understood",
            "feedback": "80% → 70%: -10 п.п."
          }
        ],
        "key": [
          "step4"
        ],
        "explain": "Start80→80%, review75→75%, submit80→80%, understanding80→70%. Наибольшее падение10 п.п. на последнем этапе; relative decline12.5%. Understanding — понимание подтверждения. Before/after не доказывает causal effect simplification."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Confirmation understanding fell from 80% to 70%, down 10 percentage points, the largest decline. Earlier transitions held steady; the simpler design needs investigation rather than approval based on fewer screens.",
            "feedback": "Последний шаг −10 п.п.; три предыдущих перехода стабильны."
          },
          {
            "id": "count",
            "text": "Confirmation understanding improved because the number of participants who understood it rose from 768 to 840. That growth validates the simplified flow, so we should approve it without comparing conditional conversion or cohort size.",
            "feedback": "Схожие counts при разных denominators не стабильная конверсия."
          },
          {
            "id": "cause",
            "text": "Confirmation understanding fell from 80% to 70%, down 10 percentage points. This proves engineering’s simplification caused the decline, so the original design should be restored without investigating participant differences.",
            "feedback": "Before/after не доказывает cause и не выбирает remedy."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Start80→80%, review75→75%, submit80→80%, understanding80→70%. Наибольшее падение10 п.п. на последнем этапе; relative decline12.5%. Understanding — понимание подтверждения. Before/after не доказывает causal effect simplification."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 4
    }
  },
  {
    "id": "product-c4-l02-priority-v1",
    "track": "product",
    "chapter": 4,
    "level": 2,
    "caseId": "b26",
    "format": "priority",
    "title": "Resolve launch readiness across teams",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 4,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — A contracted accessibility review is a mandatory first gate. The remaining work has assessed impact and confidence; a client date does not waive the gate. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. The approved control requires item A FIRST, regardless of score. After that, repeatedly choose the AVAILABLE item with the highest impact × (confidence / 100) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Impact",
          "Confidence %",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Complete accessibility review",
            "8",
            "100",
            "2",
            "None"
          ],
          [
            "B · Implement the agreed flow",
            "50",
            "80",
            "4",
            "A"
          ],
          [
            "C · Prepare release communication",
            "30",
            "70",
            "3",
            "None"
          ],
          [
            "D · Run assisted-user validation",
            "45",
            "80",
            "3",
            "B"
          ],
          [
            "E · Add optional motion polish",
            "40",
            "30",
            "2",
            "B"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Complete accessibility review"
          },
          {
            "id": "B",
            "text": "B · Implement the agreed flow"
          },
          {
            "id": "C",
            "text": "C · Prepare release communication"
          },
          {
            "id": "D",
            "text": "D · Run assisted-user validation"
          },
          {
            "id": "E",
            "text": "E · Add optional motion polish"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "D",
            "C",
            "E"
          ]
        ],
        "explain": "A обязателен первым. Затем scores B=10, D=12 после B, C=7, E=6. A→B→D→C→E. Release readiness — готовность к выпуску; optional polish не заменяет обязательный контроль."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "confidence",
      "mandatory": "A",
      "expectedOrder": [
        "A",
        "B",
        "D",
        "C",
        "E"
      ]
    }
  },
  {
    "id": "product-c4-l04-ab-v1",
    "track": "product",
    "chapter": 4,
    "level": 4,
    "caseId": "b29",
    "format": "ab",
    "title": "Judge a search rewrite on user outcomes",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 4,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The rewrite pilot now has a completed follow-up. Primary: relative successful-search lift must exceed 1%. Reliability and support constraints both apply; a faster query alone is not the launch outcome. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative successful-search lift (%)"
          ],
          [
            "95% CI for primary effect",
            "1.5 to 4.5"
          ],
          [
            "Required lower bound",
            "> 1"
          ],
          [
            "Validity / maturity",
            "Pass: sample, instrumentation and maturity verified"
          ],
          [
            "Search error rate: control → treatment",
            "0.4% → 0.55%"
          ],
          [
            "Allowed Search error rate increase",
            "≤ 0.2 percentage points"
          ],
          [
            "Search support rate: control → treatment",
            "1.2% → 1.55%"
          ],
          [
            "Allowed Search support rate increase",
            "≤ 0.3 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "hold",
            "text": "Hold expansion: successful search clears the hurdle and errors stay within tolerance, but support rose by 0.35 percentage points against a 0.30-point limit. Address the support regression before another rollout decision.",
            "feedback": "Primary и один guardrail не компенсируют второй."
          },
          {
            "id": "launch",
            "text": "Expand the rewrite: successful search clears the hurdle and errors remain within tolerance. The 0.35-point support rise is small enough to manage operationally because the rewrite already improves the main user outcome.",
            "feedback": "0.35>0.30, правило не допускает операционного исключения."
          },
          {
            "id": "reject",
            "text": "Reject the rewrite on the primary result: its 1.5% lower bound misses the 4.5% upper estimate. Reliability passes both limits, so the remaining concern is whether successful search meets the expected point estimate.",
            "feedback": "CI upper не launch threshold; support тоже не проходит."
          }
        ],
        "key": [
          "hold"
        ],
        "explain": "Primary lower1.5>1. Error+0.15≤0.2; support+0.35>0.3 п.п. Rewrite — переработка модуля; successful search — outcome, latency — отдельный diagnostic. Не подменяем критерий после результата."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "hold",
      "guardLabels": [
        "Search error rate",
        "Search support rate"
      ]
    }
  },
  {
    "id": "product-c4-l06-funnel-v1",
    "track": "product",
    "chapter": 4,
    "level": 6,
    "caseId": "b33",
    "format": "funnel",
    "title": "Separate integration eligibility from conversion",
    "ru": "Прочитать воронку",
    "difficulty": 4,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — A prospect’s integration remains uncommitted. Target: accounts eligible for the already scoped sandbox, followed for 14 days. Production and ineligible accounts are shown separately; do not combine them into a delivery promise. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Eligible accounts",
            "10,000",
            "10,000"
          ],
          [
            "Sandbox connected",
            "8,000",
            "8,500"
          ],
          [
            "First sync started",
            "6,000",
            "5,950"
          ],
          [
            "First sync succeeded",
            "4,800",
            "4,165"
          ],
          [
            "Second sync succeeded",
            "3,840",
            "3,332"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Separate population — not the target cohort",
        "headers": [
          "Population",
          "Accounts",
          "First sync succeeded"
        ],
        "rows": [
          [
            "Production legacy integration",
            "20000",
            "19000"
          ],
          [
            "Ineligible new-integration requests",
            "5000",
            "Not exposed"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Eligible accounts → Sandbox connected",
            "feedback": "80% → 85%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step2",
            "text": "Sandbox connected → First sync started",
            "feedback": "75% → 70%: -5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step3",
            "text": "First sync started → First sync succeeded",
            "feedback": "80% → 70%: -10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step4",
            "text": "First sync succeeded → Second sync succeeded",
            "feedback": "80% → 80%: +0 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step3"
        ],
        "explain": "Target rates80→85,75→70(−5),80→70(−10),80→80%. Sandbox — тестовая среда; eligible — соответствующий условиям. Данные чужого scope не подтверждают production deadline."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Among sandbox-eligible accounts, first-sync success fell from 80% to 70%, down 10 percentage points. Connection improved, but the sandbox evidence cannot establish readiness or a June production commitment for the unscoped integration.",
            "feedback": "Scope sandbox не production commitment."
          },
          {
            "id": "aggregate",
            "text": "Among sandbox-eligible accounts, first-sync success fell from 80% to 70%, down 10 percentage points. The 85% connection rate confirms enough integration readiness to promise June production delivery while errors are repaired.",
            "feedback": "Connection rate не подтверждает delivery feasibility."
          },
          {
            "id": "relative",
            "text": "Among sandbox-eligible accounts, first-sync success fell from 80% to 70%, down 10% relative. The sandbox result should be investigated before any production promise because the customer integration remains unscoped.",
            "feedback": "Падение12.5% relative;10 — п.п."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Target rates80→85,75→70(−5),80→70(−10),80→80%. Sandbox — тестовая среда; eligible — соответствующий условиям. Данные чужого scope не подтверждают production deadline."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 3
    }
  },
  {
    "id": "product-c4-l08-priority-v1",
    "track": "product",
    "chapter": 4,
    "level": 8,
    "caseId": "b37",
    "format": "priority",
    "title": "Sequence competing urgent requests",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 4,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Support, sales and design use a shared confidence-adjusted rule after severity triage. A compliance patch is mandatory first; urgency labels are not scores. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. The approved control requires item A FIRST, regardless of score. After that, repeatedly choose the AVAILABLE item with the highest impact × (confidence / 100) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Impact",
          "Confidence %",
          "Effort days",
          "Depends on"
        ],
        "rows": [
          [
            "A · Apply the compliance patch",
            "10",
            "100",
            "2",
            "None"
          ],
          [
            "B · Diagnose the rare crash",
            "30",
            "90",
            "3",
            "A"
          ],
          [
            "C · Build the requested report",
            "55",
            "60",
            "4",
            "A"
          ],
          [
            "D · Validate the crash fix",
            "50",
            "80",
            "4",
            "B"
          ],
          [
            "E · Refresh account visuals",
            "35",
            "40",
            "2",
            "None"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Apply the compliance patch"
          },
          {
            "id": "B",
            "text": "B · Diagnose the rare crash"
          },
          {
            "id": "C",
            "text": "C · Build the requested report"
          },
          {
            "id": "D",
            "text": "D · Validate the crash fix"
          },
          {
            "id": "E",
            "text": "E · Refresh account visuals"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "D",
            "C",
            "E"
          ]
        ],
        "explain": "A обязателен первым; B=9, C=8.25, D=10 после B, E=7. Поэтому A→B→D→C→E. Dependency и обязательный control важнее маркировки urgent. Severity triage — оценка серьёзности; confidence-adjusted — с поправкой на уверенность."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "confidence",
      "mandatory": "A",
      "expectedOrder": [
        "A",
        "B",
        "D",
        "C",
        "E"
      ]
    }
  },
  {
    "id": "product-c4-l10-ab-v1",
    "track": "product",
    "chapter": 4,
    "level": 10,
    "caseId": "b53",
    "format": "ab",
    "title": "Test differentiation without moving the goalposts",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 4,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — A differentiated workflow was tested in the pre-registered enterprise segment. The analysis already adjusts for the planned comparisons. Primary lift must exceed 3%; competitor announcements do not change the hurdle. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative completed-workflow lift (%)"
          ],
          [
            "95% CI for primary effect",
            "3.2 to 8.8"
          ],
          [
            "Required lower bound",
            "> 3"
          ],
          [
            "Validity / maturity",
            "Pass: pre-registered segment, adjusted interval and mature sample"
          ],
          [
            "Workflow error rate: control → treatment",
            "0.8% → 0.9%"
          ],
          [
            "Allowed Workflow error rate increase",
            "≤ 0.2 percentage points"
          ],
          [
            "Support contact rate: control → treatment",
            "3% → 3.2%"
          ],
          [
            "Allowed Support contact rate increase",
            "≤ 0.3 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "launch",
            "text": "Launch to the tested enterprise segment: the adjusted lower bound exceeds 3%, and both error and support increases pass their limits. Describe the workflow result; do not claim superiority over the competitor without a comparison.",
            "feedback": "Scope и competitor claim ограничены evidence."
          },
          {
            "id": "hold",
            "text": "Hold the enterprise rollout: the lower bound must exceed the 8.8% upper estimate to establish differentiation. Both quality measures pass, but the interval is too wide to support the competitor response.",
            "feedback": "Порог3%, не upper bound8.8%."
          },
          {
            "id": "claim",
            "text": "Launch across all segments and describe the product as better than the competitor: the positive enterprise result and passing quality metrics establish enough evidence for a company-wide superiority claim.",
            "feedback": "Нет измерений других segments и competitor comparison."
          }
        ],
        "key": [
          "launch"
        ],
        "explain": "Lower3.2>3; errors+0.1≤0.2, support+0.2≤0.3 п.п. Differentiation — отличие, не доказанное superiority. Adjusted interval — интервал с учётом предусмотренных сравнений; scope остаётся enterprise."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "launch",
      "guardLabels": [
        "Workflow error rate",
        "Support contact rate"
      ]
    }
  },
  {
    "id": "product-c4-l12-funnel-v1",
    "track": "product",
    "chapter": 4,
    "level": 12,
    "caseId": "s08",
    "format": "funnel",
    "title": "Compare market entry with a stable denominator",
    "ru": "Прочитать воронку",
    "difficulty": 4,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Market-entry review. Target: the new-market pilot only, with the same qualification criteria and 60-day maturity in each period. The core-market comparison has a different audience; market size is not a funnel denominator. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Qualified prospects",
            "8,000",
            "16,000"
          ],
          [
            "Trial started",
            "4,000",
            "8,800"
          ],
          [
            "Integration completed",
            "3,000",
            "6,160"
          ],
          [
            "Paid account",
            "1,800",
            "3,080"
          ],
          [
            "Renewed account",
            "1,260",
            "2,310"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Core market — separate cohort",
        "headers": [
          "Measure",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Qualified prospects",
            "20000",
            "21000"
          ],
          [
            "Paid accounts",
            "8000",
            "8610"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Qualified prospects → Trial started",
            "feedback": "50% → 55%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step2",
            "text": "Trial started → Integration completed",
            "feedback": "75% → 70%: -5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step3",
            "text": "Integration completed → Paid account",
            "feedback": "60% → 50%: -10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step4",
            "text": "Paid account → Renewed account",
            "feedback": "70% → 75%: +5 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step3"
        ],
        "explain": "Trials50→55%; integration75→70% (−5); paid60→50% (−10); renewal70→75%. Paid accounts выросли из-за масштаба cohort. Incremental economics — экономика дополнительного эффекта; addressable market — не denominator conversion."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "In the new-market pilot, paid conversion after integration fell from 60% to 50%, down 10 percentage points, despite more paid accounts. Core-market performance and total market size do not establish the pilot’s incremental economics.",
            "feedback": "Counts1800→3080 при rate60→50."
          },
          {
            "id": "count",
            "text": "In the new-market pilot, paid accounts rose from 1,800 to 3,080 and renewal counts also increased. Those gains show the larger market is the better investment, even though integrated-to-paid conversion weakened.",
            "feedback": "Raw counts не portfolio business case."
          },
          {
            "id": "relative",
            "text": "In the new-market pilot, paid conversion after integration fell from 60% to 50%, down 10% relative. The current-market comparison cannot establish pilot economics because the audiences differ.",
            "feedback": "Relative decline16.67%, не10%."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Trials50→55%; integration75→70% (−5); paid60→50% (−10); renewal70→75%. Paid accounts выросли из-за масштаба cohort. Incremental economics — экономика дополнительного эффекта; addressable market — не denominator conversion."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 3
    }
  },
  {
    "id": "product-c5-l02-priority-v1",
    "track": "product",
    "chapter": 5,
    "level": 2,
    "caseId": "b34",
    "format": "priority",
    "title": "Protect the retention portfolio from an unassessed request",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 5,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The competitor-inspired request has now been assessed alongside retention work. Use RICE consistently across all eligible work; the shared analytics package is a dependency, not free capacity. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. After that, repeatedly choose the AVAILABLE item with the highest reach × impact per account × (confidence / 100) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Reach accounts",
          "Impact per account",
          "Confidence %",
          "Effort weeks",
          "Depends on"
        ],
        "rows": [
          [
            "A · Repair retention instrumentation",
            "100",
            "2",
            "90",
            "3",
            "None"
          ],
          [
            "B · Test the return-use prompt",
            "200",
            "2",
            "80",
            "4",
            "A"
          ],
          [
            "C · Prototype the competitor idea",
            "150",
            "3",
            "30",
            "3",
            "A"
          ],
          [
            "D · Fix renewal friction",
            "120",
            "3",
            "90",
            "4",
            "A"
          ],
          [
            "E · Read combined cohort evidence",
            "100",
            "3",
            "80",
            "4",
            "B, D"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Repair retention instrumentation"
          },
          {
            "id": "B",
            "text": "B · Test the return-use prompt"
          },
          {
            "id": "C",
            "text": "C · Prototype the competitor idea"
          },
          {
            "id": "D",
            "text": "D · Fix renewal friction"
          },
          {
            "id": "E",
            "text": "E · Read combined cohort evidence"
          }
        ],
        "keys": [
          [
            "A",
            "D",
            "B",
            "E",
            "C"
          ]
        ],
        "explain": "RICE A=60, B=80, C=45, D=81, E=60. После A доступны D,B,C; D→B разблокирует E. Получается A→D→B→E→C. Reach — число затронутых accounts; RICE не разрешает расходовать одну и ту же shared capacity дважды."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "rice",
      "mandatory": null,
      "expectedOrder": [
        "A",
        "D",
        "B",
        "E",
        "C"
      ]
    }
  },
  {
    "id": "product-c5-l04-ab-v1",
    "track": "product",
    "chapter": 5,
    "level": 4,
    "caseId": "b46",
    "format": "ab",
    "title": "Evaluate a structured interview pilot",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 5,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The hiring team randomized interview panels to the structured rubric. Primary: relative evidence-quality lift above 4%. The pre-registered candidate-experience guardrails apply separately to both interview-language groups; pooled satisfaction cannot override either. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative evidence-quality lift (%)"
          ],
          [
            "95% CI for primary effect",
            "5 to 11"
          ],
          [
            "Required lower bound",
            "> 4"
          ],
          [
            "Validity / maturity",
            "Pass: calibrated scoring, planned sample and completed candidate follow-up"
          ],
          [
            "English-panel dissatisfaction: control → treatment",
            "6% → 6.5%"
          ],
          [
            "Allowed English-panel dissatisfaction increase",
            "≤ 1 percentage points"
          ],
          [
            "Bilingual-panel dissatisfaction: control → treatment",
            "5% → 6.4%"
          ],
          [
            "Allowed Bilingual-panel dissatisfaction increase",
            "≤ 1 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "hold",
            "text": "Hold expansion: evidence quality clears the hurdle and the English-panel limit passes, but bilingual-panel dissatisfaction rose by 1.4 percentage points against a 1-point limit. Review that experience before standardizing the rubric.",
            "feedback": "Segment guardrail обязателен даже при хорошем aggregate."
          },
          {
            "id": "launch",
            "text": "Standardize the rubric: evidence quality clears the hurdle, and the average dissatisfaction increase across both groups is below 1 point. The pooled experience therefore meets the launch condition despite the bilingual-panel change.",
            "feedback": "Условия segment-specific, усреднение не разрешено."
          },
          {
            "id": "reject",
            "text": "Reject the rubric for poor evidence quality: the 5% lower bound is below the 11% upper estimate. Candidate dissatisfaction also rose in both groups, so neither the primary measure nor the experience limits pass.",
            "feedback": "Primary5>4; рост сам по себе не breach, English+0.5 проходит."
          }
        ],
        "key": [
          "hold"
        ],
        "explain": "Lower5>4. English+0.5≤1; bilingual+1.4>1 п.п. Pooled result не заменяет segment guardrail. Structured rubric — единая шкала оценки; standardize — внедрить как стандарт."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "hold",
      "guardLabels": [
        "English-panel dissatisfaction",
        "Bilingual-panel dissatisfaction"
      ]
    }
  },
  {
    "id": "product-c5-l06-funnel-v1",
    "track": "product",
    "chapter": 5,
    "level": 6,
    "caseId": "b51",
    "format": "funnel",
    "title": "Avoid a launch decision driven by channel mix",
    "ru": "Прочитать воронку",
    "difficulty": 5,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The 15th is a communication date, not permission for an unsafe big-bang launch. Target: self-serve cohorts at 30-day maturity. An enterprise mix shift lifted the all-channel activation headline; support readiness still requires its own review. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Eligible self-serve visits",
            "10,000",
            "8,000"
          ],
          [
            "Trial started",
            "5,000",
            "4,400"
          ],
          [
            "Activation completed",
            "3,000",
            "2,200"
          ],
          [
            "Paid account",
            "1,500",
            "1,320"
          ],
          [
            "Support-free first month",
            "1,350",
            "1,122"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Channel-mix evidence",
        "headers": [
          "Cohort",
          "Trial before",
          "Activated before",
          "Trial after",
          "Activated after"
        ],
        "rows": [
          [
            "Self-serve",
            "5000",
            "3000",
            "4400",
            "2200"
          ],
          [
            "Enterprise",
            "20000",
            "15000",
            "30000",
            "24000"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Eligible self-serve visits → Trial started",
            "feedback": "50% → 55%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step2",
            "text": "Trial started → Activation completed",
            "feedback": "60% → 50%: -10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step3",
            "text": "Activation completed → Paid account",
            "feedback": "50% → 60%: +10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step4",
            "text": "Paid account → Support-free first month",
            "feedback": "90% → 85%: −5 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step2"
        ],
        "explain": "Self-serve trials50→55%; activation60→50% (−10); paid50→60%; support-free90→85% (−5). All-channel activation18000/25000=72%→26200/34400≈76.16% за счёт mix. Mix shift — изменение состава; readiness включает staffing."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Self-serve activation fell from 60% to 50%, down 10 percentage points, although the all-channel activation rate rose. A shift toward enterprise traffic can explain the aggregate direction; it does not show self-serve readiness or sufficient support staffing.",
            "feedback": "Mix shift иwithin-segment change различны."
          },
          {
            "id": "aggregate",
            "text": "The all-channel activation rate rose, so the launch funnel improved despite self-serve activation falling from 60% to 50%. Proceed with the big-bang launch and treat support hiring as a separate operational matter.",
            "feedback": "Aggregate не отменяет segment regression иreadiness."
          },
          {
            "id": "relative",
            "text": "Self-serve activation fell from 60% to 50%, down 10% relative, while the all-channel rate rose with enterprise mix. Keep the launch limited until self-serve quality and support readiness are reviewed.",
            "feedback": "Относительное падение16.67%, не10%."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Self-serve trials50→55%; activation60→50% (−10); paid50→60%; support-free90→85% (−5). All-channel activation18000/25000=72%→26200/34400≈76.16% за счёт mix. Mix shift — изменение состава; readiness включает staffing."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 2
    }
  },
  {
    "id": "product-c5-l08-priority-v1",
    "track": "product",
    "chapter": 5,
    "level": 8,
    "caseId": "b58",
    "format": "priority",
    "title": "Sequence a renewal offer without hiding margin",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 5,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The account team assessed renewal options after checking usage and budget. Scores represent expected customer value; a discount package requires finance review before release. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. After that, repeatedly choose the AVAILABLE item with the highest reach × impact per account × (confidence / 100) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Reach accounts",
          "Impact per account",
          "Confidence %",
          "Effort weeks",
          "Depends on"
        ],
        "rows": [
          [
            "A · Review renewal unit economics",
            "80",
            "3",
            "90",
            "3",
            "None"
          ],
          [
            "B · Offer a scoped annual package",
            "120",
            "3",
            "80",
            "3",
            "A"
          ],
          [
            "C · Pilot a blanket discount",
            "200",
            "2",
            "30",
            "4",
            "A"
          ],
          [
            "D · Validate a usage-based tier",
            "100",
            "3",
            "90",
            "3",
            "A"
          ],
          [
            "E · Train the account team",
            "100",
            "2",
            "80",
            "2",
            "B, D"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Review renewal unit economics"
          },
          {
            "id": "B",
            "text": "B · Offer a scoped annual package"
          },
          {
            "id": "C",
            "text": "C · Pilot a blanket discount"
          },
          {
            "id": "D",
            "text": "D · Validate a usage-based tier"
          },
          {
            "id": "E",
            "text": "E · Train the account team"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "D",
            "E",
            "C"
          ]
        ],
        "explain": "RICE A=72, B=96, C=30, D=90, E=80. A→B→D открывает E, затем C. Unit economics — экономика единицы; scoped package — ограниченный пакет, не скрытый будущий price increase."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "rice",
      "mandatory": null,
      "expectedOrder": [
        "A",
        "B",
        "D",
        "E",
        "C"
      ]
    }
  },
  {
    "id": "product-c5-l10-ab-v1",
    "track": "product",
    "chapter": 5,
    "level": 10,
    "caseId": "b67",
    "format": "ab",
    "title": "Read a bundled test without inventing feature effects",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 5,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — A factorial design was considered but not used. The randomized experiment estimates the combined homepage-price-onboarding package only. Primary: relative contribution per eligible visitor above 2%; refunds and support are constrained. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative contribution per eligible visitor (%)"
          ],
          [
            "95% CI for primary effect",
            "2.5 to 7.5"
          ],
          [
            "Required lower bound",
            "> 2"
          ],
          [
            "Validity / maturity",
            "Pass: pre-registered bundled estimand, sample and mature follow-up"
          ],
          [
            "Refund rate: control → treatment",
            "2% → 2.15%"
          ],
          [
            "Allowed Refund rate increase",
            "≤ 0.2 percentage points"
          ],
          [
            "Support contact rate: control → treatment",
            "4% → 4.2%"
          ],
          [
            "Allowed Support contact rate increase",
            "≤ 0.3 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "launch",
            "text": "Launch the tested bundle within scope: contribution clears the hurdle and both guardrails pass. Report a package effect; this design cannot identify separate homepage, price or onboarding effects or rank their contributions.",
            "feedback": "Estimand — эффект всего package."
          },
          {
            "id": "attribute",
            "text": "Launch the tested bundle and credit pricing with the contribution gain: the package interval is positive and refunds remain controlled. The design supports separate feature conclusions because all three changes ran during the same experiment.",
            "feedback": "Совместный запуск не идентифицирует component effects."
          },
          {
            "id": "hold",
            "text": "Hold the tested bundle: the combined interval cannot establish which component helped, so it provides no valid estimate of the package effect. Split the test before making any decision, even though both guardrails pass.",
            "feedback": "Package estimand валиден; attribution иlaunch rule разные вопросы."
          }
        ],
        "key": [
          "launch"
        ],
        "explain": "Lower2.5>2; refunds+0.15≤0.2, support+0.2≤0.3 п.п. Bundle effect измерен, individual attribution нет. Estimand — что именно оценивает эксперимент; factorial design позволяет отдельно оценивать factors при корректном дизайне."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "launch",
      "guardLabels": [
        "Refund rate",
        "Support contact rate"
      ]
    }
  },
  {
    "id": "product-c5-l12-funnel-v1",
    "track": "product",
    "chapter": 5,
    "level": 12,
    "caseId": "s10",
    "format": "funnel",
    "title": "Align roadmaps using the constrained platform cohort",
    "ru": "Прочитать воронку",
    "difficulty": 5,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Three PMs depend on the same integration team. Target: platform-dependent accounts at equal 60-day maturity, not all accounts in their separate roadmaps. The comparison table is context only. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Eligible accounts",
            "20,000",
            "24,000"
          ],
          [
            "Migration started",
            "10,000",
            "13,200"
          ],
          [
            "Shared integration ready",
            "8,000",
            "9,900"
          ],
          [
            "First value reached",
            "6,000",
            "6,435"
          ],
          [
            "Renewed account",
            "4,800",
            "5,148"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Separate-team cohort — different accounts",
        "headers": [
          "Measure",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Eligible accounts",
            "10000",
            "10000"
          ],
          [
            "First value reached",
            "3000",
            "3600"
          ],
          [
            "Renewed accounts",
            "2400",
            "2880"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Eligible accounts → Migration started",
            "feedback": "50% → 55%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step2",
            "text": "Migration started → Shared integration ready",
            "feedback": "80% → 75%: -5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step3",
            "text": "Shared integration ready → First value reached",
            "feedback": "75% → 65%: -10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step4",
            "text": "First value reached → Renewed account",
            "feedback": "80% → 80%: +0 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step3"
        ],
        "explain": "Start50→55%; integration80→75%(−5); first value75→65%(−10); renewed80→80%. 5148>4800 не отменяет bottleneck. Shared constraint — общее ограничение; accountable owner назначается решением, не простой корреляцией."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "In platform-dependent accounts, first value after integration fell from 75% to 65%, down 10 percentage points, while renewals among value-reaching accounts stayed at 80%. This localizes a shared constraint without proving which roadmap caused it.",
            "feedback": "Scope иconditional rates верны; ownership невыведен изsnapshot."
          },
          {
            "id": "aggregate",
            "text": "Platform-dependent renewals increased from 4,800 to 5,148, so the shared platform can support all three roadmaps. The 65% first-value rate is a secondary concern because the larger renewal count establishes sufficient capacity.",
            "feedback": "Counts не evidence capacity; rateухудшился."
          },
          {
            "id": "causal",
            "text": "First value after integration fell from 75% to 65%, down 10 percentage points. Because the separate-team cohort improved, this proves the shared engineering team caused the decline and should absorb all recovery work.",
            "feedback": "Другая cohort не randomized control; causality иresponsibility не доказаны."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Start50→55%; integration80→75%(−5); first value75→65%(−10); renewed80→80%. 5148>4800 не отменяет bottleneck. Shared constraint — общее ограничение; accountable owner назначается решением, не простой корреляцией."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 3
    }
  },
  {
    "id": "product-c6-l02-priority-v1",
    "track": "product",
    "chapter": 6,
    "level": 2,
    "caseId": "b20",
    "format": "priority",
    "title": "Sequence free-plan investments on net value",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 6,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Finance has estimated incremental annual benefit and ongoing run cost for free-plan initiatives. Use net value consistently; signup volume is not the objective. Benefit estimates exclude value already attributed to prerequisites. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. After that, repeatedly choose the AVAILABLE item with the highest (annual benefit − annual run cost) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Annual benefit $k",
          "Annual run cost $k",
          "Effort team-weeks",
          "Depends on"
        ],
        "rows": [
          [
            "A · Repair plan-cost attribution",
            "90",
            "10",
            "4",
            "None"
          ],
          [
            "B · Optimize free-tier storage",
            "240",
            "40",
            "5",
            "A"
          ],
          [
            "C · Test paid-value education",
            "200",
            "50",
            "5",
            "A"
          ],
          [
            "D · Expand free acquisition",
            "300",
            "240",
            "3",
            "A"
          ],
          [
            "E · Introduce a fair-use control",
            "190",
            "40",
            "3",
            "B"
          ],
          [
            "F · Publish plan economics",
            "116",
            "20",
            "4",
            "C, E"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Repair plan-cost attribution"
          },
          {
            "id": "B",
            "text": "B · Optimize free-tier storage"
          },
          {
            "id": "C",
            "text": "C · Test paid-value education"
          },
          {
            "id": "D",
            "text": "D · Expand free acquisition"
          },
          {
            "id": "E",
            "text": "E · Introduce a fair-use control"
          },
          {
            "id": "F",
            "text": "F · Publish plan economics"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "E",
            "C",
            "F",
            "D"
          ]
        ],
        "explain": "Net/effort A=20, B=40, C=30, D=20, E=50, F=24. A→B→E→C разблокирует F; F→D. Run cost — продолжающиеся расходы; incremental benefit исключает двойной счёт prerequisites. Gross benefit D=300 не делает его лучшим net investment."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "net",
      "mandatory": null,
      "expectedOrder": [
        "A",
        "B",
        "E",
        "C",
        "F",
        "D"
      ]
    }
  },
  {
    "id": "product-c6-l04-ab-v1",
    "track": "product",
    "chapter": 6,
    "level": 4,
    "caseId": "b47",
    "format": "ab",
    "title": "Separate annual-plan cash collection from durable value",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 6,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The annual-plan pilot has completed the pre-registered 12-month economic window, including refunds and serving costs. Primary is relative net contribution per eligible account, not upfront cash receipts. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative net contribution per eligible account (%)"
          ],
          [
            "95% CI for primary effect",
            "1.2 to 6.8"
          ],
          [
            "Required lower bound",
            "> 1"
          ],
          [
            "Validity / maturity",
            "Pass: full 12-month follow-up, revenue recognition and costs verified"
          ],
          [
            "Refund rate: control → treatment",
            "3% → 3.4%"
          ],
          [
            "Allowed Refund rate increase",
            "≤ 0.5 percentage points"
          ],
          [
            "Renewal loss rate: control → treatment",
            "8% → 8.3%"
          ],
          [
            "Allowed Renewal loss rate increase",
            "≤ 0.4 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "launch",
            "text": "Launch within the tested eligibility rules: net contribution clears the 1% hurdle and both refund and renewal-loss increases stay within tolerance. Report durable contribution separately from the timing benefit of upfront cash collection.",
            "feedback": "Cash timing не равен economic lift."
          },
          {
            "id": "cash",
            "text": "Launch the annual plan across all accounts: collecting a year of cash confirms higher annual revenue regardless of the net-contribution interval. Refund and renewal-loss limits can be reviewed after the broader renewal cycle.",
            "feedback": "Cash collection не incremental revenue иscope не расширяется автоматически."
          },
          {
            "id": "hold",
            "text": "Hold the annual plan because renewal loss is 8.3%, above the 0.4% guardrail. The positive contribution result is encouraging, but the treatment level alone establishes a breach of the stated customer-retention condition.",
            "feedback": "Guardrail — delta8.3−8=0.3 п.п., неlevel."
          }
        ],
        "key": [
          "launch"
        ],
        "explain": "Lower1.2>1; refunds+0.4≤0.5, renewal loss+0.3≤0.4 п.п. Full horizon делает net contribution сопоставимым. Upfront cash — деньги авансом; revenue recognition — признание выручки по правилам учёта."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "launch",
      "guardLabels": [
        "Refund rate",
        "Renewal loss rate"
      ]
    }
  },
  {
    "id": "product-c6-l06-funnel-v1",
    "track": "product",
    "chapter": 6,
    "level": 6,
    "caseId": "b54",
    "format": "funnel",
    "title": "Read delivery evidence at a matched horizon",
    "ru": "Прочитать воронку",
    "difficulty": 6,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The estimation review compares delivery work items at the same 90-day maturity. Target: committed delivery work items, including ones not delivered. An immature 30-day snapshot is provided only to illustrate why horizon matching matters. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Committed work items",
            "2,000",
            "2,000"
          ],
          [
            "Discovery completed",
            "1,600",
            "1,700"
          ],
          [
            "Build completed",
            "1,200",
            "1,275"
          ],
          [
            "Accepted by users",
            "900",
            "765"
          ],
          [
            "Outcome threshold met",
            "540",
            "459"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Immature 30-day snapshot — exclude from target comparison",
        "headers": [
          "Stage",
          "Current snapshot"
        ],
        "rows": [
          [
            "Build completed",
            "800"
          ],
          [
            "Accepted",
            "400"
          ],
          [
            "Outcome threshold met",
            "300"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Committed work items → Discovery completed",
            "feedback": "80% → 85%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step2",
            "text": "Discovery completed → Build completed",
            "feedback": "75% → 75%: +0 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step3",
            "text": "Build completed → Accepted by users",
            "feedback": "75% → 60%: -15 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step4",
            "text": "Accepted by users → Outcome threshold met",
            "feedback": "60% → 60%: +0 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step3"
        ],
        "explain": "Discovery80→85%; build75→75%; acceptance75→60%(−15); outcome60→60%. End-to-end outcome27→22.95%. Matched horizon — одинаковое окно; survivorship — отбор только дошедших до результата."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Acceptance after build fell from 75% to 60%, down 15 percentage points, while outcome attainment after acceptance stayed at 60%. The matched 90-day cohort identifies a weak transition; it does not show that dropping estimation will improve delivery.",
            "feedback": "Не смешивает horizon инеприписываетcausality."
          },
          {
            "id": "immature",
            "text": "Outcome attainment improved because the newer 30-day snapshot has 300 successful initiatives out of 400 accepted. Use its 75% rate instead of the matched 90-day cohort when deciding whether to stop estimating.",
            "feedback": "Разные maturity иsurvivorship нельзя заменить одним ratio."
          },
          {
            "id": "relative",
            "text": "Acceptance after build fell from 75% to 60%, down 15% relative. Outcome attainment after acceptance stayed at 60%, so the review should investigate acceptance before changing the estimation policy.",
            "feedback": "Relative decline20%, absolute15 п.п."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Discovery80→85%; build75→75%; acceptance75→60%(−15); outcome60→60%. End-to-end outcome27→22.95%. Matched horizon — одинаковое окно; survivorship — отбор только дошедших до результата."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 3
    }
  },
  {
    "id": "product-c6-l08-priority-v1",
    "track": "product",
    "chapter": 6,
    "level": 8,
    "caseId": "b64",
    "format": "priority",
    "title": "Sequence payment controls before economic upside",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 6,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Payment code review is a mandatory first control. Finance estimates annual benefit net of expected operational losses, but run costs must still be deducted. No score authorizes skipping review. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. The approved control requires item A FIRST, regardless of score. After that, repeatedly choose the AVAILABLE item with the highest (annual benefit − annual run cost) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Annual benefit $k",
          "Annual run cost $k",
          "Effort team-weeks",
          "Depends on"
        ],
        "rows": [
          [
            "A · Complete payment code review",
            "20",
            "5",
            "3",
            "None"
          ],
          [
            "B · Add idempotency protection",
            "300",
            "60",
            "4",
            "A"
          ],
          [
            "C · Optimize routing economics",
            "400",
            "200",
            "5",
            "A"
          ],
          [
            "D · Add payment reconciliation",
            "250",
            "50",
            "4",
            "B"
          ],
          [
            "E · Improve failure messaging",
            "160",
            "40",
            "4",
            "None"
          ],
          [
            "F · Expand payment exposure",
            "500",
            "140",
            "6",
            "C, D"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Complete payment code review"
          },
          {
            "id": "B",
            "text": "B · Add idempotency protection"
          },
          {
            "id": "C",
            "text": "C · Optimize routing economics"
          },
          {
            "id": "D",
            "text": "D · Add payment reconciliation"
          },
          {
            "id": "E",
            "text": "E · Improve failure messaging"
          },
          {
            "id": "F",
            "text": "F · Expand payment exposure"
          }
        ],
        "keys": [
          [
            "A",
            "B",
            "D",
            "C",
            "F",
            "E"
          ]
        ],
        "explain": "A обязательна; B=60, D=50, C=40, F=60 после C,D, E=30. A→B→D→C→F→E. Idempotency — защита от повторного эффекта; reconciliation — сверка платежей. Mandatory controls не обмениваются на benefit."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "net",
      "mandatory": "A",
      "expectedOrder": [
        "A",
        "B",
        "D",
        "C",
        "F",
        "E"
      ]
    }
  },
  {
    "id": "product-c6-l10-ab-v1",
    "track": "product",
    "chapter": 6,
    "level": 10,
    "caseId": "b68",
    "format": "ab",
    "title": "Reject a readout with incompatible metric definitions",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 6,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — A dashboard-definition alignment experiment is being reviewed. Primary is relative verified weekly-active lift. The first dashboard includes internal staff while the second excludes them; the supplied interval was calculated before that discrepancy was resolved. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative verified weekly-active lift (%)"
          ],
          [
            "95% CI for primary effect",
            "2 to 6"
          ],
          [
            "Required lower bound",
            "> 1"
          ],
          [
            "Validity / maturity",
            "Fail: exposed populations use different internal-staff filters"
          ],
          [
            "Telemetry error rate: control → treatment",
            "0.5% → 0.55%"
          ],
          [
            "Allowed Telemetry error rate increase",
            "≤ 0.1 percentage points"
          ],
          [
            "Support contact rate: control → treatment",
            "2% → 2.1%"
          ],
          [
            "Allowed Support contact rate increase",
            "≤ 0.2 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "hold",
            "text": "Hold the decision and rebuild the readout with one verified population definition. The reported interval and guardrail deltas look acceptable, but they cannot satisfy the validity gate while the staff filters remain inconsistent.",
            "feedback": "Validity gate обязателен до decision."
          },
          {
            "id": "launch",
            "text": "Launch within the tested scope: the reported lower bound exceeds 1% and both guardrail changes pass. The dashboard filter difference is a reporting detail that can be reconciled after the rollout decision.",
            "feedback": "Population mismatch влияет наmetric, не косметика."
          },
          {
            "id": "average",
            "text": "Launch using the average of the two dashboard counts: averaging balances the staff-filter difference while retaining the positive interval. Both guardrails pass, so no further definition work is needed before acting.",
            "feedback": "Среднее несовместимых population не исправляет estimand."
          }
        ],
        "key": [
          "hold"
        ],
        "explain": "Primary lower2>1, deltas+0.05≤0.1 и+0.1≤0.2 п.п. Но validity FAIL: разные populations. Harmonize definitions — согласовать определения; нельзя усреднять разные denominator definitions или выдавать preliminary CI заvalidated evidence."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "hold",
      "guardLabels": [
        "Telemetry error rate",
        "Support contact rate"
      ]
    }
  },
  {
    "id": "product-c6-l12-funnel-v1",
    "track": "product",
    "chapter": 6,
    "level": 12,
    "caseId": "s12",
    "format": "funnel",
    "title": "Diagnose cross-team handoffs before reorganizing",
    "ru": "Прочитать воронку",
    "difficulty": 6,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Organization-design review. Target: segment-owned customer migrations requiring a platform handoff, each observed for 120 days. Platform-only migrations are a separate population; their success cannot attribute an effect to either organization model. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Accepted migration requests",
            "10,000",
            "20,000"
          ],
          [
            "Owner assigned",
            "9,000",
            "18,000"
          ],
          [
            "Platform handoff accepted",
            "7,200",
            "11,700"
          ],
          [
            "Customer rollout",
            "5,400",
            "8,190"
          ],
          [
            "Outcome target reached",
            "3,780",
            "5,733"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Platform-only cohort — no segment handoff",
        "headers": [
          "Measure",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Accepted initiatives",
            "5000",
            "5000"
          ],
          [
            "Outcome target reached",
            "2500",
            "3000"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Accepted migration requests → Owner assigned",
            "feedback": "90% → 90%: +0 п.п."
          },
          {
            "id": "step2",
            "text": "Owner assigned → Platform handoff accepted",
            "feedback": "80% → 65%: -15 п.п."
          },
          {
            "id": "step3",
            "text": "Platform handoff accepted → Customer rollout",
            "feedback": "75% → 70%: -5 п.п."
          },
          {
            "id": "step4",
            "text": "Customer rollout → Outcome target reached",
            "feedback": "70% → 70%: 0 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step2"
        ],
        "explain": "Owner assignment90→90%; handoff80→65%(−15); rollout75→70%(−5); outcome70→70%. Handoff — передача ответственности; operating model — устройство работы. Separate populations не позволяют причинно приписать различие структуре."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Platform-handoff acceptance fell from 80% to 65%, down 15 percentage points, the largest decline. Rollout after handoff also weakened; investigate the shared interface before claiming one organization model caused the result.",
            "feedback": "Падение handoff−15 больше rollout−5; cause не установлен."
          },
          {
            "id": "aggregate",
            "text": "Platform-only outcome attainment improved, so feature-based ownership is causally superior to segment ownership. Use that comparison to reorganize immediately even though the target cohort has different handoff requirements.",
            "feedback": "Different population не causal comparison."
          },
          {
            "id": "relative",
            "text": "Platform-handoff acceptance fell from 80% to 65%, down 15% relative. It is the only transition worth investigating, since stable owner assignment proves all later rollout work is functioning correctly.",
            "feedback": "Relative decline18.75%; stable owner assignment не доказательство later success."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Owner assignment90→90%; handoff80→65%(−15); rollout75→70%(−5); outcome70→70%. Handoff — передача ответственности; operating model — устройство работы. Separate populations не позволяют причинно приписать различие структуре."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 2
    }
  },
  {
    "id": "product-c7-l02-priority-v1",
    "track": "product",
    "chapter": 7,
    "level": 2,
    "caseId": "b38",
    "format": "priority",
    "title": "Sequence vendor options with risk-adjusted value",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 7,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The board requires contractual data-portability review before any vendor commitment. Upside and failure loss are incremental annual cash effects under two mutually exclusive outcomes; all probabilities are assessed, not guarantees. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. The approved control requires item A FIRST, regardless of score. After that, repeatedly choose the AVAILABLE item with the highest ((probability / 100) × upside − (1 − probability / 100) × failure loss) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Success probability %",
          "Upside $k",
          "Failure loss $k",
          "Effort team-months",
          "Depends on"
        ],
        "rows": [
          [
            "A · Review portability obligations",
            "100",
            "40",
            "10",
            "2",
            "None"
          ],
          [
            "B · Renegotiate annual terms",
            "80",
            "300",
            "100",
            "4",
            "A"
          ],
          [
            "C · Pilot an alternative vendor",
            "60",
            "500",
            "100",
            "4",
            "None"
          ],
          [
            "D · Validate a migration fallback",
            "90",
            "200",
            "100",
            "2",
            "C"
          ],
          [
            "E · Commit to multi-year terms",
            "70",
            "600",
            "200",
            "6",
            "B, D"
          ],
          [
            "F · Expand vendor usage",
            "50",
            "500",
            "200",
            "5",
            "B"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Review portability obligations"
          },
          {
            "id": "B",
            "text": "B · Renegotiate annual terms"
          },
          {
            "id": "C",
            "text": "C · Pilot an alternative vendor"
          },
          {
            "id": "D",
            "text": "D · Validate a migration fallback"
          },
          {
            "id": "E",
            "text": "E · Commit to multi-year terms"
          },
          {
            "id": "F",
            "text": "F · Expand vendor usage"
          }
        ],
        "keys": [
          [
            "A",
            "C",
            "D",
            "B",
            "E",
            "F"
          ]
        ],
        "explain": "A обязательна первой. Expected net/effort B=(240−20)/4=55; C=(300−40)/4=65; D=(180−10)/2=85; E=(420−60)/6=60; F=(250−100)/5=30. A→C→D→B→E→F. BATNA — лучшая альтернатива соглашению; portability — переносимость данных."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "risk",
      "mandatory": "A",
      "expectedOrder": [
        "A",
        "C",
        "D",
        "B",
        "E",
        "F"
      ]
    }
  },
  {
    "id": "product-c7-l04-ab-v1",
    "track": "product",
    "chapter": 7,
    "level": 4,
    "caseId": "b57",
    "format": "ab",
    "title": "Protect outcomes while changing the delivery model",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 7,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — The board approved a non-inferiority pilot of a lower-cost delivery model. Primary: relative customer-outcome change must have its entire CI above −1%. A negative point estimate is permitted within this pre-registered margin; feature count is diagnostic only. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative customer-outcome change (%)"
          ],
          [
            "95% CI for primary effect",
            "-0.6 to 0.4"
          ],
          [
            "Required lower bound",
            "> -1"
          ],
          [
            "Validity / maturity",
            "Pass: pre-registered non-inferiority margin, sample and mature outcome window"
          ],
          [
            "Severe incident rate: control → treatment",
            "0.2% → 0.23%"
          ],
          [
            "Allowed Severe incident rate increase",
            "≤ 0.05 percentage points"
          ],
          [
            "Customer complaint rate: control → treatment",
            "1% → 1.1%"
          ],
          [
            "Allowed Customer complaint rate increase",
            "≤ 0.2 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "launch",
            "text": "Adopt within the tested scope: the lower bound stays above the −1% non-inferiority margin, and both incident and complaint increases pass. This supports the agreed outcome-preservation rule, not a claim of superior outcomes from shipping more features.",
            "feedback": "Non-inferiority не superiority."
          },
          {
            "id": "hold",
            "text": "Hold adoption because the primary interval includes zero. Even with passing incident and complaint limits, the rule requires a strictly positive outcome improvement before the lower-cost delivery model can be used.",
            "feedback": "Меняет pre-registered margin−1 на0."
          },
          {
            "id": "superior",
            "text": "Adopt company-wide and describe outcomes as improved: the interval includes positive effects and delivery costs fell. The incident and complaint limits pass, so a superiority claim is supported despite the negative lower bound.",
            "feedback": "CI допускает ухудшение; superiority неустановлено иscopeограничен."
          }
        ],
        "key": [
          "launch"
        ],
        "explain": "Lower−0.6>−1, incidents+0.03≤0.05, complaints+0.1≤0.2 п.п. Non-inferiority — отсутствие ухудшения больше допустимой границы; superiority — превосходство, здесь не доказано. Throughput не primary outcome."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "launch",
      "guardLabels": [
        "Severe incident rate",
        "Customer complaint rate"
      ]
    }
  },
  {
    "id": "product-c7-l06-funnel-v1",
    "track": "product",
    "chapter": 7,
    "level": 6,
    "caseId": "b61",
    "format": "funnel",
    "title": "Read a big-bet pilot without confusing mix and learning",
    "ru": "Прочитать воронку",
    "difficulty": 7,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Capital-allocation review. Target: regulated-industry accounts in the big-bet pilot, same 180-day maturity and risk eligibility. The total-pilot headline includes a faster-growing low-risk segment. Do not infer the expected return of the whole investment from a single funnel. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Eligible regulated accounts",
            "20,000",
            "20,000"
          ],
          [
            "Pilot started",
            "10,000",
            "12,000"
          ],
          [
            "Security approval",
            "8,000",
            "8,400"
          ],
          [
            "Paid deployment",
            "4,800",
            "5,460"
          ],
          [
            "Renewed deployment",
            "3,840",
            "4,095"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Pilot mix — separate segment rates",
        "headers": [
          "Segment",
          "Pilot starts before",
          "Approvals before",
          "Pilot starts after",
          "Approvals after"
        ],
        "rows": [
          [
            "Regulated",
            "10000",
            "8000",
            "12000",
            "8400"
          ],
          [
            "Low-risk",
            "10000",
            "6000",
            "30000",
            "27000"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Eligible regulated accounts → Pilot started",
            "feedback": "50% → 60%: +10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step2",
            "text": "Pilot started → Security approval",
            "feedback": "80% → 70%: -10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step3",
            "text": "Security approval → Paid deployment",
            "feedback": "60% → 65%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step4",
            "text": "Paid deployment → Renewed deployment",
            "feedback": "80% → 75%: −5 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step2"
        ],
        "explain": "Regulated starts50→60%; approval80→70%(−10); paid60→65%; renewal80→75%. Pooled approval14000/20000=70%→35400/42000≈84.29% из-за mix. Risk-adjusted return — доходность с учётом риска; staged funding — финансирование этапами."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Regulated security approval fell from 80% to 70%, down 10 percentage points, even as pooled pilot activation rose. Paid deployment after approval improved; the pooled lift and larger counts do not establish a positive risk-adjusted return for the big bet.",
            "feedback": "Target cohort иportfolio economics разделены."
          },
          {
            "id": "pooled",
            "text": "Pooled security approval rose, so the big bet is validated across both segments. Regulated approvals increased in count as well; fund the full investment and treat its weaker conditional approval as a temporary scaling issue.",
            "feedback": "Mix иcounts не установили segment improvement илиEV."
          },
          {
            "id": "relative",
            "text": "Regulated security approval fell from 80% to 70%, down 10% relative, while pooled approval rose. Keep the investment staged because the funnel does not establish the full project’s risk-adjusted return.",
            "feedback": "Relative decline12.5%, не10%."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Regulated starts50→60%; approval80→70%(−10); paid60→65%; renewal80→75%. Pooled approval14000/20000=70%→35400/42000≈84.29% из-за mix. Risk-adjusted return — доходность с учётом риска; staged funding — финансирование этапами."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 2
    }
  },
  {
    "id": "product-c7-l08-priority-v1",
    "track": "product",
    "chapter": 7,
    "level": 8,
    "caseId": "b66",
    "format": "priority",
    "title": "Sequence build-or-buy options and an exit path",
    "ru": "Расставить инициативы по приоритету",
    "difficulty": 7,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Treat these as staged work packages, not a requirement to buy and build the same capability. Legal requires data-rights review first. An option-stage delivers information before the later commitment; benefits exclude double counting prior learning. Start with no completed work. Finish one item at a time; a dependent item becomes available only when ALL its listed prerequisites are complete. The approved control requires item A FIRST, regardless of score. After that, repeatedly choose the AVAILABLE item with the highest ((probability / 100) × upside − (1 − probability / 100) × failure loss) / effort. Values use the same horizon within this case. This agreed sequencing rule is not a portfolio optimization model; do not add the value of a prerequisite to its dependent item."
      },
      {
        "kind": "table",
        "title": "Assessed initiatives",
        "headers": [
          "ID / Work",
          "Success probability %",
          "Upside $k",
          "Failure loss $k",
          "Effort team-months",
          "Depends on"
        ],
        "rows": [
          [
            "A · Review data and exit rights",
            "100",
            "60",
            "20",
            "2",
            "None"
          ],
          [
            "B · Pilot the buy integration",
            "80",
            "450",
            "100",
            "5",
            "A"
          ],
          [
            "C · Prototype the build path",
            "60",
            "600",
            "150",
            "4",
            "None"
          ],
          [
            "D · Test the vendor exit path",
            "90",
            "200",
            "100",
            "2",
            "B"
          ],
          [
            "E · Compare lifecycle evidence",
            "90",
            "400",
            "100",
            "5",
            "C, D"
          ],
          [
            "F · Negotiate reversible terms",
            "80",
            "300",
            "100",
            "4",
            "B"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Выстройте весь порядок по заданному правилу. Учитывайте все зависимости; до проверки карточки можно убрать и добавить снова.",
        "cards": [
          {
            "id": "A",
            "text": "A · Review data and exit rights"
          },
          {
            "id": "B",
            "text": "B · Pilot the buy integration"
          },
          {
            "id": "C",
            "text": "C · Prototype the build path"
          },
          {
            "id": "D",
            "text": "D · Test the vendor exit path"
          },
          {
            "id": "E",
            "text": "E · Compare lifecycle evidence"
          },
          {
            "id": "F",
            "text": "F · Negotiate reversible terms"
          }
        ],
        "keys": [
          [
            "A",
            "C",
            "B",
            "D",
            "E",
            "F"
          ]
        ],
        "explain": "A первым. B=(360−20)/5=68; C=(360−60)/4=75; D=(180−10)/2=85; E=(360−10)/5=70; F=(240−20)/4=55. A→C→B→D→E→F. Lifecycle cost — полная стоимость владения; reversibility — обратимость решения, а не отсутствие obligations."
      }
    ],
    "audit": {
      "version": 2,
      "scoring": "risk",
      "mandatory": "A",
      "expectedOrder": [
        "A",
        "C",
        "B",
        "D",
        "E",
        "F"
      ]
    }
  },
  {
    "id": "product-c7-l10-ab-v1",
    "track": "product",
    "chapter": 7,
    "level": 10,
    "caseId": "b70",
    "format": "ab",
    "title": "Evaluate a renewal offer beyond account-level revenue",
    "ru": "Принять решение по A/B-тесту",
    "difficulty": 7,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Finance and legal approved a limited renewal-offer experiment with transparent future terms. Primary is relative net contribution per eligible account above 1%. The strategic-account complaint limit is separately binding, even when the overall limit passes. Use the pre-registered rule: rollout is allowed only when validity and maturity PASS, the entire primary confidence interval is strictly above the stated lower-bound threshold, and EVERY guardrail increase is at or below its limit. The CI is supplied; no significance calculation is required. Keep the approved population and exposure scope."
      },
      {
        "kind": "table",
        "title": "Decision evidence",
        "headers": [
          "Measure / rule",
          "Value"
        ],
        "rows": [
          [
            "Primary metric",
            "Relative net contribution per eligible account (%)"
          ],
          [
            "95% CI for primary effect",
            "1.4 to 5.6"
          ],
          [
            "Required lower bound",
            "> 1"
          ],
          [
            "Validity / maturity",
            "Pass: pre-registered segments, mature renewals and full serving costs"
          ],
          [
            "Overall complaint rate: control → treatment",
            "1% → 1.15%"
          ],
          [
            "Allowed Overall complaint rate increase",
            "≤ 0.2 percentage points"
          ],
          [
            "Strategic-account complaint rate: control → treatment",
            "0.5% → 0.85%"
          ],
          [
            "Allowed Strategic-account complaint rate increase",
            "≤ 0.3 percentage points"
          ],
          [
            "Renewal loss rate: control → treatment",
            "6% → 6.1%"
          ],
          [
            "Allowed Renewal loss rate increase",
            "≤ 0.2 percentage points"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите английское решение, которое учитывает все условия и границы вывода.",
        "count": 1,
        "options": [
          {
            "id": "hold",
            "text": "Hold expansion: net contribution clears the hurdle, overall complaints and renewal loss pass, but strategic-account complaints rose by 0.35 percentage points against a 0.30-point limit. Resolve that breach before revisiting the offer.",
            "feedback": "Все три guardrails обязательны."
          },
          {
            "id": "launch",
            "text": "Expand the offer: net contribution is positive and overall complaints and renewal loss remain within tolerance. Strategic-account complaints are covered by the passing overall rate, so they do not block the broader renewal policy.",
            "feedback": "Отдельное binding constraint не покрывается aggregate."
          },
          {
            "id": "revenue",
            "text": "Expand the offer on customer revenue growth alone: larger accounts now use more product, and passing renewal loss shows the relationship is protected. Net contribution and the strategic complaint subgroup can remain secondary monitoring signals.",
            "feedback": "Подменяет primary иguardrails usage/revenue."
          }
        ],
        "key": [
          "hold"
        ],
        "explain": "Lower1.4>1; overall+0.15≤0.2; strategic+0.35>0.3; renewal loss+0.1≤0.2 п.п. Binding constraint — обязательное ограничение; account revenue не net contribution, usage не согласие клиента сterms."
      }
    ],
    "audit": {
      "version": 2,
      "decision": "hold",
      "guardLabels": [
        "Overall complaint rate",
        "Strategic-account complaint rate",
        "Renewal loss rate"
      ]
    }
  },
  {
    "id": "product-c7-l12-funnel-v1",
    "track": "product",
    "chapter": 7,
    "level": 12,
    "caseId": "s14",
    "format": "funnel",
    "title": "Assess acquisition integration without erasing obligations",
    "ru": "Прочитать воронку",
    "difficulty": 7,
    "artifacts": [
      {
        "kind": "text",
        "body": "Northwind Bank — Acquisition integration review. Target: acquired-product customers with valid migration consent, each observed for 180 days. Customers lacking consent remain outside the migration funnel and retain service obligations. The comparison is observational, not an estimate of merger synergy. For the target cohort, calculate each transition as the next stage divided by the immediately preceding stage. Compare changes in percentage points, not raw counts or relative percentages. Snapshot comparisons do not identify a causal effect."
      },
      {
        "kind": "table",
        "title": "Target cohort",
        "headers": [
          "Stage",
          "Before",
          "After"
        ],
        "rows": [
          [
            "Consenting eligible accounts",
            "50,000",
            "60,000"
          ],
          [
            "Migration started",
            "40,000",
            "51,000"
          ],
          [
            "Data validated",
            "30,000",
            "38,250"
          ],
          [
            "First combined-product value",
            "24,000",
            "26,775"
          ],
          [
            "Renewed combined account",
            "19,200",
            "20,885"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Accounts outside target migration cohort",
        "headers": [
          "Population",
          "Before",
          "After",
          "Obligation"
        ],
        "rows": [
          [
            "No valid migration consent",
            "15000",
            "18000",
            "Maintain service; seek lawful consent"
          ],
          [
            "Customer-requested exit",
            "3000",
            "3500",
            "Honor export and exit terms"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "В целевой когорте выберите переход с наибольшим падением конверсии в процентных пунктах.",
        "count": 1,
        "options": [
          {
            "id": "step1",
            "text": "Consenting eligible accounts → Migration started",
            "feedback": "80% → 85%: +5 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step2",
            "text": "Migration started → Data validated",
            "feedback": "75% → 75%: +0 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step3",
            "text": "Data validated → First combined-product value",
            "feedback": "80% → 70%: -10 п.п. Знаменатель — предыдущий этап."
          },
          {
            "id": "step4",
            "text": "First combined-product value → Renewed combined account",
            "feedback": "80% → 78.0019%: -1.99813 п.п. Знаменатель — предыдущий этап."
          }
        ],
        "key": [
          "step3"
        ],
        "explain": "Start80→85%; validated75→75%; first value80→70%(−10); renewal80→78.002%(округление counts). End-to-end counts не causal synergy. Stewardship — ответственное управление; consent иservice commitments не отменяются сделкой."
      },
      {
        "kind": "select",
        "prompt": "Выберите точное сообщение команде на английском.",
        "count": 1,
        "options": [
          {
            "id": "accurate",
            "text": "Among consenting eligible accounts, first value after validation fell from 80% to 70%, down 10 percentage points. More renewals do not establish merger synergy or authorize migrating customers without consent; those obligations remain outside this funnel.",
            "feedback": "Board-level conclusion respects estimand иcustomer obligations."
          },
          {
            "id": "synergy",
            "text": "Combined-account renewals increased from 19,200 to 20,885, establishing positive merger synergy. Migrate the remaining customers to capture that value, since the consenting cohort is large enough to represent everyone without further review.",
            "feedback": "Observational counts не causal synergy инеconsent authority."
          },
          {
            "id": "relative",
            "text": "Among consenting eligible accounts, first value after validation fell from 80% to 70%, down 10% relative. Keep non-consenting customers outside migration and investigate the weaker value transition before claiming merger synergy.",
            "feedback": "Relative decline12.5%, не10%."
          }
        ],
        "key": [
          "accurate"
        ],
        "explain": "Start80→85%; validated75→75%; first value80→70%(−10); renewal80→78.002%(округление counts). End-to-end counts не causal synergy. Stewardship — ответственное управление; consent иservice commitments не отменяются сделкой."
      }
    ],
    "audit": {
      "version": 2,
      "largestDeclineStage": 3
    }
  }
];
