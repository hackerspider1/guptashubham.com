"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface EducationCardProps {
  institution: string;
  logo: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  gpa?: string;
  courses?: string[];
  achievements?: string[];
  className?: string;
}

export const EducationCard = ({
  institution,
  logo,
  degree,
  field,
  period,
  location,
  gpa,
  courses,
  achievements,
  className = "",
}: EducationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "relative bg-zinc-900 border border-zinc-800 rounded-lg p-6 transition-all hover:shadow-lg hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {logo && (
          <div className="flex-shrink-0 h-12 w-12 relative rounded-md overflow-hidden bg-zinc-800">
            <Image
              src={logo}
              alt={institution}
              fill
              className="object-contain p-1"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">{institution}</h3>
          <p className="text-lg text-zinc-300 mt-1">
            {degree} in {field}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 text-sm text-zinc-400 mt-1">
            <span>{period}</span>
            <span className="text-zinc-700">•</span>
            <span>{location}</span>
            {gpa && (
              <>
                <span className="text-zinc-700">•</span>
                <span>GPA: {gpa}</span>
              </>
            )}
          </div>
          
          {(courses || achievements) && (
            <div className="mt-4 space-y-3">
              {courses && courses.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-zinc-300 mb-1">Relevant Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {courses.map((course, index) => (
                      <span
                        key={index}
                        className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {achievements && achievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-zinc-300 mb-1">Achievements</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-zinc-400">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 