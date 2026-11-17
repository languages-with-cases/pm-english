/**
 * Track metadata lookup, active-data switching, multi-track state packing and cloud/local state reconciliation.
 * Classic browser script; dependency order is declared in index.html.
 */
var TRACK_JSON = {};
["dev", "pm", "an", "ba"].forEach(function (id) {
  TRACK_JSON[id] = CAREER_CONTENT.tracks[id];
});

function trackMeta(id) {
  for (var i = 0; i < TRACKS.length; i++) {
    if (TRACKS[i].id === id) return TRACKS[i];
  }
  return TRACKS[0];
}

var TDATA = {},
  PMSNAP = null,
  CUR_TRACK = null,
  TK = null,
  STATES = {};

function firstSentence(t) {
  var m = String(t).match(/^.*?[.!?](\s|$)/);
  return m ? m[0].trim() : t;
}

function onbFor(m, first, last, events) {
  var a = [
    {
      k: "Welcome",
      t: "Welcome to " + m.name,
      p:
        "Learn the English of " +
        m.field +
        " by working through real cases. Your career starts at the level of " +
        first +
        " and ends at " +
        last +
        ", one chapter at a time.",
      m: "path",
    },
    {
      k: "How it works",
      t: "Reply like a pro",
      p: "Every level is a chat with a colleague. Read the message and pick the best reply. Better answers earn more XP, and every choice has consequences. A boss case ends each chapter. To unlock the next chapter, score about two thirds of the points in the current one, and replay weaker cases if you need to.",
      m: "chat",
    },
    {
      k: "Translations",
      t: "Tap any word to translate",
      p: "Tap a word in a message to see its Russian translation. In the answer options, press and hold a word instead, because a quick tap selects that answer.",
      m: "tr",
    },
    {
      k: "Streak and words",
      t: "Keep your streak",
      p: "Solve at least one case a day to keep your streak going. Every new word goes to your dictionary, where you can review it later.",
      m: "streak",
    },
  ];
  if (events)
    a.push({
      k: "Events and stars",
      t: "Earn stars in events",
      p: "From time to time a special event appears on the home screen, like the Business Trip. Finish all its levels to earn a gold star next to your title. Stars stay forever, whatever your position becomes.",
      m: "stars",
    });
  return a;
}

function snapshotProductTrack() {
  var m = trackMeta("product");
  ONB[0].t = "Welcome to " + m.name;
  ONB[1].p =
    "Every level is a chat with a colleague. Read the message and pick the best reply. Better answers earn more XP, and every choice has consequences. A boss case ends each chapter. To unlock the next chapter, score about two thirds of the points in the current one, and replay weaker cases if you need to.";
  PMSNAP = {
    LEVELS: LEVELS,
    ROLES: ROLES,
    CASES: CASES,
    PLAN: PLAN,
    BONUS: BONUS,
    STORY: STORY,
    END_STORY: END_STORY,
    BOSSINTRO: BOSSINTRO,
    PROMO: PROMO,
    ARTICLES: ARTICLES,
    EVENTS: EVENTS,
    EVCASES: EVCASES,
    LX: LX,
    RP: RP,
    OPENERS: OPENERS,
    ONB: ONB,
  };
}

function buildTrack(id) {
  var j = TRACK_JSON[id],
    m = trackMeta(id),
    cs = j.cases,
    by = {};
  cs.forEach(function (c) {
    if (c.meters) c.scn = true;
    by[c.id] = c;
    c.steps.forEach(function (s) {
      if (!s.words) s.words = [];
    });
  });
  var boss = j.plan.map(function (p, g) {
    var b = by[p.boss],
      ch = b.sender.channel === "Email" ? "by email" : "in " + b.sender.channel;
    return {
      en:
        "This chapter ends with a boss case. " +
        b.sender.name +
        ", " +
        b.sender.role +
        ", is about to write to you " +
        ch +
        " and needs a good decision. Take your time and think about every answer.",
    };
  });
  var promo = [null];
  for (var g = 1; g < j.levels.length; g++)
    promo.push(
      "Your work was noticed, and the company trusts you with more. " +
        firstSentence(j.roles[g].en),
    );
  return {
    LEVELS: j.levels,
    ROLES: j.roles,
    CASES: cs,
    PLAN: j.plan,
    BONUS: j.bonus,
    STORY: j.story.map(function (s) {
      return typeof s === "string" ? { en: s } : s;
    }),
    END_STORY: { en: j.endStory },
    BOSSINTRO: boss,
    PROMO: promo,
    ARTICLES: [],
    EVENTS: [],
    EVCASES: [],
    LX: j.lx || {},
    RP: [],
    OPENERS: OPENERS_GEN,
    ONB: onbFor(m, j.levels[0].n, j.levels[j.levels.length - 1].n, false),
  };
}

