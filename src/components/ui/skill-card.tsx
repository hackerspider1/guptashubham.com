"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface Skill {
  name: string;
  level: number; // 1-5
  icon?: React.ReactNode;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export const SkillCard = ({ skill, index }: SkillCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-zinc-800/50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        {skill.icon && <div className="text-xl text-zinc-300">{skill.icon}</div>}
        <h3 className="font-medium text-zinc-200">{skill.name}</h3>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 rounded-full flex-1 ${
              i < skill.level ? 'bg-emerald-500' : 'bg-zinc-700'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}; 