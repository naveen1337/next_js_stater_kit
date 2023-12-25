// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import config from "config"

if(config.get("sentry.enableEdge") === true){
Sentry.init({
  dsn: "https://c52ca9a11e30a1bcbac94975b4bacc07@o1195354.ingest.sentry.io/4506450860179456",
  tracesSampleRate: 1,
  debug: config.get("sentry.sentryDebug")
});
}
