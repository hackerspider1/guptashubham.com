"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import LiquidGlass from "./liquid-glass";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  glassEffect?: boolean;
  glassVariant?: "default" | "subtle" | "prominent" | "button";
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  isExternal = false,
  leftIcon,
  rightIcon,
  glassEffect = true,
  glassVariant = "button",
  ...props
}: ButtonProps) => {
  const baseStyles = "btn inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantStyles = glassEffect ? {
    primary: "text-white hover:text-blue-100 border-none bg-transparent",
    secondary: "text-white hover:text-gray-100 border-none bg-transparent",
    outline: "text-white/80 hover:text-white border-none bg-transparent",
    ghost: "text-white/70 hover:text-white border-none bg-transparent"
  } : {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border border-transparent rounded-md",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700 border border-transparent rounded-md",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md",
    ghost: "bg-transparent text-blue-600 hover:bg-zinc-900 border border-transparent rounded-md"
  };
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  const allStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );
  
  const content = (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  const buttonContent = glassEffect ? (
    <LiquidGlass
      variant={glassVariant}
      rounded="full"
      intensity="medium"
      className={allStyles}
    >
      {content}
    </LiquidGlass>
  ) : (
    <span className={allStyles}>{content}</span>
  );
  
  if (href) {
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={glassEffect ? "" : allStyles}
      >
        {glassEffect ? buttonContent : content}
      </Link>
    );
  }
  
  return glassEffect ? (
    <LiquidGlass
      as="button"
      variant={glassVariant}
      rounded="full"
      intensity="medium"
      className={allStyles}
      {...props}
    >
      {content}
    </LiquidGlass>
  ) : (
    <button className={allStyles} {...props}>
      {content}
    </button>
  );
};

export default Button; 