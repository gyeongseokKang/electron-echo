import { mockResults } from "@/features/expense/model/mock";
import useExpenseImagesStore from "@/features/expense/model/useExpenseImagesStore";
import ImageCard from "@/features/expense/ui/ImageCard";
import { PageBody } from "@/shared/ui/layout/page-body";
import { PageHeader } from "@/shared/ui/layout/page-header";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/expense/uploader")({
  component: RouteComponent,
});

function RouteComponent() {
  const images = useExpenseImagesStore((state) => state.images);
  const removeImage = useExpenseImagesStore((state) => state.removeImage);
  const router = useRouter();
  useEffect(() => {
    if (images.length === 0) {
      router.navigate({ to: "/" });
    }
  }, [images]);

  return (
    <>
      <PageHeader />
      <PageBody>
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => {
            if (!image.file) return null;
            return (
              <ImageCard
                key={index}
                image={image.file}
                result={mockResults[index]}
                onDelete={() => removeImage(image.id)}
              />
            );
          })}
        </div>
      </PageBody>
    </>
  );
}
