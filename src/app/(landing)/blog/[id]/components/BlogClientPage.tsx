"use client";
import { client } from "@/sanity/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import CustomPortableText from "./CustomPortableText";
import { Facebook, Twitter, Linkedin, Copy, Check, ArrowLeft } from "lucide-react";

const BlogClientPage = () => {
  const params = useParams();
  const slug = params && typeof params.id === 'string' ? params.id : null;
  const router = useRouter();
  const [singlePost, setSinglePost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back button at the top */}
      <button 
        onClick={() => router.push('/blog')} 
        className="mb-6 flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </button>
      
      {singlePost.mainImage?.asset?.url && (
        <img 
          src={singlePost.mainImage.asset.url} 
          alt={singlePost.mainImage.alt || singlePost.title} 
          className="w-full rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-semibold mb-2">{singlePost.title}</h1>
      <div className="text-gray-400 mb-4">{moment(singlePost.publishedAt).format("Do MMMM YYYY")}</div>
      
      {/* Social Sharing */}
      <div className="flex items-center space-x-4 mb-8 border-t border-b border-zinc-800 py-4">
        <span className="text-sm text-gray-400">Share:</span>
        <a 
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
        </a>
        <a 
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-sky-500 rounded-full hover:bg-sky-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
        </a>
        <a 
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-800 rounded-full hover:bg-blue-900 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <button 
          onClick={copyToClipboard}
          className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors flex items-center"
          aria-label="Copy link"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
        {copied && <span className="text-xs text-green-400">Copied!</span>}
      </div>

      <CustomPortableText value={singlePost.body} />
      
      {/* Related Posts Section - Redesigned to match website theme */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <h3 className="text-xl font-semibold text-white mb-6">
            More Posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <div 
                key={index}
                onClick={() => router.push(`/blog/${post.slug.current}`)}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                {/* Reduced height image container */}
                <div className="w-full h-32 flex-shrink-0 bg-zinc-800">
                  {post.mainImage?.asset?.url ? (
                    <img 
                      src={post.mainImage.asset.url} 
                      alt={post.mainImage.alt || post.title} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-zinc-500">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-zinc-400">
                      {moment(post.publishedAt).format("MMM D, YYYY")}
                    </span>
                    <span className="text-xs text-blue-500 font-medium">
                      Read more
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogClientPage;