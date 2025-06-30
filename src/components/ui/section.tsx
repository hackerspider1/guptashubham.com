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
  paddingY = "md",
}: SectionProps) => {
  const backgroundStyles = {
    default: "bg-black",
    alt: "bg-zinc-900",
    gradient: "bg-gradient-to-b from-black to-zinc-900",
    transparent: "bg-transparent",
  };

  const paddingStyles = {
    none: "py-0",
    sm: "py-3 sm:py-4 md:py-6",
    md: "py-4 sm:py-6 md:py-8",
    lg: "py-6 sm:py-8 md:py-12",
    xl: "py-8 sm:py-12 md:py-16",
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
    <div className={cn("text-center mb-3 sm:mb-4 md:mb-6", className)}>
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
    <h2 className={cn("text-2xl md:text-3xl font-bold text-white mb-3", className)}>
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
    <p className={cn("text-base text-zinc-400 max-w-2xl mx-auto", className)}>
      {children}
    </p>
  );
}; 