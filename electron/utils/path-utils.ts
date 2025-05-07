import { app } from "electron";
import path from "path";
import { isDev } from "./dev-utils.js";

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/build/electron/preload.cjs"
  );
}

export function getUIPath() {
  return path.join(app.getAppPath(), "/build/react/index.html");
}

export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/shared/assets");
}
