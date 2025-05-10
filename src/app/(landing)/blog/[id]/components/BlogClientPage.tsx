"use client";
import { client } from "@/sanity/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import CustomPortableText from "./CustomPortableText";
import { Facebook, X, Linkedin, Copy, Check, ArrowLeft, Share2, Clock, Calendar, User, BookOpen, Sun, Moon, Hash } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const BlogClientPage = () => {
  const params = useParams();
  const slug = params && typeof params.id === 'string' ? params.id : null;
  const router = useRouter();
  const [singlePost, setSinglePost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [readingTime, setReadingTime] = useState("5 min read");
  
  // New states for enhanced features
  const [readingMode, setReadingMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [tableOfContents, setTableOfContents] = useState<{id: string; text: string; level: number}[]>([]);
  const [activeHeading, setActiveHeading] = useState("");
  
  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Transform scrollYProgress for the reading progress bar
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("Post not found");
        setIsLoading(false);
        return;
      }

      try {
        const data = await client.fetch(
          `*[slug.current == "${slug}"] {
            title,
            body,
            publishedAt,
            mainImage {
              asset -> {
                _id,
                url
              },
              alt
            }
          }`
        );

        if (data && data.length > 0) {
          setSinglePost(data[0]);
          
          // Calculate estimated reading time
          if (data[0].body) {
            // Estimate 200 words per minute reading speed
            const wordCount = data[0].body.reduce((count: number, block: any) => {
              if (block._type === 'block' && block.children) {
                return count + block.children.reduce((sum: number, child: any) => {
                  return sum + (child.text ? child.text.split(/\s+/).length : 0);
                }, 0);
              }
              return count;
            }, 0);
            
            const minutes = Math.ceil(wordCount / 200);
            setReadingTime(`${minutes} min read`);
            
            // Extract headings for table of contents
            const headings = data[0].body
              .filter((block: any) => 
                block._type === 'block' && 
                ['h2', 'h3', 'h4'].includes(block.style)
              )
              .map((block: any) => {
                // Generate an ID from the heading text
                const text = block.children
                  .map((child: any) => child.text)
                  .join('');
                
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s]/g, '')
                  .replace(/\s+/g, '-');
                
                return {
                  id,
                  text,
                  level: parseInt(block.style.replace('h', ''), 10)
                };
              });
            
            setTableOfContents(headings);
          }
          
          // Fetch related posts
          const related = await client.fetch(
            `*[_type == "post" && slug.current != "${slug}"] | order(_createdAt desc)[0...3] {
              title,
              slug,
              publishedAt,
              mainImage {
                asset -> {
                  _id,
                  url
                },
                alt
              }
            }`
          );
          setRelatedPosts(related);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);
  
  // Track active heading based on scroll position
  useEffect(() => {
    if (!contentRef.current || tableOfContents.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );
    
    // Observe all headings
    setTimeout(() => {
      tableOfContents.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });
    }, 500);
    
    return () => observer.disconnect();
  }, [tableOfContents, contentRef.current]);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Toggle reading mode
  const toggleReadingMode = () => {
    setReadingMode(!readingMode);
    
    // Scroll to top when entering reading mode
    if (!readingMode && containerRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust for navbar or other fixed elements
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push('/blog')} 
            className="mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!singlePost) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Post Not Found</h2>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/blog')} 
            className="mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Create share URLs
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(singlePost.title);
  
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  // Format date for better display
  const formattedDate = moment(singlePost.publishedAt).format("MMM DD, YYYY");

  return (
    <div 
      ref={containerRef} 
      className={`relative min-h-screen transition-colors duration-300 ${
        readingMode 
          ? isDarkMode 
            ? 'bg-zinc-900' 
            : 'bg-zinc-100 text-zinc-900' 
          : 'bg-black'
      }`}
    >
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-zinc-700 origin-left z-50"
        style={{ scaleX: progressBarWidth }}
      />
      
      {/* Reading Mode Toggle */}
      <div className="fixed bottom-8 right-8 z-50 flex space-x-2">
        <button
          onClick={toggleReadingMode}
          className="p-3 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800/60 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 transition-all shadow-lg"
          aria-label={readingMode ? "Exit reading mode" : "Enter reading mode"}
          title={readingMode ? "Exit reading mode" : "Enter reading mode"}
        >
          <BookOpen className="w-5 h-5" />
        </button>
        
        {readingMode && (
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800/60 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 transition-all shadow-lg"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}
      </div>
      
      <div className={`max-w-6xl mx-auto py-8 px-4 ${readingMode ? 'flex flex-col md:flex-row gap-8' : ''}`}>
        {/* Back button at the top - only show when not in reading mode */}
        {!readingMode && (
          <button 
            onClick={() => router.push('/blog')} 
            className="mb-6 flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>
        )}
        
        {/* Table of Contents - Only show in reading mode */}
        {readingMode && tableOfContents.length > 0 && (
          <div className="hidden md:block sticky top-20 h-fit max-h-[calc(100vh-120px)] overflow-y-auto w-64 pt-8">
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-zinc-800/50 bg-zinc-900/50' : 'border-zinc-200 bg-white/80'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Table of Contents</h3>
              <ul className="space-y-2">
                {tableOfContents.map((heading) => (
                  <li 
                    key={heading.id}
                    className={`transition-all ${
                      heading.level === 3 ? 'ml-3' : heading.level === 4 ? 'ml-6' : ''
                    }`}
                  >
                    <button
                      onClick={() => scrollToHeading(heading.id)}
                      className={`text-left text-sm flex items-start hover:underline ${
                        activeHeading === heading.id 
                          ? isDarkMode ? 'text-white font-medium' : 'text-zinc-900 font-medium' 
                          : isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      <Hash className={`w-3 h-3 mt-1 mr-1 flex-shrink-0 ${
                        activeHeading === heading.id
                          ? isDarkMode ? 'text-white' : 'text-zinc-900'
                          : isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                      }`} />
                      <span>{heading.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Reading time indicator */}
            <div className={`mt-4 p-4 rounded-xl border ${isDarkMode ? 'border-zinc-800/50 bg-zinc-900/50' : 'border-zinc-200 bg-white/80'}`}>
              <div className="flex items-center text-sm">
                <Clock className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`} />
                <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>{readingTime}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content area */}
        <div className={`${readingMode ? 'max-w-3xl mx-auto flex-grow' : 'max-w-4xl mx-auto'}`}>
          {/* Fixed Social Sharing with Tooltips and Animations - don't show in reading mode */}
          {!readingMode && (
            <div className="hidden md:block fixed left-8 lg:left-14 top-1/3 z-10">
              {/* Custom animation styles */}
              <style jsx>{`
                @keyframes slowPulse {
                  0% {
                    opacity: 0.8;
                    transform: scale(1);
                  }
                  50% {
                    opacity: 0.6;
                    transform: scale(1.05);
                  }
                  100% {
                    opacity: 0.8;
                    transform: scale(1);
                  }
                }
                .arrow-pulse {
                  animation: slowPulse 3s ease-in-out infinite;
                }
                @keyframes pulse-slow {
                  0%, 100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.7;
                  }
                }
                .animate-pulse-slow {
                  animation: pulse-slow 3s ease-in-out infinite;
                }
              `}</style>
              
              {/* Handwritten arrow pointing to share buttons - only visible on desktop */}
              <div className="absolute left-16 top-6 z-0 hidden lg:block" style={{ transform: 'translateZ(0)' }}>
                <div className="relative p-4">
                  {/* Handwritten "Share" text */}
                  <div className="italic text-white text-lg mb-4 tracking-wide font-semibold animate-pulse-slow text-center" style={{ fontFamily: 'cursive', textShadow: '0 0 5px rgba(0,0,0,0.5)' }}>Share!</div>
                  {/* Arrow - Using a simpler path that's easier to render fully */}
                  <svg width="120" height="60" viewBox="0 0 120 60" className="text-white" style={{ overflow: 'visible' }}>
                    {/* Simple curved line */}
                    <path 
                      d="M100,30 C80,10 60,10 40,30 C30,40 20,35 10,30" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      className="arrow-pulse"
                    />
                    {/* Arrow head */}
                    <path 
                      d="M20,20 L10,30 L20,40" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="arrow-pulse"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="relative flex flex-col items-center">
                {/* Share icon with pulse animation */}
                <div className="relative mb-2 p-1">
                  <Share2 className="w-4 h-4 text-zinc-400" />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-zinc-700/20"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      opacity: [0.7, 0.3, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
                
                <div className="w-8 h-0.5 bg-zinc-800 mt-4"></div>
                
                <div className="flex flex-col space-y-4">
                  {/* Facebook */}
                  <motion.div 
                    className="relative group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a 
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800/60 text-zinc-400 rounded-lg hover:bg-zinc-800/90 hover:text-zinc-300 transition-all shadow-lg flex items-center justify-center"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={16} />
                    </a>
                    <motion.div 
                      className="absolute -inset-1 bg-zinc-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.85 }}
                      whileHover={{ scale: 1 }}
                    />
                    <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 text-xs bg-zinc-900 text-zinc-400 py-1 px-2 rounded shadow-md border border-zinc-800/60 whitespace-nowrap z-20 pointer-events-none transition-opacity">
                      Facebook
                    </div>
                  </motion.div>
                  
                  {/* X (formerly Twitter) */}
                  <motion.div 
                    className="relative group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={xShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on X"
                      className="w-full flex items-center gap-2 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
                    >
                      <X size={16} />
                      <span className="text-sm">X</span>
                    </a>
                    <motion.div 
                      className="absolute -inset-1 bg-zinc-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.85 }}
                      whileHover={{ scale: 1 }}
                    />
                    <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 text-xs bg-zinc-900 text-zinc-400 py-1 px-2 rounded shadow-md border border-zinc-800/60 whitespace-nowrap z-20 pointer-events-none transition-opacity">
                      X
                    </div>
                  </motion.div>
                  
                  {/* LinkedIn */}
                  <motion.div 
                    className="relative group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a 
                      href={linkedinShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800/60 text-zinc-400 rounded-lg hover:bg-zinc-800/90 hover:text-zinc-300 transition-all shadow-lg flex items-center justify-center"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={16} />
                    </a>
                    <motion.div 
                      className="absolute -inset-1 bg-zinc-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.85 }}
                      whileHover={{ scale: 1 }}
                    />
                    <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 text-xs bg-zinc-900 text-zinc-400 py-1 px-2 rounded shadow-md border border-zinc-800/60 whitespace-nowrap z-20 pointer-events-none transition-opacity">
                      LinkedIn
                    </div>
                  </motion.div>
                  
                  {/* Copy Link */}
                  <motion.div 
                    className="relative group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      onClick={copyToClipboard}
                      className="p-2.5 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800/60 text-zinc-400 rounded-lg hover:bg-zinc-800/90 hover:text-zinc-300 transition-all shadow-lg flex items-center justify-center"
                      aria-label="Copy link"
                    >
                      {copied ? <Check size={16} className="text-zinc-300" /> : <Copy size={16} />}
                    </button>
                    <motion.div 
                      className="absolute -inset-1 bg-zinc-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.85 }}
                      whileHover={{ scale: 1 }}
                    />
                    <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 text-xs bg-zinc-900 text-zinc-400 py-1 px-2 rounded shadow-md border border-zinc-800/60 whitespace-nowrap z-20 pointer-events-none transition-opacity">
                      {copied ? "Copied!" : "Copy Link"}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Hero Section - Enhanced Design */}
          <div className="mb-12">
            {/* Main Image with Animated Container */}
            {singlePost.mainImage?.asset?.url && !readingMode && (
              <div className="relative overflow-hidden rounded-xl mb-8 border border-zinc-800/50 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                <img 
                  src={singlePost.mainImage.asset.url} 
                  alt={singlePost.mainImage.alt || singlePost.title} 
                  className="w-full h-[400px] object-contain bg-zinc-900 transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
            
            {/* Article Metadata - Desktop */}
            <div className={`hidden md:flex items-center space-x-4 mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} text-sm`}>
              <div className="flex items-center">
                <Calendar className={`w-4 h-4 mr-1.5 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`} />
                <span>{formattedDate}</span>
              </div>
              <div className={`h-3 w-0.5 ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
              <div className="flex items-center">
                <Clock className={`w-4 h-4 mr-1.5 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`} />
                <span>{readingTime}</span>
              </div>
              <div className={`h-3 w-0.5 ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
              <div className="flex items-center">
                <User className={`w-4 h-4 mr-1.5 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`} />
                <span>Shubham Gupta</span>
              </div>
            </div>
            
            {/* Title with Subtle Border */}
            <div className="relative">
              <div className={`h-px w-16 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'} mb-4`}></div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-zinc-900'} leading-tight`}>{singlePost.title}</h1>
            </div>
            
            {/* Article Metadata - Mobile */}
            <div className={`flex md:hidden flex-wrap gap-3 mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} text-xs`}>
              <div className="flex items-center">
                <Calendar className={`w-3 h-3 mr-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className={`w-3 h-3 mr-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`} />
                <span>{readingTime}</span>
              </div>
              <div className="flex items-center">
                <User className={`w-3 h-3 mr-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`} />
                <span>Shubham Gupta</span>
              </div>
            </div>
            
            {/* Mobile Social Sharing - Only show on mobile and not in reading mode */}
            {!readingMode && (
              <div className="flex md:hidden items-center space-x-3 my-6 border-t border-b border-zinc-800/60 py-4 relative">
                {/* Mobile share indicator */}
                <div className="absolute -top-8 left-0 italic text-white text-base tracking-wide font-medium animate-pulse-slow" style={{ fontFamily: 'cursive', textShadow: '0 0 5px rgba(0,0,0,0.5)' }}>
                  Share this post!
                </div>
                <span className="text-sm text-zinc-400">Share:</span>
                <a 
                  href={facebookShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-900/90 border border-zinc-800/60 text-zinc-400 rounded-lg hover:bg-zinc-800/90 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href={xShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="flex items-center justify-center p-2 hover:bg-zinc-800 rounded-full"
                >
                  <X size={16} />
                </a>
                <a 
                  href={linkedinShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-900/90 border border-zinc-800/60 text-zinc-400 rounded-lg hover:bg-zinc-800/90 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-zinc-900/90 border border-zinc-800/60 text-zinc-400 rounded-lg hover:bg-zinc-800/90 transition-colors flex items-center"
                  aria-label="Copy link"
                >
                  {copied ? <Check size={16} className="text-zinc-300" /> : <Copy size={16} />}
                </button>
                {copied && <span className="text-xs text-zinc-300 ml-1">Copied!</span>}
              </div>
            )}

            {/* Main content with ref for intersection observer */}
            <div 
              ref={contentRef} 
              className={`prose max-w-none ${
                isDarkMode 
                  ? 'prose-invert prose-zinc prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-strong:text-zinc-200' 
                  : 'prose-zinc prose-headings:text-zinc-900 prose-p:text-zinc-700 prose-strong:text-zinc-800 prose-a:text-zinc-800 hover:prose-a:text-zinc-900 prose-code:text-zinc-800 prose-code:bg-zinc-200'
              } ${
                readingMode ? 'prose-lg prose-p:leading-relaxed prose-headings:leading-tight' : ''
              } prose-a:no-underline hover:prose-a:underline prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg prose-img:rounded-lg`}
            >
              <CustomPortableText value={singlePost.body} isDarkMode={isDarkMode} />
            </div>
          </div>
          
          {/* Author Bio Card - don't show in reading mode */}
          {!readingMode && (
            <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 mb-16 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border border-zinc-800">
                  <img src="/shubham_gupta.png" alt="Shubham Gupta" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Shubham Gupta</h3>
                  <p className="text-zinc-400 text-sm">Security Researcher & Bug Hunter</p>
                </div>
              </div>
              <div className="mt-4 text-zinc-400 text-sm">
                <p>A passionate, enthusiastic cybersecurity professional with over 12 years of experience as an IT security consultant and researcher specializing in Red Teaming and Web Application Security.</p>
              </div>
            </div>
          )}
        
          {/* Related Posts Section - don't show in reading mode */}
          {!readingMode && relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-zinc-800/50">
              <h3 className="text-2xl font-bold text-white mb-8 relative inline-block">
                More Posts
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-zinc-700"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => router.push(`/blog/${post.slug.current}`)}
                    className="group bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/50 rounded-xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Image container with gradient overlay */}
                    <div className="w-full h-40 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70 z-10"></div>
                      {post.mainImage?.asset?.url ? (
                        <img 
                          src={post.mainImage.asset.url} 
                          alt={post.mainImage.alt || post.title} 
                          className="w-full h-full object-contain bg-zinc-900 transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                          <span className="text-zinc-500">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-zinc-300 transition-colors">{post.title}</h3>
                      <div className="flex items-center text-xs text-zinc-500 mb-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {moment(post.publishedAt).format("MMM D, YYYY")}
                      </div>
                      <span className="inline-block mt-3 text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        Read article &rarr;
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogClientPage;