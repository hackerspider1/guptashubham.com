'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState, useEffect, useRef } from 'react';

// What I Do activities/skills
const skillTypes = [
  {
    id: 1,
    title: "Penetration Testing",
    description: "Comprehensive security assessments for web/mobile applications and networks",
    color: "blue",
    position: { top: "10%", right: "10%" },
    mobilePosition: { top: "5%", right: "5%" },
    angle: "-5deg",
    delay: 0.5,
    direction: "right",
    connectionPoint: { x: "85%", y: "25%" },
    bodyPart: "head"
  },
  {
    id: 2,
    title: "Bug Bounty Hunting",
    description: "Ranked bug bounty hunter with proven track record",
    color: "green",
    position: { bottom: "15%", right: "12%" },
    mobilePosition: { bottom: "25%", right: "5%" },
    angle: "8deg",
    delay: 1.2,
    direction: "right",
    connectionPoint: { x: "80%", y: "60%" },
    bodyPart: "right-hand"
  },
  {
    id: 3,
    title: "Security Research",
    description: "Deep dive into application security and vulnerability research",
    color: "purple",
    position: { top: "20%", left: "10%" },
    mobilePosition: { top: "35%", left: "5%" },
    angle: "-8deg",
    delay: 1.9,
    direction: "left",
    connectionPoint: { x: "15%", y: "30%" },
    bodyPart: "left-hand"
  },
  {
    id: 4,
    title: "CTF Player",
    description: "Active participant in web and mobile CTF challenges",
    color: "red",
    position: { bottom: "25%", left: "12%" },
    mobilePosition: { bottom: "5%", left: "5%" },
    angle: "5deg",
    delay: 2.3,
    direction: "left",
    connectionPoint: { x: "20%", y: "65%" },
    bodyPart: "chest"
  }
];

