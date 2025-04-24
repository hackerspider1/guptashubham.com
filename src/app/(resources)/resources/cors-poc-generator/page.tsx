import { Metadata } from "next";
import CorsClientWrapper from "./CorsClientWrapper";

export const metadata: Metadata = {
  title: "CORS PoC Generator | Shubham Gupta",
  description: "Generate proof-of-concept code for CORS vulnerabilities - a security tool by Shubham Gupta",
  openGraph: {
    title: "CORS PoC Generator | Shubham Gupta",
    description: "Generate proof-of-concept code for CORS vulnerabilities - a security tool by Shubham Gupta",
    type: "website"
  }
};

export default function CorsPage() {
  return <CorsClientWrapper />;
}