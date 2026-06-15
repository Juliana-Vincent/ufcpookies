"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import FighterCard from "@/components/FighterCard";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { getFighterBySlug, Fighter } from "@/lib/fighters";
import { getFighterRecord, Fight } from "@/lib/fights";

export default function FighterProfile() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [fighter, setFighter] = useState<Fighter | null>(null);
  const [fights, setFights] = useState<Fight[]>([]);
  const [similarFighters, setSimilarFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadFighterData = async () => {
      setLoading(true);
      const data = await getFighterBySlug(slug);
      setFighter(data);
      setLoading(false);
    };
    loadFighterData();
  }, [slug]);

  useEffect(() => {
    if (!fighter) return;

    const loadRelatedData = async () => {
      const record = await getFighterRecord(fighter.id);
      setFights(record); 

      const { data } = await supabase
        .from("fighters")
        .select("*").eq('isPublished', true)
        .eq("weight_class", fighter.weight_class)
        .neq("id", fighter.id)
        .limit(4);

      if (data) setSimilarFighters(data as Fighter[]);
    };

    loadRelatedData();
  }, [fighter]);
  console.log(fighter, fights);
  const nextImage = useCallback(() => {
    if (activeIndex === null || !fighter?.gallery) return;
    setActiveIndex((activeIndex + 1) % fighter.gallery.length);
  }, [activeIndex, fighter]);

  const prevImage = useCallback(() => {
    if (activeIndex === null || !fighter?.gallery) return;
    setActiveIndex((activeIndex - 1 + fighter.gallery.length) % fighter.gallery.length);
  }, [activeIndex, fighter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    if (activeIndex !== null) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeIndex, nextImage, prevImage]);

  if (loading) return <div className="pt-40 text-center uppercase text-white">Loading fighter profile...</div>;
  if (!fighter) return <div className="pt-32 text-center text-white">Fighter &quot;{slug}&quot; not found in mock data</div>;
  console.log('main img: ', fighter.image_url);

  return (
    <main className="min-h-screen bg-black mt-32 mb-20 text-white">
      <section className="relative h-[70vh] flex items-end px-8 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Image
            src={fighter.image_url} 
            alt={fighter.name}
            fill
            priority
            className="object-contain"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50" />
        </div>

        <h1 className="absolute top-20 left-0 text-[25vw] font-black opacity-5 uppercase italic leading-none pointer-events-none z-0">
          {fighter.name.split(' ')[1] || fighter.name}
        </h1>

        <div className="z-10 w-full flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="text-red-600 font-black tracking-widest uppercase mb-2"
            >
              {fighter.weight_class} • {fighter.record}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black uppercase italic leading-tight"
            >
              {fighter.name}
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-l border-zinc-800 pl-8">
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Height</p>
              <p className="text-xl font-bold italic">{fighter.height}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Reach</p>
              <p className="text-xl font-bold italic">{fighter.reach}</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY CAROUSEL */}
      <section className="px-8 md:px-20 mb-20">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-600 mb-6 italic">
          Gallery
        </h3>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {fighter.gallery && fighter.gallery.length > 0 ? (
            fighter.gallery.map((photoUrl: string, index: number) => (
              <div 
                key={index} 
                onClick={() => setActiveIndex(index)}
                className="relative min-w-60 min-h-65 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shrink-0 group/gallery"
              >
                <Image
                  src={photoUrl}
                  alt={`${fighter.name} gallery ${index + 1}`}
                  fill
                  className="object-cover opacity-50 grayscale group-hover/gallery:opacity-100 group-hover/gallery:grayscale-0 group-hover/gallery:scale-105 transition-all duration-500 cursor-pointer"
                  sizes="(max-width: 768px) 300px, 400px"
                />
              </div>
            ))
          ) : (
            <p className="text-zinc-600 italic">No gallery images available for this fighter.</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={() => setActiveIndex(null)}
              className="absolute top-10 right-10 text-white text-4xl font-light hover:text-red-500 transition-colors z-110"
            >
              ✕
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-10 p-4 text-white hover:bg-white/10 rounded-full transition-all z-110"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <motion.div 
              key={activeIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="relative w-full max-w-5xl h-[80vh]"
            >
              <Image
                src={fighter.gallery[activeIndex]}
                alt="Full screen view"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-10 p-4 text-white hover:bg-white/10 rounded-full transition-all z-110"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            {/* Image Counter Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 font-mono tracking-widest uppercase">
              {activeIndex + 1} / {fighter.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIO & INFO */}
      <section className={"px-8 md:px-20 grid md:grid-cols-3 gap-16 mb-20"}>
        <div className={"md:col-span-2"}>
          <h3 className={"text-2xl font-black uppercase italic mb-4 border-b border-red-600 w-fit pr-8 pb-1"}>Biography</h3>
          <p className={"text-zinc-400 leading-relaxed text-lg"}>
            {fighter.bio || "Career details coming soon. This fighter is known for their devastating striking and championship mindset."}
          </p>
          {fighter.interesting_facts && fighter.interesting_facts.length > 0 && (
            <section>
              <h3 className="text-2xl font-black uppercase italic mt-12 mb-4 border-b border-red-600 w-fit pr-8 pb-1">
                Interesting Facts
              </h3>
              <ul className="list-none text-zinc-400 space-y-3">
                {fighter.interesting_facts.map((fact: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-600 mt-1.5 shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <rect width="24" height="24" />
                      </svg>
                    </span>
                    <span className="text-lg leading-tight">{fact}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900">
          <h3 className="text-xl font-black uppercase italic mb-6">Recent Fights</h3>
          <div className="space-y-4">
            {fights.length > 0 ? fights.map((fight) => {
              const isFighterA = fight.fighter_a_id === fighter.id;
              
              const opponentName = isFighterA 
                ? (fight.fighter_b?.name || fight.opponent_name_if_external || "Unknown Opponent")
                : (fight.fighter_a?.name || "Unknown Opponent");

              let result: 'WIN' | 'LOSS' | 'DRAW' = 'LOSS';
              if (fight.winner_id === fighter.id) {
                result = 'WIN';
              } else if (!fight.winner_id && !fight.external_winner_name) {
                // It's a draw if no winner is assigned anywhere
                result = 'DRAW';
              } else if (fight.external_winner_name && fight.external_winner_name !== fighter.name) {
                // If there is an external winner and it's not our current fighter
                result = 'LOSS';
              }

              return (
                <div key={fight.id} className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <div>
                    <p className="font-bold text-sm">vs {opponentName}</p>
                    <p className="text-[10px] text-zinc-500 uppercase">
                      {fight.event_name} • {fight.method}
                    </p>
                  </div>
                  <span className={`text-xs font-black italic ${result === 'WIN' ? 'text-green-500' : result === 'LOSS' ? 'text-red-500' : 'text-gray-500'}`}>
                    {result}
                  </span>
                </div>
              );
            }) : (
              <p className="text-zinc-600 italic text-sm">No recorded fights found.</p>
            )}
          </div>
        </div>
      </section>

      {/* RECOMMENDED FIGHTERS */}
      <section className={"px-8 md:px-20"}>
        <h3 className={"text-3xl font-black uppercase italic mb-8"}>Similar <span className={"text-red-600"}>Fighters</span></h3>
        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 group/container pointer-events-none"}>
          <div className="contents pointer-events-auto">
            {similarFighters.length > 0 ? (
            similarFighters.map((f) => (
              <FighterCard 
                key={f.id} 
                id={f.id}
                name={f.name}
                nickname={f.nickname}
                weight_class={f.weight_class}
                image={f.image_url}
                slug={f.slug}
              />
              ))
            ) : (
              <p className="text-zinc-500 italic pointer-events-none">No similar fighters found in this division.</p>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}