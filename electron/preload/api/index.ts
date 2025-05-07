import { ipcInvoke, ipcOn, ipcSend } from "../../utils/ipc/renderer.js";

export const api = {
  subscribeStatistics: (callback: (stats: any) => void) =>
    ipcOn("statistics", callback),

  subscribeChangeView: (callback: (view: any) => void) =>
    ipcOn("changeView", callback),

  getStaticData: () => ipcInvoke("getStaticData"),

  sendFrameAction: (payload: any) => ipcSend("sendFrameAction", payload),
};