export default function SplineSceneShowcase() {
  // Animation state for typing effect
  const [typedText, setTypedText] = useState("");
  const fullText = "What I Do?";
  const [subTypedText, setSubTypedText] = useState("");
  const subFullText = "";
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isSubTypingComplete, setIsSubTypingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll
  const robotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);
  const robotRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Reset and replay typing animation when scrolled into view
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      if (value > 0.1 && value < 0.9) {
        // Only restart if typing is complete or not started
        if (isTypingComplete || typedText === "") {
          restartTypingAnimation();
        }
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, isTypingComplete, typedText]);
  
  // Typing animation effect with better stability
  const restartTypingAnimation = () => {
    setIsTypingComplete(false);
    setIsSubTypingComplete(false);
    setTypedText("");
    setSubTypedText("");
    
    let currentIndex = 0;
    const mainTypingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(mainTypingInterval);
        setIsTypingComplete(true);
        
        // Start subtitle typing after main title completes
        let subIndex = 0;
        const subTypingInterval = setInterval(() => {
          if (subIndex <= subFullText.length) {
            setSubTypedText(subFullText.substring(0, subIndex));
            subIndex++;
          } else {
            clearInterval(subTypingInterval);
            setIsSubTypingComplete(true);
          }
        }, 70);
      }
    }, 80);
    
    return () => {
      clearInterval(mainTypingInterval);
    };
  };
  
  // Initial typing animation on mount
  useEffect(() => {
    restartTypingAnimation();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[700px] sm:h-[800px] md:h-[900px] overflow-visible">
      {/* Multiple spotlights with wider coverage */}
      <Spotlight
        className="-top-20 left-1/4"
        fill="blue"
        size={600}
      />
      <Spotlight
        className="top-60 right-1/4"
        fill="purple"
        size={550}
      />
      
      {/* Subtle grid lines across the entire section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181810_1px,transparent_1px),linear-gradient(to_bottom,#18181810_1px,transparent_1px)] bg-[size:38px_38px]"></div>

      {/* Full-width content layout with better spacing */}
      <div className="w-full h-full max-w-[1440px] mx-auto relative px-2 sm:px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] h-full gap-4 lg:gap-16">
          {/* Content positioned on left half with more spacing */}
          <div className="relative z-10 flex flex-col justify-center pt-8 sm:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8 }}
              style={{ opacity: textOpacity }}
              className="w-full max-w-lg"
            >
              <div className="inline-flex items-center space-x-2 mb-4 sm:mb-6 bg-blue-900/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">Security Researcher & Bug Hunter</span>
              </div>
              
              {/* Fixed-width container to prevent layout shifts */}
              <div className="min-h-[3rem] sm:min-h-[4rem] lg:min-h-[5rem] w-full overflow-visible">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100 leading-tight whitespace-pre break-normal">
                  {typedText}<span className="animate-pulse">|</span>
                </h2>
              </div>
              
              {/* Subtitle - now empty */}
              <div className="mb-4 sm:mb-6 h-6 sm:h-8">
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-400/90">
                  {subTypedText}<span className={`animate-pulse ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h3>
              </div>
              
              <p className="mt-2 sm:mt-4 text-zinc-400 max-w-lg text-sm sm:text-base">
                Ranked bug bounty hunter and security researcher with expertise 
                in identifying critical vulnerabilities. Specializing in web application security, 
                network penetration testing, and security research.
              </p>

              <div className="mt-6 sm:mt-10 space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4 group">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-zinc-800/70 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-900/30 transition-all duration-300">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-blue-400 group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div className="text-zinc-300 text-xs sm:text-sm md:text-base group-hover:text-blue-400 transition-colors duration-300">600+ Hall of Fame recognitions</div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 group">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-zinc-800/70 backdrop-blur-sm flex items-center justify-center group-hover:bg-green-900/30 transition-all duration-300">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400 group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div className="text-zinc-300 text-xs sm:text-sm md:text-base group-hover:text-green-400 transition-colors duration-300">1337+ Bugs reported successfully</div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 group">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-zinc-800/70 backdrop-blur-sm flex items-center justify-center group-hover:bg-purple-900/30 transition-all duration-300">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-purple-400 group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div className="text-zinc-300 text-xs sm:text-sm md:text-base group-hover:text-purple-400 transition-colors duration-300">50+ Security projects completed</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3D Model - positioned with more space */}
          <motion.div 
            className="relative h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            {/* Model container with more space for hand visibility */}
            <motion.div 
              className="relative w-full h-full max-w-[700px] mx-auto"
              style={{ 
                scale: robotScale,
                rotateY: robotRotate
              }}
            >
              {/* Position robot better to avoid hand cutoff */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] sm:w-[85%] md:w-[90%] h-[80%] sm:h-[85%] md:h-[90%]">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              {/* Platform shadow effect */}
              <div className="absolute bottom-10 left-0 right-0 h-16 mx-auto w-[60%] bg-black/10 blur-xl rounded-full"></div>
              
              {/* Animated pointers for different skills */}
              {skillTypes.map((skill) => (
                <motion.div
                  key={skill.id}
                  className="absolute z-30"
                  style={{ 
                    ...(isMobile
                      ? {
                          ...(skill.mobilePosition.top && { top: skill.mobilePosition.top }),
                          ...(skill.mobilePosition.bottom && { bottom: skill.mobilePosition.bottom }),
                          ...(skill.mobilePosition.left && { left: skill.mobilePosition.left }),
                          ...(skill.mobilePosition.right && { right: skill.mobilePosition.right })
                        }
                      : {
                          ...(skill.position.top && { top: skill.position.top }),
                          ...(skill.position.bottom && { bottom: skill.position.bottom }),
                          ...(skill.position.left && { left: skill.position.left }),
                          ...(skill.position.right && { right: skill.position.right })
                        }
                    ),
                    transform: `rotate(${skill.angle})`,
                    perspective: "1000px"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ 
                    delay: skill.delay, 
                    duration: 0.8,
                    ease: "easeOut" 
                  }}
                  onHoverStart={() => setActiveSkill(skill.id)}
                  onHoverEnd={() => setActiveSkill(null)}
                >
                  {/* Enhanced 3D connector system */}
                  <div className="relative">
                    {/* 3D floating info card with improved positioning */}
                    <motion.div
                      className={`absolute z-10 ${skill.direction === "right" 
                        ? `${isMobile ? "-left-[110px] -translate-y-1/2" : "-left-40 -translate-y-1/2"}` 
                        : `${isMobile ? "-right-[110px] -translate-y-1/2" : "-right-40 -translate-y-1/2"}`}`}
                      initial={{ rotateX: 15, rotateY: skill.direction === "right" ? -5 : 5 }}
                      animate={{ 
                        rotateX: [15, 10, 15],
                        rotateY: skill.direction === "right" ? [-5, -8, -5] : [5, 8, 5],
                        z: [-5, 5, -5]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    >
                      {/* Enhanced 3D floating card design with mobile optimizations */}
                      <div 
                        className={`p-2 px-3 sm:p-3 sm:px-4 rounded-md backdrop-blur-md ${isMobile ? "min-w-[110px]" : "min-w-[220px]"} transform ${
                          skill.color === "blue" ? "bg-blue-950/30 border-l-2 border-blue-500/50" : 
                          skill.color === "green" ? "bg-green-950/30 border-l-2 border-green-500/50" : 
                          skill.color === "purple" ? "bg-purple-950/30 border-l-2 border-purple-500/50" :
                          "bg-red-950/30 border-l-2 border-red-500/50"
                        } ${activeSkill === skill.id ? 'ring-1 ring-opacity-50 ring-' + 
                          (skill.color === "blue" ? "blue-400" : 
                          skill.color === "green" ? "green-400" : 
                          skill.color === "purple" ? "purple-400" : 
                          "red-400") : ''}`}
                        style={{ 
                          boxShadow: `0 10px 25px -10px ${
                            skill.color === "blue" ? "rgba(59, 130, 246, 0.3)" : 
                            skill.color === "green" ? "rgba(34, 197, 94, 0.3)" : 
                            skill.color === "purple" ? "rgba(168, 85, 247, 0.3)" :
                            "rgba(239, 68, 68, 0.3)"
                          }`,
                          transform: `perspective(1000px) rotateX(${activeSkill === skill.id ? '5deg' : '0deg'}) scale(${activeSkill === skill.id ? 1.05 : 1})`,
                          transformStyle: "preserve-3d"
                        }}
                      >
                        <div className={`flex items-center text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-1 ${
                          skill.color === "blue" ? "text-blue-400" : 
                          skill.color === "green" ? "text-green-400" : 
                          skill.color === "purple" ? "text-purple-400" :
                          "text-red-400"
                        }`}>
                          <div className={`h-[2px] w-3 sm:w-4 mr-2 ${
                            skill.color === "blue" ? "bg-blue-400" : 
                            skill.color === "green" ? "bg-green-400" : 
                            skill.color === "purple" ? "bg-purple-400" :
                            "bg-red-400"
                          }`}></div>
                          {skill.title}
                        </div>
                        <div className="text-zinc-300 text-[9px] sm:text-xs leading-tight">{skill.description}</div>
                        
                        {/* Add subtle 3D elements to card */}
                        <div 
                          className="absolute inset-0 rounded-md opacity-30"
                          style={{ 
                            background: `radial-gradient(circle at ${skill.direction === "right" ? "left" : "right"} top, ${
                              skill.color === "blue" ? "rgba(59, 130, 246, 0.1)" : 
                              skill.color === "green" ? "rgba(34, 197, 94, 0.1)" : 
                              skill.color === "purple" ? "rgba(168, 85, 247, 0.1)" :
                              "rgba(239, 68, 68, 0.1)"
                            }, transparent 70%)`,
                            pointerEvents: "none"
                          }}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Enhanced connecting line system with mobile optimization */}
                    <div className="relative">
                      {/* Extended main line with 3D effect - shorter on mobile */}
                      <motion.div 
                        className={`h-[1px] absolute top-1/2 ${skill.direction === "right" ? "right-full" : "left-full"}`}
                        style={{
                          width: isMobile ? "60px" : "150px",
                          background: `linear-gradient(${skill.direction === "right" ? "to left" : "to right"}, ${
                            skill.color === "blue" ? "rgba(59, 130, 246, 0.8)" : 
                            skill.color === "green" ? "rgba(34, 197, 94, 0.8)" : 
                            skill.color === "purple" ? "rgba(168, 85, 247, 0.8)" :
                            "rgba(239, 68, 68, 0.8)"
                          }, transparent)`,
                          transformStyle: "preserve-3d",
                          transform: `translateZ(4px) rotate(${skill.angle})`,
                          transformOrigin: skill.direction === "right" ? "right center" : "left center"
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ 
                          delay: skill.delay + 0.3, 
                          duration: 0.5 
                        }}
                      />
                      
                      {/* Enhanced 3D connection point with zoom effect - smaller on mobile */}
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 ${skill.direction === "right" ? "-right-1.5" : "-left-1.5"}`}
                        style={{
                          transform: `rotate(${skill.angle})`,
                          transformOrigin: skill.direction === "right" ? "right center" : "left center"
                        }}
                      >
                        <motion.div 
                          className={`relative ${isMobile ? "h-2.5 w-2.5" : "h-4 w-4"} rounded-full ${
                            skill.color === "blue" ? "bg-blue-400" : 
                            skill.color === "green" ? "bg-green-400" : 
                            skill.color === "purple" ? "bg-purple-400" :
                            "bg-red-400"
                          }`}
                          animate={{ 
                            opacity: [0.6, 1, 0.6],
                            scale: activeSkill === skill.id ? [1, 1.4, 1] : [1, 1, 1]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            transformStyle: "preserve-3d",
                            transform: "translateZ(6px)"
                          }}
                        >
                          {/* Inner glow effect */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              boxShadow: `0 0 ${isMobile ? "6px" : "12px"} ${
                                skill.color === "blue" ? "rgba(59, 130, 246, 0.6)" : 
                                skill.color === "green" ? "rgba(34, 197, 94, 0.6)" : 
                                skill.color === "purple" ? "rgba(168, 85, 247, 0.6)" :
                                "rgba(239, 68, 68, 0.6)"
                              }`
                            }}
                            animate={{ 
                              boxShadow: [
                                `0 0 ${isMobile ? "4px" : "8px"} ${
                                  skill.color === "blue" ? "rgba(59, 130, 246, 0.3)" : 
                                  skill.color === "green" ? "rgba(34, 197, 94, 0.3)" : 
                                  skill.color === "purple" ? "rgba(168, 85, 247, 0.3)" :
                                  "rgba(239, 68, 68, 0.3)"
                                }`,
                                `0 0 ${isMobile ? "8px" : "16px"} ${
                                  skill.color === "blue" ? "rgba(59, 130, 246, 0.7)" : 
                                  skill.color === "green" ? "rgba(34, 197, 94, 0.7)" : 
                                  skill.color === "purple" ? "rgba(168, 85, 247, 0.7)" :
                                  "rgba(239, 68, 68, 0.7)"
                                }`,
                                `0 0 ${isMobile ? "4px" : "8px"} ${
                                  skill.color === "blue" ? "rgba(59, 130, 246, 0.3)" : 
                                  skill.color === "green" ? "rgba(34, 197, 94, 0.3)" : 
                                  skill.color === "purple" ? "rgba(168, 85, 247, 0.3)" :
                                  "rgba(239, 68, 68, 0.3)"
                                }`
                              ]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          />
                          
                          {/* Inner point for more 3D effect - smaller on mobile */}
                          <div 
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? "h-0.5 w-0.5" : "h-1.5 w-1.5"} rounded-full bg-white opacity-80`}
                            style={{
                              boxShadow: `0 0 ${isMobile ? "2px" : "4px"} white`
                            }}
                          />
                        </motion.div>
                        
                        {/* Add outer glow ring - smaller on mobile */}
                        <div 
                          className={`absolute ${isMobile ? "-inset-0.5" : "-inset-1"} rounded-full opacity-30`}
                          style={{
                            background: `radial-gradient(circle, ${
                              skill.color === "blue" ? "rgba(59, 130, 246, 0.4)" : 
                              skill.color === "green" ? "rgba(34, 197, 94, 0.4)" : 
                              skill.color === "purple" ? "rgba(168, 85, 247, 0.4)" :
                              "rgba(239, 68, 68, 0.4)"
                            }, transparent 70%)`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Adding 3D depth effect */}
            <div className="absolute inset-0 bg-black/5 blur-2xl rounded-full opacity-20 pointer-events-none"></div>
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.05) 100%)'
              }}
            ></div>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile-specific tap instructions */}
      <div className="md:hidden absolute bottom-6 left-0 right-0 text-center text-xs text-zinc-500">
        <p>Tap on the pointers to learn more</p>
      </div>
    </div>
  );
} 