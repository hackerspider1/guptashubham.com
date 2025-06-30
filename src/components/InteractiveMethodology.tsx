"use client";

import React, { useState, useEffect } from 'react';
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
  ArrowDown,
  Clock,
  Target,
  Users,
  Code,
  Play,
  CheckCircle,
  Info,
  ArrowUp,
  RotateCcw,
  BookOpen,
  ExternalLink,
  Award,
  Lightbulb,
  AlertCircle,
  CheckSquare,
  Pause,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Filter,
  Trophy,
  Star,
  CheckCircle2,
  Shield as ShieldIcon,
  Search as SearchIcon,
  Bug as BugIcon
} from 'lucide-react';


interface MethodologyNode {
  id: string;
  label: string;
  icon: React.ElementType;
  category: 'reconnaissance' | 'scanning' | 'enumeration' | 'exploitation' | 'post-exploitation' | 'reporting';
  description: string;
  tools: string[];
  techniques: string[];
  timeframe: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  phase: number;
  objectives: string[];
  deliverables: string[];
  nextPhases: string[];
  learningResources: {
    tutorials: { title: string; url: string; type: 'video' | 'article' | 'course' | 'documentation' }[];
    books: { title: string; author: string; url?: string }[];
    certifications: { name: string; provider: string; url: string }[];
    practiceLinks: { title: string; url: string; description: string }[];
  };
  keyLearningPoints: string[];
  commonMistakes: string[];
  bestPractices: string[];
}

// Helper function to provide default learning resources for nodes that don't have them yet
const getDefaultLearningResources = (phase: string) => ({
  tutorials: [
    { title: `${phase} Fundamentals`, url: 'https://owasp.org/', type: 'documentation' as const },
    { title: `${phase} Best Practices`, url: 'https://www.sans.org/', type: 'article' as const }
  ],
  books: [
    { title: 'Penetration Testing: A Hands-On Introduction to Hacking', author: 'Georgia Weidman' }
  ],
  certifications: [
    { name: 'OSCP - Offensive Security Certified Professional', provider: 'Offensive Security', url: 'https://www.offensive-security.com/pwk-oscp/' }
  ],
  practiceLinks: [
    { title: 'HackTheBox', url: 'https://www.hackthebox.eu/', description: 'Practice penetration testing skills' },
    { title: 'TryHackMe', url: 'https://tryhackme.com/', description: 'Learn cybersecurity through hands-on exercises' }
  ]
});

