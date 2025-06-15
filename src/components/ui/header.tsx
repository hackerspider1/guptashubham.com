"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Instagram,
    X,
    Send as TelegramIcon,
    MessageCircle as DiscordIcon,
    Menu as MenuIcon,
    X as CloseX,
    ShieldAlert,
    Globe,
    Bug,
    Terminal,
    Award
} from 'lucide-react';
import Link from 'next/link';
import LiquidGlass from './liquid-glass';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-20">
                <LiquidGlass 
                    variant="header" 
                    morphOnHover={false} 
                    intensity="low" 
                    rounded="none"
                    className="text-white flex justify-between items-center px-6 py-2 relative border-b border-white/10"
                >
                    {/* Signature Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="p-1 hover:opacity-80 transition-opacity">
                            <img 
                                src="/signature.png" 
                                alt="Shubham Gupta Signature" 
                                className="h-8 sm:h-10 w-auto filter brightness-0 invert"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={toggleMobileMenu} 
                            className="hover:bg-white/20 rounded-full p-1.5 transition-colors"
                        >
                            <MenuIcon size={18} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Social Icons - Hidden on Mobile */}
                    <div className="hidden md:flex items-center">
                        <LiquidGlass 
                            variant="button" 
                            rounded="full" 
                            intensity="low"
                            className="flex items-center gap-3 px-3 py-1.5"
                        >
                            <a href="https://github.com/hackerspider1" target="_blank" className="hover:bg-white/10 rounded-full p-1.5 transition-colors">
                                <Github size={16} strokeWidth={1.5} className="text-white hover:text-blue-400 transition-colors" />
                            </a>
                            <a href="https://instagram.com/hackerspider1" target="_blank" className="hover:bg-white/10 rounded-full p-1.5 transition-colors">
                                <Instagram size={16} strokeWidth={1.5} className="text-white hover:text-blue-400 transition-colors" />
                            </a>
                            <a href="https://twitter.com/hackerspider1" target="_blank" className="hover:bg-white/10 rounded-full p-1.5 transition-colors">
                                <X size={16} strokeWidth={1.5} className="text-white hover:text-blue-400 transition-colors" />
                            </a>
                            <a href="https://telegram.org/hackerspider1" target="_blank" className="hover:bg-white/10 rounded-full p-1.5 transition-colors">
                                <TelegramIcon size={16} strokeWidth={1.5} className="text-white hover:text-blue-400 transition-colors" />
                            </a>
                            <a href="https://discord.gg/QTRjdpxFTE" target="_blank" className="hover:bg-white/10 rounded-full p-1.5 transition-colors">
                                <DiscordIcon size={16} strokeWidth={1.5} className="text-white hover:text-blue-400 transition-colors" />
                            </a>
                        </LiquidGlass>
                    </div>
                </LiquidGlass>
            </div>

            {/* Mobile Side Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        
                        {/* Side Menu Panel */}
                        <LiquidGlass
                            as={motion.div}
                            variant="modal"
                            morphOnHover={false}
                            intensity="medium"
                            rounded="none"
                            className="fixed right-0 top-0 bottom-0 w-[70%] max-w-[250px] z-50 md:hidden border-l border-zinc-800/50 p-5"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-base font-medium text-white">Menu</h2>
                                <button 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-white hover:bg-white/10 rounded-full p-1"
                                >
                                    <CloseX size={18} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="mb-6">
                                <ul className="space-y-3">
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
                                    <li>
                                        <Link href="/resources/cors-poc-generator" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            CORS POC Generator
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/methodology" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            Interactive Methodology
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-white hover:text-blue-400 block py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* Social Links */}
                            <div className="border-t border-zinc-800/50 pt-4">
                                <h3 className="text-xs font-medium text-zinc-400 mb-3">Connect</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <a href="https://github.com/hackerspider1" target="_blank" className="flex flex-col items-center gap-1 text-white hover:text-blue-400 text-[10px]">
                                        <div className="bg-zinc-800/50 p-2 rounded-full">
                                            <Github size={14} strokeWidth={1.5} />
                                        </div>
                                        <span>GitHub</span>
                                    </a>
                                    <a href="https://twitter.com/hackerspider1" target="_blank" className="flex flex-col items-center gap-1 text-white hover:text-blue-400 text-[10px]">
                                        <div className="bg-zinc-800/50 p-2 rounded-full">
                                            <X size={14} strokeWidth={1.5} />
                                        </div>
                                        <span>X</span>
                                    </a>
                                    <a href="https://instagram.com/hackerspider1" target="_blank" className="flex flex-col items-center gap-1 text-white hover:text-blue-400 text-[10px]">
                                        <div className="bg-zinc-800/50 p-2 rounded-full">
                                            <Instagram size={14} strokeWidth={1.5} />
                                        </div>
                                        <span>Instagram</span>
                                    </a>
                                    <a href="https://telegram.org/hackerspider1" target="_blank" className="flex flex-col items-center gap-1 text-white hover:text-blue-400 text-[10px]">
                                        <div className="bg-zinc-800/50 p-2 rounded-full">
                                            <TelegramIcon size={14} strokeWidth={1.5} />
                                        </div>
                                        <span>Telegram</span>
                                    </a>
                                    <a href="https://discord.gg/QTRjdpxFTE" target="_blank" className="flex flex-col items-center gap-1 text-white hover:text-blue-400 text-[10px]">
                                        <div className="bg-zinc-800/50 p-2 rounded-full">
                                            <DiscordIcon size={14} strokeWidth={1.5} />
                                        </div>
                                        <span>Discord</span>
                                    </a>
                                </div>
                            </div>
                        </LiquidGlass>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;