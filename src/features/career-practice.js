/**
 * Map exact career slots to embedded practice and bridge shared attempts back to the existing lesson/XP/save flow.
 * Classic browser script; dependency order is declared in index.html.
 */
function careerPracticeFor(cur) {
  if (
    !cur ||
    (CUR_TRACK !== "product" && CUR_TRACK !== "pm" && CUR_TRACK !== "ba") ||
    cur.mode !== "camp"
  )
    return null;
  for (var i = 0; i < CAREER_PRACTICE_DATA.length; i++) {
    var task = CAREER_PRACTICE_DATA[i];
    if (task.track !== CUR_TRACK || task.caseId !== cur.c.id) continue;
    var chapter = PLAN[task.chapter - 1];
    if (!chapter || task.level % 2 !== 0) return null;
    var ids = chapter.b.concat(chapter.s, [chapter.boss]);
    return ids[task.level - 1] === cur.c.id ? task : null;
  }
  return null;
}
function careerPracticeStart(cur) {
  var task = careerPracticeFor(cur);
  if (!task || !cur.x || cur.x.tChosen === null || cur.x.done) return;
  var p = practiceCreateAttempt(task);
  p.embedded = true;
  cur.x.stage = "careerPractice";
  cur.x.careerTask = task;
  cur.x.practiceAttempt = p;
  cur.x.practiceTries = cur.x.practiceTries || 0;
  ui.practice = p;
  ui.view = "case";
  window.scrollTo(0, 0);
  practiceRender("pr-title");
}
function careerPracticeAfterAttempt(p) {
  var cur = ui.cur;
  if (!cur || cur.x.practiceAttempt !== p) return;
  p.passed = p.steps.every(function (st) {
    return st.correct;
  });
  p.gain = 0;
  if (p.passed) {
    // Reuse the existing sentence-task award slot, including legacy b and retry rules.
    p.gain = lxMark(cur.c.id, "b", LX_TEXT_XP, cur);
    lxMark(cur.c.id, "practice-" + p.task.id, 0, cur);
    S.practiceDone = practiceMergeDone(S.practiceDone, [p.task.id]);
    save();
  } else cur.x.practiceTries++;
  practiceRender("pr-result");
}
function careerPracticeComplete() {
  var cur = ui.cur,
    p = ui.practice;
  if (
    !cur ||
    !cur.x ||
    cur.x.done ||
    !p ||
    !p.embedded ||
    cur.x.practiceAttempt !== p ||
    !p.finished
  )
    return;
  if (!p.passed && cur.x.practiceTries < LX_TRIES) return;
  ui.practice = null;
  lxFinish();
}
function careerPracticeView(cur) {
  var p = cur.x.practiceAttempt,
    task = cur.x.careerTask;
  if (!p || !task) return "";
  var h =
    lxHead(cur, 3) +
    '<section class="practice' +
    (task.track === "pm" ? " pr-career-project" : task.track === "ba" ? " pr-career-ba" : "") +
    '"><h1 id="pr-title" tabindex="-1">' +
    esc(task.title) +
    '</h1><p lang="ru">' +
    esc(task.ru) +
    "</p>";
  if (!p.finished)
    return (
      h +
      (task.track === "ba" && task.steps[p.index].kind === "match"
        ? '<p class="pr-scroll-hint" lang="ru">Список ответов справа прокручивается отдельно. С клавиатуры: Tab до нужного ответа, затем Enter или пробел.</p>'
        : "") +
      practiceStepBody(p) +
      "</section>"
    );
  h +=
    '<section class="pr-feedback" role="status"><h2 id="pr-result" tabindex="-1">' +
    (p.passed ? "Correct / Верно" : "Not quite / Не совсем") +
    '</h2><p lang="ru">' +
    (p.passed
      ? "Все шаги верны." +
        (p.gain ? " +" + p.gain + " XP." : " XP за третий этап уже были начислены ранее.")
      : "В этой попытке были ошибки. Повторите задание; после трёх неудачных попыток можно продолжить без XP за этот этап.") +
    "</p></section>";
  if (p.passed) h += practiceButton("lesson-finish", "", esc(nextLabel(cur, true)), 'class="cta"');
  else {
    h += practiceButton("retry", "", "Try again", 'class="cta"');
    if (cur.x.practiceTries >= LX_TRIES)
      h += practiceButton("lesson-finish", "", "Continue without XP", 'class="cta ghost"');
  }
  if (store.status === "error" || store.status === "none")
    h +=
      '<p role="alert" lang="ru">Прогресс не удалось сохранить. Проверьте подключение или доступ к хранилищу.</p>';
  return h + "</section>";
}