function dataFor(id) {
  if (id === "product") return PMSNAP;
  return TDATA[id] || (TDATA[id] = buildTrack(id));
}

function applyTrack(id) {
  var d = dataFor(id);
  LEVELS = d.LEVELS;
  ROLES = d.ROLES;
  CASES = d.CASES;
  PLAN = d.PLAN;
  BONUS = d.BONUS;
  STORY = d.STORY;
  END_STORY = d.END_STORY;
  BOSSINTRO = d.BOSSINTRO;
  PROMO = d.PROMO;
  ARTICLES = d.ARTICLES;
  EVENTS = d.EVENTS;
  EVCASES = d.EVCASES;
  LX = d.LX;
  RP = d.RP;
  OPENERS = d.OPENERS;
  ONB = d.ONB;
  if (CUR_TRACK !== id) ui.practice = null;
  CUR_TRACK = id;
  AMAP = {};
  ARTICLES.forEach(function (a) {
    AMAP[a.id] = a;
  });
  BYID = {};
  CASES.forEach(function (c) {
    BYID[c.id] = c;
  });
  WORDS = allWords();
  EVCASES.forEach(function (c) {
    BYID[c.id] = c;
    c.steps.forEach(function (s) {
      s.words.forEach(function (w) {
        var k = w.w.toLowerCase();
        if (!WORDS[k]) WORDS[k] = w;
      });
    });
  });
  FLAT = [];
  PLAN.forEach(function (p, g) {
    var ids = p.b.concat(p.s);
    ids.forEach(function (x, i) {
      FLAT.push({ g: g, i: i, id: x, boss: false, n: ids.length + 1 });
    });
    FLAT.push({ g: g, i: ids.length, id: p.boss, boss: true, n: ids.length + 1 });
  });
  CASES.forEach(function (c) {
    c.steps.forEach(function (s) {
      s.words.forEach(function (w) {
        var k = w.w.toLowerCase();
        if (/^[a-z]+$/.test(k) && !TR[k]) TR[k] = [w.ru];
      });
    });
  });
  if (S && (S.pass === null || S.pass === undefined)) {
    S.pass = [];
    var mx = -1;
    FLAT.forEach(function (f) {
      if (S.skip.indexOf(f.id) > -1 && f.g > mx) mx = f.g;
    });
    for (var g = 0; g <= mx; g++) S.pass.push(g);
  }
  try {
    document.title = trackMeta(id).name;
  } catch (e) {}
}

function trackName() {
  return trackMeta(CUR_TRACK || "product").name;
}

function trackShort() {
  return trackMeta(CUR_TRACK || "product").short;
}

function newState() {
  var s = defaultState();
  s.rt = RESET_TAG;
  if (S) {
    s.onb = S.onb;
    s.onb2 = S.onb2;
  }
  return s;
}

function packAll() {
  if (TK) STATES[TK] = S;
  return { v: 2, cur: TK, st: STATES };
}

function loadAll(d) {
  STATES = {};
  TK = null;
  if (d && d.v === 2 && d.st && typeof d.st === "object") {
    Object.keys(d.st).forEach(function (k) {
      if (
        TRACKS.some(function (t) {
          return t.id === k;
        })
      )
        STATES[k] = merge(d.st[k]);
    });
    TK = d.cur && STATES[d.cur] ? d.cur : null;
  } else if (d && typeof d === "object" && Object.keys(d).length) {
    STATES.product = merge(d);
    TK = "product";
  }
  S = TK ? STATES[TK] : defaultState();
}

function mergeAlls(a, b) {
  var out = { v: 2, cur: a.cur || b.cur || null, st: {} },
    ids = {};
  Object.keys(a.st || {}).forEach(function (k) {
    ids[k] = 1;
  });
  Object.keys(b.st || {}).forEach(function (k) {
    ids[k] = 1;
  });
  Object.keys(ids).forEach(function (k) {
    var x = a.st && a.st[k],
      y = b.st && b.st[k];
    out.st[k] = x && y ? better(merge(x), merge(y)) : x || y;
  });
  if (out.cur && !out.st[out.cur]) out.cur = b.cur && out.st[b.cur] ? b.cur : null;
  return out;
}

function remoteAll(data) {
  var r = null;
  try {
    if (data.all) {
      r = JSON.parse(data.all);
    } else if (data.data) {
      r = { v: 2, cur: "product", st: { product: JSON.parse(data.data) } };
    }
  } catch (e) {
    r = null;
  }
  return r;
}

function selectTrack(id) {
  if (TK) STATES[TK] = S;
  if (!STATES[id]) STATES[id] = newState();
  TK = id;
  S = STATES[id];
  applyTrack(id);
  ui.pr = null;
  ui.rp = null;
  ui.evi = undefined;
  ui.lvlUp = null;
  ui.lvlNext = null;
  ui.onb = null;
  ui.q = "";
  ui.filter = "all";
  ui.lastRand = "";
  ui.artG = 0;
  save();
  go("home");
  if (!S.onb || !S.onb2) {
    ui.onb = { i: 0 };
    render();
  }
}

