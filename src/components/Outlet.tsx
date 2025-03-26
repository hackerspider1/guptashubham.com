import React from 'react'
import { FloatingDock } from './ui/floating-dock'

import { House, Info, Article, Briefcase, Book, Phone, Terminal } from "phosphor-react"
import Copyright from './ui/copyright'
import Header from './ui/header'
import LoadingScreen from './ui/loading'

const MenuItems = [
    {
        title: 'Home',
        icon: <House size={24} />,
        href: '/'
    },
    {
        title: 'About Me',
        icon: <Info size={24} />,
        href: '/about'
    },
    {
        title: 'Blogs',
        icon: <Article size={24} />,
        href: '/blogs'
    },
    {
        title: 'Resume',
        icon: <Briefcase size={24} />,
        href: '/resume'
    },
    {
        title: 'Resources',
        icon: <Book size={24} />,
        href: '/resources'
    },
    {
        title: 'POC Generator',
        icon: <Terminal size={24} />,
        href: '/resources/cors-poc-generator'
    },
    {
        title: 'Contact',
        icon: <Phone size={24} />,
        href: '/contact'
    }
]

const Outlet = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen pt-16 h-full flex flex-col flex-1'>
            <LoadingScreen />
            <div className='flex items-center justify-center'>
                <Header />
            </div>
            {children}
            <div className='fixed bottom-6 left-0 right-0 flex items-center justify-center z-20'>
                <FloatingDock items={MenuItems} />
            </div>
            {/* <div className='fixed bottom-0 left-0 right-0 flex items-center justify-center'>
                <Copyright />
            </div> */}
        </div>
    )
}

export default Outlet
