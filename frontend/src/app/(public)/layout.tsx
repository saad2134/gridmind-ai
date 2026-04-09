import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { Providers } from "@/components/providers";
import Navbar from "@/components/sections/navbar/default";
import FooterSection from "@/components/sections/footer/default";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GridMind AI ✧ Autonomous Decision Engine for Smart Energy Grids",
  description: "AI-powered platform for predicting energy demand, optimizing grid decisions, and explaining AI reasoning in real time",
  keywords: ["energy", "AI", "smart grid", "demand forecasting", "machine learning"],
  authors: [{ name: "GridMind AI Team" }],
  openGraph: {
    title: "GridMind AI ✧ Autonomous Decision Engine for Smart Energy Grids",
    description: "Predict energy demand, optimize grid decisions, and explain AI reasoning",
    type: "website",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterSection />
    </Providers>
  );
}
