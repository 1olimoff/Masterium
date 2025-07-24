"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const data = [
  { src: "/img/advertising/gozo.png", alt: "Gozo" },
  { src: "/img/advertising/honadon.png", alt: "Honadon" },
  { src: "/img/advertising/dusel.png", alt: "Dusel" },
  { src: "/img/advertising/hi-tech.png", alt: "Hi-tech" },
];

export const AdGrid = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    let start: number | null = null;
    let position = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      position += 0.5; // speed


      if (slider.scrollWidth / 2 <= position) {
        position = 0;
      }

      slider.style.transform = `translateX(-${position}px)`;

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

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
        {/* Repeat twice for infinite loop */}
        {[...data, ...data].map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] h-[170px] relative flex-shrink-0 rounded-xl overflow-hidden"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
