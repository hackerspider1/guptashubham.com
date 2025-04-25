import { Metadata } from "next";
import XssClientWrapper from "./XssClientWrapper";

export const metadata: Metadata = {
  title: "XSS Vulnerability Scanner | Interactive Security Tool",
  description: "Test your web applications for Cross-Site Scripting (XSS) vulnerabilities with our advanced interactive scanner. Check if your site is protected against various XSS attack vectors.",
  openGraph: {
    title: "XSS Vulnerability Scanner | Interactive Security Tool",
    description: "Test your web applications for Cross-Site Scripting (XSS) vulnerabilities with our advanced interactive scanner. Check if your site is protected against various XSS attack vectors.",
    type: "website"
  }
};

export default function XssPage() {
  return <XssClientWrapper />;
}