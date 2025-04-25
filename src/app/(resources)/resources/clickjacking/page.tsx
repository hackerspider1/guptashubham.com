import { Metadata } from "next";
import ClickjackingClientWrapper from "./ClickjackingClientWrapper";

export const metadata: Metadata = {
  title: "Clickjacking Vulnerability Tester | Interactive Security Tool",
  description: "Test your web applications for Clickjacking vulnerabilities with our advanced interactive tool. Check if your site is protected with proper X-Frame-Options or CSP headers.",
  openGraph: {
    title: "Clickjacking Vulnerability Tester | Interactive Security Tool",
    description: "Test your web applications for Clickjacking vulnerabilities with our advanced interactive tool. Check if your site is protected with proper X-Frame-Options or CSP headers.",
    type: "website"
  }
};

export default function ClickjackingPage() {
  return <ClickjackingClientWrapper />;
}