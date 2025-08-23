"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ADvisitka {
  id: number;
  description: string;
  image_url: string;
  type: string;
  start_date: string;
  end_date: string;
  country: string;
  is_active: boolean;
}

interface Props {
  advisitka: ADvisitka[] | null | undefined;
}

export const AdGrid = ({ advisitka }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    let start: number | null = null;
    let position = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      position += 0.5;

      if (position >= slider.scrollWidth / 2) {
        position = 0;
      }

      slider.style.transform = `translateX(-${position}px)`;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Safely handle the advisitka prop
  const activeAds = Array.isArray(advisitka) ? advisitka.filter((item) => item.is_active) : [];

  // Create repeated ads for infinite scroll effect
  const repeatedAds = Array(10).fill(activeAds).flat();

  // Handle case when no active ads are available
  if (activeAds.length === 0) {
    return <p className="text-center text-gray-500">Reklama mavjud emas</p>;
  }

  // Ensure base URL is defined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="flex gap-4"
        style={{
          width: "max-content",
          transform: "translateX(0px)",
          whiteSpace: "nowrap",
        }}
      >
        {repeatedAds.map((item, index) => (
          <div
            key={`${item.id}-${index}`} // Use unique key with id and index
            className="min-w-[300px] h-[170px] relative flex-shrink-0 rounded-xl overflow-hidden"
          >
            <Image
              src={`${baseUrl}${item.image_url}`}
              alt={item.description || `Ad ${item.id}`}
              fill
              className="object-cover rounded-xl"
              onError={(e) => {
                console.error(`Failed to load image: ${baseUrl}${item.image_url}`);
                e.currentTarget.src = "/fallback-image.png"; // Optional: Fallback image
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};