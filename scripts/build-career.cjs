/* Build career track scripts from the frozen source contract and reviewed authoring files. */
const fs = require("node:fs");
const BASE = "a55e1ced315c6e73e2bcb1aa6cde55fd4bd044b1";
function baseline() {
  const source = JSON.parse(fs.readFileSync("content/baseline.json", "utf8"));
  if (source.sourceCommit !== BASE) throw new Error("Unexpected career baseline provenance");
  return source.tracks;
}

function tsv(path, columns) {
  const out = {};
  for (const [i, line] of fs.readFileSync(path, "utf8").trim().split("\n").entries()) {
    const [key, ...v] = line.split("|");
    if (v.length !== columns || out[key])
      throw Error(path + ":" + (i + 1) + " invalid/duplicate row");
    out[key] = v;
  }
  return out;
}
function generate() {
  const tracks = baseline(),
    book = JSON.parse(fs.readFileSync("content/storybook.json", "utf8"));
  const fixes = JSON.parse(fs.readFileSync("content/accuracy-fixes.json", "utf8"));
  const benefit = tsv("content/alternative-reasons.tsv", 2);
  const rubric = JSON.parse(fs.readFileSync("content/rubric.json", "utf8"));
  const vocabulary = JSON.parse(fs.readFileSync("content/vocabulary.json", "utf8"));
  for (const [track, j] of Object.entries(tracks)) {
    const rows = tsv("content/" + track + ".tsv", track === "dev" || track === "pm" ? 3 : 4);
    const concise =
      track === "dev" || track === "pm" ? tsv("content/" + track + "-best.tsv", 1) : null;
    const covered = new Set();
    j.cases.forEach((c) => {
      c.steps.forEach((s, i) => {
        const key = c.id + "." + i,
          row = rows[key];
        if (!row) throw Error("Missing " + track + "/" + key);
        covered.add(key);
        const [best, rawA, rawB, reason] = concise ? [concise[key][0], ...row] : row;
        let a = rawA,
          b = rawB;
        const extra = benefit[track + "/" + c.id];
        if (extra && i === 0) {
          if (extra[0] === "A") a += " " + extra[1];
          else b += " " + extra[1];
        }
        const source = s.options.slice().sort((a, b) => (b.p || 0) - (a.p || 0));
        const maximum = Math.max(...source.map((o) => o.p));
        if (!(maximum > 0)) throw Error("Invalid baseline maximum " + track + "/" + key);
        // Authored alternatives have full/partial/contextually weak value, not crude tone cues.
        const mid = track === "dev" || track === "pm" ? b : a,
          low = track === "dev" || track === "pm" ? a : b;
        const opts = [
          { t: best, p: maximum, ok: true, c: reason },
          { t: mid, p: Math.round(maximum * 0.7), ok: false, c: reason },
          { t: low, p: Math.floor(maximum * 0.3), ok: false, c: reason },
        ];
        opts.forEach((o, rank) => {
          if (source[rank].e) o.e = source[rank].e.slice();
        });
        for (const label of rubric.fullCredit[track + "/" + key] || []) {
          const index =
            track === "dev" || track === "pm" ? (label === "B" ? 1 : 2) : label === "A" ? 1 : 2;
          opts[index].p = maximum;
          opts[index].ok = true;
          if (opts[0].e) opts[index].e = opts[0].e.slice();
        }
        // The previous scripted reactions described different, now removed replies.
        // Reasoning is shown by the existing feedback component; meter/outcome mechanics remain.
        s.options = opts;
        s.explain = reason;
        s.words.forEach((w) => {
          if (fixes.words[w.w.toLowerCase()]) Object.assign(w, fixes.words[w.w.toLowerCase()]);
        });
        const language = (s.msg + " " + best + " " + a + " " + b).toLowerCase();
        vocabulary
          .filter(
            (w) =>
              language.includes(w.w.toLowerCase()) &&
              !s.words.some((x) => x.w.toLowerCase() === w.w.toLowerCase()),
          )
          .slice(0, 2)
          .forEach((w) => s.words.push({ ...w }));
        if (s.words.length) {
          s.explain +=
            "\n\nEnglish in use: " +
            s.words
              .slice(0, 2)
              .map((w) => "“" + w.w + "” — " + w.ru + ". " + w.how)
              .join(" ");
        }
        if (s.alt) s.alt = "Your previous reply left a constraint unresolved. " + s.msg;
        if (fixes.messages[track + "/" + key]) {
          s.msg = fixes.messages[track + "/" + key];
          if (s.alt) s.alt = "The previous trade-off remains unresolved. " + s.msg;
        }
        if (i === 0 && book.links[track][c.id]) s.msg = book.links[track][c.id] + "\n\n" + s.msg;
        // No index or length reveals the source key; the existing UI still shuffles each attempt.
        const offset = [...(track + key)].reduce((n, ch) => n + ch.charCodeAt(0), 0) % 3;
        s.options = s.options.slice(offset).concat(s.options.slice(0, offset));
      });
    });
    if (covered.size !== Object.keys(rows).length) throw Error("Unused authored rows " + track);
    if (concise && covered.size !== Object.keys(concise).length)
      throw Error("Unused concise rows " + track);
    j.story = book.chapters[track].map((ch) => ({ en: ch.en, ru: ch.ru }));
    j.roles.forEach((r, i) => {
      r.en += " In this chapter, practise " + book.chapters[track][i].learning + ".";
    });
    for (const [key, fix] of Object.entries(fixes.extras)) {
      const [t, id] = key.split("/");
      if (t !== track) continue;
      if (!j.lx[id]) throw Error("Unknown language extra " + key);
      Object.assign(j.lx[id], fix);
    }
    // Keep verified definitions consistent in case vocabulary, not just one displayed explanation.
  }
  const out = { version: 1, baseline: BASE, tracks };
  fs.mkdirSync("data/career", { recursive: true });
  fs.writeFileSync(
    "data/career/index.js",
    "/* Generated by scripts/build-career.cjs; do not edit by hand. */\nvar CAREER_CONTENT = " +
      JSON.stringify({ version: out.version, baseline: out.baseline, tracks: {} }, null, 2) +
      ";\n",
  );
  for (const [id, track] of Object.entries(tracks))
    fs.writeFileSync(
      "data/career/" + id + ".js",
      "/* Generated by scripts/build-career.cjs from content/. */\nCAREER_CONTENT.tracks." +
        id +
        " = " +
        JSON.stringify(track, null, 2) +
        ";\n",
    );
  return out;
}
if (require.main === module) {
  const out = generate();
  console.log(
    Object.fromEntries(
      Object.entries(out.tracks).map(([k, v]) => [
        k,
        { cases: v.cases.length, steps: v.cases.reduce((n, c) => n + c.steps.length, 0) },
      ]),
    ),
  );
}
module.exports = { baseline, generate };
