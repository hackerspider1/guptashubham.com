"use client";

import React, { useState, useEffect } from 'react'
import { FloatingDock } from './ui/floating-dock'

import { House, Info, Article, Briefcase, Book, Phone, Terminal, GithubLogo } from "phosphor-react"
import Copyright from './ui/copyright'
import Header from './ui/header'
import LoadingScreen from './ui/loading'
import { Mail, Twitter, User } from 'lucide-react'

const MenuItems = [
    {
        title: 'Home',
        icon: <House size={24} />,
        href: '/'
    },
    {
        title: 'About Me',
        icon: <User size={24} />,
        href: '/about'
    },
    {
        title: 'Blog',
        icon: <Article size={24} />,
        href: '/blog'
    },
    {
        title: 'Resume',
        icon: <Briefcase size={24} />,
        href: '/resume'
    },
    // {
    //     title: 'Resources',
    //     icon: <Book size={24} />,
    //     href: '/resources'
    // },
    {
        title: 'Cors POC Generator',
        icon: <div className='flex flex-col items-center '>
            <span className='text-[6px] uppercase'>Cors</span>
            <Terminal size={14} />
        </div>,
        href: '/resources/cors-poc-generator'
    },
    {
        title: 'Contact',
        icon: <Mail size={24} />,
        href: '/contact'
    },
    {
        title: 'Github',
        icon: <GithubLogo size={24} />,
        href: 'https://github.com/hackerspider1'
    },
    {
        title: 'Twitter',
        icon: <Twitter size={24} />,
        href: 'https://twitter.com/hackerspider1'
    }
]

const Outlet = ({ children }: { children: React.ReactNode }) => {
    const [showLoader, setShowLoader] = useState(true);
    
    useEffect(() => {
        // Check if this is first visit
        const hasVisited = localStorage.getItem('visited') === 'true';
        if (hasVisited) {
            setShowLoader(false);
        } else {
            // Set visited flag for future visits
            localStorage.setItem('visited', 'true');
        }
    }, []);
    
    return (
        <div className='min-h-screen pt-16 h-full flex flex-col flex-1'>
            {showLoader && <LoadingScreen />}
            <div className='flex items-center justify-center'>
                <Header />
            </div>
            {children}
            <div className='pb-20' />
            {/* Floating dock - hidden on mobile, shown on desktop */}
            <div className='hidden md:flex fixed bottom-6 left-0 right-0 items-center justify-center z-20'>
                <FloatingDock items={MenuItems} />
            </div>
            {/* <div className='fixed bottom-0 left-0 right-0 flex items-center justify-center'>
                <Copyright />
            </div> */}
        </div>
    )
}

export default Outlet
