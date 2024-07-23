import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SummarEase",
  description:
    "SummarEase is an advanced AI-powered tool that transforms lengthy articles, blogs, and site content into concise, easy-to-read summaries. Save time and stay informed with our efficient content summarization technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background dark:bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}
