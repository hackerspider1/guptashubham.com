"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Page = () => {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [requestResponse, setRequestResponse] = useState(null);

  const simulateAttack = async () => {
    if (!url) return;

    setIsProcessing(true);
    setHistory((prev) => [...prev, `➜ Scanning ${url}...`]);
    setUrl("");

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Origin: "https://evil.com",
        },
      });

      const responseBody = await response.text();
      const isVulnerable = response.headers.get("Access-Control-Allow-Origin") === "https://evil.com";

      setHistory((prev) => [
        ...prev,
        isVulnerable ? "➜ Domain is vulnerable to CORS." : "➜ Domain is not vulnerable to CORS."
      ]);

      setRequestResponse({
        request: {
          url,
          method: "GET",
          headers: { credentials: "include", Origin: "https://evil.com" },
        },
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseBody,
        },
        isVulnerable,
      });
    } catch (error) {
      setHistory((prev) => [...prev, "➜ CORS scan failed."]);
      setRequestResponse({ error: `Failed to fetch: ${error.message}` });
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-full flex flex-col items-center justify-center">
      {/* Terminal */}
      <div className="bg-[#181a1b] w-full rounded-xl overflow-hidden shadow-xl border border-[#2d2f31]">
        <div className="bg-[#2d2f31] px-4 py-2 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#24aa36]"></div>
          </div>
          <div className="flex-1 text-center text-[13px] text-[#9da5b4] font-medium -ml-16">
            CORS PoC
          </div>
        </div>
        <div className="p-4 font-mono text-[13px] bg-[#181a1b] max-h-[30vh] overflow-y-auto hide-scrollbar">
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
          {!isProcessing && (
            <div className="flex items-center text-[#98c379]">
              <span className="mr-2">➜</span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && simulateAttack()}
                placeholder="Enter target URL"
                className="flex-1 bg-transparent border-none outline-none text-[#98c379] placeholder-[#4b5263]"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Request & Response */}
      {requestResponse && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
          {/* Request */}
          <div className="bg-[#181a1b] p-4 rounded-lg shadow-md border border-[#2d2f31] text-[#98c379]">
            <h3 className="text-lg font-bold mb-2">Request</h3>
            <SyntaxHighlighter language="json" style={atomDark} className="rounded-lg p-4 max-h-[20rem] overflow-auto wrapLongLines={true}">
              {JSON.stringify(requestResponse.request, null, 2)}
            </SyntaxHighlighter>
          </div>
          {/* Response */}
          <div className="bg-[#181a1b] p-4 rounded-lg shadow-md border border-[#2d2f31] text-[#98c379]">
            <h3 className="text-lg font-bold mb-2">Response</h3>
            <SyntaxHighlighter language="json" style={atomDark} className="rounded-lg p-4 max-h-[20rem] overflow-auto wrapLongLines={true}">
              {JSON.stringify(requestResponse.response, null, 2)}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;