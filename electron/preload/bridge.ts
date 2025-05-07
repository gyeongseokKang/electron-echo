import { contextBridge } from "electron";
import { ElectronAPI } from "../utils/ipc/types.js";
import { api } from "./api/index.js";

export function setupBridge() {
  contextBridge.exposeInMainWorld("electron", api as ElectronAPI);
}
