"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Download, 
  Shield, 
  Globe, 
  Target 
} from 'lucide-react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '' }:any) => (
  <div 
    className={`
      bg-black bg-opacity-10 backdrop-blur-lg 
      border border-border-800 border-opacity-20 
      rounded-2xl shadow-2xl 
      transition-all duration-300 
      hover:bg-opacity-15 hover:shadow-3xl 
      ${className}
    `}
  >
    {children}
  </div>
);

const About = () => {
  const expertiseAreas = [
    {
      icon: Shield,
      title: "Web Application Security",
      description: "Advanced vulnerability assessment and penetration testing"
    },
    {
      icon: Globe,
      title: "Global Security Consulting",
      description: "Spanning continents from India to Middle East"
    },
    {
      icon: Target,
      title: "Ethical Hacking",
      description: "Proactive identification and mitigation of security risks"
    }
  ];

  const certifications = [
    { name: "OSCP", color: "text-blue-400" },
    { name: "eWPTXv2", color: "text-green-400" },
    { name: "eCPPTv2", color: "text-purple-400" }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      <div className="relative z-10 max-w-6xl w-full px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Personal Introduction */}
          <div className="space-y-6">
            <GlassCard className="p-8">
              <div className="text-center md:text-left mb-6">
                <h1 className="text-5xl font-bold tracking-tight mb-2 text-white">
                  Hey there! 👋
                </h1>
                <p className="text-2xl text-gray-300">
                  Cybersecurity Expert & Digital Guardian
                </p>
              </div>

              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-gray-300">
                A passionate, enthusiastic and self-motivated cybersecurity professional having more than 12 years of experience as an IT security consultant and researcher. I work on multiple cybersecurity domains including Web-App Security, Network Security, Information Security, Ethical Hacking, Vulnerability Testing, Red Teaming etc.
                </p>
                <p className="text-gray-300">
                With rich experience of working for different public and private ventures pan India and globally (KSA, UAE, Qatar, Hong Kong), presently I’m working as Senior Solution Advisor in Big4. Academically I’m computer graduate (BCA) and have qualified numerous cybersecurity certifications.
                </p>
                <p className="text-gray-300">
                I have a strong passion for learning and sharing knowledge with others. I am an active member of various cybersecurity communities and regularly participate in conferences and workshops to stay updated with the latest trends and technologies in the field.
                </p>
              </div>
            </GlassCard>

            <div className="flex justify-center md:justify-start">
              <Link 
                href="/resume.pdf" 
                className="inline-flex items-center  bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-lg border border-white/20 text-white rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all"
                download
              >
                <div className='flex items-center px-6 py-3 bg-black rounded-xl'>
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column - Expertise and Certifications */}
          <div className="space-y-8">
            <GlassCard className="p-8 mb-8">
              <h2 className="text-3xl font-semibold text-center mb-8">Expertise Areas</h2>
              <div className="space-y-6">
                {expertiseAreas.map((area, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-6 bg-white/5 p-4 rounded-xl"
                  >
                    <area.icon className="w-10 h-10 text-blue-400" />
                    <div>
                      <h3 className="text-xl font-semibold">{area.title}</h3>
                      <p className="text-gray-400 text-sm">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-3xl font-semibold text-center mb-8">Certifications</h2>
              <div className="grid grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 text-center"
                  >
                    <p className={`font-semibold ${cert.color}`}>{cert.name}</p>
                  </div>
                ))}
              </div>
              
              {/* Animated CISM certification */}
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-4 bg-white/10 backdrop-blur-lg border-2 border-yellow-500/50 rounded-xl p-4 text-center"
              >
                <div className="flex items-center justify-center space-x-2">
                  <p className="font-semibold text-yellow-400">CISM</p>
                  <span className="text-xs text-yellow-400">(In Progress)</span>
                </div>
              </motion.div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;