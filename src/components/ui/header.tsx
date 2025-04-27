"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Instagram,
    Twitter,
    Send as TelegramIcon,
    MessageCircle as DiscordIcon,
    Menu as MenuIcon,
    X as CloseIcon,
    ShieldAlert,
    Globe,
    Bug,
    Terminal
} from 'lucide-react';
import Link from 'next/link';

const Header = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeInteraction, setActiveInteraction] = useState(null);
    const [date, setDate] = useState(new Date());
    const [otp, setOtp] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const dateInterval = setInterval(() => setDate(new Date()), 1000);
        const generateOTP = () => {
            const otpDigits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
            setOtp(otpDigits);
        };
        generateOTP();
        const otpInterval = setInterval(generateOTP, 30000);
        return () => {
            clearInterval(dateInterval);
            clearInterval(otpInterval);
        };
    }, []);

    const formatMacOSDate = (date: Date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
        const dayOfMonth = date.getDate();
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${dayName} ${monthName} ${dayOfMonth} ${hours}:${minutes} ${ampm}`;
    };

    const [musicInfo, setMusicInfo] = useState({
        title: "Midnight Memories",
        artist: "One Direction",
        isPlaying: false
    });

    const islandVariants = {
        default: { width: "10%", transition: { duration: 0.3 } },
        expanded: { width: "24%", transition: { duration: 0.3 } }
    };

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }
    };

    const toggleMusicPlayback = () => {
        setMusicInfo(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
        // @ts-ignore
        setActiveInteraction('music');
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setActiveInteraction(null);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-20">
                <div className="bg-black/40 text-white flex justify-between items-start px-4 py-1 relative">
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 w-44 h-16 rounded-b-lg' />
                    
                    {/* Signature Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="p-1">
                            <img 
                                src="/signature.png" 
                                alt="Shubham Gupta Signature" 
                                className="h-12 w-auto filter -rotate-12 brightness-0 invert"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={toggleMobileMenu} 
                            className="hover:bg-white/20 rounded-full p-2"
                        >
                            <MenuIcon size={20} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Social Icons and Date - Hidden on Mobile */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <a href="https://github.com/hackerspider1" target="_blank" className="hover:bg-white/20 rounded-full p-1">
                                <Github size={18} strokeWidth={1.5} />
                            </a>
                            <a href="https://instagram.com/hackerspider1" target="_blank" className="hover:bg-white/20 rounded-full p-1">
                                <Instagram size={18} strokeWidth={1.5} />
                            </a>
                            <a href="https://twitter.com/hackerspider1" target="_blank" className="hover:bg-white/20 rounded-full p-1">
                                <Twitter size={18} strokeWidth={1.5} />
                            </a>
                            <a href="https://telegram.org/hackerspider1" target="_blank" className="hover:bg-white/20 rounded-full p-1">
                                <TelegramIcon size={18} strokeWidth={1.5} />
                            </a>
                            <a href="https://discord.gg/QTRjdpxFTE" target="_blank" className="hover:bg-white/20 rounded-full p-1">
                                <DiscordIcon size={18} strokeWidth={1.5} />
                            </a>
                        </div>
                        <div className="text-white text-sm font-mono">
                            {formatMacOSDate(date)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Side Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        
                        {/* Side Menu Panel */}
                        <motion.div 
                            className="fixed right-0 top-0 bottom-0 w-64 bg-zinc-900/90 backdrop-blur-md z-50 md:hidden border-l border-zinc-800/50 p-6"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-lg font-medium text-white">Menu</h2>
                                <button 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-white hover:bg-white/10 rounded-full p-1"
                                >
                                    <CloseIcon size={20} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="mb-8">
                                <ul className="space-y-4">
                                    <li>
                                        <Link href="/" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            About Me
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/resume" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            Resume
                                        </Link>
                                    </li>
                                    
                                    {/* Tools Section */}
                                    <li className="pt-2">
                                        <h3 className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wider pl-1">Security Tools</h3>
                                        <ul className="space-y-2 border-l border-zinc-700/50 pl-3">
                                            <li>
                                                <Link 
                                                    href="/resources/cors-poc-generator" 
                                                    className="text-white hover:text-blue-400 flex items-center gap-2 py-1 text-sm" 
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <Globe size={14} className="text-blue-400" />
                                                    CORS POC Generator
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href="/resources/xss-scanner" 
                                                    className="text-white hover:text-blue-400 flex items-center gap-2 py-1 text-sm" 
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <ShieldAlert size={14} className="text-blue-400" />
                                                    XSS Scanner
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href="/resources/clickjacking" 
                                                    className="text-white hover:text-blue-400 flex items-center gap-2 py-1 text-sm" 
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <Bug size={14} className="text-blue-400" />
                                                    Clickjacking Tester
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href="/resources/red-team-cheatsheet" 
                                                    className="text-white hover:text-blue-400 flex items-center gap-2 py-1 text-sm" 
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <Terminal size={14} className="text-blue-400" />
                                                    Red Team Cheatsheet
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                    <li className="pt-1">
                                        <Link href="/contact" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/what-is-hacking" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            What is Hacking?
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* Social Links */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-white mb-3">Connect</h3>
                                <div className="flex items-center gap-3">
                                    <a href="https://github.com/hackerspider1" target="_blank" className="hover:bg-white/20 rounded-full p-2 text-white">
                                        <Github size={18} strokeWidth={1.5} />
                                    </a>
                                    <a href="https://instagram.com/hackerspider1" target="_blank" className="hover:bg-white/20 rounded-full p-2 text-white">
                                        <Instagram size={18} strokeWidth={1.5} />
                                    </a>
                                    <a href="https://twitter.com/hackerspider1" target="_blank" className="hover:bg-white/20 rounded-full p-2 text-white">
                                        <Twitter size={18} strokeWidth={1.5} />
                                    </a>
                                    <a href="https://telegram.org/hackerspider1" target="_blank" className="hover:bg-white/20 rounded-full p-2 text-white">
                                        <TelegramIcon size={18} strokeWidth={1.5} />
                                    </a>
                                    <a href="https://discord.gg/QTRjdpxFTE" target="_blank" className="hover:bg-white/20 rounded-full p-2 text-white">
                                        <DiscordIcon size={18} strokeWidth={1.5} />
                                    </a>
                                </div>
                            </div>

                            {/* Date and Time */}
                            <div className="py-2 px-3 bg-zinc-800/50 rounded-lg text-center">
                                <div className="text-white text-sm font-mono">
                                    {formatMacOSDate(date)}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;