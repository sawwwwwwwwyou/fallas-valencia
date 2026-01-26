import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper functions for common queries

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order');
  
  if (error) throw error;
  return data;
}

export async function getFallas(categoryId?: string) {
  let query = supabase
    .from('fallas')
    .select('*, category:categories(*)');
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query.order('name');
  if (error) throw error;
  return data;
}

export async function getFalla(id: string) {
  const { data, error } = await supabase
    .from('fallas')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getEvents(date?: string) {
  let query = supabase
    .from('events')
    .select('*, event_type:event_types(*), falla:fallas(*)')
    .order('start_time');
  
  if (date) {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    query = query
      .gte('start_time', date)
      .lt('start_time', nextDay.toISOString().split('T')[0]);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getEventTypes() {
  const { data, error } = await supabase
    .from('event_types')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function getPOIs(typeId?: string) {
  let query = supabase
    .from('pois')
    .select('*, poi_type:poi_types(*)')
    .eq('is_active', true);
  
  if (typeId) {
    query = query.eq('poi_type_id', typeId);
  }
  
  const { data, error } = await query.order('name');
  if (error) throw error;
  return data;
}

export async function getPOITypes() {
  const { data, error } = await supabase
    .from('poi_types')
    .select('*');
  
  if (error) throw error;
  return data;
}

// Favorites
export async function getFavorites(userId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('*, falla:fallas(*)')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
}

export async function addFavorite(userId: string, fallaId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, falla_id: fallaId })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function removeFavorite(userId: string, fallaId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('falla_id', fallaId);
  
  if (error) throw error;
}
