import { Metadata } from "next";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Shubham Gupta - Security Researcher & Ethical Hacker",
  description: "Personal website of Shubham Gupta, a security researcher, ethical hacker, and bug bounty hunter specializing in web and mobile application security.",
  openGraph: {
    title: "Shubham Gupta - Security Researcher & Ethical Hacker",
    description: "Personal website of Shubham Gupta, a security researcher, ethical hacker, and bug bounty hunter specializing in web and mobile application security.",
    type: "website"
  }
};

export default function HomePage() {
  return <ClientWrapper />;
}