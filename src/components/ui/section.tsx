"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "alt" | "gradient" | "transparent";
  paddingY?: "sm" | "md" | "lg" | "xl" | "none";
}

export const Section = ({
  children,
  className = "",
  id,
  background = "default",
  paddingY = "lg",
}: SectionProps) => {
  const backgroundStyles = {
    default: "bg-black",
    alt: "bg-zinc-900",
    gradient: "bg-gradient-to-b from-black to-zinc-900",
    transparent: "bg-transparent",
  };

  const paddingStyles = {
    none: "py-0",
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24",
  };

  return (
    <section
      id={id}
      className={cn(
        backgroundStyles[background],
        paddingStyles[paddingY],
        "w-full",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
};

export const SectionHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      {children}
    </div>
  );
};

export const SectionTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-white mb-4", className)}>
      {children}
    </h2>
  );
};

export const SectionDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-lg text-zinc-400 max-w-3xl mx-auto", className)}>
      {children}
    </p>
  );
}; 