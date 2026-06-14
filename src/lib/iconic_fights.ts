import { supabase } from './supabase';

export type Fight = {
  id: string;
  ufc_number: string;
  fighter_1: string;
  fighter_2: string;
  preview_img_url: string;
  video_url: string;
  single_on_row: boolean;
};

export async function getAllIconicFights(): Promise<Fight[]> {
  const { data, error } = await supabase
    .from('iconic_fights')
    .select('*')
    .order('ufc_number', { ascending: false }); 

  if (error) {
    console.error("Supabase Error:", error.message);
    return [];
  }

  return data as Fight[]; 
}