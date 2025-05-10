"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  "Hello",
  "こんにちは",
  "Bonjour",
  "Hola",
  "नमस्ते",
  "Ciao",
  "안녕하세요",
  "مرحبا",
  "Olá",
  "Привет"
];

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Change greeting every 300ms
    const greetingInterval = setInterval(() => {
      setCurrentGreeting(prev => (prev + 1) % greetings.length);
    }, 300);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Hide after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearInterval(greetingInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
        >
          <motion.div className="absolute inset-0">
            <div className="absolute inset-0 overflow-hidden">
              {isMounted && [...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-blue-500/10"
                  style={{
                    width: Math.random() * 2 + 1 + "px",
                    height: Math.random() * 2 + 1 + "px",
                    borderRadius: "50%",
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/signature.png" 
              alt="Shubham Gupta" 
              className="h-12 mb-8 filter brightness-0 invert mx-auto" 
            />
            
            <motion.div
              key={currentGreeting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-4xl font-light text-white mb-6"
            >
              {greetings[currentGreeting]}
            </motion.div>
            
            <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
