import { Metadata } from "next";
import XssClientWrapper from "./XssClientWrapper";

export const metadata: Metadata = {
  title: "XSS Scanner | Shubham Gupta",
  description: "Test websites for cross-site scripting vulnerabilities - a security tool by Shubham Gupta",
  openGraph: {
    title: "XSS Scanner | Shubham Gupta",
    description: "Test websites for cross-site scripting vulnerabilities - a security tool by Shubham Gupta",
    type: "website"
  }
};

export default function XssPage() {
  return <XssClientWrapper />;
}