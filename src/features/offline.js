/** Offline availability on this device; no permissions or backend required. */
var offlineState = { ready: false, failed: false, updating: false };
function offlineRefresh() {
  if (typeof ui !== "undefined" && ui.loaded && ui.view === "progress") render();
}
function offlineHTML() {
  var message = offlineState.ready
    ? navigator.onLine
      ? "Все пять треков сохранены на устройстве. Можно учиться без интернета."
      : "Вы без интернета. Задания и локальное сохранение доступны."
    : offlineState.failed
      ? "Не удалось скачать приложение. Откройте его снова с интернетом и дождитесь загрузки."
      : "Оставьте приложение открытым с интернетом: скачиваем задания для работы без сети.";
  if (!("serviceWorker" in navigator) || !window.isSecureContext)
    message = "Для офлайн-загрузки откройте сайт в браузере через HTTPS.";
  if (offlineState.updating)
    message += " Обновление готово: закройте все вкладки приложения и откройте его снова.";
  return (
    '<div class="row" role="status" aria-live="polite"><div><b>Offline learning · Обучение без сети</b><span>' +
    message +
    "</span></div></div>"
  );
}
async function initOffline() {
  if (!("serviceWorker" in navigator) || !window.isSecureContext) return;
  window.addEventListener("online", offlineRefresh);
  window.addEventListener("offline", offlineRefresh);
  try {
    var registration = await navigator.serviceWorker.register("./service-worker.js", {
      scope: "./",
      updateViaCache: "none",
    });
    offlineState.ready = !!registration.active;
    function observe() {
      offlineState.ready = !!registration.active;
      offlineState.updating = !!registration.waiting;
      offlineRefresh();
    }
    function watch() {
      var worker = registration.installing;
      if (!worker) return;
      worker.addEventListener("statechange", function () {
        if (worker.state === "redundant") offlineState.failed = true;
        observe();
      });
    }
    registration.addEventListener("updatefound", watch);
    watch();
    navigator.serviceWorker.addEventListener("controllerchange", observe);
    navigator.serviceWorker.ready.then(observe);
    observe();
  } catch (error) {
    offlineState.failed = true;
    offlineRefresh();
  }
}
