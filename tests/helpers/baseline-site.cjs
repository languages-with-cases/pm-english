// Serve the immutable pre-refactor revision for differential browser checks.
const http = require("node:http"),
  { execFileSync } = require("node:child_process");
const BASE = "c6d5a78344c40e8e5ff0f1a005a53d97875b0d00";
async function baselineSite() {
  const cache = new Map();
  const server = http.createServer((req, res) => {
    const file =
      decodeURIComponent(new URL(req.url, "http://localhost").pathname).replace(/^\//, "") ||
      "index.html";
    if (file.includes("..")) {
      res.writeHead(400);
      res.end();
      return;
    }
    try {
      if (!cache.has(file))
        cache.set(
          file,
          execFileSync("git", ["show", BASE + ":" + file], {
            maxBuffer: 10 * 1024 * 1024,
            stdio: ["ignore", "pipe", "ignore"],
          }),
        );
      res.setHeader(
        "content-type",
        file.endsWith(".js")
          ? "text/javascript; charset=utf-8"
          : file.endsWith(".css")
            ? "text/css; charset=utf-8"
            : "text/html; charset=utf-8",
      );
      res.end(cache.get(file));
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return {
    url: "http://127.0.0.1:" + server.address().port + "/",
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
module.exports = { baselineSite, BASE };
