"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ExternalLink, Search, Shield, Star, Trophy, X, Calendar, Filter, Users, ChevronRight, FileQuestion, Globe, Tag, Hash, SendIcon, Briefcase, Building2, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Meteors } from '@/components/ui/meteors';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import Image from 'next/image';

interface Company {
  id: string;
  name: string;
  logo: string;
  category: 'tech' | 'financial' | 'healthcare' | 'platform' | 'government' | 'other';
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  year: number;
  vulnerabilities: number;
  url: string;
  featured: boolean;
  tags?: string[];
  description: string;
  vulnerabilityDetails?: string;
}

const HallOfFame = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyDetailsVisible, setCompanyDetailsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [currentSeverity, setCurrentSeverity] = useState<string>('all');
  const [currentYear, setCurrentYear] = useState<string>('all');

  // Sample data
  const companies: Company[] = [
    {
      id: 'google',
      name: 'Google',
      logo: '/logos/hof/google.png',
      category: 'tech',
      tier: 'platinum',
      year: 2015,
      vulnerabilities: 12,
      url: 'http://www.google.com/about/appsecurity/hall-of-fame/distinction/',
      featured: true,
      tags: ['SQL Injection', 'Cross-Site Scripting'],
      description: 'Google has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'apple',
      name: 'Apple',
      logo: '/logos/hof/apple.png',
      category: 'tech',
      tier: 'platinum',
      year: 2022,
      vulnerabilities: 35,
      url: 'https://support.apple.com/en-us/HT201536',
      featured: true,
      tags: ['Authentication Bypass'],
      description: 'Apple has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      logo: '/logos/hof/microsoft.png',
      category: 'tech',
      tier: 'platinum',
      year: 2015,
      vulnerabilities: 28,
      url: 'https://technet.microsoft.com/en-us/security/cc308575',
      featured: true,
      tags: ['Information Disclosure'],
      description: 'Microsoft has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'slack',
      name: 'Slack',
      logo: '/logos/hof/slack.png',
      category: 'tech',
      tier: 'gold',
      year: 2015,
      vulnerabilities: 15,
      url: 'https://hackerone.com/slack/thanks',
      featured: true,
      tags: ['CSRF'],
      description: 'Slack has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'coinspace',
      name: 'Coin.Space',
      logo: '/logos/hof/coinspace.png',
      category: 'financial',
      tier: 'gold',
      year: 2015,
      vulnerabilities: 10,
      url: 'https://hackerone.com/coinspace/thanks',
      featured: true,
      tags: ['SQL Injection'],
      description: 'Coin.Space has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'ubiquiti',
      name: 'Ubiquiti Networks',
      logo: '/logos/hof/ubiquiti.png',
      category: 'tech',
      tier: 'gold',
      year: 2015,
      vulnerabilities: 18,
      url: 'https://hackerone.com/ubnt/thanks',
      featured: true,
      tags: ['Cross-Site Scripting'],
      description: 'Ubiquiti Networks has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'whisper',
      name: 'Whisper',
      logo: '/logos/hof/whisper.png',
      category: 'tech',
      tier: 'silver',
      year: 2015,
      vulnerabilities: 8,
      url: 'https://hackerone.com/whisper/thanks',
      featured: false,
      tags: ['SQL Injection'],
      description: 'Whisper has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'itbit',
      name: 'itBit',
      logo: '/logos/hof/itbit.png',
      category: 'financial',
      tier: 'silver',
      year: 2015,
      vulnerabilities: 7,
      url: 'https://hackerone.com/itbit/thanks',
      featured: false,
      tags: ['SQL Injection'],
      description: 'itBit has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'hivewallet',
      name: 'Hive Wallet',
      logo: '/logos/hof/hivewallet.png',
      category: 'financial',
      tier: 'silver',
      year: 2015,
      vulnerabilities: 9,
      url: 'https://www.crowdcurity.com/hive-wallet/hall-of-fame/all',
      featured: false,
      tags: ['SQL Injection'],
      description: 'Hive Wallet has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'todoist',
      name: 'Todoist',
      logo: '/logos/hof/todoist.png',
      category: 'tech',
      tier: 'silver',
      year: 2015,
      vulnerabilities: 5,
      url: 'https://hackerone.com/todoist/thanks',
      featured: false,
      tags: ['SQL Injection'],
      description: 'Todoist has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'robocoin',
      name: 'Robocoin',
      logo: '/logos/hof/robocoin.png',
      category: 'financial',
      tier: 'bronze',
      year: 2015,
      vulnerabilities: 4,
      url: 'https://hackerone.com/robocoin/thanks',
      featured: false,
      tags: ['SQL Injection'],
      description: 'Robocoin has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'x',
      name: 'X (formerly Twitter)',
      logo: '/logos/hof/twitter.png',
      category: 'tech',
      tier: 'gold',
      year: 2014,
      vulnerabilities: 14,
      url: 'https://hackerone.com/twitter/thanks',
      featured: true,
      tags: ['SQL Injection', 'Cross-Site Scripting'],
      description: 'X (formerly Twitter) has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      logo: '/logos/hof/spotify.png',
      category: 'tech',
      tier: 'gold',
      year: 2022,
      vulnerabilities: 22,
      url: 'https://hackerone.com/spotify',
      featured: true,
      tags: ['SQL Injection'],
      description: 'Spotify has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'hackerone',
      name: 'HackerOne',
      logo: '/logos/hof/hackerone.png',
      category: 'platform',
      tier: 'gold',
      year: 2023,
      vulnerabilities: 30,
      url: 'https://hackerone.com/security',
      featured: true,
      tags: ['SQL Injection', 'Cross-Site Scripting'],
      description: 'HackerOne has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    },
    {
      id: 'bugcrowd',
      name: 'Bugcrowd',
      logo: '/logos/hof/bugcrowd.png',
      category: 'platform',
      tier: 'silver',
      year: 2022,
      vulnerabilities: 25,
      url: 'https://bugcrowd.com/hall-of-fame',
      featured: true,
      tags: ['SQL Injection'],
      description: 'Bugcrowd has been recognized for its contributions to security research and its commitment to a safer digital ecosystem.'
    }
  ];

  // Calculate stats
  const totalVulnerabilities = companies.reduce((sum, company) => sum + company.vulnerabilities, 0);
  const companiesCount = companies.length;
  const featuredCompaniesCount = companies.filter(c => c.featured).length;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesCategory = activeFilter === 'all' || company.category === activeFilter;
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = yearFilter === null || company.year === yearFilter;
    return matchesCategory && matchesSearch && matchesYear;
  });

  const years = Array.from(new Set(companies.map(company => company.year))).sort((a, b) => b - a);

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setCompanyDetailsVisible(true);
  };

  const closeCompanyModal = () => {
    setSelectedCompany(null);
    setCompanyDetailsVisible(false);
  };

  const defaultCompany: Company = {
    id: 'unknown',
    name: 'Unknown Company',
    description: '',
    category: 'other',
    tier: 'bronze',
    year: 2024,
    vulnerabilities: 0,
    url: '',
    featured: false,
    tags: [],
    logo: '/logos/hof/default.png'
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white pb-20">
      {/* Clean Dark Background with Subtle Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 pt-12 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Security Hall of Fame
          </motion.h1>
          <motion.p 
            className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Honoring companies that acknowledge security researchers for their responsible disclosures and contributions to a safer digital ecosystem.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <motion.div 
            className="p-4 rounded-xl border border-zinc-800/30 backdrop-blur-sm"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-4 md:gap-6 items-center">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative w-full sm:w-auto">
                  <select
                    id="category"
                    name="category"
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="block w-full pl-4 pr-10 py-2.5 text-base rounded-lg appearance-none bg-black/30 border-zinc-800/30 border focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 text-white placeholder-zinc-400 backdrop-blur-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="tech">Technology</option>
                    <option value="financial">Financial</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="platform">Bug Bounty Platform</option>
                    <option value="government">Government</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <Filter size={16} className="text-zinc-400" />
                  </div>
                </div>

                <div className="relative w-full sm:w-auto">
                  <select
                    id="year"
                    name="year"
                    value={yearFilter?.toString() || ''}
                    onChange={(e) => setYearFilter(e.target.value ? parseInt(e.target.value) : null)}
                    className="block w-full pl-4 pr-10 py-2.5 text-base rounded-lg appearance-none bg-black/30 border-zinc-800/30 border focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 text-white placeholder-zinc-400 backdrop-blur-sm"
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <Calendar size={16} className="text-zinc-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 border border-zinc-800/30 backdrop-blur-sm">
                <Users size={16} className="text-zinc-400" />
                <span className="text-zinc-300 text-sm">
                  <span className="font-medium text-white">{filteredCompanies.length}</span> {filteredCompanies.length === 1 ? "company" : "companies"} found
                </span>
              </div>

              <div className="relative w-full sm:w-auto flex-1 md:flex-none">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 text-base rounded-lg appearance-none bg-black/30 border-zinc-800/30 border focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 text-white placeholder-zinc-400 backdrop-blur-sm"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={16} className="text-zinc-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured Companies */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Companies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.filter(c => c.featured).map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group overflow-hidden"
                onClick={() => handleCompanyClick(company)}
              >
                <div className="h-full p-6 rounded-2xl border border-zinc-800/30 backdrop-blur-sm hover:border-zinc-700/50 transition-all duration-300 flex flex-col justify-between"
                     style={{
                       background: 'rgba(0, 0, 0, 0.05)',
                       backdropFilter: 'blur(12px)',
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-800 overflow-hidden">
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>
                    <div className="px-2 py-1 text-xs font-medium rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                      {company.category}
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-white">{company.name}</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{company.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {company.tags && company.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-400">
                          {tag}
                        </span>
                      ))}
                      {company.tags && company.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-400">
                          +{company.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-800/50 relative z-10">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-purple-400 mr-1" />
                      <span className="text-sm text-zinc-400">{company.vulnerabilities} Vulnerabilities</span>
                    </div>
                    <span className="text-sm text-zinc-500">{company.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Companies */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">All Companies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden"
                onClick={() => handleCompanyClick(company)}
              >
                <div className="h-full p-6 rounded-2xl border border-zinc-800/30 backdrop-blur-sm hover:border-zinc-700/50 transition-all duration-300 flex flex-col justify-between"
                     style={{
                       background: 'rgba(0, 0, 0, 0.05)',
                       backdropFilter: 'blur(12px)',
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-800 overflow-hidden">
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>
                    <div className="px-2 py-1 text-xs font-medium rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                      {company.category}
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-white">{company.name}</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{company.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {company.tags && company.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-400">
                          {tag}
                        </span>
                      ))}
                      {company.tags && company.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-400">
                          +{company.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-800/50 relative z-10">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-purple-400 mr-1" />
                      <span className="text-sm text-zinc-400">{company.vulnerabilities} Vulnerabilities</span>
                    </div>
                    <span className="text-sm text-zinc-500">{company.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Details Modal */}
        <AnimatePresence>
          {selectedCompany && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black backdrop-blur-sm"
                onClick={closeCompanyModal}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-3xl rounded-xl overflow-hidden border border-zinc-800/30 shadow-2xl"
                style={{
                  background: 'rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="relative p-6">
                  <button
                    onClick={closeCompanyModal}
                    className="absolute top-3 right-3 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-white transition-colors z-10"
                  >
                    <X size={18} />
                  </button>
                  
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      {selectedCompany.logo ? (
                        <img
                          src={selectedCompany.logo}
                          alt={`${selectedCompany.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-amber-600 flex items-center justify-center">
                          <span className="text-white text-3xl font-bold">
                            {selectedCompany.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedCompany.name}
                      </h2>
                      <p className="text-zinc-300 mb-4">{selectedCompany.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {selectedCompany.category}
                        </span>
                        <span className="text-zinc-400">
                          <Calendar size={16} className="inline mr-1" />
                          {selectedCompany.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Premium CTA Section */}
        <div className="mt-24 relative">
          <div className="rounded-3xl overflow-hidden">
            <div className="relative p-8 md:p-12"
                 style={{
                   background: 'rgba(0, 0, 0, 0.05)',
                   backdropFilter: 'blur(12px)',
                   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
                   border: '1px solid rgba(255, 255, 255, 0.05)'
                 }}>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-amber-500/5 z-10" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-20">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <Shield className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <Trophy className="w-8 h-8 text-amber-400" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to submit your discovery?
                  </h2>
                  <p className="text-zinc-400 mb-6 max-w-xl">
                    Join our Hall of Fame by reporting security vulnerabilities through our responsible disclosure program. Get recognition for your contributions to a safer digital ecosystem.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={() => setIsSubmissionModalOpen(true)}
                      className="bg-gradient-to-r from-purple-600 to-amber-600 hover:opacity-90 border-none text-white"
                    >
                      <SendIcon className="w-4 h-4 mr-2" />
                      Submit a Report
                    </Button>
                    
                    <Button
                      href="#"
                      variant="outline"
                      className="border-zinc-700 hover:border-zinc-500 text-white"
                    >
                      <FileQuestion className="w-4 h-4 mr-2" />
                      View Resources
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallOfFame; 