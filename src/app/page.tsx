"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Terminal, Code2, Flag, Award, 
  BugIcon, Briefcase, Quote 
} from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';
import Link from 'next/link';

const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-black"></div>
);

{/* @ts-ignore */}
const GlassCard = ({ children, className = '' }) => (
  <div 
    className={`
      bg-black backdrop-blur-lg
      border border-white/20 
      rounded-2xl shadow-2xl 
      transition-all duration-300 
      hover:shadow-3xl 
      ${className}
    `}
  >
    {children}
  </div>
);

{/* @ts-ignore */}
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
      message: 'Being a rookie by age and education he might just amaze you with the technical knowledge he owns about Pentest. He is a great resource to a team a good team player and a quick learner. I am sure he will be an asset to any team.',
      avatar: "/testimonials/rajeev_verma.jfif",
      name: 'Rajeev Verma',
      position: 'Information Security Leader @ SRF Limited'
    },
    {
      message: 'In a very young age he is having very good technical knowledge in Penetration Testing especially, he is good in web application. He is passionate about his work and dedicated for his work. His bug bounty skills makes him different from others and his dedication.',
      avatar: "/testimonials/manish.jfif",
      name: 'Manish Rohilla',
      position: 'Senior SecurityConsultant @ NotSoSecure'
    },
    {
      message: "I've known Shubham for more than 2 years. His vast experience and clear understanding of the concepts makes him an outstanding InfoSec professional. His sound knowledge on domains such as web application security assessments marks him as a key resource anywhere he is placed. Highly recommended as a professional and a friend.",
      avatar: "/testimonials/lalit.jfif",
      name: 'Lalit Mohan Sharma',
      position: 'Application Security @ Zynga'
    },
    {
      message: "He is one of the best hands in Bug Bounties and Pen testing. We’ve joined our hands on several projects, and Shubham is one of the best people I had as a partner. I highly recommend his expertise to any person looking for an ethical hacker (Pentest, Bug Bounty etc). He is the most profound person I have met, and his ability to tackle any problem is remarkable and with a warm smile. Shubham would become an appreciated member of any team.",
      avatar: "/testimonials/devender.jfif",
      name: 'Devender Kumar',
      position: 'Jr. Solution Architect @ Deloitte'
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl w-full px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tight mb-4  text-white ">
            Shubham Gupta
          </h1>
          <p className="text-2xl text-gray-300">
            Security Researcher & Bug Hunter
          </p>
          <div className="text-center mt-12">
            <Link href="/what-is-hacking">
              <div className="text-white text-lg font-semibold underline decoration-4 decoration-blue-400">
                What is Hacking?
              </div>
            </Link>
          </div>
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
          <Marquee pauseOnHover={true}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center h-fit text-center max-w-lg bg-gray-800/30 p-6 rounded-2xl border border-white/10"
              >
                <Quote className="w-10 h-10 text-blue-400 mb-4" />
                <p className="text-gray-300 italic mb-6 text-sm">"{testimonial.message}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </GlassCard>

      </div>
    </div>
  );
}