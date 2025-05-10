import React, { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url";
import { client } from '@/sanity/client';

// Use type any for prismjs to avoid type issues
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// Load markup-templating first as it's required by other components
import "prismjs/components/prism-markup-templating";
// Add markup/HTML support
import "prismjs/components/prism-markup";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-php";
import "prismjs/components/prism-java";
import "prismjs/components/prism-go";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-yaml";

// Image Zoom Component
const ImageZoom = ({ src, alt, caption }: { src: string, alt: string, caption?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);

  // Handle image load to get natural dimensions
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalWidth(img.naturalWidth);
    setNaturalHeight(img.naturalHeight);
    setIsLoaded(true);
  };

  return (
    <>
      <div className="my-6 mx-auto" style={{ maxWidth: '100%' }}>
        <div 
          className="relative cursor-zoom-in overflow-hidden rounded-lg border border-zinc-800 bg-transparent transition-all hover:shadow-lg"
          onClick={() => setIsOpen(true)}
          style={{ 
            maxWidth: naturalWidth > 0 ? `${Math.min(naturalWidth, 800)}px` : '100%',
            margin: '0 auto'
          }}
        >
          {/* Image with natural dimensions */}
          <div className="relative w-full">
            <img
              src={src}
              alt={alt || ''}
              className="w-full h-auto object-contain"
              onLoad={handleImageLoad}
              style={{ 
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                display: 'block'
              }}
            />
            
            {/* Show loading state while image loads */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/20">
                <div className="w-8 h-8 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Only show zoom indicator when image is loaded */}
          {isLoaded && (
            <div className="absolute bottom-2 right-2 rounded-full bg-zinc-800/80 p-1.5 text-xs text-zinc-300 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          )}
        </div>
        {caption && (
          <p className="mt-2 text-center text-sm text-zinc-400">{caption}</p>
        )}
      </div>

      {/* Lightbox modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={src}
              alt={alt || ''}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button 
              className="absolute -top-10 right-0 p-2 text-zinc-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          {caption && (
            <p className="absolute bottom-4 left-1/2 max-w-lg -translate-x-1/2 text-center text-sm text-zinc-300 bg-black/60 p-2 rounded backdrop-blur-sm">
              {caption}
            </p>
          )}
        </div>
      )}
    </>
  );
};

const builder = imageUrlBuilder(client);

// Custom serializers for Portable Text with dark theme
const PortableTextComponents = {
    // Block level serializers
    block: {
        // Handle different block styles
        normal: ({ children }: { children: any }) => <p className="text-gray-300 my-4 leading-relaxed">{children}</p>,
        h1: ({ children }: { children: any }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
        h2: ({ children }: { children: any }) => {
            // Generate ID for table of contents
            const id = children
                ? children
                    .join('')
                    .toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .replace(/\s+/g, '-')
                : '';
            
            return (
                <h2 id={id} className="group flex items-center">
                    {children}
                    <a 
                        href={`#${id}`} 
                        className="ml-2 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-400 transition-opacity"
                        aria-label={`Link to ${children}`}
                    >
                        #
                    </a>
                </h2>
            );
        },
        h3: ({ children }: { children: any }) => {
            const id = children
                ? children
                    .join('')
                    .toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .replace(/\s+/g, '-')
                : '';
            
            return (
                <h3 id={id} className="group flex items-center">
                    {children}
                    <a 
                        href={`#${id}`} 
                        className="ml-2 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-400 transition-opacity"
                        aria-label={`Link to ${children}`}
                    >
                        #
                    </a>
                </h3>
            );
        },
        h4: ({ children }: { children: any }) => {
            const id = children
                ? children
                    .join('')
                    .toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .replace(/\s+/g, '-')
                : '';
            
            return (
                <h4 id={id} className="group flex items-center">
                    {children}
                    <a 
                        href={`#${id}`} 
                        className="ml-2 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-400 transition-opacity"
                        aria-label={`Link to ${children}`}
                    >
                        #
                    </a>
                </h4>
            );
        },
        blockquote: ({ children }: { children: any }) => (
            <div className="pl-4 italic my-6 text-gray-400 relative">
                <div className="bg-gray-800 rounded px-4 w-fit">
                    {/* <p className="text-lg font-bold mb-2">Quote</p> */}
                    <p className="terminal-text">{children}</p>
                </div>
            </div>
        ),
        // Custom code block with syntax highlighting
        code: ({ value }: { value: any }) => {
            console.log(value)
            // if (!value?.code) return null;
            return (
                <div className="my-6 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                    <div className="bg-gray-900 px-4 py-2 text-gray-300 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm font-mono">{value.language || 'code'}</span>
                    </div>
                    <SyntaxHighlighter
                        language={value.language || 'javascript'}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: '1rem', borderRadius: '0 0 0.5rem 0.5rem', background: '#00000' }}
                    >
                        {value?.children?.[0]?.text}
                    </SyntaxHighlighter>
                </div>
            );
        },
    },

    // List serializers
    list: {
        bullet: ({ children }: { children: any }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
        number: ({ children }: { children: any }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: { children: any }) => <li className="text-gray-300">{children}</li>,
        number: ({ children }: { children: any }) => <li className="text-gray-300">{children}</li>,
    },

    // Inline serializers
    marks: {
        strong: ({ children }: { children: any }) => <strong className="font-bold text-white">{children}</strong>,
        em: ({ children }: { children: any }) => <em className="italic text-gray-300">{children}</em>,
        code: ({ children }: { children: any }) => (
            <code className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded font-mono text-sm">
                {children}
            </code>
        ),
        link: ({ children, value }: any) => (
            <a
                href={value?.href}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
                target={value?.href?.startsWith('http') ? '_blank' : undefined}
                rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        ),
        highlight: ({ children }: { children: any }) => (
            <span className="bg-purple-900 text-purple-100 px-1 rounded">{children}</span>
        ),
    },

    // Custom types
    types: {
        image: ({ value }: { value: any }) => {
            if (!value?.asset?._ref) return null;

            const imageUrl = builder.image(value).url();

            return (
                <ImageZoom
                  src={imageUrl}
                  alt={value.alt || ''}
                  caption={value.caption}
                />
            );
        },
        callout: ({ value }: { value: any }) => {
            const typeStyles = {
                info: "bg-blue-900 border-blue-500 text-blue-200",
                warning: "bg-yellow-900 border-yellow-500 text-yellow-200",
                error: "bg-red-900 border-red-500 text-red-200",
                success: "bg-green-900 border-green-500 text-green-200",
            };
            // @ts-ignore
            const style: any = typeStyles[value.type] || typeStyles.info;

            return (
                <div className={`p-4 my-6 border-l-4 rounded-r-lg ${style}`}>
                    <div className="font-bold mb-2">{value.title}</div>
                    <div>{value.text}</div>
                </div>
            );
        },
        codeSnippet: ({ value }: { value: any }) => {
            if (!value?.code) return null;
            return (
                <div className="my-6 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                    <div className="bg-gray-900 px-4 py-2 text-gray-300 flex justify-between items-center">
                        <span className="text-sm font-mono">{value.filename || value.language || 'code'}</span>
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                    <SyntaxHighlighter
                        language={value.language || 'javascript'}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: '1rem', borderRadius: '0 0 0.5rem 0.5rem', background: '#1a1a1a' }}
                        showLineNumbers={value.showLineNumbers}
                        lineNumberStyle={{ color: '#666', fontSize: '0.8em' }}
                    >
                        {value.code}
                    </SyntaxHighlighter>
                    {value.caption && (
                        <div className="bg-gray-800 text-sm text-gray-400 p-2 border-t border-gray-700">
                            {value.caption}
                        </div>
                    )}
                </div>
            );
        },
        embed: ({ value }: { value: any }) => {
            return (
                <div className="my-6">
                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                        <iframe
                            src={value.url}
                            title={value.title || "Embedded content"}
                            width="100%"
                            height={value.height || 400}
                            className="border-0"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                    {value.caption && (
                        <p className="text-sm text-gray-400 mt-2 text-center">{value.caption}</p>
                    )}
                </div>
            );
        },
        table: ({ value }: { value: any }) => {
            if (!value?.rows?.length) return null;

            return (
                <div className="my-6 overflow-x-auto rounded-lg shadow border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                        {value.showHeader && (
                            <thead className="bg-gray-800">
                                <tr>
                                    {/* @ts-ignore */}
                                    {value.rows[0].cells.map((cell, cellIndex) => (
                                        <th
                                            key={cellIndex}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            {cell}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        )}
                        <tbody className="bg-gray-900 divide-y divide-gray-800">
                            {/* @ts-ignore */}
                            {value.rows.slice(value.showHeader ? 1 : 0).map((row, rowIndex) => (
                                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                                    {/* @ts-ignore */}
                                    {row.cells.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
};

// Main component to use for rendering Portable Text content
export const CustomPortableText = ({ value, isDarkMode = true }: { value: any, isDarkMode?: boolean }) => {
    useEffect(() => {
        // Initialize Prism
        Prism.highlightAll();
    }, [value]);

    if (!value) {
        return null;
    }

    // Create a modified components object that adapts to dark/light mode
    const adaptedComponents = {
        ...PortableTextComponents,
        // Adjust block styles for light mode
        block: {
            ...PortableTextComponents.block,
            normal: ({ children }: { children: any }) => (
                <p className={isDarkMode ? "text-gray-300 my-4 leading-relaxed" : "text-gray-700 my-4 leading-relaxed"}>
                    {children}
                </p>
            ),
            h1: ({ children }: { children: any }) => (
                <h1 className={isDarkMode ? "text-3xl font-bold mt-8 mb-4 text-white" : "text-3xl font-bold mt-8 mb-4 text-gray-900"}>
                    {children}
                </h1>
            ),
            h2: ({ children }: { children: any }) => {
                // Generate ID for table of contents
                const id = children
                    ? children
                        .join('')
                        .toLowerCase()
                        .replace(/[^\w\s]/g, '')
                        .replace(/\s+/g, '-')
                    : '';
                
                return (
                    <h2 id={id} className="group flex items-center">
                        {children}
                        <a 
                            href={`#${id}`} 
                            className="ml-2 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-400 transition-opacity"
                            aria-label={`Link to ${children}`}
                        >
                            #
                        </a>
                    </h2>
                );
            },
            h3: ({ children }: { children: any }) => {
                const id = children
                    ? children
                        .join('')
                        .toLowerCase()
                        .replace(/[^\w\s]/g, '')
                        .replace(/\s+/g, '-')
                    : '';
                
                return (
                    <h3 id={id} className="group flex items-center">
                        {children}
                        <a 
                            href={`#${id}`} 
                            className="ml-2 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-400 transition-opacity"
                            aria-label={`Link to ${children}`}
                        >
                            #
                        </a>
                    </h3>
                );
            },
            h4: ({ children }: { children: any }) => {
                const id = children
                    ? children
                        .join('')
                        .toLowerCase()
                        .replace(/[^\w\s]/g, '')
                        .replace(/\s+/g, '-')
                    : '';
                
                return (
                    <h4 id={id} className="group flex items-center">
                        {children}
                        <a 
                            href={`#${id}`} 
                            className="ml-2 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-400 transition-opacity"
                            aria-label={`Link to ${children}`}
                        >
                            #
                        </a>
                    </h4>
                );
            },
        },
        // Adjust mark styles for light mode
        marks: {
            ...PortableTextComponents.marks,
            strong: ({ children }: { children: any }) => (
                <strong className={isDarkMode ? "font-bold text-white" : "font-bold text-gray-900"}>
                    {children}
                </strong>
            ),
            em: ({ children }: { children: any }) => (
                <em className={isDarkMode ? "italic text-gray-300" : "italic text-gray-700"}>
                    {children}
                </em>
            ),
            code: ({ children }: { children: any }) => (
                <code className={isDarkMode 
                    ? "bg-gray-800 text-pink-400 px-1 py-0.5 rounded font-mono text-sm" 
                    : "bg-gray-200 text-pink-600 px-1 py-0.5 rounded font-mono text-sm"
                }>
                    {children}
                </code>
            ),
            link: ({ children, value }: any) => (
                <a
                    href={value?.href}
                    className={isDarkMode 
                        ? "text-purple-400 hover:text-purple-300 underline transition-colors" 
                        : "text-purple-700 hover:text-purple-800 underline transition-colors"
                    }
                    target={value?.href?.startsWith('http') ? '_blank' : undefined}
                    rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                    {children}
                </a>
            ),
        }
    };

    return (
        <div className="prose prose-invert prose-lg max-w-none">
        {/* @ts-ignore */}
            <PortableText value={value} components={adaptedComponents} />
        </div>
    );
};

export default CustomPortableText;