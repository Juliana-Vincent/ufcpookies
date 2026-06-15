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
  fighter_1_record?: string;
  fighter_2_record?: string;
  is_main_event?: boolean;
  is_second_most_important_event?: boolean;
};

interface DBFightRow {
  id: number;
  weight_class: string;
  is_upcoming: boolean;
  ufc_number: string;
  fighter_1_name: string;
  fighter_2_name: string;
  fighter_1_img: string;
  fighter_2_img: string;
  "fighter_1-record": string | null;
  "fighter_2-record": string | null;
  is_main_event: boolean | null;
  is_second_most_important_event: boolean | null;
}

export async function getUpcomingFights(): Promise<Fight[]> {
  try {
    const { data, error } = (await supabase
      .from('upcoming_fights')
      .select()
      .eq('is_upcoming', true) 
      .order('created_at', { ascending: false })) as unknown as { data: DBFightRow[] | null; error: { message: string } | null };

    if (error) {
      console.error("Supabase error fetching upcoming fights:", error.message);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      weight_class: row.weight_class,
      is_upcoming: row.is_upcoming,
      ufc_number: row.ufc_number,
      fighter_1_name: row.fighter_1_name,
      fighter_2_name: row.fighter_2_name,
      fighter_1_img: row.fighter_1_img,
      fighter_2_img: row.fighter_2_img,
      fighter_1_record: row["fighter_1-record"] || "",
      fighter_2_record: row["fighter_2-record"] || "",
      is_main_event: row.is_main_event || false,
      is_second_most_important_event: row.is_second_most_important_event || false,
    }));
  } catch (err) {
    console.error("Failed to load upcoming fights:", err);
    return [];
  }
}