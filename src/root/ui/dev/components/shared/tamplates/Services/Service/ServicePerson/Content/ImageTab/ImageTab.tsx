import React from "react";
import { cn } from "@/root/business/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  className?: string;
}

export const ImageTab = ({ className }: Props) => {
  const t = useTranslations("ImageTab");

  const imageUrls: string[] = t.raw("images");

  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-2 lg:grid-cols-3 gap-4 mb-4">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="w-full aspect-video overflow-hidden rounded shadow"
          >
            <img
              src={url}
              alt={`Rasm ${index + 1}`}
              className="w-full h-full object-cover rounded-[15px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};