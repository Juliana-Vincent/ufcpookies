"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Main", path: "/" },
  { name: "Fighters", path: "/fighters" },
  { name: "Archive", path: "/archive" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-100 flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-xl bg-black/40 border-b border-white/5">
      <div className="flex items-center gap-12">
        {/* LOGO */}
        <Link href="/">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-black italic tracking-tighter cursor-pointer"
          >
            UFC<span className="text-red-600 underline decoration-4 underline-offset-4"></span>
          </motion.h1>
        </Link>
        
        {/* LINKS */}
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-zinc-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="h-0.5 bg-red-600 mt-1"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <Link href="/archive" className="bg-white text-black text-[10px] font-black uppercase px-5 py-2 italic hover:bg-red-600 hover:text-white transition-all duration-300">
        The Vault
      </Link>
    </nav>
  );
}