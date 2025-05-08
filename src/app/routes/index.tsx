import { Button } from "@/shared/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);

  useEffect(() => {
    window.electron.network.startNetworkMonitoring();
    window.electron.network.onNetworkStatusChanged((networkInfo) => {
      setNetworkInfo(networkInfo);
    });
    return () => {
      window.electron.network.stopNetworkMonitoring();
    };
  }, []);

  return (
    <div className="p-2">
      <div className="bg-blue-200">
        <div className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90">
          asdf
        </div>
        <div className="bg-destructive  text-4xl">asdfas</div>
        <Button>AAAAA</Button>
        <Button variant={"destructive"} className="bg-red-500 text-4xl">
          AAAAA
        </Button>
      </div>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <div className="networkInfo">
        {networkInfo?.isCompanyNetwork ? "Company Network" : "Public Network"}
        {networkInfo?.ssid}
      </div>
    </div>
  );
}
