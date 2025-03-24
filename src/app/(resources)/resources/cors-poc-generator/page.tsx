"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Page = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const simulateAttack = async () => {
    if (!url) return;
    
    setIsProcessing(true);
    setHistory(prev => [...prev, url]);
    setUrl('');

    const messages = [
      "Initializing CORS vulnerability scan...",
      "Analyzing target URL structure...", 
      "Checking CORS headers configuration...",
      "Testing cross-origin requests...",
      "Validating response headers...",
      "Attempting CORS bypass techniques...",
      "Generating vulnerability report..."
    ];

    for (const msg of messages) {
      setHistory(prev => [...prev, msg]);
      await new Promise(r => setTimeout(r, 1000));
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 h-full flex-1 w-full flex items-center justify-center">
      <div className="bg-[#1d1f21] w-full -mt-40 rounded-xl overflow-hidden shadow-2xl border border-[#2d2f31]">
        {/* Terminal Header */}
        <div className="bg-[#2d2f31] px-4 py-2 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#24aa36]"></div>
          </div>
          <div className="flex-1 text-center text-[13px] text-[#9da5b4] font-medium -ml-16">
            CORS POC Generator — -zsh
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-[13px] bg-[#1d1f21] max-h-[40vh] overflow-y-auto hide-scrollbar">
          {/* History */}
          {history.map((cmd, idx) => (
            <div key={idx} className="flex items-center text-[#98c379] mb-4">
              <span className="mr-2">➜</span>
              <span className="text-[#61afef] mr-2">~</span>
              <span className="text-[#98c379]">{cmd}</span>
            </div>
          ))}

          {/* Current Input */}
          {!isProcessing && (
            <div className="flex items-center text-[#98c379] mb-4">
              <span className="mr-2">➜</span>
              <span className="text-[#61afef] mr-2">~</span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    simulateAttack();
                  }
                }}
                placeholder="Enter target URL"
                className="flex-1 bg-transparent border-none outline-none text-[#98c379] placeholder-[#4b5263]"
              />
            </div>
          )}

          {!isProcessing && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 px-4 py-2 bg-[#2d2f31] text-[#98c379] rounded-md hover:bg-[#353739] transition-colors"
              onClick={simulateAttack}
            >
              Start Scan
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
