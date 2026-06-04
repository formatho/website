function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/tools/"
      });
      console.log("✅ Service Worker registered:", registration.scope);
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.log("🆕 New version available! Refresh to update.");
          }
        });
      });
    } catch (error) {
      console.error("❌ Service Worker registration failed:", error);
    }
  });
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("🔄 Service Worker updated, reloading page...");
    window.location.reload();
  });
}
export {
  registerServiceWorker
};
