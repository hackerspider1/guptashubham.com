"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, BookOpen, FileText, ArrowRight } from "lucide-react";
import { client } from "@/sanity/client";
import moment from "moment";

const AnimatedBackground = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900 opacity-75 z-0"></div>
);
export default function BlogHome() {

  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(_createdAt desc) {
          title,
          slug,
          body,
          "categories": categories[]->title,
          publishedAt,
          mainImage {
            asset -> {
              _id,
              url
            },
            alt
          }
        }`
      )
      // @ts-ignore
      .then((data) => setPosts(data?.sort((a:any, b:any) => new Date(b?.publishedAt) - new Date(a?.publishedAt))))
      .catch(console.error)
    setTimeout(() => {
      setIsLoading(false)
    }, 400);
  }, [])

  console.log(posts, "posts")


  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white pb-20">
      {/* <AnimatedBackground /> */}

      <div className="relative z-10 max-w-7xl w-full px-6">
        {/* <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tight mb-4 leading-20 ">
            Blog
          </h1>
          <p className="text-2xl text-gray-300">
            Stay updated with the latest trends in cybersecurity.
          </p>
        </div> */}

        {/* Featured Blog */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Latest Posts</h2>
          <Link href={`/blogs/${posts?.[0]?.slug?.current || ""}`} className="w-full bg-white/5 p-6 rounded-xl border border-white/10 group">
            <div className="text-center md:text-left">
              <img className="w-full group-hover:scale-105 transition-all duration-200 ease-in-out" src={posts?.[0]?.mainImage?.asset?.url} alt="" />
              <div className="flex items-center gap-4">
                {/* <img className="w-auto h-16" src="/shubham_gupta.png" alt="" /> */}
                <div className="">
                  <h3 className="text-2xl font-semibold mb-2">{posts?.[0]?.title}</h3>
                  {/* <p className="text-gray-300 text-sm mb-4">{blogs[0].excerpt}</p> */}
                  <p className="text-gray-400 text-xs flex items-center justify-center md:justify-start">
                    <Calendar className="w-4 h-4 mr-2" /> {moment(posts?.[0]?.publishedAt).format("Do MMMM YYYY")}
                  </p>
                  <div className="text-blue-400 hover:underline flex items-center mt-4">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.slice(1).map((blog, index) => (
              <Link href={`/blogs/${blog?.slug?.current || ""}`} key={index} className="flex flex-col justify-between bg-white/5 p-6 rounded-xl border border-white/10 group">
                <img className="h-32 w-full object-contain group-hover:scale-105 transition-all duration-200 ease-in-out" src={blog?.mainImage?.asset?.url} alt="" />
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-2">{blog?.title}</h3>
                  {/* <p className="text-gray-300 text-sm mb-4">{blog.excerpt}</p> */}
                  <p className="text-gray-400 text-xs flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> {moment(blog?.publishedAt).format("Do MMMM YYYY")}
                  </p>
                  <div className="text-blue-400 hover:underline flex items-center mt-4">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}