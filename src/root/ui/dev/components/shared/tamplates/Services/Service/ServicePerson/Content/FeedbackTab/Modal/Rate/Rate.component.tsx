"use client";

import { RateSvg } from "@/root/ui/dev/Svg/SvgComponents/RateSvg/RateSvg.component";
import { useState } from "react";
import { motion } from "framer-motion";

export const Rate = ({ onRateChange }: { onRateChange: (rating: number) => void }) => {
  const [rateCount, setRateCount] = useState<number>(0);

  const handleClick = (i: number): void => {
    setRateCount(i + 1);
    onRateChange(i + 1);
  };

  return (
    <div className="flex justify-center space-x-4 mb-4">
      {new Array(5).fill(null).map((_, i) => (
        <motion.div
          key={i}
          className="h-[32px] w-[32px] cursor-pointer"
          onClick={() => handleClick(i)}
          initial={{ scale: 1 }}
          whileTap={{ scale: 1.3 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            duration: 0.1,
          }}
        >
          <RateSvg
            fill={i < rateCount ? "#FFAC33" : "none"}
            height={32}
            width={32}
            borderColor={i < rateCount ? "#FFAC33" : "#677294"}
            borderWidth={2}
          />
        </motion.div>
      ))}
    </div>
  );
};