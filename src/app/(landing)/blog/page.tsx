import React from "react";
import { Metadata } from "next";
import BlogClientWrapper from "./BlogClientWrapper";

export const metadata: Metadata = {
  title: "Blog | Shubham Gupta",
  description: "Explore articles on cybersecurity, ethical hacking, and web security research.",
  openGraph: {
    title: "Blog | Shubham Gupta",
    description: "Explore articles on cybersecurity, ethical hacking, and web security research.",
    type: "website"
  }
};

export default function BlogPage() {
  return <BlogClientWrapper />;
}