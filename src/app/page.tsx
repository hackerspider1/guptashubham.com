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

const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-black"></div>
);

{/* @ts-ignore */ }
const GlassCard = ({ children, className = '' }) => (
  <div
    className={`

      ${className}
    `}
  >
    {children}
  </div>
);

{/* @ts-ignore */ }
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

export default function HomePage() {
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

  const hallOfFames = ['spotify.webp', 'apple.png', 'microsoft.png', 'BaiDu.png', 'google.png', 'bugcrowd.png', 'hackerone.png', 'at&t.png', 'kaspersky.png'];

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

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      {/* <AnimatedBackground /> */}

      <div className='fixed bottom-2 right-2 text-xs font-semibold'>
        {lastVisit}
      </div>

      <div className='bg-gradient-to-b from-black to-zinc-900 w-full flex justify-center pb-8'>
        <div className="relative z-10 max-w-6xl w-full px-6  ">
          <div className="text-center mb-16 relative h-[90vh] flex flex-col justify-center items-center">
            <div className='max-w-lg w-full  relative flex flex-col justify-center items-center'>
              <HeroLogos logos={[...logos]} />
              <img className='w-[320px] ' src="/shubham_gupta.png" alt="" />
              <h1 className="relative text-5xl font-semibold tracking-tight mb-4  text-white ">
                Shubham Gupta
              </h1>
              <div className="text-lg text-gray-300">
                Security Researcher & Bug Hunter
              </div>
              <div className="text-center mt-12 z-50">
                <Link className='z-50' href="/what-is-hacking">
                  <div className="text-white text-lg font-semibold underline decoration-4 decoration-blue-400">
                    What is Hacking?
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Hall of Fame */}
      <div className=' mb-6 w-full'>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#161414] py-2 ">
          <div className='max-w-6xl w-full px-6'>
            <Marquee direction='right' pauseOnHover={true} className=''>
              {
                hallOfFames.map((logo, index) => (
                  <div key={index} className="flex flex-col items-center text-center px-6">
                    <img className='h-[80px] max-w-[250px] object-contain ' src={`/hall-of-fame/${logo}`} alt="" />
                  </div>
                ))
              }
            </Marquee>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-6xl w-full px-6 pb-16">

        <GlassCard className="p-8 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">What I Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <activity.icon className={`w-12 h-12 ${activity.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-300 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Achievements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <achievement.icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-4xl font-bold mb-2">
                  <AnimatedCounter target={achievement.target} />
                </h3>
                <p className="text-gray-300">{achievement.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="py-8 pb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">Testimonials</h2>
          <div className='relative'>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              navigation={true}
              speed={1000}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className='testimonials-swiper'
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-left h-auto text-left p-4">
                    <p className="text-gray-300 italic mb-6 text-sm">{testimonial.message}</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* CTF Comming Soon */}
        <MacbookScroll
        title={<span className='text-2xl'>CTF Coming Soon: <br /> Get Ready for an Exciting Challenge! <br />
        <span className='text-sm text-gray-500'>Start your journey to learn the basics of hacking</span>
        </span>}
        badge={
          <Link href="https://peerlist.io/manuarora">
            {/* test */}
            {/* <Badge className="h-10 w-10 transform -rotate-12" /> */}
          </Link>
        }
        src={`https://t4.ftcdn.net/jpg/04/43/33/17/360_F_443331709_k8JYkvD2NUfRfgJLaoCPs1ZGxhsb7vJm.jpg`}
        showGradient={false}
      />
      <div className='flex items-center justify-center z-50 pb-16'>
        <Link href={'https://ctf.guptashubham.com'} target='_blank' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-50'>Start hacking</Link>
      </div>
      </div>
      <CookieConsent />
    </div>
  );
}