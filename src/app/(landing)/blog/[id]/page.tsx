import { Metadata } from 'next';
import BlogClientPage from './components/BlogClientPage';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // Default metadata - in a real app, you'd fetch the post data here
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

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  return <BlogClientPage params={resolvedParams} />;
}