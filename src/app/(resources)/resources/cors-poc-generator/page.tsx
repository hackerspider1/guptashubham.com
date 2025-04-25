import { Metadata } from "next";
import CorsClientWrapper from "./CorsClientWrapper";

export const metadata: Metadata = {
  title: "CORS Vulnerability PoC Generator | Interactive Security Tool",
  description: "Generate proof-of-concept exploits for CORS vulnerabilities with our advanced interactive tool. Test if your web applications are protected against cross-origin attacks.",
  openGraph: {
    title: "CORS Vulnerability PoC Generator | Interactive Security Tool",
    description: "Generate proof-of-concept exploits for CORS vulnerabilities with our advanced interactive tool. Test if your web applications are protected against cross-origin attacks.",
    type: "website"
  }
};

export default function CorsPage() {
  return <CorsClientWrapper />;
}