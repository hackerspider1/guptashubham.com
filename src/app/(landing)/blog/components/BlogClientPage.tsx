"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { client } from "@/sanity/client";
import moment from "moment";

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
            className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-zinc-400 max-w-2xl">
          Explore articles on cybersecurity, ethical hacking, web development, and more.
        </p>
      </div>

      {/* Search */}
      <div className="mb-10 relative max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-zinc-300 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-zinc-400">No posts matching your search</p>
          <button 
            onClick={() => setSearchQuery("")} 
            className="mt-4 text-blue-500 hover:text-blue-400"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          {/* Featured Blog */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-zinc-800">Featured Post</h2>
            {filteredPosts[0] && (
              <div className="border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-all group">
                <div className="md:flex">
                  {filteredPosts[0]?.mainImage?.asset?.url && (
                    <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden flex items-center justify-center bg-black">
                      <img 
                        className="w-auto h-auto max-w-full max-h-full object-contain p-4" 
                        src={filteredPosts[0].mainImage.asset.url} 
                        alt={filteredPosts[0].mainImage.alt || filteredPosts[0].title} 
                      />
                    </div>
                  )}
                  <div className="p-8 md:w-1/2 flex flex-col bg-black">
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">{filteredPosts[0].title}</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-zinc-400 text-xs mt-auto mb-4">
                      <Calendar className="w-4 h-4 mr-2" /> 
                      {moment(filteredPosts[0]?.publishedAt).format("MMMM D, YYYY")}
                    </div>
                    <Link 
                      href={`/blog/${filteredPosts[0]?.slug?.current || ""}`} 
                      className="inline-flex items-center text-blue-500 hover:text-blue-400 group-hover:translate-x-1 transition-all self-start"
                    >
                      Read Post <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Posts */}
          {filteredPosts.length > 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-zinc-800">Recent Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((blog, index) => (
                  <Link 
                    href={`/blog/${blog?.slug?.current || ""}`} 
                    key={index} 
                    className="border border-zinc-800 hover:border-zinc-700 rounded-lg overflow-hidden transition-all flex flex-col h-full group"
                  >
                    {blog?.mainImage?.asset?.url && (
                      <div className="relative h-48 overflow-hidden flex items-center justify-center bg-black">
                        <img 
                          className="w-auto h-auto max-w-full max-h-full object-contain p-4" 
                          src={blog.mainImage.asset.url} 
                          alt={blog.mainImage.alt || blog.title} 
                        />
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col bg-black">
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">{blog.title}</h3>
                      <p className="text-zinc-400 text-sm line-clamp-3 mb-4">{blog.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-zinc-400 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" /> {moment(blog?.publishedAt).format("MMM D, YYYY")}
                        </span>
                        <span className="text-xs text-blue-500 font-medium flex items-center group-hover:translate-x-1 transition-all">
                          Read more <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogClientPage; 