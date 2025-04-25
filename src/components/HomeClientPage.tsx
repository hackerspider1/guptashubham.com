"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Terminal, Code2, Flag, Award,
  BugIcon, Briefcase, Quote, WifiIcon, MapPinIcon, 
  ClockIcon, MonitorIcon, XIcon, ComputerIcon
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

// Define interfaces for the state types
interface LocationInfo {
  city: string;
  country: string;
  region: string;
  timezone: string;
}

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
    { name: 'Google', file: 'google.png', maxHeight: 45 },
    { name: 'Bugcrowd', file: 'bugcrowd.png', maxHeight: 85 },
    { name: 'HackerOne', file: 'hackerone.png', maxHeight: 40 },
    { name: 'AT&T', file: 'at&t.png', maxHeight: 50 },
    { name: 'Kaspersky', file: 'kaspersky.png', maxHeight: 45 }
  ];

  // Fixed states - initialize with default values (not localStorage)
  const [ipInfo, setIpInfo] = useState<string | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [deviceInfo, setDeviceInfo] = useState('');
  const [visitTimestamp, setVisitTimestamp] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInfoButton, setShowInfoButton] = useState(false);
  const [showIpNotification, setShowIpNotification] = useState(false);
  const [showLocationNotification, setShowLocationNotification] = useState(false);
  const [showLocationInfo, setShowLocationInfo] = useState(false);

  // Custom function to update isLoaded state and localStorage
  const updateIsLoaded = (value: boolean) => {
    setIsLoaded(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pageLoaded', value.toString());
    }
  };

  // Effect to initialize state from localStorage and set up notifications
  useEffect(() => {
    // First check if localStorage has pageLoaded value
    if (typeof window !== 'undefined') {
      setIsLoaded(localStorage.getItem('pageLoaded') === 'true');
    }
    
    // Get device info
    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent;
      let browserName = "Unknown Browser";
      let deviceType = "Desktop";
      
      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "Safari";
      } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera";
      } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
      }
      
      if (/Mobi|Android/i.test(userAgent)) {
        deviceType = "Mobile";
      } else if (/iPad|Tablet/i.test(userAgent)) {
        deviceType = "Tablet";
      }
      
      return `${deviceType} • ${browserName}`;
    };
    
    setDeviceInfo(getBrowserInfo());
    setVisitTimestamp(new Date().toLocaleString());
    
    // Safely access localStorage for user preferences
    if (typeof window === 'undefined') return;
    
    // Get user preference for notifications
    const userOptedOut = localStorage.getItem('hideNotifications') === 'true';
    
    // Check if this is first visit or returning within session
    const isFirstToday = !localStorage.getItem('todayVisit') || 
      (new Date().toDateString() !== localStorage.getItem('todayVisit'));
    
    // Track today's visit
    localStorage.setItem('todayVisit', new Date().toDateString());
    
    // Show notifications if:
    // 1. User hasn't opted out
    // 2. This is their first visit today
    const shouldShowNotifications = !userOptedOut && isFirstToday;
    
    // Always show info button if user has data but opted out of notifications
    const showInfoBtn = !shouldShowNotifications && !isFirstToday;
    
    const visit = localStorage.getItem('lastVisit');
    if (visit) {
      setIpInfo(visit);
      // Check if we have location info in localStorage
      const savedLocation = localStorage.getItem('locationInfo');
      if (savedLocation) {
        try {
          const parsedLocation = JSON.parse(savedLocation);
          setLocationInfo(parsedLocation);
          
          // First set the page as loaded
          updateIsLoaded(true);
          
          // Make location info available
          setShowLocationInfo(true);
          
          // Set info button visibility
          setShowInfoButton(showInfoBtn);
          
          // Only show notifications if they should be shown
          if (shouldShowNotifications) {
            // Show notifications after a delay
            setTimeout(() => {
              setShowIpNotification(true);
              
              // Only show location notification if we have meaningful location data
              if (parsedLocation.city !== 'Unknown' && parsedLocation.country !== 'Unknown') {
                setShowLocationNotification(true);
                
                // Auto-hide location notification after 10 seconds
                setTimeout(() => {
                  setShowLocationNotification(false);
                }, 10000);
              }
            }, 4000); // Increased delay to ensure page is fully loaded and user has had time to see the content
          }
        } catch (e) {
          console.error("Failed to parse location info", e);
          updateIsLoaded(true);
        }
      } else {
        fetchLocationInfo(visit, shouldShowNotifications);
      }
    } else {
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          setIpInfo(data.ip);
          localStorage.setItem('lastVisit', data.ip);
          fetchLocationInfo(data.ip, shouldShowNotifications);
        })
        .catch(error => {
          console.error("Failed to fetch IP:", error);
          updateIsLoaded(true);
        });
    }
  }, []);

  const fetchLocationInfo = (ip: string, shouldShowNotifications: boolean) => {
    // Using a free IP geolocation API
    fetch(`https://ipapi.co/${ip}/json/`)
      .then(response => response.json())
      .then(data => {
        const locationData = {
          city: data.city || 'Unknown',
          country: data.country_name || 'Unknown',
          region: data.region || 'Unknown',
          timezone: data.timezone || 'Unknown'
        };
        setLocationInfo(locationData);
        localStorage.setItem('locationInfo', JSON.stringify(locationData));
        
        // Show the info button if we have data but shouldn't show notifications
        if (!shouldShowNotifications) {
          setShowInfoButton(true);
        }
        
        // Set as loaded first
        updateIsLoaded(true);
        
        // Show location info regardless
        setShowLocationInfo(true);
        
        // Only show notifications if they should be shown
        if (shouldShowNotifications) {
          // Show notifications after a delay
          setTimeout(() => {
            setShowLocationInfo(true);
            setShowIpNotification(true);
            
            // Show location notification after IP notification
            setTimeout(() => {
              setShowLocationNotification(true);
              
              // Auto-hide location notification after 10 seconds
              setTimeout(() => {
                setShowLocationNotification(false);
              }, 10000);
            }, 3000);
          }, 4000);
        } else {
          setShowLocationInfo(true); // Still make location info available
          setShowInfoButton(true); // Show the info button
        }
      })
      .catch(error => {
        console.error("Failed to fetch location info", error);
        setLocationInfo({ city: 'Unknown', country: 'Unknown', region: 'Unknown', timezone: 'Unknown' });
        updateIsLoaded(true);
        
        // Only show notifications if they should be shown
        if (shouldShowNotifications) {
          localStorage.setItem('notificationsLastShown', Date.now().toString());
          
          // Show notifications after a delay
          setTimeout(() => {
            setShowLocationInfo(true);
            setShowIpNotification(true);
            setShowLocationNotification(true);
            
            // Show notifications after a delay
            setTimeout(() => {
              setShowLocationInfo(true);
              setShowIpNotification(true);
              
              // Show location notification after IP notification
              setTimeout(() => {
                setShowLocationNotification(true);
                
                // Auto-hide location notification after 10 seconds
                setTimeout(() => {
                  setShowLocationNotification(false);
                }, 10000);
              }, 3000);
            }, 4000);
          }, 4000);
        } else {
          setShowLocationInfo(true); // Still make location info available
        }
      });
  };

  // Initialize performance optimizations
  useEffect(() => {
    initPerformanceOptimizations();
  }, []);

  // Handle closing notifications
  const closeNotification = (type: string) => {
    if (type === 'location') {
      setShowLocationNotification(false);
    } else if (type === 'ip') {
      setShowIpNotification(false);
    }
  };

  // Don't show notifications again function
  const dontShowAgain = () => {
    // Set user preference to hide notifications
    if (typeof window !== 'undefined') {
      localStorage.setItem('hideNotifications', 'true');
    }
    setShowLocationNotification(false);
    setShowIpNotification(false);
    // Show the info button after hiding notifications
    setShowInfoButton(true);
  };
  
  // Function to show notifications on demand
  const showNotificationsAgain = () => {
    setShowIpNotification(true);
    setTimeout(() => {
      if (locationInfo && locationInfo.city !== 'Unknown' && locationInfo.country !== 'Unknown') {
        setShowLocationNotification(true);
        setTimeout(() => setShowLocationNotification(false), 10000);
      }
    }, 3000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      <AnimatePresence>
        {/* IP Notification - Apple Style */}
        {showIpNotification && (
          <motion.div
            className="fixed bottom-16 left-4 w-[calc(100%-2rem)] max-w-[250px] bg-zinc-900/90 backdrop-blur-lg text-white px-3 py-2 sm:py-2.5 shadow-lg rounded-2xl z-40 border border-zinc-800/50 md:left-6 hover:bg-zinc-900/95 transition-colors"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-hidden">
                <ComputerIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium truncate">{deviceInfo}</span>
              </div>
              <button 
                onClick={() => closeNotification('ip')} 
                className="rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center bg-zinc-800/80 ml-1.5 hover:bg-zinc-700 flex-shrink-0"
              >
                <XIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-1 sm:mt-1.5">
              <span className="text-[8px] sm:text-[10px] text-zinc-400 truncate max-w-[120px] sm:max-w-[150px]">
                {ipInfo}
              </span>
              <button 
                onClick={dontShowAgain}
                className="text-[8px] sm:text-[10px] text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
              >
                Hide
              </button>
            </div>
          </motion.div>
        )}

        {/* Location Notification - Apple Style */}
        {showLocationNotification && locationInfo && (
          <motion.div
            className="fixed bottom-36 left-4 w-[calc(100%-2rem)] max-w-[250px] bg-zinc-900/90 backdrop-blur-lg text-white px-3 py-2 sm:py-2.5 shadow-lg rounded-2xl z-40 border border-zinc-800/50 md:left-6 hover:bg-zinc-900/95 transition-colors"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-hidden">
                <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-400 flex-shrink-0" />
                {locationInfo.city !== 'Unknown' && locationInfo.country !== 'Unknown' ? (
                  <span className="text-[10px] sm:text-xs font-medium truncate">
                    {locationInfo.city}, {locationInfo.country}
                  </span>
                ) : (
                  <span className="text-[10px] sm:text-xs font-medium">Location unavailable</span>
                )}
              </div>
              <button 
                onClick={() => closeNotification('location')} 
                className="rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center bg-zinc-800/80 ml-1.5 hover:bg-zinc-700 flex-shrink-0"
              >
                <XIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-1 sm:mt-1.5">
              <span className="text-[8px] sm:text-[10px] text-zinc-400 truncate max-w-[120px] sm:max-w-[150px]">
                {locationInfo.timezone || 'Unknown timezone'}
              </span>
              <button 
                onClick={dontShowAgain}
                className="text-[8px] sm:text-[10px] text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
              >
                Hide
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Info button to see data again */}
        {showInfoButton && (
          <motion.button
            onClick={showNotificationsAgain}
            className="fixed bottom-4 left-4 w-10 h-10 bg-zinc-900/90 backdrop-blur-lg flex items-center justify-center rounded-full z-40 border border-zinc-800/50 hover:bg-zinc-900/95 transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <div className='bg-gradient-to-b from-black to-zinc-900 w-full flex justify-center pb-4 sm:pb-8'>
        <div className="relative z-10 max-w-6xl w-full px-6">
          <div className="text-center mb-8 sm:mb-16 relative h-[70vh] sm:h-[80vh] md:h-[90vh] flex flex-col justify-center items-center">
            <div className='max-w-lg w-full relative flex flex-col justify-center items-center pt-12 sm:pt-0'>
              <HeroLogos logos={[...logos]} />
              <div className="-mt-64 sm:-mt-72 md:-mt-80 flex flex-col items-center">
                <img className='w-[220px] sm:w-[240px] md:w-[280px]' src="/shubham_gupta.png" alt="Shubham Gupta" />
                <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 sm:mb-2 text-white">
                  Shubham Gupta
                </h1>
                <div className="text-sm sm:text-base text-gray-300 mb-2 sm:mb-4">
                  Security Researcher & Bug Hunter
                </div>
                <Button
                  href="/what-is-hacking"
                  variant="outline"
                  size="md"
                  className="mt-1 sm:mt-2"
                >
                  What is Hacking?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hall of Fame */}
      <div className='w-full'>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black border-y border-zinc-900 py-2 sm:py-4 shadow-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='max-w-5xl w-full px-6'
          >
            <LogoMarquee 
              logos={hallOfFames}
              direction="right"
              pauseOnHover={true}
              speed={25}
              gradientWidth={100}
              gradientColor={'#000000'}
            />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full px-6 pb-0 sm:pb-8 md:pb-12 lg:pb-16 pt-0 sm:pt-6 md:pt-8 lg:pt-10">
        {/* What I Do Section */}
        <Section paddingY="md">
          <SectionHeader>
            <SectionTitle>What I Do</SectionTitle>
          </SectionHeader>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {activities.map((activity, index) => (
              <Card key={index} variant="glass" hover={true} className="flex flex-col items-center text-center p-4 sm:p-6 md:p-8">
                <activity.icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${activity.color} mb-2 sm:mb-4`} />
                <CardTitle className="mb-1 sm:mb-2">{activity.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{activity.description}</CardDescription>
              </Card>
            ))}
          </div>
        </Section>

        {/* Achievements Section */}
        <Section paddingY="md" className="mt-2 sm:mt-4">
          <SectionHeader>
            <SectionTitle>Achievements</SectionTitle>
          </SectionHeader>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} variant="glass" hover={true} className="flex flex-col items-center text-center p-4 sm:p-6 md:p-8">
                <achievement.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mb-2 sm:mb-4" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-white">
                  <AnimatedCounter target={achievement.target} />
                </h3>
                <CardDescription>{achievement.label}</CardDescription>
              </Card>
            ))}
          </div>
        </Section>

        <LazyTestimonials testimonials={testimonials} />

        {/* CTF Coming Soon */}
        <Section paddingY="none" className="mt-[-80px] sm:mt-0 md:mt-8">
          <div className="py-0 sm:py-2 md:py-8">
            <MacbookScroll
              title={
                <span className='text-lg sm:text-xl md:text-2xl'>
                  CTF Coming Soon: <br /> Get Ready for an Exciting Challenge! <br />
                  <span className='text-xs sm:text-sm text-gray-500'>Start your journey to learn the basics of hacking</span>
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
            <div className='flex items-center justify-center z-50 mt-2 sm:mt-2 md:mt-8'>
              <Button
                href="https://ctf.guptashubham.com"
                variant="primary"
                size="lg"
                isExternal={true}
              >
                Start hacking
              </Button>
            </div>
          </div>
        </Section>
      </div>
      <CookieConsent />
    </div>
  );
};

export default HomeClientPage; 