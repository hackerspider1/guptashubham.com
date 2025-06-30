"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "glass";
  hover?: boolean;
}

export const Card = ({
  children,
  className = "",
  variant = "default",
  hover = true,
}: CardProps) => {
  const baseStyles = "rounded-lg p-4 transition-all";
  
  const variantStyles = {
    default: "bg-zinc-900 border border-zinc-800",
    outline: "bg-transparent border border-zinc-800",
    glass: "bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50"
  };
  
  const hoverStyles = hover ? "hover:shadow-lg hover:-translate-y-1" : "";
  
  return (
    <div className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}>
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("mb-3", className)}>{children}</div>;
};

export const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("text-lg font-semibold text-white", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-sm text-zinc-400 mt-1", className)}>
      {children}
    </p>
  );
};

export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const CardFooter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mt-3 flex items-center justify-between", className)}>
      {children}
    </div>
  );
};