const methodologyData: MethodologyNode[] = [
  // Phase 1 - Information Gathering
  {
    id: 'reconnaissance',
    label: 'Information Gathering',
    icon: Search,
    category: 'reconnaissance',
    description: 'Passive information gathering to understand the target organization, infrastructure, and potential attack vectors without direct interaction.',
    tools: ['Google Dorking', 'Shodan', 'Censys', 'TheHarvester', 'Maltego', 'Recon-ng', 'SpiderFoot', 'OSINT Framework'],
    techniques: ['OSINT', 'Social Media Analysis', 'DNS Reconnaissance', 'WHOIS Lookup', 'Certificate Transparency', 'Search Engine Dorking', 'Metadata Analysis'],
    timeframe: '1-3 days',
    difficulty: 'Beginner',
    phase: 1,
    objectives: ['Identify target infrastructure', 'Gather employee information', 'Map external attack surface', 'Identify technologies in use'],
    deliverables: ['Target profile report', 'Infrastructure mapping', 'Employee directory', 'Technology stack analysis'],
    nextPhases: ['subdomain-enum', 'social-engineering'],
    learningResources: {
      tutorials: [
        { title: 'OSINT Fundamentals', url: 'https://www.sans.org/white-papers/427/', type: 'article' },
        { title: 'Google Dorking for Penetration Testing', url: 'https://www.exploit-db.com/google-hacking-database', type: 'documentation' },
        { title: 'Shodan Complete Guide', url: 'https://help.shodan.io/', type: 'documentation' },
        { title: 'OSINT with Maltego', url: 'https://www.maltego.com/transform-hub/', type: 'course' }
      ],
      books: [
        { title: 'Open Source Intelligence Techniques', author: 'Michael Bazzell', url: 'https://inteltechniques.com/book1.html' },
        { title: 'The Art of Intelligence', author: 'Henry A. Crumpton' },
        { title: 'OSINT Handbook', author: 'i-intelligence' }
      ],
      certifications: [
        { name: 'SANS FOR578: Cyber Threat Intelligence', provider: 'SANS', url: 'https://www.sans.org/cyber-security-courses/cyber-threat-intelligence/' },
        { name: 'Certified Threat Intelligence Analyst (CTIA)', provider: 'EC-Council', url: 'https://www.eccouncil.org/programs/certified-threat-intelligence-analyst-ctia/' }
      ],
      practiceLinks: [
        { title: 'TryHackMe OSINT Room', url: 'https://tryhackme.com/room/ohsint', description: 'Hands-on OSINT challenges and exercises' },
        { title: 'OSINT Curious', url: 'https://osintcurio.us/', description: 'Community-driven OSINT learning resources' },
        { title: 'Bellingcat Online Investigation Toolkit', url: 'https://docs.google.com/spreadsheets/d/18rtqh8EG2q1xBo2cLNyhIDuK9jrPGwYr9DI2UncoqJQ/', description: 'Comprehensive OSINT tools database' }
      ]
    },
    keyLearningPoints: [
      'Understanding the difference between active and passive reconnaissance',
      'Legal and ethical considerations in information gathering',
      'Effective use of search engines and specialized databases',
      'Social media intelligence gathering techniques',
      'DNS and network infrastructure analysis'
    ],
    commonMistakes: [
      'Leaving digital footprints during reconnaissance',
      'Relying on outdated or inaccurate information',
      'Not documenting sources and timestamps',
      'Overlooking social engineering opportunities',
      'Insufficient verification of gathered intelligence'
    ],
    bestPractices: [
      'Always use VPNs and anonymization tools',
      'Document all findings with timestamps and sources',
      'Cross-reference information from multiple sources',
      'Respect privacy laws and ethical boundaries',
      'Create detailed target profiles for team reference'
    ]
  },
  
  // Phase 2 - Scanning & Enumeration
  {
    id: 'subdomain-enum',
    label: 'Subdomain Discovery',
    icon: Globe,
    category: 'reconnaissance',
    description: 'Systematic discovery of subdomains to expand the attack surface and identify additional entry points.',
    tools: ['Amass', 'Subfinder', 'Assetfinder', 'Findomain', 'Sublist3r', 'Knockpy', 'Aquatone', 'Massdns'],
    techniques: ['DNS Brute Force', 'Certificate Transparency Logs', 'Search Engine Enumeration', 'Reverse DNS', 'Zone Transfer', 'Wildcard Testing'],
    timeframe: '4-8 hours',
    difficulty: 'Beginner',
    phase: 2,
    objectives: ['Discover all subdomains', 'Identify live hosts', 'Map subdomain hierarchy', 'Find forgotten/legacy systems'],
    deliverables: ['Comprehensive subdomain list', 'Live host inventory', 'Service mapping', 'Potential targets prioritization'],
    nextPhases: ['port-scanning', 'web-enumeration'],
    learningResources: {
      tutorials: [
        { title: 'DNS Enumeration Techniques', url: 'https://book.hacktricks.xyz/generic-methodologies-and-resources/external-recon-methodology', type: 'documentation' },
        { title: 'Subdomain Enumeration Guide', url: 'https://github.com/OWASP/Amass/blob/master/doc/user_guide.md', type: 'documentation' },
        { title: 'Certificate Transparency for Recon', url: 'https://crt.sh/', type: 'article' }
      ],
      books: [
        { title: 'DNS and BIND', author: 'Cricket Liu & Paul Albitz' },
        { title: 'Network Security Assessment', author: 'Chris McNab' }
      ],
      certifications: [
        { name: 'OSCP - Offensive Security Certified Professional', provider: 'Offensive Security', url: 'https://www.offensive-security.com/pwk-oscp/' }
      ],
      practiceLinks: [
        { title: 'HackTheBox Academy - Information Gathering', url: 'https://academy.hackthebox.com/', description: 'Structured learning path for reconnaissance' },
        { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', description: 'Free web security training' }
      ]
    },
    keyLearningPoints: [
      'Understanding DNS hierarchy and record types',
      'Certificate transparency log analysis',
      'Automated vs manual enumeration techniques',
      'Rate limiting and detection avoidance',
      'Subdomain takeover identification'
    ],
    commonMistakes: [
      'Making too many DNS requests too quickly',
      'Not checking for subdomain takeovers',
      'Ignoring wildcard DNS configurations',
      'Missing certificate transparency sources',
      'Not validating discovered subdomains'
    ],
    bestPractices: [
      'Use multiple enumeration techniques',
      'Implement rate limiting in tools',
      'Check for subdomain takeover vulnerabilities',
      'Document all discovered assets',
      'Verify subdomain ownership and scope'
    ]
  },

  {
    id: 'port-scanning',
    label: 'Port Scanning',
    icon: Terminal,
    category: 'scanning',
    description: 'Comprehensive analysis of open ports and services to identify potential attack vectors.',
    tools: ['Nmap', 'Masscan', 'Unicornscan', 'Zmap', 'Rustscan', 'Naabu', 'Sx', 'Portspoof'],
    techniques: ['TCP Connect Scan', 'SYN Stealth Scan', 'UDP Scan', 'FIN Scan', 'Xmas Scan', 'Null Scan', 'ACK Scan', 'Window Scan'],
    timeframe: '1-4 hours',
    difficulty: 'Intermediate',
    phase: 2,
    objectives: ['Identify all open ports', 'Determine service versions', 'Detect filtered ports', 'Map service dependencies'],
    deliverables: ['Detailed port scan report', 'Service version matrix', 'Attack surface analysis', 'Risk prioritization'],
    nextPhases: ['service-enumeration', 'vulnerability-assessment'],
    learningResources: {
      tutorials: [
        { title: 'Nmap Network Scanning', url: 'https://nmap.org/book/', type: 'documentation' },
        { title: 'Port Scanning Techniques', url: 'https://nmap.org/book/man-port-scanning-techniques.html', type: 'documentation' }
      ],
      books: [
        { title: 'Nmap Network Scanning', author: 'Gordon Lyon' }
      ],
      certifications: [
        { name: 'CEH - Certified Ethical Hacker', provider: 'EC-Council', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' }
      ],
      practiceLinks: [
        { title: 'Nmap Scripting Engine', url: 'https://nmap.org/nsedoc/', description: 'Learn advanced Nmap scripting' }
      ]
    },
    keyLearningPoints: ['TCP/UDP protocols', 'Stealth scanning techniques', 'Service detection methods'],
    commonMistakes: ['Scanning too aggressively', 'Not using stealth techniques'],
    bestPractices: ['Use appropriate scan timing', 'Combine multiple scan types']
  },

  {
    id: 'web-enumeration',
    label: 'Web Application Analysis',
    icon: Eye,
    category: 'enumeration',
    description: 'Comprehensive analysis of web applications including technology stack, directories, and potential vulnerabilities.',
    tools: ['Burp Suite', 'OWASP ZAP', 'Nikto', 'Dirb', 'Gobuster', 'Ffuf', 'Wfuzz', 'Whatweb', 'Wappalyzer', 'Eyewitness'],
    techniques: ['Directory Brute Force', 'Technology Fingerprinting', 'Parameter Discovery', 'Content Discovery', 'API Enumeration', 'Virtual Host Discovery'],
    timeframe: '4-12 hours',
    difficulty: 'Intermediate',
    phase: 2,
    objectives: ['Map application structure', 'Identify technologies', 'Discover hidden content', 'Analyze attack surface'],
    deliverables: ['Web application inventory', 'Technology stack report', 'Directory structure map', 'Potential entry points'],
    nextPhases: ['web-vulnerability-testing'],
    learningResources: {
      tutorials: [
        { title: 'Web Application Enumeration', url: 'https://owasp.org/www-project-web-security-testing-guide/', type: 'documentation' },
        { title: 'Burp Suite Tutorial', url: 'https://portswigger.net/burp/documentation', type: 'documentation' }
      ],
      books: [
        { title: 'The Web Application Hacker\'s Handbook', author: 'Dafydd Stuttard & Marcus Pinto' }
      ],
      certifications: [
        { name: 'GWEB - GIAC Web Application Penetration Tester', provider: 'SANS', url: 'https://www.giac.org/certification/web-application-penetration-tester-gweb' }
      ],
      practiceLinks: [
        { title: 'DVWA - Damn Vulnerable Web Application', url: 'https://dvwa.co.uk/', description: 'Practice web application testing' }
      ]
    },
    keyLearningPoints: ['Web technologies identification', 'Directory enumeration', 'Parameter discovery'],
    commonMistakes: ['Missing hidden directories', 'Not testing all parameters'],
    bestPractices: ['Use multiple wordlists', 'Test different HTTP methods']
  },

  {
    id: 'social-engineering',
    label: 'Social Engineering',
    icon: Users,
    category: 'reconnaissance',
    description: 'Human-based intelligence gathering and psychological manipulation techniques to extract information or gain access.',
    tools: ['SET', 'Gophish', 'King Phisher', 'BeEF', 'Evilginx2', 'Modlishka', 'PhishingFrenzy', 'Lucy'],
    techniques: ['Phishing', 'Pretexting', 'Baiting', 'Tailgating', 'Vishing', 'Smishing', 'Watering Hole', 'USB Drops'],
    timeframe: '1-2 weeks',
    difficulty: 'Advanced',
    phase: 2,
    objectives: ['Gather employee credentials', 'Test security awareness', 'Gain initial foothold', 'Bypass technical controls'],
    deliverables: ['Phishing campaign results', 'Credential database', 'Security awareness assessment', 'Social engineering report'],
    nextPhases: ['credential-attacks', 'initial-access'],
    learningResources: {
      tutorials: [
        { title: 'Social Engineering Toolkit', url: 'https://github.com/trustedsec/social-engineer-toolkit', type: 'documentation' },
        { title: 'Phishing Campaign Guide', url: 'https://www.sans.org/white-papers/36972/', type: 'article' }
      ],
      books: [
        { title: 'Social Engineering: The Art of Human Hacking', author: 'Christopher Hadnagy' }
      ],
      certifications: [
        { name: 'GCTI - GIAC Cyber Threat Intelligence', provider: 'SANS', url: 'https://www.giac.org/certification/cyber-threat-intelligence-gcti' }
      ],
      practiceLinks: [
        { title: 'Gophish Phishing Framework', url: 'https://getgophish.com/', description: 'Open-source phishing toolkit' }
      ]
    },
    keyLearningPoints: ['Psychology of social engineering', 'Phishing techniques', 'Legal considerations'],
    commonMistakes: ['Crossing legal boundaries', 'Poor pretext development'],
    bestPractices: ['Get proper authorization', 'Document all activities']
  },

  // Phase 3 - Service Analysis
  {
    id: 'service-enumeration',
    label: 'Service Enumeration',
    icon: Server,
    category: 'enumeration',
    description: 'Deep analysis of specific services to gather detailed information and identify misconfigurations.',
    tools: ['Enum4linux', 'SMBClient', 'SNMPWalk', 'Telnet', 'FTP', 'SSH', 'SMTP-user-enum', 'DNS-enum', 'LDAP-enum'],
    techniques: ['Banner Grabbing', 'Service Fingerprinting', 'Protocol Analysis', 'Configuration Review', 'Default Credential Testing'],
    timeframe: '2-8 hours',
    difficulty: 'Advanced',
    phase: 3,
    objectives: ['Extract service information', 'Identify misconfigurations', 'Test default credentials', 'Map service relationships'],
    deliverables: ['Service configuration analysis', 'Misconfiguration report', 'Credential testing results', 'Service dependency map'],
    nextPhases: ['vulnerability-assessment', 'credential-attacks'],
    learningResources: getDefaultLearningResources('Service Enumeration'),
    keyLearningPoints: ['Service fingerprinting', 'Banner analysis', 'Configuration review'],
    commonMistakes: ['Missing services', 'Incomplete enumeration'],
    bestPractices: ['Use multiple tools', 'Document findings']
  },

  {
    id: 'vulnerability-assessment',
    label: 'Vulnerability Assessment',
    icon: Shield,
    category: 'scanning',
    description: 'Systematic identification and analysis of security vulnerabilities using automated tools and manual techniques.',
    tools: ['Nessus', 'OpenVAS', 'Nuclei', 'Nikto', 'Nmap Scripts', 'Metasploit', 'Searchsploit', 'CVE Database'],
    techniques: ['Automated Scanning', 'Manual Testing', 'CVE Analysis', 'Configuration Review', 'Patch Level Assessment', 'Compliance Checking'],
    timeframe: '1-3 days',
    difficulty: 'Intermediate',
    phase: 3,
    objectives: ['Identify all vulnerabilities', 'Assess risk levels', 'Prioritize findings', 'Validate exploitability'],
    deliverables: ['Vulnerability scan report', 'Risk assessment matrix', 'Exploitation roadmap', 'Remediation recommendations'],
    nextPhases: ['exploitation', 'web-vulnerability-testing'],
    learningResources: getDefaultLearningResources('Vulnerability Assessment'),
    keyLearningPoints: ['Vulnerability classification', 'Risk assessment', 'Patch management'],
    commonMistakes: ['False positives', 'Missing context'],
    bestPractices: ['Validate findings', 'Prioritize by risk']
  },

  // Phase 4 - Exploitation
  {
    id: 'web-vulnerability-testing',
    label: 'Web Vulnerability Testing',
    icon: Bug,
    category: 'exploitation',
    description: 'Comprehensive testing of web applications for common and advanced security vulnerabilities.',
    tools: ['Burp Suite', 'OWASP ZAP', 'SQLMap', 'XSStrike', 'Commix', 'NoSQLMap', 'Wpscan', 'Joomscan', 'Droopescan'],
    techniques: ['SQL Injection', 'XSS', 'CSRF', 'XXE', 'SSRF', 'Authentication Bypass', 'Authorization Flaws', 'Business Logic Flaws'],
    timeframe: '2-5 days',
    difficulty: 'Advanced',
    phase: 4,
    objectives: ['Test for OWASP Top 10', 'Identify business logic flaws', 'Test authentication mechanisms', 'Validate input sanitization'],
    deliverables: ['Web vulnerability report', 'Proof of concept exploits', 'Risk assessment', 'Remediation guidance'],
    nextPhases: ['exploitation', 'data-extraction'],
    learningResources: getDefaultLearningResources('Web Vulnerability Testing'),
    keyLearningPoints: ['OWASP Top 10', 'Manual testing techniques', 'Automated scanning'],
    commonMistakes: ['Relying only on automated tools', 'Missing business logic flaws'],
    bestPractices: ['Combine manual and automated testing', 'Test all input vectors']
  },

  {
    id: 'credential-attacks',
    label: 'Credential Attacks',
    icon: Lock,
    category: 'exploitation',
    description: 'Various techniques to obtain, crack, or bypass authentication mechanisms.',
    tools: ['Hashcat', 'John the Ripper', 'Hydra', 'Medusa', 'CrackMapExec', 'Responder', 'Mimikatz', 'BloodHound'],
    techniques: ['Password Spraying', 'Brute Force', 'Dictionary Attacks', 'Hash Cracking', 'Pass-the-Hash', 'Kerberoasting', 'ASREPRoasting'],
    timeframe: '1-7 days',
    difficulty: 'Advanced',
    phase: 4,
    objectives: ['Obtain valid credentials', 'Test password policies', 'Identify weak passwords', 'Bypass authentication'],
    deliverables: ['Credential database', 'Password policy analysis', 'Authentication bypass methods', 'Account compromise evidence'],
    nextPhases: ['initial-access', 'lateral-movement'],
    learningResources: getDefaultLearningResources('Credential Attacks'),
    keyLearningPoints: ['Password attacks', 'Hash cracking', 'Authentication bypass'],
    commonMistakes: ['Account lockouts', 'Detection by security tools'],
    bestPractices: ['Use targeted attacks', 'Monitor for detection']
  },

  {
    id: 'exploitation',
    label: 'System Exploitation',
    icon: Zap,
    category: 'exploitation',
    description: 'Active exploitation of identified vulnerabilities to gain unauthorized access to systems.',
    tools: ['Metasploit', 'Exploit-DB', 'Custom Exploits', 'PowerShell Empire', 'Cobalt Strike', 'Armitage', 'Canvas', 'Core Impact'],
    techniques: ['Buffer Overflow', 'Code Injection', 'Privilege Escalation', 'Remote Code Execution', 'Memory Corruption', 'Logic Bombs'],
    timeframe: '2-7 days',
    difficulty: 'Expert',
    phase: 4,
    objectives: ['Gain initial system access', 'Exploit identified vulnerabilities', 'Establish persistent access', 'Validate security controls'],
    deliverables: ['Exploitation report', 'Proof of concept code', 'System access evidence', 'Impact assessment'],
    nextPhases: ['initial-access', 'privilege-escalation'],
    learningResources: getDefaultLearningResources('Exploitation'),
    keyLearningPoints: ['Exploit development', 'Payload creation', 'Post-exploitation'],
    commonMistakes: ['Causing system instability', 'Poor documentation'],
    bestPractices: ['Test exploits safely', 'Document all activities']
  },

  // Phase 5 - Post-Exploitation
  {
    id: 'initial-access',
    label: 'Initial Access',
    icon: Target,
    category: 'post-exploitation',
    description: 'Establishing and maintaining initial foothold in the target environment.',
    tools: ['Meterpreter', 'Empire', 'Covenant', 'PoshC2', 'Sliver', 'Mythic', 'Koadic', 'Pupy'],
    techniques: ['Payload Delivery', 'Persistence Mechanisms', 'Command & Control', 'Anti-Forensics', 'Steganography', 'Living off the Land'],
    timeframe: '1-3 days',
    difficulty: 'Expert',
    phase: 5,
    objectives: ['Establish persistent access', 'Maintain stealth', 'Setup C2 channels', 'Avoid detection'],
    deliverables: ['Access documentation', 'Persistence mechanisms', 'C2 infrastructure', 'Stealth assessment'],
    nextPhases: ['lateral-movement', 'privilege-escalation'],
    learningResources: getDefaultLearningResources('Initial Access'),
    keyLearningPoints: ['C2 frameworks', 'Persistence techniques', 'Stealth operations'],
    commonMistakes: ['Noisy operations', 'Poor OPSEC'],
    bestPractices: ['Maintain stealth', 'Use encrypted communications']
  },

  {
    id: 'lateral-movement',
    label: 'Lateral Movement',
    icon: Network,
    category: 'post-exploitation',
    description: 'Moving through the network to access additional systems and expand control.',
    tools: ['BloodHound', 'PowerView', 'CrackMapExec', 'Impacket', 'WMIExec', 'PSExec', 'WinRM', 'SSH Tunneling'],
    techniques: ['Network Pivoting', 'Credential Reuse', 'Service Exploitation', 'Trust Relationships', 'Protocol Abuse', 'Token Impersonation'],
    timeframe: '2-5 days',
    difficulty: 'Expert',
    phase: 5,
    objectives: ['Map internal network', 'Identify high-value targets', 'Escalate privileges', 'Access critical systems'],
    deliverables: ['Network topology map', 'Compromised systems list', 'Privilege escalation paths', 'Critical asset access'],
    nextPhases: ['privilege-escalation', 'data-extraction'],
    learningResources: getDefaultLearningResources('Lateral Movement'),
    keyLearningPoints: ['Network pivoting', 'Credential reuse', 'Trust relationships'],
    commonMistakes: ['Triggering security alerts', 'Poor network mapping'],
    bestPractices: ['Map network carefully', 'Use legitimate tools when possible']
  },

  {
    id: 'privilege-escalation',
    label: 'Privilege Escalation',
    icon: ArrowDown,
    category: 'post-exploitation',
    description: 'Gaining higher-level permissions and administrative access to systems.',
    tools: ['LinPEAS', 'WinPEAS', 'PrivescCheck', 'PowerUp', 'BeRoot', 'GTFOBins', 'LOLBAS', 'Exploit Suggester'],
    techniques: ['Kernel Exploits', 'Service Misconfigurations', 'SUID/SGID Abuse', 'Sudo Misconfigurations', 'Registry Manipulation', 'DLL Hijacking'],
    timeframe: '1-3 days',
    difficulty: 'Expert',
    phase: 5,
    objectives: ['Gain administrative access', 'Bypass security controls', 'Access sensitive data', 'Control critical systems'],
    deliverables: ['Privilege escalation report', 'Administrative access proof', 'Security control bypass', 'System control evidence'],
    nextPhases: ['data-extraction', 'persistence'],
    learningResources: getDefaultLearningResources('Privilege Escalation'),
    keyLearningPoints: ['Kernel exploits', 'Service misconfigurations', 'SUID/SGID abuse'],
    commonMistakes: ['System crashes', 'Detection by EDR'],
    bestPractices: ['Test exploits carefully', 'Use living-off-the-land techniques']
  },

  // Phase 6 - Data & Persistence
  {
    id: 'data-extraction',
    label: 'Data Extraction',
    icon: Database,
    category: 'post-exploitation',
    description: 'Identifying, accessing, and exfiltrating sensitive data from compromised systems.',
    tools: ['PowerShell', 'Python Scripts', 'Custom Tools', 'FTP/SFTP', 'DNS Tunneling', 'Steganography Tools', 'Cloud Storage'],
    techniques: ['Data Discovery', 'Database Dumping', 'File System Analysis', 'Memory Extraction', 'Network Exfiltration', 'Covert Channels'],
    timeframe: '2-7 days',
    difficulty: 'Expert',
    phase: 6,
    objectives: ['Identify sensitive data', 'Extract critical information', 'Demonstrate data access', 'Test DLP controls'],
    deliverables: ['Data inventory', 'Extraction evidence', 'Sensitive data samples', 'DLP bypass methods'],
    nextPhases: ['persistence', 'reporting'],
    learningResources: getDefaultLearningResources('Data Extraction'),
    keyLearningPoints: ['Data discovery', 'Exfiltration techniques', 'DLP bypass'],
    commonMistakes: ['Large data transfers', 'Unencrypted exfiltration'],
    bestPractices: ['Use covert channels', 'Encrypt sensitive data']
  },

  {
    id: 'persistence',
    label: 'Persistence',
    icon: Clock,
    category: 'post-exploitation',
    description: 'Maintaining long-term access to compromised systems and networks.',
    tools: ['Scheduled Tasks', 'Registry Keys', 'Services', 'WMI Events', 'Startup Folders', 'Golden Tickets', 'Backdoors'],
    techniques: ['Registry Persistence', 'Service Installation', 'Scheduled Tasks', 'Boot Persistence', 'Account Creation', 'Backdoor Installation'],
    timeframe: '1-2 days',
    difficulty: 'Expert',
    phase: 6,
    objectives: ['Maintain system access', 'Survive reboots', 'Avoid detection', 'Enable future access'],
    deliverables: ['Persistence mechanisms', 'Access maintenance guide', 'Detection evasion methods', 'Long-term access proof'],
    nextPhases: ['reporting'],
    learningResources: getDefaultLearningResources('Persistence'),
    keyLearningPoints: ['Persistence mechanisms', 'Stealth techniques', 'Detection evasion'],
    commonMistakes: ['Obvious persistence methods', 'Poor cleanup'],
    bestPractices: ['Use subtle persistence', 'Plan for cleanup']
  },

  // Phase 7 - Documentation
  {
    id: 'reporting',
    label: 'Reporting & Documentation',
    icon: FileText,
    category: 'reporting',
    description: 'Comprehensive documentation of findings, methodologies, and recommendations.',
    tools: ['Report Templates', 'Screenshot Tools', 'Video Recording', 'Markdown', 'LaTeX', 'Dradis', 'PlexTrac', 'GhostWriter'],
    techniques: ['Executive Summary', 'Technical Details', 'Risk Assessment', 'Remediation Guidance', 'Evidence Documentation', 'Timeline Creation'],
    timeframe: '3-7 days',
    difficulty: 'Intermediate',
    phase: 7,
    objectives: ['Document all findings', 'Provide remediation guidance', 'Create executive summary', 'Deliver actionable recommendations'],
    deliverables: ['Executive report', 'Technical report', 'Remediation roadmap', 'Evidence package'],
    nextPhases: [],
    learningResources: getDefaultLearningResources('Reporting'),
    keyLearningPoints: ['Technical writing', 'Risk communication', 'Executive summaries'],
    commonMistakes: ['Poor risk ratings', 'Unclear recommendations'],
    bestPractices: ['Use clear language', 'Provide actionable recommendations']
  }
];

const InteractiveMethodology: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<MethodologyNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      case 'Expert': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getPhaseColor = (phase: number) => {
    const colors = [
      '#3B82F6', // Blue
      '#1E40AF', // Dark Blue
      '#1D4ED8', // Medium Blue
      '#2563EB', // Blue Variant
      '#1E3A8A', // Navy Blue
      '#1F2937', // Dark Gray
      '#374151'  // Gray
    ];
    return colors[phase - 1] || '#6B7280';
  };

  const togglePhaseCompletion = (nodeId: string) => {
    const newCompleted = new Set(completedPhases);
    if (newCompleted.has(nodeId)) {
      newCompleted.delete(nodeId);
    } else {
      newCompleted.add(nodeId);
    }
    setCompletedPhases(newCompleted);
  };

  const groupedPhases = methodologyData.reduce((acc, node) => {
    if (!acc[node.phase]) {
      acc[node.phase] = [];
    }
    acc[node.phase].push(node);
    return acc;
  }, {} as Record<number, MethodologyNode[]>);

  return (
    <div className="min-h-screen bg-black text-white relative pb-32">
      {/* Clean Dark Background with Subtle Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>



      {/* Header */}
      <div className="relative z-10 text-center pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <LiquidGlass
              as="div"
              variant="card"
              intensity="medium"
              rounded="full"
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 transition-all duration-300"
            >
              <Shield className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-gray-300 font-medium text-sm">Professional Security Assessment</span>
            </LiquidGlass>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Penetration Testing
            <span className="block text-xl md:text-2xl text-gray-400 font-normal mt-1">
              Methodology Flowchart
            </span>
          </h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto px-6 leading-relaxed">
            A comprehensive, industry-standard approach to security assessment and penetration testing.
            <span className="block text-sm text-gray-400 mt-1">
              Follow the structured phases to ensure thorough and professional security evaluations.
            </span>
          </p>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="relative max-w-3xl mx-auto px-4 mb-8">
        <LiquidGlass
          as={motion.div}
          variant="card"
          intensity="high"
          rounded="xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-4 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              Assessment Progress
            </h3>
            <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
              {completedPhases.size} of {methodologyData.length} phases completed
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${(completedPhases.size / methodologyData.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
                }}
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Start</span>
            <span className="font-medium">{Math.round((completedPhases.size / methodologyData.length) * 100)}% Complete</span>
            <span>Finish</span>
          </div>
        </LiquidGlass>
      </div>

      {/* Flowchart */}
      <div className="relative max-w-6xl mx-auto px-4 pb-16">
        {Object.entries(groupedPhases).map(([phaseNum, nodes], phaseIndex) => (
          <motion.div
            key={phaseNum}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: phaseIndex * 0.2 }}
            className="mb-10"
          >
            {/* Phase Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: phaseIndex * 0.1 }}
                className="relative"
              >
                <LiquidGlass
                  as="div"
                  variant="card"
                  intensity="high"
                  rounded="xl"
                  className="inline-flex items-center gap-3 px-6 py-3 transition-all duration-300"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{ 
                      backgroundColor: getPhaseColor(parseInt(phaseNum)),
                      boxShadow: `0 4px 15px ${getPhaseColor(parseInt(phaseNum))}40`
                    }}
                  >
                    {phaseNum}
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white mb-0.5">
                      Phase {phaseNum}
                    </div>
                    <div className="text-sm text-gray-300">
                      {
                        phaseNum === '1' ? 'Information Gathering' :
                        phaseNum === '2' ? 'Scanning & Enumeration' :
                        phaseNum === '3' ? 'Service Analysis' :
                        phaseNum === '4' ? 'Exploitation' :
                        phaseNum === '5' ? 'Post-Exploitation' :
                        phaseNum === '6' ? 'Data & Persistence' :
                        'Documentation'
                      }
                    </div>
                  </div>
                </LiquidGlass>
              </motion.div>
            </div>

            {/* Phase Nodes */}
            <div className={`
              grid gap-6 mb-8 justify-items-center
              ${nodes.length === 1 
                ? 'grid-cols-1 max-w-sm mx-auto' 
                : nodes.length === 2 
                ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' 
                : nodes.length === 4
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }
            `}>
              {nodes.map((node, nodeIndex) => {
                const IconComponent = node.icon;
                const isCompleted = completedPhases.has(node.id);
                const isHovered = hoveredNode === node.id;

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: nodeIndex * 0.1 }}
                    className="relative max-w-xs"
                  >
                    <LiquidGlass
                      as="div"
                      variant="card"
                      intensity="high"
                      rounded="xl"
                      className={`
                        relative p-4 cursor-pointer transition-all duration-300 group hover:scale-[1.02]
                        ${isCompleted 
                          ? 'ring-2 ring-green-500/50' 
                          : isHovered
                          ? 'ring-2 ring-blue-500/50'
                          : ''
                        }
                      `}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(node)}
                    >
                      {/* Completion Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePhaseCompletion(node.id);
                        }}
                        className={`
                          absolute top-2 right-2 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200
                          ${isCompleted 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-500'
                          }
                        `}
                      >
                        {isCompleted && <CheckCircle size={12} />}
                      </button>

                      {/* Phase Badge */}
                      <div 
                        className="absolute top-2 left-2 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-lg"
                        style={{ 
                          backgroundColor: getPhaseColor(node.phase),
                          boxShadow: `0 2px 8px ${getPhaseColor(node.phase)}60`
                        }}
                      >
                        {node.phase}
                      </div>

                      {/* Content */}
                      <div className="mt-6">
                        {/* Icon */}
                        <div className={`
                          inline-flex p-2 rounded-lg mb-3 transition-all duration-200
                          ${isCompleted 
                            ? 'bg-green-900/50' 
                            : isHovered 
                            ? 'bg-blue-900/50' 
                            : 'bg-gray-800/50'
                          }
                        `}>
                          <IconComponent 
                            size={20} 
                            className={`
                              transition-all duration-200
                              ${isCompleted 
                                ? 'text-green-400' 
                                : isHovered 
                                ? 'text-blue-400' 
                                : 'text-gray-400'
                              }
                            `} 
                          />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                          {node.label}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                          {node.description}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span 
                            className={`
                              text-xs px-2 py-1 rounded-full border
                              ${getDifficultyColor(node.difficulty)} text-white
                            `}
                          >
                            {node.difficulty}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 border border-gray-600">
                            <Clock size={10} className="inline mr-1" />
                            {node.timeframe}
                          </span>
                        </div>

                        {/* Tools Preview */}
                        <div className="text-xs text-gray-400">
                          <span className="font-medium text-gray-300">Tools: </span>
                          {node.tools.slice(0, 3).join(', ')}
                          {node.tools.length > 3 && (
                            <span className="text-blue-400"> +{node.tools.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </LiquidGlass>
                  </motion.div>
                );
              })}
            </div>

            {/* Phase Connector Arrow */}
            {phaseIndex < Object.keys(groupedPhases).length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: phaseIndex * 0.2 + 0.5 }}
                className="flex justify-center mb-4"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-b from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  <ArrowDown size={16} className="text-blue-400" />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating Action Menu */}
      <div className="fixed bottom-8 right-8 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col gap-2"
        >
          {/* Reset Progress */}
          <LiquidGlass
            as="button"
            variant="card"
            intensity="medium"
            rounded="lg"
            onClick={() => setCompletedPhases(new Set())}
            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
            title="Reset Progress"
          >
            <RotateCcw size={16} />
          </LiquidGlass>
          
          {/* Mark All Complete */}
          <button
            onClick={() => setCompletedPhases(new Set(methodologyData.map(node => node.id)))}
            className="w-10 h-10 bg-blue-500 border border-blue-500 rounded-lg shadow-sm flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-200"
            title="Mark All Complete"
          >
            <CheckCircle size={16} />
          </button>
          
          {/* Scroll to Top */}
          <LiquidGlass
            as="button"
            variant="card"
            intensity="medium"
            rounded="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
            title="Scroll to Top"
          >
            <ArrowUp size={16} />
          </LiquidGlass>
        </motion.div>
      </div>

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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`
                    p-4 rounded-xl
                    ${completedPhases.has(selectedNode.id) 
                      ? 'bg-green-500/20' 
                      : 'bg-gray-700/50'
                    }
                  `}>
                    <selectedNode.icon 
                      size={32} 
                      className={`
                        ${completedPhases.has(selectedNode.id) 
                          ? 'text-green-400' 
                          : 'text-gray-300'
                        }
                      `} 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-white">{selectedNode.label}</h2>
                      <div 
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: getPhaseColor(selectedNode.phase) }}
                      >
                        Phase {selectedNode.phase}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getDifficultyColor(selectedNode.difficulty) }}
                        />
                        <span className="text-gray-300">{selectedNode.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock size={16} />
                        {selectedNode.timeframe}
                      </div>
                      <button
                        onClick={() => togglePhaseCompletion(selectedNode.id)}
                        className={`
                          flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-300
                          ${completedPhases.has(selectedNode.id)
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-gray-700/50 text-gray-400 border border-gray-600/30 hover:border-green-500/30 hover:text-green-400'
                          }
                        `}
                      >
                        <CheckCircle size={14} />
                        {completedPhases.has(selectedNode.id) ? 'Completed' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Info size={20} />
                      Description
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{selectedNode.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Target size={20} />
                      Objectives
                    </h3>
                    <ul className="space-y-2">
                      {selectedNode.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <FileText size={20} />
                      Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {selectedNode.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learning Points */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Lightbulb size={20} />
                      Key Learning Points
                    </h3>
                    <ul className="space-y-2">
                      {selectedNode.keyLearningPoints?.map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Mistakes */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <AlertCircle size={20} />
                      Common Mistakes
                    </h3>
                    <ul className="space-y-2">
                      {selectedNode.commonMistakes?.map((mistake, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best Practices */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckSquare size={20} />
                      Best Practices
                    </h3>
                    <ul className="space-y-2">
                      {selectedNode.bestPractices?.map((practice, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                          <span>{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Terminal size={20} />
                      Tools & Technologies
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedNode.tools.map((tool, index) => (
                        <div 
                          key={index} 
                          className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-colors"
                        >
                          <span className="text-gray-300">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Code size={20} />
                      Techniques
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedNode.techniques.map((technique, index) => (
                        <span 
                          key={index}
                          className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm border border-gray-600/30 hover:border-gray-500/50 transition-colors"
                        >
                          {technique}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learning Resources */}
                  {selectedNode.learningResources && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <BookOpen size={20} />
                        Learning Resources
                      </h3>
                      
                      {/* Tutorials */}
                      {selectedNode.learningResources.tutorials.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-lg font-medium text-gray-300 mb-2">📚 Tutorials & Guides</h4>
                          <div className="space-y-2">
                            {selectedNode.learningResources.tutorials.map((tutorial, index) => (
                              <a
                                key={index}
                                href={tutorial.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-blue-500/50 transition-colors group"
                              >
                                <ExternalLink size={16} className="text-blue-400 group-hover:text-blue-300" />
                                <div>
                                  <div className="text-gray-300 group-hover:text-white">{tutorial.title}</div>
                                  <div className="text-xs text-gray-500 capitalize">{tutorial.type}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Books */}
                      {selectedNode.learningResources.books.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-lg font-medium text-gray-300 mb-2">📖 Recommended Books</h4>
                          <div className="space-y-2">
                            {selectedNode.learningResources.books.map((book, index) => (
                              <div key={index} className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                                <div className="text-gray-300">{book.title}</div>
                                <div className="text-sm text-gray-500">by {book.author}</div>
                                {book.url && (
                                  <a
                                    href={book.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-1"
                                  >
                                    <ExternalLink size={12} />
                                    View Book
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {selectedNode.learningResources.certifications.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-lg font-medium text-gray-300 mb-2">🏆 Relevant Certifications</h4>
                          <div className="space-y-2">
                            {selectedNode.learningResources.certifications.map((cert, index) => (
                              <a
                                key={index}
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-yellow-500/50 transition-colors group"
                              >
                                <Award size={16} className="text-yellow-400 group-hover:text-yellow-300" />
                                <div>
                                  <div className="text-gray-300 group-hover:text-white">{cert.name}</div>
                                  <div className="text-sm text-gray-500">{cert.provider}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Practice Links */}
                      {selectedNode.learningResources.practiceLinks.length > 0 && (
                        <div>
                          <h4 className="text-lg font-medium text-gray-300 mb-2">🎯 Practice & Labs</h4>
                          <div className="space-y-2">
                            {selectedNode.learningResources.practiceLinks.map((practice, index) => (
                              <a
                                key={index}
                                href={practice.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-green-500/50 transition-colors group"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <ExternalLink size={16} className="text-green-400 group-hover:text-green-300" />
                                  <div className="text-gray-300 group-hover:text-white">{practice.title}</div>
                                </div>
                                <div className="text-sm text-gray-500">{practice.description}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedNode.nextPhases.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <Play size={20} />
                        Next Phases
                      </h3>
                      <div className="space-y-2">
                        {selectedNode.nextPhases.map((nextPhaseId) => {
                          const nextNode = methodologyData.find(n => n.id === nextPhaseId);
                          if (!nextNode) return null;
                          
                          return (
                            <div 
                              key={nextPhaseId}
                              className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-700/30 transition-colors border border-gray-700/30 hover:border-gray-600/50"
                              onClick={() => setSelectedNode(nextNode)}
                            >
                              <nextNode.icon size={20} className="text-gray-400" />
                              <span className="text-gray-300 flex-1">{nextNode.label}</span>
                              <div 
                                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                style={{ backgroundColor: getPhaseColor(nextNode.phase) }}
                              >
                                {nextNode.phase}
                              </div>
                              <ChevronRight size={16} className="text-gray-500" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </LiquidGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMethodology; 