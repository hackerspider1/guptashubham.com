'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, Lock, ShieldOff, FileWarning, Eye, Shield } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Pre-generate deterministic grid data to avoid hydration mismatch
const generateGridCells = (size: number) => {
  const total = size * size;
  return Array.from({ length: total }).map((_, i) => ({
    // Use a deterministic pattern instead of random values
    hasDigit: Boolean(i % 3),
    digit: i % 2 === 0 ? "1" : "0"
  }));
};

export default function Forbidden() {
  const [typedText, setTypedText] = useState('');
  const firewallGridSize = 10;
  const gridCellsRef = useRef(generateGridCells(firewallGridSize));
  
  const terminalText = `> ERROR 403: ACCESS_DENIED
> CHECKING AUTHORIZATION...
> ADMIN CLEARANCE REQUIRED
> ACCESS RESTRICTED
> SECURITY PROTOCOL ENGAGED
> LOGGING ATTEMPT...`;

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < terminalText.length) {
        currentText += terminalText[currentIndex];
        setTypedText(currentText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  // Firewall animation
  const gridVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  };
  
  const cellVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-20 pointer-events-none"></div>
      
      {/* Scanning line animation */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0 z-10 pointer-events-none"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "linear"
        }}
      />
      
      {/* Background cyber elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-900/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-red-500/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-red-500/10 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-red-500/5 rounded-full"></div>
      </div>
      
      {/* Digital firewall visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="grid gap-1"
          style={{ 
            gridTemplateColumns: `repeat(${firewallGridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${firewallGridSize}, minmax(0, 1fr))`
          }}
          variants={gridVariants}
          initial="initial"
          animate="animate"
        >
          {gridCellsRef.current.map((cell, i) => (
            <motion.div
              key={i}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-red-500/5 border border-red-500/10 flex items-center justify-center"
              variants={cellVariants}
            >
              {cell.hasDigit && (
                <span className="text-[8px] sm:text-[10px] text-red-500/60 font-mono">
                  {cell.digit}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="relative z-20 max-w-3xl mx-auto">
        {/* 403 main error */}
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-7xl font-bold mb-2 sm:mb-4 text-red-500 flex items-center justify-center gap-4 font-mono">
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lock className="w-14 h-14 sm:w-20 sm:h-20" />
            </motion.div>
            403
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-white">ACCESS FORBIDDEN</h2>
          <div className="inline-block bg-red-500/10 border border-red-500/20 px-4 py-1 rounded-full">
            <p className="text-xs sm:text-sm text-red-300 font-mono tracking-wider flex items-center gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              SECURITY PROTOCOL ACTIVE
            </p>
          </div>
        </motion.div>
        
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-xl mx-auto bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden border border-red-500/30 mt-6 mb-6"
        >
          {/* Terminal Header */}
          <div className="px-4 py-2 bg-gradient-to-r from-red-950/80 to-red-900/60 border-b border-red-500/20 flex items-center">
            <div className="flex gap-2 mr-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-red-900"></div>
              <div className="w-3 h-3 rounded-full bg-red-900"></div>
            </div>
            <div className="text-xs text-red-300 flex-1 text-center font-mono flex items-center justify-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>access-control.sh</span>
            </div>
          </div>
          
          {/* Terminal Body */}
          <div className="p-4 font-mono text-sm text-red-400 min-h-[200px]">
            <div className="whitespace-pre-line">
              {typedText}
              <span className="inline-block w-2 h-4 bg-red-400 ml-1 animate-pulse"></span>
            </div>
          </div>
        </motion.div>
        
        {/* Alert details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-black/40 backdrop-blur-md rounded-lg border border-red-500/20 p-4 mb-6"
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <ShieldOff className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <div>
              <h3 className="text-red-300 font-medium text-lg">Security Alert</h3>
              <p className="text-red-200/70 text-sm mt-1">
                You don't have permission to access this page. This incident has been logged for security purposes.
              </p>
            </div>
          </div>
          
          <div className="mt-4 pl-12">
            <div className="text-xs text-red-200/60 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                <span>IP logged for security monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <FileWarning className="w-3.5 h-3.5" />
                <span>Access attempt recorded</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black/50 backdrop-blur-md border border-red-500/30 hover:bg-red-950/20 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Secure Area</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 