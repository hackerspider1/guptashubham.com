"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Progress from "@/components/ui/progress";
import { FaGraduationCap, FaBriefcase, FaCertificate } from "react-icons/fa";

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

export default function Experience() {
  return (
    <div className="container mx-auto p-8 text-white">
      <motion.h2 className="text-4xl font-bold text-center mb-8 text-blue-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>My Experience</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {experiences.map((exp, index) => (
          <motion.div key={index} className="flex flex-col items-start bg-black border border-gray-800 p-6 rounded-lg shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
            <FaBriefcase className="text-blue-400 mb-2" size={28} />
            <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
            <p className="text-gray-400">{exp.company}</p>
            <span className="text-blue-400 text-sm mt-2">{exp.year}</span>
          </motion.div>
        ))}
      </div>

      <motion.h2 className="text-4xl font-bold text-center mt-12 mb-8 text-purple-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>My Skills</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <Card key={index} className="!bg-black border-gray-800 p-4 rounded-lg shadow-md">
            <CardContent>
              <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              {/* @ts-ignore */}
              <Progress value={skill.value} className="mt-2 text-blue-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      <motion.h2 className="text-4xl font-bold text-center mt-12 mb-8 text-blue-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>My Certifications</motion.h2>
      <div className="flex flex-wrap justify-center gap-4">
        {certifications.map((cert, index) => (
          <motion.div key={index} className="bg-gray-800 px-4 py-2 rounded-lg shadow-md text-white text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{cert.name}</motion.div>
        ))}
      </div>

      <motion.h2 className="text-4xl font-bold text-center mt-12 mb-8 text-purple-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>My Interviews</motion.h2>
      <div className="flex flex-wrap justify-center gap-4">
        {interviews.map((interview, index) => (
          <motion.div key={index} className="bg-gray-800 px-4 py-2 rounded-lg shadow-md text-white text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{interview.name}</motion.div>
        ))}
      </div>
    </div>
  );
}
