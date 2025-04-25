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
  title?: string;
}

const LogoMarquee = ({
  logos,
  className = "",
  speed = 35,
  direction = "right",
  pauseOnHover = true,
  gradientWidth = 100,
  gradientColor = "#101414",
  imagePath = "/hall-of-fame/",
  title
}: LogoMarqueeProps) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {title && (
        <div className="text-center mb-3">
          <h3 className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{title}</h3>
        </div>
      )}
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
            className="flex items-center justify-center px-6 min-w-[150px]"
          >
            <div className="relative group p-2 transition-all duration-300">
              <img
                style={{ maxHeight: `${logo.maxHeight}px` }}
                className="object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                src={`${imagePath}${logo.file}`}
                alt={logo.name}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LogoMarquee; 