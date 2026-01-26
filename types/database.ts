// Supabase Database Types for Fallas Valencia

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'>;
        Update: Partial<Omit<Category, 'id'>>;
      };
      fallas: {
        Row: Falla;
        Insert: Omit<Falla, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Falla, 'id'>>;
      };
      event_types: {
        Row: EventType;
        Insert: Omit<EventType, 'id' | 'created_at'>;
        Update: Partial<Omit<EventType, 'id'>>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Event, 'id'>>;
      };
      poi_types: {
        Row: POIType;
        Insert: Omit<POIType, 'id' | 'created_at'>;
        Update: Partial<Omit<POIType, 'id'>>;
      };
      pois: {
        Row: POI;
        Insert: Omit<POI, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<POI, 'id'>>;
      };
      favorites: {
        Row: Favorite;
        Insert: Omit<Favorite, 'id' | 'created_at'>;
        Update: Partial<Omit<Favorite, 'id'>>;
      };
    };
  };
}

export interface Category {
  id: string;
  name_es: string;
  name_en: string;
  color: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

export interface Falla {
  id: string;
  category_id: string | null;
  category?: Category;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  description_es: string | null;
  description_en: string | null;
  image_url: string | null;
  year: number;
  artist: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventType {
  id: string;
  name_es: string;
  name_en: string;
  icon: string;
  color: string;
  description_es: string | null;
  description_en: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  event_type_id: string | null;
  event_type?: EventType;
  falla_id: string | null;
  falla?: Falla;
  title_es: string;
  title_en: string | null;
  start_time: string;
  end_time: string | null;
  location: string | null;
  lat: number | null;
  lng: number | null;
  description_es: string | null;
  description_en: string | null;
  is_cancelled: boolean;
  created_at: string;
  updated_at: string;
}

export interface POIType {
  id: string;
  name_es: string;
  name_en: string;
  icon: string;
  created_at: string;
}

export interface POI {
  id: string;
  poi_type_id: string | null;
  poi_type?: POIType;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  description_es: string | null;
  description_en: string | null;
  image_url: string | null;
  website: string | null;
  phone: string | null;
  hours: Record<string, string> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  falla_id: string | null;
  falla?: Falla;
  created_at: string;
}

// Utility types for joined queries
export type FallaWithCategory = Falla & { category: Category };
export type EventWithDetails = Event & { event_type: EventType; falla: Falla | null };
export type POIWithType = POI & { poi_type: POIType };
export type FavoriteWithFalla = Favorite & { falla: Falla };
