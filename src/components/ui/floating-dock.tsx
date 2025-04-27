/**
 * Floating Dock: Now includes XSS & CORS tools
 **/
"use client";

import { cn } from "@/lib/utils";
import { 
  IconShieldX, 
  IconGlobe, 
  IconBug, 
  IconTools, 
  IconHome, 
  IconFile, 
  IconBrandTwitter,
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
} from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GithubLogo } from "phosphor-react";
import { useRef, useState, useEffect } from "react";

// Removed the hardcoded dockItems - now only using the items passed in as props

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const pathname = usePathname() || "";
  
  // Create tools dropdown items (for tools button)
  const toolsDropdownItems = [
    { title: "XSS Scanner", icon: <IconShieldX size={20} />, href: "/resources/xss-scanner" },
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
      title: "Tools", 
      icon: <IconTools size={24} />, 
      href: "#", 
      children: toolsDropdownItems 
    },
    { title: "Contact", icon: <IconMessage size={24} />, href: "/contact" },
    { title: "Twitter", icon: <IconBrandTwitter size={24} />, href: "https://twitter.com/hackerspider1" },
    { title: "Github", icon: <GithubLogo size={24} />, href: "https://github.com/hackerspider1" },
  ];
  
  return (
    <>
      <FloatingDockDesktop
        items={dockItems}
        className={className}
        pathname={pathname}
      />
      {/* Mobile dock completely removed - using side menu instead */}
    </>
  );
};

// FloatingDockMobile component kept for reference but never used
const FloatingDockMobile = ({
  items,
  className,
  pathname
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  pathname?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative hidden", className)}>
      {/* Content hidden - now using side menu from header component */}
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  pathname
}: {
  items: { title: string; icon: React.ReactNode; href: string; children?: { title: string; icon: React.ReactNode; href: string }[] }[];
  className?: string;
  pathname?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-6 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-6 py-3 shadow-md",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} pathname={pathname || ""} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  pathname,
  children
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  pathname: string;
  children?: { title: string; icon: React.ReactNode; href: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Define the transformation function directly in useTransform
  const widthTransformIcon = useTransform(mouseX, (mouseX: number) => {
    if (!ref.current) return 20;
    const rect = ref.current.getBoundingClientRect();
    const distFromRight = rect.right;
    const distFromLeft = rect.left;
    const max = distFromLeft > distFromRight ? distFromLeft : distFromRight;
    return Math.min(Math.max(20, 20 + 25 * (1 - mouseX / max)), 40);
  });
  
  const heightTransformIcon = widthTransformIcon;
  
  const widthTransform = useTransform(mouseX, (mouseX: number) => {
    if (!ref.current) return 50;
    const rect = ref.current.getBoundingClientRect();
    const distFromRight = rect.right;
    const distFromLeft = rect.left;
    const max = distFromLeft > distFromRight ? distFromLeft : distFromRight;
    return Math.min(Math.max(50, 50 + 25 * (1 - mouseX / max)), 90);
  });

  const heightTransform = useTransform(mouseX, (mouseX: number) => {
    if (!ref.current) return 50;
    const rect = ref.current.getBoundingClientRect();
    const distFromRight = rect.right;
    const distFromLeft = rect.left;
    const max = distFromLeft > distFromRight ? distFromLeft : distFromRight;
    return Math.min(Math.max(50, 50 + 25 * (1 - mouseX / max)), 90);
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
  
  // Animation for Tools pulsing effect
  const isTools = title === "Tools";
  const toolsPulse = useSpring(0, {
    mass: 1,
    stiffness: 150,
    damping: 20,
  });
  
  useEffect(() => {
    if (isTools && !isDropdownOpen) {
      // Create pulsing animation for Tools icon
      const interval = setInterval(() => {
        toolsPulse.set(1);
        setTimeout(() => toolsPulse.set(0), 1500);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isTools, isDropdownOpen, toolsPulse]);

  // Add click-outside listener to close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node) && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    }
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle the dropdown toggle
  const handleClick = (e: React.MouseEvent) => {
    if (children) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  // Determine if this item or any of its children match the current path
  const isActive = 
    isActiveLink(pathname, href) || 
    (children && children.some(child => isActiveLink(pathname, child.href)));

  // Special styles for Tools
  const toolsGlow = useTransform(toolsPulse, [0, 1], ["0px", "6px"]);
  const toolsOpacity = useTransform(toolsPulse, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div className="relative">
      <Link href={href} onClick={handleClick}>
        <motion.div
          ref={ref}
          style={{
            width,
            height,
            boxShadow: isTools && !isDropdownOpen ? toolsGlow.get() + " 0px " + toolsGlow.get() + " 0px rgba(59, 130, 246, 0.5)" : undefined
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ y: -5 }}
          className={cn(
            "aspect-square rounded-full flex items-center justify-center relative shadow-sm transition-colors duration-200", 
            isActive
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : isTools 
                ? "bg-gradient-to-br from-blue-400 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/30"
                : "bg-gray-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-700"
          )}
        >
          {isTools && !isDropdownOpen && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-600/20"
              style={{ opacity: toolsOpacity }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                repeatType: "loop", 
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Notification dot for Tools */}
          {isTools && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full border border-white dark:border-neutral-800"></div>
          )}
          
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 2, x: "-50%" }}
                className="px-3 py-1 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-700 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-10 w-fit text-sm font-medium z-20"
              >
                {title}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            style={{ width: widthIcon, height: heightIcon }}
            className={cn(
              "flex items-center justify-center",
              isTools && "text-white"
            )}
          >
            {icon}
          </motion.div>
        </motion.div>
      </Link>

      {/* Tools dropdown */}
      <AnimatePresence>
        {isDropdownOpen && children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-30 origin-bottom"
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25 
            }}
          >
            {/* macOS-style triangle indicator */}
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[8px] border-l-transparent 
              border-r-[8px] border-r-transparent 
              border-t-[8px] border-t-gray-100 dark:border-t-neutral-800">
            </div>
            
            <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-xl border border-gray-200 dark:border-neutral-700 p-3 backdrop-blur-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-fit min-w-[280px]">
                {children.map((child, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 400, 
                      damping: 20
                    }}
                  >
                    <Link 
                      href={child.href}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-md transition-colors bg-white/80 dark:bg-neutral-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-700 border border-gray-200/50 dark:border-neutral-600/30",
                        isActiveLink(pathname, child.href)
                          ? "ring-2 ring-blue-400 dark:ring-blue-500"
                          : ""
                      )}
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full mb-1">
                        <span className="text-blue-600 dark:text-blue-400">{child.icon}</span>
                      </div>
                      <span className="text-xs font-medium text-center text-neutral-700 dark:text-neutral-200">{child.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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