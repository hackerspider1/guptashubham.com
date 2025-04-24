import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Outlet from "@/components/Outlet";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const GA_TRACKING_ID = 'G-91KCWFBS21';

export const metadata: Metadata = {
  title: "Shubham Gupta | Security Researcher | Bug Hunter",
  description: "Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research. Featured in Hackerone, Bugcrowd, and Google.",
  keywords: ["Shubham Gupta", "Security Researcher", "Bug Hunter", "Penetration Testing", "Bug Bounty", "Application Security"],
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://guptashubham.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body>
        <Outlet>{children}</Outlet>
      </body>
    </html>
  );
}
