"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'prominent' | 'card' | 'button' | 'header' | 'modal';
  morphOnHover?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  [key: string]: any;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = '',
  variant = 'default',
  morphOnHover = true,
  intensity = 'medium',
  rounded = 'lg',
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Apple Liquid Glass variants based on official design system
  const glassVariants = {
    default: 'bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12]',
    subtle: 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]',
    prominent: 'bg-white/[0.08] backdrop-blur-3xl border border-white/[0.15]',
    card: 'bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08]',
    button: 'bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12]',
    header: 'bg-black/[0.7] backdrop-blur-2xl border border-white/[0.1]',
    modal: 'bg-white/[0.08] backdrop-blur-3xl border border-white/[0.15]'
  };

  // Intensity levels for glass effects
  const intensityLevels = {
    low: {
      reflection: 'from-white/[0.08] via-white/[0.02] to-transparent',
      specular: 'from-white/[0.06] via-transparent to-white/[0.01]',
      edge: 'via-white/[0.15]',
      refraction: 'from-blue-500/[0.01] via-transparent to-purple-500/[0.01]'
    },
    medium: {
      reflection: 'from-white/[0.12] via-white/[0.03] to-transparent',
      specular: 'from-white/[0.08] via-transparent to-white/[0.02]',
      edge: 'via-white/[0.25]',
      refraction: 'from-blue-500/[0.02] via-transparent to-purple-500/[0.02]'
    },
    high: {
      reflection: 'from-white/[0.15] via-white/[0.05] to-transparent',
      specular: 'from-white/[0.12] via-transparent to-white/[0.03]',
      edge: 'via-white/[0.3]',
      refraction: 'from-blue-500/[0.03] via-transparent to-purple-500/[0.03]'
    }
  };

  // Rounded corner styles
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  };

  const currentIntensity = intensityLevels[intensity];

  return (
    <motion.div
      className={cn(
        glassVariants[variant],
        roundedStyles[rounded],
        'relative overflow-hidden group',
        className
      )}
      onHoverStart={() => morphOnHover && setIsHovered(true)}
      onHoverEnd={() => morphOnHover && setIsHovered(false)}
      animate={morphOnHover ? {
        scale: isHovered ? 1.02 : 1,
        rotateX: isHovered ? 1 : 0,
        rotateY: isHovered ? 0.5 : 0,
      } : {}}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] // Apple's signature easing
      }}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: isHovered && morphOnHover
          ? '0 25px 80px 0 rgba(31,38,135,0.4), 0 0 0 1px rgba(255,255,255,0.1)'
          : '0 8px 32px 0 rgba(31,38,135,0.25)'
      }}
      {...props}
    >
      {/* Apple Liquid Glass: Multiple layered reflections */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentIntensity.reflection} opacity-70 pointer-events-none`}
        animate={{
          opacity: isHovered && morphOnHover ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Specular highlights - dynamic based on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered && morphOnHover
            ? `linear-gradient(135deg, ${currentIntensity.specular.replace('from-', 'rgba(255,255,255,0.1) 0%, transparent 30%, ').replace('to-', 'rgba(255,255,255,0.05) 100%')})`
            : `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)`
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Content-informed adaptive layer */}
      <div className={`absolute inset-[1px] bg-gradient-to-br from-white/[0.06] via-transparent to-transparent rounded-[inherit] pointer-events-none`} />

      {/* Apple's signature edge highlights */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        animate={{
          background: isHovered && morphOnHover
            ? `linear-gradient(90deg, transparent 0%, ${currentIntensity.edge} 50%, transparent 100%)`
            : `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)`
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.2] via-transparent to-transparent pointer-events-none" />

      {/* Refraction simulation - subtle color shift */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentIntensity.refraction} opacity-50 pointer-events-none`}
        animate={{
          opacity: isHovered && morphOnHover ? 0.7 : 0.5,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Dynamic morphing overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none"
      />

      {children}
    </motion.div>
  );
};

export default LiquidGlass; 