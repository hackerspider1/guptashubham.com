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
    { title: "CORS POC Generator", icon: <IconGlobe size={20} />, href: "/resources/cors-poc-generator" },
    { title: "Clickjacking Tester", icon: <IconBug size={20} />, href: "/resources/clickjacking" },
    { title: "Red Team Cheatsheet", icon: <IconTools size={20} />, href: "/resources/red-team-cheatsheet" },
  ];
  
  // Define dock items in the exact order specified
  const dockItems = [
    { title: "Home", icon: <IconHome size={24} />, href: "/" },
    { title: "About Me", icon: <IconUser size={24} />, href: "/about" },
    { title: "Resume", icon: <IconFile size={24} />, href: "/resume" },
    { title: "Blog", icon: <IconNotes size={24} />, href: "/blog" },
    { 
      title: "Methodology", 
      icon: (
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    // Tools section with clear indicator
    { 
      title: "Tools", 
      icon: <IconTools size={24} />, 
      href: "#",
      isToolsLabel: true
    },
    { title: "CORS POC", icon: <IconGlobe size={20} />, href: "/resources/cors-poc-generator", isTool: true },
    { title: "Clickjacking", icon: <IconBug size={20} />, href: "/resources/clickjacking", isTool: true },
    { title: "Red Team", icon: <IconTools size={20} />, href: "/resources/red-team-cheatsheet", isTool: true },
    { title: "Contact", icon: <IconMessage size={24} />, href: "/contact" },
    { title: "X", icon: <IconBrandX size={24} />, href: "https://twitter.com/hackerspider1" },
    { title: "Github", icon: <GithubLogo size={24} />, href: "https://github.com/hackerspider1" },
  ];
  
  // Select a subset of items for the mobile dock
  const mobileDockItems = [
    dockItems[0], // Home
    dockItems[1], // About Me
    dockItems[3], // Blog
    dockItems[5], // Tools label
    dockItems[6], // CORS POC
  ];
  
  return (
    <>
      <FloatingDockDesktop
        items={dockItems}
        className={cn("hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50", className)}
        pathname={pathname}
      />
      <FloatingDockMobile
        items={mobileDockItems}
        className="md:hidden fixed bottom-6 left-0 right-0 z-50"
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
      <div className="max-w-[260px] mx-auto px-2">
        <LiquidGlass 
          variant="prominent" 
          intensity="high" 
          rounded="full" 
          className="shadow-lg"
        >
          <div className="flex justify-around items-center py-2 px-2">
            {items.map((item) => (
              <div key={item.title} className="relative">
                <Link 
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className={cn(
                    "flex flex-col items-center justify-center p-1 rounded-full w-10 h-10 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] backdrop-blur-sm",
                    isActiveItem(item, pathname) 
                      ? "bg-white/15 text-white border border-white/20" 
                      : item.isSiri
                        ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white border border-white/20 hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30 hover:border-white/30 shadow-lg shadow-blue-500/10"
                        : item.isToolsLabel
                          ? "bg-orange-500/20 text-orange-200 border border-orange-400/30 cursor-default"
                          : item.isTool
                            ? "bg-blue-500/10 text-blue-200 border border-blue-400/20"
                            : "text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/[0.15]"
                  )}
                >
                  <div className="w-4 h-4">
                    {item.icon}
                  </div>
                  <span className="text-[7px] mt-0.5 whitespace-nowrap">{item.title}</span>
                </Link>
                
                {/* Tools label indicator */}
                {item.isToolsLabel && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-400 rounded-full"></div>
                )}
                
                {/* Tool indicator */}
                {item.isTool && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
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
  let mouseX = useMotionValue(Infinity);
  
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "h-12 gap-4 items-end",
        className
      )}
    >
      <LiquidGlass
        variant="prominent"
        intensity="high"
        rounded="2xl"
        className="h-full px-4 py-2 shadow-lg flex items-end gap-4"
      >
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} pathname={pathname || ""} />
        ))}
      </LiquidGlass>
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
  
  // Define the transformation function directly in useTransform
  const widthTransformIcon = useTransform(mouseX, (mouseX: number) => {
    if (!ref.current) return 16;
    const rect = ref.current.getBoundingClientRect();
    const distFromRight = rect.right;
    const distFromLeft = rect.left;
    const max = distFromLeft > distFromRight ? distFromLeft : distFromRight;
    return Math.min(Math.max(16, 16 + 20 * (1 - Math.min(mouseX, 10000) / max)), 32);
  });
  
  const heightTransformIcon = widthTransformIcon;
  
  const widthTransform = useTransform(mouseX, (mouseX: number) => {
    if (!ref.current) return 40;
    const rect = ref.current.getBoundingClientRect();
    const distFromRight = rect.right;
    const distFromLeft = rect.left;
    const max = distFromLeft > distFromRight ? distFromLeft : distFromRight;
    return Math.min(Math.max(40, 40 + 20 * (1 - Math.min(mouseX, 10000) / max)), 72);
  });

  const heightTransform = useTransform(mouseX, (mouseX: number) => {
    if (!ref.current) return 40;
    const rect = ref.current.getBoundingClientRect();
    const distFromRight = rect.right;
    const distFromLeft = rect.left;
    const max = distFromLeft > distFromRight ? distFromLeft : distFromRight;
    return Math.min(Math.max(40, 40 + 20 * (1 - Math.min(mouseX, 10000) / max)), 72);
  });

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  const [hovered, setHovered] = useState(false);
  
  const isMethodology = isSiri;
  const isActive = isActiveLink(pathname, href);
  
  // Handle Tools label click - prevent navigation
  const handleClick = (e: React.MouseEvent) => {
    if (isToolsLabel) {
      e.preventDefault();
    }
  };

  // Clean styling without complex animations

  return (
    <Link href={href} onClick={handleClick}>
      <motion.div
        ref={ref}
        style={{
          width,
          height
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -2 }}
        className={cn(
          "aspect-square rounded-full flex items-center justify-center relative transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]", 
          isActive
            ? "bg-white/15 text-white backdrop-blur-sm border border-white/20"
            : isMethodology
              ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white backdrop-blur-sm border border-white/20 hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30 hover:border-white/30 shadow-lg shadow-blue-500/10"
              : isToolsLabel
                ? "bg-orange-500/20 text-orange-200 backdrop-blur-sm border border-orange-400/30 hover:bg-orange-500/30 hover:border-orange-400/50 cursor-default"
                : isTool
                  ? "bg-blue-500/10 text-blue-200 backdrop-blur-sm border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40"
                  : "bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1] hover:text-white backdrop-blur-sm border border-white/[0.08] hover:border-white/[0.15]"
        )}
      >
        {/* Tools label indicator */}
        {isToolsLabel && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        )}
        
        {/* Tool indicator */}
        {isTool && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
        )}
        
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className={cn(
                "px-3 py-1 whitespace-pre rounded-md backdrop-blur-md border text-white absolute left-1/2 -translate-x-1/2 -top-10 w-fit text-sm font-medium z-20 shadow-lg",
                isToolsLabel 
                  ? "bg-orange-500/90 border-orange-400/50" 
                  : isTool
                    ? "bg-blue-500/90 border-blue-400/50"
                    : "bg-black/80 border-white/[0.15]"
              )}
            >
              {isToolsLabel ? "🛠️ Tools Section" : title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

// Helper function to determine if a link is active
function isActiveLink(pathname: string, href: string): boolean {
  // Handle external links (they can never be active)
  if (href.startsWith('http') || href === '#') {
    return false;
  }
  
  // Handle root path
  if (href === '/') {
    return pathname === '/';
  }
  
  // Handle nested paths (e.g. /blog should be active for /blog/some-post)
  if (href !== '/') {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  
  return false;
}