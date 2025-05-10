import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { ImageUp } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useExpenseImagesStore from "../model/useExpenseImagesStore";

const formSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, "하나 이상의 이미지를 업로드 해주세요."),
});

export const ExpenseDashboardItem = () => {
  const router = useRouter();
  const addImages = useExpenseImagesStore((state) => state.addImages);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      images: [],
    },
  });

  const handleExpenseUploadPage = (files: File[]) => {
    addImages(files);
    router.navigate({
      to: "/expense/uploader",
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        form.setValue("images", acceptedFiles, { shouldValidate: true });
        handleExpenseUploadPage(acceptedFiles);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    multiple: true,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
  });

  return (
    <div className="flex items-center gap-2 justify-center size-full flex-col">
      <Form {...form}>
        <form className="size-full p-4" onSubmit={form.handleSubmit(() => {})}>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>영수증 이미지 업로드 (여러 개 선택 가능)</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className={`border-2 size-full rounded flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-dashed border-muted"
                    }`}
                  >
                    <ImageUp className="text-muted-foreground size-12 mb-2" />
                    <input
                      {...getInputProps()}
                      type="file"
                      className="hidden"
                      multiple
                    />
                    <span className="text-sm text-muted-foreground">
                      {isDragActive
                        ? "여기에 파일을 놓으세요"
                        : "클릭 또는 드래그해서 이미지를 업로드 (여러 개 가능)"}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ExpenseDashboardItem;
