import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
