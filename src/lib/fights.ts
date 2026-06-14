import { supabase } from './supabase';

export type Fight = {
  id: string;
  date: string;
  event_name: string;
  winner_id: string | null;
  method: string;
  round: number;
  time: string;
  fighter_a: { name: string; image_url: string };
  fighter_b: { name: string; image_url: string };
  fighter_a_id: string;
  fighter_b_id: string;
  opponent_name_if_external?: string;
  external_winner_name?: string;
};

export async function getFighterRecord(fighterId: string): Promise<Fight[]> {
  const { data, error } = await supabase
    .from('fights')
    .select(`
      *,
      fighter_a:fighters!fighter_a_id(name, image_url),
      fighter_b:fighters!fighter_b_id(name, image_url)
    `)
    // Ensure the ID is wrapped in quotes if it's a string
    .or(`fighter_a_id.eq.${fighterId},fighter_b_id.eq.${fighterId}`)
    .order('date', { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message);
    return [];
  }

  return data as any; 
}