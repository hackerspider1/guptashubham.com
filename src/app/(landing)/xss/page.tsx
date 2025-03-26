"use client";

import React, { useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

const xssPayloads = {
  "Basic XSS Payloads": ['<script>alert(1)</script>', `"><script>alert(1)</script>`],
  "Advanced XSS Payloads": [`<img src=x onerror=alert(1)>`, `<svg onload=alert(1)>`],
  "Custom Payloads": ["<body onload=alert(1)>", `"><img src=x onerror=alert(document.domain)>`],
};

const Page = () => {
  const [selectedList, setSelectedList] = useState("Basic XSS Payloads");
  const [url, setUrl] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const scanForXSS = async () => {
    if (!url) return;

    setIsScanning(true);
    setLogs((prev) => [...prev, `➜ Scanning ${url} with ${selectedList}...`]);
    setResults([]);

    const payloads = xssPayloads[selectedList];

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

  return (
    <div className="max-w-3xl mx-auto p-6 h-full flex flex-col items-center justify-center">
      {/* Terminal UI */}
      <div className="bg-[#181a1b] w-full rounded-xl overflow-hidden shadow-xl border border-[#2d2f31]">
        <div className="bg-[#2d2f31] px-4 py-2 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
          </div>
          <div className="flex-1 text-center text-[#9da5b4] font-medium">XSS Scanner</div>
        </div>
        <div className="p-4 font-mono text-[13px] bg-[#181a1b] max-h-[25vh] overflow-y-auto">
          {logs.map((log, idx) => (
            <div key={idx} className="text-[#98c379] mb-2">{log}</div>
          ))}
          {!isScanning && (
            <div className="flex items-center text-[#98c379]">
              <span className="mr-2">➜</span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && scanForXSS()}
                placeholder="Enter URL with a Parameter /search?q=test"
                className="flex-1 bg-transparent border-none outline-none text-[#98c379] placeholder-[#4b5263]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Payload Selection */}
      <div className="mt-4 w-full">
        <SelectPrimitive.Root value={selectedList} onValueChange={setSelectedList}>
          <SelectPrimitive.Trigger className="flex justify-between items-center p-2 bg-[#2d2f31] text-[#98c379] rounded-md w-full">
            <SelectPrimitive.Value placeholder="Select a payload list" />
            <ChevronDown className="w-4 h-4 text-[#98c379]" />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content className="bg-[#181a1b] text-white rounded-md p-1 shadow-md">
            <SelectPrimitive.Viewport>
              {Object.keys(xssPayloads).map((option) => (
                <SelectPrimitive.Item
                  key={option}
                  value={option}
                  className="px-3 py-2 cursor-pointer hover:bg-[#2d2f31] rounded-md"
                >
                  <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <Check className="w-4 h-4 text-[#98c379]" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-bold text-[#98c379] mb-2">Results</h3>
          <div className="bg-[#181a1b] p-4 rounded-lg shadow-md border border-[#2d2f31] max-h-[20rem] overflow-auto">
            {results.map((res, idx) => (
              <div key={idx} className="mb-3">
                <p className="text-[#9da5b4]"><b>URL:</b> {res.url}</p>
                <p className="text-[#9da5b4]"><b>Payload:</b> {res.payload}</p>
                <p className={`font-bold ${res.vulnerable ? "text-[#ff5f57]" : "text-[#98c379]"}`}>
                  {res.vulnerable ? "Vulnerable ✅" : "Not Vulnerable ❌"}
                </p>
                <hr className="my-2 border-[#2d2f31]" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;