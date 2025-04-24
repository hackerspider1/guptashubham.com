import { Metadata } from "next";
import ClickjackingClientWrapper from "./ClickjackingClientWrapper";

export const metadata: Metadata = {
  title: "Clickjacking Tester | Shubham Gupta",
  description: "Test websites for clickjacking vulnerabilities - a security tool by Shubham Gupta",
  openGraph: {
    title: "Clickjacking Tester | Shubham Gupta",
    description: "Test websites for clickjacking vulnerabilities - a security tool by Shubham Gupta",
    type: "website"
  }
};

export default function ClickjackingPage() {
  return <ClickjackingClientWrapper />;
}