// The source contract and extracted artwork must remain byte-identical to their immutable origin.
require("../../scripts/check-structure.cjs");
const fs = require("node:fs"),
  assert = require("node:assert/strict"),
  crypto = require("node:crypto");
const expected = {
  "assets/images/splash.jpg": "8c812bd5da9c8906211a93b6d732071018154ea485d80e9b343356200493ac90",
  "assets/images/star.png": "4c8c6414b7d056161709699948ca1ba1d752db964995138f7e4202a43701beb7",
  "assets/images/flame.png": "9d25697907d1c0418c7331df44751360df221286e7f6db1cc9d1bd36e31172b8",
  "content/baseline.json": "a14007d4463ccd2ee5fddd6712e66b8ff45b766bbd7eb9869d8eae14f5c47b1f",
};
for (const [file, sha] of Object.entries(expected))
  assert.equal(
    crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
    sha,
    file + " immutable source bytes",
  );
const { execFileSync } = require("node:child_process");
const documented = new Set(
  [...fs.readFileSync("АРХИТЕКТУРА.md", "utf8").matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]),
);
const files = execFileSync("git", ["ls-files", "-cz", "--others", "--exclude-standard"])
  .toString()
  .split("\0")
  .filter((p) => p && fs.existsSync(p));
for (const file of files)
  assert.ok(documented.has(file), "Architecture catalog is missing " + file);
console.log("PASS: immutable baseline and artwork; complete architecture file catalog.");
