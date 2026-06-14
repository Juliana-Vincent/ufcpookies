import { supabase } from './supabase';

export type Fighter = {
  id: string;
  name: string;
  nickname: string | "";
  weight_class: string;
  record: string;
  image_url: string;
  slug: string;
  gallery: string[] | "";
  bio: string;
  interesting_facts: string[] | "";
  height: string;
  reach: string;
  isPublished?: boolean;
};

export async function getFighterBySlug(slug: string): Promise<Fighter | null> {
  const { data, error } = await supabase
    .from('fighters')
    .select('*')
    .eq('slug', slug)
    .eq('isPublished', true)
    .single(); 

  if (error || !data) {
    console.error("Fighter not found or error:", error);
    return null;
  }

  return data as Fighter;
}

export async function getAllFighters(): Promise<Fighter[]> {
  const { data, error } = await supabase
    .from('fighters')
    .select('*')
    .eq('isPublished', true) 
    .order('name', { ascending: true });

  if (error) return [];
  return data as Fighter[];
}