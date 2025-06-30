/**
 * Floating Dock: Now includes XSS & CORS tools
 **/
"use client";

import { cn } from "@/lib/utils";
import LiquidGlass from "./liquid-glass";
import { 
  IconGlobe, 
  IconBug, 
  IconTools, 
  IconHome, 
  IconFile, 
  IconBrandX,
  IconUser,
  IconNotes,
  IconMessage
} from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GithubLogo } from "phosphor-react";
import { useRef, useState, useEffect } from "react";

// Removed the hardcoded dockItems - now only using the items passed in as props

export const FloatingDock = ({
  className,
}: {
  className?: string;
}) => {
  const pathname = usePathname() || "";
  
  // Create tools dropdown items (for tools button)
  const toolsDropdownItems = [
    { title: "CORS POC Generator", icon: <IconGlobe size={16} />, href: "/resources/cors-poc-generator" },
    { title: "Clickjacking Tester", icon: <IconBug size={16} />, href: "/resources/clickjacking" },
    { title: "Red Team Cheatsheet", icon: <IconTools size={16} />, href: "/resources/red-team-cheatsheet" },
  ];
  
  // Define dock items in the exact order specified
  const dockItems = [
    { title: "Home", icon: <IconHome size={18} />, href: "/" },
    { title: "About Me", icon: <IconUser size={18} />, href: "/about" },
    { title: "Resume", icon: <IconFile size={18} />, href: "/resume" },
    { title: "Blog", icon: <IconNotes size={18} />, href: "/blog" },
    { 
      title: "Methodology", 
      icon: (
        <div className="relative w-5 h-5 rounded-full overflow-hidden">
          {/* Siri-like animated background */}
          <motion.div
            className="absolute inset-0 opacity-60"
            animate={{
              background: [
                "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.8) 0%, transparent 70%)",
                "radial-gradient(circle at 70% 60%, rgba(147, 51, 234, 0.8) 0%, transparent 70%)",
                "radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.8) 0%, transparent 70%)",
                "radial-gradient(circle at 60% 20%, rgba(59, 130, 246, 0.8) 0%, transparent 70%)",
                "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.8) 0%, transparent 70%)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.6) 100%)",
                "linear-gradient(135deg, rgba(147, 51, 234, 0.6) 0%, rgba(236, 72, 153, 0.6) 100%)",
                "linear-gradient(225deg, rgba(236, 72, 153, 0.6) 0%, rgba(59, 130, 246, 0.6) 100%)",
                "linear-gradient(315deg, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.6) 100%)",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.6) 100%)"
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </motion.div>
          </div>
        </div>
      ), 
      href: "/methodology",
      isSiri: true
    },
    { title: "CORS POC", icon: <IconGlobe size={16} />, href: "/resources/cors-poc-generator", isTool: true },
    { title: "Clickjacking", icon: <IconBug size={16} />, href: "/resources/clickjacking", isTool: true },
    { title: "Red Team", icon: <IconTools size={16} />, href: "/resources/red-team-cheatsheet", isTool: true },
    { title: "Contact", icon: <IconMessage size={18} />, href: "/contact" },
    { title: "X", icon: <IconBrandX size={18} />, href: "https://twitter.com/hackerspider1" },
    { title: "Github", icon: <GithubLogo size={18} />, href: "https://github.com/hackerspider1" },
  ];
  
  // Select a subset of items for the mobile dock
  const mobileDockItems = [
    dockItems[0], // Home
    dockItems[1], // About Me
    dockItems[3], // Blog
    dockItems[5], // CORS POC
    dockItems[8], // Contact
  ];
  
  return (
    <>
      <FloatingDockDesktop
        items={dockItems}
        className={cn("hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]", className)}
        pathname={pathname}
      />
      <FloatingDockMobile
        items={mobileDockItems}
        className="md:hidden fixed bottom-4 left-0 right-0 z-[60]"
        pathname={pathname}
      />
    </>
  );
};

// FloatingDockMobile component updated for mobile use
const FloatingDockMobile = ({
  items,
  className,
  pathname
}: {
  items: { title: string; icon: React.ReactNode; href: string; isSiri?: boolean; isToolsLabel?: boolean; isTool?: boolean }[];
  className?: string;
  pathname?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Check if an item matches the current path
  const isActiveItem = (item: { title: string; icon: React.ReactNode; href: string; isSiri?: boolean; isToolsLabel?: boolean; isTool?: boolean }, pathName: string = "") => {
    return isActiveLink(pathName, item.href);
  };
  
  // Handle Tools label click - prevent navigation
  const handleClick = (e: React.MouseEvent, item: { title: string; icon: React.ReactNode; href: string; isSiri?: boolean; isToolsLabel?: boolean; isTool?: boolean }) => {
    if (item.isToolsLabel) {
      e.preventDefault();
    }
  };

  return (
    <div className={cn(className)}>
              <div className="max-w-[280px] mx-auto px-2">
        <LiquidGlass 
          variant="prominent" 
          intensity="high" 
          rounded="full" 
          className="shadow-xl backdrop-blur-3xl bg-black/30 border border-white/20"
        >
          <div className="flex justify-around items-center py-3 px-4">
            {items.map((item, index) => (
              <div key={item.title} className="relative">
                <Link 
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  onTouchStart={() => setHoveredIndex(index)}
                  onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 500)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-full w-10 h-10 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] backdrop-blur-sm",
                    isActiveItem(item, pathname) 
                      ? "bg-white/15 text-white border border-white/20" 
                      : item.isSiri
                        ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white border border-white/20 hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30 hover:border-white/30 shadow-lg shadow-blue-500/10"
                        : item.isToolsLabel
                          ? "bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30 hover:border-orange-500/40"
                          : item.isTool
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/40"
                            : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                  )}
                >
                    {item.icon}
                </Link>
                
                {/* Mobile Tooltip - macOS Style */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.8 }}
                      transition={{ 
                        duration: 0.2,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[9999] pointer-events-none"
                    >
                                                                      <div className="px-3 py-2 bg-black/80 backdrop-blur-xl text-white text-sm font-medium rounded-lg shadow-2xl border border-white/20 whitespace-nowrap">
                          {item.title}
                        </div>
                                              {/* Small arrow pointing down like macOS */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
                          <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-black/80" />
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Active status indicator */}
                {isActiveItem(item, pathname) && (
                  <motion.div
                    layoutId="activeMobileIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Tool section indicators */}
                {item.isToolsLabel && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                )}
                {item.isTool && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  pathname
}: {
  items: { title: string; icon: React.ReactNode; href: string; isSiri?: boolean; isToolsLabel?: boolean; isTool?: boolean }[];
  className?: string;
  pathname?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("relative", className)}
    >
      <div className="px-4 py-3 rounded-full shadow-xl backdrop-blur-3xl bg-black/30 border border-white/20 overflow-visible">
        <div className="flex items-center gap-2 overflow-visible">
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} pathname={pathname || ""} />
      ))}
        </div>
      </div>
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  pathname,
  isSiri,
  isToolsLabel,
  isTool
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  pathname: string;
  isSiri?: boolean;
  isToolsLabel?: boolean;
  isTool?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  
  const widthTransform = useTransform(distance, [-120, 0, 120], [40, 64, 40]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [40, 64, 40]);

  const widthTransformIcon = useTransform(distance, [-120, 0, 120], [18, 28, 18]);
  const heightTransformIcon = useTransform(distance, [-120, 0, 120], [18, 28, 18]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  // Check if this item matches the current path
  const isActive = isActiveLink(pathname, href);

  // Handle Tools label click - prevent navigation
  const handleClick = (e: React.MouseEvent) => {
    if (isToolsLabel) {
      e.preventDefault();
    }
  };

  return (
      <Link href={href} onClick={handleClick}>
        <motion.div
          ref={ref}
        style={{ width, height }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(
          "aspect-square rounded-full flex items-center justify-center relative transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-visible",
            isActive
            ? "bg-white/15 text-white border border-white/20" 
            : isSiri
              ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white border border-white/20 hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30 hover:border-white/30 shadow-lg shadow-blue-500/10"
              : isToolsLabel
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30 hover:border-orange-500/40"
                : isTool
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/40"
                  : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.8 }}
              transition={{ 
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[9999] pointer-events-none"
            >
              <div className="px-3 py-2 bg-black/80 backdrop-blur-xl text-white text-sm font-medium rounded-lg shadow-2xl border border-white/20 whitespace-nowrap">
                {title}
              </div>
              {/* Small arrow pointing down like macOS */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
                <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-black/80" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          <motion.div
            style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
          >
            {icon}
        </motion.div>

        {/* Active status indicator */}
        {isActive && (
          <motion.div
            layoutId="activeDesktopIndicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        
        {/* Tool section indicators */}
        {isToolsLabel && (
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
        )}
        {isTool && (
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        )}
      </motion.div>
    </Link>
  );
}

function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href) && href !== "#";
  }
  
export default FloatingDock;