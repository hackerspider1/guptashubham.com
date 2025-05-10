"use client";

import React, { lazy, Suspense, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCertificate, FaExternalLinkAlt, FaGithub, FaDownload } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import { GoProject } from "react-icons/go";
import { MdFeaturedPlayList } from "react-icons/md";
import { Shield, Smartphone, Server, Laptop, Wifi, Users, BookOpen, Target, Code, Database, Cpu, Globe, Lock, BrainCircuit, Network, HardDrive } from "lucide-react";
import { Phone, Mail } from "lucide-react";
import dynamic from 'next/dynamic';

import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section';
import { TimelineItem } from '@/components/ui/timeline-item';
import { SkillProgress } from '@/components/ui/skill-progress';
import { ProjectCard } from '@/components/ui/project-card';
import { Card } from '@/components/ui/card';
import { EducationCard } from '@/components/ui/education-card';
import { Meteors } from '@/components/ui/meteors';
import AnimatedPhone from '@/components/ui/animated-phone';

// Simple loading component for suspense fallbacks
const LoadingPlaceholder = () => (
  <div className="w-full h-40 animate-pulse bg-zinc-800/50 rounded-lg"></div>
);

// Memoize static data
const experiences = [
  { year: "2016", title: "Pyramid Cyber Security & Forensic Pvt. Limited", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws." },
  { year: "2017", title: "ISYX Technologies", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws. Code Review. Mobile Penetration Testing." },
  { year: "2018", title: "Brocataon Fintech Group", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws. Android Penetration Testing." },
  { year: "2018", title: "Deloitte India", company: "Red Teaming, Web & Mobile App Security Testing, Source Code Review." },
  { year: "Current", title: "Deloitte USI", company: "Red Teaming, Purple Teaming." }
] as const;

const Resume = () => {
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
    { name: "Web Application Security Testing", value: 90 },
    { name: "Mobile Application Security Testing", value: 70 },
    { name: "API Security Testing", value: 70 },
    { name: "Network Security Testing", value: 80 },
    { name: "Red Teaming", value: 70 }
  ];

  const certifications = [
    { name: "OSCP" },
    { name: "EWPTX" },
    { name: "eCPPT" }
  ];

  const interviews = [
    {
      name: "Amar Ujala",
      image: "/interviews/amar-ujala.png",
      link: "https://www.amarujala.com/amp/delhi-ncr/bashindey/ethical-hacker-shubham-gupta-know-all-about-him"
    },
    {
      name: "News Chant",
      image: "/interviews/news-chant.png",
      link: "https://newschant.com/technology/indian-ethical-hacker-shubham-gupta-shares-his-career-journey-and-life-story/"
    },
    {
      name: "Digital Gyan",
      image: "/interviews/digital_gurujii.jpg",
      link: "https://www.digitalgurujii.com/interview-with-indian-ethical-hacker-shubham-gupta/"
    },
    {
      name: "Gadgets World",
      image: "/interviews/igadgetsworld.png",
      link: "https://www.igadgetsworld.com/interview-with-yahoo-hall-of-fame-mr-shubham-gupta/"
    },
    {
      name: "HackerOne",
      image: "/interviews/hackerone.png",
      link: "https://www.hackerone.com/blog/Hacker-QA-Shubham-gupta-Patience-and-Passion"
    }
  ];

  const projects = [
    {
      title: "EchoPwn",
      description: "Recon Automation for hackers by hackers.",
      technologies: ["Python", "Shell"],
      github: "https://github.com/hackerspider1/EchoPwn",
      demo: "https://github.com/hackerspider1/EchoPwn"
    },
    {
      title: "Hacker Portfolio",
      description: "A showcase of my projects and experiences, highlighting my skills and accomplishments in the field of cybersecurity.",
      technologies: ["Next.js", "JavaScript"],
      github: "https://github.com/hackerspider1/Personal-Portfolio",
      demo: "https://guptashubham.com/v1"
    },
  ];

  // Use useMemo for computed values
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }), []);

  // Added expertise areas
  const expertiseAreas = [
    {
      title: "Web Application Security",
      icon: Globe,
      description: "Specialized in identifying and exploiting web vulnerabilities including injection flaws, XSS, CSRF, and business logic issues.",
      color: "blue"
    },
    {
      title: "Mobile Application Security",
      icon: Smartphone,
      description: "Expert in Android and iOS security assessment, identifying issues in session management, data storage, and application logic.",
      color: "green"
    },
    {
      title: "Network Penetration Testing",
      icon: Network,
      description: "Skilled in identifying network vulnerabilities, open ports, and insecure configurations that could lead to unauthorized access.",
      color: "purple"
    },
    {
      title: "Red Team Operations",
      icon: Target,
      description: "Experienced in conducting comprehensive adversary simulations to test security controls and response capabilities.",
      color: "red"
    },
    {
      title: "Cloud Security",
      icon: Database,
      description: "Proficient in assessing AWS, Azure, and GCP environments for misconfigurations and security vulnerabilities.",
      color: "cyan"
    },
    {
      title: "API Security",
      icon: Code,
      description: "Specialized in testing REST and GraphQL APIs for authentication, authorization, and business logic flaws.",
      color: "amber"
    }
  ];

  // Added current focus areas
  const focusAreas = [
    {
      title: "Zero Trust Architecture",
      description: "Researching and implementing zero trust security models that verify every user and device before granting access to applications and data.",
      progress: 85
    },
    {
      title: "AI/ML Security",
      description: "Exploring vulnerabilities in machine learning models and developing strategies to secure AI systems against adversarial attacks.",
      progress: 70
    },
    {
      title: "Supply Chain Security",
      description: "Investigating methods to secure the software supply chain and protect against dependency-based vulnerabilities.",
      progress: 75
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Optimize background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/2" />
      </div>

      {/* Hero Section - Critical content, load first */}
      <div className="relative bg-gradient-to-b from-black to-zinc-900 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 space-y-5">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/30 text-zinc-400 text-sm"
              >
                <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Available for opportunities
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-4xl md:text-6xl font-bold"
              >
                Shubham Gupta
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-2xl text-zinc-400"
              >
                Cybersecurity Professional & Ethical Hacker
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-zinc-500 max-w-lg"
              >
                A passionate, enthusiastic cybersecurity professional with over 12 years of experience as an IT security consultant and researcher specializing in Red Teaming and Web Application Security.
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 py-1.5 px-3 rounded-full border border-zinc-800/50 w-fit">
                  <Phone className="h-4 w-4 text-green-400" />
                  <AnimatedPhone />
                </div>

                <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 py-1.5 px-3 rounded-full border border-zinc-800/50 w-fit">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="font-medium">shubhamgupta109.1995@live.com</span>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <a 
                  href="#experience" 
                  className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:-translate-y-1 rounded-lg text-white transition-all duration-300 flex items-center gap-2"
                >
                  <FaBriefcase className="text-zinc-400" />
                  Experience
                </a>
                <a 
                  href="#projects" 
                  className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:-translate-y-1 rounded-lg text-white transition-all duration-300 flex items-center gap-2"
                >
                  <GoProject className="text-zinc-400" />
                  Projects
                </a>
                <Link 
                  href="/assets/resume/shubham.pdf" 
                  target="_blank"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold shadow-md transition-all duration-300 flex items-center gap-2 hover:-translate-y-1"
                >
                  <FaDownload />
                  Download CV
                </Link>
              </motion.div>
            </div>
            
            <div className="md:col-span-2 flex justify-center md:justify-end">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-48 h-48 md:w-64 md:h-64"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-zinc-800 p-1">
                  <div className="h-full w-full rounded-full bg-zinc-900 overflow-hidden">
                    <Image 
                      src="/shubham_gupta.png" 
                      alt="Shubham Gupta" 
                      fill 
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 192px, 256px"
                      quality={90}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 -mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <div className="text-center p-4">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">12+</h3>
              <p className="text-zinc-400 mt-2">Years Experience</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">5</h3>
              <p className="text-zinc-400 mt-2">Companies</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">3+</h3>
              <p className="text-zinc-400 mt-2">Certifications</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">5+</h3>
              <p className="text-zinc-400 mt-2">Featured In</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Areas of Expertise Section - Consistent Dark Theme */}
      <Section paddingY="xl" id="expertise" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <Shield className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Areas of Expertise</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Specialized security domains where I excel
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 overflow-hidden hover:border-zinc-700/70 transition-all duration-300"
            >              
              <div className="mb-4 flex items-center gap-3">
                <div className="p-2 rounded-md bg-zinc-800/50">
                  <area.icon size={24} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{area.title}</h3>
              </div>
              <p className="text-sm text-zinc-400">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Current Focus Section - Consistent Dark Theme */}
      <Section paddingY="xl" id="focus" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <BrainCircuit className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Current Focus Areas</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Areas I'm actively researching and developing expertise in
          </SectionDescription>
        </SectionHeader>

        <div className="mt-12 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 overflow-hidden"
          >            
            <div className="space-y-8">
              {focusAreas.map((area, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">{area.title}</h3>
                    <span className="text-sm font-medium text-blue-400">{area.progress}%</span>
                  </div>
                  <p className="text-sm text-zinc-400">{area.description}</p>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Experience Section - Consistent Dark Theme */}
      <Section paddingY="xl" id="experience" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <FaBriefcase className="text-zinc-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <SectionTitle>Professional Experience</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My journey through the cybersecurity industry
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-4xl mx-auto mt-12">
          <div className="space-y-8 relative before:absolute before:inset-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-blue-500/50 before:via-purple-500/50 before:to-transparent before:left-[15px] md:before:left-1/2 before:-translate-x-1/2 before:z-0">
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={index}
                year={exp.year}
                title={exp.title}
                company={exp.company}
                index={index}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Education Section - Consistent Dark Theme */}
      <Section paddingY="xl" id="education" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <FaGraduationCap className="text-zinc-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <SectionTitle>Education</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Academic background and qualifications
          </SectionDescription>
        </SectionHeader>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <EducationCard 
                institution={edu.institution}
                logo={edu.logo}
                degree={edu.degree}
                field={edu.field}
                period={edu.period}
                location={edu.location}
                gpa={edu.gpa}
                courses={edu.courses}
                achievements={edu.achievements}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Technical Skills Section - Consistent Dark Theme */}
      <Section paddingY="xl" id="skills" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <Lock className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Technical Skills</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Core competencies and technical expertise
          </SectionDescription>
        </SectionHeader>

        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:transform hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className="relative w-20 h-20 mb-4">
                  <svg className="w-24 h-24 absolute -left-2 -top-2 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#27272a" // zinc-800
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#skillGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                      whileInView={{ strokeDashoffset: `${2 * Math.PI * 45 * (1 - skill.value / 100)}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {skill.value}%
                    </motion.span>
                  </div>
                </div>
                <motion.p 
                  className="text-sm font-medium text-zinc-300 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {skill.name}
                </motion.p>
              </motion.div>
            ))}
          </div>
          
          {/* SVG gradient definition */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" /> {/* blue-500 */}
                <stop offset="100%" stopColor="#8b5cf6" /> {/* purple-500 */}
              </linearGradient>
            </defs>
          </svg>
          
          {/* Additional skills badges */}
          <motion.div 
            className="mt-12 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Additional Technical Skills</h3>
            
            <div className="flex flex-wrap gap-3">
              {['OWASP Top 10', 'Burp Suite', 'Metasploit', 'Nmap', 'Wireshark', 
                'Python', 'JavaScript', 'Kali Linux', 'SAST/DAST', 'Web App Security',
                'Network Security', 'Cloud Security', 'Mobile Security', 'API Security',
                'Zero Day Research'].map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1.5 bg-zinc-800/60 text-zinc-300 rounded-full text-sm border border-zinc-700/50 hover:border-blue-500/30 hover:bg-blue-900/20 transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Certifications Section - Consistent Dark Theme */}
      <Section paddingY="xl" id="certifications" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <FaCertificate className="text-zinc-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <SectionTitle>Certifications</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Professional certifications and qualifications
          </SectionDescription>
        </SectionHeader>

        <div className="mt-12 flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="px-6 py-4 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl hover:border-zinc-700/70 transition-all duration-300"
            >
              <div className="text-lg font-semibold text-white">{cert.name}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured In Section - Consistent Dark Theme */}
      <Section paddingY="xl" id="featured" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <MdFeaturedPlayList className="text-zinc-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <SectionTitle>Featured In</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Media features and interviews
          </SectionDescription>
        </SectionHeader>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {interviews.map((interview, index) => (
            <motion.a
              key={index}
              href={interview.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center group"
            >
              <div className="h-16 w-full bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-2 flex items-center justify-center overflow-hidden group-hover:border-zinc-700/70 transition-all duration-300">
                <Image 
                  src={interview.image} 
                  alt={interview.name} 
                  width={100} 
                  height={60} 
                  className="h-auto max-h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="mt-2 text-xs text-zinc-500 group-hover:text-blue-400 transition-colors duration-300">{interview.name}</span>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Projects Section - Consistent Dark Theme */}
      <Section paddingY="xl" id="projects" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <GoProject className="text-zinc-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <SectionTitle>Projects</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Highlights of my open-source cybersecurity projects
          </SectionDescription>
        </SectionHeader>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <div className="relative z-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to work together?</h2>
            <p className="text-zinc-400 mb-8 md:text-lg">Let's connect and discuss how my security expertise can benefit your organization.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1"
            >
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
