"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Instagram,
    Twitter,
    Send as TelegramIcon,
    MessageCircle as DiscordIcon,
} from 'lucide-react';

const Header = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeInteraction, setActiveInteraction] = useState(null);
    const [date, setDate] = useState(new Date());
    const [otp, setOtp] = useState('');

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

    return (
        <>
            <div className="w-full flex justify-center fixed top-4 z-20">
                <motion.div
                    variants={islandVariants}
                    animate={isHovered ? "expanded" : "default"}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="bg-neutral-900/80 backdrop-blur-md rounded-3xl flex items-center justify-between px-6 transition-all duration-300 ease-in-out overflow-hidden"
                >
                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: isHovered ? 0.5 : 1, x: isHovered ? -10 : 0 }}
                        className="flex items-center gap-2 pt-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                    </motion.div>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                key="centered-content"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={contentVariants}
                                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center"
                            >
                                <div className="text-white text-sm font-medium">
                                    {activeInteraction === 'music' ? (
                                        <>
                                            <div>{musicInfo.title}</div>
                                            <div className="text-xs text-neutral-400">{musicInfo.artist}</div>
                                        </>
                                    ) : (
                                        "Shubham Gupta"
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: isHovered ? 0.5 : 1, x: isHovered ? 10 : 0 }}
                        onClick={toggleMusicPlayback}
                        className="cursor-pointer"
                    >
                        <div className='w-6 h-6 relative'>
                            <svg style={{ width: "100%", height: "100%", transformOrigin: "50% 50%" }}>
                                <g style={{ transform: "translateX(2.5px) translateY(3.5px)" }}>
                                    <circle
                                        cx="9"
                                        cy="9"
                                        r="9"
                                        fill="none"
                                        stroke="rgb(48, 50, 54)"
                                        strokeWidth="3"
                                        strokeDasharray="69.11503837897544"
                                    />
                                    <motion.circle
                                        cx="9"
                                        cy="9"
                                        r="9"
                                        fill="none"
                                        stroke="rgb(127, 129, 136)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray="69.11503837897544"
                                        animate={{ strokeDashoffset: musicInfo.isPlaying ? 0 : 69.115 }}
                                        transition={{ duration: 0.5, type: "tween" }}
                                    />
                                </g>
                            </svg>
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                                animate={{ scale: musicInfo.isPlaying ? 1 : 0, opacity: musicInfo.isPlaying ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {musicInfo.isPlaying ? '❚❚' : '▶'}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            
            <div className="fixed top-0 left-0 right-0 z-20">
                <div className="bg-black/40 text-white flex justify-between items-center px-4 py-1 relative">
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 w-44 h-16 rounded-b-lg' />
                    
                    {/* Signature Logo */}
                    <div className="flex items-center">
                        <a href="#" className="hover:bg-white/20 rounded-lg p-1 transition-all">
                            <img 
                                src="/signature.png" 
                                alt="Shubham Gupta Signature" 
                                className="h-6 w-32 filter brightness-0 invert"
                            />
                        </a>
                    </div>

                    {/* Social Icons and Date */}
                    <div className="flex items-center gap-4">
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
        </>
    );
};

export default Header;