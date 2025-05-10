"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Wifi, Activity, ChevronDown, ChevronUp, Monitor, Cpu, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define audio waves icon as we don't have it in lucide-react
const AudioWaves = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 10v3" />
    <path d="M6 6v11" />
    <path d="M10 3v18" />
    <path d="M14 8v7" />
    <path d="M18 5v13" />
    <path d="M22 10v3" />
  </svg>
);

// Define the animation variants
const islandVariants = {
  expanded: {
    width: "auto",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  collapsed: {
    width: "auto",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const contentVariants = {
  expanded: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 }
  },
  collapsed: {
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

interface LocationData {
  ip: string;
  city: string;
  country: string;
}

interface DynamicIslandProps {
  className?: string;
  expanded?: boolean;
  onToggle?: () => void;
  autoCollapse?: boolean;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  className,
  expanded = false, 
  onToggle,
  autoCollapse = true
}) => {
  const [timeString, setTimeString] = useState<string>("");
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [expanded_, setExpanded_] = useState<boolean>(expanded);
  
  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setTimeString(formattedTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Fetch location data
  const fetchLocation = async () => {
    try {
      setLocationLoading(true);
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      setLocationData({
        ip: data.ip,
        city: data.city,
        country: data.country_name
      });
    } catch (error) {
      console.error('Failed to fetch location:', error);
    } finally {
      setLocationLoading(false);
    }
  };
  
  // Initial location fetch
  useEffect(() => {
    fetchLocation();
  }, []);
  
  // Handle toggle and auto collapse
  const handleToggle = () => {
    const newState = !expanded_;
    setExpanded_(newState);
    
    if (onToggle) {
      onToggle();
    }
    
    // Auto collapse after 5 seconds if enabled
    if (newState && autoCollapse) {
      setTimeout(() => {
        setExpanded_(false);
        if (onToggle) {
          onToggle();
        }
      }, 5000);
    }
  };

  return (
    <motion.div
      className={cn(
        "fixed top-3 left-1/2 transform -translate-x-1/2 z-40 flex w-fit items-center justify-center overflow-hidden rounded-[16px] bg-black border border-zinc-800 cursor-pointer shadow-xl", 
        className
      )}
      initial={false}
      animate={expanded_ ? "expanded" : "collapsed"}
      variants={islandVariants}
      onClick={handleToggle}
      style={{
        minWidth: expanded_ ? "280px" : "150px",
        height: expanded_ ? "auto" : "32px",
        borderRadius: expanded_ ? "16px" : "16px",
        maxWidth: expanded_ ? "95vw" : "90vw"
      }}
    >
      <motion.div 
        className="flex w-full h-full items-center justify-between"
        variants={contentVariants}
      >
        {!expanded_ ? (
          // Collapsed state with just time and music info
          <div className="w-full flex items-center justify-between px-3 h-full">
            <span className="text-xs font-medium text-white ml-0.5">{timeString}</span>
            <div className="text-white flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <AudioWaves />
            </div>
          </div>
        ) : (
          // Expanded state with detailed information
          <div className="w-full">
            {/* Top bar with time and music */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-zinc-800/80">
              <span className="text-xs font-medium text-white">{timeString}</span>
              <div className="text-white flex items-center">
                <AudioWaves />
              </div>
            </div>
            
            {/* Location information */}
            <div className="px-3.5 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">Location</h3>
                    {locationLoading ? (
                      <p className="text-zinc-400 text-xs">Fetching...</p>
                    ) : locationData ? (
                      <p className="text-zinc-400 text-xs">{locationData.city}, {locationData.country}</p>
                    ) : (
                      <p className="text-zinc-400 text-xs">Unknown</p>
                    )}
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchLocation();
                  }}
                  className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Refresh
                </button>
              </div>
              
              {/* IP Address information */}
              <div className="flex items-center mt-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                  <Monitor className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium">IP Address</h3>
                  {locationLoading ? (
                    <p className="text-zinc-400 text-xs">Fetching...</p>
                  ) : locationData ? (
                    <p className="text-zinc-400 text-xs">{locationData.ip}</p>
                  ) : (
                    <p className="text-zinc-400 text-xs">Unknown</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DynamicIsland; 