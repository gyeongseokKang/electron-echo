import { ExpenseDashboardItem } from "@/features/expense/ui/ExpenseDashboardItem";
import { WorkFromHomeDashboardItem } from "@/features/network/ui/WorkFromHomeDashboardItem";
import { BentoCard, BentoGrid } from "@/shared/ui/custom/bento-grid";
import { createFileRoute } from "@tanstack/react-router";
import { CircleX } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <BentoGrid className="grid-rows-6 grid-cols-6 size-full bg-red-200 p-4">
      <BentoCard
        name="Expense Form Uploader"
        label="경비신청서"
        className="col-start-1 col-end-3 row-start-1 row-end-3"
      >
        <BentoCardErrorBoundary>
          <ExpenseDashboardItem />
        </BentoCardErrorBoundary>
      </BentoCard>
      <BentoCard
        name="Check Work From Company"
        className="col-start-5 col-end-7 row-start-1 row-end-1"
      >
        <BentoCardErrorBoundary>
          <WorkFromHomeDashboardItem />
        </BentoCardErrorBoundary>
      </BentoCard>
    </BentoGrid>
  );
}

const BentoCardErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="size-full flex items-center justify-center">
          <CircleX className="size-10 text-red-300" />
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};
