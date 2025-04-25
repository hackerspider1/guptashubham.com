"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCertificate, FaExternalLinkAlt, FaGithub, FaDownload } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import { GoProject } from "react-icons/go";
import { MdFeaturedPlayList } from "react-icons/md";
import { Shield, Smartphone, Server, Laptop, Wifi, Users, BookOpen, Target } from "lucide-react";

import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section';
import { TimelineItem } from '@/components/ui/timeline-item';
import { SkillProgress } from '@/components/ui/skill-progress';
import { ProjectCard } from '@/components/ui/project-card';
import { Card } from '@/components/ui/card';
import { EducationCard } from '@/components/ui/education-card';

const Resume = () => {
  const experiences = [
    { year: "2016", title: "Pyramid Cyber Security & Forensic Pvt. Limited", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws." },
    { year: "2017", title: "ISYX Technologies", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws. Code Review. Mobile Penetration Testing." },
    { year: "2018", title: "Brocataon Fintech Group", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws. Android Penetration Testing." },
    { year: "2018", title: "Deloitte India", company: "Red Teaming, Web & Mobile App Security Testing, Source Code Review." },
    { year: "Current", title: "Deloitte USI", company: "Red Teaming, Purple Teaming." }
  ];

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-black to-zinc-900 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 space-y-6">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8 }}
                className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/30 text-zinc-400 text-sm"
              >
                <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Available for opportunities
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold"
              >
                Shubham Gupta
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-zinc-400"
              >
                Cybersecurity Professional & Ethical Hacker
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-zinc-500 max-w-lg"
              >
                A passionate, enthusiastic cybersecurity professional with over 12 years of experience as an IT security consultant and researcher specializing in Red Teaming and Web Application Security.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-3 mb-4"
              >
                <motion.div
                  className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 py-1.5 px-3 rounded-full border border-zinc-800/50 w-fit"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </motion.div>
                    <span className="font-medium">+91 9999</span>
                  </span>
                  <div className="flex space-x-0.5">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <div key={index} className="w-2.5 h-5 overflow-hidden relative">
                        <motion.div
                          animate={{ 
                            y: ["0%", "-91%", "0%"],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 8,
                            delay: index * 0.4,
                            ease: "easeInOut",
                            repeatDelay: 1
                          }}
                          className="absolute flex flex-col items-center"
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit, digitIndex) => (
                            <div key={`${index}-${digitIndex}`} className="h-5 flex items-center justify-center font-mono">
                              {digit}
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 py-1.5 px-3 rounded-full border border-zinc-800/50 w-fit"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                >
                  <span className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                    <span className="font-medium">shubhamgupta109.1995@live.com</span>
                  </span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-52 h-52 md:w-64 md:h-64"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
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

        {/* Experience Section */}
      <Section paddingY="xl" id="experience" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <FaBriefcase className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Professional Experience</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My journey in the world of cybersecurity
          </SectionDescription>
        </SectionHeader>

        <div className="space-y-12 mt-12">
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
      </Section>

      {/* Education Section */}
      <Section paddingY="xl" id="education" background="alt" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <BiBookOpen className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Education</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My academic background and achievements
          </SectionDescription>
        </SectionHeader>
           
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                className="backdrop-blur-sm h-full"
              />
            </motion.div>
          ))}
          </div>
      </Section>

        {/* Skills Section */}
      <Section paddingY="xl" id="skills" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <FaGraduationCap className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Technical Skills</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My expertise in cybersecurity
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16">
            {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:transform hover:translate-y-[-5px] transition-all duration-300"
            >
              <div className="relative w-24 h-24 mb-4">
                {/* Background circle */}
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#27272a" // zinc-800
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#skillGradient)"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - skill.value / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{skill.value}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-300 text-center tracking-wide">{skill.name}</p>
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
      </Section>

      {/* Certifications Section */}
      <Section paddingY="xl" id="certifications" background="alt" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <FaCertificate className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Certifications</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Industry-recognized credentials
          </SectionDescription>
        </SectionHeader>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl px-10 py-6 text-center shadow-lg"
            >
              <span className="text-2xl font-semibold text-white relative">
                {cert.name}
                <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>
              </span>
                  </motion.div>
                ))}
              </div>
      </Section>

      {/* Featured In Section */}
      <Section paddingY="xl" id="featured" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <MdFeaturedPlayList className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Featured In</SectionTitle>
            </motion.div>
          <SectionDescription className="mx-auto text-center">
            Publications and interviews highlighting my work
          </SectionDescription>
        </SectionHeader>

        <div className="mt-12 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 shadow-lg">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {interviews.map((interview, index) => (
                  <motion.div
                    key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <Link 
                  href={interview.link} 
                  target="_blank" 
                  className="flex items-center justify-center px-6 py-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 group-hover:from-blue-600/10 group-hover:to-purple-600/10 rounded-lg transition-all duration-300"></div>
                  <Image 
                    src={interview.image}
                    alt={interview.name}
                    width={120}
                    height={40}
                    className="object-contain h-10 opacity-80 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                  <div className="absolute -bottom-2 right-2 bg-zinc-700/70 text-xs text-zinc-300 rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                    <FaExternalLinkAlt className="w-2 h-2 mr-1" />
                    <span>View</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section paddingY="xl" id="projects" background="alt" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <GoProject className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Projects</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My open-source and personal projects
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl overflow-hidden shadow-xl group hover:border-zinc-700/50 transition-all duration-300"
            >
              <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-zinc-400 mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-zinc-800 px-3 py-1 rounded-full text-xs font-medium text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-white transition-colors"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" /> Demo
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-white transition-colors"
                    >
                      <FaGithub className="w-3 h-3" /> GitHub
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
      </Section>

      {/* Areas of Expertise */}
      <Section paddingY="xl" id="expertise" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <Shield className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Areas of Expertise</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Specialized security skills and services
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 p-2 bg-zinc-800/50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Web Application Security Testing</h3>
                <p className="text-sm text-zinc-400">Application would be tested for OWASP Top 10 flaws and other misconfigurations to ensure comprehensive security coverage.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 p-2 bg-zinc-800/50 rounded-lg">
                <Smartphone className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Mobile Application Security Testing</h3>
                <p className="text-sm text-zinc-400">Testing for OWASP Mobile Top 10 vulnerabilities and security configurations in mobile applications.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 p-2 bg-zinc-800/50 rounded-lg">
                <Server className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">API Security Testing</h3>
                <p className="text-sm text-zinc-400">Identifying vulnerabilities in APIs following OWASP API Top 10 guidelines and best practices.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 p-2 bg-zinc-800/50 rounded-lg">
                <Laptop className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Thick Client Application Testing</h3>
                <p className="text-sm text-zinc-400">Analyzing desktop applications for security vulnerabilities in both client and server communication.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 p-2 bg-zinc-800/50 rounded-lg">
                <Wifi className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Network Security Testing</h3>
                <p className="text-sm text-zinc-400">Identifying vulnerabilities in networks, systems, and network devices following NIST 800-35 guidelines.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 p-2 bg-zinc-800/50 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Red Teaming</h3>
                <p className="text-sm text-zinc-400">Time-bound assessments targeting organizational weaknesses through penetration testing, social engineering, and physical security testing.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Current Focus Areas */}
      <Section paddingY="xl" id="focus" background="alt" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="bg-zinc-900 p-3 rounded-xl mb-1 border border-zinc-800">
              <Target className="text-zinc-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <SectionTitle>Current Focus Areas</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            Expanding expertise in emerging security domains
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-medium text-white">Cloud Security & Infrastructure as Code</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-medium text-white">Advanced Mobile Application Security</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-medium text-white">IoT Security Methodologies</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-medium text-white">Container Security & Orchestration</h3>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Call to action */}
      <div className="relative z-10 py-32 bg-gradient-to-b from-black to-zinc-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-12 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to collaborate?</h2>
          <p className="text-zinc-400 max-w-2xl mb-10 text-lg">Let's discuss how my expertise in cybersecurity can help secure your applications and infrastructure.</p>
          <Link href="/contact">
            <div className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1">
              Get in Touch
          </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
