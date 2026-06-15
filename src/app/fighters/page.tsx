"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Fighter } from "@/lib/fighters";
import FighterCard from "@/components/FighterCard";

export default function FightersPage() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFighters = async () => {
    const { data, error } = await supabase
    .from("fighters")
    .select("*")
    .eq('isPublished', true);

    if (error) {
      console.error("Error fetching fighters:", error);
    } else {
      setFighters(data);
    }
    setLoading(false);
  };
    fetchFighters();
  }, []);

  if (loading) return <div className="pt-40 text-center uppercase text-white">Loading roster...</div>;
  if (fighters.length === 0) return <div className="pt-32 text-center text-white">No fighters found in the database.</div>;

  const sortedFighters = [...fighters].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-8">
      <header className="mb-12">
        <h1 className="text-6xl font-black uppercase italic tracking-tighter">
          The <span className="text-red-600">Roster</span>
        </h1>
      </header>

      <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 group/container pointer-events-none"}>
      <div className={"contents pointer-events-auto"}>
        {sortedFighters.map((fighter, index) => (
          <FighterCard 
            key={fighter.id} 
            id={fighter.id} 
            slug={fighter.slug}
            name={fighter.name}
            nickname={fighter.nickname}
            weight_class={fighter.weight_class}
            image={fighter.image_url}
            priority={index<4}
          />
        ))}
      </div>
      </div>
    </main>
  );
}