import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/** Without credentials the website stays functional, but reviews display a setup notice. */
export const supabase = url && key ? createClient(url, key) : null;

export type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  created_at: string;
};
