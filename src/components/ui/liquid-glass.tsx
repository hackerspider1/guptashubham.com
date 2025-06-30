"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'prominent' | 'card' | 'button' | 'header' | 'modal' | 'dock' | 'clean';
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

  // Enhanced Apple Liquid Glass variants with cleaner styling
  const glassVariants = {
    default: 'bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12]',
    subtle: 'bg-black/20 backdrop-blur-xl border border-white/[0.08]',
    prominent: 'bg-black/30 backdrop-blur-3xl border border-white/20',
    card: 'bg-black/20 backdrop-blur-xl border border-white/[0.08]',
    button: 'bg-black/30 backdrop-blur-3xl border border-white/20',
    header: 'bg-black/[0.7] backdrop-blur-2xl border border-white/[0.1]',
    modal: 'bg-black/30 backdrop-blur-3xl border border-white/20',
    dock: 'bg-black/30 backdrop-blur-3xl border border-white/20',
    clean: 'bg-black/5 backdrop-blur-xl border border-white/[0.03]'
  };

  // Enhanced intensity levels for cleaner glass effects
  const intensityLevels = {
    low: {
      reflection: 'from-white/[0.04] via-white/[0.015] to-transparent',
      specular: 'from-white/[0.03] via-transparent to-white/[0.008]',
      edge: 'via-white/[0.08]',
      refraction: 'from-blue-500/[0.005] via-transparent to-purple-500/[0.005]'
    },
    medium: {
      reflection: 'from-white/[0.06] via-white/[0.02] to-transparent',
      specular: 'from-white/[0.04] via-transparent to-white/[0.012]',
      edge: 'via-white/[0.1]',
      refraction: 'from-blue-500/[0.008] via-transparent to-purple-500/[0.008]'
    },
    high: {
      reflection: 'from-white/[0.08] via-white/[0.025] to-transparent',
      specular: 'from-white/[0.05] via-transparent to-white/[0.015]',
      edge: 'via-white/[0.12]',
      refraction: 'from-blue-500/[0.01] via-transparent to-purple-500/[0.01]'
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

  // Enhanced shadow system for cleaner look
  const getShadow = () => {
    if (variant === 'clean') {
      return isHovered && morphOnHover
        ? '0 20px 40px 0 rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)'
        : '0 8px 24px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.04)';
    }
    return isHovered && morphOnHover
      ? '0 25px 80px 0 rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.2)'
      : '0 8px 32px 0 rgba(0,0,0,0.4)';
  };

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
        scale: isHovered ? 1.01 : 1,
        rotateX: isHovered ? 0.5 : 0,
        rotateY: isHovered ? 0.25 : 0,
      } : {}}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] // Apple's signature easing
      }}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: getShadow()
      }}
      {...props}
    >
      {/* Primary glass reflection layer */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentIntensity.reflection} ${variant === 'clean' ? 'opacity-30' : 'opacity-70'} pointer-events-none`}
        animate={{
          opacity: isHovered && morphOnHover ? (variant === 'clean' ? 0.4 : 0.9) : (variant === 'clean' ? 0.3 : 0.7),
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Enhanced specular highlights */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered && morphOnHover
            ? `linear-gradient(135deg, ${currentIntensity.specular.replace('from-', 'rgba(255,255,255,0.06) 0%, transparent 40%, ').replace('to-', 'rgba(255,255,255,0.02) 100%')})`
            : `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.01) 50%, transparent 100%)`
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Clean inner border for premium look */}
      <div className={`absolute inset-[1px] bg-gradient-to-br ${variant === 'clean' ? 'from-white/[0.025] via-transparent to-transparent' : 'from-white/[0.06] via-transparent to-transparent'} rounded-[inherit] pointer-events-none`} />

      {/* Premium edge highlights */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        animate={{
          background: isHovered && morphOnHover
            ? `linear-gradient(90deg, transparent 0%, ${currentIntensity.edge} 50%, transparent 100%)`
            : `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${variant === 'clean' ? '0.04' : '0.15'}) 50%, transparent 100%)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Left edge highlight */}
      <div className={`absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b ${variant === 'clean' ? 'from-white/[0.06] via-transparent to-transparent' : 'from-white/[0.2] via-transparent to-transparent'} pointer-events-none`} />

      {/* Subtle color refraction for depth */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentIntensity.refraction} ${variant === 'clean' ? 'opacity-20' : 'opacity-50'} pointer-events-none`}
        animate={{
          opacity: isHovered && morphOnHover ? (variant === 'clean' ? 0.3 : 0.7) : (variant === 'clean' ? 0.2 : 0.5),
        }}
        transition={{ duration: 0.7 }}
      />

      {/* Dynamic interaction overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br from-transparent ${variant === 'clean' ? 'via-white/[0.008] to-transparent opacity-0 group-hover:opacity-100' : 'via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100'} transition-all duration-600 ease-out pointer-events-none`}
      />

      {children}
    </motion.div>
  );
};

export default LiquidGlass; 