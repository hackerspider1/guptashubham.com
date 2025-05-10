"use client";

import React, { useState } from 'react';
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface LogoItem {
  name: string;
  file: string;
  maxHeight: number;
  url?: string;
  brandColor?: string;
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

// Default brand colors mapping with enhanced colors
const defaultBrandColors: Record<string, string> = {
  'Spotify': '#1DB954',
  'Apple': '#A2AAAD',
  'Microsoft': '#00A4EF',
  'BaiDu': '#2932E1',
  'Google': '#4285F4',
  'Bugcrowd': '#F26822',
  'HackerOne': '#494949',
  'AT&T': '#00A8E0',
  'Kaspersky': '#006D5C'
};

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
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  // Special animation for certain companies
  const getSpecialAnimation = (companyName: string) => {
    if (companyName === 'Spotify' || companyName === 'Google') {
      return {
        rotateY: [0, 10, 0, -10, 0],
        transition: {
          duration: 10,
          repeat: Infinity,
          repeatType: "loop" as const,
        }
      };
    }
    if (companyName === 'Apple' || companyName === 'Microsoft') {
      return {
        y: [0, -5, 0, 5, 0],
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "loop" as const,
        }
      };
    }
    return {};
  };

  return (
    <div className={cn("relative w-full overflow-hidden logo-marquee-container", className)}>
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
        {logos.map((logo) => {
          // Use provided brand color or fallback to default mapping
          const brandColor = logo.brandColor || defaultBrandColors[logo.name] || '#777777';
          // Vary logo sizes to create more visual interest - using company-specific sizes
          const sizeVariation = 
            logo.name === 'Apple' ? 1.15 : 
            logo.name === 'Spotify' ? 1.12 : 
            logo.name === 'Bugcrowd' ? 1.1 : 
            logo.name === 'Google' ? 1.08 : 
            logo.name === 'Microsoft' ? 1.05 : 0.95;
            
          const logoMaxHeight = Math.round(logo.maxHeight * sizeVariation);
          const isHovered = hoveredLogo === logo.name;
          const specialAnimation = getSpecialAnimation(logo.name);
          
          return (
            <div
              key={logo.name}
              className="flex items-center justify-center px-4 sm:px-6 min-w-[150px] sm:min-w-[180px]"
              onMouseEnter={() => setHoveredLogo(logo.name)}
              onMouseLeave={() => setHoveredLogo(null)}
            >
              <a 
                href={logo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative group py-3 px-3 hof-logo-container"
                data-company={logo.name}
              >
                {/* Enhanced brand color background */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-all duration-500" 
                  style={{ backgroundColor: brandColor }}
                />
                
                {/* Brand color accent line at bottom */}
                <div 
                  className="hof-logo-brand-color" 
                  style={{ backgroundColor: brandColor }}
                />
                
                {/* Pulsing glow effect for certain companies */}
                <div
                  className="hof-logo-pulse-glow"
                  style={{ backgroundColor: brandColor }}
                />
                
                {/* Logo container with enhanced size and styling */}
                <div className="relative flex items-center justify-center p-2 rounded-lg overflow-hidden transform-gpu">
                  {/* Company-specific background shapes */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at center, ${brandColor}, transparent 70%)`,
                    }}
                  />
                  
                  {/* The actual logo image with special animations */}
                  <motion.img
                    style={{ 
                      maxHeight: `${logoMaxHeight}px`,
                      height: 'auto',
                      maxWidth: '140px',
                      width: 'auto',
                    }}
                    className="object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 relative z-10"
                    src={`${imagePath}${logo.file}`}
                    alt={logo.name}
                    loading="lazy"
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      y: isHovered ? -2 : 0,
                      ...specialAnimation,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  
                  {/* Enhanced glow effect on hover */}
                  <div 
                    className="hof-logo-glow"
                    style={{ 
                      boxShadow: `0 0 25px 8px ${brandColor}`,
                      background: `radial-gradient(circle at center, ${brandColor}40 0%, transparent 70%)`
                    }}
                  />
                </div>
                
                {/* Enhanced tooltip on hover */}
                <motion.div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-zinc-800/90 text-[10px] text-zinc-300 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none border border-zinc-700/40"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 5
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {logo.name}
                </motion.div>
              </a>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default LogoMarquee; 