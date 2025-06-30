import { Metadata } from 'next';
import BlogClientPage from './components/BlogClientPage';
import { client } from '@/sanity/client';

// Function to fetch all blog posts for static generation
async function getAllBlogPosts() {
  try {
    // This query fetches all blog post slugs from Sanity
    const query = `*[_type == "post"] { slug { current } }`;
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return []; // Return empty array to avoid build failures
  }
}

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  // Return an array of objects with the id parameter
  return posts.map((post: { slug: { current: string } }) => ({
    id: post.slug.current,
  }));
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  
  return {
    title: `Blog Post - ${id} | Shubham Gupta`,
    description: 'Cybersecurity insights and security research by Shubham Gupta.',
    keywords: 'cybersecurity, bug bounty, security research, ethical hacking, penetration testing',
    openGraph: {
      title: `Blog Post - ${id} | Shubham Gupta`,
      description: 'Cybersecurity insights and security research.',
      url: `https://guptashubham.com/blog/${id}`,
      siteName: 'Shubham Gupta',
      images: [
        {
          url: 'https://guptashubham.com/og-blog.png',
          width: 1200,
          height: 630,
          alt: 'Shubham Gupta Blog',
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Blog Post - ${id} | Shubham Gupta`,
      description: 'Cybersecurity insights and security research.',
      images: ['https://guptashubham.com/og-blog.png'],
      creator: '@hackerspider1',
    },
    alternates: {
      canonical: `https://guptashubham.com/blog/${id}`,
    },
  };
}

// The page component
export default function BlogPostPage({ params }: Props) {
  return <BlogClientPage params={params} />;
}