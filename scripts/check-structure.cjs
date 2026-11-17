// Verify the production shell and every referenced local asset without running a browser.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const html = fs.readFileSync("index.html", "utf8");
assert.ok(Buffer.byteLength(html) < 12000, "index.html must remain a small shell");
assert.ok(
  !/<style\b|data:image\/|<script(?![^>]*\bsrc=)/i.test(html),
  "no inline CSS, JS, data or images",
);
const scripts = [...html.matchAll(/<script\b([^>]*)><\/script>/g)];
const paths = scripts.map((m) => {
  assert.match(m[1], /\bdefer\b/, "ordered classic scripts must use defer");
  const file = m[1].match(/\bsrc="([^"]+)"/)[1];
  assert.match(file, /\?v=/, "version local scripts for browser caches");
  return file.split("?")[0];
});
assert.equal(new Set(paths).size, paths.length, "no duplicate script registration");
const declarations = new Map();
for (const file of paths) {
  assert.ok(fs.existsSync(file), file);
  const code = fs.readFileSync(file, "utf8");
  new vm.Script(code, { filename: file });
  if (file.startsWith("src/")) {
    assert.ok(!code.includes("data:image/"), "binary images belong in assets/images");
    for (const [, name] of code.matchAll(/^function (\w+)\(/gm)) {
      assert.ok(!declarations.has(name), `duplicate public function ${name}: ${file}`);
      declarations.set(name, file);
    }
  }
}
for (const [, file] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (/^https?:/.test(file)) continue;
  assert.ok(fs.existsSync(file.split("?")[0]), file);
}
assert.equal(paths.at(-1), "src/app/boot.js", "bootstrap runs after all dependencies");
const career = paths.filter((p) => p.startsWith("data/career/"));
assert.equal(career.length, 6, "registry plus five generated tracks");
const data = {};
vm.createContext(data);
for (const file of career) vm.runInContext(fs.readFileSync(file, "utf8"), data);
assert.deepEqual(Object.keys(data.CAREER_CONTENT.tracks).sort(), [
  "an",
  "ba",
  "dev",
  "pm",
  "product",
]);
console.log(
  `PASS: small shell; ${paths.length} ordered scripts and all assets exist; syntax and public names valid; five generated tracks registered.`,
);
