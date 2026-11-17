/**
 * Stable storage keys, scoring constants and public Firebase web configuration. Changes here affect saved-progress compatibility.
 * Classic browser script; dependency order is declared in index.html.
 */
var KEY = "pm-english-bank-v1";

var GOAL = 1,
  GOAL_XP = 15,
  QUIZ_XP = 2,
  QUIZ_BONUS = 5;

var MILESTONES = [
  [3, 20],
  [5, 30],
  [10, 60],
  [20, 120],
  [30, 200],
  [50, 300],
  [100, 500],
];

var INTERVALS = [3, 8, 20, 40];

var LX_TONE_XP = 5,
  LX_VOICE_XP = 5,
  LX_TEXT_XP = 3,
  LX_TRIES = 3;

var NUMW = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
};

var CLOUD_CONFIG = {
  apiKey: "AIzaSyApsFZXfpCCSuDIBJ7h-BP6mQs75wNSOgw",
  authDomain: "pm-english-25a4f.firebaseapp.com",
  projectId: "pm-english-25a4f",
  appId: "1:911583953599:web:28f669911be0ec0e89fc0a",
};

var CLOUD_SDK = "https://www.gstatic.com/firebasejs/10.14.1/";

var PASS_PCT = 0.67;

var KEY2 = "pm-english-tracks-v2";

var RESET_TAG = "reset-2026-10-25";
