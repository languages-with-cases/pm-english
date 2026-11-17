// Read the production registry files in the same order as index.html.
const fs = require("node:fs");
const careerFiles = [
  ...fs.readFileSync("index.html", "utf8").matchAll(/<script[^>]+src="([^"]+)"/g),
]
  .map((m) => m[1].split("?")[0])
  .filter((p) => p.startsWith("data/career/"));
module.exports = { careerFiles };
