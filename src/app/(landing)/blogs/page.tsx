"use client";

import React from "react";
import Link from "next/link";
import { Calendar, BookOpen, FileText, ArrowRight } from "lucide-react";

const AnimatedBackground = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900 opacity-75 z-0"></div>
);

const GlassCard = ({ children, className = "" }:any) => (
  <div
    className={`
      bg-black bg-opacity-10 backdrop-blur-lg 
      border border-gray-800 border-opacity-20 
      rounded-2xl shadow-2xl 
      transition-all duration-300 
      hover:bg-opacity-15 hover:shadow-3xl 
      ${className}
    `}
  >
    {children}
  </div>
);

const blogs = [
  {
    title: "The Future of Cybersecurity: Trends for 2025",
    excerpt: "An in-depth analysis of upcoming cybersecurity challenges and innovations.",
    date: "March 15, 2025",
    link: "/blog/future-of-cybersecurity",
  },
  {
    title: "Breaking into Bug Bounties: A Guide for Beginners",
    excerpt: "Learn how to start your journey in ethical hacking and bug bounty programs.",
    date: "March 10, 2025",
    link: "/blog/bug-bounty-guide",
  },
  {
    title: "Red Team vs. Blue Team: Understanding Cyber Warfare",
    excerpt: "A deep dive into offensive and defensive cybersecurity strategies.",
    date: "March 5, 2025",
    link: "/blog/red-team-blue-team",
  }
];

export default function BlogHome() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white pb-20">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl w-full px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tight mb-4 bg-clip-text leading-20 text-transparent bg-gradient-to-r from-white via-blue-200 to-white">
            Blog & Insights
          </h1>
          <p className="text-2xl text-gray-300">
            Stay updated with the latest trends in cybersecurity.
          </p>
        </div>
        
        {/* Featured Blog */}
        <GlassCard className="p-8 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Featured Blog</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <BookOpen className="w-12 h-12 text-blue-400 mb-4 md:mr-6" />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">{blogs[0].title}</h3>
              <p className="text-gray-300 text-sm mb-4">{blogs[0].excerpt}</p>
              <p className="text-gray-400 text-xs flex items-center justify-center md:justify-start">
                <Calendar className="w-4 h-4 mr-2" /> {blogs[0].date}
              </p>
              <Link href={blogs[0].link} className="text-blue-400 hover:underline flex items-center mt-4">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </GlassCard>

        {/* Blog Grid */}
        <GlassCard className="p-8">
          <h2 className="text-3xl font-semibold text-center mb-8">Latest Blogs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.slice(1).map((blog, index) => (
              <div key={index} className="flex flex-col bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{blog.excerpt}</p>
                <p className="text-gray-400 text-xs flex items-center">
                  <Calendar className="w-4 h-4 mr-2" /> {blog.date}
                </p>
                <Link href={blog.link} className="text-blue-400 hover:underline flex items-center mt-4">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}