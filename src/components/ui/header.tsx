"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, MusicNotes } from "phosphor-react";

const Header = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { scrollY } = useScroll();

    const height = useTransform(
        scrollY,
        [0, 100],
        ["35px", "35px"]
    );

    const width = useTransform(
        scrollY,
        [0, 100],
        ["10%", "10%"]
    );

    return (
        <div className="w-full flex justify-center fixed top-4 z-10">
            <motion.div
                style={{
                    height,
                    width: isHovered ? "24%" : width,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-neutral-900/80 backdrop-blur-md rounded-3xl flex items-center justify-between px-6 transition-all duration-300 ease-in-out"
            >
                <motion.div
                    initial={false}
                    animate={isHovered ? "visible" : "visible"}
                    variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -20 }
                    }}
                    className="flex items-center gap-2 pt-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                    </svg>

                </motion.div>

                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4"
                    initial={false}
                    animate={isHovered ? "visible" : "hidden"}
                    variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0.8 }
                    }}
                >
                    Shubham Gupta   
                </motion.div>

                <motion.div
                    initial={false}
                    animate={isHovered ? "visible" : "visible"}
                    variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: 20 }
                    }}
                >
                    <div className='w-6 h-6'>
                        <svg
                            style={{
                                width: "100%",
                                height: "100%",
                                transformOrigin: "50% 50%"
                            }}
                        >
                            <g style={{
                                transform: "translateX(2.5px) translateY(3.5px)"
                            }}>
                                <circle
                                    cx="9"
                                    cy="9"
                                    r="9"
                                    fill="none"
                                    stroke="rgb(48, 50, 54)"
                                    strokeWidth="3"
                                    strokeDasharray="69.11503837897544"
                                />
                                <circle
                                    cx="9"
                                    cy="9"
                                    r="9"
                                    fill="none"
                                    stroke="rgb(127, 129, 136)"
                                    strokeWidth="3"
                                    strokeLinecap="butt"
                                    strokeDasharray="69.11503837897544"
                                    style={{
                                        strokeDashoffset: 69.115
                                    }}
                                />
                            </g>
                        </svg>
                    </div>
                    {/* <MusicNotes size={20} className="text-white" /> */}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Header;
