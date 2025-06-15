"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface SkillProgressProps {
  name: string;
  value: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SkillProgress = ({
  name,
  value,
  color = 'rgb(161, 161, 170)',
  size = 'md',
  className = '',
}: SkillProgressProps) => {
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
        rootMargin: '0px 0px -100px 0px', // Start animation a bit before coming into full view
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

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const textSizes = {
    sm: '16px',
    md: '22px',
    lg: '24px',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center ${className}`}
    >
      <div className={sizeClasses[size] + ' mb-3'}>
        <CircularProgressbar
          value={isVisible ? value : 0}
          text={isVisible ? `${value}%` : ''}
          styles={buildStyles({
            pathColor: isVisible ? color : 'rgba(0, 0, 0, 0)',
            textColor: '#fff',
            trailColor: '#1f2937',
            pathTransitionDuration: 1.4,
            textSize: textSizes[size],
          })}
        />
      </div>
      <h3 className="text-sm font-medium text-zinc-300 text-center">{name}</h3>
    </motion.div>
  );
}; 