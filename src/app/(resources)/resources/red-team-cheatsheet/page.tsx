import { Metadata } from "next";
import RedTeamCheatsheetWrapper from "./RedTeamCheatsheetWrapper";

export const metadata: Metadata = {
  title: "Red Team Cheatsheet | Interactive Security Tool",
  description: "Interactive Red Team Cheatsheet with categorized commands and techniques for penetration testing, ethical hacking, and security assessments.",
  openGraph: {
    title: "Red Team Cheatsheet | Interactive Security Tool",
    description: "Interactive Red Team Cheatsheet with categorized commands and techniques for penetration testing, ethical hacking, and security assessments.",
    type: "website"
  }
};

export default function RedTeamCheatsheetPage() {
  return <RedTeamCheatsheetWrapper />;
} 