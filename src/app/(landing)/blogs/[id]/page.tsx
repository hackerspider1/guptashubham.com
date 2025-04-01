// page.tsx (Server Component)
import { client } from "@/sanity/client";
import BlogClientPage from "./components/BlogClientPage";

// Generate static params at build time
export async function generateStaticParams() {
  // Fetch all possible slugs from your Sanity dataset
  const posts = await client.fetch(`*[_type == "post"].slug.current`);
  
  return posts.map((slug:any) => ({
    id: slug,
  }));
}

// Server component that wraps the client component
export default function Page() {
  return <BlogClientPage />;
}