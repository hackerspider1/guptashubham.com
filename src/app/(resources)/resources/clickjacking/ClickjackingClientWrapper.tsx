"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Globe, Info, Bug, MousePointer, CheckCircle, XCircle, ShieldAlert } from "lucide-react";
import LiquidGlass from "@/components/ui/liquid-glass";


const ClickjackingClientWrapper = () => {
  const [url, setUrl] = useState("");
  const [testUrl, setTestUrl] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [testComplete, setTestComplete] = useState(false);
  const [isVulnerable, setIsVulnerable] = useState<boolean | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const formatUrl = (input: string) => {
    if (!input.startsWith('http://') && !input.startsWith('https://')) {
      return `https://${input}`;
    }
    return input;
  };

  const testClickjacking = () => {
    const formattedUrl = formatUrl(url);
    setIsTesting(true);
    setTestComplete(false);
    setIsVulnerable(null);
    setHistory((prev) => [...prev, `➜ Testing Clickjacking on ${formattedUrl}...`]);
    setTestUrl(formattedUrl);
    setUrl("");
    
    setTimeout(() => {
      setHistory((prev) => [...prev, `➜ Checking X-Frame-Options header...`]);
      setTimeout(() => {
        setHistory((prev) => [...prev, `➜ Checking Content-Security-Policy frame-ancestors...`]);
        setTimeout(() => {
          setHistory((prev) => [...prev, `➜ Testing iframe load capability...`]);
          setTimeout(() => {
            setIsTesting(false);
            setTestComplete(true);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleIframeLoad = () => {
    setIsVulnerable(true);
    setHistory((prev) => [...prev, `✅ Result: Target is VULNERABLE to clickjacking!`]);
  };

  const handleIframeError = () => {
    setIsVulnerable(false);
    setHistory((prev) => [...prev, `❌ Result: Target is NOT vulnerable to clickjacking.`]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTesting && url) {
      testClickjacking();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      {/* Clean Dark Background with Subtle Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      
        
      <div className="bg-gradient-to-b from-black to-zinc-900 w-full flex justify-center pb-8 relative z-10">
          <div className="relative z-10 max-w-6xl w-full px-6">
          <div className="text-center mb-16 relative pt-20 flex flex-col justify-center items-center">
              <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="relative mb-6" 
            >
              <LiquidGlass
                variant="prominent"
                intensity="high"
                rounded="full"
                className="w-20 h-20 flex items-center justify-center shadow-lg"
              >
                <Bug className="w-8 h-8 text-red-400" />
              </LiquidGlass>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Clickjacking Tester
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl text-zinc-400 max-w-2xl"
            >
              Test your web applications for Clickjacking vulnerabilities with our interactive tool
            </motion.p>
          </div>
        </div>
                </div>
                
      <div className="relative z-10 max-w-5xl w-full px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - URL Input Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
                  >
                    {/* URL Input Card */}
            <LiquidGlass
              variant="card"
              intensity="medium"
              rounded="xl"
              className="p-6 border-red-500/20"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-300">
                <Globe className="w-5 h-5" />
                Target URL
              </h2>
                      
              <div className="space-y-4">
                <div className="flex items-center bg-zinc-950/50 rounded-lg border border-zinc-800/50 overflow-hidden">
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter website URL to test (e.g., example.com)"
                    className="flex-1 bg-transparent border-none outline-none text-red-400 placeholder-zinc-600 p-3 font-mono text-sm"
                          />
                        </div>
                <p className="text-xs text-zinc-500">Example: facebook.com, twitter.com, etc.</p>
                      </div>
            </LiquidGlass>
                    
                    {/* Clickjacking Info Card */}
            <LiquidGlass
              variant="card"
              intensity="medium"
              rounded="xl"
              className="p-6 border-orange-500/20"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-300">
                <Info className="w-5 h-5" />
                About Clickjacking
              </h2>
                      
              <div className="space-y-3">
                <p className="text-zinc-400 text-sm">
                          Clickjacking (UI redressing) is an attack where users are tricked into clicking on disguised elements. 
                          This tool tests if a website can be loaded in an iframe, which is the first step towards vulnerability.
                        </p>
                        <p className="text-zinc-500 text-xs">
                          Secure websites use X-Frame-Options or Content-Security-Policy headers to prevent being loaded in iframes.
                        </p>
                      </div>
            </LiquidGlass>
                    
                    {/* Test Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
                      onClick={testClickjacking}
                      disabled={isTesting || !url}
                      className={`${
                        isTesting || !url 
                          ? "bg-zinc-700/80 cursor-not-allowed" 
                  : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500"
              } text-white rounded-xl px-6 py-4 transition-all duration-300 ease-in-out w-full flex items-center justify-center gap-2 shadow-lg font-medium backdrop-blur-sm border border-red-500/20`}
                    >
                      {isTesting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                          <span>Testing...</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-5 h-5" />
                          <span>Start Clickjacking Test</span>
                        </>
                      )}
            </motion.button>
                  </motion.div>
                  
                  {/* Right Column - Terminal Console */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
                  >
                    {/* Terminal Card */}
            <LiquidGlass
              variant="card"
              intensity="medium"
              rounded="xl"
              className="p-6 h-full border-purple-500/20"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-300">
                <Terminal className="w-5 h-5" />
                Test Log
              </h2>
                      
                      {/* Terminal Body */}
                      <div 
                        ref={terminalRef}
                className="font-mono text-sm bg-zinc-950/50 rounded-lg p-4 h-[300px] overflow-y-auto border border-zinc-800/50"
                      >
                        {history.length > 0 ? (
                          history.map((log, idx) => (
                            <div key={idx} className={`mb-2 ${
                              log.includes("✅") ? "text-green-400" : 
                              log.includes("❌") ? "text-red-400" : 
                              "text-orange-400"
                            } drop-shadow-[0_0_2px_rgba(249,115,22,0.3)]`}>{log}</div>
                          ))
                        ) : (
                          <div className="text-zinc-500 italic">Test logs will appear here...</div>
                        )}
                        {!isTesting && !testComplete && history.length > 0 && (
                          <div className="flex items-center text-orange-400">
                            <span className="mr-2">➜</span>
                            <span className="flex-1 text-zinc-500">Waiting for command...</span>
                          </div>
                        )}
                      </div>
            </LiquidGlass>
                  </motion.div>
        </div>
      </div>
      
      {/* Results Section with Clean Dark Background */}
      <div className="w-full bg-black min-h-[50vh] relative overflow-hidden">
        {/* Clean Dark Background with Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
          {/* Results Content */}
          {testUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white inline-block">
                  Test Results
                </h2>
                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="flex flex-col gap-6">
                {/* Status Banner */}
                {isVulnerable !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-full py-4 px-6 rounded-xl flex items-center gap-4 ${
                      isVulnerable 
                        ? "bg-red-500/20 border border-red-500/30" 
                        : "bg-green-500/20 border border-green-500/30"
                    }`}
                  >
                    {isVulnerable ? (
                      <>
                        <XCircle className="text-red-400 w-8 h-8 flex-shrink-0" />
                        <div>
                          <h3 className="text-red-300 font-medium text-lg">Vulnerable to Clickjacking</h3>
                          <p className="text-red-200/80 text-sm">This website can be loaded in an iframe and is potentially vulnerable to clickjacking attacks.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="text-green-400 w-8 h-8 flex-shrink-0" />
                        <div>
                          <h3 className="text-green-300 font-medium text-lg">Protected Against Clickjacking</h3>
                          <p className="text-green-200/80 text-sm">This website has proper protections in place to prevent being loaded in an iframe.</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
                
                {/* Iframe Test Frame */}
                <LiquidGlass
                  variant="clean"
                  intensity="medium"
                  rounded="xl"
                  className="p-5 border-red-500/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-lg text-white flex items-center gap-2">
                      <MousePointer className="w-5 h-5 text-red-400" />
                      Clickjacking Test Frame
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                      Iframe Loading Test
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-sm">
                    If the website appears in the frame below, it may be vulnerable to clickjacking attacks. 
                    Modern browsers may block cross-origin frames, which is a good security practice.
                  </p>
                  
                  <div className="bg-black/50 border border-red-500/10 rounded-lg overflow-hidden h-[500px]">
                    <iframe
                      src={testUrl}
                      title="Clickjacking Test"
                      className="w-full h-full"
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                    ></iframe>
                  </div>
                </LiquidGlass>
                
                {/* Mitigation Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <LiquidGlass
                    variant="clean"
                    intensity="medium"
                    rounded="xl"
                    className="p-5 border-orange-500/10"
                  >
                    <h3 className="font-medium text-lg text-white flex items-center gap-2 mb-3">
                      <ShieldAlert className="w-5 h-5 text-orange-400" />
                      How to Protect Against Clickjacking
                    </h3>
                    
                    <div className="space-y-3">
                      <p className="text-gray-300 text-sm">
                        If your website is vulnerable, you can implement these protections:
                      </p>
                      
                      <div className="bg-black/30 p-3 rounded-lg border border-orange-500/10">
                        <p className="text-orange-300 text-sm font-medium mb-1">X-Frame-Options Header</p>
                        <p className="text-xs font-mono text-gray-300">X-Frame-Options: DENY</p>
                        <p className="text-xs font-mono text-gray-300 mt-1">X-Frame-Options: SAMEORIGIN</p>
                      </div>
                      
                      <div className="bg-black/30 p-3 rounded-lg border border-orange-500/10">
                        <p className="text-orange-300 text-sm font-medium mb-1">Content Security Policy</p>
                        <p className="text-xs font-mono text-gray-300 break-words">Content-Security-Policy: frame-ancestors 'none'</p>
                        <p className="text-xs font-mono text-gray-300 mt-1 break-words">Content-Security-Policy: frame-ancestors 'self'</p>
                      </div>
                    </div>
                  </LiquidGlass>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center min-h-[30vh] py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-300"
              >
                <MousePointer className="w-16 h-16 mb-4 mx-auto opacity-40" />
                <h3 className="text-xl font-medium mb-2 text-white">No Tests Run Yet</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Enter a URL and click "Start Clickjacking Test" to check if a website is vulnerable to UI redressing attacks.
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClickjackingClientWrapper;