import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Outlet from "@/components/Outlet";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const GA_TRACKING_ID = 'G-91KCWFBS21';

export const metadata: Metadata = {
  title: "Shubham Gupta | Security Researcher | Bug Hunter",
  description: "Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research. Featured in Hackerone, Bugcrowd, and Google.",
  keywords: ["Shubham Gupta", "Security Researcher", "Bug Hunter", "Penetration Testing", "Bug Bounty", "Application Security", "Cybersecurity Expert", "Ethical Hacker"],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guptashubham.com',
    siteName: 'Shubham Gupta',
    title: 'Shubham Gupta | Security Researcher & Bug Hunter',
    description: 'Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research.',
    images: [
      {
        url: 'https://guptashubham.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shubham Gupta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubham Gupta | Security Researcher & Bug Hunter',
    description: 'Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research.',
    images: ['https://guptashubham.com/og-image.png'],
    creator: '@hackerspider1',
  },
  metadataBase: new URL("https://guptashubham.com"),
  alternates: {
    canonical: 'https://guptashubham.com',
  },
  authors: [
    { name: 'Shubham Gupta', url: 'https://guptashubham.com' },
  ],
  category: 'Cybersecurity',
  verification: {
    google: 'add-your-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        
        <Script id="schema-structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Shubham Gupta",
              "url": "https://guptashubham.com",
              "image": "https://guptashubham.com/shubham_gupta.png",
              "jobTitle": "Security Researcher",
              "description": "Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research.",
              "sameAs": [
                "https://twitter.com/hackerspider1",
                "https://github.com/hackerspider1",
                "https://www.linkedin.com/in/shubhamgupta-in/"
              ],
              "knowsAbout": ["Cybersecurity", "Penetration Testing", "Bug Bounty", "Security Research", "Ethical Hacking"]
            }
          `}
        </Script>
        
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        <link rel="preload" as="image" href="/shubham_gupta.png" />
        <link rel="preload" as="font" href="/fonts/inter.woff2" type="font/woff2" crossOrigin="anonymous" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <Outlet>{children}</Outlet>
      </body>
    </html>
  );
}
