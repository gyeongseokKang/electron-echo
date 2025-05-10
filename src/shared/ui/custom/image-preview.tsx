import { useDisclosure } from "@/shared/hooks/useDisclosure";
import { cn } from "@/shared/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Lens } from "./lens";

interface ImagePreviewProps {
  image: File | undefined;
  className?: string;
}

const ImagePreview = ({ image, className }: ImagePreviewProps) => {
  const { isOpen, onChange, onOpen } = useDisclosure();

  if (!image) return null;
  const imgSrc = URL.createObjectURL(image);

  return (
    <div className={cn("py-2", className)}>
      <img
        className="aspect-video w-60 rounded-md"
        src={imgSrc}
        alt={image.name}
        onClick={() => {
          onOpen();
        }}
      />
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{image.name}</DialogTitle>
          </DialogHeader>
          <Lens zoomFactor={2}>
            <img src={imgSrc} alt={image.name} />
          </Lens>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagePreview;
