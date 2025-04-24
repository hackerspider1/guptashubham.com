"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCertificate } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import { GoProject } from "react-icons/go";
import { MdFeaturedPlayList } from "react-icons/md";

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

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-[120px]" />
        <div className="absolute top-60 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-[120px]" />
      </div>

      {/* Hero section with name and title */}
      <div className="relative z-10 py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Shubham Gupta
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-xl md:text-2xl text-zinc-400"
        >
          Cybersecurity Professional & Ethical Hacker
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 mt-8"
        >
          <a 
            href="#experience" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
          >
            Experience
          </a>
          <a 
            href="#projects" 
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors duration-300"
          >
            Projects
          </a>
        </motion.div>
      </div>

      {/* Experience Section */}
      <Section paddingY="xl" id="experience" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <FaBriefcase className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
            <SectionTitle>Experience</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My professional journey in cybersecurity
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
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <BiBookOpen className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
            <SectionTitle>Education</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My academic background and achievements
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {education.map((edu, index) => (
            <EducationCard
              key={index}
              institution={edu.institution}
              logo={edu.logo}
              degree={edu.degree}
              field={edu.field}
              period={edu.period}
              location={edu.location}
              gpa={edu.gpa}
              courses={edu.courses}
              achievements={edu.achievements}
              className="backdrop-blur-sm"
            />
          ))}
          </div>
      </Section>

        {/* Skills Section */}
      <Section paddingY="xl" id="skills" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <FaGraduationCap className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
            <SectionTitle>Skills</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My technical expertise in cybersecurity
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16">
            {skills.map((skill, index) => (
            <SkillProgress
              key={index}
              name={skill.name}
              value={skill.value}
              color="rgba(59, 130, 246, 0.8)"
              size="md"
            />
            ))}
          </div>
      </Section>

      {/* Certifications Section */}
      <Section paddingY="xl" id="certifications" background="alt" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <FaCertificate className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
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
              whileHover={{ y: -5 }}
              className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-8 py-4 text-center shadow-lg"
            >
              <span className="text-xl font-semibold text-white">{cert.name}</span>
                  </motion.div>
                ))}
              </div>
      </Section>

      {/* Featured In Section */}
      <Section paddingY="xl" id="featured" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <MdFeaturedPlayList className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
            <SectionTitle>Featured In</SectionTitle>
            </motion.div>
          <SectionDescription className="mx-auto text-center">
            Publications and interviews highlighting my work
          </SectionDescription>
        </SectionHeader>

        <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
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
                    className="relative group w-[140px]"
                  >
                    <Link href={interview.link} target="_blank">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800/70 transition-all duration-300 h-[60px] flex items-center justify-center shadow-md group-hover:shadow-lg">
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
      </Section>

        {/* Projects Section */}
      <Section paddingY="xl" id="projects" background="alt" className="relative z-10">
        <SectionHeader>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <GoProject className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
            <SectionTitle>Projects</SectionTitle>
          </motion.div>
          <SectionDescription className="mx-auto text-center">
            My open-source and personal projects
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
            {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
            />
            ))}
        </div>
      </Section>

      {/* Call to action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 py-24 flex flex-col items-center justify-center text-center px-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Interested in working together?</h2>
        <Link href="/contact">
          <div className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
            Get in Touch
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Resume;
