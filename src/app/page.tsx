"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Terminal, Code2, Flag, Award, 
  BugIcon, Briefcase, Quote 
} from 'lucide-react';

const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-black"></div>
);

const GlassCard = ({ children, className = '' }) => (
  <div 
    className={`
      bg-gray-900/50 backdrop-blur-lg
      border border-white/20 
      rounded-2xl shadow-2xl 
      transition-all duration-300 
      hover:bg-gray-900/70 hover:shadow-3xl 
      ${className}
    `}
  >
    {children}
  </div>
);

const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = Math.ceil(target / 50);
      const interval = setInterval(() => {
        setCount((prevCount) => {
          const nextCount = prevCount + increment;
          return nextCount >= target ? target : nextCount;
        });
      }, 20);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [target]);

  return count;
};

export default function HomePage() {
  const activities = [
    { 
      icon: Shield, 
      title: "Penetration Testing", 
      description: "Comprehensive security assessments for web/mobile applications and networks",
      color: "text-blue-400"
    },
    { 
      icon: Terminal, 
      title: "Bug Bounty Hunting", 
      description: "Ranked bug bounty hunter with proven track record",
      color: "text-green-400"
    },
    { 
      icon: Code2, 
      title: "Security Research", 
      description: "Deep dive into application security and vulnerability research",
      color: "text-purple-400"
    },
    { 
      icon: Flag, 
      title: "CTF Player", 
      description: "Active participant in web and mobile CTF challenges",
      color: "text-red-400"
    }
  ];

  const achievements = [
    { icon: Award, label: "Hall of Fame", target: 600 },
    { icon: BugIcon, label: "Bugs Reported", target: 1337 },
    { icon: Briefcase, label: "Projects", target: 50 }
  ];

  const testimonials = [
    {
      quote: "Shubham's security insights are game-changing. His penetration testing revealed critical vulnerabilities we hadn't even considered.",
      name: "Alex Rodriguez",
      company: "TechSecure Solutions",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      quote: "An exceptional bug hunter with an incredible eye for detail. Shubham's work has significantly improved our application's security posture.",
      name: "Emily Chang",
      company: "CyberGuard Technologies",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      quote: "His CTF performance and security research are truly impressive. Shubham brings a unique perspective to cybersecurity challenges.",
      name: "Michael Kim",
      company: "InnovateX Security",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl w-full px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white">
            Shubham Gupta
          </h1>
          <p className="text-2xl text-gray-300">
            Security Researcher & Bug Hunter
          </p>
        </div>

        <GlassCard className="p-8 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">What I Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <activity.icon className={`w-12 h-12 ${activity.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-300 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Achievements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <achievement.icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-4xl font-bold mb-2">
                  <AnimatedCounter target={achievement.target} />+
                </h3>
                <p className="text-gray-300">{achievement.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-3xl font-semibold text-center mb-12">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center bg-gray-800/30 p-6 rounded-2xl border border-white/10"
              >
                <Quote className="w-10 h-10 text-blue-400 mb-4" />
                <p className="text-gray-300 italic mb-6 text-sm">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}