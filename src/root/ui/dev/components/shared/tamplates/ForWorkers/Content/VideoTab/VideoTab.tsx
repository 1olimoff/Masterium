import React from "react";
import { cn } from "@/root/business/lib/utils";
import { useTranslations } from "next-intl";

interface VideoFetch {
  id: number;
  file_url: string;
  user_id: string;
  created_at: string;
}

interface Props {
  className?: string;
  videos: VideoFetch[];
}

export const VideoTab = ({ className, videos }: Props) => {
  const t = useTranslations("VideoTab");

  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-2 lg:grid-cols-3 gap-4 mb-4">
        {videos.slice(0, 6).map((video, index) => (
          <div
            key={video.id}
            className="aspect-video w-full shadow rounded overflow-hidden"
          >
            {video.file_url ? (
              <iframe
                width="100%"
                height="100%"
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${video.file_url}`}
                title={`Video ${video.id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy" 
              ></iframe>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                Video unavailable
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};