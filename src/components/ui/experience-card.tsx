"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-10 relative pl-8 border-l border-zinc-800"
    >
      <div className="absolute -left-1.5 w-3 h-3 bg-zinc-700 rounded-full"></div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-white">{experience.position}</h3>
        <div className="text-sm text-zinc-400">{experience.duration}</div>
      </div>
      <div className="mb-2">
        <span className="text-zinc-300">{experience.company}</span>
        {experience.location && (
          <span className="text-zinc-500"> · {experience.location}</span>
        )}
      </div>
      <div className="mb-4">
        <ul className="list-disc pl-4 space-y-1">
          {experience.description.map((point, i) => (
            <li key={i} className="text-zinc-400">{point}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}; 