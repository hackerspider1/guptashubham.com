"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  index: number;
  className?: string;
}

export const TimelineItem = ({
  year,
  title,
  company,
  index,
  className = '',
}: TimelineItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row w-full items-center md:items-start relative ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline center line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500/20 to-purple-500/20" />
      
      {/* Timeline dot */}
      <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-zinc-900 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-10 shrink-0" />

      {/* Content container */}
      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
        <motion.div
          className="mt-4 md:mt-0 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full">
              {year}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">{title}</h3>
          <p className="text-sm text-zinc-400">{company}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}; 