"use client";
import { client } from "@/sanity/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import CustomPortableText from "./CustomPortableText";

const BlogClientPage = () => {
  const { id: slug } = useParams();

  const [singlePost, setSinglePost] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(
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
      )
      .then((data) => setSinglePost(data[0]))
      .then(() => setIsLoading(false))
  }, [slug])

  return (<div className="max-w-4xl mx-auto">
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <>
        <h1 className="text-4xl font-semibold">{singlePost?.title}</h1>
        <div>{moment(singlePost?.publishedAt).format("Do MMMM YYYY")}</div>
        <CustomPortableText value={singlePost?.body} />
      </>
    )}
  </div>);
};

export default BlogClientPage;