"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidGlass from './ui/liquid-glass';
import { 
  Search, 
  Globe, 
  Shield, 
  Terminal, 
  Eye, 
  Network, 
  Lock, 
  Zap,
  Database,
  FileText,
  Server,
  Smartphone,
  Bug,
  AlertTriangle,
  ChevronRight,
  X,
  ArrowDown
} from 'lucide-react';

interface MethodologyNode {
  id: string;
  label: string;
  icon: React.ElementType;
  category: 'recon' | 'scanning' | 'enumeration' | 'exploitation' | 'post-exploitation' | 'reporting';
  description: string;
  tools: string[];
  techniques: string[];
  position: { x: number; y: number };
  connections: string[];
  color: string;
  level: number;
}

const methodologyData: MethodologyNode[] = [
  // Level 0 - Starting point (Top center)
  {
    id: 'recon',
    label: 'Reconnaissance',
    icon: Search,
    category: 'recon',
    description: 'Initial information gathering phase to identify the target attack surface',
    tools: ['Google Dorking', 'Shodan', 'Censys', 'TheHarvester'],
    techniques: ['OSINT', 'Passive Information Gathering', 'Target Profiling'],
    position: { x: 50, y: 15 },
    connections: ['subdomain', 'web-recon', 'network-scan'],
    color: '#10B981',
    level: 0
  },
  
  // Level 1 - First tier (Spread across top)
  {
    id: 'subdomain',
    label: 'Subdomain Enumeration',
    icon: Globe,
    category: 'recon',
    description: 'Discover subdomains to expand the attack surface',
    tools: ['Amass', 'Subfinder', 'Assetfinder', 'Findomain'],
    techniques: ['DNS Brute Force', 'Certificate Transparency', 'Search Engine Dorking'],
    position: { x: 20, y: 30 },
    connections: ['dns-enum', 'web-recon'],
    color: '#F59E0B',
    level: 1
  },

  {
    id: 'web-recon',
    label: 'Web Reconnaissance',
    icon: Eye,
    category: 'recon',
    description: 'Analyze web applications and gather technology information',
    tools: ['Httprobe', 'Eyewitness', 'Gowitness', 'Webanalyze'],
    techniques: ['Screenshot Analysis', 'Technology Stack Identification', 'Content Discovery'],
    position: { x: 50, y: 30 },
    connections: ['dir-bruteforce', 'web-vuln'],
    color: '#EF4444',
    level: 1
  },

  {
    id: 'network-scan',
    label: 'Network Scanning',
    icon: Network,
    category: 'scanning',
    description: 'Identify live hosts and open ports on the network',
    tools: ['Nmap', 'Masscan', 'Zmap', 'Unicornscan'],
    techniques: ['Port Scanning', 'Service Detection', 'OS Fingerprinting'],
    position: { x: 80, y: 30 },
    connections: ['service-enum', 'vuln-scan'],
    color: '#3B82F6',
    level: 1
  },

  // Level 2 - Second tier (Wider spread)
  {
    id: 'dns-enum',
    label: 'DNS Enumeration',
    icon: Server,
    category: 'enumeration',
    description: 'Gather DNS information and perform zone transfers',
    tools: ['dnsrecon', 'fierce', 'dnsmap', 'dnsenum'],
    techniques: ['Zone Transfer', 'DNS Bruteforce', 'Reverse DNS'],
    position: { x: 10, y: 50 },
    connections: ['social-eng'],
    color: '#06B6D4',
    level: 2
  },

  {
    id: 'dir-bruteforce',
    label: 'Directory Brute Force',
    icon: FileText,
    category: 'enumeration',
    description: 'Discover hidden directories and files on web servers',
    tools: ['ffuf', 'Dirsearch', 'Gobuster', 'Dirb'],
    techniques: ['Directory Fuzzing', 'File Extension Bruteforce', 'Virtual Host Discovery'],
    position: { x: 35, y: 50 },
    connections: ['web-vuln'],
    color: '#8B5CF6',
    level: 2
  },

  {
    id: 'service-enum',
    label: 'Service Enumeration',
    icon: Terminal,
    category: 'enumeration',
    description: 'Enumerate specific services running on discovered ports',
    tools: ['Enum4linux', 'SMBClient', 'SNMPWalk', 'Telnet'],
    techniques: ['Banner Grabbing', 'Service Fingerprinting', 'Protocol Analysis'],
    position: { x: 65, y: 50 },
    connections: ['exploitation'],
    color: '#F97316',
    level: 2
  },

  {
    id: 'vuln-scan',
    label: 'Vulnerability Scanning',
    icon: Shield,
    category: 'scanning',
    description: 'Automated vulnerability detection and assessment',
    tools: ['Nessus', 'OpenVAS', 'Nuclei', 'Nikto'],
    techniques: ['CVE Identification', 'Configuration Review', 'Compliance Checking'],
    position: { x: 90, y: 50 },
    connections: ['exploitation'],
    color: '#DC2626',
    level: 2
  },

  // Level 2.5 - Side branches
  {
    id: 'social-eng',
    label: 'Social Engineering',
    icon: Smartphone,
    category: 'recon',
    description: 'Human-based attacks to gather information or access',
    tools: ['SET', 'Gophish', 'King Phisher', 'BeEF'],
    techniques: ['Phishing', 'Pretexting', 'Baiting', 'Tailgating'],
    position: { x: 15, y: 65 },
    connections: ['exploitation'],
    color: '#991B1B',
    level: 2
  },

  {
    id: 'web-vuln',
    label: 'Web Vulnerabilities',
    icon: Bug,
    category: 'exploitation',
    description: 'Identify and exploit web application vulnerabilities',
    tools: ['Burp Suite', 'OWASP ZAP', 'SQLMap', 'XSStrike'],
    techniques: ['SQL Injection', 'XSS', 'CSRF', 'Authentication Bypass'],
    position: { x: 50, y: 65 },
    connections: ['exploitation'],
    color: '#BE185D',
    level: 2
  },

  // Level 3 - Exploitation (Center bottom)
  {
    id: 'exploitation',
    label: 'Exploitation',
    icon: Zap,
    category: 'exploitation',
    description: 'Execute exploits to gain unauthorized access',
    tools: ['Metasploit', 'ExploitDB', 'Custom Exploits', 'Manual Testing'],
    techniques: ['Remote Code Execution', 'Privilege Escalation', 'Lateral Movement'],
    position: { x: 50, y: 80 },
    connections: ['post-exploitation'],
    color: '#7C2D12',
    level: 3
  },

  // Level 4 - Final stages (Bottom)
  {
    id: 'post-exploitation',
    label: 'Post Exploitation',
    icon: Lock,
    category: 'post-exploitation',
    description: 'Maintain access and gather sensitive information',
    tools: ['Empire', 'Cobalt Strike', 'Meterpreter', 'PowerShell'],
    techniques: ['Data Exfiltration', 'Persistence', 'Covering Tracks'],
    position: { x: 35, y: 95 },
    connections: ['reporting'],
    color: '#450A0A',
    level: 4
  },

  {
    id: 'reporting',
    label: 'Reporting',
    icon: FileText,
    category: 'reporting',
    description: 'Document findings and provide remediation recommendations',
    tools: ['Dradis', 'Faraday', 'PlexTrac', 'Custom Templates'],
    techniques: ['Executive Summary', 'Technical Details', 'Risk Assessment'],
    position: { x: 65, y: 95 },
    connections: [],
    color: '#059669',
    level: 4
  }
];

