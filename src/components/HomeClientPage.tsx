"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Terminal, Code2, Flag, Award,
  BugIcon, Briefcase, Quote
} from 'lucide-react';
import Marquee from "react-fast-marquee";
import Link from 'next/link';
import HeroLogos from '@/components/ui/hero-logo';
import CookieConsent from '@/components/CookieConsent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import useOnScreen from '@/hooks/useOnScreen';
import { MacbookScroll } from '@/components/ui/macbook-scroll';
import { initPerformanceOptimizations } from '@/lib/performance';
import LazyTestimonials from './LazyTestimonials';
import LogoMarquee from '@/components/ui/logo-marquee';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import Button from '@/components/ui/button';

const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-black"></div>
);

// @ts-ignore
const GlassCard = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// @ts-ignore
const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);
  // @ts-ignore
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const increment = Math.ceil(target / 50);
        const interval = setInterval(() => {
          setCount((prevCount) => {
            const nextCount = prevCount + increment;
            return nextCount >= target ? target : nextCount;
          });
        }, 20);

        return () => clearInterval(interval);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [target, isVisible]);

  // @ts-ignore
  return <div ref={ref}>{isVisible ? count : 0}</div>;
};

const HomeClientPage = () => {
  const activities = [
    {
      icon: Shield,
      title: "Penetration Testing",
      description: "Comprehensive security assessments for web/mobile applications and networks",
      color: "text-blue-400"
    },
    {
      icon: Terminal,
      title: "Bug Bounty Hunting",
      description: "Ranked bug bounty hunter with proven track record",
      color: "text-green-400"
    },
    {
      icon: Code2,
      title: "Security Research",
      description: "Deep dive into application security and vulnerability research",
      color: "text-purple-400"
    },
    {
      icon: Flag,
      title: "CTF Player",
      description: "Active participant in web and mobile CTF challenges",
      color: "text-red-400"
    }
  ];

  const achievements = [
    { icon: Award, label: "Hall of Fame", target: 600 },
    { icon: BugIcon, label: "Bugs Reported", target: 1337 },
    { icon: Briefcase, label: "Projects", target: 50 }
  ];

  const testimonials = [
    {
      message: 'Being a rookie by age and education he might just amaze you with the technical knowledge he owns about Pentest. He is a great resource to a team a good team player and a quick learner. I am sure he will be an asset to any team.',
      avatar: "/testimonials/rajeev_verma.jfif",
      name: 'Rajeev Verma',
      position: 'Information Security Leader @ SRF Limited'
    },
    {
      message: 'In a very young age he is having very good technical knowledge in Penetration Testing especially, he is good in web application. He is passionate about his work and dedicated for his work. His bug bounty skills makes him different from others and his dedication.',
      avatar: "/testimonials/manish.jfif",
      name: 'Manish Rohilla',
      position: 'Senior SecurityConsultant @ NotSoSecure'
    },
    {
      message: "I've known Shubham for more than 2 years. His vast experience and clear understanding of the concepts makes him an outstanding InfoSec professional. His sound knowledge on domains such as web application security assessments marks him as a key resource anywhere he is placed. Highly recommended as a professional and a friend.",
      avatar: "/testimonials/lalit.jfif",
      name: 'Lalit Mohan Sharma',
      position: 'Application Security @ Zynga'
    },
    {
      message: "He is one of the best hands in Bug Bounties and Pen testing. We've joined our hands on several projects, and Shubham is one of the best people I had as a partner. I highly recommend his expertise to any person looking for an ethical hacker (Pentest, Bug Bounty etc). He is the most profound person I have met, and his ability to tackle any problem is remarkable and with a warm smile. Shubham would become an appreciated member of any team.",
      avatar: "/testimonials/devender.jfif",
      name: 'Devender Kumar',
      position: 'Jr. Solution Architect @ Deloitte'
    },
  ];

  const logos = [
    {
      src: "/logos/android-studio-icon.png",
      alt: "Android Testing",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/ios.png",
      alt: "IOS",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/burp.png",
      alt: "Burp Suite",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/nmap.jpeg",
      alt: "Nmap",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/metasploit.png",
      alt: "Metasploit",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/wireshark.png",
      alt: "Wireshark",
      width: 55,
      height: 55,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/postman.png",
      alt: "Postman",
      width: 60,
      height: 60,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/terminal.png",
      alt: "Terminal",
      width: 55,
      height: 55,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/python.png",
      alt: "Python",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/github.png",
      alt: "Github",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/js.webp",
      alt: "Javascript",
      width: 80,
      height: 80,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/aws.png",
      alt: "Aws",
      width: 60,
      height: 60,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/xcode.png",
      alt: "Xcode",
      width: 70,
      height: 70,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/kali.png",
      alt: "Kali Linux",
      width: 100,
      height: 100,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/fortify.png",
      alt: "Fortify",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/openvas.png",
      alt: "Openvas",
      width: 100,
      height: 100,
      darkShadow: {
        hex: "",
      }
    },
  ];

  const hallOfFames = [
    { name: 'Spotify', file: 'spotify.webp', maxHeight: 85 },
    { name: 'Apple', file: 'apple.png', maxHeight: 72 },
    { name: 'Microsoft', file: 'microsoft.png', maxHeight: 65 },
    { name: 'BaiDu', file: 'BaiDu.png', maxHeight: 65 },
    { name: 'Google', file: 'google.png', maxHeight: 30 },
    { name: 'Bugcrowd', file: 'bugcrowd.png', maxHeight: 85 },
    { name: 'HackerOne', file: 'hackerone.png', maxHeight: 30 },
    { name: 'AT&T', file: 'at&t.png', maxHeight: 50 },
    { name: 'Kaspersky', file: 'kaspersky.png', maxHeight: 30 }
  ];

  const [lastVisit, setLastVisit] = useState('');

  useEffect(() => {
    const visit = localStorage.getItem('lastVisit');
    if (visit) {
      setLastVisit(visit);
    } else {
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          setLastVisit(data.ip);
          localStorage.setItem('lastVisit', data.ip);
        });
    }
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    initPerformanceOptimizations();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      <div className='fixed bottom-2 right-2 text-xs bg-zinc-900/50 backdrop-blur-sm px-2 py-1 rounded-md border border-zinc-800/50 text-zinc-500 font-mono'>
        {lastVisit}
      </div>

      <div className='bg-gradient-to-b from-black to-zinc-900 w-full flex justify-center pb-8'>
        <div className="relative z-10 max-w-6xl w-full px-6">
          <div className="text-center mb-16 relative h-[90vh] flex flex-col justify-center items-center">
            <div className='max-w-lg w-full relative flex flex-col justify-center items-center'>
              <HeroLogos logos={[...logos]} />
              <img className='w-[320px]' src="/shubham_gupta.png" alt="Shubham Gupta" />
              <h1 className="relative text-5xl font-bold tracking-tight mb-4 text-white">
                Shubham Gupta
              </h1>
              <div className="text-lg text-gray-300 mb-8">
                Security Researcher & Bug Hunter
              </div>
              <Button
                href="/what-is-hacking"
                variant="outline"
                size="lg"
                className="mt-4"
              >
                What is Hacking?
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hall of Fame */}
      <div className='w-full'>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#101010] via-[#161414] to-[#101010] py-3 shadow-md">
          <div className='max-w-6xl w-full px-6'>
            <LogoMarquee 
              logos={hallOfFames}
              direction="right"
              pauseOnHover={true}
              speed={35}
              gradientWidth={100}
              gradientColor={'#101414'}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full px-6 pb-16 pt-10">
        {/* What I Do Section */}
        <Section paddingY="md">
          <SectionHeader>
            <SectionTitle>What I Do</SectionTitle>
          </SectionHeader>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} variant="glass" hover={true} className="flex flex-col items-center text-center p-8">
                <activity.icon className={`w-12 h-12 ${activity.color} mb-4`} />
                <CardTitle className="mb-2">{activity.title}</CardTitle>
                <CardDescription className="text-sm">{activity.description}</CardDescription>
              </Card>
            ))}
          </div>
        </Section>

        {/* Achievements Section */}
        <Section paddingY="md">
          <SectionHeader>
            <SectionTitle>Achievements</SectionTitle>
          </SectionHeader>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} variant="glass" hover={true} className="flex flex-col items-center text-center p-8">
                <achievement.icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-4xl font-bold mb-2 text-white">
                  <AnimatedCounter target={achievement.target} />
                </h3>
                <CardDescription>{achievement.label}</CardDescription>
              </Card>
            ))}
          </div>
        </Section>

        <LazyTestimonials testimonials={testimonials} />

        {/* CTF Coming Soon */}
        <Section paddingY="lg" className="mt-10">
          <MacbookScroll
            title={
              <span className='text-2xl'>
                CTF Coming Soon: <br /> Get Ready for an Exciting Challenge! <br />
                <span className='text-sm text-gray-500'>Start your journey to learn the basics of hacking</span>
              </span>
            }
            badge={
              <Link href="https://peerlist.io/manuarora">
                {/* Empty badge */}
              </Link>
            }
            src="/images/ctf-image.jpg"
            showGradient={false}
          />
          <div className='flex items-center justify-center z-50 mt-8'>
            <Button
              href="https://ctf.guptashubham.com"
              variant="primary"
              size="lg"
              isExternal={true}
            >
              Start hacking
            </Button>
          </div>
        </Section>
      </div>
      <CookieConsent />
    </div>
  );
};

export default HomeClientPage; 