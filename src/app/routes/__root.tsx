import { Toaster } from "@/shared/ui/sonner";
import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: () => (
    <div className="w-full h-screen">
      {/* <div className="p-2 flex gap-2 ">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr /> */}
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster />
    </div>
  ),
  notFoundComponent: () => <NotFound />,
});

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.state.location.pathname !== "/") {
      router.navigate({ to: "/" });
    }
  }, []);

  return <div>Not Found</div>;
};
