"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FighterProps {
  id: string;
  name: string;
  nickname: string;
  weight_class: string;
  image: string;
  slug: string;
  priority?: boolean;
}

export default function FighterCard({ id, name, nickname, weight_class, image, slug, priority }: FighterProps) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Link href={`/fighters/${slug}`}>
      <motion.div 
        whileHover={{ scale: 1.05, zIndex: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative aspect-9/16 w-full min-w-70 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 cursor-pointer transition-all duration-500 group/card
        hover:border-red-600/50 group-hover/container:opacity-60 hover:opacity-100! hover:blur-none! shadow-2xl">
        <Image fill
          src={image} 
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/card:scale-110" bject-cover ease-out
          ${isLoading ? "scale-110 opacity-0 blur-xl" : "scale-100 opacity-100 blur-0"}
      `} onLoad={() => setLoading(false)} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={priority}
        />
        
        <div className={"absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6"}>
          <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.3em] mb-1">
            {weight_class}
          </p>
          <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter">
            {name}
          </h3>
          <p className="text-xs text-zinc-400 font-medium italic mt-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
            "{nickname}"
          </p>
        </div>
      </motion.div>
    </Link>
  );
}