import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "UFC pookies",
  description: "UFC fanpage with fighter data and archives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased selection:bg-red-600 selection:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}