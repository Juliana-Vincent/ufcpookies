"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Fight } from "@/lib/upcoming_fights";

interface UpcomingFightsProps {
  upcomingFights: Fight[];
}

export default function UpcomingFights({ upcomingFights }: UpcomingFightsProps) {
  const [selectedFight, setSelectedFight] = useState<Fight | null>(null);

  return (
    <>
      {/* SECTION 3: UPCOMING FIGHTS */}
      <section className="h-screen snap-start flex flex-col justify-center bg-black p-8 md:p-16 relative">
        <div className="max-w-5xl w-full mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-black uppercase italic mb-10 text-red-600 tracking-tighter"
          >
            Upcoming must watch
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar"
          >
            {upcomingFights.length === 0 ? (
              <div className="p-8 border border-dashed border-zinc-800 rounded text-center text-zinc-500 font-mono uppercase tracking-wider">
                No active fights found. Make sure &quot;is_upcoming&quot; is set to TRUE in your Supabase rows!
              </div>
            ) : (
              upcomingFights.map((fight) => (
                <div
                  key={fight.id}
                  className="p-6 bg-zinc-900 border-l-4 border-red-600 flex justify-between items-center rounded-r-md hover:bg-zinc-850 transition-colors duration-300"
                >
                  <div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <p className="text-xs md:text-sm text-zinc-400 font-semibold tracking-wider uppercase">
                        UFC {fight.ufc_number} • {fight.weight_class}
                      </p>
                      {fight.is_main_event && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-red-500 bg-red-950/40 border border-red-800/30 px-2 py-0.5 rounded-sm">
                          Main Event
                        </span>
                      )}
                      {fight.is_second_most_important_event && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-amber-500 bg-amber-950/40 border border-amber-800/30 px-2 py-0.5 rounded-sm">
                          Second most important event
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold tracking-tight mt-1">
                      {fight.fighter_1_name} <span className="text-red-500 text-lg font-light italic mx-1">vs</span> {fight.fighter_2_name}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedFight(fight)}
                    className="bg-white text-black px-4 py-2 font-black uppercase text-xs md:text-sm italic hover:bg-red-600 hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap ml-4"
                  >
                    Details
                  </button>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      <div style={{ display: "none" }} aria-hidden="true">
        {upcomingFights.map((fight) => (
          <React.Fragment key={`preload-${fight.id}`}>
            {fight.fighter_1_img && (
              <Image
                src={fight.fighter_1_img}
                alt="preload-1"
                width={160}
                height={160}
                loading="eager"
                fetchPriority="low"
              />
            )}
            {fight.fighter_2_img && (
              <Image
                src={fight.fighter_2_img}
                alt="preload-2"
                width={160}
                height={160}
                loading="eager"
                fetchPriority="low"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence>
        {selectedFight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFight(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 z-50 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.08 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950/80 border border-zinc-800/80 p-5 w-full max-w-lg relative rounded-2xl shadow-[0_0_80px_-15px_rgba(220,38,38,0.3)] cursor-default overflow-hidden"
            >
              {/* Glowing decorative background accents */}
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-600/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-zinc-600/5 rounded-full blur-[60px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedFight(null)}
                className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10 text-sm"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Header */}
              <motion.div 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-center mb-3 flex flex-col gap-1.5 items-center"
              >
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em] text-red-500 bg-red-950/45 border border-red-800/40 px-2.5 py-0.5 rounded-full inline-block">
                  UFC {selectedFight.ufc_number} Matchup
                </span>
                {selectedFight.is_main_event && (
                  <span className="text-[8px] md:text-[9px] font-mono font-black uppercase tracking-widest text-red-400 animate-pulse">
                    — Main Event —
                  </span>
                )}
                {selectedFight.is_second_most_important_event && (
                  <span className="text-[8px] md:text-[9px] font-mono font-black uppercase tracking-widest text-amber-400">
                    — Second most important event —
                  </span>
                )}
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter mt-0.5 text-zinc-100 font-display">
                  {selectedFight.weight_class}
                </h3>
              </motion.div>

              {/* Main Split Screen Card Grid */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-3 mt-3 relative">
                
                {/* Fighter 1 (Left Card - Red Accent) */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.1 }}
                  className="flex flex-col items-center bg-linear-to-b from-red-950/10 to-zinc-950/40 border border-red-900/10 rounded-xl p-2.5 md:p-3 shadow-inner relative overflow-hidden group/f1 w-full"
                >
                  {/* Photo Container */}
                  <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-radial from-red-950/40 to-zinc-950 border border-red-900/20 mb-1.5 shadow-lg shadow-red-900/10 flex items-center justify-center p-1.5">
                    <Image
                      src={
                        selectedFight.fighter_1_img ||
                        "https://placehold.co/400x400/27272a/ffffff?text=Fighter"
                      }
                      alt={selectedFight.fighter_1_name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/f1:scale-105"
                      priority
                    />
                  </div>
                  
                  {/* Fighter Name */}
                  <h5 className="font-black text-xs md:text-sm text-center uppercase tracking-tight leading-tight italic font-display text-zinc-100 min-h-8.5 flex items-center justify-center">
                    {selectedFight.fighter_1_name}
                  </h5>
                  
                  {/* Fighter Record */}
                  <div className="mt-0.5 min-h-4">
                    {selectedFight.fighter_1_record ? (
                      <span className="text-[8px] md:text-[9px] font-mono font-bold text-red-500 bg-red-950/30 border border-red-900/20 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        {selectedFight.fighter_1_record}
                      </span>
                    ) : (
                      <span className="text-[7px] md:text-[8px] font-mono text-zinc-600 uppercase tracking-wider">Record N/A</span>
                    )}
                  </div>
                </motion.div>

                {/* VS Badge (Center Column) */}
                <div className="flex flex-col items-center justify-center h-full relative px-1">
                  <div className="absolute h-full w-px bg-linear-to-b from-transparent via-zinc-800 to-transparent pointer-events-none" />
                  <motion.div
                    initial={{ y: -15, scale: 0.5, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-red-600 border-2 border-zinc-950 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)] z-10 relative"
                  >
                    <span className="text-white font-black italic text-[11px] md:text-xs tracking-tighter">VS</span>
                  </motion.div>
                </div>

                {/* Fighter 2 (Right Card - Zinc/White Accent) */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.1 }}
                  className="flex flex-col items-center bg-linear-to-b from-zinc-900/10 to-zinc-950/40 border border-zinc-800/30 rounded-xl p-2.5 md:p-3 shadow-inner relative overflow-hidden group/f2 w-full"
                >
                  {/* Photo Container */}
                  <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-radial from-zinc-900/40 to-zinc-950 border border-zinc-800/40 mb-1.5 shadow-lg flex items-center justify-center p-1.5">
                    <Image
                      src={
                        selectedFight.fighter_2_img ||
                        "https://placehold.co/400x400/27272a/ffffff?text=Fighter"
                      }
                      alt={selectedFight.fighter_2_name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/f2:scale-105"
                      priority
                    />
                  </div>
                  
                  {/* Fighter Name */}
                  <h5 className="font-black text-xs md:text-sm text-center uppercase tracking-tight leading-tight italic font-display text-zinc-100 min-h-8.5 flex items-center justify-center">
                    {selectedFight.fighter_2_name}
                  </h5>
                  
                  {/* Fighter Record */}
                  <div className="mt-0.5 min-h-4">
                    {selectedFight.fighter_2_record ? (
                      <span className="text-[8px] md:text-[9px] font-mono font-bold text-red-500 bg-zinc-900/30 border border-zinc-800/30 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        {selectedFight.fighter_2_record}
                      </span>
                    ) : (
                      <span className="text-[7px] md:text-[8px] font-mono text-zinc-600 uppercase tracking-wider">Record N/A</span>
                    )}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
