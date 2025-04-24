"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
  ...props
}: ButtonProps) => {
  const baseStyles = "btn inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border border-transparent",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700 border border-transparent",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "bg-transparent text-blue-600 hover:bg-zinc-900 border border-transparent"
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
  
  if (href) {
    return (
      <Link
        href={href}
        className={allStyles}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }
  
  return (
    <button className={allStyles} {...props}>
      {content}
    </button>
  );
};

export default Button; 