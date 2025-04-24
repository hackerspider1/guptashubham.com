import React from 'react';
import { PortableText } from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url";
import { client } from '@/sanity/client';

const builder = imageUrlBuilder(client);

// Custom serializers for Portable Text with dark theme
const PortableTextComponents = {
    // Block level serializers
    block: {
        // Handle different block styles
        normal: ({ children }: { children: any }) => <p className="text-gray-300 my-4 leading-relaxed">{children}</p>,
        h1: ({ children }: { children: any }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
        h2: ({ children }: { children: any }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h2>,
        h3: ({ children }: { children: any }) => <h3 className="text-xl font-semibold mt-5 mb-2 text-white">{children}</h3>,
        h4: ({ children }: { children: any }) => <h4 className="text-lg font-semibold mt-4 mb-2 text-white">{children}</h4>,
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
                <div className="my-6">
                    <div className="relative overflow-hidden rounded-lg w-fit shadow-md border border-gray-700">
                        <img
                            src={imageUrl}
                            alt={value.alt || ''}
                            className="w-auto object-contain h-auto"
                        />
                    </div>
                    {value.caption && (
                        <p className="text-sm text-gray-400 mt-2 text-center italic">{value.caption}</p>
                    )}
                </div>
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
export const CustomPortableText = ({ value }: { value: any }) => {
    if (!value) {
        return null;
    }

    return (
        <div className="prose prose-invert prose-lg max-w-none">
        {/* @ts-ignore */}
            <PortableText value={value} components={PortableTextComponents} />
        </div>
    );
};

export default CustomPortableText;