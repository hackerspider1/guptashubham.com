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

  useEffect(() => {
    // Change greeting every 200ms
    const greetingInterval = setInterval(() => {
      setCurrentGreeting(prev => (prev + 1) % greetings.length);
    }, 300);

    // Hide after 2 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <motion.div
            key={currentGreeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-4xl font-light text-white"
          >
            {greetings[currentGreeting]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
