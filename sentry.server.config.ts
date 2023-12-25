// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import config from "config"

if(config.get("sentry.enableServer") === true){
  Sentry.init({
    dsn: "https://c52ca9a11e30a1bcbac94975b4bacc07@o1195354.ingest.sentry.io/4506450860179456",
    tracesSampleRate: 1,
    debug: config.get("sentry.sentryDebug"),
  });
}
