import { app, BrowserWindow, ipcMain } from "electron";
import { createApplicationTray } from "./features/tray/createApplicationTray.js";

import { createApplicationMenu } from "./features/menu/createApplicationMenu.js";
import { NetworkManager } from "./features/network/networkManager.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { isDev } from "./utils/dev-utils.js";
import { ipcMainHandle, ipcMainOn } from "./utils/ipc/main.js";
import { getPreloadPath, getUIPath } from "./utils/path-utils.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    // disables default system frame (dont do this if you want a proper working menu bar)
    frame: false,
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

  ipcMainOn("sendFrameAction", (payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
    }
  });

  handleCloseEvents(mainWindow);

  createApplicationTray(mainWindow);
  createApplicationMenu(mainWindow);

  setupIpcHandlers(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}

function setupIpcHandlers(mainWindow: BrowserWindow) {
  const networkManager = NetworkManager.getInstance();

  // 네트워크 상태 변경 이벤트를 렌더러 프로세스로 전달
  networkManager.on("networkChanged", (networkInfo: any) => {
    mainWindow?.webContents.send("network-status-changed", networkInfo);
  });

  ipcMain.handle("check-company-network", async () => {
    try {
      return await networkManager.checkCompanyNetwork();
    } catch (error) {
      console.error("Error checking company network:", error);
      return {
        isCompanyNetwork: false,
        ssid: undefined,
      };
    }
  });

  ipcMain.handle("start-network-monitoring", async () => {
    try {
      networkManager.startNetworkMonitoring();
      return true;
    } catch (error) {
      console.error("Error starting network monitoring:", error);
      return false;
    }
  });

  ipcMain.handle("stop-network-monitoring", async () => {
    try {
      networkManager.stopNetworkMonitoring();
      return true;
    } catch (error) {
      console.error("Error stopping network monitoring:", error);
      return false;
    }
  });
}
