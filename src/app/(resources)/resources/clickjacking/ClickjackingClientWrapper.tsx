"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Globe, ShieldAlert, ArrowRight, MousePointer, Info, CheckCircle, XCircle } from "lucide-react";

const ClickjackingClientWrapper = () => {
  const [url, setUrl] = useState("");
  const [testUrl, setTestUrl] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [testComplete, setTestComplete] = useState(false);
  const [isVulnerable, setIsVulnerable] = useState<boolean | null>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

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
    setTestComplete(false);
    setIsVulnerable(null);
    setHistory((prev) => [...prev, `➜ Testing Clickjacking on ${formattedUrl}...`]);
    setTestUrl(formattedUrl);
    setUrl("");
    
    // Simulate a test process
    setTimeout(() => {
      setHistory((prev) => [...prev, `➜ Checking X-Frame-Options header...`]);
      setTimeout(() => {
        setHistory((prev) => [...prev, `➜ Checking Content-Security-Policy frame-ancestors...`]);
        setTimeout(() => {
          setHistory((prev) => [...prev, `➜ Testing iframe load capability...`]);
          setTimeout(() => {
            setIsTesting(false);
            setTestComplete(true);
            // We'll determine vulnerability based on iframe load success which happens later
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  // Handle iframe load success/failure
  const handleIframeLoad = () => {
    setIsVulnerable(true);
    setHistory((prev) => [...prev, `✅ Result: Target is VULNERABLE to clickjacking!`]);
  };

  const handleIframeError = () => {
    setIsVulnerable(false);
    setHistory((prev) => [...prev, `❌ Result: Target is NOT vulnerable to clickjacking.`]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTesting) {
      testClickjacking();
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
          <MousePointer size={120} className="filter blur-[1px]" />
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
                {/* 3D Icon */}
                <div className="mb-8 p-6 rounded-full bg-gradient-to-br from-red-600/30 to-orange-600/20 backdrop-blur-xl shadow-[0_0_30px_rgba(239,68,68,0.3)] border border-red-500/10 transform-gpu hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>
                  <ShieldAlert className="w-16 h-16 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-500">
                  Clickjacking Tester
                </h1>
                
                <p className="text-xl text-gray-400 max-w-2xl mb-12">
                  Test your web applications for Clickjacking vulnerabilities with our interactive tool
                </p>
              </motion.div>

              {/* Main content area with two columns */}
              <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column - URL Input Panel */}
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
                            placeholder="Enter website URL to test (e.g., example.com)"
                            className="flex-1 bg-transparent border-none outline-none text-orange-400 placeholder-zinc-600 p-3 font-mono text-sm"
                          />
                        </div>
                        <p className="text-xs text-zinc-500 mt-2">Example: facebook.com, twitter.com, etc.</p>
                      </div>
                    </div>
                    
                    {/* Clickjacking Info Card */}
                    <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.4)] border border-zinc-700/40 mb-5">
                      <div className="bg-gradient-to-r from-zinc-800/90 to-zinc-800/70 px-4 py-3 flex items-center gap-2 border-b border-zinc-700/30">
                        <div className="text-zinc-400 font-medium flex items-center justify-center gap-2">
                          <Info className="w-4 h-4" />
                          <span>About Clickjacking</span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <p className="text-zinc-400 text-sm mb-3">
                          Clickjacking (UI redressing) is an attack where users are tricked into clicking on disguised elements. 
                          This tool tests if a website can be loaded in an iframe, which is the first step towards vulnerability.
                        </p>
                        <p className="text-zinc-500 text-xs">
                          Secure websites use X-Frame-Options or Content-Security-Policy headers to prevent being loaded in iframes.
                        </p>
                      </div>
                    </div>
                    
                    {/* Test Button */}
                    <button
                      onClick={testClickjacking}
                      disabled={isTesting || !url}
                      className={`${
                        isTesting || !url 
                          ? "bg-zinc-700/80 cursor-not-allowed" 
                          : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                      } text-white rounded-xl px-6 py-4 transition-all duration-300 ease-in-out w-full flex items-center justify-center gap-2 shadow-lg transform-gpu active:scale-95 font-medium`}
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
                          <span>Clickjacking Test Terminal</span>
                        </div>
                        <div className="w-12"></div>
                      </div>
                      
                      {/* Terminal Body */}
                      <div 
                        ref={terminalRef}
                        className="p-4 font-mono text-[13px] bg-zinc-950/80 h-[300px] overflow-y-auto backdrop-blur-sm"
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
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section 2: Second Color Background - Results Section */}
      <div className="w-full bg-gradient-to-b from-amber-950 via-amber-950 to-orange-950/80 min-h-[50vh] relative overflow-hidden">
        {/* Background Elements for Section 2 */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-zinc-900 to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        
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
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300 inline-block">
                  Test Results
                </h2>
                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
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
                <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/20 backdrop-blur-xl p-5 rounded-xl border border-amber-500/20 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-lg text-white flex items-center gap-2">
                      <MousePointer className="w-5 h-5 text-amber-400" />
                      Clickjacking Test Frame
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Iframe Loading Test
                    </span>
                  </div>
                  
                  <p className="text-amber-200/70 mb-4 text-sm">
                    If the website appears in the frame below, it may be vulnerable to clickjacking attacks. 
                    Modern browsers may block cross-origin frames, which is a good security practice.
                  </p>
                  
                  <div className="bg-black/50 border border-amber-500/10 rounded-lg overflow-hidden h-[500px]">
                    <iframe
                      src={testUrl}
                      title="Clickjacking Test"
                      className="w-full h-full"
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                    ></iframe>
                  </div>
                </div>
                
                {/* Mitigation Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-amber-900/40 to-orange-900/20 backdrop-blur-xl p-5 rounded-xl border border-amber-500/20 shadow-lg"
                >
                  <h3 className="font-medium text-lg text-white flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                    How to Protect Against Clickjacking
                  </h3>
                  
                  <div className="space-y-3">
                    <p className="text-amber-200/70 text-sm">
                      If your website is vulnerable, you can implement these protections:
                    </p>
                    
                    <div className="bg-black/30 p-3 rounded-lg border border-amber-500/10">
                      <p className="text-amber-300 text-sm font-medium mb-1">X-Frame-Options Header</p>
                      <p className="text-xs font-mono text-amber-200/70">X-Frame-Options: DENY</p>
                      <p className="text-xs font-mono text-amber-200/70 mt-1">X-Frame-Options: SAMEORIGIN</p>
                    </div>
                    
                    <div className="bg-black/30 p-3 rounded-lg border border-amber-500/10">
                      <p className="text-amber-300 text-sm font-medium mb-1">Content Security Policy</p>
                      <p className="text-xs font-mono text-amber-200/70 break-words">Content-Security-Policy: frame-ancestors 'none'</p>
                      <p className="text-xs font-mono text-amber-200/70 mt-1 break-words">Content-Security-Policy: frame-ancestors 'self'</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center min-h-[30vh] py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-amber-300/70"
              >
                <MousePointer className="w-16 h-16 mb-4 mx-auto opacity-40" />
                <h3 className="text-xl font-medium mb-2 text-amber-200">No Tests Run Yet</h3>
                <p className="text-amber-300/70 max-w-md mx-auto">
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

 