import { supabase } from './supabase';

export type Fight = {
  id: number;
  weight_class: string;
  is_upcoming: boolean;
  ufc_number: string;
  fighter_1_name: string;
  fighter_2_name: string;
  fighter_1_img: string;
  fighter_2_img: string;
};

export async function getUpcomingFights(): Promise<Fight[]> {
  const { data, error } = await supabase
    .from('upcoming_fights')
    .select(`
      id,
      weight_class,
      is_upcoming,
      ufc_number,
      fighter_1_name,
      fighter_2_name,
      fighter_1_img,
      fighter_2_img
    `)
    .eq('is_upcoming', true) 
    .order('created_at', { ascending: false })
  ;
  
  console.log("Supabase Data:", data);
  console.log("Supabase Error:", error);

  if (error) {
    console.error("Error fetching upcoming fights:", error);
    return [];
  }

  return data || [];
}