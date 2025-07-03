import React, { useState } from "react";
import { cn } from "@/root/business/lib/utils";
import { useTranslations } from "next-intl";
import { X } from "lucide-react"; // Yopish tugmasi uchun ikonka

interface Props {
  className?: string;
}

export const ImageTab = ({ className }: Props) => {
  const t = useTranslations("ImageTab");
  const imageUrls: string[] = t.raw("images");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="w-full aspect-video overflow-hidden rounded-lg shadow cursor-pointer hover:brightness-95"
            onClick={() => setSelectedImage(url)}
          >
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative bg-white rounded-xl p-2 max-w-2xl w-[95%] shadow-lg">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Close image modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img 
              src={selectedImage}
              alt="Selected"
              className="rounded-lg object-contain max-h-[80vh] w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
