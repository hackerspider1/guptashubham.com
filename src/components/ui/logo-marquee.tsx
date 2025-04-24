"use client";

import React from 'react';
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";

export interface LogoItem {
  name: string;
  file: string;
  maxHeight: number;
}

interface LogoMarqueeProps {
  logos: LogoItem[];
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gradientWidth?: number;
  gradientColor?: string;
  imagePath?: string;
}

const LogoMarquee = ({
  logos,
  className = "",
  speed = 35,
  direction = "right",
  pauseOnHover = true,
  gradientWidth = 100,
  gradientColor = "#101414",
  imagePath = "/hall-of-fame/"
}: LogoMarqueeProps) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <Marquee
        direction={direction}
        pauseOnHover={pauseOnHover}
        speed={speed}
        gradient={true}
        gradientWidth={gradientWidth}
        gradientColor={gradientColor}
      >
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center px-8 min-w-[160px]"
          >
            <img
              style={{ maxHeight: `${logo.maxHeight}px` }}
              className="object-contain transition-all duration-300 hover:brightness-125"
              src={`${imagePath}${logo.file}`}
              alt={logo.name}
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LogoMarquee; 