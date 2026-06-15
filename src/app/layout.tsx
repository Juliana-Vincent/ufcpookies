import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "The Octagon Feed - Ultimate UFC Fanpage",
  description: "Explore the profiles of your favorite UFC fighters, upcoming fight cards, and historic MMA archives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-red-600 selection:text-white font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}