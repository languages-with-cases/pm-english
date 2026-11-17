/**
 * Shared select/order/match attempts, key validation, static case materials and Additional navigation. This is the one grading engine for all practice tracks.
 * Classic browser script; dependency order is declared in index.html.
 */
function practiceTasks(track) {
  return PRACTICE_DATA.filter(function (t) {
    return t.track === track;
  });
}
function practiceMergeDone(a, b) {
  var known = PRACTICE_DATA.map(function (t) {
    return t.id;
  });
  if (typeof CAREER_PRACTICE_DATA !== "undefined")
    known = known.concat(
      CAREER_PRACTICE_DATA.map(function (t) {
        return t.id;
      }),
    );
  return (Array.isArray(a) ? a : [])
    .concat(Array.isArray(b) ? b : [])
    .filter(function (id, i, all) {
      return typeof id === "string" && known.indexOf(id) >= 0 && all.indexOf(id) === i;
    });
}
function practiceHomeCard() {
  var tasks = practiceTasks(CUR_TRACK),
    done = S.practiceDone || [];
  return (
    '<button class="special alt" onclick="go(\'practiceList\')"><div><b>Additional practice</b>' +
    "<span>Дополнительная практика · " +
    tasks.filter(function (t) {
      return done.indexOf(t.id) >= 0;
    }).length +
    " / " +
    tasks.length +
    " completed</span></div><em>Open</em></button>"
  );
}
function practiceButton(action, id, label, extra) {
  return (
    '<button type="button" data-pr-action="' +
    action +
    '" data-pr-id="' +
    esc(id || "") +
    '" data-pr-focus="' +
    esc(action + ":" + (id || "")) +
    '" ' +
    (extra || "") +
    ">" +
    label +
    "</button>"
  );
}
function practiceListView() {
  var h =
    '<section class="practice"><div class="top">' +
    practiceButton("home", "", BACK_SVG, 'class="back" aria-label="Back to home"') +
    "</div>" +
    '<h1>Additional practice</h1><p class="sub">' +
    esc(trackName()) +
    "</p>" +
    '<p lang="ru">Дополнительная практика: нажимайте на готовые ответы. Результат сохраняется отдельно от глав и не меняет проходной балл.</p>';
  practiceTasks(CUR_TRACK).forEach(function (t) {
    var done = (S.practiceDone || []).indexOf(t.id) >= 0;
    h +=
      '<article class="pr-task"><h2>' +
      esc(t.title) +
      '</h2><p lang="ru">' +
      esc(t.ru) +
      "</p><p>" +
      t.steps.length +
      " step" +
      (t.steps.length === 1 ? "" : "s") +
      " · " +
      (done ? "Completed / Пройдено" : "Not completed / Не пройдено") +
      "</p>" +
      practiceButton("start", t.id, done ? "Try again" : "Start", 'class="cta"') +
      "</article>";
  });
  return h + "</section>";
}
function practiceShuffled(items) {
  return shuffle(items.length).map(function (i) {
    return items[i].id;
  });
}
function practiceCreateAttempt(task) {
  return {
    task: task,
    track: CUR_TRACK,
    index: 0,
    finished: false,
    steps: task.steps.map(function (s) {
      // Shuffle once for this attempt; rendering and edits never reshuffle.
      return {
        order: practiceShuffled(s.options || s.cards || s.left),
        rightOrder: s.right ? practiceShuffled(s.right) : [],
        selected: [],
        sequence: [],
        pairs: {},
        active: null,
        checked: false,
        correct: false,
        error: "",
      };
    }),
  };
}
function practiceStart(id) {
  var task = practiceTasks(CUR_TRACK).filter(function (t) {
    return t.id === id;
  })[0];
  if (!task) return;
  ui.practice = practiceCreateAttempt(task);
  ui.view = "practice";
  practiceRender("pr-title");
}
function practiceById(items, id) {
  return items.filter(function (item) {
    return item.id === id;
  })[0];
}
function practiceTable(a) {
  var h =
    '<p class="pr-scroll-hint" lang="ru">Если таблица не помещается, прокрутите её вправо. С клавиатуры: Tab до таблицы, затем стрелки.</p><div class="pr-scroll" tabindex="0" role="region" aria-label="' +
    esc(a.title) +
    '"><table><caption>' +
    esc(a.title) +
    "</caption><thead><tr>";
  a.headers.forEach(function (c) {
    h += '<th scope="col">' + esc(c) + "</th>";
  });
  h += "</tr></thead><tbody>";
  a.rows.forEach(function (row) {
    h += "<tr>";
    row.slice(0, a.kind === "gantt" ? 4 : row.length).forEach(function (c, i) {
      h += (i === 0 ? '<th scope="row">' : "<td>") + esc(c) + (i === 0 ? "</th>" : "</td>");
    });
    if (a.kind === "gantt") {
      var days = a.endDay || 12,
        dayLabel = a.dayLabel || "June ";
      h +=
        '<td><div class="pr-gantt"' +
        (a.endDay ? ' style="grid-template-columns:repeat(' + days + ',24px)"' : "") +
        ' aria-label="' +
        esc(dayLabel) +
        row[4] +
        " through " +
        row[5] +
        '">';
      for (var day = 1; day <= days; day++)
        h +=
          '<span class="' +
          (day >= row[4] && day <= row[5] ? "filled" : "") +
          '">' +
          day +
          "</span>";
      h += "</div></td>";
    }
    h += "</tr>";
  });
  return h + "</tbody></table></div>";
}
function practiceArtifact(a) {
  if (a.kind === "text") return '<p class="pr-context" lang="en">' + esc(a.body) + "</p>";
  if (a.kind === "table" || a.kind === "gantt") return practiceTable(a);
  if (a.kind === "code")
    return (
      '<figure class="pr-code" tabindex="0" role="region" aria-label="' +
      esc(a.title) +
      '"><figcaption>' +
      esc(a.title) +
      "</figcaption><ol>" +
      a.lines
        .map(function (line) {
          return "<li><code>" + esc(line) + "</code></li>";
        })
        .join("") +
      "</ol></figure>"
    );
  if (a.kind === "screens")
    return (
      '<div class="pr-screens" aria-label="' +
      esc(a.title) +
      '">' +
      a.screens
        .map(function (s) {
          return (
            "<figure><figcaption>" +
            esc(s.title) +
            '</figcaption><div class="pr-mock-label">Postal code</div>' +
            '<div class="pr-mock-input">' +
            esc(s.value || "Postal code") +
            "</div>" +
            (s.error ? '<p class="pr-validation">' + esc(s.error) + "</p>" : "") +
            '<div class="pr-mock-button">Continue</div><p><b>Observed action:</b> ' +
            esc(s.action) +
            "</p></figure>"
          );
        })
        .join("") +
      "</div>"
    );
  if (a.kind === "charts")
    return (
      '<section aria-label="' +
      esc(a.title) +
      '">' +
      a.charts
        .map(function (c) {
          var max = Math.max.apply(null, c.values),
            points = c.values
              .map(function (v, i) {
                return 45 + i * 75 + "," + (115 - (v / max) * 85);
              })
              .join(" ");
          var svg =
            '<svg viewBox="0 0 330 150" role="img" aria-label="' +
            esc(c.title) +
            '"><title>' +
            esc(c.title) +
            '</title><path d="M20 15V120H320" fill="none" stroke="currentColor"/>';
          if (c.kind === "line")
            svg +=
              '<polyline points="' +
              points +
              '" fill="none" stroke="var(--blue)" stroke-width="3"/>';
          c.values.forEach(function (v, i) {
            var x = 45 + i * 75,
              y = 115 - (v / max) * 85;
            svg +=
              c.kind === "line"
                ? '<circle cx="' + x + '" cy="' + y + '" r="4" fill="var(--blue)"/>'
                : '<rect x="' +
                  (x - 30) +
                  '" y="' +
                  y +
                  '" width="' +
                  (c.kind === "histogram" ? 75 : 35) +
                  '" height="' +
                  (120 - y) +
                  '" fill="var(--blue)"/>';
            svg +=
              '<text x="' +
              (x + 4) +
              '" y="' +
              (y - 7) +
              '" text-anchor="middle">' +
              v +
              '</text><text x="' +
              (x + 4) +
              '" y="140" text-anchor="middle">' +
              esc(c.labels[i]) +
              "</text>";
          });
          svg += "</svg>";
          return (
            '<figure class="pr-chart"><figcaption>' +
            esc(c.title) +
            "</figcaption>" +
            svg +
            "<p>" +
            esc(c.unit) +
            "</p><details><summary>Data / Данные</summary>" +
            practiceTable({
              title: c.title,
              headers: ["Label", c.unit],
              rows: c.labels.map(function (l, i) {
                return [l, c.values[i]];
              }),
            }) +
            "</details></figure>"
          );
        })
        .join("") +
      "</section>"
    );
  return "";
}
/* One editor and one key comparison per mechanic; no per-track handlers. */
function practiceSelect(s, st) {
  return (
    '<p lang="ru">Выберите ровно ' +
    s.count +
    ". Выбрано: " +
    st.selected.length +
    '.</p><div class="pr-options" role="group" aria-label="Answer options">' +
    st.order
      .map(function (id) {
        var o = practiceById(s.options, id),
          selected = st.selected.indexOf(id) >= 0;
        return practiceButton(
          "select",
          id,
          esc(o.text),
          'class="pr-option' +
            (selected ? " selected" : "") +
            '" aria-pressed="' +
            selected +
            '"' +
            (st.checked ? " disabled" : ""),
        );
      })
      .join("") +
    "</div>"
  );
}
function practiceOrder(s, st) {
  var h =
    '<h3>Available cards / Карточки</h3><div class="pr-options" role="group" aria-label="Available cards">';
  st.order.forEach(function (id) {
    h += practiceButton(
      "add",
      id,
      esc(practiceById(s.cards, id).text),
      'class="pr-option"' + (st.checked || st.sequence.indexOf(id) >= 0 ? " disabled" : ""),
    );
  });
  h +=
    '</div><h3>Your order / Ваш порядок</h3><p lang="ru">Нажмите выбранную карточку, чтобы убрать её и добавить заново.</p><ol class="pr-sequence">';
  st.sequence.forEach(function (id) {
    h +=
      "<li>" +
      practiceButton(
        "remove",
        id,
        esc(practiceById(s.cards, id).text) + ' <span aria-hidden="true">×</span>',
        'class="pr-option selected" aria-label="' +
          esc("Remove: " + practiceById(s.cards, id).text) +
          '"' +
          (st.checked ? " disabled" : ""),
      ) +
      "</li>";
  });
  return h + "</ol>";
}
function practiceMatch(s, st) {
  var h =
    '<p lang="ru">Нажмите фразу слева, затем вариант справа. Чтобы изменить пару, выберите фразу снова. Категории справа доступны повторно.</p><div class="pr-match"><div role="group" aria-label="Items to match">';
  st.order.forEach(function (id) {
    var target = practiceById(s.right, st.pairs[id]),
      label = practiceById(s.left, id).text;
    h += practiceButton(
      "left",
      id,
      "<span>" +
        esc(label) +
        "</span><small>" +
        esc(target ? "→ " + target.text : "Not matched / Нет пары") +
        "</small>",
      'class="pr-option' +
        (st.active === id ? " selected" : "") +
        '" aria-pressed="' +
        (st.active === id) +
        '"' +
        (st.checked ? " disabled" : ""),
    );
  });
  h += '</div><div role="group" aria-label="Matching targets">';
  st.rightOrder.forEach(function (id) {
    h += practiceButton(
      "right",
      id,
      esc(practiceById(s.right, id).text),
      'class="pr-option"' + (st.checked || !st.active ? " disabled" : ""),
    );
  });
  return h + "</div></div>";
}
function practiceComplete(s, st) {
  if (s.kind === "select") return st.selected.length === s.count;
  if (s.kind === "order") return st.sequence.length === s.cards.length;
  return s.left.every(function (item) {
    return !!st.pairs[item.id];
  });
}
function practiceCorrect(s, st) {
  if (s.kind === "select")
    return (
      st.selected.length === s.key.length &&
      s.key.every(function (id) {
        return st.selected.indexOf(id) >= 0;
      })
    );
  if (s.kind === "order")
    return s.keys.some(function (key) {
      return (
        key.length === st.sequence.length &&
        key.every(function (id, i) {
          return st.sequence[i] === id;
        })
      );
    });
  return s.left.every(function (item) {
    return st.pairs[item.id] === s.key[item.id];
  });
}
function practiceKeyView(s) {
  if (s.kind === "select")
    return (
      "<ul>" +
      s.options
        .filter(function (o) {
          return s.key.indexOf(o.id) >= 0;
        })
        .map(function (o) {
          return "<li>" + esc(o.text) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  if (s.kind === "order")
    return s.keys
      .map(function (key) {
        return (
          "<ol>" +
          key
            .map(function (id) {
              return "<li>" + esc(practiceById(s.cards, id).text) + "</li>";
            })
            .join("") +
          "</ol>"
        );
      })
      .join("");
  return (
    "<dl>" +
    s.left
      .map(function (item) {
        return (
          "<dt>" +
          esc(item.text) +
          "</dt><dd>" +
          esc(practiceById(s.right, s.key[item.id]).text) +
          "</dd>"
        );
      })
      .join("") +
    "</dl>"
  );
}
function practiceView() {
  var p = ui.practice;
  if (!p || p.track !== CUR_TRACK) return practiceListView();
  var task = p.task,
    h =
      '<section class="practice"><div class="top">' +
      practiceButton(
        "list",
        "",
        BACK_SVG,
        'class="back" aria-label="Back to additional practice"',
      ) +
      "</div>" +
      '<h1 id="pr-title" tabindex="-1">' +
      esc(task.title) +
      '</h1><p lang="ru">' +
      esc(task.ru) +
      "</p>";
  if (p.finished) {
    var passed = p.steps.every(function (st) {
      return st.correct;
    });
    h +=
      '<div class="pr-feedback" role="status"><h2 id="pr-result" tabindex="-1">' +
      (passed ? "Completed / Пройдено" : "Keep practising / Попробуйте ещё") +
      "</h2>" +
      '<p lang="ru">' +
      (passed
        ? "Все шаги верны. Задание отмечено как пройденное в этом треке."
        : "В этой попытке были ошибки. Для прохождения повторите задание и ответьте верно на все шаги.") +
      "</p></div>" +
      practiceButton("retry", "", "Try again", 'class="cta"') +
      practiceButton("list", "", "Back to practice", 'class="cta ghost"');
    if (store.status === "error" || store.status === "none")
      h +=
        '<p role="alert">Progress could not be saved. / Не удалось сохранить прогресс. ' +
        (store.status === "none"
          ? "Разрешите хранилище браузера."
          : "Проверьте подключение; следующая запись повторит сохранение.") +
        "</p>";
    return h + "</section>";
  }
  return h + practiceStepBody(p) + "</section>";
}
function practiceStepBody(p) {
  var task = p.task,
    h = "";
  var s = task.steps[p.index],
    st = p.steps[p.index];
  h +=
    '<p class="sub">Step ' +
    (p.index + 1) +
    " / " +
    task.steps.length +
    "</p>" +
    task.artifacts.map(practiceArtifact).join("") +
    '<h2 id="pr-prompt" tabindex="-1" lang="ru">' +
    esc(s.prompt) +
    "</h2>";
  h +=
    s.kind === "select"
      ? practiceSelect(s, st)
      : s.kind === "order"
        ? practiceOrder(s, st)
        : practiceMatch(s, st);
  if (st.error)
    h +=
      '<p class="pr-feedback" id="pr-error" tabindex="-1" role="alert" lang="ru">' +
      esc(st.error) +
      "</p>";
  if (!st.checked) h += practiceButton("check", "", "Check answer", 'class="cta"');
  else {
    h +=
      '<section class="pr-feedback" role="status"><h3 id="pr-feedback" tabindex="-1">' +
      (st.correct ? "Correct / Верно" : "Not quite / Не совсем") +
      '</h3><p lang="ru">' +
      esc(s.explain) +
      "</p>";
    if (s.kind === "select")
      st.selected.forEach(function (id) {
        var o = practiceById(s.options, id);
        h += '<p lang="ru">' + esc(o.feedback) + "</p>";
      });
    h +=
      "<details" +
      (st.correct ? "" : " open") +
      "><summary>Answer key / Ключ</summary>" +
      practiceKeyView(s) +
      "</details>";
    if (s.response) h += '<blockquote lang="en">' + esc(s.response) + "</blockquote>";
    h +=
      "</section>" +
      practiceButton(
        "next",
        "",
        p.index + 1 === task.steps.length ? "See result" : "Next step",
        'class="cta"',
      ) +
      practiceButton("retry", "", "Try again", 'class="cta ghost"');
  }
  return h;
}
function practiceRender(focus) {
  var y = $app.scrollTop;
  render();
  $app.scrollTop = y;
  var target = document.getElementById(focus);
  if (!target)
    target = Array.prototype.find.call(document.querySelectorAll("[data-pr-focus]"), function (el) {
      return el.getAttribute("data-pr-focus") === focus;
    });
  if (target && !target.disabled) target.focus({ preventScroll: true });
  if (target && /^pr-(feedback|error|prompt|result|title)$/.test(focus))
    target.scrollIntoView({ block: "nearest" });
}
function practiceAction(action, id) {
  if (action === "home") return go("home");
  if (action === "list") return go("practiceList");
  if (action === "start") return practiceStart(id);
  var p = ui.practice;
  if (!p || p.track !== CUR_TRACK) return;
  if (p.embedded) {
    if (!ui.cur || !ui.cur.x || ui.view !== "case" || ui.cur.x.practiceAttempt !== p) return;
    if (action === "lesson-finish") return careerPracticeComplete();
    if (action === "retry") return careerPracticeStart(ui.cur);
    if (ui.cur.x.stage !== "careerPractice") return;
  }
  if (action === "retry") return practiceStart(p.task.id);
  if (p.finished) return;
  var s = p.task.steps[p.index],
    st = p.steps[p.index],
    focus = action + ":" + id;
  if (action === "next" && st.checked) {
    if (p.index + 1 < p.steps.length) {
      p.index++;
      return practiceRender("pr-prompt");
    }
    p.finished = true;
    if (p.embedded) return careerPracticeAfterAttempt(p);
    if (
      p.steps.every(function (step) {
        return step.correct;
      })
    ) {
      S.practiceDone = practiceMergeDone(S.practiceDone, [p.task.id]);
      flush().then(function () {
        if (ui.practice === p && ui.view === "practice" && store.status === "error")
          practiceRender("pr-result");
      });
    }
    return practiceRender("pr-result");
  }
  if (st.checked) return;
  st.error = "";
  if (action === "select" && s.kind === "select" && practiceById(s.options, id)) {
    if (s.count === 1) st.selected = st.selected[0] === id ? [] : [id];
    else {
      var at = st.selected.indexOf(id);
      if (at < 0) st.selected.push(id);
      else st.selected.splice(at, 1);
    }
  } else if (
    action === "add" &&
    s.kind === "order" &&
    practiceById(s.cards, id) &&
    st.sequence.indexOf(id) < 0
  ) {
    st.sequence.push(id);
    focus = "remove:" + id;
  } else if (action === "remove" && s.kind === "order") {
    st.sequence = st.sequence.filter(function (x) {
      return x !== id;
    });
    focus = "add:" + id;
  } else if (action === "left" && s.kind === "match" && practiceById(s.left, id)) st.active = id;
  else if (action === "right" && s.kind === "match" && st.active && practiceById(s.right, id)) {
    var previous = st.active;
    st.pairs[previous] = id;
    st.active = null;
    focus = "left:" + previous;
  } else if (action === "check") {
    if (!practiceComplete(s, st)) {
      st.error =
        s.kind === "select"
          ? "Выберите ровно " + s.count + " вариант(а). Ответ пока не проверен."
          : s.kind === "order"
            ? "Добавьте все карточки в последовательность. Ответ пока не проверен."
            : "Назначьте пару каждой фразе слева. Ответ пока не проверен.";
      return practiceRender("pr-error");
    }
    st.correct = practiceCorrect(s, st);
    st.checked = true;
    return practiceRender("pr-feedback");
  }
  practiceRender(focus);
}
document.addEventListener("click", function (event) {
  var button = event.target.closest && event.target.closest("[data-pr-action]");
  if (!button || button.disabled) return;
  event.preventDefault();
  practiceAction(button.getAttribute("data-pr-action"), button.getAttribute("data-pr-id"));
});
