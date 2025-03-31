"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { FaGraduationCap, FaBriefcase, FaCertificate } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from "d3-ease";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const timelineAnimation = {
  hidden: { width: 0 },
  visible: { 
    width: "100%",
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const ProjectCard = ({ project, index }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, x: -50 },
      visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
        }
      })
    }}
    whileHover={{ y: -5 }}
    className="bg-neutral-900/50 rounded-xl overflow-hidden border border-neutral-800"
  >
    {project.image && (
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
        />
      </div>
    )}
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <div className="flex gap-3">
          {project.github && (
            <Link href={project.github} target="_blank" className="hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} target="_blank" className="hover:text-primary transition-colors">
              <ExternalLink className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
      <p className="text-neutral-400 text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, i) => (
          <span key={i} className="px-2 py-1 text-xs rounded-full bg-neutral-800 text-neutral-400">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ExperienceCard = ({ exp, index }) => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col md:flex-row w-full items-center md:items-start relative"
  >
    {/* Timeline center line */}
    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500/20 to-purple-500/20" />
    
    {/* Timeline dot */}
    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-zinc-900 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-10 shrink-0" />

    {/* Content container */}
    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
      <motion.div
        className="mt-4 md:mt-0 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full">
            {exp.year}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">{exp.title}</h3>
        <p className="text-sm text-zinc-400">{exp.company}</p>
      </motion.div>
    </div>
  </motion.div>
);

const SkillCard = ({ skill }) => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl"
  >
    <div className="w-20 h-20 mb-3">
      <CircularProgressbar
        value={skill.value}
        text={`${skill.value}%`}
        styles={buildStyles({
          pathColor: `rgba(59, 130, 246, ${skill.value / 100})`,
          textColor: '#fff',
          trailColor: '#1f2937',
          pathTransitionDuration: 1.4,
          textSize: '22px',
        })}
      />
    </div>
    <h3 className="text-sm font-medium text-zinc-300 text-center">{skill.name}</h3>
  </motion.div>
);

const Resume = () => {
  const experiences = [
    { year: "2012", title: "High School", company: "MP Board Govt. Boys School, MP India" },
    { year: "2015", title: "Bachelor of Computer Application", company: "Jiwaji University, Gwalior, MP India" },
    { year: "2016", title: "Pyramid Cyber Security & Forensic Pvt. Limited", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws." },
    { year: "2017", title: "ISYX Technologies", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws. Code Review. Mobile Penetration Testing." },
    { year: "2018", title: "Brocataon Fintech Group", company: "Conducting Web application penetration testing based on OWASP Top 10 flaws. Android Penetration Testing." },
    { year: "2018", title: "Deloitte India", company: "Red Teaming, Web & Mobile App Security Testing, Source Code Review." },
    { year: "Current", title: "Deloitte USI", company: "Red Teaming, Purple Teaming." }
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
      title: "Security Scanner",
      description: "A comprehensive automated vulnerability scanner for web applications with advanced detection capabilities and detailed reporting features.",
      technologies: ["Python", "Docker", "React", "TypeScript"],
      github: "https://github.com/example/scanner",
      demo: "https://example.com/demo"
    },
    {
      title: "Threat Modeling Tool",
      description: "Interactive platform for creating and analyzing security threat models, supporting STRIDE methodology and automated report generation.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "WebSocket"],
      github: "https://github.com/example/threat-model",
      demo: "https://example.com/threat-model"
    },
    {
      title: "Secure Code Analyzer",
      description: "Static code analysis tool that detects security vulnerabilities and provides remediation guidance for multiple programming languages.",
      technologies: ["Go", "GraphQL", "React", "Redis"],
      github: "https://github.com/example/code-analyzer"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-24">
        {/* Experience Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-16"
          >
            Experience
          </motion.h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Skills
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </motion.section>

        {/* Certifications & Interviews Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-16"
          >
            Achievements
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Certifications */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-6 text-center text-zinc-100">
                Certifications
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                  >
                    <FaCertificate className="text-blue-400" size={24} />
                    <span className="text-lg text-zinc-200">{cert.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interviews */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-6 text-center text-zinc-100">
                Featured In
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {interviews.map((interview, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="relative group w-[140px]"
                  >
                    <Link href={interview.link} target="_blank">
                      <div className="bg-zinc-900/50 rounded-lg p-4 hover:bg-zinc-900/70 transition-colors h-[60px] flex items-center justify-center">
                        <Image 
                          src={interview.image}
                          alt={interview.name}
                          width={100}
                          height={30}
                          className={`object-contain transition-transform duration-300 group-hover:scale-110 max-h-[30px] ${
                            interview.name === "HackerOne" ? "w-[80px]" : "w-[100px]"
                          }`}
                          unoptimized
                        />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="pt-8"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Resume;
