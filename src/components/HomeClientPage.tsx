"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  BugIcon, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import HeroLogos from '@/components/ui/hero-logo';
import CookieConsent from '@/components/CookieConsent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import useOnScreen from '@/hooks/useOnScreen';
import { MacbookScroll } from '@/components/ui/macbook-scroll';
import { initPerformanceOptimizations } from '@/lib/performance';
import LazyTestimonials from './LazyTestimonials';
import LogoMarquee from '@/components/ui/logo-marquee';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Meteors } from '@/components/ui/meteors';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { SplineSceneShowcase } from "@/components/ui/SplineSceneShowcase";

// @ts-ignore
const GlassCard = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// @ts-ignore
const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
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
    }
  }, [target, isVisible]);

  return <div ref={counterRef}>{isVisible ? count : 0}</div>;
};

const HomeClientPage = () => {
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
      message: "He is one of the best hands in Bug Bounties and Pen testing. We've joined our hands on several projects, and Shubham is one of the best people I had as a partner. I highly recommend his expertise to any person looking for an ethical hacker (Pentest, Bug Bounty etc). He is the most profound person I have met, and his ability to tackle any problem is remarkable and with a warm smile. Shubham would become an appreciated member of any team.",
      avatar: "/testimonials/devender.jfif",
      name: 'Devender Kumar',
      position: 'Jr. Solution Architect @ Deloitte'
    },
  ];

  const logos = [
    {
      src: "/logos/android-studio-icon.png",
      alt: "Android Testing",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/ios.png",
      alt: "IOS",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/burp.png",
      alt: "Burp Suite",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/nmap.jpeg",
      alt: "Nmap",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/metasploit.png",
      alt: "Metasploit",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/wireshark.png",
      alt: "Wireshark",
      width: 55,
      height: 55,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/postman.png",
      alt: "Postman",
      width: 60,
      height: 60,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/terminal.png",
      alt: "Terminal",
      width: 55,
      height: 55,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/python.png",
      alt: "Python",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/github.png",
      alt: "Github",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/js.webp",
      alt: "Javascript",
      width: 80,
      height: 80,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/aws.png",
      alt: "Aws",
      width: 60,
      height: 60,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/xcode.png",
      alt: "Xcode",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/kali.png",
      alt: "Kali Linux",
      width: 100,
      height: 100,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/fortify.png",
      alt: "Fortify",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/openvas.png",
      alt: "Openvas",
      width: 100,
      height: 100,
      darkShadow: {
        hex: "",
      }
    },
  ];

  const hallOfFames = [
    { name: 'Spotify', file: 'spotify.webp', maxHeight: 60, url: 'https://spotify.com', brandColor: '#1DB954' },
    { name: 'Apple', file: 'apple.png', maxHeight: 65, url: 'https://apple.com', brandColor: '#A2AAAD' },
    { name: 'Microsoft', file: 'microsoft.png', maxHeight: 55, url: 'https://microsoft.com', brandColor: '#00A4EF' },
    { name: 'BaiDu', file: 'BaiDu.png', maxHeight: 50, url: 'https://baidu.com', brandColor: '#2932E1' },
    { name: 'Google', file: 'google.png', maxHeight: 48, url: 'https://google.com', brandColor: '#4285F4' },
    { name: 'Bugcrowd', file: 'bugcrowd.png', maxHeight: 62, url: 'https://bugcrowd.com', brandColor: '#F26822' },
    { name: 'HackerOne', file: 'hackerone.png', maxHeight: 48, url: 'https://hackerone.com', brandColor: '#494949' },
    { name: 'AT&T', file: 'at&t.png', maxHeight: 52, url: 'https://att.com', brandColor: '#00A8E0' },
    { name: 'Kaspersky', file: 'kaspersky.png', maxHeight: 48, url: 'https://kaspersky.com', brandColor: '#006D5C' }
  ];

  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted after component mounts
  useEffect(() => {
    setIsMounted(true);
    initPerformanceOptimizations();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      <div className='bg-gradient-to-b from-black via-zinc-950 to-zinc-900 w-full flex justify-center pb-4 sm:pb-8'>
        <div className="relative z-10 max-w-6xl w-full px-6">
          <div className="text-center mb-8 sm:mb-16 relative h-[70vh] sm:h-[80vh] md:h-[90vh] flex flex-col justify-center items-center">
            <div className='max-w-lg w-full relative flex flex-col justify-center items-center pt-12 sm:pt-0'>
              <div className="absolute inset-0 z-0">
                <Meteors number={15} color="rainbow" />
              </div>
              
              <HeroLogos logos={[...logos]} />
              <div className="-mt-64 sm:-mt-72 md:-mt-80 flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30 group-hover:opacity-50 blur-md transition duration-700 profile-glow"></div>
                  <div className="relative overflow-hidden rounded-full border-2 border-zinc-800 shadow-xl mb-4 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px]">
                    <img 
                      className='w-full h-full object-cover profile-cyber-glow' 
                      src="/shubham_gupta.png" 
                      alt="Shubham Gupta" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-500/10 to-transparent avatar-scan-effect"></div>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent avatar-scan-effect-delayed"></div>
                  </div>
                </div>
                
                <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 sm:mb-2 text-white">
                  Shubham Gupta
                </h1>
                <div className="text-sm sm:text-base text-gray-300 mb-2 sm:mb-4">
                  Security Researcher & Bug Hunter
                </div>
                <Button
                  href="/what-is-hacking"
                  variant="outline"
                  size="md"
                  className="mt-1 sm:mt-2"
                >
                  What is Hacking?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End of first page section */}

      {/* Streamlined Hall of Fame - Logo Marquee with enhanced styling */}
      <div className="w-full">
        <div className="relative overflow-hidden border-t border-zinc-800/30">
          <div className="w-full relative bg-gradient-to-b from-black to-zinc-950/95">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-[150px]"></div>
              <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-[150px]"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-2 sm:px-4 py-5 sm:py-8">
              {/* Enhanced header with badge */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent"></div>
                  <div className="px-4 py-1 mx-4 bg-zinc-900/60 border border-zinc-800/50 rounded-full">
                    <h3 className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Security Researcher</h3>
                  </div>
                  <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent"></div>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent pb-1">
                  Hall of Fame
                </h2>
                <p className="text-sm text-zinc-500 max-w-2xl text-center mt-2">
                  Recognized by leading tech companies for responsible security disclosures
                </p>
              </div>
              
              {/* Enhanced LogoMarquee with advanced styling */}
              <LogoMarquee 
                logos={hallOfFames}
                direction="right"
                pauseOnHover={true}
                speed={20}
                gradientWidth={150}
                gradientColor={'rgba(0,0,0,0.95)'}
                className="max-w-[100vw] overflow-hidden"
              />
              
              {/* View all accolades button */}
              <div className="flex justify-center mt-8">
                <a 
                  href="/resources/hall-of-fame" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800/50 hover:border-zinc-700/50 rounded-lg text-sm text-zinc-300 hover:text-white transition-all duration-300"
                >
                  <span>View all recognitions</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full px-6 pb-0 sm:pb-8 md:pb-12 lg:pb-16 pt-0 sm:pt-6 md:pt-8 lg:pt-10">
        {/* 3D Interactive Showcase - Full width */}
        <div className="w-full my-8 sm:my-12 md:my-16 py-4 sm:py-8 md:py-12">
          <SplineSceneShowcase />
        </div>
        
        {/* Achievements Section */}
        <Section paddingY="md">
          <SectionHeader>
            <SectionTitle>Achievements</SectionTitle>
          </SectionHeader>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.div 
                  className="relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 p-4 sm:p-6 md:p-8 rounded-lg overflow-hidden"
                  whileHover={{ 
                    scale: 1.03,
                    borderColor: "rgba(59, 130, 246, 0.3)"
                  }}
                  transition={{ 
                    duration: 0.3, 
                    scale: { type: "spring", stiffness: 300 }
                  }}
                >
                  {/* Icon and Counter layout */}
                  <div className="flex flex-col items-center text-center">
                    {/* Icon container */}
                    <div className="h-12 w-12 rounded-lg bg-zinc-800/70 flex items-center justify-center mb-5 relative">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5"></div>
                      <achievement.icon className="w-6 h-6 text-blue-400" />
                      <motion.div 
                        className="absolute -inset-0.5 rounded-lg opacity-0"
                        animate={{ 
                          opacity: [0, 0.3, 0],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                    style={{ 
                          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
                    }} 
                  />
                    </div>
                  
                    {/* Counter with minimal styling */}
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 text-white">
                      <AnimatedCounter target={achievement.target} />
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base">{achievement.label}</p>
                  </div>
                  
                  {/* Subtle background accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CPU Architecture Section */}
        <div className="py-2 sm:py-4 md:py-6 relative">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
              <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="overflow-visible"
              >
                <CpuArchitecture 
                  className="w-full h-[140px] sm:h-[180px] md:h-[220px] text-zinc-500 hover:text-zinc-300 transition-colors duration-700" 
                  lineMarkerSize={3} 
                  fontSize="5"
                  strokeWidth="0.25"
                  showCpuConnections={true}
                  text="CPU"
                  animateText={true}
                  showScanEffect={true}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
                  
        {/* Connector Lines - Bottom */}
        <div className="relative h-6 sm:h-8 md:h-10 overflow-hidden">
          <div className="absolute left-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent"></div>
        </div>

        <LazyTestimonials testimonials={testimonials} />

        {/* CTF Challenge Section */}
        <Section paddingY="md" className="mt-4 sm:mt-8 md:mt-16 relative">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-400 text-sm max-w-2xl mx-auto text-center">
              Put your security skills to the test in our interactive hacking playground
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl relative">
              {/* Left side pointer annotations */}
              <div className="hidden md:block absolute left-0 top-1/4 transform -translate-x-full">
                <div className="relative">
                  {/* First pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-start gap-2 mb-20"
                  >
                    <div className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-blue-500/30 max-w-[200px] shadow-lg shadow-blue-500/10">
                      <h4 className="text-blue-400 font-medium text-sm">Learn by Doing</h4>
                      <p className="text-xs text-gray-300 mt-1">Hands-on experience with real-world security scenarios</p>
                    </div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 100 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="h-[2px] bg-gradient-to-r from-blue-500/80 to-blue-500/20 mt-6 origin-left"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.4 }}
                        className="absolute right-0 top-0 h-2 w-2 rounded-full bg-blue-500 -mt-[3px]"
                      />
                    </motion.div>
                  </motion.div>
                  
                  {/* Second pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex items-start gap-2 mb-20"
                  >
                    <div className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-purple-500/30 max-w-[200px] shadow-lg shadow-purple-500/10">
                      <h4 className="text-purple-400 font-medium text-sm">Build Portfolio</h4>
                      <p className="text-xs text-gray-300 mt-1">Track progress and showcase your achievements to employers</p>
                    </div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      className="h-[2px] bg-gradient-to-r from-purple-500/80 to-purple-500/20 mt-6 origin-left"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 2.0 }}
                        className="absolute right-0 top-0 h-2 w-2 rounded-full bg-purple-500 -mt-[3px]"
                      />
                    </motion.div>
                  </motion.div>
                  
                  {/* Third pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex items-start gap-2"
                  >
                    <div className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-green-500/30 max-w-[200px] shadow-lg shadow-green-500/10">
                      <h4 className="text-green-400 font-medium text-sm">Community Support</h4>
                      <p className="text-xs text-gray-300 mt-1">Connect with peers and get help from experienced hackers</p>
                    </div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 120 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="h-[2px] bg-gradient-to-r from-green-500/80 to-green-500/20 mt-6 origin-left"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 2.6 }}
                        className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500 -mt-[3px]"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              
              {/* Right side pointer annotations */}
              <div className="hidden md:block absolute right-0 top-1/4 transform translate-x-full">
                <div className="relative">
                  {/* First pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex items-start gap-2 mb-20 flex-row-reverse"
                  >
                    <div className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-red-500/30 max-w-[200px] shadow-lg shadow-red-500/10">
                      <h4 className="text-red-400 font-medium text-sm">Realistic Scenarios</h4>
                      <p className="text-xs text-gray-300 mt-1">Practice on environments that mirror real-world applications</p>
                    </div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 100 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                      className="h-[2px] bg-gradient-to-l from-red-500/80 to-red-500/20 mt-6 origin-right"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.7 }}
                        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-red-500 -mt-[3px]"
                      />
                    </motion.div>
                  </motion.div>
                  
                  {/* Second pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="flex items-start gap-2 mb-20 flex-row-reverse"
                  >
                    <div className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-yellow-500/30 max-w-[200px] shadow-lg shadow-yellow-500/10">
                      <h4 className="text-yellow-400 font-medium text-sm">Earn Rewards</h4>
                      <p className="text-xs text-gray-300 mt-1">Collect points, badges, and certificates as you complete challenges</p>
                    </div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                      className="h-[2px] bg-gradient-to-l from-yellow-500/80 to-yellow-500/20 mt-6 origin-right"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 2.3 }}
                        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-yellow-500 -mt-[3px]"
                      />
                    </motion.div>
                  </motion.div>
                  
                  {/* Third pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 2.1 }}
                    className="flex items-start gap-2 flex-row-reverse"
                  >
                    <div className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-cyan-500/30 max-w-[200px] shadow-lg shadow-cyan-500/10">
                      <h4 className="text-cyan-400 font-medium text-sm">Level Up Skills</h4>
                      <p className="text-xs text-gray-300 mt-1">Progressive difficulty to help you grow from beginner to expert</p>
                    </div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 120 }}
                      transition={{ duration: 0.6, delay: 2.3 }}
                      className="h-[2px] bg-gradient-to-l from-cyan-500/80 to-cyan-500/20 mt-6 origin-right"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 2.9 }}
                        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-cyan-500 -mt-[3px]"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              
            <MacbookScroll
              title={
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="rounded-xl bg-black/50 backdrop-blur-lg p-4 border border-zinc-800"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs text-gray-400">ctf.guptashubham.com</div>
                      </div>
                      <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Capture The Flag Challenges
                      </div>
                      <div className="text-sm text-gray-300 mt-2">
                        Test your skills. Learn new techniques. Earn rewards.
                      </div>
                    </motion.div>
              }
              badge={
                    <div className="flex items-center gap-2 bg-zinc-800/50 backdrop-blur-md rounded-full px-3 py-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs text-white">Coming Soon</span>
                    </div>
              }
              src="/images/ctf-image.jpg"
                showGradient={true}
              />
              
              {/* Mobile version of the benefits */}
              <div className="md:hidden mt-8 space-y-10">
                {/* First pointer - Learn by Doing */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-blue-500/80 to-blue-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-blue-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-blue-500/30 shadow-lg shadow-blue-500/10"
                  >
                    <h4 className="text-blue-400 font-medium text-sm">Learn by Doing</h4>
                    <p className="text-xs text-gray-300 mt-1">Hands-on experience with real-world security scenarios</p>
                  </motion.div>
                </motion.div>
                
                {/* Second pointer - Build Portfolio */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-purple-500/80 to-purple-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 1.0 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-purple-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                  >
                    <h4 className="text-purple-400 font-medium text-sm">Build Portfolio</h4>
                    <p className="text-xs text-gray-300 mt-1">Track progress and showcase your achievements to employers</p>
                  </motion.div>
                </motion.div>
                
                {/* Third pointer - Realistic Scenarios */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-red-500/80 to-red-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 1.2 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-red-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-red-500/30 shadow-lg shadow-red-500/10"
                  >
                    <h4 className="text-red-400 font-medium text-sm">Realistic Scenarios</h4>
                    <p className="text-xs text-gray-300 mt-1">Practice on environments that mirror real-world applications</p>
                  </motion.div>
                </motion.div>

                {/* Fourth pointer - Earn Rewards */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-yellow-500/80 to-yellow-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 1.4 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-yellow-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-yellow-500/30 shadow-lg shadow-yellow-500/10"
                  >
                    <h4 className="text-yellow-400 font-medium text-sm">Earn Rewards</h4>
                    <p className="text-xs text-gray-300 mt-1">Collect points, badges, and certificates as you complete challenges</p>
                  </motion.div>
                </motion.div>

                {/* Fifth pointer - Level Up Skills */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-cyan-500/80 to-cyan-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 1.6 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-cyan-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="bg-zinc-800/80 backdrop-blur-md rounded-lg p-3 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                  >
                    <h4 className="text-cyan-400 font-medium text-sm">Level Up Skills</h4>
                    <p className="text-xs text-gray-300 mt-1">Progressive difficulty to help you grow from beginner to expert</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12 md:mt-16 max-w-3xl text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                  className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-4 border border-zinc-800/50"
                >
                  <div className="text-lg font-medium mb-1">Web Challenges</div>
                  <p className="text-sm text-gray-400">XSS, SQLi, and more web exploitation techniques</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-4 border border-zinc-800/50"
                >
                  <div className="text-lg font-medium mb-1">Cryptography</div>
                  <p className="text-sm text-gray-400">Crack ciphers and decode encrypted messages</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-4 border border-zinc-800/50"
                >
                  <div className="text-lg font-medium mb-1">OSINT</div>
                  <p className="text-sm text-gray-400">Open source intelligence gathering challenges</p>
                </motion.div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="https://ctf.guptashubham.com"
                variant="primary"
                size="lg"
                isExternal={true}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                >
                  <span>Join the waitlist</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Button>
                <Button
                  href="/what-is-hacking"
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 border-zinc-700 hover:border-zinc-500"
                >
                  Learn more
              </Button>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <CookieConsent />
    </div>
  );
};

export default HomeClientPage; 