import { exec } from "child_process";
import { EventEmitter } from "events";
import { platform } from "os";
interface NetworkInfo {
  isCompanyNetwork: boolean;
  ssid?: string;
}

export class NetworkManager extends EventEmitter {
  private static instance: NetworkManager;
  private companySSIDPatterns: string[] = ["gaudio"];
  private checkInterval: NodeJS.Timeout | null = null;

  private constructor() {
    super();

    this.startNetworkMonitoring();
  }

  public static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager();
    }
    return NetworkManager.instance;
  }

  private async getWindowsSSID(): Promise<string | undefined> {
    return new Promise((resolve) => {
      exec("netsh wlan show interfaces", (error, stdout) => {
        if (error) {
          console.error("Error getting Windows SSID:", error);
          resolve(undefined);
          return;
        }

        const ssidMatch = stdout.match(/SSID\s+\d+\s+:\s+(.+)/);
        if (ssidMatch && ssidMatch[1]) {
          resolve(ssidMatch[1].trim());
        } else {
          resolve(undefined);
        }
      });
    });
  }

  private async getMacOSSSID(): Promise<string | undefined> {
    return new Promise((resolve) => {
      exec(
        `for i in $(ifconfig -lX "en[0-9]"); do ipconfig getsummary \${i} | awk '/ SSID/ {print $NF}'; done 2> /dev/null`,
        (error, stdout) => {
          if (error) {
            console.error("Error getting macOS SSID:", error);
            resolve(undefined);
            return;
          }

          const ssid = stdout.trim();
          if (ssid) {
            resolve(ssid);
          } else {
            resolve(undefined);
          }
        }
      );
    });
  }

  private async getCurrentSSID(): Promise<string | undefined> {
    const currentPlatform = platform();
    if (currentPlatform === "win32") {
      return await this.getWindowsSSID();
    } else if (currentPlatform === "darwin") {
      return await this.getMacOSSSID();
    }
    return undefined;
  }

  public async checkCompanyNetwork(): Promise<NetworkInfo> {
    const currentSSID = await this.getCurrentSSID();
    const isCompanyNetwork = this.companySSIDPatterns.some((pattern) =>
      currentSSID?.toLowerCase().includes(pattern)
    );

    return {
      isCompanyNetwork,
      ssid: currentSSID,
    };
  }

  private async checkNetworkChange() {
    const networkInfo = await this.checkCompanyNetwork();
    this.emit("networkChanged", networkInfo);
  }

  public startNetworkMonitoring() {
    // 즉시 한 번 체크
    this.checkNetworkChange();

    // 주기적으로 체크
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    // 5분마다 체크
    this.checkInterval = setInterval(
      () => this.checkNetworkChange(),
      1000 * 60 * 5
    );
  }

  public stopNetworkMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}
