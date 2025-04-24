import React from 'react';
import BlogPostClientWrapper from "./BlogPostClientWrapper";
import { client } from "@/sanity/client";

export async function generateStaticParams() {
  try {
    // Fetch all possible slugs from your Sanity dataset
    const posts = await client.fetch(`*[_type == "post"].slug.current`);
    
    return posts.map((slug: string) => ({
      id: slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function Page() {
  return <BlogPostClientWrapper />;
}