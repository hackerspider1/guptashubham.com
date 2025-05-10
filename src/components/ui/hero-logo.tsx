import { cn } from "@/lib/utils";
import React, { Suspense, useEffect, useState } from "react";

interface HeroLogoProps {
  logos: any[];
}

// https://github.com/yixizhang/seed-shuffle/blob/master/index.js
const shuffle = <T,>(array: T[], seed: number): T[] => {
  // Create a copy to avoid mutating the original array
  const newArray = [...array];
  let currentIndex = newArray.length,
    temporaryValue,
    randomIndex;
  seed = seed || 1;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }
  return newArray;
};

const HeroLogos = ({ logos }: HeroLogoProps) => {
  // Use useState to manage animation class which will only be applied on client-side
  const [isClient, setIsClient] = useState(false);
  
  // Generate delays once to avoid hydration mismatches
  const delays = shuffle(
    Array.from({ length: logos.length }, (_, i) => i),
    926303,
  );

  // Only apply animations after component mounts on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate rotation angles for more organic distribution
  const getRotation = (index: number, total: number) => {
    // Create a more natural distribution around the circle
    return (index * 360 / total) + (Math.sin(index) * 15);
  };

  // Get a glow color based on index
  const getGlowColor = (index: number) => {
    const colors = [
      'rgba(59, 130, 246, 0.6)', // blue
      'rgba(16, 185, 129, 0.6)', // green
      'rgba(139, 92, 246, 0.6)', // purple
      'rgba(239, 68, 68, 0.6)',  // red
      'rgba(245, 158, 11, 0.6)'  // amber
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
      <Suspense fallback={null}>
        {logos.map((logo, index) => {
          const mobileWidth = Math.floor(logo?.width * 0.7);
          const mobileHeight = Math.floor(logo?.height * 0.7);
          const rotation = getRotation(index, logos.length);
          const glowColor = getGlowColor(index);
          
          const imageProps = {
            width: logo?.width,
            height: logo?.height,
            src: logo.src,
            alt: logo.alt,
            className: `absolute transform-gpu ${isClient ? 'opacity-0' : ''}`,
            style: {
              animationDelay: isClient ? `${delays[index] * 300}ms` : undefined,
            },
          };
          return (
            <div
              key={`${logo.alt}-${index}`}
              className={cn(
                "absolute left-0 top-0 z-0 flex size-full items-center justify-center",
              )}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <div
                className={cn("opacity-100 transition-opacity", "")}
              >
                <img 
                  {...imageProps} 
                  alt={imageProps.alt} 
                  className={`${imageProps.className} ${isClient ? 'followPath' : ''} ${index % 3 === 0 ? 'twinkle' : ''}`}
                  width={mobileWidth}
                  height={mobileHeight}
                  style={{
                    ...imageProps.style,
                    width: `min(${mobileWidth}px, ${logo?.width}px)`,
                    height: `min(${mobileHeight}px, ${logo?.height}px)`,
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: isClient ? `drop-shadow(0 0 8px ${glowColor})` : 'none',
                    transition: 'filter 0.5s ease-in-out',
                    animationDuration: `${5 + (index % 3)}s`, // Varied durations
                  }}
                  loading={index < 5 ? "eager" : "lazy"}
                  fetchPriority={index < 5 ? "high" : "auto"}
                />
              </div>
              <div
                className={cn("opacity-0 transition-opacity", "")}
              >
                <img
                  {...imageProps}
                  alt={imageProps.alt}
                  width={mobileWidth}
                  height={mobileHeight}
                  style={{
                    ...imageProps.style,
                    filter: `drop-shadow(0 0 5px ${logo.darkShadow.hex})`,
                    width: `min(${mobileWidth}px, ${logo?.width}px)`,
                    height: `min(${mobileHeight}px, ${logo?.height}px)`,
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          );
        })}
      </Suspense>
    </div>
  );
};

export default HeroLogos;
