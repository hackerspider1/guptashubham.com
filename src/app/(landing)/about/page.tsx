"use client";

import React, { useEffect } from 'react';
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
  Camera
} from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

const AboutPage = () => {
  // Initialize animation controls
  const philosophyControls = useAnimation();
  const interestsControls = useAnimation();

  // Start animations when component mounts
  useEffect(() => {
    const startAnimations = async () => {
      await philosophyControls.start("visible");
      await interestsControls.start("visible");
    };
    
    startAnimations();
  }, [philosophyControls, interestsControls]);

  const personalInterests = [
    {
      icon: Code,
      title: "Open Source",
      description: "Contributing to security tools and participating in the open source community to share knowledge and improve security standards.",
      color: "text-blue-400"
    },
    {
      icon: Puzzle,
      title: "Solving Challenges",
      description: "Enjoy participating in CTFs and solving complex security puzzles that require creative thinking and technical expertise.",
      color: "text-green-400"
    },
    {
      icon: Globe,
      title: "Travel",
      description: "Exploring new places, experiencing different cultures, and meeting diverse people around the world enhances my perspective.",
      color: "text-purple-400"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Dedicated to lifelong learning in both technical skills and broader knowledge. Always reading and experimenting with new technologies.",
      color: "text-blue-400"
    },
    {
      icon: Music,
      title: "Music",
      description: "Appreciate various music genres that help me maintain focus during coding sessions and relax after intense work periods.",
      color: "text-green-400"
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Capturing moments and unique perspectives through photography when I'm not hunting for security vulnerabilities.",
      color: "text-purple-400"
    }
  ];

  const beliefs = [
    {
      icon: Heart,
      title: "Security as a Service",
      description: "I believe cybersecurity should empower rather than impede. My goal is to help organizations build secure systems that enhance their business rather than restrict it."
    },
    {
      icon: Lightbulb,
      title: "Knowledge Sharing",
      description: "The security community thrives on sharing knowledge. I actively mentor others and contribute to the community through blogs, talks, and open-source projects."
    },
    {
      icon: Coffee,
      title: "Practical Approach",
      description: "I prefer practical, implementable security solutions over theoretical perfection. Security should be realistic and tailored to each organization's unique needs."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black to-zinc-900 w-full flex justify-center pb-8">
        <div className="relative z-10 max-w-6xl w-full px-6">
          <div className="text-center mb-16 relative pt-20 flex flex-col justify-center items-center">
            <div className="max-w-lg w-full relative flex flex-col justify-center items-center">
              <motion.div 
                className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-zinc-800/50 flex-shrink-0 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src="/shubham_gupta.png" 
                  alt="Shubham Gupta" 
                  fill
                  sizes="(max-width: 768px) 100vw, 160px"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                About Me
              </motion.h1>
              <motion.p 
                className="text-lg text-zinc-400 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Passionate about security, technology, and making the digital world safer
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Bio Section */}
          <div className="md:col-span-3 space-y-6">
            <Card variant="glass" className="p-6 md:p-8">
              <div className="space-y-4 text-zinc-300">
                <p>
                  A passionate, enthusiastic and self-motivated cybersecurity professional having more than 12 years of experience as an IT security consultant and researcher. I work on multiple cybersecurity domains including Web-App Security, Network Security, Information Security, Ethical Hacking, Vulnerability Testing, Red Teaming etc.
                </p>
                <p>
                  With rich experience of working for different public and private ventures pan India and globally (KSA, UAE, Qatar, Hong Kong), presently I'm working as Senior Solution Advisor in Big4. Academically I'm computer graduate (BCA) and have qualified numerous cybersecurity certifications.
                </p>
                <p>
                  I have a strong passion for learning and sharing knowledge with others. I am an active member of various cybersecurity communities and regularly participate in conferences and workshops to stay updated with the latest trends and technologies in the field.
                </p>
                <p>
                  Beyond my professional life, I enjoy exploring new technologies, participating in security challenges, and contributing to open-source projects. I believe in a balanced approach to life and make time for travel, photography, and music - hobbies that help me maintain creativity and perspective in my work.
                </p>
              </div>
              <div className="mt-6 flex gap-4 flex-wrap">
                <Link 
                  href="/assets/resume/shubham.pdf" 
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:-translate-y-1 rounded-lg text-white font-semibold transition-all duration-300 shadow-md"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </Link>
                <Link 
                  href="/resume" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:-translate-y-1 rounded-lg text-white transition-all duration-300"
                >
                  <span>View Professional Resume</span>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Personal Philosophy */}
        <div className="mt-16">
          <motion.h2 
            className="text-2xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            My Philosophy
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={philosophyControls}
          >
            {beliefs.map((belief, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="h-full"
              >
                <Card variant="glass" hover={true} className="h-full flex flex-col p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <belief.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-lg mb-3">{belief.title}</CardTitle>
                  <CardDescription className="text-center text-sm text-zinc-400">{belief.description}</CardDescription>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Personal Interests */}
        <div className="mt-16">
          <motion.h2 
            className="text-2xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Personal Interests
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={interestsControls}
          >
            {personalInterests.map((interest, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="h-full"
              >
                <Card variant="glass" hover={true} className="h-full flex flex-col p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <interest.icon className={`w-5 h-5 ${interest.color}`} />
                    </div>
                    <CardTitle className="text-base leading-tight">{interest.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-2 text-xs text-zinc-400 leading-relaxed">{interest.description}</CardDescription>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Connect Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card variant="glass" className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Let's Connect</h2>
            <p className="text-zinc-400 mb-6">
              I'm always open to discussing cybersecurity topics, potential collaborations, or just having a friendly chat about shared interests.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:-translate-y-1 rounded-lg text-white font-semibold transition-all duration-300 shadow-md"
            >
              Get In Touch
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;