/**
 * Create the shared UI/store state and active-track references from canonical data. Build the initial word/case/article indexes.
 * Classic browser script; dependency order is declared in index.html.
 */
// Active track references. Product starts from canonical data, never old rewritten copies.
var LEVELS = CAREER_CONTENT.tracks.product.levels;
var ROLES = CAREER_CONTENT.tracks.product.roles;
var CASES = CAREER_CONTENT.tracks.product.cases;
var LX = CAREER_CONTENT.tracks.product.lx;
var PLAN = CAREER_CONTENT.tracks.product.plan;
var BONUS = CAREER_CONTENT.tracks.product.bonus;
var STORY = CAREER_CONTENT.tracks.product.story;
var END_STORY = { en: CAREER_CONTENT.tracks.product.endStory };
var ARTICLES = PRODUCT_ARTICLES;
var EVENTS = PRODUCT_EVENTS;
var EVCASES = PRODUCT_EVENT_CASES;
var RP = PRODUCT_REPORTS;
var BOSSINTRO = PRODUCT_PRESENTATION.BOSSINTRO;
var PROMO = PRODUCT_PRESENTATION.PROMO;
var PROMO_TONE = PRODUCT_PRESENTATION.PROMO_TONE;
var RES_HEAD = PRODUCT_PRESENTATION.RES_HEAD;
var OPENERS = PRODUCT_PRESENTATION.OPENERS;
var ONB = PRODUCT_PRESENTATION.ONB;

function defaultState() {
  return {
    practiceDone: [],
    xp: 0,
    done: [],
    seen: [],
    learned: [],
    stats: { a: 0, c: 0, t: {} },
    cc: 0,
    retry: [],
    pend: [],
    wr: {},
    rc: 0,
    streak: 0,
    best: 0,
    last: "",
    day: { d: "", n: 0, g: false },
    act: [],
    goal: [],
    art: {},
    gseen: [],
    skip: [],
    ev: {},
    stars: [],
    onb: false,
    lx: {},
    rv: true,
    hist: [],
    rp: {},
    pts: {},
    pass: [],
  };
}

var S = defaultState();

var ui = {
  view: "home",
  artG: 0,
  sr: null,
  skipTo: 0,
  nw: null,
  intro: null,
  chap: null,
  bg: -1,
  lastRand: "",
  cur: null,
  rev: null,
  art: null,
  qz: null,
  cal: null,
  lvlNext: null,
  filter: "all",
  q: "",
  loaded: false,
  lvlUp: null,
  resetArmed: false,
};

var store = { kind: "none", ref: null, status: "loading" };

var $app = document.getElementById("app");

var WORDS = allWords();
var BYID = {},
  AMAP = {},
  FLAT = [];
CASES.forEach(function (c) {
  BYID[c.id] = c;
});
ARTICLES.forEach(function (a) {
  AMAP[a.id] = a;
});
EVCASES.forEach(function (c) {
  BYID[c.id] = c;
  c.steps.forEach(function (s) {
    s.words.forEach(function (w) {
      var k = w.w.toLowerCase();
      if (!WORDS[k]) WORDS[k] = w;
    });
  });
});
PLAN.forEach(function (p, g) {
  var ids = p.b.concat(p.s);
  ids.forEach(function (id, i) {
    FLAT.push({ g: g, i: i, id: id, boss: false, n: ids.length + 1 });
  });
  FLAT.push({ g: g, i: ids.length, id: p.boss, boss: true, n: ids.length + 1 });
});
