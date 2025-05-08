import { Building2, Home, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNetworkState } from "react-use";

const STATUS = {
  OFFICE: "office",
  HOME: "home",
  ANONYMOUS: "anonymous",
} as const;

type Status = keyof typeof STATUS;

const getStatus = (networkInfo: NetworkInfo | null): Status => {
  if (!networkInfo || networkInfo.ssid === undefined) return "ANONYMOUS";
  return networkInfo.isCompanyNetwork ? "OFFICE" : "HOME";
};

export const CheckWorkFromCompany = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const isOnline = useNetworkState().online;

  useEffect(() => {
    window.electron.network.startNetworkMonitoring();
    window.electron.network.onNetworkStatusChanged((info) => {
      setNetworkInfo(info);
    });
    return () => {
      window.electron.network.stopNetworkMonitoring();
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex items-center gap-2 justify-center size-full">
        오프라인
      </div>
    );
  }

  const status = getStatus(networkInfo);
  return (
    <div className="flex items-center gap-2 justify-center size-full flex-col">
      {status === "OFFICE" && (
        <>
          <Building2 className="text-blue-600" />
          <span className="font-medium text-blue-700">SAC 타워</span>
        </>
      )}
      {status === "HOME" && (
        <>
          <Home className="text-green-600" />
          <span className="font-medium text-green-700">WFH</span>
        </>
      )}
      {status === "ANONYMOUS" && (
        <>
          <WifiOff className="text-gray-400" />
          <span className="font-medium text-gray-500">알수없음</span>
        </>
      )}
      {networkInfo?.ssid && (
        <span className="ml-2 text-xs text-gray-400">({networkInfo.ssid})</span>
      )}
    </div>
  );
};

export default CheckWorkFromCompany;
