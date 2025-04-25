'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, Code, FileCode, FileWarning, Shield } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Pre-generate random data to avoid hydration mismatch
const generateCodeData = (numLines: number) => {
  const lines = [];
  for (let i = 0; i < numLines; i++) {
    lines.push({
      // Using deterministic patterns based on index instead of random
      xOffset: -50 + i * 60,
      isVisible: i % 3 !== 0,
      colorIndex: i % 5,
      textId: `code_${i}_text`,
      length: 5 + (i % 10)
    });
  }
  return lines;
};

export default function NotFound() {
  const [typedText, setTypedText] = useState('');
  const codeLines = 20;
  const codeDataRef = useRef(generateCodeData(codeLines));
  
  const terminalText = `> ERROR 404: FILE_NOT_FOUND
> SEARCHING RESOURCES...
> PATH DOES NOT EXIST
> CHECKING ALTERNATIVE ROUTES...
> NO MATCH FOUND
> SYSTEM UNABLE TO LOCATE REQUESTED RESOURCE`;

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
  
  // Colors for code
  const codeColors = [
    'text-blue-400',
    'text-green-400',
    'text-purple-400',
    'text-yellow-400',
    'text-red-400'
  ];
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-20 pointer-events-none"></div>
      
      {/* Animated code background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeDataRef.current.map((line, i) => (
          line.isVisible && (
            <motion.div
              key={i}
              className="absolute whitespace-nowrap font-mono text-xs opacity-30"
              initial={{ x: line.xOffset, y: -100 }}
              animate={{ 
                y: ["100vh"] 
              }}
              transition={{ 
                duration: 20 + (i % 10),
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            >
              <span className={codeColors[line.colorIndex]}>
                {`<${line.textId}>`}
              </span>
            </motion.div>
          )
        ))}
      </div>
      
      {/* Scanning line animation */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 z-10 pointer-events-none"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "linear"
        }}
      />
      
      <div className="relative z-20 max-w-3xl mx-auto">
        {/* 404 main error */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-7xl font-bold mb-4 text-blue-500 flex items-center justify-center gap-4 font-mono">
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code className="w-20 h-20" />
            </motion.div>
            404
          </h1>
          <h2 className="text-3xl font-bold mb-2 text-white">PAGE NOT FOUND</h2>
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1 rounded-full">
            <p className="text-sm text-blue-300 font-mono tracking-wider flex items-center gap-2">
              <FileWarning className="w-4 h-4" />
              RESOURCE MISSING
            </p>
          </div>
        </motion.div>
        
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-xl mx-auto bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/30 mb-6"
        >
          {/* Terminal Header */}
          <div className="px-4 py-2 bg-gradient-to-r from-blue-950/80 to-blue-900/60 border-b border-blue-500/20 flex items-center">
            <div className="flex gap-2 mr-3">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="w-3 h-3 rounded-full bg-blue-900"></div>
              <div className="w-3 h-3 rounded-full bg-blue-900"></div>
            </div>
            <div className="text-xs text-blue-300 flex-1 text-center font-mono flex items-center justify-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>system-response.sh</span>
            </div>
          </div>
          
          {/* Terminal Body */}
          <div className="p-4 font-mono text-sm text-blue-400 min-h-[200px]">
            <div className="whitespace-pre-line">
              {typedText}
              <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse"></span>
            </div>
          </div>
        </motion.div>
        
        {/* Alert box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-black/40 backdrop-blur-md rounded-lg border border-blue-500/20 p-4 mb-6"
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <FileCode className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h3 className="text-blue-300 font-medium text-lg">Resource Not Found</h3>
              <p className="text-blue-200/70 text-sm mt-1">
                The page you're looking for doesn't exist or has been moved to another location.
              </p>
            </div>
          </div>
          
          <div className="mt-4 pl-12">
            <div className="text-xs text-blue-200/60 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Try navigating back to the homepage to find what you're looking for.</span>
            </div>
          </div>
        </motion.div>
        
        {/* Navigation button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex justify-center"
        >
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black/50 backdrop-blur-md border border-blue-500/30 hover:bg-blue-950/20 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Homepage</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 