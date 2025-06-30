"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Terminal, Loader2, ArrowRight, CheckCircle, XCircle, Info, Globe, Shield, Copy } from "lucide-react";
import LiquidGlass from "@/components/ui/liquid-glass";


// Define proper types for our request/response data
interface CorsTestResult {
  isVulnerable: boolean;
  responseData?: string;
}

interface FetchResult {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  allowOrigin?: string | null;
  allowCredentials?: boolean;
  bodyPreview?: string;
}

interface RequestResponseData {
  request?: {
    url: string;
    method: string;
    headers: Record<string, any>;
    corsExpectedBehavior?: string;
  };
  response?: FetchResult | { error: string };
  isVulnerable?: boolean;
  exploitCode?: string;
  corsTest?: CorsTestResult;
  error?: string;
}

const CorsClientWrapper = () => {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [requestResponse, setRequestResponse] = useState<RequestResponseData | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Function to generate exploit code for the user to copy
  const generateExploitCode = (targetUrl: string) => {
    return `
<!-- CORS Vulnerability POC for ${targetUrl} -->
<!DOCTYPE html>
<html>
<head>
  <title>CORS Vulnerability POC</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    textarea { width: 100%; height: 200px; margin-top: 10px; }
    button { padding: 8px 16px; background: #4a5568; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background: #2d3748; }
    .container { max-width: 800px; margin: 0 auto; }
    h3 { margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>CORS Vulnerability POC</h2>
    <div>
      <label for="targetURL">Target URL:</label>
      <input type="text" id="targetURL" value="${targetUrl}" style="width: 80%; padding: 8px; margin-right: 10px;">
      <button onclick="exploitCORS()">Test Vulnerability</button>
    </div>
    
    <h3>Response:</h3>
    <textarea id="fetchedResource" readonly></textarea>
    
    <h3>Status:</h3>
    <div id="status">Not tested yet</div>
  </div>

  <script>
    function exploitCORS() {
      var targetUrl = document.getElementById("targetURL").value;
      
      if (!targetUrl) {
        alert("Please enter a valid target URL!");
        return;
      }
      
      // Clear the previous response
      document.getElementById("fetchedResource").value = "";
      document.getElementById("status").innerHTML = "Testing...";
      
      var req = new XMLHttpRequest();
      req.onload = reqListener;
      req.onerror = reqError;
      req.open('GET', targetUrl, true); 
      req.withCredentials = true;
      req.send();
    }
    
    function reqListener() {
      document.getElementById("fetchedResource").value = this.responseText;
      document.getElementById("status").innerHTML = "<span style='color:red'>VULNERABLE! Cross-origin request succeeded with credentials.</span>";
    }
    
    function reqError() {
      document.getElementById("status").innerHTML = "<span style='color:green'>Not vulnerable or blocked by browser.</span>";
    }
  </script>
</body>
</html>
    `.trim();
  };

  const simulateAttack = async () => {
    if (!url) return;

    setIsProcessing(true);
    setHistory((prev) => [...prev, `➜ Scanning ${url}...`]);
    setHistory((prev) => [...prev, `➜ Checking CORS configuration with credentials...`]);

    try {
      // This will run client-side testing via XMLHttpRequest which is more accurate
      // but we'll also show the generated PoC code
      const corsTestPromise = new Promise<{isVulnerable: boolean, responseData?: string}>((resolve) => {
        // We need to use try-catch inside our client-side code as the browser will block
        // cross-origin requests that don't have proper CORS headers
        try {
          const xhr = new XMLHttpRequest();
          let corsResult = { isVulnerable: false, responseData: "" };

          xhr.onload = function() {
            try {
              // If we get here with credentials, the site is vulnerable
              corsResult.isVulnerable = true;
              corsResult.responseData = this.responseText.substring(0, 1000) + 
                (this.responseText.length > 1000 ? '...' : '');
              resolve(corsResult);
            } catch (e) {
              resolve({ isVulnerable: false });
            }
          };

          xhr.onerror = function() {
            // Error means CORS is properly blocking the request
            resolve({ isVulnerable: false });
          };

          xhr.open('GET', url, true);
          xhr.withCredentials = true;
          xhr.send();

          // Set a timeout in case the request hangs
          setTimeout(() => {
            resolve({ isVulnerable: false });
          }, 10000);
        } catch (e) {
          resolve({ isVulnerable: false });
        }
      });

      // Let's also do a standard fetch to check headers (but this isn't as accurate as XMLHttpRequest for CORS)
      const fetchTestPromise = fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit', // Don't send credentials in this test
        headers: {
          'Origin': 'https://evil.com'
        }
      }).then(async (response) => {
        const allowOrigin = response.headers.get('Access-Control-Allow-Origin');
        const allowCredentials = response.headers.get('Access-Control-Allow-Credentials');
        return {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          allowOrigin,
          allowCredentials: allowCredentials === 'true',
          bodyPreview: (await response.text()).substring(0, 300) + '...'
        };
      }).catch(() => null);

      // Wait for both tests to complete
      const [corsResult, fetchResult] = await Promise.all([
        corsTestPromise,
        fetchTestPromise
      ]);

      const isVulnerable = corsResult.isVulnerable || 
        (fetchResult && fetchResult.allowOrigin === '*' && fetchResult.allowCredentials) || false;

      setHistory((prev) => [
        ...prev,
        isVulnerable 
          ? "➜ VULNERABILITY DETECTED: Domain is vulnerable to CORS with credentials." 
          : "➜ SECURE: Domain is not vulnerable to CORS with credentials."
      ]);

      if (isVulnerable) {
        setHistory((prev) => [
          ...prev,
          "➜ INFO: Generated a PoC exploit for further testing."
        ]);
      } else if (fetchResult && fetchResult.allowOrigin) {
        setHistory((prev) => [
          ...prev,
          `➜ INFO: Server has CORS headers but seems properly configured: ${fetchResult.allowOrigin}`
        ]);
      }

      // Generate exploit code for the user
      const exploitCode = generateExploitCode(url);

      setRequestResponse({
        request: {
          url,
          method: "GET",
          headers: { "withCredentials": true },
          corsExpectedBehavior: "Browsers block requests with credentials unless server explicitly allows them"
        },
        response: fetchResult || { error: "Could not fetch headers" },
        isVulnerable,
        exploitCode,
        corsTest: corsResult
      });
    } catch (error) {
      setHistory((prev) => [...prev, "➜ ERROR: CORS scan failed."]);
      setRequestResponse({ 
        error: `Failed to test: ${error instanceof Error ? error.message : 'Unknown error'}`,
        exploitCode: generateExploitCode(url)
      });
    }
    
    setUrl("");
    setIsProcessing(false);
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
                <Globe className="w-8 h-8 text-blue-400" />
              </LiquidGlass>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              CORS POC Generator
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl text-zinc-400 max-w-2xl"
            >
              Test domains for Cross-Origin Resource Sharing vulnerabilities
            </motion.p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl w-full px-6 pb-20">
        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <LiquidGlass
            variant="modal"
            intensity="high"
            rounded="xl"
            className="w-full overflow-hidden shadow-2xl"
          >
            {/* Terminal header */}
            <div className="bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 px-4 py-3 flex items-center gap-2 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a123] shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#24aa36] shadow-inner"></div>
              </div>
              <div className="flex-1 text-center text-sm text-zinc-400 font-medium">
                <span className="text-green-400">./</span>
                <span className="text-blue-400">cors-test</span>
                <span className="text-red-400">.py</span>
              </div>
              <div className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-zinc-400 opacity-70">
                v2.0.0
              </div>
            </div>
            
            {/* Terminal content area */}
            <div 
              ref={terminalRef}
              className="p-5 font-mono text-sm bg-gradient-to-b from-zinc-950/50 to-zinc-900/50 max-h-[40vh] overflow-y-auto hide-scrollbar"
            >
              {history.length === 0 && (
                <div className="text-zinc-500 italic mb-4">Type a URL to test for CORS vulnerabilities...</div>
              )}
              
              {history.map((cmd, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`mb-2 ${
                    cmd.includes("VULNERABILITY DETECTED") 
                      ? "text-red-400" 
                      : cmd.includes("SECURE") 
                        ? "text-green-400"
                        : cmd.includes("ERROR")
                          ? "text-yellow-400"
                          : cmd.includes("INFO")
                            ? "text-blue-300"
                            : "text-blue-400"
                  }`}
                >
                  {cmd}
                </motion.div>
              ))}
              
              {!isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  <span className="mr-2 text-purple-400">➜</span>
                  <div className="flex-1 flex items-center">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && simulateAttack()}
                      placeholder="Enter target URL (e.g., https://example.com)"
                      className="flex-1 bg-transparent border-none outline-none text-blue-400 placeholder-zinc-700 focus:ring-0"
                    />
                    {url && (
                      <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={simulateAttack}
                        className="ml-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ArrowRight size={16} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
              
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center text-purple-400"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Processing request...</span>
                </motion.div>
              )}
            </div>
          </LiquidGlass>
        </motion.div>
        
        {/* Request & Response */}
        {requestResponse && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            {/* Result Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <LiquidGlass
                variant="card"
                intensity="medium"
                rounded="lg"
                className={`mb-6 p-4 ${
                // @ts-ignore
                requestResponse.isVulnerable
                    ? "border-red-500/30 text-red-400"
                  // @ts-ignore
                  : requestResponse.error 
                      ? "border-yellow-500/30 text-yellow-400"
                      : "border-green-500/30 text-green-400"
                }`}
            >
              <div className="flex items-center gap-2">
                {/* @ts-ignore */}
                {requestResponse.isVulnerable ? (
                  <XCircle className="w-5 h-5 text-red-500" />
                ) : (
                  // @ts-ignore
                  requestResponse.error ? (
                    <Info className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )
                )}
                <h2 className="text-lg font-semibold">
                  {/* @ts-ignore */}
                  {requestResponse.isVulnerable
                    ? "Vulnerable to CORS Misconfiguration"
                    // @ts-ignore
                    : requestResponse.error
                      ? "Test Inconclusive"
                      : "No CORS Vulnerability Detected"}
                </h2>
              </div>
              <p className="mt-2 text-sm opacity-80">
                {/* @ts-ignore */}
                {requestResponse.isVulnerable
                  ? "This endpoint allows cross-origin requests with credentials, which could lead to sensitive data exposure."
                  // @ts-ignore
                  : requestResponse.error
                    // @ts-ignore
                    ? `Could not complete test: ${requestResponse.error}`
                    : "This endpoint properly restricts cross-origin requests with credentials."}
              </p>
              </LiquidGlass>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
              {/* Request */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="relative group"
              >
                <LiquidGlass
                  variant="card"
                  intensity="medium"
                  rounded="xl"
                  className="p-5 text-zinc-300 overflow-hidden border-blue-500/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-blue-400">Request</h3>
                  </div>
                  <SyntaxHighlighter 
                    language="json" 
                    style={atomDark} 
                    className="rounded-lg !bg-zinc-950/70 !p-4 max-h-[20rem] overflow-auto text-sm"
                    wrapLongLines={true}
                  >
                    {/* @ts-ignore */}
                    {JSON.stringify(requestResponse.request, null, 2)}
                  </SyntaxHighlighter>
                </LiquidGlass>
              </motion.div>
              
              {/* Response */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="relative group"
              >
                <LiquidGlass
                  variant="card"
                  intensity="medium"
                  rounded="xl"
                  className="p-5 text-zinc-300 overflow-hidden border-purple-500/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-purple-400">Response</h3>
                  </div>
                  <SyntaxHighlighter 
                    language="json" 
                    style={atomDark} 
                    className="rounded-lg !bg-zinc-950/70 !p-4 max-h-[20rem] overflow-auto text-sm"
                    wrapLongLines={true}
                  >
                    {/* @ts-ignore */}
                    {JSON.stringify(requestResponse.response, null, 2)}
                  </SyntaxHighlighter>
                </LiquidGlass>
              </motion.div>
            </div>

            {/* Exploit Code Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="relative group mt-8"
            >
              <LiquidGlass
                variant="card"
                intensity="medium"
                rounded="xl"
                className="p-5 text-zinc-300 overflow-hidden border-green-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-green-400">Exploit PoC</h3>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // @ts-ignore
                      navigator.clipboard.writeText(requestResponse.exploitCode || "");
                      setHistory(prev => [...prev, "➜ INFO: Copied exploit code to clipboard"]);
                    }}
                    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-zinc-300 transition-colors border border-white/10"
                  >
                    <Copy size={12} />
                    Copy to Clipboard
                  </motion.button>
                </div>

                <div className="text-xs text-zinc-500 mb-3">
                  Save this HTML file and open it in your browser to test the CORS vulnerability
                </div>

                <SyntaxHighlighter 
                  language="html" 
                  style={atomDark} 
                  className="rounded-lg !bg-zinc-950/70 !p-4 max-h-[30rem] overflow-auto text-sm"
                  wrapLongLines={true}
                  showLineNumbers={true}
                >
                  {/* @ts-ignore */}
                  {requestResponse?.exploitCode || ""}
                </SyntaxHighlighter>
              </LiquidGlass>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CorsClientWrapper; 