/* Authored even-level task-three variants for all seven Business Analyst chapters. */
var BA_CAREER_PRACTICE_DATA = [
  {
    "id": "ba-c1-l02-question-v1",
    "track": "ba",
    "chapter": 1,
    "level": 2,
    "caseId": "b02",
    "format": "question",
    "difficulty": 1,
    "title": "Turn “fast” into a testable requirement",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The draft says: “After a valid loan request, show confirmation quickly.” The actor, valid input and confirmation content are already agreed. No maximum response time has been approved. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "timing",
            "text": "What maximum time should we allow from a valid submission to the visible confirmation, and under what stated load?",
            "feedback": "Закрывает отсутствующий измеримый предел, не меняя уже согласованный результат."
          },
          {
            "id": "content",
            "text": "Which details should appear in the visible confirmation, and should we also include a link to the customer’s application history?",
            "feedback": "Содержание уже согласовано; временной предел останется неизвестным."
          },
          {
            "id": "channel",
            "text": "Should the confirmation also be delivered by email, and which customer preference should select the communication channel after submission?",
            "feedback": "Канал — другой scope, а не измерение слова quickly."
          }
        ],
        "key": [
          "timing"
        ],
        "response": "Stakeholder: “Use no more than two seconds at up to 100 concurrent sessions; measure from accepted valid submission to visible confirmation. Record that load with the criterion.”",
        "explain": "Requirement — проверяемое требование. В этой версии пробел именно в measurable threshold: предел времени и условия измерения. Полезный вопрос о канале не делает quickly проверяемым."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c1-l04-acceptance-v1",
    "track": "ba",
    "chapter": 1,
    "level": 4,
    "caseId": "b04",
    "format": "acceptance",
    "difficulty": 1,
    "title": "Test a password-reset token at its expiry boundary",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — A password reset may update the password only when a token is present and its age is strictly less than its lifetime. Missing token is checked first; expired tokens do not update the password. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Token lifetime minutes",
            "10"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Token present",
          "Age minutes"
        ],
        "rows": [
          [
            "R1",
            "true",
            "9.9"
          ],
          [
            "R2",
            "true",
            "10"
          ],
          [
            "R3",
            "false",
            "0"
          ],
          [
            "R4",
            "true",
            "10.1"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "R1",
            "text": "R1 · The token is present; reset arrives just before the limit."
          },
          {
            "id": "R2",
            "text": "R2 · The token is present; reset arrives exactly at the limit."
          },
          {
            "id": "R3",
            "text": "R3 · The token field is empty, regardless of the displayed age."
          },
          {
            "id": "R4",
            "text": "R4 · The token is present; reset arrives after the limit."
          }
        ],
        "right": [
          {
            "id": "missing",
            "text": "Given no token, When reset is requested, Then show a missing-token error and change no password."
          },
          {
            "id": "expired",
            "text": "Given a token at or beyond its lifetime, When reset is requested, Then reject it as expired and change no password."
          },
          {
            "id": "valid",
            "text": "Given a present unexpired token, When valid new credentials are submitted, Then update the password once and confirm completion."
          }
        ],
        "key": {
          "R1": "valid",
          "R2": "expired",
          "R3": "missing",
          "R4": "expired"
        },
        "explain": "R1: 9.9 < 10 — valid. R2: ровно 10 уже expired; R4 тоже expired. R3 не содержит token и проверяется первым. Strictly less than — строго меньше; at or beyond — на границе или после неё. Отказ не меняет пароль."
      }
    ],
    "audit": {
      "model": "token"
    }
  },
  {
    "id": "ba-c1-l06-process-v1",
    "track": "ba",
    "chapter": 1,
    "level": 6,
    "caseId": "b06",
    "format": "process",
    "difficulty": 1,
    "title": "Close the missing loan-application branch",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The diagram’s loose arrow follows identity validation. Identity must be verified before eligibility is evaluated; only an eligible customer gets one application and its reference. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "submit",
            "None"
          ],
          [
            "identity",
            "submit"
          ],
          [
            "eligibility",
            "identity"
          ],
          [
            "create",
            "eligibility"
          ],
          [
            "confirm",
            "create"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Identity verified",
            "=",
            "true",
            "Request renewed identity evidence; create no application."
          ],
          [
            "Eligible",
            "=",
            "true",
            "Show the eligibility reason; create no application."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Identity verified",
          "Eligible"
        ],
        "rows": [
          [
            "L1",
            "true",
            "true"
          ],
          [
            "L2",
            "false",
            "true"
          ],
          [
            "L3",
            "true",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "submit",
            "text": "Accept the submitted loan request."
          },
          {
            "id": "identity",
            "text": "Validate the customer identity."
          },
          {
            "id": "eligibility",
            "text": "Check loan eligibility."
          },
          {
            "id": "create",
            "text": "Create one application."
          },
          {
            "id": "confirm",
            "text": "Show the new application reference."
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
        "explain": "Submit → identity → eligibility → create → confirm. L2 возвращается к identity evidence, а не к созданию заявки; L3 получает причину отказа. Main path — основной успешный сценарий; exception path — отдельная ветка, которая не должна обрываться."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "L1",
            "text": "L1 · The customer passes both checks."
          },
          {
            "id": "L2",
            "text": "L2 · Identity is unverified even though eligibility was prefilled as yes."
          },
          {
            "id": "L3",
            "text": "L3 · Identity passes but the eligibility check rejects the request."
          }
        ],
        "right": [
          {
            "id": "identityerror",
            "text": "Request renewed identity evidence; create no application."
          },
          {
            "id": "ineligible",
            "text": "Show the eligibility reason; create no application."
          },
          {
            "id": "complete",
            "text": "Create one application, then show its reference."
          }
        ],
        "key": {
          "L1": "complete",
          "L2": "identityerror",
          "L3": "ineligible"
        },
        "explain": "Submit → identity → eligibility → create → confirm. L2 возвращается к identity evidence, а не к созданию заявки; L3 получает причину отказа. Main path — основной успешный сценарий; exception path — отдельная ветка, которая не должна обрываться."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "identityerror",
        "ineligible"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c1-l08-question-v1",
    "track": "ba",
    "chapter": 1,
    "level": 8,
    "caseId": "b08",
    "format": "question",
    "difficulty": 1,
    "title": "Clarify the phone-change exception",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The normal phone-change path is documented: confirm a code on the old phone, verify the new number, then save. The specification has no approved path for a customer who cannot access the old phone. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "newformat",
            "text": "Which country-code format should the new number use, and how should we display a formatting error before saving the change?",
            "feedback": "Новый формат не определяет исключение с потерянным старым телефоном."
          },
          {
            "id": "lostphone",
            "text": "What approved verification route should a customer use when the old phone is unavailable, and which team owns that route?",
            "feedback": "Уточняет отсутствующую exception path и её владельца."
          },
          {
            "id": "delivery",
            "text": "How many times should we retry delivery of a code to the old phone before showing the customer a resend option?",
            "feedback": "Повторная доставка не решает отсутствие доступа к устройству."
          }
        ],
        "key": [
          "lostphone"
        ],
        "response": "Stakeholder: “Route the customer to assisted identity verification owned by Customer Operations. Do not save the new number until that approved verification succeeds.”",
        "explain": "Unavailability — отсутствие доступа, а не задержка доставки кода. Нужен утверждённый альтернативный путь и owner. BA фиксирует блокирующий пробел вместо предположения, что resend заменяет проверку личности."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c1-l10-acceptance-v1",
    "track": "ba",
    "chapter": 1,
    "level": 10,
    "caseId": "b10",
    "format": "acceptance",
    "difficulty": 1,
    "title": "Check an early-repayment quote at its boundary",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The current repayment policy, confirmed by the owner rather than copied from the old document, permits execution only for an open loan and a quote younger than the stated lifetime. Loan state is checked first. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Quote lifetime minutes",
            "15"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Loan open",
          "Quote age minutes"
        ],
        "rows": [
          [
            "Q1",
            "true",
            "14.9"
          ],
          [
            "Q2",
            "true",
            "15"
          ],
          [
            "Q3",
            "false",
            "1"
          ],
          [
            "Q4",
            "true",
            "16"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "Q1",
            "text": "Q1 · An open loan has a quote just below the age limit."
          },
          {
            "id": "Q2",
            "text": "Q2 · An open loan has a quote exactly at the age limit."
          },
          {
            "id": "Q3",
            "text": "Q3 · The loan is closed even though its quote is fresh."
          },
          {
            "id": "Q4",
            "text": "Q4 · An open loan’s quote is older than the limit."
          }
        ],
        "right": [
          {
            "id": "closed",
            "text": "Given the loan is not open, When repayment is requested, Then reject execution and leave the balance unchanged."
          },
          {
            "id": "refresh",
            "text": "Given an open loan with an expired quote, When repayment is requested, Then refresh the quote before any execution."
          },
          {
            "id": "execute",
            "text": "Given an open loan with a valid quote, When repayment is confirmed, Then execute once using that quote."
          }
        ],
        "key": {
          "Q1": "execute",
          "Q2": "refresh",
          "Q3": "closed",
          "Q4": "refresh"
        },
        "explain": "Q1: 14.9 < 15, execution разрешено. Q2 и Q4 требуют нового quote; равенство не проходит strictly younger. Q3 отклоняется по состоянию займа раньше проверки времени. Quote — рассчитанное предложение; execution — фактическое выполнение, не просмотр расчёта."
      }
    ],
    "audit": {
      "model": "quote"
    }
  },
  {
    "id": "ba-c1-l12-process-v1",
    "track": "ba",
    "chapter": 1,
    "level": 12,
    "caseId": "b12",
    "format": "process",
    "difficulty": 1,
    "title": "Separate a readable phone-change main path from errors",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — Keep the overview readable: the successful path changes the phone only after identity and new-number checks. Put validation failures in separate routes, not inside one giant process box. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "request",
            "None"
          ],
          [
            "identity",
            "request"
          ],
          [
            "number",
            "identity"
          ],
          [
            "save",
            "number"
          ],
          [
            "confirm",
            "save"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Identity verified",
            "=",
            "true",
            "Request approved identity verification; do not save the number."
          ],
          [
            "Number format valid",
            "=",
            "true",
            "Ask for a valid phone format; do not save the number."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Identity verified",
          "Number format valid"
        ],
        "rows": [
          [
            "P1",
            "true",
            "true"
          ],
          [
            "P2",
            "false",
            "false"
          ],
          [
            "P3",
            "true",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "request",
            "text": "Accept the phone-change request."
          },
          {
            "id": "identity",
            "text": "Verify the customer identity."
          },
          {
            "id": "number",
            "text": "Validate the new phone number."
          },
          {
            "id": "save",
            "text": "Save the verified phone number."
          },
          {
            "id": "confirm",
            "text": "Confirm the recorded change."
          }
        ],
        "keys": [
          [
            "request",
            "identity",
            "number",
            "save",
            "confirm"
          ]
        ],
        "explain": "Request → identity → number → save → confirm. P2 останавливается на identity, даже при второй ошибке; P3 исправляет формат без сохранения. Overview — обзор процесса; validation detail — подробность проверки, которую можно вынести в отдельную ветку."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "P1",
            "text": "P1 · Both checks pass."
          },
          {
            "id": "P2",
            "text": "P2 · Both checks fail; report the first failed gate."
          },
          {
            "id": "P3",
            "text": "P3 · Identity passes; the new number has an invalid format."
          }
        ],
        "right": [
          {
            "id": "identityerror",
            "text": "Request approved identity verification; do not save the number."
          },
          {
            "id": "formaterror",
            "text": "Ask for a valid phone format; do not save the number."
          },
          {
            "id": "complete",
            "text": "Save the verified number and confirm the change."
          }
        ],
        "key": {
          "P1": "complete",
          "P2": "identityerror",
          "P3": "formaterror"
        },
        "explain": "Request → identity → number → save → confirm. P2 останавливается на identity, даже при второй ошибке; P3 исправляет формат без сохранения. Overview — обзор процесса; validation detail — подробность проверки, которую можно вынести в отдельную ветку."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "identityerror",
        "formaterror"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c2-l02-question-v1",
    "track": "ba",
    "chapter": 2,
    "level": 2,
    "caseId": "b14",
    "format": "question",
    "difficulty": 2,
    "title": "Resolve an ambiguous phone-number recipient",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — A transfer uses a phone number that resolves to two verified customer records. The phone format and transfer limits are approved; the recipient-resolution behavior is not. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "limit",
            "text": "Which transfer limit should apply when a phone number resolves successfully, and should the same daily cap apply to both customer records?",
            "feedback": "Лимит не определяет, кому отправить деньги."
          },
          {
            "id": "choose",
            "text": "When two customer records share the phone number, should we block the transfer or require an approved disambiguation step before confirmation?",
            "feedback": "Закрывает конкретную неоднозначность получателя."
          },
          {
            "id": "format",
            "text": "Which normalization rule should remove spaces and country-code prefixes before lookup, and should both records use the same stored phone format?",
            "feedback": "Формат уже согласован; одинаково валидный номер всё ещё неоднозначен."
          }
        ],
        "key": [
          "choose"
        ],
        "response": "Stakeholder: “Block the transfer and route it to Customer Operations for verified recipient resolution. Never select the first returned record or expose the other customer’s details.”",
        "explain": "Disambiguation — устранение неоднозначности. Валидный идентификатор не гарантирует единственного получателя. Ответ не разрешает выбирать первый record или раскрывать чужие данные."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c2-l04-acceptance-v1",
    "track": "ba",
    "chapter": 2,
    "level": 4,
    "caseId": "b16",
    "format": "acceptance",
    "difficulty": 2,
    "title": "Specify an inclusive loan-discount threshold",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The owner approved a discount for an OPEN loan with principal at least $10,000. Loan state is checked before amount; do not infer eligibility from an unapproved draft. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Inclusive principal threshold $",
            "10000"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Loan open",
          "Principal $"
        ],
        "rows": [
          [
            "D1",
            "true",
            "9999.99"
          ],
          [
            "D2",
            "true",
            "10000"
          ],
          [
            "D3",
            "true",
            "10000.01"
          ],
          [
            "D4",
            "false",
            "15000"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "D1",
            "text": "D1 · The open loan is one cent below the boundary."
          },
          {
            "id": "D2",
            "text": "D2 · The open loan is exactly on the boundary."
          },
          {
            "id": "D3",
            "text": "D3 · The open loan is one cent above the boundary."
          },
          {
            "id": "D4",
            "text": "D4 · The loan is only a draft, although its principal is high."
          }
        ],
        "right": [
          {
            "id": "state",
            "text": "Given the loan is not open, When discount eligibility is evaluated, Then do not apply the open-loan discount."
          },
          {
            "id": "discount",
            "text": "Given an open loan at or above the threshold, When eligibility is evaluated, Then apply the approved discount."
          },
          {
            "id": "standard",
            "text": "Given an open loan below the threshold, When eligibility is evaluated, Then retain the standard rate."
          }
        ],
        "key": {
          "D1": "standard",
          "D2": "discount",
          "D3": "discount",
          "D4": "state"
        },
        "explain": "At least означает ≥: D2 и D3 получают discount, D1 — standard rate. D4 не соответствует состоянию open. Inclusive boundary — включённая граница; черновик не становится подходящим займом только из-за суммы."
      }
    ],
    "audit": {
      "model": "discount"
    }
  },
  {
    "id": "ba-c2-l06-process-v1",
    "track": "ba",
    "chapter": 2,
    "level": 6,
    "caseId": "b18",
    "format": "process",
    "difficulty": 2,
    "title": "Publish profile fields from an authoritative source",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The profile update must resolve the master customer record before validating the input. The approved display-name maximum is 40 characters; wrong-source records cannot be updated. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "capture",
            "None"
          ],
          [
            "source",
            "capture"
          ],
          [
            "validate",
            "source"
          ],
          [
            "update",
            "validate"
          ],
          [
            "audit",
            "update"
          ],
          [
            "confirm",
            "audit"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Authoritative source",
            "=",
            "true",
            "Resolve the approved master record; write no profile update."
          ],
          [
            "Display-name length",
            "≤",
            "40",
            "Return the field-length error; write no profile update."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Authoritative source",
          "Display-name length"
        ],
        "rows": [
          [
            "F1",
            "true",
            "40"
          ],
          [
            "F2",
            "false",
            "41"
          ],
          [
            "F3",
            "true",
            "41"
          ],
          [
            "F4",
            "false",
            "12"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "capture",
            "text": "Capture the profile-change request."
          },
          {
            "id": "source",
            "text": "Resolve the authoritative customer record."
          },
          {
            "id": "validate",
            "text": "Validate field values against the dictionary."
          },
          {
            "id": "update",
            "text": "Update the authoritative record."
          },
          {
            "id": "audit",
            "text": "Record the profile-change audit entry."
          },
          {
            "id": "confirm",
            "text": "Return the confirmed profile version."
          }
        ],
        "keys": [
          [
            "capture",
            "source",
            "validate",
            "update",
            "audit",
            "confirm"
          ]
        ],
        "explain": "Capture → source → validate → update → audit → confirm. F1 проходит включённую границу 40; F2 и F4 требуют master record; F3 нарушает 41 > 40. Source of truth — авторитетный источник; audit entry — запись об изменении, не замена самой проверки."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "F1",
            "text": "F1 · The master source is confirmed; the display name uses exactly the maximum length."
          },
          {
            "id": "F2",
            "text": "F2 · The source is unapproved and the name is also too long."
          },
          {
            "id": "F3",
            "text": "F3 · The master source is confirmed but the name exceeds its limit."
          },
          {
            "id": "F4",
            "text": "F4 · The short name came from the unapproved source."
          }
        ],
        "right": [
          {
            "id": "sourceerror",
            "text": "Resolve the approved master record; write no profile update."
          },
          {
            "id": "lengtherror",
            "text": "Return the field-length error; write no profile update."
          },
          {
            "id": "complete",
            "text": "Update the authoritative record, audit it and return the version."
          }
        ],
        "key": {
          "F1": "complete",
          "F2": "sourceerror",
          "F3": "lengtherror",
          "F4": "sourceerror"
        },
        "explain": "Capture → source → validate → update → audit → confirm. F1 проходит включённую границу 40; F2 и F4 требуют master record; F3 нарушает 41 > 40. Source of truth — авторитетный источник; audit entry — запись об изменении, не замена самой проверки."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "sourceerror",
        "lengtherror"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c2-l08-question-v1",
    "track": "ba",
    "chapter": 2,
    "level": 8,
    "caseId": "b20",
    "format": "question",
    "difficulty": 2,
    "title": "Clarify a delivery estimate’s dependency assumption",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The three-week transfer estimate covers the approved happy path, acceptance tests and team capacity. It assumes an external provider sandbox, but nobody has confirmed the availability date used in the estimate. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "date",
            "text": "Which sandbox-ready date does the three-week estimate assume, and who must confirm that external dependency before we baseline the forecast?",
            "feedback": "Проверяет единственную незафиксированную предпосылку прогноза."
          },
          {
            "id": "ui",
            "text": "Which transfer-confirmation layout should the team use, and could a simpler layout reduce the development part of the three-week estimate?",
            "feedback": "UI не закрывает неопределённую дату внешнего доступа."
          },
          {
            "id": "team",
            "text": "Which developer will own each transfer story, and should we split the approved work into smaller tickets before presenting the three-week estimate?",
            "feedback": "Ёмкость уже учтена; дробление задач не подтверждает dependency."
          }
        ],
        "key": [
          "date"
        ],
        "response": "Stakeholder: “The estimate assumes sandbox access on project day 1. Vendor Operations must confirm that date by Friday; until then report the three weeks as conditional, not a committed release date.”",
        "explain": "Assumption — предпосылка; conditional forecast — условный прогноз. BA не обязан угадывать срок разработки: нужно обнаружить зависимость, без которой estimate нельзя превращать в обязательство."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c2-l10-acceptance-v1",
    "track": "ba",
    "chapter": 2,
    "level": 10,
    "caseId": "s01",
    "format": "acceptance",
    "difficulty": 2,
    "title": "Make “easier to use” measurable without changing the question",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The usability objective is approved: at least 90% completion among a minimum of 20 valid participants following the agreed task. An undersized sample is inconclusive, even when its completion percentage is high. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Minimum valid participants",
            "20"
          ],
          [
            "Minimum completion %",
            "90"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Valid participants",
          "Completed task"
        ],
        "rows": [
          [
            "U1",
            "20",
            "18"
          ],
          [
            "U2",
            "20",
            "17"
          ],
          [
            "U3",
            "10",
            "10"
          ],
          [
            "U4",
            "30",
            "27"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "U1",
            "text": "U1 · Eighteen of twenty valid participants complete the task."
          },
          {
            "id": "U2",
            "text": "U2 · Seventeen of twenty valid participants complete the task."
          },
          {
            "id": "U3",
            "text": "U3 · All ten valid participants complete the task."
          },
          {
            "id": "U4",
            "text": "U4 · Twenty-seven of thirty valid participants complete the task."
          }
        ],
        "right": [
          {
            "id": "sample",
            "text": "Given fewer than the required valid participants, When the study is reviewed, Then collect the remaining sample before judging acceptance."
          },
          {
            "id": "met",
            "text": "Given a sufficient sample meeting the completion threshold, When the study is reviewed, Then accept the stated usability objective for this task."
          },
          {
            "id": "missed",
            "text": "Given a sufficient sample below the completion threshold, When the study is reviewed, Then record the objective as not met and investigate failures."
          }
        ],
        "key": {
          "U1": "met",
          "U2": "missed",
          "U3": "sample",
          "U4": "met"
        },
        "explain": "U1 = 18/20 = 90%, U4 = 27/30 = 90%: предел включён. U2 = 85%, objective не выполнен. U3 даёт 100%, но sample 10 < 20 ещё недостаточен. Completion rate — доля успешных выполнений; acceptance относится к указанной задаче, не ко всему UX."
      }
    ],
    "audit": {
      "model": "usability"
    }
  },
  {
    "id": "ba-c2-l12-process-v1",
    "track": "ba",
    "chapter": 2,
    "level": 12,
    "caseId": "s03",
    "format": "process",
    "difficulty": 2,
    "title": "Generate a payment confirmation without confirming a pending payment",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — A PDF confirmation is available only to the account owner and only for a posted transaction. Ownership is checked first. Generating a document must not change transaction state or turn a pending payment into a completed one. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "request",
            "None"
          ],
          [
            "authorize",
            "request"
          ],
          [
            "state",
            "authorize"
          ],
          [
            "generate",
            "state"
          ],
          [
            "record",
            "generate"
          ],
          [
            "return",
            "record"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Account owner",
            "=",
            "true",
            "Deny the download without exposing the transaction document."
          ],
          [
            "Transaction state",
            "=",
            "posted",
            "Show the non-posted status; generate no payment confirmation."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Account owner",
          "Transaction state"
        ],
        "rows": [
          [
            "T1",
            "true",
            "posted"
          ],
          [
            "T2",
            "false",
            "posted"
          ],
          [
            "T3",
            "true",
            "pending"
          ],
          [
            "T4",
            "false",
            "pending"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "request",
            "text": "Receive the PDF-confirmation request."
          },
          {
            "id": "authorize",
            "text": "Check account ownership."
          },
          {
            "id": "state",
            "text": "Check the authoritative transaction state."
          },
          {
            "id": "generate",
            "text": "Generate the posted-payment confirmation."
          },
          {
            "id": "record",
            "text": "Record document delivery metadata."
          },
          {
            "id": "return",
            "text": "Return the confirmation download."
          }
        ],
        "keys": [
          [
            "request",
            "authorize",
            "state",
            "generate",
            "record",
            "return"
          ]
        ],
        "explain": "Request → authorize → state → generate → record → return. T2/T4 отклоняются до раскрытия состояния; T3 не получает подтверждение неисполненного платежа. Posted — проведённый; ownership — право доступа, а не знание ID транзакции."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "T1",
            "text": "T1 · The owner requests confirmation for a posted payment."
          },
          {
            "id": "T2",
            "text": "T2 · A non-owner requests a posted payment’s confirmation."
          },
          {
            "id": "T3",
            "text": "T3 · The owner requests confirmation while the payment is pending."
          },
          {
            "id": "T4",
            "text": "T4 · A non-owner requests a pending transaction."
          }
        ],
        "right": [
          {
            "id": "denied",
            "text": "Deny the download without exposing the transaction document."
          },
          {
            "id": "pending",
            "text": "Show the non-posted status; generate no payment confirmation."
          },
          {
            "id": "complete",
            "text": "Generate the posted-payment PDF, record delivery and return it."
          }
        ],
        "key": {
          "T1": "complete",
          "T2": "denied",
          "T3": "pending",
          "T4": "denied"
        },
        "explain": "Request → authorize → state → generate → record → return. T2/T4 отклоняются до раскрытия состояния; T3 не получает подтверждение неисполненного платежа. Posted — проведённый; ownership — право доступа, а не знание ID транзакции."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "denied",
        "pending"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c3-l02-question-v1",
    "track": "ba",
    "chapter": 3,
    "level": 2,
    "caseId": "b23",
    "format": "question",
    "difficulty": 3,
    "title": "Discover the actual exception path before drawing the to-be",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — Rita confirmed the standard document-checking steps. Operators mention that incomplete cases sometimes move to a supervisor, but the actual as-is handoff and authority are undocumented. The target automation is not yet designed. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "automation",
            "text": "Which automated document check should replace the supervisor, and should the new system reject incomplete cases before the operator sees them?",
            "feedback": "Это преждевременный to-be, а не описание текущей практики."
          },
          {
            "id": "actual",
            "text": "In the current process, what triggers the supervisor handoff, who may approve the exception, and where is that decision recorded?",
            "feedback": "Устанавливает фактическую exception path и доказательство решения."
          },
          {
            "id": "format",
            "text": "Which notation should we use for the supervisor step, and should the as-is diagram separate customer and operator actions into different swimlanes?",
            "feedback": "Нотация не определяет реальное полномочие и переход."
          }
        ],
        "key": [
          "actual"
        ],
        "response": "Stakeholder: “Today, missing income evidence goes to the duty supervisor. Only that supervisor may approve the exception, and the operator records the decision reference in the case log. Verify the path with two recent cases before baselining it.”",
        "explain": "As-is — как процесс работает сейчас; to-be — согласованное будущее. Не следует незаметно заменять наблюдение проектным решением. Case evidence помогает проверить слова участников."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c3-l04-acceptance-v1",
    "track": "ba",
    "chapter": 3,
    "level": 4,
    "caseId": "b25",
    "format": "acceptance",
    "difficulty": 3,
    "title": "Use the right percentile under the agreed load",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The approved payment-screen NFR requires a valid test at or above the target concurrency and p95 response time no greater than 500 ms. A mean response time does not substitute for p95; an under-load run cannot establish acceptance. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Target concurrent sessions",
            "300"
          ],
          [
            "Maximum p95 ms",
            "500"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Concurrent sessions",
          "p95 ms",
          "Mean ms"
        ],
        "rows": [
          [
            "N1",
            "300",
            "500",
            "200"
          ],
          [
            "N2",
            "300",
            "501",
            "190"
          ],
          [
            "N3",
            "200",
            "300",
            "150"
          ],
          [
            "N4",
            "350",
            "490",
            "250"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "N1",
            "text": "N1 · The target load is reached and p95 is exactly on the limit."
          },
          {
            "id": "N2",
            "text": "N2 · The mean is low but p95 is just over the limit."
          },
          {
            "id": "N3",
            "text": "N3 · A lighter run has an excellent p95."
          },
          {
            "id": "N4",
            "text": "N4 · A higher-load run remains within the p95 limit."
          }
        ],
        "right": [
          {
            "id": "rerun",
            "text": "Given a run below target concurrency, When NFR evidence is reviewed, Then rerun at the agreed load before judging acceptance."
          },
          {
            "id": "pass",
            "text": "Given a valid target-load run at or below the p95 limit, When NFR evidence is reviewed, Then accept this response-time criterion."
          },
          {
            "id": "fail",
            "text": "Given a valid target-load run above the p95 limit, When NFR evidence is reviewed, Then record the response-time criterion as failed."
          }
        ],
        "key": {
          "N1": "pass",
          "N2": "fail",
          "N3": "rerun",
          "N4": "pass"
        },
        "explain": "N1/N4 проходят: load ≥ 300 и p95 ≤ 500 ms. N2 нарушает p95, несмотря на хороший mean. N3 не проверяет целевую нагрузку. Non-functional requirement — требование к качеству работы; percentile и mean описывают разные части распределения."
      }
    ],
    "audit": {
      "model": "nfr"
    }
  },
  {
    "id": "ba-c3-l06-process-v1",
    "track": "ba",
    "chapter": 3,
    "level": 6,
    "caseId": "b27",
    "format": "process",
    "difficulty": 3,
    "title": "Publish traceability for the right requirement baseline",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — Sixty requirements may map to forty tests; counts alone do not prove coverage. Publish a coverage statement only against baseline version 7 and after every unresolved coverage gap is closed or formally disposed of. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "baseline",
            "None"
          ],
          [
            "version",
            "baseline"
          ],
          [
            "link",
            "version"
          ],
          [
            "coverage",
            "link"
          ],
          [
            "approve",
            "coverage"
          ],
          [
            "publish",
            "approve"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Mapping baseline version",
            "=",
            "7",
            "Rebuild the mapping against the approved baseline; publish no coverage claim."
          ],
          [
            "Unresolved coverage gaps",
            "=",
            "0",
            "Resolve or formally dispose of the uncovered requirements before publication."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Mapping baseline version",
          "Unresolved coverage gaps"
        ],
        "rows": [
          [
            "C1",
            "7",
            "0"
          ],
          [
            "C2",
            "6",
            "0"
          ],
          [
            "C3",
            "7",
            "2"
          ],
          [
            "C4",
            "6",
            "3"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "baseline",
            "text": "Select the approved requirement baseline."
          },
          {
            "id": "version",
            "text": "Verify the test mapping uses that baseline version."
          },
          {
            "id": "link",
            "text": "Link requirements to test evidence."
          },
          {
            "id": "coverage",
            "text": "Review unresolved coverage gaps."
          },
          {
            "id": "approve",
            "text": "Record approved gap dispositions."
          },
          {
            "id": "publish",
            "text": "Publish the traceability snapshot."
          }
        ],
        "keys": [
          [
            "baseline",
            "version",
            "link",
            "coverage",
            "approve",
            "publish"
          ]
        ],
        "explain": "Baseline → version → link → coverage → approve → publish. C2/C4 нельзя объявлять coverage текущих требований; C3 требует закрытия или утверждённого решения по gaps. Traceability — прослеживаемость; 40 тестов могут покрывать 60 требований, если связи и доказательства корректны."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "C1",
            "text": "C1 · The mapping uses version 7 and no unresolved gaps remain."
          },
          {
            "id": "C2",
            "text": "C2 · All mapped rows look covered, but they refer to the old baseline."
          },
          {
            "id": "C3",
            "text": "C3 · The current baseline still has two unresolved gaps."
          },
          {
            "id": "C4",
            "text": "C4 · The old baseline also contains unresolved gaps."
          }
        ],
        "right": [
          {
            "id": "stale",
            "text": "Rebuild the mapping against the approved baseline; publish no coverage claim."
          },
          {
            "id": "gaps",
            "text": "Resolve or formally dispose of the uncovered requirements before publication."
          },
          {
            "id": "complete",
            "text": "Publish the versioned mapping with its approved evidence and dispositions."
          }
        ],
        "key": {
          "C1": "complete",
          "C2": "stale",
          "C3": "gaps",
          "C4": "stale"
        },
        "explain": "Baseline → version → link → coverage → approve → publish. C2/C4 нельзя объявлять coverage текущих требований; C3 требует закрытия или утверждённого решения по gaps. Traceability — прослеживаемость; 40 тестов могут покрывать 60 требований, если связи и доказательства корректны."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "stale",
        "gaps"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c3-l08-question-v1",
    "track": "ba",
    "chapter": 3,
    "level": 8,
    "caseId": "b29",
    "format": "question",
    "difficulty": 3,
    "title": "Choose an executive demo’s decision before its feature list",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The ten-minute demo has an approved audience, environment and time slot. Helen has not stated the business decision the demo must support; there are too many functions to show in full. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "priority",
            "text": "Which business decision should executives make after the demo, and which customer outcome would give them evidence for that decision?",
            "feedback": "Определяет цель отбора материала и результат встречи."
          },
          {
            "id": "order",
            "text": "Which of the available feature screens should appear first, and should we show the configuration menu before the customer-facing workflow?",
            "feedback": "Порядок экранов не закрывает отсутствие цели решения."
          },
          {
            "id": "depth",
            "text": "How much technical implementation detail should we include, and should we reserve half the time for architecture questions from the executive audience?",
            "feedback": "Глубина полезна позже, но сначала нужна цель demo."
          }
        ],
        "key": [
          "priority"
        ],
        "response": "Stakeholder: “They must decide whether to fund the limited rollout. Show the customer’s completed loan journey, the measured acceptance evidence and the unresolved rollout risks; leave configuration details in the appendix.”",
        "explain": "Decision-oriented demo — демонстрация под конкретное решение. Outcome — результат для клиента, не количество показанных экранов. Ответ даёт критерий выбора содержания без выдуманного обещания funding."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c3-l10-acceptance-v1",
    "track": "ba",
    "chapter": 3,
    "level": 10,
    "caseId": "s04",
    "format": "acceptance",
    "difficulty": 3,
    "title": "Apply a transfer boundary without overriding compliance",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The approved policy requires SMS for transfers strictly greater than $500. Exactly $500 uses the standard path. A required SMS must be verified before execution; an unavailable channel does not authorize bypass. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "SMS threshold $",
            "500"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Amount $",
          "SMS verified"
        ],
        "rows": [
          [
            "S1",
            "500",
            "false"
          ],
          [
            "S2",
            "500.01",
            "true"
          ],
          [
            "S3",
            "500.01",
            "false"
          ],
          [
            "S4",
            "1200",
            "false"
          ],
          [
            "S5",
            "499.99",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "S1",
            "text": "S1 · Exactly $500 is confirmed without an SMS."
          },
          {
            "id": "S2",
            "text": "S2 · One cent above the threshold has verified SMS."
          },
          {
            "id": "S3",
            "text": "S3 · One cent above the threshold has no verified SMS."
          },
          {
            "id": "S4",
            "text": "S4 · A larger transfer cannot receive the SMS code."
          },
          {
            "id": "S5",
            "text": "S5 · A below-threshold transfer is valid without SMS."
          }
        ],
        "right": [
          {
            "id": "standard",
            "text": "Given an amount at or below the threshold, When the valid transfer is confirmed, Then use the approved standard confirmation path."
          },
          {
            "id": "sms",
            "text": "Given an amount above the threshold and verified SMS, When the valid transfer is confirmed, Then execute after that verification."
          },
          {
            "id": "hold",
            "text": "Given an amount above the threshold without verified SMS, When execution is requested, Then hold execution and offer the approved recovery route."
          }
        ],
        "key": {
          "S1": "standard",
          "S2": "sms",
          "S3": "hold",
          "S4": "hold",
          "S5": "standard"
        },
        "explain": "S1/S5: amount ≤ 500, standard path. S2: amount > 500 и SMS verified. S3/S4 нельзя исполнить в обход обязательного контроля. Strictly greater than — строго больше; recovery route — согласованный путь восстановления, а не отмена требования ради one-tap."
      }
    ],
    "audit": {
      "model": "sms"
    }
  },
  {
    "id": "ba-c3-l12-process-v1",
    "track": "ba",
    "chapter": 3,
    "level": 12,
    "caseId": "s06",
    "format": "process",
    "difficulty": 3,
    "title": "Hand over the tested baseline rather than an unversioned document",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The QA handover must refer to approved specification version 9 and have an available synthetic data pack. A polished overview without those prerequisites is not ready for test execution. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "scope",
            "None"
          ],
          [
            "main",
            "scope"
          ],
          [
            "exceptions",
            "main"
          ],
          [
            "data",
            "exceptions"
          ],
          [
            "review",
            "data"
          ],
          [
            "publish",
            "review"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Specification version",
            "=",
            "9",
            "Align the handover to the approved version before test execution."
          ],
          [
            "Synthetic data available",
            "=",
            "true",
            "Provide the approved synthetic data pack; do not use live customer data."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Specification version",
          "Synthetic data available"
        ],
        "rows": [
          [
            "H1",
            "9",
            "true"
          ],
          [
            "H2",
            "8",
            "true"
          ],
          [
            "H3",
            "9",
            "false"
          ],
          [
            "H4",
            "8",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "scope",
            "text": "Select the versioned handover scope."
          },
          {
            "id": "main",
            "text": "Summarize the successful main journey."
          },
          {
            "id": "exceptions",
            "text": "Describe the bounded exception routes."
          },
          {
            "id": "data",
            "text": "Link the synthetic test-data pack."
          },
          {
            "id": "review",
            "text": "Review the pack with QA."
          },
          {
            "id": "publish",
            "text": "Publish the acknowledged handover reference."
          }
        ],
        "keys": [
          [
            "scope",
            "main",
            "exceptions",
            "data",
            "review",
            "publish"
          ]
        ],
        "explain": "Scope → main → exceptions → data → review → publish. H2/H4 сначала выравнивают version; H3 требует synthetic data, а не production records. Handover — передача контекста и доказательств, не просто отправка файла."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "H1",
            "text": "H1 · The current version and synthetic pack are ready."
          },
          {
            "id": "H2",
            "text": "H2 · The pack is ready but refers to an older specification."
          },
          {
            "id": "H3",
            "text": "H3 · The current specification has no usable synthetic pack."
          },
          {
            "id": "H4",
            "text": "H4 · Both version and data readiness are wrong."
          }
        ],
        "right": [
          {
            "id": "version",
            "text": "Align the handover to the approved version before test execution."
          },
          {
            "id": "data",
            "text": "Provide the approved synthetic data pack; do not use live customer data."
          },
          {
            "id": "complete",
            "text": "Publish the versioned QA-acknowledged handover and its test references."
          }
        ],
        "key": {
          "H1": "complete",
          "H2": "version",
          "H3": "data",
          "H4": "version"
        },
        "explain": "Scope → main → exceptions → data → review → publish. H2/H4 сначала выравнивают version; H3 требует synthetic data, а не production records. Handover — передача контекста и доказательств, не просто отправка файла."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "version",
        "data"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c4-l02-question-v1",
    "track": "ba",
    "chapter": 4,
    "level": 2,
    "caseId": "b32",
    "format": "question",
    "difficulty": 4,
    "title": "Clarify who is affected by a new loan type",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — Student-loan fields, pricing and validation rules are approved for newly created applications. The impact review has no approved answer about existing applications or active loans when the new rules take effect. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "cohort",
            "text": "At the effective date, do these rules apply only to new applications, or must any existing applications or active loans be reassessed?",
            "feedback": "Определяет lifecycle scope и последствия для миграции и тестов."
          },
          {
            "id": "labels",
            "text": "Which label should identify student loans in the customer interface, and should the old loan screens use the same translated name after release?",
            "feedback": "Отображение не решает, какие обязательства пересматриваются."
          },
          {
            "id": "storage",
            "text": "Which database table should store the student-loan flag, and should we add an index before the new validation rules go live?",
            "feedback": "Техническое хранение не определяет применимость правил."
          }
        ],
        "key": [
          "cohort"
        ],
        "response": "Stakeholder: “Apply them only to applications created from 00:00 UTC on December 1. Existing applications and active loans keep their approved rules; any retrospective change requires a separate impact and legal review.”",
        "explain": "Effective date — момент вступления в силу; retrospective change — изменение задним числом. Новая функция может затронуть действующие обязательства, поэтому lifecycle scope нельзя молча считать очевидным."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c4-l04-acceptance-v1",
    "track": "ba",
    "chapter": 4,
    "level": 4,
    "caseId": "b34",
    "format": "acceptance",
    "difficulty": 4,
    "title": "Map legacy statuses without silently activating unknown records",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The mapping is versioned. Legacy codes O and P map to ACTIVE; C maps to CLOSED. A fraud hold overrides these mappings and routes the record to RESTRICTED. An unknown legacy code without a hold must be quarantined, never defaulted to ACTIVE. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Active legacy codes",
            "O,P"
          ],
          [
            "Closed legacy code",
            "C"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Legacy code",
          "Fraud hold"
        ],
        "rows": [
          [
            "M1",
            "O",
            "false"
          ],
          [
            "M2",
            "P",
            "false"
          ],
          [
            "M3",
            "C",
            "false"
          ],
          [
            "M4",
            "X",
            "false"
          ],
          [
            "M5",
            "O",
            "true"
          ],
          [
            "M6",
            "X",
            "true"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "M1",
            "text": "M1 · Legacy O has no fraud hold."
          },
          {
            "id": "M2",
            "text": "M2 · Legacy P has no fraud hold."
          },
          {
            "id": "M3",
            "text": "M3 · Legacy C has no fraud hold."
          },
          {
            "id": "M4",
            "text": "M4 · An unknown code has no fraud hold."
          },
          {
            "id": "M5",
            "text": "M5 · Legacy O has an active fraud hold."
          },
          {
            "id": "M6",
            "text": "M6 · An unknown code also has a fraud hold."
          }
        ],
        "right": [
          {
            "id": "restricted",
            "text": "Given a fraud hold, When a customer is mapped, Then route to RESTRICTED and preserve the source evidence."
          },
          {
            "id": "active",
            "text": "Given an approved active legacy code and no hold, When mapped, Then use ACTIVE with the mapping version recorded."
          },
          {
            "id": "closed",
            "text": "Given the approved closed legacy code and no hold, When mapped, Then use CLOSED with the mapping version recorded."
          },
          {
            "id": "quarantine",
            "text": "Given an unmapped code and no hold, When mapped, Then quarantine for review and create no guessed target status."
          }
        ],
        "key": {
          "M1": "active",
          "M2": "active",
          "M3": "closed",
          "M4": "quarantine",
          "M5": "restricted",
          "M6": "restricted"
        },
        "explain": "M1/M2 → ACTIVE; M3 → CLOSED. M4 нельзя автоматически активировать. Hold имеет приоритет: M5/M6 → RESTRICTED с сохранением source evidence. Many-to-one mapping — несколько исходных значений в одно целевое; quarantine — отдельная проверка без выдуманного значения."
      }
    ],
    "audit": {
      "model": "mapping"
    }
  },
  {
    "id": "ba-c4-l06-process-v1",
    "track": "ba",
    "chapter": 4,
    "level": 6,
    "caseId": "b36",
    "format": "process",
    "difficulty": 4,
    "title": "Review a junior analyst’s draft with independent follow-up work",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — After agreeing the review issues with Zoe, acceptance examples and glossary corrections can be prepared independently. Both must finish before verification and baselining. Critical gaps must be resolved; an unacknowledged review cannot be treated as agreement. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "read",
            "None"
          ],
          [
            "clarify",
            "read"
          ],
          [
            "examples",
            "clarify"
          ],
          [
            "glossary",
            "clarify"
          ],
          [
            "verify",
            "examples, glossary"
          ],
          [
            "baseline",
            "verify"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Author review acknowledged",
            "=",
            "true",
            "Agree the review findings with the author before treating them as resolved."
          ],
          [
            "Unresolved critical gaps",
            "=",
            "0",
            "Resolve the critical gaps; keep the requirement in draft."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Author review acknowledged",
          "Unresolved critical gaps"
        ],
        "rows": [
          [
            "V1",
            "true",
            "0"
          ],
          [
            "V2",
            "false",
            "0"
          ],
          [
            "V3",
            "true",
            "1"
          ],
          [
            "V4",
            "false",
            "2"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "read",
            "text": "Review the agreed requirement goal."
          },
          {
            "id": "clarify",
            "text": "Agree concrete issues with the author."
          },
          {
            "id": "examples",
            "text": "Prepare boundary acceptance examples."
          },
          {
            "id": "glossary",
            "text": "Update the shared terminology."
          },
          {
            "id": "verify",
            "text": "Verify both updates against the goal."
          },
          {
            "id": "baseline",
            "text": "Baseline the reviewed requirement."
          }
        ],
        "keys": [
          [
            "read",
            "clarify",
            "examples",
            "glossary",
            "verify",
            "baseline"
          ],
          [
            "read",
            "clarify",
            "glossary",
            "examples",
            "verify",
            "baseline"
          ]
        ],
        "explain": "Read → clarify → examples/glossary в любом из двух порядков → verify → baseline. Независимые работы не нужно искусственно связывать, но verify ждёт обе. V2/V4 требуют договориться с автором; V3 остаётся draft. Constructive review — конкретная проверка по цели, не оценка личности."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "V1",
            "text": "V1 · Review agreement and critical-gap closure are both complete."
          },
          {
            "id": "V2",
            "text": "V2 · The author has not acknowledged the review, although no gaps are listed."
          },
          {
            "id": "V3",
            "text": "V3 · The author agrees with the review but one critical gap remains."
          },
          {
            "id": "V4",
            "text": "V4 · Neither agreement nor gap closure is complete."
          }
        ],
        "right": [
          {
            "id": "clarify",
            "text": "Agree the review findings with the author before treating them as resolved."
          },
          {
            "id": "gaps",
            "text": "Resolve the critical gaps; keep the requirement in draft."
          },
          {
            "id": "complete",
            "text": "Baseline the verified requirement and its examples and glossary."
          }
        ],
        "key": {
          "V1": "complete",
          "V2": "clarify",
          "V3": "gaps",
          "V4": "clarify"
        },
        "explain": "Read → clarify → examples/glossary в любом из двух порядков → verify → baseline. Независимые работы не нужно искусственно связывать, но verify ждёт обе. V2/V4 требуют договориться с автором; V3 остаётся draft. Constructive review — конкретная проверка по цели, не оценка личности."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "clarify",
        "gaps"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c4-l08-question-v1",
    "track": "ba",
    "chapter": 4,
    "level": 8,
    "caseId": "b38",
    "format": "question",
    "difficulty": 4,
    "title": "Identify whose authority an exception record must preserve",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The audit fix already records actor ID, UTC time, reason and case version. Delegated approvals occur, but the requirement does not say whether the record must preserve the acting approver, the principal who delegated, or both. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "retention",
            "text": "How long should the exception log be retained, and which approved storage tier should hold the older records after the audit window?",
            "feedback": "Retention важен, но не закрывает пробел в личности и полномочии approver."
          },
          {
            "id": "delegation",
            "text": "For a delegated approval, which acting and delegating identities and delegation reference must the evidence preserve so authority can be reconstructed?",
            "feedback": "Определяет недостающую связь полномочий в доказательстве."
          },
          {
            "id": "screen",
            "text": "Which approver name should the operations dashboard display, and should a supervisor be able to filter exceptions by the visible display name?",
            "feedback": "Display name не является полной цепочкой полномочий."
          }
        ],
        "key": [
          "delegation"
        ],
        "response": "Stakeholder: “Record the acting approver ID, the delegating principal ID and the immutable delegation reference valid at that decision time. Never replace the actor with the principal; the audit must reconstruct who acted under whose authority.”",
        "explain": "Delegation — передача полномочий; evidence chain — цепочка доказательств. Наличие имени и времени ещё не доказывает право исключения. Не следует подменять фактического actor руководителем."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c4-l10-acceptance-v1",
    "track": "ba",
    "chapter": 4,
    "level": 10,
    "caseId": "b40",
    "format": "acceptance",
    "difficulty": 4,
    "title": "Replay a payment safely during an incident",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — For a valid authorized replay, an existing request ID with the SAME payload returns its recorded result without another debit. The same ID with a changed payload is a conflict. Missing authorization is checked first. Only a new authorized ID may create one debit. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Idempotency scope",
            "Request ID + payload"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Authorized",
          "ID exists",
          "Payload same"
        ],
        "rows": [
          [
            "I1",
            "true",
            "true",
            "true"
          ],
          [
            "I2",
            "true",
            "true",
            "false"
          ],
          [
            "I3",
            "true",
            "false",
            "false"
          ],
          [
            "I4",
            "false",
            "true",
            "true"
          ],
          [
            "I5",
            "true",
            "true",
            "true"
          ],
          [
            "I6",
            "false",
            "true",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "I1",
            "text": "I1 · An authorized retry uses the existing ID and identical details."
          },
          {
            "id": "I2",
            "text": "I2 · The existing ID is reused with a different amount."
          },
          {
            "id": "I3",
            "text": "I3 · An authorized new ID is submitted."
          },
          {
            "id": "I4",
            "text": "I4 · An identical replay lacks authorization."
          },
          {
            "id": "I5",
            "text": "I5 · Another authorized network retry has identical details."
          },
          {
            "id": "I6",
            "text": "I6 · A changed payload also lacks authorization."
          }
        ],
        "right": [
          {
            "id": "denied",
            "text": "Given authorization is absent, When a replay is requested, Then deny it and create no debit."
          },
          {
            "id": "same",
            "text": "Given an existing ID with an identical payload, When retried with authorization, Then return the recorded result and create no extra debit."
          },
          {
            "id": "conflict",
            "text": "Given an existing ID with a changed payload, When retried with authorization, Then return a conflict and create no extra debit."
          },
          {
            "id": "new",
            "text": "Given a new authorized request ID, When valid payment details are submitted, Then create one debit and record its result."
          }
        ],
        "key": {
          "I1": "same",
          "I2": "conflict",
          "I3": "new",
          "I4": "denied",
          "I5": "same",
          "I6": "denied"
        },
        "explain": "I1/I5 возвращают тот же result; I2 — conflict, не новый debit. I3 создаёт одну новую операцию. I4/I6 отклоняются по authorization до проверки idempotency. Retry — повтор доставки, не разрешение повторно списать деньги; incident recovery не отменяет контракт."
      }
    ],
    "audit": {
      "model": "idempotency"
    }
  },
  {
    "id": "ba-c4-l12-process-v1",
    "track": "ba",
    "chapter": 4,
    "level": 12,
    "caseId": "s08",
    "format": "process",
    "difficulty": 4,
    "title": "Normalize timestamps only after agreeing the wire contract",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The agreed wire object carries epochValue, epochUnit and sourceOffset. epochValue is seconds since the Unix epoch; sourceOffset is required audit metadata and must never shift that UTC instant a second time. Validate the explicit offset metadata, seconds unit and allowed range, then format the validated instant as UTC. Reject missing or wrong-unit input rather than guessing or silently coercing it. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "receive",
            "None"
          ],
          [
            "offset",
            "receive"
          ],
          [
            "unit",
            "offset"
          ],
          [
            "range",
            "unit"
          ],
          [
            "normalize",
            "range"
          ],
          [
            "test",
            "normalize"
          ],
          [
            "publish",
            "test"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Explicit offset",
            "=",
            "true",
            "Return the missing-offset contract error; do not infer local time."
          ],
          [
            "Epoch unit",
            "=",
            "seconds",
            "Return the wrong-unit contract error; do not silently coerce the value."
          ],
          [
            "Range valid",
            "=",
            "true",
            "Return the out-of-range contract error; write no normalized value."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Explicit offset",
          "Epoch unit",
          "Range valid"
        ],
        "rows": [
          [
            "Z1",
            "true",
            "seconds",
            "true"
          ],
          [
            "Z2",
            "false",
            "milliseconds",
            "true"
          ],
          [
            "Z3",
            "true",
            "milliseconds",
            "true"
          ],
          [
            "Z4",
            "true",
            "seconds",
            "false"
          ],
          [
            "Z5",
            "false",
            "seconds",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "receive",
            "text": "Receive the agreed timestamp field."
          },
          {
            "id": "offset",
            "text": "Validate the explicit timezone offset."
          },
          {
            "id": "unit",
            "text": "Validate the declared epoch unit."
          },
          {
            "id": "range",
            "text": "Validate the timestamp range."
          },
          {
            "id": "normalize",
            "text": "Normalize the validated instant to UTC."
          },
          {
            "id": "test",
            "text": "Run the consumer contract tests."
          },
          {
            "id": "publish",
            "text": "Publish the approved interface version."
          }
        ],
        "keys": [
          [
            "receive",
            "offset",
            "unit",
            "range",
            "normalize",
            "test",
            "publish"
          ]
        ],
        "explain": "Receive → offset → unit → range → normalize → test → publish. Z2/Z5 сначала требуют offset; Z3 не допускает неоговорённого преобразования миллисекунд; Z4 отклоняет range. Wire contract — формат передачи; instant — момент времени, не строка с локальной датой. Epoch seconds уже задают UTC instant; sourceOffset здесь — обязательные метаданные, а не повторный временной сдвиг."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "Z1",
            "text": "Z1 · Offset, seconds and range are all valid."
          },
          {
            "id": "Z2",
            "text": "Z2 · A timestamp has no offset and uses milliseconds."
          },
          {
            "id": "Z3",
            "text": "Z3 · The offset is explicit but the epoch unit is milliseconds."
          },
          {
            "id": "Z4",
            "text": "Z4 · Offset and unit pass but the instant is outside the approved range."
          },
          {
            "id": "Z5",
            "text": "Z5 · Both offset and range fail."
          }
        ],
        "right": [
          {
            "id": "offset",
            "text": "Return the missing-offset contract error; do not infer local time."
          },
          {
            "id": "unit",
            "text": "Return the wrong-unit contract error; do not silently coerce the value."
          },
          {
            "id": "range",
            "text": "Return the out-of-range contract error; write no normalized value."
          },
          {
            "id": "complete",
            "text": "Normalize to UTC, verify the contract tests and publish the version."
          }
        ],
        "key": {
          "Z1": "complete",
          "Z2": "offset",
          "Z3": "unit",
          "Z4": "range",
          "Z5": "offset"
        },
        "explain": "Receive → offset → unit → range → normalize → test → publish. Z2/Z5 сначала требуют offset; Z3 не допускает неоговорённого преобразования миллисекунд; Z4 отклоняет range. Wire contract — формат передачи; instant — момент времени, не строка с локальной датой. Epoch seconds уже задают UTC instant; sourceOffset здесь — обязательные метаданные, а не повторный временной сдвиг."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "offset",
        "unit",
        "range"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c5-l02-question-v1",
    "track": "ba",
    "chapter": 5,
    "level": 2,
    "caseId": "b42",
    "format": "question",
    "difficulty": 5,
    "title": "Clarify freshness before choosing real-time or batch delivery",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — Customers want an immediate balance. Read-only display and payment authorization are distinct journeys. The contract has no approved maximum staleness for either; transport technology has not been selected. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "transport",
            "text": "Should balance updates use a push stream or scheduled polling, and which message broker should connect the new core to the app?",
            "feedback": "Технология не задаёт допустимую business freshness."
          },
          {
            "id": "freshness",
            "text": "What maximum balance staleness is acceptable for read-only display versus payment authorization, and how must the app expose stale display data?",
            "feedback": "Уточняет различимые гарантии для двух сценариев."
          },
          {
            "id": "batchsize",
            "text": "How many balances should a fifteen-minute batch contain, and should the API return the previous balance while that batch is still running?",
            "feedback": "Выбирает batch до согласования требуемой свежести."
          }
        ],
        "key": [
          "freshness"
        ],
        "response": "Stakeholder: “Read-only display may lag by at most 30 seconds and must show its as-of time when stale. Payment authorization must use the authoritative available balance at execution; a cached display is never the authorization source.”",
        "explain": "Freshness — актуальность данных; as-of time — момент, к которому относится значение. Real-time — не самостоятельное измеримое требование. Важны отдельные guarantees для display и финансового решения."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c5-l04-acceptance-v1",
    "track": "ba",
    "chapter": 5,
    "level": 4,
    "caseId": "b44",
    "format": "acceptance",
    "difficulty": 5,
    "title": "Quarantine bad migration records instead of inventing data",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — A fraud hold routes to restricted review first. Otherwise missing birth date causes quarantine. A duplicate may be merged only with a verified match reference; an unverified duplicate is quarantined. A complete unique record may migrate. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Missing required field",
            "Birth date"
          ],
          [
            "Merge evidence",
            "Verified match reference"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Fraud hold",
          "Birth date present",
          "Duplicate",
          "Verified match"
        ],
        "rows": [
          [
            "G1",
            "false",
            "true",
            "false",
            "false"
          ],
          [
            "G2",
            "false",
            "false",
            "false",
            "false"
          ],
          [
            "G3",
            "false",
            "true",
            "true",
            "true"
          ],
          [
            "G4",
            "false",
            "true",
            "true",
            "false"
          ],
          [
            "G5",
            "false",
            "false",
            "true",
            "true"
          ],
          [
            "G6",
            "true",
            "false",
            "true",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "G1",
            "text": "G1 · The unique record has all required fields."
          },
          {
            "id": "G2",
            "text": "G2 · A unique record has no birth date."
          },
          {
            "id": "G3",
            "text": "G3 · The complete duplicate has a verified match reference."
          },
          {
            "id": "G4",
            "text": "G4 · The complete duplicate lacks verified matching evidence."
          },
          {
            "id": "G5",
            "text": "G5 · The record lacks birth date even though its duplicate match is verified."
          },
          {
            "id": "G6",
            "text": "G6 · A held record also lacks birth date."
          }
        ],
        "right": [
          {
            "id": "restricted",
            "text": "Given a fraud hold, When migration validates the record, Then route to restricted review and preserve its source evidence."
          },
          {
            "id": "quarantine",
            "text": "Given missing required data or an unverified duplicate, When validated without a hold, Then quarantine the record without fabricated values or automatic merging."
          },
          {
            "id": "merge",
            "text": "Given a complete duplicate with verified match evidence and no hold, When validated, Then merge under the approved reference and retain lineage."
          },
          {
            "id": "migrate",
            "text": "Given a complete unique record without a hold, When validated, Then migrate it with its lineage."
          }
        ],
        "key": {
          "G1": "migrate",
          "G2": "quarantine",
          "G3": "merge",
          "G4": "quarantine",
          "G5": "quarantine",
          "G6": "restricted"
        },
        "explain": "G1 migrate; G3 merge только по verified reference. G2/G4/G5 — quarantine, без придуманной даты и автоматического merge. G6 сначала restricted review. Lineage — происхождение записи; remediation — исправление с владельцем, а не искусственное улучшение процента успешной миграции."
      }
    ],
    "audit": {
      "model": "migration"
    }
  },
  {
    "id": "ba-c5-l06-process-v1",
    "track": "ba",
    "chapter": 5,
    "level": 6,
    "caseId": "b46",
    "format": "process",
    "difficulty": 5,
    "title": "Reconcile parallel-run totals before a financial sign-off",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — After selecting the same snapshot population, cutoff verification and currency verification are independent. Both precede reconciliation. Publication requires matched scope and zero UNRESOLVED variance; a small percentage does not waive financial review. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "snapshot",
            "None"
          ],
          [
            "cutoff",
            "snapshot"
          ],
          [
            "currency",
            "snapshot"
          ],
          [
            "reconcile",
            "cutoff, currency"
          ],
          [
            "resolve",
            "reconcile"
          ],
          [
            "sign",
            "resolve"
          ],
          [
            "publish",
            "sign"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Scope aligned",
            "=",
            "true",
            "Align cutoff, population and currency; publish no like-for-like reconciliation claim."
          ],
          [
            "Unresolved variance $",
            "=",
            "0",
            "Investigate or obtain an authorized disposition for the variance before sign-off."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Scope aligned",
          "Unresolved variance $"
        ],
        "rows": [
          [
            "F1",
            "true",
            "0"
          ],
          [
            "F2",
            "false",
            "0"
          ],
          [
            "F3",
            "true",
            "12400"
          ],
          [
            "F4",
            "false",
            "12400"
          ],
          [
            "F5",
            "true",
            "1"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "snapshot",
            "text": "Select the common snapshot population."
          },
          {
            "id": "cutoff",
            "text": "Verify the same accounting cutoff."
          },
          {
            "id": "currency",
            "text": "Verify the same currency basis."
          },
          {
            "id": "reconcile",
            "text": "Reconcile transactions and totals."
          },
          {
            "id": "resolve",
            "text": "Resolve or approve each exception with finance."
          },
          {
            "id": "sign",
            "text": "Obtain the financial sign-off."
          },
          {
            "id": "publish",
            "text": "Publish the signed reconciliation result."
          }
        ],
        "keys": [
          [
            "snapshot",
            "cutoff",
            "currency",
            "reconcile",
            "resolve",
            "sign",
            "publish"
          ],
          [
            "snapshot",
            "currency",
            "cutoff",
            "reconcile",
            "resolve",
            "sign",
            "publish"
          ]
        ],
        "explain": "Snapshot → cutoff/currency в любом порядке → reconcile → resolve → sign → publish. $12,400 / $8m = 0.155%, но размер сам по себе не разрешает расхождение. Даже F5 требует disposition. Like-for-like — сопоставимый scope; unresolved не равно заранее разрешённой tolerance."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "F1",
            "text": "F1 · Scope aligns and no unresolved difference remains."
          },
          {
            "id": "F2",
            "text": "F2 · The totals match numerically but use different cutoffs."
          },
          {
            "id": "F3",
            "text": "F3 · Aligned totals retain the unexplained $12,400 difference."
          },
          {
            "id": "F4",
            "text": "F4 · Both scope and unresolved variance are wrong."
          },
          {
            "id": "F5",
            "text": "F5 · A one-dollar difference still lacks an authorized disposition."
          }
        ],
        "right": [
          {
            "id": "scope",
            "text": "Align cutoff, population and currency; publish no like-for-like reconciliation claim."
          },
          {
            "id": "variance",
            "text": "Investigate or obtain an authorized disposition for the variance before sign-off."
          },
          {
            "id": "complete",
            "text": "Obtain finance sign-off and publish the reconciled result with its evidence."
          }
        ],
        "key": {
          "F1": "complete",
          "F2": "scope",
          "F3": "variance",
          "F4": "scope",
          "F5": "variance"
        },
        "explain": "Snapshot → cutoff/currency в любом порядке → reconcile → resolve → sign → publish. $12,400 / $8m = 0.155%, но размер сам по себе не разрешает расхождение. Даже F5 требует disposition. Like-for-like — сопоставимый scope; unresolved не равно заранее разрешённой tolerance."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "scope",
        "variance"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c5-l08-question-v1",
    "track": "ba",
    "chapter": 5,
    "level": 8,
    "caseId": "b48",
    "format": "question",
    "difficulty": 5,
    "title": "Specify representative synthetic data without copying customers",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — Live customer data is prohibited in the test environment. A synthetic-data tool and the schema are approved, but no one has specified which relationships and edge cases the end-to-end pack must preserve. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "vendor",
            "text": "Which synthetic-data vendor should generate the pack, and should we run its default template against every table before the test starts?",
            "feedback": "Инструмент уже одобрен; default template не определяет coverage."
          },
          {
            "id": "mask",
            "text": "Which customer identifiers should we mask in a production copy, and could we retain the real transaction links to make the tests more realistic?",
            "feedback": "Противоречит запрету live customer data; masking не создаёт разрешения."
          },
          {
            "id": "coverage",
            "text": "Which cross-record relationships, boundary values and failure cases must the synthetic pack preserve to support the agreed end-to-end tests?",
            "feedback": "Определяет представительские свойства без переноса PII."
          }
        ],
        "key": [
          "coverage"
        ],
        "response": "Stakeholder: “Preserve customer-to-account-to-transaction links, joint-account ownership, duplicate-ID retries and missing-field rejection cases using wholly synthetic identities. QA must review that coverage before execution; do not import production records.”",
        "explain": "Representative — воспроизводящий нужные свойства, не копия конкретных людей. Referential integrity — согласованность связей. Synthetic data должен поддерживать проверяемые сценарии и запрет на PII одновременно."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c5-l10-acceptance-v1",
    "track": "ba",
    "chapter": 5,
    "level": 10,
    "caseId": "b50",
    "format": "acceptance",
    "difficulty": 5,
    "title": "Check throughput without hiding an invalid observation window",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The approved salary-day criterion requires at least 300 TPS for at least 30 measured minutes, p99 no more than 800 ms and zero lost payments. Insufficient load or duration is inconclusive; once the run is valid, any quality breach fails it. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Minimum TPS",
            "300"
          ],
          [
            "Minimum measured minutes",
            "30"
          ],
          [
            "Maximum p99 ms",
            "800"
          ],
          [
            "Maximum lost payments",
            "0"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "TPS",
          "Minutes",
          "p99 ms",
          "Lost payments"
        ],
        "rows": [
          [
            "P1",
            "300",
            "30",
            "800",
            "0"
          ],
          [
            "P2",
            "320",
            "30",
            "700",
            "1"
          ],
          [
            "P3",
            "290",
            "30",
            "600",
            "0"
          ],
          [
            "P4",
            "300",
            "15",
            "600",
            "0"
          ],
          [
            "P5",
            "300",
            "30",
            "801",
            "0"
          ],
          [
            "P6",
            "350",
            "40",
            "790",
            "0"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "P1",
            "text": "P1 · The full window meets the exact load and latency limits without loss."
          },
          {
            "id": "P2",
            "text": "P2 · The full run is fast but one payment is lost."
          },
          {
            "id": "P3",
            "text": "P3 · The run is fast but below the required throughput."
          },
          {
            "id": "P4",
            "text": "P4 · The target throughput was measured for only half the window."
          },
          {
            "id": "P5",
            "text": "P5 · The full run exceeds the latency limit by one millisecond."
          },
          {
            "id": "P6",
            "text": "P6 · A higher-throughput full run stays within quality limits."
          }
        ],
        "right": [
          {
            "id": "incomplete",
            "text": "Given the target load or window is incomplete, When the run is reviewed, Then complete a valid target-condition run before acceptance."
          },
          {
            "id": "pass",
            "text": "Given a complete target-condition run within latency and loss limits, When reviewed, Then accept the stated salary-day criterion."
          },
          {
            "id": "fail",
            "text": "Given a complete target-condition run breaching latency or payment-loss limits, When reviewed, Then reject the criterion and investigate the breach."
          }
        ],
        "key": {
          "P1": "pass",
          "P2": "fail",
          "P3": "incomplete",
          "P4": "incomplete",
          "P5": "fail",
          "P6": "pass"
        },
        "explain": "P1/P6 проходят все условия. P2 теряет платёж; P5 нарушает p99. P3/P4 не дают полного target-condition evidence. TPS — пропускная способность, не число активных пользователей. Inconclusive run не подтверждает качество и не даёт разрешения на запуск."
      }
    ],
    "audit": {
      "model": "throughput"
    }
  },
  {
    "id": "ba-c5-l12-process-v1",
    "track": "ba",
    "chapter": 5,
    "level": 12,
    "caseId": "s10",
    "format": "process",
    "difficulty": 5,
    "title": "Teach an interface contract as a controlled request flow",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The training API accepts authenticated requests with a positive amount and currency USD. Authentication is checked before business validation; every accepted request gets a persisted result and trace reference. This is the approved training contract, not a bank-wide API policy. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "receive",
            "None"
          ],
          [
            "auth",
            "receive"
          ],
          [
            "schema",
            "auth"
          ],
          [
            "business",
            "schema"
          ],
          [
            "persist",
            "business"
          ],
          [
            "trace",
            "persist"
          ],
          [
            "respond",
            "trace"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Authenticated",
            "=",
            "true",
            "Return the authentication error; persist no accepted request."
          ],
          [
            "Amount $",
            ">",
            "0",
            "Return the amount validation error; persist no accepted request."
          ],
          [
            "Currency",
            "=",
            "USD",
            "Return the unsupported-currency error; persist no accepted request."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Authenticated",
          "Amount $",
          "Currency"
        ],
        "rows": [
          [
            "A1",
            "true",
            "1",
            "USD"
          ],
          [
            "A2",
            "false",
            "0",
            "EUR"
          ],
          [
            "A3",
            "true",
            "0",
            "USD"
          ],
          [
            "A4",
            "true",
            "5",
            "EUR"
          ],
          [
            "A5",
            "true",
            "-1",
            "EUR"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "receive",
            "text": "Receive the interface request."
          },
          {
            "id": "auth",
            "text": "Authenticate the caller."
          },
          {
            "id": "schema",
            "text": "Validate the request schema."
          },
          {
            "id": "business",
            "text": "Validate amount and currency."
          },
          {
            "id": "persist",
            "text": "Persist the accepted request result."
          },
          {
            "id": "trace",
            "text": "Record the trace reference."
          },
          {
            "id": "respond",
            "text": "Return the recorded contract response."
          }
        ],
        "keys": [
          [
            "receive",
            "auth",
            "schema",
            "business",
            "persist",
            "trace",
            "respond"
          ]
        ],
        "explain": "Receive → auth → schema → business → persist → trace → respond. A2 сначала authentication; A3/A5 сначала amount > 0; A4 — currency. Interface contract — обязательства сторон, а не только список полей. Trace reference связывает запрос и результат для разбора."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "A1",
            "text": "A1 · An authenticated USD request has a positive amount."
          },
          {
            "id": "A2",
            "text": "A2 · An unauthenticated request also has invalid business fields."
          },
          {
            "id": "A3",
            "text": "A3 · An authenticated USD request has exactly zero amount."
          },
          {
            "id": "A4",
            "text": "A4 · The positive authenticated request uses EUR."
          },
          {
            "id": "A5",
            "text": "A5 · Both business fields fail after authentication."
          }
        ],
        "right": [
          {
            "id": "auth",
            "text": "Return the authentication error; persist no accepted request."
          },
          {
            "id": "amount",
            "text": "Return the amount validation error; persist no accepted request."
          },
          {
            "id": "currency",
            "text": "Return the unsupported-currency error; persist no accepted request."
          },
          {
            "id": "complete",
            "text": "Persist the accepted result, record its trace and return the response."
          }
        ],
        "key": {
          "A1": "complete",
          "A2": "auth",
          "A3": "amount",
          "A4": "currency",
          "A5": "amount"
        },
        "explain": "Receive → auth → schema → business → persist → trace → respond. A2 сначала authentication; A3/A5 сначала amount > 0; A4 — currency. Interface contract — обязательства сторон, а не только список полей. Trace reference связывает запрос и результат для разбора."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "auth",
        "amount",
        "currency"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c6-l02-question-v1",
    "track": "ba",
    "chapter": 6,
    "level": 2,
    "caseId": "b52",
    "format": "question",
    "difficulty": 6,
    "title": "Define the capability gap before comparing two hires",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — Two approved BA positions must support the next six months of banking change. The applicant pool is known, but the priority outcomes and minimum capability coverage across the pair have not been agreed. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "coverage",
            "text": "Which delivery outcomes must these two hires cover, and which banking-analysis and interface skills must be present across the pair before we rank candidates?",
            "feedback": "Сначала определяет capability coverage для двух ролей."
          },
          {
            "id": "salary",
            "text": "Which of the two strongest candidates should receive the higher salary, and could we use the technical candidate’s offer to negotiate the banking specialist’s package?",
            "feedback": "Компенсация не определяет требуемое покрытие задач."
          },
          {
            "id": "tenure",
            "text": "How many years of banking experience should each candidate have, and should the same tenure threshold replace a practical interface assessment for both roles?",
            "feedback": "Стаж не заменяет доказанную способность выполнить нужные outcomes."
          }
        ],
        "key": [
          "coverage"
        ],
        "response": "Stakeholder: “One role must own regulated loan discovery and traceability; the other must own migration/interface contracts. Both need stakeholder clarification and evidence-based acceptance. Assess the complementary skills with practical cases; do not require identical backgrounds.”",
        "explain": "Capability coverage — покрытие необходимых компетенций; complementary — взаимодополняющий. Не нужно считать опыт в банке или API универсальным единственным критерием для обеих вакансий."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c6-l04-acceptance-v1",
    "track": "ba",
    "chapter": 6,
    "level": 4,
    "caseId": "b54",
    "format": "acceptance",
    "difficulty": 6,
    "title": "Accept a coaching review only with sufficient, protected evidence",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The approved coaching review is not an automatic employment decision. Confidential personal details must be excluded from the review pack first. A conclusion needs at least four sampled deliverables; quality is met at 95% criterion coverage or higher. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Minimum sampled deliverables",
            "4"
          ],
          [
            "Minimum criterion coverage %",
            "95"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Personal details included",
          "Sampled deliverables",
          "Criterion coverage %"
        ],
        "rows": [
          [
            "R1",
            "false",
            "4",
            "95"
          ],
          [
            "R2",
            "false",
            "5",
            "94"
          ],
          [
            "R3",
            "false",
            "2",
            "100"
          ],
          [
            "R4",
            "true",
            "4",
            "99"
          ],
          [
            "R5",
            "false",
            "6",
            "97"
          ],
          [
            "R6",
            "true",
            "1",
            "90"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "R1",
            "text": "R1 · The protected sample meets both exact boundaries."
          },
          {
            "id": "R2",
            "text": "R2 · A protected sufficient sample is below the quality threshold."
          },
          {
            "id": "R3",
            "text": "R3 · The protected pack has only two excellent deliverables."
          },
          {
            "id": "R4",
            "text": "R4 · The apparently good pack includes personal information."
          },
          {
            "id": "R5",
            "text": "R5 · A protected larger sample exceeds the quality threshold."
          },
          {
            "id": "R6",
            "text": "R6 · An insufficient sample also contains personal information."
          }
        ],
        "right": [
          {
            "id": "privacy",
            "text": "Given personal details remain in the review pack, When publication is requested, Then restrict the pack and remove those details before any review conclusion is shared."
          },
          {
            "id": "sample",
            "text": "Given a protected pack with insufficient sampled work, When reviewed, Then gather the agreed sample before judging the improvement objective."
          },
          {
            "id": "met",
            "text": "Given a protected sufficient sample meeting the quality threshold, When reviewed, Then record the coaching objective as met without implying an employment decision."
          },
          {
            "id": "followup",
            "text": "Given a protected sufficient sample below the threshold, When reviewed, Then agree evidence-based coaching follow-up rather than an automatic personnel action."
          }
        ],
        "key": {
          "R1": "met",
          "R2": "followup",
          "R3": "sample",
          "R4": "privacy",
          "R5": "met",
          "R6": "privacy"
        },
        "explain": "R4/R6 сначала требуют защиты информации. R3 не даёт достаточной выборки. R1/R5 подтверждают только coaching objective; R2 требует follow-up. Evidence-based review — оценка работы по доказательствам; личные обстоятельства не должны попадать в общий статус или автоматически определять кадровое решение."
      }
    ],
    "audit": {
      "model": "coaching"
    }
  },
  {
    "id": "ba-c6-l06-process-v1",
    "track": "ba",
    "chapter": 6,
    "level": 6,
    "caseId": "b56",
    "format": "process",
    "difficulty": 6,
    "title": "Keep the minimum sufficient evidence in an agile change",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The agreed operating policy permits short artifacts, but requires regulated traceability and applicable privacy review before baselining. Removing a long document never waives those obligations; choose the smallest record that still preserves them. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "intake",
            "None"
          ],
          [
            "impact",
            "intake"
          ],
          [
            "record",
            "impact"
          ],
          [
            "peer",
            "record"
          ],
          [
            "link",
            "peer"
          ],
          [
            "approve",
            "link"
          ],
          [
            "publish",
            "approve"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Required traceability complete",
            "=",
            "true",
            "Restore the required requirement-to-control evidence before baselining."
          ],
          [
            "Applicable privacy review complete",
            "=",
            "true",
            "Complete the applicable privacy review before baselining."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Required traceability complete",
          "Applicable privacy review complete"
        ],
        "rows": [
          [
            "B1",
            "true",
            "true"
          ],
          [
            "B2",
            "false",
            "true"
          ],
          [
            "B3",
            "true",
            "false"
          ],
          [
            "B4",
            "false",
            "false"
          ],
          [
            "B5",
            "true",
            "true"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "intake",
            "text": "Register the change and its purpose."
          },
          {
            "id": "impact",
            "text": "Classify its regulated and data impacts."
          },
          {
            "id": "record",
            "text": "Select the minimum sufficient evidence record."
          },
          {
            "id": "peer",
            "text": "Peer-review the scoped requirements."
          },
          {
            "id": "link",
            "text": "Link acceptance and control evidence."
          },
          {
            "id": "approve",
            "text": "Obtain the required approvals."
          },
          {
            "id": "publish",
            "text": "Publish the versioned baseline."
          }
        ],
        "keys": [
          [
            "intake",
            "impact",
            "record",
            "peer",
            "link",
            "approve",
            "publish"
          ]
        ],
        "explain": "Intake → impact → record → peer → link → approve → publish. B1 и B5 могут пройти: длина документа не является критерием. B2/B4 сначала восстанавливают traceability; B3 — privacy review. Minimum sufficient evidence — минимально достаточное доказательство, а не отсутствие документации."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "B1",
            "text": "B1 · The short artifact retains both required evidence sets."
          },
          {
            "id": "B2",
            "text": "B2 · A polished short story lacks mandatory traceability."
          },
          {
            "id": "B3",
            "text": "B3 · Traceability is complete but applicable privacy review is missing."
          },
          {
            "id": "B4",
            "text": "B4 · Both mandatory evidence sets are absent."
          },
          {
            "id": "B5",
            "text": "B5 · A longer record also preserves both required evidence sets."
          }
        ],
        "right": [
          {
            "id": "trace",
            "text": "Restore the required requirement-to-control evidence before baselining."
          },
          {
            "id": "privacy",
            "text": "Complete the applicable privacy review before baselining."
          },
          {
            "id": "complete",
            "text": "Approve and publish the smallest record that retains the required evidence."
          }
        ],
        "key": {
          "B1": "complete",
          "B2": "trace",
          "B3": "privacy",
          "B4": "trace",
          "B5": "complete"
        },
        "explain": "Intake → impact → record → peer → link → approve → publish. B1 и B5 могут пройти: длина документа не является критерием. B2/B4 сначала восстанавливают traceability; B3 — privacy review. Minimum sufficient evidence — минимально достаточное доказательство, а не отсутствие документации."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "trace",
        "privacy"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c6-l08-question-v1",
    "track": "ba",
    "chapter": 6,
    "level": 8,
    "caseId": "b58",
    "format": "question",
    "difficulty": 6,
    "title": "Clarify the permitted data boundary for an AI drafting pilot",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — An AI requirements pilot has an owner, review step and success measure. Documents contain confidential bank information, but the policy has not mapped data classifications to approved workspaces and retention terms. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "speed",
            "text": "Which drafting task should we time first, and should the pilot compare the same analyst’s speed before and after using the assistant?",
            "feedback": "Метод измерения не разрешает обработку confidential data."
          },
          {
            "id": "style",
            "text": "Which requirement template should the assistant follow, and should reviewers score tone separately from acceptance-criteria completeness during the pilot?",
            "feedback": "Стиль не закрывает границу разрешённой обработки."
          },
          {
            "id": "boundary",
            "text": "Which data classifications may enter which approved workspace under the agreed processing and retention terms before any bank content is uploaded?",
            "feedback": "Уточняет разрешённую data boundary до фактической передачи."
          }
        ],
        "key": [
          "boundary"
        ],
        "response": "Stakeholder: “Only approved synthetic or public material may enter the pilot workspace. Confidential bank content stays outside until Security and Legal approve that classification, processing region and retention contract; human review still applies to every draft.”",
        "explain": "Processing boundary — граница обработки; retention — срок хранения. Human review не легализует передачу запрещённых данных. Ответ ограничивает pilot сейчас, не объявляет любой AI-инструмент универсально безопасным."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c6-l10-acceptance-v1",
    "track": "ba",
    "chapter": 6,
    "level": 10,
    "caseId": "b60",
    "format": "acceptance",
    "difficulty": 6,
    "title": "Publish a coverage metric with a valid denominator",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The approved metric pack must exclude personal information and use a verified current-baseline denominator. Coverage is accepted only at or above 90% linked requirements among in-scope requirements; raw counts cannot replace the ratio. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Minimum linked coverage %",
            "90"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Personal information",
          "Denominator verified",
          "In-scope requirements",
          "Linked requirements"
        ],
        "rows": [
          [
            "K1",
            "false",
            "true",
            "100",
            "90"
          ],
          [
            "K2",
            "false",
            "true",
            "100",
            "89"
          ],
          [
            "K3",
            "false",
            "false",
            "80",
            "80"
          ],
          [
            "K4",
            "true",
            "true",
            "100",
            "100"
          ],
          [
            "K5",
            "false",
            "true",
            "50",
            "45"
          ],
          [
            "K6",
            "true",
            "false",
            "80",
            "79"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "K1",
            "text": "K1 · The verified protected pack links 90 of 100 in-scope requirements."
          },
          {
            "id": "K2",
            "text": "K2 · The verified protected pack links 89 of 100."
          },
          {
            "id": "K3",
            "text": "K3 · All 80 rows are linked but the denominator definition is unverified."
          },
          {
            "id": "K4",
            "text": "K4 · The 100% pack contains personal information."
          },
          {
            "id": "K5",
            "text": "K5 · The verified protected pack links 45 of 50."
          },
          {
            "id": "K6",
            "text": "K6 · The pack has neither a verified denominator nor privacy protection."
          }
        ],
        "right": [
          {
            "id": "privacy",
            "text": "Given personal information remains in the pack, When publication is requested, Then restrict and redact it before publication."
          },
          {
            "id": "definition",
            "text": "Given the denominator or baseline definition is unverified, When reviewed, Then reconcile the metric definition before publishing a coverage conclusion."
          },
          {
            "id": "met",
            "text": "Given a protected valid denominator meeting the coverage threshold, When reviewed, Then publish the bounded coverage result with its baseline."
          },
          {
            "id": "gap",
            "text": "Given a protected valid denominator below the threshold, When reviewed, Then publish the coverage gap and assign follow-up rather than mark the objective met."
          }
        ],
        "key": {
          "K1": "met",
          "K2": "gap",
          "K3": "definition",
          "K4": "privacy",
          "K5": "met",
          "K6": "privacy"
        },
        "explain": "K1 = 90/100 и K5 = 45/50 — 90%, оба проходят. K2 даёт 89%. K3 нельзя объявить coverage текущей baseline, несмотря на 100% строк. K4/K6 сначала требуют privacy protection. Denominator — знаменатель; metric pack не должен подменять качество количеством документов."
      }
    ],
    "audit": {
      "model": "metric"
    }
  },
  {
    "id": "ba-c6-l12-process-v1",
    "track": "ba",
    "chapter": 6,
    "level": 12,
    "caseId": "s12",
    "format": "process",
    "difficulty": 6,
    "title": "Prove a successor’s readiness instead of counting handover files",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — After naming the successor, access review and handover planning are independent. Both precede shadowing. Ownership transfers only after authorized access, a passed reverse-shadow exercise and the successor’s explicit acceptance. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "map",
            "None"
          ],
          [
            "name",
            "map"
          ],
          [
            "access",
            "name"
          ],
          [
            "plan",
            "name"
          ],
          [
            "shadow",
            "access, plan"
          ],
          [
            "reverse",
            "shadow"
          ],
          [
            "accept",
            "reverse"
          ],
          [
            "archive",
            "accept"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Access authorized",
            "=",
            "true",
            "Resolve authorized access before relying on successor coverage."
          ],
          [
            "Reverse-shadow passed",
            "=",
            "true",
            "Repeat the supported successor-led exercise; do not declare readiness yet."
          ],
          [
            "Ownership accepted",
            "=",
            "true",
            "Obtain explicit ownership acceptance before closing the handover."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Access authorized",
          "Reverse-shadow passed",
          "Ownership accepted"
        ],
        "rows": [
          [
            "J1",
            "true",
            "true",
            "true"
          ],
          [
            "J2",
            "false",
            "true",
            "true"
          ],
          [
            "J3",
            "true",
            "false",
            "true"
          ],
          [
            "J4",
            "true",
            "true",
            "false"
          ],
          [
            "J5",
            "false",
            "false",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "map",
            "text": "Map the critical knowledge and accountabilities."
          },
          {
            "id": "name",
            "text": "Name the accountable successor."
          },
          {
            "id": "access",
            "text": "Review the successor access rights."
          },
          {
            "id": "plan",
            "text": "Prepare the bounded handover plan."
          },
          {
            "id": "shadow",
            "text": "Run the planned shadowing sessions."
          },
          {
            "id": "reverse",
            "text": "Run the successor-led reverse-shadow exercise."
          },
          {
            "id": "accept",
            "text": "Record explicit ownership acceptance."
          },
          {
            "id": "archive",
            "text": "Archive the evidence-backed handover."
          }
        ],
        "keys": [
          [
            "map",
            "name",
            "access",
            "plan",
            "shadow",
            "reverse",
            "accept",
            "archive"
          ],
          [
            "map",
            "name",
            "plan",
            "access",
            "shadow",
            "reverse",
            "accept",
            "archive"
          ]
        ],
        "explain": "Map → name → access/plan в любом порядке → shadow → reverse → accept → archive. J2/J5 сначала access, J3 — практика, J4 — explicit acceptance. Reverse shadowing — преемник выполняет работу при наблюдении наставника. Наличие файлов само по себе не доказывает continuity."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "J1",
            "text": "J1 · Access, demonstrated performance and ownership acceptance are all ready."
          },
          {
            "id": "J2",
            "text": "J2 · A completed file pack has no authorized successor access."
          },
          {
            "id": "J3",
            "text": "J3 · Access exists but the successor-led exercise fails."
          },
          {
            "id": "J4",
            "text": "J4 · The exercise passes but the successor has not accepted ownership."
          },
          {
            "id": "J5",
            "text": "J5 · Both access and exercise are incomplete."
          }
        ],
        "right": [
          {
            "id": "access",
            "text": "Resolve authorized access before relying on successor coverage."
          },
          {
            "id": "practice",
            "text": "Repeat the supported successor-led exercise; do not declare readiness yet."
          },
          {
            "id": "owner",
            "text": "Obtain explicit ownership acceptance before closing the handover."
          },
          {
            "id": "complete",
            "text": "Record and archive the proven ownership transfer and its evidence."
          }
        ],
        "key": {
          "J1": "complete",
          "J2": "access",
          "J3": "practice",
          "J4": "owner",
          "J5": "access"
        },
        "explain": "Map → name → access/plan в любом порядке → shadow → reverse → accept → archive. J2/J5 сначала access, J3 — практика, J4 — explicit acceptance. Reverse shadowing — преемник выполняет работу при наблюдении наставника. Наличие файлов само по себе не доказывает continuity."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "access",
        "practice",
        "owner"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c7-l02-question-v1",
    "track": "ba",
    "chapter": 7,
    "level": 2,
    "caseId": "b62",
    "format": "question",
    "difficulty": 7,
    "title": "Define the regulator’s evidence population before collecting screenshots",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The regulator asks for twelve months of core-system change control evidence. Records exist in several systems, but the authoritative population, emergency-change coverage and exact period cutoff have not been confirmed. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "population",
            "text": "Which systems, emergency changes and exact cutoff define the twelve-month population, and which authoritative register must the evidence reconcile to?",
            "feedback": "Устанавливает полноту доказательств и знаменатель проверки."
          },
          {
            "id": "format",
            "text": "Which chart style should summarize the twelve months, and should we group the collected screenshots by delivery team or by approval owner?",
            "feedback": "Красивое представление не доказывает полноту population."
          },
          {
            "id": "sample",
            "text": "Which successful releases should we showcase first, and may we omit emergency changes to keep the evidence pack concise for the regulator?",
            "feedback": "Выбор успешных примеров без согласованного scope скрывает контрольные исключения."
          }
        ],
        "key": [
          "population"
        ],
        "response": "Stakeholder: “Cover all production core-system changes, including emergency changes, from November 1, 2025 at 00:00 UTC up to, but not including, November 1, 2026 at 00:00 UTC. Reconcile to the signed change register and retain missing-evidence exceptions with named owners; do not claim complete coverage from selected screenshots.”",
        "explain": "Evidence population — полный набор объектов проверки; reconcile — сверить с источником. Отобранные удачные releases не подтверждают control effectiveness всей системы за год. Half-open period включает начало и исключает конец: записи с долями секунды перед границей не теряются."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c7-l04-acceptance-v1",
    "track": "ba",
    "chapter": 7,
    "level": 4,
    "caseId": "b64",
    "format": "acceptance",
    "difficulty": 7,
    "title": "Gate a lending partnership without trading controls for revenue",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The approved limited-pilot rule checks withdrawn authorization first, then requires current licence/control evidence no older than 30 days and exposure no greater than 1,000 customers. Revenue potential does not waive either gate. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Maximum evidence age days",
            "30"
          ],
          [
            "Maximum pilot customers",
            "1000"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Authorization withdrawn",
          "Evidence verified",
          "Evidence age days",
          "Pilot customers"
        ],
        "rows": [
          [
            "L1",
            "false",
            "true",
            "30",
            "1000"
          ],
          [
            "L2",
            "false",
            "true",
            "31",
            "500"
          ],
          [
            "L3",
            "false",
            "true",
            "10",
            "1001"
          ],
          [
            "L4",
            "true",
            "true",
            "1",
            "100"
          ],
          [
            "L5",
            "false",
            "false",
            "1",
            "100"
          ],
          [
            "L6",
            "false",
            "true",
            "20",
            "700"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "L1",
            "text": "L1 · Current evidence and exposure both sit exactly on the limits."
          },
          {
            "id": "L2",
            "text": "L2 · Evidence is one day too old, despite low exposure."
          },
          {
            "id": "L3",
            "text": "L3 · Fresh evidence supports one customer above the cap."
          },
          {
            "id": "L4",
            "text": "L4 · Authorization is withdrawn although evidence is fresh."
          },
          {
            "id": "L5",
            "text": "L5 · The evidence is recent but has not been verified."
          },
          {
            "id": "L6",
            "text": "L6 · A smaller authorized cohort has verified current evidence."
          }
        ],
        "right": [
          {
            "id": "stop",
            "text": "Given authorization is withdrawn, When pilot activation is requested, Then stop activation regardless of evidence freshness or revenue."
          },
          {
            "id": "evidence",
            "text": "Given authorization remains but licence/control evidence is absent or stale, When activation is requested, Then obtain current verified evidence before activation."
          },
          {
            "id": "limit",
            "text": "Given authorization and current evidence but exposure exceeds the approved cap, When activation is requested, Then reduce scope or obtain a separately authorized cap change."
          },
          {
            "id": "pilot",
            "text": "Given authorization, current evidence and bounded exposure, When activation is requested, Then permit only the approved limited pilot with ongoing obligations."
          }
        ],
        "key": {
          "L1": "pilot",
          "L2": "evidence",
          "L3": "limit",
          "L4": "stop",
          "L5": "evidence",
          "L6": "pilot"
        },
        "explain": "L1/L6 разрешают только bounded pilot. L2/L5 требуют evidence; L3 превышает 1,000; L4 останавливает activation раньше всех остальных условий. Licensed partnership — партнёрство с распределёнными обязательствами; ожидаемые $10m не заменяют регуляторное разрешение."
      }
    ],
    "audit": {
      "model": "partnership"
    }
  },
  {
    "id": "ba-c7-l06-process-v1",
    "track": "ba",
    "chapter": 7,
    "level": 6,
    "caseId": "b66",
    "format": "process",
    "difficulty": 7,
    "title": "Investigate customer harm before a reassuring board summary",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — A 4.6 app rating does not invalidate rising loan complaints. The approved review requires a protected case set, completed harm triage and no unresolved critical cases before claiming closure. Aggregate ratings cannot waive any of those conditions. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "reconcile",
            "None"
          ],
          [
            "triage",
            "reconcile"
          ],
          [
            "assign",
            "triage"
          ],
          [
            "mitigate",
            "assign"
          ],
          [
            "validate",
            "mitigate"
          ],
          [
            "board",
            "validate"
          ],
          [
            "monitor",
            "board"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Case set protected",
            "=",
            "true",
            "Prepare the approved protected case set before exposing customer details."
          ],
          [
            "Harm triage complete",
            "=",
            "true",
            "Complete harm triage; report the uncertainty rather than a closure claim."
          ],
          [
            "Unresolved critical cases",
            "=",
            "0",
            "Keep critical-case remediation open and escalate with named owners."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Case set protected",
          "Harm triage complete",
          "Unresolved critical cases"
        ],
        "rows": [
          [
            "C1",
            "true",
            "true",
            "0"
          ],
          [
            "C2",
            "false",
            "true",
            "0"
          ],
          [
            "C3",
            "true",
            "false",
            "0"
          ],
          [
            "C4",
            "true",
            "true",
            "1"
          ],
          [
            "C5",
            "true",
            "false",
            "2"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "reconcile",
            "text": "Reconcile the complaint and rating populations."
          },
          {
            "id": "triage",
            "text": "Triage the observed customer harm."
          },
          {
            "id": "assign",
            "text": "Assign authorized owners for the affected journeys."
          },
          {
            "id": "mitigate",
            "text": "Implement the assessed mitigation."
          },
          {
            "id": "validate",
            "text": "Validate outcomes against the case evidence."
          },
          {
            "id": "board",
            "text": "Release the bounded board readout."
          },
          {
            "id": "monitor",
            "text": "Continue the agreed harm monitoring."
          }
        ],
        "keys": [
          [
            "reconcile",
            "triage",
            "assign",
            "mitigate",
            "validate",
            "board",
            "monitor"
          ]
        ],
        "explain": "Reconcile → triage → assign → mitigate → validate → board → monitor. C2 защищает данные; C3/C5 не позволяют выдать отсутствие triage за отсутствие harm; C4 остаётся открытым. Customer harm — ущерб клиенту; bounded readout показывает границы доказательства, а не только приятный aggregate."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "C1",
            "text": "C1 · The protected review has completed triage and closed every critical case."
          },
          {
            "id": "C2",
            "text": "C2 · A good-looking outcome pack exposes customer details."
          },
          {
            "id": "C3",
            "text": "C3 · The protected pack has not completed harm triage."
          },
          {
            "id": "C4",
            "text": "C4 · Completed triage still leaves one critical customer case unresolved."
          },
          {
            "id": "C5",
            "text": "C5 · Both triage and critical-case closure are incomplete."
          }
        ],
        "right": [
          {
            "id": "privacy",
            "text": "Prepare the approved protected case set before exposing customer details."
          },
          {
            "id": "triage",
            "text": "Complete harm triage; report the uncertainty rather than a closure claim."
          },
          {
            "id": "harm",
            "text": "Keep critical-case remediation open and escalate with named owners."
          },
          {
            "id": "complete",
            "text": "Publish the bounded evidence-based outcome and continue monitoring."
          }
        ],
        "key": {
          "C1": "complete",
          "C2": "privacy",
          "C3": "triage",
          "C4": "harm",
          "C5": "triage"
        },
        "explain": "Reconcile → triage → assign → mitigate → validate → board → monitor. C2 защищает данные; C3/C5 не позволяют выдать отсутствие triage за отсутствие harm; C4 остаётся открытым. Customer harm — ущерб клиенту; bounded readout показывает границы доказательства, а не только приятный aggregate."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "privacy",
        "triage",
        "harm"
      ],
      "successRoute": "complete"
    }
  },
  {
    "id": "ba-c7-l08-question-v1",
    "track": "ba",
    "chapter": 7,
    "level": 8,
    "caseId": "b68",
    "format": "question",
    "difficulty": 7,
    "title": "Define AI reassessment triggers and authority",
    "ru": "Выбрать уточняющий вопрос",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The bank has approved risk tiers, an initial AI-use-case register and a human review owner. Governance does not yet define which changes invalidate an existing approval or who must authorize reassessment. Close the stated decision gap before expanding the specification; the other topics can be useful later."
      }
    ],
    "steps": [
      {
        "kind": "select",
        "prompt": "Выберите вопрос, который закрывает именно этот пробел в требовании. После проверки появится подготовленный ответ стейкхолдера.",
        "count": 1,
        "options": [
          {
            "id": "tools",
            "text": "Which assistant brands should appear in the approved-tool list, and should teams use the same interface for every registered AI use case?",
            "feedback": "Tool list не определяет изменение scope уже выданного approval."
          },
          {
            "id": "trigger",
            "text": "Which changes to purpose, data class or model require renewed approval, and which accountable owner must authorize the reassessment before use resumes?",
            "feedback": "Определяет trigger и authority, отсутствующие в governance."
          },
          {
            "id": "benefit",
            "text": "Which productivity target should each AI use case report, and should teams aggregate saved drafting time for the quarterly innovation update?",
            "feedback": "Benefit metric не задаёт обязательный повторный контроль."
          }
        ],
        "key": [
          "trigger"
        ],
        "response": "Stakeholder: “Any change to business purpose, approved data class, external processor or model family triggers reassessment by the designated risk owner before the changed use resumes. Keep the prior approval and new decision linked; a tool-list entry is not blanket authorization.”",
        "explain": "Reassessment trigger — событие повторной оценки; blanket authorization — неограниченное разрешение. Контроль относится к конкретному use case и его границам, а не только к названию инструмента."
      }
    ],
    "audit": {}
  },
  {
    "id": "ba-c7-l10-acceptance-v1",
    "track": "ba",
    "chapter": 7,
    "level": 10,
    "caseId": "b70",
    "format": "acceptance",
    "difficulty": 7,
    "title": "Test delegated digital-change authority at its exact expiry",
    "ru": "Проверить критерии приёмки",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — An approved delegation is scoped, has an inclusive money limit and expires at a precise UTC instant. At the expiry instant it is no longer valid. Check withdrawn or expired authority before scope and amount; a board discussion is not a new delegation. The policy facts below are approved for this exercise. Use the observed values, including boundary values; do not invent an exception or silently replace the approved rule. A criterion can apply to more than one scenario. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Approved policy facts",
        "headers": [
          "Rule",
          "Value"
        ],
        "rows": [
          [
            "Delegation expiry UTC",
            "2026-12-01T12:00:00Z"
          ],
          [
            "Inclusive delegated limit $",
            "50000"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed scenarios",
        "headers": [
          "Scenario",
          "Withdrawn",
          "Request UTC",
          "In scope",
          "Amount $"
        ],
        "rows": [
          [
            "A1",
            "false",
            "2026-12-01T11:59:59Z",
            "true",
            "50000"
          ],
          [
            "A2",
            "false",
            "2026-12-01T12:00:00Z",
            "true",
            "1000"
          ],
          [
            "A3",
            "false",
            "2026-12-01T11:00:00Z",
            "false",
            "1000"
          ],
          [
            "A4",
            "false",
            "2026-12-01T11:00:00Z",
            "true",
            "50001"
          ],
          [
            "A5",
            "true",
            "2026-12-01T11:00:00Z",
            "true",
            "500"
          ],
          [
            "A6",
            "false",
            "2026-12-01T11:30:00Z",
            "true",
            "49000"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "match",
        "prompt": "Сопоставьте ситуации с точными критериями Given / When / Then. Один критерий можно использовать повторно.",
        "left": [
          {
            "id": "A1",
            "text": "A1 · One second before expiry, the in-scope amount equals the cap."
          },
          {
            "id": "A2",
            "text": "A2 · The request arrives exactly at the expiry instant."
          },
          {
            "id": "A3",
            "text": "A3 · Live authority is used for an out-of-scope change."
          },
          {
            "id": "A4",
            "text": "A4 · An in-scope live request exceeds the cap by one dollar."
          },
          {
            "id": "A5",
            "text": "A5 · Delegation was withdrawn even though its time has not expired."
          },
          {
            "id": "A6",
            "text": "A6 · The live in-scope amount is below the cap."
          }
        ],
        "right": [
          {
            "id": "expired",
            "text": "Given withdrawn or expired delegation, When authorization is requested, Then refuse delegated authorization and route to the current authorized owner."
          },
          {
            "id": "scope",
            "text": "Given live delegation outside its permitted purpose, When authorization is requested, Then seek the separately authorized scope owner instead of extending the delegation."
          },
          {
            "id": "limit",
            "text": "Given live in-scope delegation above its money limit, When authorization is requested, Then route to the higher authorized approval level."
          },
          {
            "id": "within",
            "text": "Given live in-scope delegation at or below its money limit, When authorization is requested, Then record the delegated decision with actor, principal and evidence references."
          }
        ],
        "key": {
          "A1": "within",
          "A2": "expired",
          "A3": "scope",
          "A4": "limit",
          "A5": "expired",
          "A6": "within"
        },
        "explain": "A1/A6 проходят; A2 достигает точного expiry и уже не проходит. A5 отозван раньше срока. A3 требует другого scope owner; A4 — более высокого лимита полномочий. Authority survives leadership change только как проверяемая делегация, а не устная уверенность в конкретном лидере."
      }
    ],
    "audit": {
      "model": "delegation"
    }
  },
  {
    "id": "ba-c7-l12-process-v1",
    "track": "ba",
    "chapter": 7,
    "level": 12,
    "caseId": "s14",
    "format": "process",
    "difficulty": 7,
    "title": "Close a change with evidence that does not depend on one leader",
    "ru": "Собрать процесс из шагов",
    "artifacts": [
      {
        "kind": "text",
        "body": "Nordline Bank — The institutional control requires independent review and current authorization before implementation. After implementation, outcome validation and recording execution evidence may happen independently; both must precede closure. Only verified checks allow a closure claim. Order the successful MAIN path using the prerequisite table. A step may start only after every listed prerequisite completes. For exception routing, evaluate checks in their displayed priority order and use the FIRST failing gate; if all pass, use the completed-path action. Independent main-path steps may be ordered either way, but error-reporting priority stays fixed. All unvaried inputs and preconditions are valid within the stated exercise scope."
      },
      {
        "kind": "table",
        "title": "Main-path prerequisites",
        "headers": [
          "Step",
          "Requires"
        ],
        "rows": [
          [
            "register",
            "None"
          ],
          [
            "classify",
            "register"
          ],
          [
            "review",
            "classify"
          ],
          [
            "authorize",
            "review"
          ],
          [
            "implement",
            "authorize"
          ],
          [
            "validate",
            "implement"
          ],
          [
            "evidence",
            "implement"
          ],
          [
            "close",
            "validate, evidence"
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Validation gates — first failure wins",
        "headers": [
          "Field",
          "Must be",
          "Value",
          "Failure action"
        ],
        "rows": [
          [
            "Review independent",
            "=",
            "true",
            "Obtain an independent review; do not treat self-review as a completed control."
          ],
          [
            "Authorization current",
            "=",
            "true",
            "Obtain current authorization before relying on the change record."
          ],
          [
            "Closure checks verified",
            "=",
            "true",
            "Complete the verified outcome/control checks; keep the change open."
          ]
        ]
      },
      {
        "kind": "table",
        "title": "Observed outcomes",
        "headers": [
          "Scenario",
          "Review independent",
          "Authorization current",
          "Closure checks verified"
        ],
        "rows": [
          [
            "E1",
            "true",
            "true",
            "true"
          ],
          [
            "E2",
            "false",
            "true",
            "true"
          ],
          [
            "E3",
            "true",
            "false",
            "true"
          ],
          [
            "E4",
            "true",
            "true",
            "false"
          ],
          [
            "E5",
            "false",
            "false",
            "false"
          ]
        ]
      }
    ],
    "steps": [
      {
        "kind": "order",
        "prompt": "Соберите успешный основной сценарий. Учитывайте все предпосылки; выбранную карточку можно убрать и добавить снова.",
        "cards": [
          {
            "id": "register",
            "text": "Register the change and its accountable owner."
          },
          {
            "id": "classify",
            "text": "Classify its materiality and required controls."
          },
          {
            "id": "review",
            "text": "Complete the independent review."
          },
          {
            "id": "authorize",
            "text": "Record the current authorized decision."
          },
          {
            "id": "implement",
            "text": "Implement the approved change."
          },
          {
            "id": "validate",
            "text": "Validate the stated outcome and controls."
          },
          {
            "id": "evidence",
            "text": "Record the implementation evidence references."
          },
          {
            "id": "close",
            "text": "Close the change with linked evidence and ownership."
          }
        ],
        "keys": [
          [
            "register",
            "classify",
            "review",
            "authorize",
            "implement",
            "validate",
            "evidence",
            "close"
          ],
          [
            "register",
            "classify",
            "review",
            "authorize",
            "implement",
            "evidence",
            "validate",
            "close"
          ]
        ],
        "explain": "Register → classify → review → authorize → implement → validate/evidence в любом из двух порядков → close. E2/E5 сначала восстанавливают independence; E3 — authority; E4 — checks. Institutional memory — воспроизводимые связи решений и доказательств, а не зависимость от одного человека."
      },
      {
        "kind": "match",
        "prompt": "Сопоставьте наблюдаемый исход со следующим действием. Если нарушено несколько условий, примените первый неуспешный контроль по таблице.",
        "left": [
          {
            "id": "E1",
            "text": "E1 · Independent review, current authority and verified closure checks are present."
          },
          {
            "id": "E2",
            "text": "E2 · The former leader reviewed their own change."
          },
          {
            "id": "E3",
            "text": "E3 · Independent review exists but the recorded authority has expired."
          },
          {
            "id": "E4",
            "text": "E4 · Review and authority pass; closure checks remain unverified."
          },
          {
            "id": "E5",
            "text": "E5 · Neither review independence nor current authority is established."
          }
        ],
        "right": [
          {
            "id": "review",
            "text": "Obtain an independent review; do not treat self-review as a completed control."
          },
          {
            "id": "authority",
            "text": "Obtain current authorization before relying on the change record."
          },
          {
            "id": "checks",
            "text": "Complete the verified outcome/control checks; keep the change open."
          },
          {
            "id": "complete",
            "text": "Close the controlled change with linked evidence and accountable ownership."
          }
        ],
        "key": {
          "E1": "complete",
          "E2": "review",
          "E3": "authority",
          "E4": "checks",
          "E5": "review"
        },
        "explain": "Register → classify → review → authorize → implement → validate/evidence в любом из двух порядков → close. E2/E5 сначала восстанавливают independence; E3 — authority; E4 — checks. Institutional memory — воспроизводимые связи решений и доказательств, а не зависимость от одного человека."
      }
    ],
    "audit": {
      "model": "process",
      "gateRoutes": [
        "review",
        "authority",
        "checks"
      ],
      "successRoute": "complete"
    }
  }
];
CAREER_PRACTICE_DATA = CAREER_PRACTICE_DATA.concat(BA_CAREER_PRACTICE_DATA);
