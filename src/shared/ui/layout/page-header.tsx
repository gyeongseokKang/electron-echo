import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { useLocation } from "@tanstack/react-router";

export const PageHeader = () => {
  const current = useLocation();

  const pathname = current.pathname;

  // 경로를 배열로 분리 (예: /expense/upload → ['expense', 'upload'])
  const segments = pathname.split("/").filter(Boolean);

  // 누적 경로 생성 (예: ['expense', 'upload'] → ['/expense', '/expense/upload'])
  const paths = segments.map(
    (_: string, idx: number) => "/" + segments.slice(0, idx + 1).join("/")
  );

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 h-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.length > 0 && <BreadcrumbSeparator />}
          {/* 동적 경로 */}
          {segments.map((segment: string, idx: number) => {
            const isLast = idx === segments.length - 1;
            // 경로를 보기 좋게 변환 (필요시 커스텀)
            const label = decodeURIComponent(segment)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <BreadcrumbItem key={paths[idx]}>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={paths[idx]}>{label}</BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
