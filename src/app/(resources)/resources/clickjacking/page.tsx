"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const ClickjackingTester = () => {
  const [url, setUrl] = useState("");
  const [testUrl, setTestUrl] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const formatUrl = (input: string) => {
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return `https://${input}`;
    }
    return input;
  };

  const testClickjacking = () => {
    if (!url) return;

    const formattedUrl = formatUrl(url);
    setIsTesting(true);
    setHistory((prev) => [...prev, `➜ Testing Clickjacking on ${formattedUrl}...`]);
    setTestUrl(formattedUrl);
    setUrl("");
    setTimeout(() => setIsTesting(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 h-full flex flex-col items-center justify-center">
      {/* Terminal UI */}
      <div className="bg-[#181a1b] w-full rounded-xl overflow-hidden shadow-xl border border-[#2d2f31]">
        <div className="bg-[#2d2f31] px-4 py-2 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#24aa36]"></div>
          </div>
          <div className="flex-1 text-center text-[13px] text-[#9da5b4] font-medium -ml-16">
            Clickjacking Tester
          </div>
        </div>
        <div className="p-4 font-mono text-[14px] bg-[#181a1b] max-h-[40vh] overflow-y-auto hide-scrollbar">
          {history.map((cmd, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-[#98c379] mb-2"
            >
              {cmd}
            </motion.div>
          ))}
          {!isTesting && (
            <div className="flex items-center text-[#98c379]">
              <span className="mr-2">➜</span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && testClickjacking()}
                placeholder="Enter target URL"
                className="flex-1 bg-transparent border-none outline-none text-[#98c379] placeholder-[#4b5263]"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Iframe Test */}
      {testUrl && (
        <div className="bg-[#181a1b] w-full mt-6 p-6 rounded-lg shadow-md border border-[#2d2f31] text-[#98c379]">
          <h3 className="text-lg font-bold mb-3">Clickjacking Test Result</h3>
          <p className="text-[#9da5b4] mb-3">
            If the website appears below, it is vulnerable to clickjacking.
          </p>
          <div className="border border-[#2d2f31] p-2 overflow-hidden">
            <iframe
              src={testUrl}
              title="Clickjacking Test"
              className="w-full h-[500px] border-none"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickjackingTester;