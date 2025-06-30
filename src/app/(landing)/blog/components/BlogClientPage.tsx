'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { FaCalendarAlt, FaClock, FaTag, FaSearch, FaFilter, FaArrowRight, FaShieldAlt, FaBug, FaCode, FaUser, FaArrowLeft, FaShare, FaTwitter, FaLinkedin, FaCopy } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  mainImage?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
  publishedAt: string;
  estimatedReadingTime?: number;
  categories?: Array<{
    title: string;
    slug: {
      current: string;
    };
  }>;
  tags?: string[];
  author?: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
}

// Helper function to format date without moment.js
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to get relative time without moment.js
const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

const BlogClientPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      // Only run in browser environment after component is mounted
      if (!mounted || typeof window === 'undefined') {
        return;
      }

      try {
        setLoading(true);
        
        // Dynamically import Sanity client only on client side
        const { client } = await import('@/sanity/client');
        
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          mainImage {
            asset-> {
              _id,
              url
            },
            alt
          },
          publishedAt,
          estimatedReadingTime,
          categories[]-> {
            title,
            slug
          },
          tags,
          author-> {
            name,
            image {
              asset-> {
                url
              }
            }
          }
        }`;
        
        const fetchedPosts = await client.fetch(query);
        setPosts(fetchedPosts || []);
        
        // Extract unique categories
        const allCategories = fetchedPosts?.flatMap((post: BlogPost) => 
          post.categories?.filter(cat => cat && cat.title).map(cat => cat.title) || []
        ) || [];
        const uniqueCategories = Array.from(new Set(allCategories)).filter((cat): cat is string => typeof cat === 'string');
        setCategories(uniqueCategories);
        
        setError(null);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [mounted]);

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Clean Dark Background with Subtle Grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Radial overlay for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-12 h-12 border-3 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           post.categories?.some(cat => cat && cat.title === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts[0]; // Latest post as featured
  const regularPosts = posts.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Clean Dark Background with Subtle Grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Radial overlay for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="text-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative z-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-14 h-14 border-3 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"></div>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 text-lg mt-6 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Loading security insights...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Clean Dark Background with Subtle Grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Radial overlay for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="text-center max-w-sm mx-auto p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"></div>
            
            <div className="relative z-10">
              <div className="text-blue-400 text-4xl mb-4">📝</div>
              <h2 className="text-xl font-bold text-white mb-3">Blog Posts Loading</h2>
              <p className="text-gray-300 mb-6 text-sm">
                We're having trouble loading the blog posts right now. This might be due to a temporary connection issue with our content server.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Try Again
              </button>
              <div className="mt-4 text-xs text-gray-400">
                If the problem persists, please check back later or contact us.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Blog - Shubham Gupta | Cybersecurity Insights & Research</title>
        <meta name="description" content="Latest cybersecurity insights, bug bounty findings, and security research by Shubham Gupta. Stay updated with the latest in ethical hacking and penetration testing." />
        <meta name="keywords" content="cybersecurity blog, bug bounty, security research, ethical hacking, penetration testing, vulnerability research" />
        <meta property="og:title" content="Blog - Shubham Gupta | Cybersecurity Insights" />
        <meta property="og:description" content="Latest cybersecurity insights, bug bounty findings, and security research." />
        <meta property="og:url" content="https://guptashubham.com/blog" />
        <meta property="og:image" content="https://guptashubham.com/og-blog.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@hackerspider1" />
      </Head>
      
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Clean Dark Background with Subtle Grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Radial overlay for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="relative z-10">
            {/* Hero Section */}
            <section className="pt-20 pb-12 px-4">
              <div className="container mx-auto max-w-6xl">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FaShieldAlt className="text-blue-400 mr-2 text-sm" />
                    <span className="text-gray-300 font-medium text-sm">Cybersecurity Research & Insights</span>
                  </motion.div>

                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                      Security
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Chronicles
                    </span>
                  </h1>

                  <motion.p 
                    className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Dive deep into the world of ethical hacking, vulnerability research, and cutting-edge cybersecurity. 
                    Discover insights from real-world penetration testing and bug bounty hunting.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <FaBug className="text-green-400" />
                      <span>Bug Bounty Findings</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <FaCode className="text-blue-400" />
                      <span>Penetration Testing</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <FaShieldAlt className="text-purple-400" />
                      <span>Security Research</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Search and Filter Section */}
                <motion.div
                  className="max-w-3xl mx-auto mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Search */}
                      <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="text"
                          placeholder="Search for vulnerabilities, techniques, tools..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                        />
                      </div>

                      {/* Category Filter */}
                      <div className="relative min-w-[180px]">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
              <section className="px-4 mb-12">
                <div className="container mx-auto max-w-6xl">
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">Latest Research</h2>
                    <p className="text-gray-400">Our most recent cybersecurity findings and insights</p>
                  </motion.div>

                  <motion.article
                    className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden group hover:bg-white/8 transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ y: -3 }}
                  >
                    <Link href={`/blog/${featuredPost.slug.current}`}>
                      <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image */}
                        {featuredPost.mainImage?.asset?.url && (
                          <div className="relative h-64 lg:h-full min-h-[320px] overflow-hidden rounded-l-2xl lg:rounded-l-2xl lg:rounded-r-none">
                            <Image
                              src={featuredPost.mainImage.asset.url}
                              alt={featuredPost.mainImage.alt || featuredPost.title}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 lg:p-8 flex flex-col justify-center">
                          {/* Categories */}
                          {featuredPost.categories && featuredPost.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {featuredPost.categories
                                .filter(category => category && category.slug && category.title)
                                .slice(0, 2)
                                .map((category) => (
                                  <span
                                    key={category.slug.current}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30"
                                  >
                                    <FaTag className="mr-1 text-xs" />
                                    {category.title}
                                  </span>
                                ))}
                            </div>
                          )}

                          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                            {featuredPost.title}
                          </h3>

                          {featuredPost.excerpt && (
                            <p className="text-gray-300 mb-6 leading-relaxed">
                              {featuredPost.excerpt}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                              <span className="flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                {formatDate(featuredPost.publishedAt)}
                              </span>
                              {featuredPost.estimatedReadingTime && (
                                <span className="flex items-center">
                                  <FaClock className="mr-1" />
                                  {featuredPost.estimatedReadingTime} min read
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-semibold text-sm">
                              <span className="mr-2">Read Full Research</span>
                              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-xs" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                </div>
              </section>
            )}

            {/* Posts Grid */}
            <section className="px-4 pb-16">
              <div className="container mx-auto max-w-6xl">
                {filteredPosts.length === 0 ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-sm mx-auto">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-xl font-bold text-white mb-3">No posts found</h3>
                      <p className="text-gray-400 text-sm">
                        {searchTerm || selectedCategory !== 'all' 
                          ? 'Try adjusting your search or filter criteria.' 
                          : 'New security research is being published regularly. Check back soon!'}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <h2 className="text-2xl font-bold text-white mb-2">All Research</h2>
                      <p className="text-gray-400">Explore our complete collection of cybersecurity insights</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredPosts.map((post, index) => (
                        <motion.article
                          key={post._id}
                          className="group relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-500"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.6 + index * 0.05 }}
                          whileHover={{ y: -5 }}
                        >
                          <Link href={`/blog/${post.slug.current}`}>
                            {/* Featured Image */}
                            {post.mainImage?.asset?.url && (
                              <div className="relative h-48 overflow-hidden rounded-t-xl">
                                <Image
                                  src={post.mainImage.asset.url}
                                  alt={post.mainImage.alt || post.title}
                                  fill
                                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                              </div>
                            )}

                            <div className="p-5">
                              {/* Categories */}
                              {post.categories && post.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {post.categories
                                    .filter(category => category && category.slug && category.title)
                                    .slice(0, 2)
                                    .map((category) => (
                                      <span
                                        key={category.slug.current}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30"
                                      >
                                        <FaTag className="mr-1 text-xs" />
                                        {category.title}
                                      </span>
                                    ))}
                                </div>
                              )}

                              {/* Title */}
                              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2 leading-tight">
                                {post.title}
                              </h3>

                              {/* Excerpt */}
                              {post.excerpt && (
                                <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed text-sm">
                                  {post.excerpt}
                                </p>
                              )}

                              {/* Meta Information */}
                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center space-x-3">
                                  <span className="flex items-center">
                                    <FaCalendarAlt className="mr-1" />
                                    {getRelativeTime(post.publishedAt)}
                                  </span>
                                  {post.estimatedReadingTime && (
                                    <span className="flex items-center">
                                      <FaClock className="mr-1" />
                                      {post.estimatedReadingTime}m
                                    </span>
                                  )}
                                </div>
                                <FaArrowRight className="text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all duration-300" />
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="px-4 pb-20">
              <div className="container mx-auto max-w-3xl">
                <motion.div
                  className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 }}
                >
                  <div className="relative z-10">
                    <FaUser className="text-2xl text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">Stay Ahead of Threats</h3>
                    <p className="text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed">
                      Get exclusive insights, early access to vulnerability research, and notifications 
                      when new security findings are published.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                      />
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                        Subscribe
                      </button>
                    </div>

                    <p className="text-gray-400 text-xs mt-3">
                      Join 10,000+ security professionals. No spam, unsubscribe anytime.
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogClientPage; 