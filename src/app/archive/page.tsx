"use client"
import { useEffect, useState } from "react";
import { getAllIconicFights, Fight } from "@/lib/iconic_fights";
import Image from "next/image";
import { motion } from "framer-motion";

export default function IconicFightPage() {
  const [fights, setFights] = useState<Fight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFights = async () => {
      const data = await getAllIconicFights();
      setFights(data);
      setLoading(false);
    };
    fetchFights();
  }, []);

  if (loading) return <div className="pt-40 text-center uppercase tracking-widest text-zinc-500">Loading Archive...</div>;
  console.log("Fetched iconic fights:", fights);

  return (
    <main className="min-h-screen bg-black text-white mt-18 mb-20 md:p-12">
      <h1 className="text-4xl font-black italic uppercase mb-12 border-l-4 border-red-600 pl-4">
        The Violence Archive
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {fights.map((fight, index) => (
          <motion.a
            key={fight.id}
            href={fight.video_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group relative overflow-hidden bg-zinc-900 rounded-sm border border-zinc-800 
            aspect-video w-full transition-colors duration-500 hover:border-zinc-500`}
          >
            <Image
              src={fight.preview_img_url}
              alt={`UFC ${fight.ufc_number}`}
              fill
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-4">
              <span className="text-red-600 font-bold text-sm tracking-tighter">UFC {fight.ufc_number}</span>
              <h3 className="text-xl font-black uppercase italic leading-none">
                {fight.fighter_1} <span className="text-zinc-500">vs</span> {fight.fighter_2}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </main>
  );
}