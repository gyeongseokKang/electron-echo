import useExpenseImagesStore from "@/features/expense/model/useExpenseImagesStore";
import ImageCard from "@/features/expense/ui/ImageCard";
import { PageBody } from "@/shared/ui/layout/page-body";
import { PageHeader } from "@/shared/ui/layout/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expense/uploader")({
  component: RouteComponent,
});

function RouteComponent() {
  const images = useExpenseImagesStore((state) => state.images);
  const removeImage = useExpenseImagesStore((state) => state.removeImage);

  return (
    <>
      <PageHeader />
      <PageBody>
        <div className="flex flex-wrap gap-4">
          {images.map((image) => {
            if (!image.file) return null;
            return <ImageCard image={image.file} />;
          })}
        </div>
      </PageBody>
    </>
  );
}