function trackProgress(id) {
  var d = dataFor(id),
    st = id === TK ? S : STATES[id];
  var total = 0,
    done = 0,
    chap = 0,
    found = false;
  d.PLAN.forEach(function (p, g) {
    var ids = p.b.concat(p.s, [p.boss]);
    ids.forEach(function (x) {
      total++;
      var c = null;
      for (var i = 0; i < d.CASES.length; i++) {
        if (d.CASES[i].id === x) {
          c = d.CASES[i];
          break;
        }
      }
      var ok =
        !!st &&
        c &&
        c.steps.every(function (s, i2) {
          return st.done.indexOf(c.id + ":" + i2) > -1;
        });
      if (ok) done++;
      else if (!found) {
        found = true;
        chap = g;
      }
    });
  });
  return {
    total: total,
    done: done,
    chap: found ? chap : d.PLAN.length - 1,
    xp: st ? st.xp : 0,
    started: !!st,
  };
}

function trackTopics(id) {
  var d = dataFor(id),
    cnt = {},
    order = [];
  d.CASES.forEach(function (c) {
    if (c.type !== "base") return;
    if (!cnt[c.topic]) {
      cnt[c.topic] = 0;
      order.push(c.topic);
    }
    cnt[c.topic]++;
  });
  order.sort(function (a, b) {
    return cnt[b] - cnt[a] || order.indexOf(a) - order.indexOf(b);
  });
  return order.slice(0, 6);
}

function toggleTk(id) {
  ui.tkOpen = ui.tkOpen || {};
  ui.tkOpen[id] = !ui.tkOpen[id];
  var y = $app.scrollTop;
  render();
  $app.scrollTop = y;
}

function tracksView() {
  var h = "";
  if (TK)
    h +=
      '<div class="top"><button class="back" onclick="go(\'home\')" aria-label="Back">' +
      BACK_SVG +
      "</button></div>";
  h +=
    "<h1>" +
    (TK ? "Change track" : "Choose your track") +
    '</h1><div class="sub">Each track is its own career path with its own cases, words and progress. You can switch at any time, and your progress in every track is kept.</div>';
  TRACKS.forEach(function (m) {
    var d = dataFor(m.id),
      pr = trackProgress(m.id),
      cur = m.id === TK;
    var lv = d.LEVELS,
      tag = cur
        ? "Current track"
        : pr.started && (pr.done > 0 || pr.xp > 0)
          ? "In progress"
          : "New";
    var open = !!(ui.tkOpen && ui.tkOpen[m.id]),
      started = pr.started && (pr.done > 0 || pr.xp > 0);
    h +=
      '<div class="tcard' +
      (cur ? " cur" : "") +
      (open ? " open" : "") +
      '"><button class="thead" onclick="toggleTk(\'' +
      m.id +
      '\')" aria-expanded="' +
      open +
      '"><div><small>' +
      tag +
      "</small><h2>" +
      esc(m.name) +
      "</h2></div><em>" +
      (open ? "Hide" : "Details") +
      "</em></button>";
    if (open) {
      h +=
        '<div class="tbody"><p>' +
        esc(m.en) +
        '</p><p class="ru">' +
        esc(m.ru) +
        "</p>" +
        '<div class="tpath"><b>Career path</b><span>' +
        esc(lv[0].n) +
        " to " +
        esc(lv[lv.length - 1].n) +
        "</span></div>" +
        '<div class="chips">' +
        trackTopics(m.id)
          .map(function (t) {
            return '<span class="chip">' + esc(t) + "</span>";
          })
          .join("") +
        "</div>" +
        '<div class="tmeta"><span>' +
        pr.total +
        " levels</span><span>" +
        d.PLAN.length +
        " chapters</span><span>" +
        esc(m.company) +
        "</span></div>";
      if (started)
        h +=
          '<div class="tprog"><div class="bar"><i style="width:' +
          Math.round((pr.done / pr.total) * 100) +
          '%"></i></div><span>Chapter ' +
          (pr.chap + 1) +
          " of " +
          d.PLAN.length +
          ", " +
          pr.done +
          " of " +
          pr.total +
          " levels, " +
          pr.xp +
          " XP</span></div>";
      h +=
        '<button class="cta' +
        (cur ? " alt" : "") +
        '" onclick="' +
        (cur ? "go('home')" : "selectTrack('" + m.id + "')") +
        '">' +
        (cur ? "Back to this track" : started ? "Continue" : "Start this track") +
        "</button></div>";
    }
    h += "</div>";
  });
  return h;
}
