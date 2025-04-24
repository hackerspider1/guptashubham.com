"use client";

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ children, id, className = '' }: SectionProps) => {
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
    <section 
      id={id}
      ref={ref} 
      className={`py-16 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        {children}
      </motion.div>
    </section>
  );
};

interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
}

export const SectionHeader = ({ children, className = '' }: SectionHeaderProps) => {
  return (
    <div className={`mb-12 ${className}`}>
      {children}
    </div>
  );
};

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export const SectionTitle = ({ children, className = '' }: SectionTitleProps) => {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-white ${className}`}>
      {children}
    </h2>
  );
};

interface SectionDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const SectionDescription = ({ children, className = '' }: SectionDescriptionProps) => {
  return (
    <p className={`text-lg text-zinc-400 max-w-2xl ${className}`}>
      {children}
    </p>
  );
}; 