"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock, FaTag, FaArrowLeft, FaShare, FaTwitter, FaLinkedin, FaCopy, FaUser } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import LiquidGlass from '@/components/ui/liquid-glass';


interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  body: any; // PortableText content
  mainImage?: {
    asset: {
      url: string;
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
    bio?: string;
  };
}

interface Props {
  params: {
    id: string;
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

// Helper function to get Sanity image URL
const getSanityImageUrl = (imageAsset: any): string | null => {
  console.log('Getting Sanity image URL for:', imageAsset);
  
  // Since the debug shows we already have the correct URL, let's use it directly
  if (imageAsset?.url) {
    console.log('Using direct URL:', imageAsset.url);
    return imageAsset.url;
  }
  
  if (imageAsset?._ref) {
    const ref = imageAsset._ref;
    const parts = ref.split('-');
    if (parts.length >= 3) {
      const id = parts.slice(1, -2).join('-');
      const dimensions = parts[parts.length - 2];
      const format = parts[parts.length - 1];
      const url = `https://cdn.sanity.io/images/mr5wnv0b/production/${id}-${dimensions}.${format}`;
      console.log('Constructed URL from _ref:', url);
      return url;
    }
  }
  
  if (imageAsset?._id) {
    // Try to construct from _id format like: image-bb2fc33dedbcc95d945246d486a3a6a5673a13f2-2048x1536-png
    const id = imageAsset._id;
    if (id.startsWith('image-')) {
      // Remove 'image-' prefix and replace with proper format
      const cleanId = id.replace('image-', '');
      const parts = cleanId.split('-');
      if (parts.length >= 3) {
        const hash = parts.slice(0, -2).join('-');
        const dimensions = parts[parts.length - 2];
        const format = parts[parts.length - 1];
        const url = `https://cdn.sanity.io/images/mr5wnv0b/production/${hash}-${dimensions}.${format}`;
        console.log('Constructed URL from _id:', url);
        return url;
      }
    }
  }
  
  console.log('Could not construct image URL');
  return null;
};

// Enhanced PortableText components for rich text rendering with liquid glass styling
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      // Debug: Log the incoming value to understand the structure
      console.log('Image value received:', value);
      
      // Use the helper function to get the image URL
      const imageUrl = getSanityImageUrl(value?.asset) || value?.url;

      if (!imageUrl) {
        console.log('No image URL found, value structure:', JSON.stringify(value, null, 2));
        // Return a placeholder instead of null
        return (
          <motion.div 
            className="my-12 -mx-4 md:-mx-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <LiquidGlass
              variant="card"
              intensity="low"
              rounded="xl"
              className="overflow-hidden mx-4 md:mx-8"
            >
              <div className="relative w-full h-64 md:h-96 lg:h-[500px] bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🖼️</div>
                  <p className="text-gray-400">Image not available</p>
                  {value?.caption && (
                    <p className="text-gray-500 text-sm mt-2">{value.caption}</p>
                  )}
                </div>
              </div>
            </LiquidGlass>
          </motion.div>
        );
      }

      return (
        <motion.div 
          className="my-12 -mx-4 md:-mx-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <LiquidGlass
            variant="card"
            intensity="low"
            rounded="xl"
            className="overflow-hidden mx-4 md:mx-8"
          >
            <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
              <Image
                src={imageUrl}
                alt={value.alt || value.caption || 'Blog image'}
                fill
                className="object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', imageUrl);
                  console.error('Original value:', value);
                  console.error('Error event:', e);
                  // Replace with placeholder on error
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-4xl mb-4">❌</div>
                          <p class="text-gray-400">Failed to load image</p>
                        </div>
                      </div>
                    `;
                  }
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', imageUrl);
                }}
              />
            </div>
            {value.caption && (
              <div className="p-4 md:p-6">
                <p className="text-center text-gray-400 text-sm italic">
                  {value.caption}
                </p>
              </div>
            )}
          </LiquidGlass>
        </motion.div>
      );
    },
    code: ({ value }: any) => (
      <motion.div
        className="my-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <LiquidGlass
          variant="prominent"
          intensity="medium"
          rounded="lg"
          className="overflow-hidden"
        >
          <pre className="p-6 overflow-x-auto">
            <code className="text-green-400 text-sm font-mono leading-relaxed">
              {value.code}
            </code>
          </pre>
        </LiquidGlass>
      </motion.div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-white mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-white mt-10 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-white mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-300 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <motion.div
        className="my-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <LiquidGlass
          variant="subtle"
          intensity="low"
          rounded="lg"
          className="border-l-4 border-blue-500/50 pl-6 py-4"
        >
          <blockquote className="text-gray-300 text-lg italic leading-relaxed">
            {children}
          </blockquote>
        </LiquidGlass>
      </motion.div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors duration-200 font-medium"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-800/70 text-green-400 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-gray-300 mb-6 space-y-3 text-lg">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-3 text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
  },
};

const BlogClientPage: React.FC<Props> = ({ params }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      // Only run in browser environment after component is mounted
      if (!mounted || typeof window === 'undefined') {
        return;
      }

      try {
        setLoading(true);
        
        // Dynamically import Sanity client only on client side
        const { client } = await import('@/sanity/client');
        
        const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          excerpt,
          body,
          mainImage {
            asset-> {
              url,
              _id,
              _ref
            },
            alt,
            caption
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
                url,
                _id,
                _ref
              }
            },
            bio
          }
        }`;
            
        const fetchedPost = await client.fetch(query, { slug: params.id });
        
        if (!fetchedPost) {
          setError('Blog post not found');
          return;
        }
        
        setPost(fetchedPost);
          
          // Fetch related posts
        const relatedQuery = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
          _id,
              title,
              slug,
          excerpt,
              mainImage {
            asset-> {
                  url
                },
                alt
          },
          publishedAt,
          estimatedReadingTime
        }`;
        
        const fetchedRelatedPosts = await client.fetch(relatedQuery, { slug: params.id });
        setRelatedPosts(fetchedRelatedPosts || []);
        
        setError(null);
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, mounted]);
    
  const sharePost = async (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Check out this blog post';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        } catch (err) {
          // Fallback for older browsers
        }
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {/* Enhanced Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"></div>
        </div>

        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <LiquidGlass
            variant="card"
            intensity="medium"
            rounded="2xl"
            className="p-8"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg font-medium">Loading blog post...</p>
          </LiquidGlass>
        </motion.div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {/* Enhanced Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[120px]"></div>
        </div>

        <motion.div
          className="text-center max-w-md mx-auto p-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LiquidGlass
            variant="card"
            intensity="medium"
            rounded="2xl"
            className="p-8"
          >
            <div className="text-red-400 text-6xl mb-6">📄</div>
            <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              {error || 'The blog post you\'re looking for doesn\'t exist or has been moved.'}
            </p>
            <LiquidGlass
              as={Link}
              href="/blog"
              variant="button"
              intensity="medium"
              rounded="full"
              className="inline-flex items-center px-6 py-3 text-white hover:text-blue-300 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </LiquidGlass>
          </LiquidGlass>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Background with Liquid Glass Aesthetic */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/3 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-7xl">
        {/* Enhanced Back Button */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LiquidGlass
            as={Link}
            href="/blog"
            variant="subtle"
            intensity="low"
            rounded="full"
            className="inline-flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </LiquidGlass>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Enhanced Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
                         <LiquidGlass
               variant="card"
               intensity="medium"
               rounded="2xl"
               className="p-6 md:p-12 lg:p-16 mb-8"
             >
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories
                    .filter(category => category && category.slug && category.title)
                    .map((category) => (
                      <LiquidGlass
                        key={category.slug.current}
                        variant="button"
                        intensity="low"
                        rounded="full"
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-400"
                      >
                        <FaTag className="mr-1.5 text-xs" />
                        {category.title}
                      </LiquidGlass>
                    ))}
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                {post.title}
              </h1>
                
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                <LiquidGlass
                  variant="subtle"
                  intensity="low"
                  rounded="full"
                  className="flex items-center px-3 py-1.5"
                >
                  <FaCalendarAlt className="mr-2 text-sm" />
                  {formatDate(post.publishedAt)}
                </LiquidGlass>
                {post.estimatedReadingTime && (
                  <LiquidGlass
                    variant="subtle"
                    intensity="low"
                    rounded="full"
                    className="flex items-center px-3 py-1.5"
                  >
                    <FaClock className="mr-2 text-sm" />
                    {post.estimatedReadingTime} min read
                  </LiquidGlass>
                )}
              </div>

                             {/* Featured Image */}
               {(() => {
                 const mainImageUrl = getSanityImageUrl(post.mainImage?.asset);
                 return mainImageUrl && (
                   <LiquidGlass
                     variant="card"
                     intensity="low"
                     rounded="xl"
                     className="relative h-64 md:h-96 overflow-hidden mb-8"
                   >
                     <Image
                       src={mainImageUrl}
                       alt={post.mainImage?.alt || post.title}
                       fill
                       className="object-cover"
                       onError={(e) => {
                         console.error('Main image failed to load:', mainImageUrl);
                         console.error('Main image asset:', post.mainImage?.asset);
                         console.error('Error details:', e);
                       }}
                       onLoad={() => {
                         console.log('Main image loaded successfully:', mainImageUrl);
                       }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                   </LiquidGlass>
                 );
               })()}
              
              {/* Enhanced Share Buttons */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-medium">Share:</span>
                <div className="flex gap-2">
                  <LiquidGlass
                    as="button"
                    onClick={() => sharePost('twitter')}
                    variant="button"
                    intensity="low"
                    rounded="full"
                    className="p-3 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter />
                  </LiquidGlass>
                  <LiquidGlass
                    as="button"
                    onClick={() => sharePost('linkedin')}
                    variant="button"
                    intensity="low"
                    rounded="full"
                    className="p-3 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin />
                  </LiquidGlass>
                  <LiquidGlass
                    as="button"
                    onClick={() => sharePost('copy')}
                    variant="button"
                    intensity="low"
                    rounded="full"
                    className="p-3 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label="Copy link"
                  >
                    <FaCopy />
                  </LiquidGlass>
                </div>
              </div>
            </LiquidGlass>
          </motion.div>

          {/* Debug Section - Remove this after fixing images */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <LiquidGlass
                variant="prominent"
                intensity="medium"
                rounded="xl"
                className="p-4 mb-8 bg-red-900/20"
              >
                                 <h3 className="text-red-400 font-bold mb-2">DEBUG INFO</h3>
                 <div className="text-xs text-gray-300 font-mono">
                   <p><strong>Main Image Asset:</strong></p>
                   <pre className="bg-gray-800 p-2 rounded text-xs overflow-auto">
                     {JSON.stringify(post.mainImage?.asset, null, 2)}
                   </pre>
                   <p className="mt-2"><strong>Constructed URL:</strong></p>
                   <p className="break-all text-green-400">
                     {getSanityImageUrl(post.mainImage?.asset)}
                   </p>
                   <p className="mt-2"><strong>Test Image (HTML img):</strong></p>
                   <img 
                     src={getSanityImageUrl(post.mainImage?.asset) || ''}
                     alt="Test"
                     className="w-32 h-24 object-cover border border-green-400"
                     onLoad={() => console.log('HTML img loaded successfully')}
                     onError={() => console.log('HTML img failed to load')}
                   />
                 </div>
              </LiquidGlass>
            </motion.div>
          )}

          {/* Enhanced Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
                       <LiquidGlass
             variant="clean"
             intensity="low"
             rounded="2xl"
             className="p-6 md:p-12 lg:p-16 mb-8"
           >
             <article className="prose prose-lg prose-invert max-w-none">
               {post.body && (
                 <PortableText
                   value={post.body}
                   components={portableTextComponents}
                 />
               )}
             </article>
           </LiquidGlass>
          </motion.div>

          {/* Enhanced Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <LiquidGlass
                variant="card"
                intensity="low"
                rounded="xl"
                className="p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FaTag className="mr-2 text-blue-400" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <LiquidGlass
                      key={tag}
                      variant="subtle"
                      intensity="low"
                      rounded="full"
                      className="px-3 py-1.5 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      #{tag}
                    </LiquidGlass>
                  ))}
                </div>
              </LiquidGlass>
            </motion.div>
          )}
          
          {/* Enhanced Author Info */}
          {post.author && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <LiquidGlass
                variant="card"
                intensity="medium"
                rounded="xl"
                className="p-6"
              >
                <div className="flex items-start space-x-4">
                  <LiquidGlass
                    variant="subtle"
                    intensity="low"
                    rounded="full"
                    className="p-1"
                  >
                    {post.author.image?.asset?.url ? (
                      <Image
                        src={post.author.image.asset.url}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-400 text-xl" />
                      </div>
                    )}
                  </LiquidGlass>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      About {post.author.name}
                    </h3>
                    {post.author.bio && (
                      <p className="text-gray-300 leading-relaxed">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              </LiquidGlass>
            </motion.div>
          )}
        
          {/* Enhanced Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <LiquidGlass
                variant="card"
                intensity="medium"
                rounded="2xl"
                className="p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 * index }}
                    >
                      <Link href={`/blog/${relatedPost.slug.current}`} className="group block">
                        <LiquidGlass
                          variant="card"
                          intensity="low"
                          rounded="xl"
                          morphOnHover={true}
                          className="overflow-hidden h-full transition-all duration-300"
                        >
                                                     {(() => {
                             const relatedImageUrl = getSanityImageUrl(relatedPost.mainImage?.asset);
                             return relatedImageUrl && (
                               <div className="relative h-32 overflow-hidden">
                                 <Image
                                   src={relatedImageUrl}
                                   alt={relatedPost.mainImage?.alt || relatedPost.title}
                                   fill
                                   className="object-cover group-hover:scale-105 transition-transform duration-300"
                                   unoptimized
                                   onError={(e) => {
                                     console.error('Related image failed to load:', relatedImageUrl);
                                   }}
                                 />
                               </div>
                             );
                           })()}
                          <div className="p-4">
                            <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            {relatedPost.excerpt && (
                              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                {relatedPost.excerpt}
                              </p>
                            )}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{formatDate(relatedPost.publishedAt)}</span>
                              {relatedPost.estimatedReadingTime && (
                                <span>{relatedPost.estimatedReadingTime} min read</span>
                              )}
                            </div>
                          </div>
                        </LiquidGlass>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </LiquidGlass>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogClientPage;