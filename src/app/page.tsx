"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllFighters, Fighter } from "@/lib/fighters";
import { getUpcomingFights, Fight } from "@/lib/upcoming_fights";
import FighterCard from "@/components/FighterCard";
import UpcomingFights from "@/components/UpcomingFights";

export default function Home() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [upcomingFights, setUpcomingFights] = useState<Fight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fightersData, fightsData] = await Promise.all([
          getAllFighters(),
          getUpcomingFights()
        ]);
        
        setFighters(fightersData || []);
        setUpcomingFights(fightsData || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="pt-40 text-center uppercase text-white">Loading roster...</div>;
  if (fighters.length === 0) return <div className="pt-32 text-center text-white">No fighters found in the database.</div>;

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black text-white">
      
      {/* SECTION 1: HERO */}
      <section className="h-screen snap-start flex flex-col items-center justify-center relative">
        <div className="z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter"
          >
            ufc <span className="text-red-600">pookies</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-zinc-400 mt-4 tracking-[0.5em] uppercase"
          >
            The Octagon Feed
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-60" />
      </section>

      {/* SECTION 2: FEATURED ROSTER */}
      <section className="h-screen snap-start flex flex-col justify-center bg-zinc-950 p-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-end mb-8 px-2"
        >
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">Featured Fighters</h2>
          <button className="text-red-600 font-bold uppercase hover:underline text-sm tracking-widest">
            View All &rarr;
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x px-2 group/container"
        >
          {fighters.map((fighter) => (
            <FighterCard 
              key={fighter.id} 
              id={fighter.id} 
              slug={fighter.slug}
              name={fighter.name}
              nickname={fighter.nickname}
              weight_class={fighter.weight_class}
              image={fighter.image_url}
            />
          ))}
        </motion.div>
      </section>

      {/* SECTION 3: UPCOMING FIGHTS */}
      <UpcomingFights upcomingFights={upcomingFights} />

      {/* SECTION 4: ARCHIVE */}
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-zinc-900 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-6xl font-black uppercase italic mb-4 tracking-tighter">The Archive</h2>
          <p className="text-zinc-400 mb-8 max-w-md text-center px-4">Relive the most violent and iconic moments in MMA history.</p>
          <Link href="/archive" className="px-10 py-4 border-2 border-white hover:bg-white hover:text-black transition-all font-black uppercase italic">Enter Vault</Link>
        </motion.div>
      </section>

    </main>
  );
}