"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedPhoneProps {
  prefix?: string;
  className?: string;
}

export const AnimatedPhone: React.FC<AnimatedPhoneProps> = ({
  prefix = "+91 9999",
  className
}) => {
  const [digits, setDigits] = useState<string>("000000");
  
  // Generate random 6 digits
  const generateRandomDigits = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  // Update digits every 2 seconds
  useEffect(() => {
    setDigits(generateRandomDigits());
    
    const interval = setInterval(() => {
      setDigits(generateRandomDigits());
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={className}>
      <span>{prefix}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={digits}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {digits}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPhone; 