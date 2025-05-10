"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
  color = "blue",
}: {
  number?: number;
  className?: string;
  color?: "blue" | "green" | "purple" | "orange" | "rainbow";
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // If not mounted (server side), return a placeholder with the same dimensions
  if (!isMounted) {
    return <div className={`relative overflow-hidden pointer-events-none ${className}`} />;
  }
  
  const meteors = new Array(number || 20).fill(true);
  
  // Function to get color based on preference
  const getMeteorColor = (index: number) => {
    if (color === "rainbow") {
      const colors = [
        "from-blue-500 via-blue-400",
        "from-green-500 via-green-400",
        "from-purple-500 via-purple-400",
        "from-orange-500 via-orange-400",
        "from-pink-500 via-pink-400",
      ];
      return colors[index % colors.length];
    }
    
    const colorMap = {
      blue: "from-blue-500 via-blue-400",
      green: "from-green-500 via-green-400",
      purple: "from-purple-500 via-purple-400", 
      orange: "from-orange-500 via-orange-400",
    };
    
    return colorMap[color];
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden pointer-events-none"
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (100 / meteorCount);
        // Randomize size for more natural look
        const size = Math.random() * 1 + 0.25;
        // Randomize duration for more varied effect
        const duration = Math.floor(Math.random() * (10 - 5) + 5);
        // Randomize angle slightly for varied trajectories
        const angleVariation = (Math.random() * 10) - 5;

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "absolute h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] shadow-[0_0_0_1px_#ffffff10]",
              className,
            )}
            style={{
              top: "-40px", 
              left: `calc(${position}% - 50px)`,
              animationDelay: Math.random() * 8 + "s",
              animationDuration: `${duration}s`,
              transform: `rotate(${215 + angleVariation}deg) scale(${size})`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          >
            <div className={cn(
              "absolute h-[50px] w-[1px] bg-gradient-to-b opacity-70",
              getMeteorColor(idx),
              "to-transparent"
            )} />
            
            {/* Add subtle glow effect */}
            <div className="absolute left-0 top-0 h-[1px] w-[1px] rounded-full bg-white blur-[1px]" />
          </span>
        );
      })}
    </motion.div>
  );
};
