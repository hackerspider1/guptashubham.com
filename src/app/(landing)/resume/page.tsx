"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { FaGraduationCap, FaBriefcase, FaCertificate } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import Progress from "@/components/ui/progress";

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
        },
      }),
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
    className="relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="p-2 bg-blue-500/10 rounded-lg">
        <FaBriefcase className="text-blue-400" size={24} />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-zinc-100">{exp.title}</h3>
        <p className="text-sm text-zinc-400">{exp.company}</p>
        <span className="inline-block px-3 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full">
          {exp.year}
        </span>
      </div>
    </div>
  </motion.div>
);

const SkillCard = ({ skill }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
  >
    <h3 className="text-lg font-semibold text-zinc-100 mb-4">{skill.name}</h3>
    <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
      />
    </div>
    <span className="text-sm text-zinc-400 mt-2">{skill.value}%</span>
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
    { name: "Mobile Application Security Testing", value: 80 },
    { name: "API Security Testing", value: 85 },
    { name: "Network Security Testing", value: 80 },
    { name: "Red Teaming", value: 75 }
  ];

  const certifications = [
    { name: "OSCP" },
    { name: "EWPTX" }
  ];

  const interviews = [
    { name: "Amar Ujala" },
    { name: "News Chant" },
    { name: "Digital Gyan" },
    { name: "Gadgets World" },
    { name: "HackerOne" }
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
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-40">
        {/* Experience Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            Experience
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
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
            className="text-4xl font-bold text-center mb-16"
          >
            Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </motion.section>

        {/* Certifications & Interviews Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold mb-8"
            >
              Certifications
            </motion.h2>
            <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <FaCertificate className="text-blue-400" size={24} />
                    <span className="text-lg text-zinc-100">{cert.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold mb-8"
            >
              Interviews
            </motion.h2>
            <div className="grid gap-4">
              {interviews.map((interview, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
                >
                  <span className="text-lg text-zinc-100">{interview.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Projects Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
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
