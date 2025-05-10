"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Search, BookOpen } from "lucide-react";
import { client } from "@/sanity/client";
import moment from "moment";
import { motion } from "framer-motion";

const BlogClientPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "post"] | order(_createdAt desc) {
            title,
            slug,
            body,
            "categories": categories[]->title,
            publishedAt,
            "excerpt": array::join(string::split(pt::text(body), "")[0...150], "") + "...",
            mainImage {
              asset -> {
                _id,
                url
              },
              alt
            }
          }`
        );
        
        if (data && Array.isArray(data)) {
          const sortedPosts = data.sort((a:any, b:any) => {
            const dateA = a?.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b?.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
          });
          setPosts(sortedPosts);
          setFilteredPosts(sortedPosts);
        } else {
          setError("Failed to load blog posts");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load blog posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        (post.excerpt && post.excerpt.toLowerCase().includes(query))
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-zinc-300">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Error</h2>
          <p className="text-zinc-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">No Posts Found</h2>
          <p className="text-zinc-300">Check back later for new content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black min-h-screen">
      {/* Background pattern with reduced opacity */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-10"></div>
      
      {/* Search Section */}
      <div className="relative z-10 w-full bg-gradient-to-b from-black via-black to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blog posts..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800/50 rounded-lg text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {filteredPosts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/40 rounded-xl shadow-xl"
          >
            <p className="text-xl text-zinc-400">No posts matching your search</p>
            <button 
              onClick={() => setSearchQuery("")} 
              className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-zinc-300 transition-colors"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <>
            {/* Featured Blog */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 backdrop-blur-sm">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                Featured Post
              </h2>
              {filteredPosts[0] && (
                <Link href={`/blog/${filteredPosts[0]?.slug?.current || ""}`} className="block">
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800/50 transition duration-300 group-hover:border-zinc-700/50">
                      <div className="md:flex">
                        {filteredPosts[0]?.mainImage?.asset?.url && (
                          <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden flex items-center justify-center bg-zinc-900/50">
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 to-black/20 z-0"></div>
                            <img 
                              className="w-auto h-auto max-w-full max-h-full object-contain p-4 z-10 transition-transform duration-700 group-hover:scale-105" 
                              src={filteredPosts[0].mainImage.asset.url} 
                              alt={filteredPosts[0].mainImage.alt || filteredPosts[0].title} 
                            />
                          </div>
                        )}
                        <div className="p-8 md:w-1/2 flex flex-col">
                          <h3 className="text-2xl font-semibold mb-3 text-zinc-100 group-hover:text-white transition-colors">{filteredPosts[0].title}</h3>
                          <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-3">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center text-zinc-500 text-xs">
                              <Calendar className="w-4 h-4 mr-2" /> 
                              {moment(filteredPosts[0]?.publishedAt).format("MMMM D, YYYY")}
                            </div>
                            <span className="inline-flex items-center text-blue-400 text-sm group-hover:translate-x-1 transition-transform">
                              Read Post <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>

            {/* Recent Posts */}
            {filteredPosts.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 backdrop-blur-sm">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                  </div>
                  Recent Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredPosts.slice(1).map((blog, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    >
                      <Link 
                        href={`/blog/${blog?.slug?.current || ""}`} 
                        className="group block relative h-full"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800/50 h-full transition duration-300 group-hover:border-zinc-700/50 group-hover:-translate-y-1">
                          {blog?.mainImage?.asset?.url && (
                            <div className="relative h-48 overflow-hidden flex items-center justify-center bg-zinc-900/50">
                              <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 to-black/20 z-0"></div>
                              <img 
                                className="w-auto h-auto max-w-full max-h-full object-contain p-4 z-10 transition-transform duration-700 group-hover:scale-105" 
                                src={blog.mainImage.asset.url} 
                                alt={blog.mainImage.alt || blog.title} 
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="text-lg font-semibold mb-2 text-zinc-100 group-hover:text-white transition-colors line-clamp-2">{blog.title}</h3>
                            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                              {blog.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-zinc-500 text-xs">
                                <Calendar className="w-3 h-3 mr-1" /> 
                                {moment(blog?.publishedAt).format("MMM D, YYYY")}
                              </div>
                              <span className="inline-flex items-center text-blue-400 text-xs group-hover:translate-x-1 transition-transform">
                                Read more <ArrowRight className="w-3 h-3 ml-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogClientPage; 