import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import ImagePreview from "@/shared/ui/custom/image-preview";

import { AnimatedShinyText } from "@/shared/ui/custom/animated-shiny-text";
import CircularLoading from "@/shared/ui/custom/circular-loading";
import { Label } from "@/shared/ui/label";
import { Skeleton } from "@/shared/ui/skeleton";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import type { ExpensePolicyResult } from "../model/expense-policy.types";

interface ImageCardProps {
  image: File;
  result: ExpensePolicyResult;
  onDelete: () => void;
}

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size}B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)}KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)}MB`;
  return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
};

const ImageCard = ({ image, result, onDelete }: ImageCardProps) => {
  const isAnalyzing = true;
  const [isManualInput, setIsManualInput] = useState(false);
  return (
    <Card className="w-80 shadow-xl border border-gray-200">
      <CardHeader className="border-b bg-muted/40 rounded-t-lg">
        <ImageCardHeader image={image} isAnalyzing={isAnalyzing} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg overflow-hidden w-full">
            <ImagePreview image={image} />
          </div>
        </div>
        <AIAnalyzingResult
          result={isAnalyzing ? undefined : result}
          isAnalyzing={isAnalyzing}
          isManualInput={isManualInput}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="secondary" onClick={onDelete}>
          삭제
        </Button>
        {isAnalyzing && (
          <>
            <Button variant="secondary" onClick={() => setIsManualInput(true)}>
              수동입력
            </Button>
          </>
        )}

        <Button disabled={isAnalyzing}>제출</Button>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;

const ImageCardHeader = ({
  image,
  isAnalyzing,
}: {
  image: File;
  isAnalyzing: boolean;
}) => {
  return (
    <>
      <div className="flex items-center justify-start gap-2">
        {isAnalyzing ? (
          <CircularLoading size="sm" />
        ) : (
          <Sparkles className="size-4 min-w-4" />
        )}
        <span className="font-semibold text-gray-700 line-clamp-1 max-w-64">
          {image.name}
        </span>
      </div>
      <div className="flex gap-1">
        {isAnalyzing && (
          <>
            <div className="flex items-center gap-2 ">
              <AnimatedShinyText className="text-sm font-black">
                Analyzing...
              </AnimatedShinyText>
            </div>
          </>
        )}
        <div className="flex gap-1 ml-auto">
          <Badge variant="secondary">{formatFileSize(image.size)}</Badge>
          <Badge variant="secondary">{image.type}</Badge>
        </div>
      </div>
    </>
  );
};

const AIAnalyzingResult = ({
  result,
  isAnalyzing,
  isManualInput,
}: {
  result: ExpensePolicyResult | undefined;
  isAnalyzing: boolean;
  isManualInput: boolean;
}) => {
  const categoryList = ["개인경비", "자기계발비", "의료비", "경조사비"];

  const LabelItem = ({
    label,
    value,
    isAnalyzing,
  }: {
    label: string;
    value: React.ReactNode;
    isAnalyzing: boolean;
  }) => {
    return (
      <div className="flex gap-2 my-2 items-center">
        <Label className="text-sm font-medium w-12 border-r-2">{label}</Label>
        {isAnalyzing && !isManualInput ? (
          <Skeleton className="w-full h-[20px] rounded-full" />
        ) : (
          <span className="text-sm">{value}</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {categoryList.map((category) => (
          <div key={category}>
            <Badge
              variant={
                isAnalyzing
                  ? "outline"
                  : result?.category.main === category
                    ? "default"
                    : "secondary"
              }
            >
              {category}
            </Badge>
          </div>
        ))}
      </div>
      <div>
        <LabelItem
          label="일시"
          value={result?.extracted.date}
          isAnalyzing={isAnalyzing}
        />
        <LabelItem
          label="금액"
          value={
            result?.extracted.amount
              ? `${result.extracted.amount.toLocaleString("ko-KR", {
                  currency: "KRW",
                })}원`
              : "0원"
          }
          isAnalyzing={isAnalyzing}
        />
        <LabelItem
          label="장소"
          value={result?.extracted.event}
          isAnalyzing={isAnalyzing}
        />
        <LabelItem
          label="내역"
          value={result?.extracted.detail}
          isAnalyzing={isAnalyzing}
        />
      </div>
    </div>
  );
};