const InteractiveMethodology: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<MethodologyNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [connections, setConnections] = useState<Array<{from: string, to: string}>>([]);

  useEffect(() => {
    // Build connections array from methodology data
    const allConnections: Array<{from: string, to: string}> = [];
    methodologyData.forEach(node => {
      node.connections.forEach(connectionId => {
        allConnections.push({ from: node.id, to: connectionId });
      });
    });
    setConnections(allConnections);
  }, []);

  const getNodeById = (id: string) => methodologyData.find(node => node.id === id);

  const getCategoryColor = (category: string) => {
    const colors = {
      'recon': '#10B981',
      'scanning': '#3B82F6', 
      'enumeration': '#8B5CF6',
      'exploitation': '#EF4444',
      'post-exploitation': '#7C2D12',
      'reporting': '#059669'
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  };

      return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Subtle gradient orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-green-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 text-center pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              Interactive Methodology
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto px-6">
              Explore the comprehensive cybersecurity reconnaissance methodology with interactive visualizations
            </p>
            <motion.div 
              className="mt-8 flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="text-gray-400" size={24} />
            </motion.div>
          </motion.div>
        </div>

        {/* Full-page Methodology Visualization */}
        <div className="relative w-full h-screen">
                      {/* Connection Lines SVG - Full page */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {connections.map((connection, index) => {
              const fromNode = getNodeById(connection.from);
              const toNode = getNodeById(connection.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = hoveredNode === connection.from || hoveredNode === connection.to;
              
              return (
                <motion.line
                  key={`${connection.from}-${connection.to}`}
                  x1={`${fromNode.position.x}%`}
                  y1={`${fromNode.position.y}%`}
                  x2={`${toNode.position.x}%`}
                  y2={`${toNode.position.y}%`}
                  stroke={isHighlighted ? "url(#connectionGradient)" : "rgba(147, 197, 253, 0.3)"}
                  strokeWidth={isHighlighted ? 4 : 2}
                  filter={isHighlighted ? "url(#glow)" : "none"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: index * 0.15 }}
                  className="transition-all duration-500"
                />
              );
            })}

            {/* Animated flow particles */}
            {connections.map((connection, index) => {
              const fromNode = getNodeById(connection.from);
              const toNode = getNodeById(connection.to);
              if (!fromNode || !toNode) return null;

              return (
                <motion.circle
                  key={`particle-${connection.from}-${connection.to}`}
                  r="4"
                  fill="#60A5FA"
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    cx: [`${fromNode.position.x}%`, `${toNode.position.x}%`],
                    cy: [`${fromNode.position.y}%`, `${toNode.position.y}%`],
                    opacity: [0, 1, 0] 
                  }}
                  transition={{ 
                    duration: 4, 
                    delay: index * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              );
            })}
          </svg>

            {/* Methodology Nodes */}
            {methodologyData.map((node, index) => {
              const IconComponent = node.icon;
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode === node.id;
              const isConnected = hoveredNode && (
                node.connections.includes(hoveredNode) || 
                connections.some(conn => conn.to === node.id && conn.from === hoveredNode)
              );

              return (
                <motion.div
                  key={node.id}
                  className={`absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20 ${
                    isSelected ? 'z-50' : ''
                  }`}
                  style={{
                    left: `${node.position.x}%`,
                    top: `${node.position.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isSelected ? 1.4 : isHovered || isConnected ? 1.3 : 1,
                    rotate: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.3, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className={`
                    relative p-8 rounded-3xl border-2 transition-all duration-500 backdrop-blur-xl min-w-[200px]
                    ${isSelected 
                      ? 'border-white shadow-2xl shadow-white/30 bg-gradient-to-br from-white/15 to-white/5' 
                      : isHovered || isConnected
                      ? 'border-cyan-400 shadow-2xl shadow-cyan-400/30 bg-gradient-to-br from-cyan-500/15 to-purple-500/10'
                      : 'border-gray-600/30 bg-gradient-to-br from-gray-800/50 to-gray-900/30 hover:from-gray-700/60 hover:to-gray-800/50'
                    }
                  `}>
                    
                    {/* Glowing background effect */}
                    <div className={`
                      absolute inset-0 rounded-3xl transition-all duration-500 -z-10
                      ${isSelected || isHovered || isConnected 
                        ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl' 
                        : ''
                      }
                    `} />

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className={`
                        p-6 rounded-full mb-4 transition-all duration-500 relative overflow-hidden
                        ${isSelected || isHovered || isConnected 
                          ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-700'
                        }
                      `}>
                        {/* Icon glow effect */}
                        <div className={`
                          absolute inset-0 rounded-full transition-all duration-500
                          ${isSelected || isHovered || isConnected 
                            ? 'bg-gradient-to-r from-cyan-400/40 to-purple-400/40 blur-xl' 
                            : ''
                          }
                        `} />
                        <IconComponent size={32} className="text-white relative z-10" />
                      </div>
                      
                      <h3 className="font-bold text-lg text-white mb-3 leading-tight">{node.label}</h3>
                      
                      <div className={`
                        w-4 h-4 rounded-full transition-all duration-300 mb-2
                        ${isSelected ? 'bg-white shadow-lg shadow-white/50' : 'bg-current shadow-lg'}
                      `}
                        style={{ color: node.color }}
                      />
                      
                      <span className="text-sm text-gray-400 opacity-80">Level {node.level}</span>
                    </div>

                    {/* Level indicator */}
                    <div className={`
                      absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                      ${isSelected || isHovered || isConnected
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-white text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-gray-800 border-gray-600 text-gray-300'
                      }
                    `}>
                      {node.level}
                    </div>

                    {/* Pulse animation for active nodes */}
                    {(isHovered || isConnected) && (
                      <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/40 animate-pulse" />
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Enhanced Legend - Fixed position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <LiquidGlass variant="modal" intensity="medium" rounded="2xl" className="flex flex-wrap justify-center gap-4 p-4">
            {['recon', 'scanning', 'enumeration', 'exploitation', 'post-exploitation', 'reporting'].map((category) => (
              <motion.div 
                key={category} 
                className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-900/60 to-gray-800/40 rounded-xl border border-gray-700/30 hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div 
                  className="w-3 h-3 rounded-full shadow-lg"
                  style={{ backgroundColor: getCategoryColor(category), boxShadow: `0 0 10px ${getCategoryColor(category)}30` }}
                />
                <span className="text-sm font-medium capitalize text-gray-200">{category.replace('-', ' ')}</span>
              </motion.div>
            ))}
          </LiquidGlass>
        </motion.div>

      {/* Enhanced Node Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedNode(null)}
          >
            <LiquidGlass
              as={motion.div}
              variant="modal"
              intensity="high"
              rounded="2xl"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-lg shadow-blue-500/20">
                    <selectedNode.icon size={40} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedNode.label}</h2>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-lg"
                        style={{ backgroundColor: selectedNode.color, boxShadow: `0 0 15px ${selectedNode.color}40` }}
                      />
                      <span className="text-gray-300 capitalize">{selectedNode.category.replace('-', ' ')}</span>
                      <span className="text-sm bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-300">
                        Level {selectedNode.level}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-3 hover:bg-gray-700/50 rounded-xl transition-colors group"
                >
                  <X size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedNode.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedNode.tools.map((tool, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-800/60 to-gray-700/40 rounded-xl border border-gray-600/30 hover:from-gray-700/60 hover:to-gray-600/40 transition-all duration-300"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <Terminal size={20} className="text-cyan-400" />
                        <span className="text-gray-200 font-medium">{tool}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Techniques</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedNode.techniques.map((technique, index) => (
                      <motion.span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {technique}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {selectedNode.connections.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Connected Phases</h3>
                    <div className="space-y-3">
                      {selectedNode.connections.map((connectionId) => {
                        const connectedNode = getNodeById(connectionId);
                        if (!connectedNode) return null;
                        
                        return (
                          <motion.div 
                            key={connectionId}
                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/30 rounded-xl cursor-pointer hover:from-gray-700/50 hover:to-gray-600/40 transition-all duration-300 border border-gray-600/30 hover:border-gray-500/50"
                            onClick={() => setSelectedNode(connectedNode)}
                            whileHover={{ scale: 1.02, x: 10 }}
                          >
                            <div className="p-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600">
                              <connectedNode.icon size={20} className="text-gray-200" />
                            </div>
                            <span className="text-gray-200 font-medium flex-1">{connectedNode.label}</span>
                            <ChevronRight size={20} className="text-gray-400" />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </LiquidGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMethodology; 