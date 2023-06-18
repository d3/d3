import Posthog from "posthog-js";

export default function enablePosthog(app, router) {
  const posthog = Posthog.init(
    "phc_7KVtf7qQRJ2j4rsHzvJ9UyJ8iwyYw2PqfAMmNEo9FB9",
    {api_host: "https://app.posthog.com"}
  );
  app.config.globalProperties.$posthog = posthog;
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture("$pageview", {
        $current_url: to.fullPath
      });
    });
  });
}
