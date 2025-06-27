
import React from "react";
import { cn } from "@/root/business/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  className?: string;
}

export const VideoTab = ({ className }: Props) => {
  const t = useTranslations("VideoTab");

  // JSON ichidan massiv sifatida olish
  const videoIds: string[] = t.raw("videoId");

  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-2 lg:grid-cols-3 gap-4 mb-4">
        {videoIds.map((id, index) => (
          <div
            key={index}
            className="aspect-video w-full shadow rounded overflow-hidden"
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};
