"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Download, 
  Shield, 
  Globe, 
  Award, 
  Briefcase, 
  Target 
} from 'lucide-react';

const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900 opacity-75 z-0"></div>
);

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
    { name: "CISSP", color: "text-blue-400" },
    { name: "CEH", color: "text-green-400" },
    { name: "OSCP", color: "text-purple-400" }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      {/* <AnimatedBackground /> */}
      
      <div className="relative z-10 max-w-6xl w-full px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Personal Introduction */}
          <div className="space-y-8">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold tracking-tight mb-4 text-white">
                Hey there! 👋
              </h1>
              <p className="text-2xl text-gray-300 mb-8">
                Cybersecurity Expert & Digital Guardian
              </p>
            </div>

            <GlassCard className="p-8 mb-8">
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-gray-300">
                  As a seasoned cybersecurity professional with over 5 years of expertise, I've dedicated my career to protecting digital landscapes and empowering organizations to build robust security infrastructures.
                </p>
                <p className="text-gray-300">
                  My journey spans across Web Application Security, Network Defense, and Advanced Penetration Testing, collaborating with prestigious organizations across multiple continents.
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
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;