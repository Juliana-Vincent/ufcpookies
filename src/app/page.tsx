"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllFighters, Fighter } from "@/lib/fighters";
import { getUpcomingFights, Fight } from "@/lib/upcoming_fights";
import FighterCard from "@/components/FighterCard";

export default function Home() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [upcomingFights, setUpcomingFights] = useState<Fight[]>([]);
  const [selectedFight, setSelectedFight] = useState<Fight | null>(null);
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter"
          >
            the <span className="text-red-600">pookies</span>
          </motion.h1>
          <p className="font-mono text-zinc-400 mt-4 tracking-[0.5em] uppercase">The Octagon Feed</p>
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-60" />
      </section>

      {/* SECTION 2: FEATURED ROSTER */}
      <section className="h-screen snap-start flex flex-col justify-center bg-zinc-950 p-6">
        <div className="flex justify-between items-end mb-8 px-2">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">Featured Fighters</h2>
          <button className="text-red-600 font-bold uppercase hover:underline text-sm tracking-widest">
            View All &rarr;
          </button>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x px-2 group/container">
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
        </div>
      </section>

      {/* SECTION 3: UPCOMING FIGHTS (Fixed CSS styling to match layout + fallback text) */}
      <section className="h-screen snap-start flex flex-col justify-center bg-black p-8 md:p-16">
        <div className="max-w-5xl w-full mx-auto">
          <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-10 text-red-600 tracking-tighter">
            Upcoming must watch
          </h2>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
            {upcomingFights.length === 0 ? (
              <div className="p-8 border border-dashed border-zinc-800 rounded text-center text-zinc-500 font-mono uppercase tracking-wider">
                No active fights found. Make sure "is_upcoming" is set to TRUE in your Supabase rows!
              </div>
            ) : (
              upcomingFights.map((fight) => (
                <div 
                  key={fight.id} 
                  className="p-6 bg-zinc-900 border-l-4 border-red-600 flex justify-between items-center rounded-r-md hover:bg-zinc-850 transition-all"
                >
                  <div>
                    <p className="text-xs md:text-sm text-zinc-400 font-semibold tracking-wider uppercase">
                      UFC {fight.ufc_number} • {fight.weight_class}
                    </p>
                    <h4 className="text-xl md:text-2xl font-bold tracking-tight mt-1">
                      {fight.fighter_1_name} <span className="text-red-500 text-lg font-light italic mx-1">vs</span> {fight.fighter_2_name}
                    </h4>
                  </div>
                  <button 
                    onClick={() => setSelectedFight(fight)}
                    className="bg-white text-black px-4 py-2 font-black uppercase text-xs md:text-sm italic hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap ml-4"
                  >
                    Details
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: ARCHIVE */}
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-zinc-900">
        <h2 className="text-6xl font-black uppercase italic mb-4 tracking-tighter">The Archive</h2>
        <p className="text-zinc-400 mb-8 max-w-md text-center px-4">Relive the most violent and iconic moments in MMA history.</p>
        <Link href="/archive" className="px-10 py-4 border-2 border-white hover:bg-white hover:text-black transition-all font-black uppercase italic">Enter Vault</Link>
      </section>

      {/* POP-UP MODAL (Renders on top when a fight is clicked) */}
      {selectedFight && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border border-zinc-800 p-8 max-w-xl w-full relative rounded-xl shadow-2xl">
            <button 
              onClick={() => setSelectedFight(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-bold text-xl transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <span className="text-red-600 font-black uppercase tracking-widest text-xs bg-red-600/10 px-3 py-1 rounded-full">
                UFC {selectedFight.ufc_number} Matchup
              </span>
              <h3 className="text-xl font-bold text-zinc-400 mt-3 uppercase tracking-wider">{selectedFight.weight_class}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 items-center mt-8">
              {/* Fighter 1 */}
              <div className="flex flex-col items-center">
                <img 
                  src={selectedFight.fighter_1_img || "https://placehold.co/400x400/27272a/ffffff?text=Fighter"} 
                  alt={selectedFight.fighter_1_name} 
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl bg-zinc-900 border-2 border-red-600 mb-4 shadow-lg shadow-red-900/20"
                />
                <h5 className="font-black text-lg md:text-xl text-center uppercase tracking-tight leading-tight">{selectedFight.fighter_1_name}</h5>
              </div>

              {/* Fighter 2 */}
              <div className="flex flex-col items-center">
                <img 
                  src={selectedFight.fighter_2_img || "https://placehold.co/400x400/27272a/ffffff?text=Fighter"} 
                  alt={selectedFight.fighter_2_name} 
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl bg-zinc-900 border-2 border-zinc-700 mb-4 shadow-lg"
                />
                <h5 className="font-black text-lg md:text-xl text-center uppercase tracking-tight leading-tight">{selectedFight.fighter_2_name}</h5>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}