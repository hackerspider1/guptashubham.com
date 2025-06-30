"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Coffee,
  Heart,
  Lightbulb,
  Code,
  BookOpen,
  Puzzle,
  Music,
  Globe,
  Camera,
  MapPin,
  Calendar,
  Award,
  Users,
  Target,
  Shield,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import LiquidGlass from '@/components/ui/liquid-glass';

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const personalInterests = [
    {
      icon: Code,
      title: "Open Source",
      description: "Contributing to security tools and participating in the open source community to share knowledge and improve security standards.",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Puzzle,
      title: "Solving Challenges",
      description: "Enjoy participating in CTFs and solving complex security puzzles that require creative thinking and technical expertise.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Globe,
      title: "Travel",
      description: "Exploring new places, experiencing different cultures, and meeting diverse people around the world enhances my perspective.",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Dedicated to lifelong learning in both technical skills and broader knowledge. Always reading and experimenting with new technologies.",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: Music,
      title: "Music",
      description: "Appreciate various music genres that help me maintain focus during coding sessions and relax after intense work periods.",
      color: "from-indigo-500/20 to-blue-500/20"
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Capturing moments and unique perspectives through photography when I'm not hunting for security vulnerabilities.",
      color: "from-teal-500/20 to-cyan-500/20"
    }
  ];

  const beliefs = [
    {
      icon: Heart,
      title: "Security as a Service",
      description: "I believe cybersecurity should empower rather than impede. My goal is to help organizations build secure systems that enhance their business rather than restrict it.",
      gradient: "from-red-500/10 to-pink-500/10"
    },
    {
      icon: Lightbulb,
      title: "Knowledge Sharing",
      description: "The security community thrives on sharing knowledge. I actively mentor others and contribute to the community through blogs, talks, and open-source projects.",
      gradient: "from-yellow-500/10 to-orange-500/10"
    },
    {
      icon: Coffee,
      title: "Practical Approach",
      description: "I prefer practical, implementable security solutions over theoretical perfection. Security should be realistic and tailored to each organization's unique needs.",
      gradient: "from-amber-500/10 to-yellow-500/10"
    }
  ];

  const stats = [
    { icon: Award, label: "Years Experience", value: "12+", color: "text-blue-400" },
    { icon: Users, label: "Companies Served", value: "50+", color: "text-purple-400" },
    { icon: Target, label: "Vulnerabilities Found", value: "1337+", color: "text-green-400" },
    { icon: Globe, label: "Countries Worked", value: "6+", color: "text-orange-400" }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -5
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Clean Dark Background with Subtle Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className="relative h-48 w-48 mx-auto mb-8"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <LiquidGlass variant="card" intensity="high" rounded="full" className="h-full w-full">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image 
                    src="/shubham_gupta.png" 
                    alt="Shubham Gupta" 
                    fill
                    sizes="192px"
                    className="object-cover"
                    priority
                  />
                </div>
              </LiquidGlass>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-tight"
              variants={fadeInUp}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Me
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Passionate about security, technology, and making the digital world safer for everyone
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <LiquidGlass variant="clean" intensity="medium" rounded="xl" className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-zinc-300" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-zinc-400">{stat.label}</div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <LiquidGlass variant="clean" intensity="high" rounded="2xl" className="p-8 md:p-12">
                <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
                  <p className="text-xl text-zinc-200 font-medium">
                    A passionate, enthusiastic and self-motivated cybersecurity professional with over 12 years of experience as an IT security consultant and researcher.
                  </p>
                  <p>
                    I specialize in multiple cybersecurity domains including Web Application Security, Network Security, Information Security, Ethical Hacking, Vulnerability Testing, and Red Teaming. My expertise spans across various industries and geographical locations.
                  </p>
                  <p>
                    With extensive experience working for different public and private ventures across India and globally (KSA, UAE, Qatar, Hong Kong), I currently serve as a Senior Solution Advisor at a Big4 consulting firm. Academically, I hold a computer science degree (BCA) and have earned numerous cybersecurity certifications.
                  </p>
                  <p>
                    I have a strong passion for learning and sharing knowledge with others. As an active member of various cybersecurity communities, I regularly participate in conferences and workshops to stay updated with the latest trends and technologies in the field.
                  </p>
                  <p>
                    Beyond my professional life, I enjoy exploring new technologies, participating in security challenges, and contributing to open-source projects. I believe in a balanced approach to life and make time for travel, photography, and music - hobbies that help me maintain creativity and perspective in my work.
                  </p>
                </div>
                
                <div className="mt-10 flex gap-4 flex-wrap">
                  <Link 
                    href="/assets/resume/shubham.pdf" 
                    download
                    className="group relative"
                  >
                    <LiquidGlass variant="button" intensity="high" rounded="lg" className="px-8 py-4">
                      <div className="flex items-center gap-3 text-white font-medium group-hover:text-zinc-200 transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Download Resume</span>
                      </div>
                    </LiquidGlass>
                  </Link>
                  
                  <Link 
                    href="/resume" 
                    className="group relative"
                  >
                    <LiquidGlass variant="card" intensity="medium" rounded="lg" className="px-8 py-4 border border-zinc-800/50">
                      <div className="flex items-center gap-3 text-zinc-300 group-hover:text-white transition-colors">
                        <span>View Professional Resume</span>
                      </div>
                    </LiquidGlass>
                  </Link>
                </div>
              </LiquidGlass>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-16 text-center"
              variants={fadeInUp}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Philosophy
              </span>
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {beliefs.map((belief, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div variants={cardHover}>
                    <LiquidGlass variant="clean" intensity="medium" rounded="xl" className="p-8 h-full">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${belief.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                        <belief.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-white">{belief.title}</h3>
                      <p className="text-zinc-300 leading-relaxed text-sm">{belief.description}</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Personal Interests
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalInterests.map((interest, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div variants={cardHover}>
                    <LiquidGlass variant="clean" intensity="medium" rounded="xl" className="p-8 h-full">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${interest.color} flex items-center justify-center mb-6 shadow-lg`}>
                        <interest.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-white">{interest.title}</h3>
                      <p className="text-zinc-300 leading-relaxed text-sm">{interest.description}</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location & Contact Info */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <LiquidGlass variant="clean" intensity="high" rounded="2xl" className="p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-8 text-white">Let's Connect</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-zinc-400">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Based in India, Working Globally</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>Available for Consulting</span>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  className="group relative inline-block"
                >
                  <LiquidGlass variant="button" intensity="high" rounded="lg" className="px-8 py-4">
                    <span className="text-white font-medium group-hover:text-zinc-200 transition-colors">
                      Get In Touch
                    </span>
                  </LiquidGlass>
                </Link>
              </div>
            </LiquidGlass>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;