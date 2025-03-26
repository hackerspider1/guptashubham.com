"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaUserSecret, FaNetworkWired, FaLaptopCode, FaServer, FaBook, FaShieldAlt } from 'react-icons/fa';
import { SiTorproject, SiKalilinux, SiWireshark, SiMetasploit } from 'react-icons/si';

const HackingGuide = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100 p-6">
      <motion.div 
        className="macos-window w-full max-w-4xl p-6 rounded-xl shadow-2xl bg-opacity-90 backdrop-blur-xl border border-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* macOS Style Title Bar */}
        <div className="flex justify-between items-center mb-6 bg-[#1A1A1A] bg-opacity-70 p-2 rounded-t-xl shadow-inner border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="font-mono text-sm text-gray-300">beginner_hacking_guide.terminal</span>
          <div></div>
        </div>

        {/* Blog Content */}
        <motion.div 
          className=" bg-opacity-90 p-6 rounded-b-xl space-y-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Step 1: Learn the Basics */}
          <section className="p-4 bg-opacity-60 rounded-lg border border-gray-600 shadow-md">
            <h2 className="font-mono text-lg text-green-400 flex items-center"><FaBook className="mr-2" /> Step 1: Learn the Basics</h2>
            <p className="text-sm text-gray-300 mt-2">
              Before diving into hacking, it’s crucial to understand how computers and networks work. Study:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
              <li>Operating Systems (Windows, Linux, macOS)</li>
              <li>Networking Fundamentals (TCP/IP, DNS, HTTP, Firewalls)</li>
              <li>Basic Programming (Python, Bash Scripting, JavaScript)</li>
            </ul>
          </section>

          {/* Step 2: Learn Networking & Security */}
          <section className="p-4 rounded-lg border border-gray-600 shadow-md">
            <h2 className="font-mono text-lg text-blue-400 flex items-center"><FaNetworkWired className="mr-2" /> Step 2: Understand Networking & Security</h2>
            <p className="text-sm text-gray-300 mt-2">
              A hacker needs a strong foundation in networking. Learn about:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
              <li>OSI Model & Protocols</li>
              <li>Network Security Principles</li>
              <li>Packet Analysis using Wireshark</li>
            </ul>
          </section>

          {/* Step 3: Master Ethical Hacking Tools */}
          <section className="p-4 rounded-lg border border-gray-600 shadow-md">
            <h2 className="font-mono text-lg text-red-400 flex items-center"><FaLaptopCode className="mr-2" /> Step 3: Master Ethical Hacking Tools</h2>
            <p className="text-sm text-gray-300 mt-2">
              Ethical hackers use specialized tools for penetration testing and security analysis. Popular tools include:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
              <li><SiKalilinux className="inline-block text-yellow-400" /> Kali Linux</li>
              <li><SiWireshark className="inline-block text-blue-400" /> Wireshark</li>
              <li><SiMetasploit className="inline-block text-red-400" /> Metasploit Framework</li>
              <li><SiTorproject className="inline-block text-purple-400" /> TOR & Anonymity Tools</li>
            </ul>
          </section>

          {/* Step 4: Practice & Build Skills */}
          <section className="p-4 rounded-lg border border-gray-600 shadow-md">
            <h2 className="font-mono text-lg text-yellow-400 flex items-center"><FaServer className="mr-2" /> Step 4: Practice with CTF & Labs</h2>
            <p className="text-sm text-gray-300 mt-2">
              Practice your skills in safe environments using:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
              <li>Capture The Flag (CTF) Challenges</li>
              <li>Vulnerable Virtual Machines (TryHackMe, Hack The Box)</li>
              <li>Bug Bounty Programs (HackerOne, Bugcrowd)</li>
            </ul>
          </section>

          {/* Step 5: Stay Ethical & Legal */}
          <section className="p-4 rounded-lg border border-gray-600 shadow-md">
            <h2 className="font-mono text-lg text-green-400 flex items-center"><FaShieldAlt className="mr-2" /> Step 5: Stay Ethical & Legal</h2>
            <p className="text-sm text-gray-300 mt-2">
              Always follow ethical hacking principles. Never test systems without permission. Learn about:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
              <li>Cybersecurity Laws & Regulations</li>
              <li>Responsible Disclosure Policies</li>
              <li>Ethical Hacking Certifications (CEH, OSCP, CISSP)</li>
            </ul>
          </section>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HackingGuide;
