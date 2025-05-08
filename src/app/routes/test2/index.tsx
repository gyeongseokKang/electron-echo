import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test2/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/about"!</div>;
}
