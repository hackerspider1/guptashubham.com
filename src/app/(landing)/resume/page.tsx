"use client";

import React, { lazy, Suspense, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCertificate, FaExternalLinkAlt, FaGithub, FaDownload } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import { GoProject } from "react-icons/go";
import { MdFeaturedPlayList } from "react-icons/md";
import { Shield, Smartphone, Server, Laptop, Wifi, Users, BookOpen, Target, Code, Database, Cpu, Globe, Lock, BrainCircuit, Network, HardDrive, Award, Calendar, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import dynamic from 'next/dynamic';

import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section';
import { TimelineItem } from '@/components/ui/timeline-item';
import { SkillProgress } from '@/components/ui/skill-progress';
import { ProjectCard } from '@/components/ui/project-card';
import { Card } from '@/components/ui/card';
import { EducationCard } from '@/components/ui/education-card';
import { Meteors } from '@/components/ui/meteors';
import AnimatedPhone from '@/components/ui/animated-phone';
import LiquidGlass from '@/components/ui/liquid-glass';

// Simple loading component for suspense fallbacks
const LoadingPlaceholder = () => (
  <div className="w-full h-40 animate-pulse bg-zinc-800/50 rounded-lg"></div>
);

// Memoize static data
const experiences = [
  { 
    year: "2024 - Present", 
    title: "Senior Solution Advisor", 
    company: "Deloitte USI", 
    description: "Leading Red Teaming and Purple Teaming operations. Conducting advanced security assessments and developing strategic security solutions for enterprise clients.",
    skills: ["Red Teaming", "Purple Teaming", "Strategic Consulting", "Enterprise Security"]
  },
  { 
    year: "2018 - 2024", 
    title: "Security Consultant", 
    company: "Deloitte India", 
    description: "Specialized in Red Teaming, Web & Mobile App Security Testing, and Source Code Review. Led security assessments for major financial and technology clients.",
    skills: ["Red Teaming", "Web App Security", "Mobile Security", "Code Review"]
  },
  { 
    year: "2018", 
    title: "Security Analyst", 
    company: "Brocataon Fintech Group", 
    description: "Conducted comprehensive Web application penetration testing and Android security assessments for fintech applications.",
    skills: ["Web App Testing", "Android Security", "OWASP Top 10", "Financial Security"]
  },
  { 
    year: "2017", 
    title: "Security Consultant", 
    company: "ISYX Technologies", 
    description: "Performed Web application penetration testing, code reviews, and mobile security assessments for various clients.",
    skills: ["Penetration Testing", "Code Review", "Mobile Testing", "Security Consulting"]
  },
  { 
    year: "2016", 
    title: "Security Analyst", 
    company: "Pyramid Cyber Security & Forensic Pvt. Limited", 
    description: "Started career conducting Web application penetration testing based on OWASP Top 10 vulnerabilities.",
    skills: ["Web Security", "OWASP Testing", "Vulnerability Assessment", "Security Analysis"]
  }
] as const;

const Resume = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const education = [
    {
      institution: "Jiwaji University",
      logo: "/education/jiwaji.svg",
      degree: "Bachelor of Computer Application",
      field: "Computer Science",
      period: "2012 - 2015",
      location: "Gwalior, MP India",
      gpa: "3.8/4.0",
      courses: ["Data Structures", "Algorithms", "Database Management", "Web Development"],
      achievements: [
        "Graduated with Honors",
        "Selected for University Programming Contest"
      ]
    },
    {
      institution: "MP Board Govt. Boys School",
      logo: "/education/mpboard.svg",
      degree: "High School",
      field: "Science & Mathematics",
      period: "2010 - 2012",
      location: "MP India",
      gpa: "3.9/4.0",
      achievements: [
        "Scored in the top 5% of state examinations",
        "Led the school Computer Science Club"
      ]
    }
  ];

  const skills = [
    { name: "Web Application Security Testing", value: 95, icon: Globe },
    { name: "Red Team Operations", value: 85, icon: Target },
    { name: "Network Security Testing", value: 80, icon: Network },
    { name: "Mobile Application Security Testing", value: 75, icon: Smartphone },
    { name: "API Security Testing", value: 90, icon: Code },
    { name: "Cloud Security Assessment", value: 70, icon: Database }
  ];

  const certifications = [
    { name: "OSCP", description: "Offensive Security Certified Professional", year: "2020" },
    { name: "EWPTX", description: "eLearnSecurity Web Application Penetration Tester eXtreme", year: "2019" },
    { name: "eCPPT", description: "eLearnSecurity Certified Professional Penetration Tester", year: "2018" }
  ];

  const interviews = [
    {
      name: "Amar Ujala",
      image: "/interviews/amar-ujala.png",
      link: "https://www.amarujala.com/amp/delhi-ncr/bashindey/ethical-hacker-shubham-gupta-know-all-about-him",
      description: "Featured story about ethical hacking journey"
    },
    {
      name: "News Chant",
      image: "/interviews/news-chant.png",
      link: "https://newschant.com/technology/indian-ethical-hacker-shubham-gupta-shares-his-career-journey-and-life-story/",
      description: "Career journey and life story interview"
    },
    {
      name: "Digital Gyan",
      image: "/interviews/digital_gurujii.jpg",
      link: "https://www.digitalgurujii.com/interview-with-indian-ethical-hacker-shubham-gupta/",
      description: "Technical interview on cybersecurity"
    },
    {
      name: "Gadgets World",
      image: "/interviews/igadgetsworld.png",
      link: "https://www.igadgetsworld.com/interview-with-yahoo-hall-of-fame-mr-shubham-gupta/",
      description: "Yahoo Hall of Fame recognition interview"
    },
    {
      name: "HackerOne",
      image: "/interviews/hackerone.png",
      link: "https://www.hackerone.com/blog/Hacker-QA-Shubham-gupta-Patience-and-Passion",
      description: "HackerOne featured hacker interview"
    }
  ];

  const projects = [
    {
      title: "EchoPwn",
      description: "Comprehensive reconnaissance automation tool designed by hackers for hackers. Features automated subdomain enumeration, port scanning, and vulnerability detection.",
      technologies: ["Python", "Shell", "Docker", "API Integration"],
      github: "https://github.com/hackerspider1/EchoPwn",
      demo: "https://github.com/hackerspider1/EchoPwn",
      category: "Security Tool"
    },
    {
      title: "Hacker Portfolio",
      description: "A modern, responsive portfolio showcasing cybersecurity projects and achievements. Built with performance and security in mind.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/hackerspider1/Personal-Portfolio",
      demo: "https://guptashubham.com/v1",
      category: "Web Development"
    },
  ];

  // Use useMemo for computed values
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }), []);

  const staggerContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.6
      }
    }
  }), []);

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -5
    }
  };

  // Added expertise areas
  const expertiseAreas = [
    {
      title: "Web Application Security",
      icon: Globe,
      description: "Specialized in identifying and exploiting web vulnerabilities including injection flaws, XSS, CSRF, and business logic issues.",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Mobile Application Security",
      icon: Smartphone,
      description: "Expert in Android and iOS security assessment, identifying issues in session management, data storage, and application logic.",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Network Penetration Testing",
      icon: Network,
      description: "Skilled in identifying network vulnerabilities, open ports, and insecure configurations that could lead to unauthorized access.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Red Team Operations",
      icon: Target,
      description: "Experienced in conducting comprehensive adversary simulations to test security controls and response capabilities.",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      title: "Cloud Security",
      icon: Database,
      description: "Proficient in assessing AWS, Azure, and GCP environments for misconfigurations and security vulnerabilities.",
      color: "from-indigo-500/20 to-blue-500/20"
    },
    {
      title: "API Security",
      icon: Code,
      description: "Specialized in testing REST and GraphQL APIs for authentication, authorization, and business logic flaws.",
      color: "from-teal-500/20 to-cyan-500/20"
    }
  ];

  // Added current focus areas
  const focusAreas = [
    {
      title: "Zero Trust Architecture",
      description: "Researching and implementing zero trust security models that verify every user and device before granting access to applications and data.",
      progress: 85,
      icon: Shield
    },
    {
      title: "AI/ML Security",
      description: "Exploring vulnerabilities in machine learning models and developing strategies to secure AI systems against adversarial attacks.",
      progress: 70,
      icon: BrainCircuit
    },
    {
      title: "Supply Chain Security",
      description: "Investigating methods to secure the software supply chain and protect against dependency-based vulnerabilities.",
      progress: 75,
      icon: Lock
    }
  ];

  const stats = [
    { icon: Award, label: "Years Experience", value: "12+" },
    { icon: Target, label: "Vulnerabilities Found", value: "1337+" },
    { icon: Users, label: "Companies Served", value: "50+" },
    { icon: Globe, label: "Countries Worked", value: "6+" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y, opacity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]), opacity }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 via-teal-500/5 to-green-500/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/2"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.01),transparent_50%)]" />
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
            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Professional Resume
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12"
              variants={fadeInUp}
            >
              12+ years of cybersecurity expertise across multiple domains and global markets
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <LiquidGlass variant="card" intensity="medium" rounded="xl" className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-zinc-400" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-zinc-500">{stat.label}</div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </motion.div>

            {/* Download Resume Button */}
            <motion.div className="mt-12" variants={fadeInUp}>
              <Link 
                href="/assets/resume/shubham.pdf" 
                download
                className="group relative inline-block"
              >
                <LiquidGlass variant="button" intensity="high" rounded="lg" className="px-8 py-4">
                  <div className="flex items-center gap-3 text-white font-medium group-hover:text-zinc-200 transition-colors">
                    <FaDownload className="w-5 h-5" />
                    <span>Download PDF Resume</span>
                  </div>
                </LiquidGlass>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
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
              Professional Experience
            </motion.h2>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div variants={cardHover}>
                    <LiquidGlass variant="card" intensity="medium" rounded="xl" className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="md:w-48 flex-shrink-0">
                          <div className="text-sm font-medium text-zinc-400 mb-2">{exp.year}</div>
                          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                          <div className="text-zinc-300 font-medium mb-4">{exp.company}</div>
                          <p className="text-zinc-400 leading-relaxed mb-4">{exp.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="px-3 py-1 text-xs font-medium bg-zinc-800/50 border border-zinc-700/50 rounded-full text-zinc-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
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
              Core Skills
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <LiquidGlass variant="card" intensity="medium" rounded="xl" className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <skill.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                        <div className="text-sm text-zinc-400">{skill.value}% Proficiency</div>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-800/50 rounded-full h-2">
                      <motion.div 
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Areas */}
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
              Areas of Expertise
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertiseAreas.map((area, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div variants={cardHover}>
                    <LiquidGlass variant="card" intensity="medium" rounded="xl" className="p-8 h-full">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${area.color} flex items-center justify-center mb-6`}>
                        <area.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-white">{area.title}</h3>
                      <p className="text-zinc-400 leading-relaxed">{area.description}</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
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
              Certifications
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <LiquidGlass variant="card" intensity="medium" rounded="xl" className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                      <FaCertificate className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{cert.name}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{cert.description}</p>
                    <div className="text-zinc-500 text-sm">{cert.year}</div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
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
              Featured Projects
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div variants={cardHover}>
                    <LiquidGlass variant="card" intensity="medium" rounded="xl" className="p-8 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <span className="px-3 py-1 text-xs font-medium bg-zinc-800/50 border border-zinc-700/50 rounded-full text-zinc-300">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 text-xs font-medium bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Link 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                          <FaGithub className="w-4 h-4" />
                          <span className="text-sm">Code</span>
                        </Link>
                        <Link 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Demo</span>
                        </Link>
                      </div>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Coverage */}
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
              Media Coverage
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interviews.map((interview, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div variants={cardHover}>
                    <Link 
                      href={interview.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <LiquidGlass variant="card" intensity="medium" rounded="xl" className="p-6 h-full">
                        <div className="aspect-video bg-zinc-800/50 rounded-lg mb-4 overflow-hidden">
                          <Image 
                            src={interview.image}
                            alt={interview.name}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{interview.name}</h3>
                        <p className="text-zinc-400 text-sm mb-4">{interview.description}</p>
                        <div className="flex items-center gap-2 text-blue-400">
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Read Article</span>
                        </div>
                      </LiquidGlass>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <LiquidGlass variant="card" intensity="high" rounded="2xl" className="p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-8 text-white">Ready to Work Together?</h3>
              <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                I'm always interested in discussing new opportunities, consulting projects, or collaborations in cybersecurity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="group relative"
                >
                  <LiquidGlass variant="button" intensity="high" rounded="lg" className="px-8 py-4">
                    <span className="text-white font-medium group-hover:text-zinc-200 transition-colors">
                      Get In Touch
                    </span>
                  </LiquidGlass>
                </Link>
                <Link 
                  href="/assets/resume/shubham.pdf" 
                  download
                  className="group relative"
                >
                  <LiquidGlass variant="card" intensity="medium" rounded="lg" className="px-8 py-4 border border-zinc-800/50">
                    <div className="flex items-center gap-3 text-zinc-300 group-hover:text-white transition-colors">
                      <FaDownload className="w-4 h-4" />
                      <span>Download Resume</span>
                    </div>
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

export default Resume;
