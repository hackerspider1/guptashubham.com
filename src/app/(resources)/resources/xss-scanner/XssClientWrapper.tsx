"use client";

import React, { useState, useRef, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Terminal, AlertCircle, Shield, ArrowRight, Globe, Code } from "lucide-react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const xssPayloads = {
  "Basic XSS Payloads": ['<script>alert(1)</script>', `"><script>alert(1)</script>`],
  "Advanced XSS Payloads": [`<img src=x onerror=alert(1)>`, `<svg onload=alert(1)>`],
  "Custom Payloads": ["<body onload=alert(1)>", `"><img src=x onerror=alert(document.domain)>`],
};

const XssClientWrapper = () => {
  const [selectedList, setSelectedList] = useState("Basic XSS Payloads");
  const [url, setUrl] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const scanForXSS = async () => {
    if (!url) return;

    setIsScanning(true);
    setLogs((prev) => [...prev, `➜ Scanning ${url} with ${selectedList}...`]);
    setResults([]);

    const payloads = xssPayloads[selectedList as keyof typeof xssPayloads];

    for (const payload of payloads) {
      const testUrl = url.replace("XSS_TEST", encodeURIComponent(payload));

      try {
        const response = await fetch(testUrl);
        const body = await response.text();

        if (body.includes(payload)) {
          setResults((prev) => [...prev, { url: testUrl, payload, vulnerable: true }]);
          setLogs((prev) => [...prev, `✅ XSS Found: ${payload}`]);
        } else {
          setLogs((prev) => [...prev, `❌ Not vulnerable: ${payload}`]);
        }
      } catch (error) {
        setLogs((prev) => [...prev, `⚠️ Error testing: ${payload}`]);
      }
    }

    setIsScanning(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isScanning) {
      scanForXSS();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-black overflow-hidden text-white">
      {/* Section 1: Dark Background - Scanner Controls */}
      <div className="w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-20"></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-60 animate-pulse delay-700"></div>
        
        {/* 3D Code Elements */}
        <div className="absolute top-20 right-[20%] text-blue-500/10 rotate-12 transform-gpu opacity-30">
          <Code size={120} className="filter blur-[1px]" />
        </div>
        
        <div className="bg-gradient-to-b from-black via-zinc-950 to-zinc-900 w-full flex justify-center pb-32 pt-16">
          <div className="relative z-10 max-w-6xl w-full px-6">
            <div className="text-center mb-12 relative flex flex-col justify-center items-center">
              {/* Hero Section with 3D Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                {/* 3D Shield Icon */}
                <div className="mb-8 p-6 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/20 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-500/10 transform-gpu hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>
                  <Shield className="w-16 h-16 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500">
                  XSS Scanner
                </h1>
                
                <p className="text-xl text-gray-400 max-w-2xl mb-12">
                  Test your web applications for Cross-Site Scripting vulnerabilities with our advanced scanner
                </p>
              </motion.div>

              {/* Main content area with two columns */}
              <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column - Control Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:w-1/2 w-full"
                  >
                    {/* URL Input Card */}
                    <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.4)] border border-zinc-700/40 mb-5">
                      <div className="bg-gradient-to-r from-zinc-800/90 to-zinc-800/70 px-4 py-3 flex items-center gap-2 border-b border-zinc-700/30">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-inner"></div>
                          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner"></div>
                          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner"></div>
                        </div>
                        <div className="text-zinc-400 font-medium flex items-center justify-center gap-2 ml-2">
                          <Globe className="w-4 h-4" />
                          <span>Target URL</span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-center bg-zinc-950/80 rounded-lg border border-zinc-800/50 overflow-hidden">
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter URL with XSS_TEST placeholder..."
                            className="flex-1 bg-transparent border-none outline-none text-blue-400 placeholder-zinc-600 p-3 font-mono text-sm"
                          />
                        </div>
                        <p className="text-xs text-zinc-500 mt-2">Example: https://example.com/?search=XSS_TEST</p>
                      </div>
                    </div>
                    
                    {/* Payload Selection Card */}
                    <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.4)] border border-zinc-700/40 mb-5">
                      <div className="bg-gradient-to-r from-zinc-800/90 to-zinc-800/70 px-4 py-3 flex items-center gap-2 border-b border-zinc-700/30">
                        <div className="text-zinc-400 font-medium flex items-center justify-center gap-2">
                          <Code className="w-4 h-4" />
                          <span>Payload Selection</span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <p className="text-sm text-zinc-400 mb-3 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                          Select Payload List
                        </p>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger className="flex justify-between items-center p-3 bg-gradient-to-br from-zinc-800/90 to-zinc-900/80 text-white rounded-xl w-full border border-zinc-700/30 shadow-lg hover:shadow-blue-900/5 transition-all duration-200 hover:border-zinc-700/50">
                            <span className="flex items-center gap-2">
                              <Code className="w-4 h-4 text-blue-400" />
                              {selectedList}
                            </span>
                            <ChevronDown className="w-4 h-4 text-zinc-400" />
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Portal>
                            <DropdownMenu.Content 
                              className="bg-zinc-800/95 backdrop-blur-md text-white rounded-xl p-1.5 shadow-lg shadow-black/50 z-50 w-[300px] border border-zinc-700/30"
                              sideOffset={5}
                            >
                              {Object.keys(xssPayloads).map((option) => (
                                <DropdownMenu.Item
                                  key={option}
                                  onSelect={() => setSelectedList(option)}
                                  className="px-3 py-2.5 cursor-pointer hover:bg-blue-600/20 w-full rounded-lg relative flex items-center transition-colors duration-150"
                                >
                                  <span>{option}</span>
                                  {selectedList === option && (
                                    <DropdownMenu.ItemIndicator className="absolute right-2">
                                      <Check className="w-4 h-4 text-blue-400" />
                                    </DropdownMenu.ItemIndicator>
                                  )}
                                </DropdownMenu.Item>
                              ))}
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </div>
                    </div>
                    
                    {/* Scan Button */}
                    <button
                      onClick={scanForXSS}
                      disabled={isScanning || !url}
                      className={`${
                        isScanning || !url 
                          ? "bg-zinc-700/80 cursor-not-allowed" 
                          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                      } text-white rounded-xl px-6 py-4 transition-all duration-300 ease-in-out w-full flex items-center justify-center gap-2 shadow-lg transform-gpu active:scale-95 font-medium`}
                    >
                      {isScanning ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-5 h-5" />
                          <span>Start XSS Scan</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                  
                  {/* Right Column - Terminal Console */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="lg:w-1/2 w-full"
                  >
                    {/* Terminal Card */}
                    <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.4)] border border-zinc-700/40 h-full">
                      <div className="bg-gradient-to-r from-zinc-800/90 to-zinc-800/70 px-4 py-3 flex items-center gap-2 justify-between border-b border-zinc-700/30">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-inner"></div>
                          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner"></div>
                          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner"></div>
                        </div>
                        <div className="flex-1 text-center text-zinc-400 font-medium flex items-center justify-center gap-2">
                          <Terminal className="w-4 h-4" />
                          <span>XSS Scanner Terminal</span>
                        </div>
                        <div className="w-12"></div>
                      </div>
                      
                      {/* Terminal Body */}
                      <div 
                        ref={terminalRef}
                        className="p-4 font-mono text-[13px] bg-zinc-950/80 h-[300px] overflow-y-auto backdrop-blur-sm"
                      >
                        {logs.length > 0 ? (
                          logs.map((log, idx) => (
                            <div key={idx} className={`mb-2 ${
                              log.includes("✅") ? "text-green-400" : 
                              log.includes("❌") ? "text-red-400" : 
                              log.includes("⚠️") ? "text-yellow-400" : 
                              "text-blue-400"
                            } drop-shadow-[0_0_2px_rgba(59,130,246,0.3)]`}>{log}</div>
                          ))
                        ) : (
                          <div className="text-zinc-500 italic">Scanner logs will appear here...</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section 2: Second Color Background - Results Section */}
      <div className="w-full bg-gradient-to-b from-indigo-950 via-indigo-950 to-blue-950/80 min-h-[30vh] relative overflow-hidden">
        {/* Background Elements for Section 2 */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-zinc-900 to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
          {/* Results Content */}
          {results.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 inline-block">
                  Scan Results
                </h2>
                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {results.map((res, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-indigo-900/40 to-blue-900/20 backdrop-blur-xl p-5 rounded-xl border border-indigo-500/20 shadow-lg transform-gpu hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:border-indigo-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-lg text-white flex items-center">
                        <Shield className="w-5 h-5 text-indigo-400 mr-2" />
                        Payload #{idx + 1}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        res.vulnerable 
                          ? "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border border-red-500/30" 
                          : "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border border-green-500/30"
                      }`}>
                        {res.vulnerable ? "Vulnerable" : "Not Vulnerable"}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-indigo-300 mb-1.5 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-indigo-400" />
                          URL
                        </p>
                        <p className="text-sm font-mono bg-indigo-950/80 p-3 rounded-lg overflow-x-auto whitespace-nowrap border border-indigo-800/50 text-blue-300">
                          {res.url}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-indigo-300 mb-1.5 flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5 text-indigo-400" />
                          Payload
                        </p>
                        <SyntaxHighlighter 
                          language="html" 
                          style={atomDark}
                          customStyle={{
                            background: 'rgba(30, 27, 75, 0.5)',
                            padding: '16px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            border: '1px solid rgba(79, 70, 229, 0.2)'
                          }}
                          wrapLongLines={true}
                        >
                          {res.payload}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center min-h-[30vh] py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-indigo-300/70"
              >
                <Code className="w-16 h-16 mb-4 mx-auto opacity-40" />
                <h3 className="text-xl font-medium mb-2 text-indigo-200">No Results Yet</h3>
                <p className="text-indigo-300/70 max-w-md mx-auto">
                  Enter a URL with the XSS_TEST placeholder and click "Start XSS Scan" to test for vulnerabilities.
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default XssClientWrapper; 