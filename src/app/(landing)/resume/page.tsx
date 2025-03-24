"use client";

import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: '2012',
    title: 'High School',
    organization: 'MP Board Govt. Boys School, MP, India',
    details: []
  },
  {
    year: '2015', 
    title: 'Bachelor of Computer Application',
    organization: 'Jiwaji University, Gwalior, MP, India',
    details: []
  },
  {
    year: '2016',
    title: 'Security Analyst',
    organization: 'Pyramid Cyber Security & Forensic Pvt. Limited.',
    details: [
      'Conducting Web application penetration testing based on OWASP Top 10 flaws.'
    ]
  },
  {
    year: '2017',
    title: 'Security Analyst',
    organization: 'ISYX Technologies',
    details: [
      'Conducting Web application penetration testing based on OWASP Top 10 flaws.',
      'Config Review.',
      'Mobile Penetration testing'
    ]
  },
  {
    year: '2018',
    title: 'Security Analyst',
    organization: 'Broctagon Fintech Group',
    details: [
      'Conducting Web application penetration testing based on OWASP Top 10 flaws.',
      'Android Penetration testing'
    ]
  },
  {
    year: '2018',
    title: 'Security Analyst',
    organization: 'Deloitte India',
    details: [
      'Red Teaming',
      'Conducting Web application Penetration Testing Based on OWASP Top 10 Flaws.',
      'Conducting Android Application Penetration Testing.',
      'Conducting iOS Application Penetration Testing.',
      'Source Code Review'
    ]
  },
  {
    year: 'current',
    title: 'Security Analyst',
    organization: 'Deloitte USI',
    details: [
      'Red Teaming',
      'Purple Teaming'
    ]
  }
];

const skills = [
  {
    name: 'Web Application Security Testing',
    percentage: 90
  },
  {
    name: 'Mobile Application Security Testing',
    percentage: 70
  },
  {
    name: 'Api Security Testing',
    percentage: 70
  },
  {
    name: 'Network Security Testing',
    percentage: 80
  },
  {
    name: 'Red Teaming',
    percentage: 70
  }
];

const Page = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-8 min-h-screen"
    >
      <div className="space-y-20">
        {/* Experience Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Experience
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 mt-4 rounded-full"/>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-neutral-900/40 backdrop-blur-xl p-8 rounded-2xl border border-neutral-800/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/>
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">{exp.title}</h3>
                    <p className="text-neutral-400 text-lg font-light">{exp.organization}</p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-neutral-800/50 text-neutral-300 text-sm font-medium border border-neutral-700/50">
                    {exp.year}
                  </span>
                </div>

                {exp.details.length > 0 && (
                  <ul className="space-y-3 text-neutral-300">
                    {exp.details.map((detail, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                        className="flex items-center gap-3"
                      >
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"/>
                        <span className="font-light">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Skills
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 mt-4 rounded-full"/>
          </motion.div>

          <div className="grid gap-8">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-neutral-900/40 backdrop-blur-xl p-6 rounded-xl border border-neutral-800/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-medium text-neutral-200">{skill.name}</span>
                  <span className="text-blue-400 font-semibold">{skill.percentage}%</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1.5, delay: idx * 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Page;
