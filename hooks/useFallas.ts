import { useQuery } from '@tanstack/react-query';
import { getFallas, getCategories } from '../lib/supabase';
import { Falla, Category, FallaWithCategory } from '../types/database';

// Types for map markers
export interface FallaMarker {
  id: string;
  name: string;
  district: string;
  category: 'special' | 'firstA' | 'firstB' | 'secondA' | 'secondB' | 'infantil';
  image: string;
  latitude: number;
  longitude: number;
  // Extended data from Supabase
  description_es?: string | null;
  description_en?: string | null;
  artist?: string | null;
  is_featured?: boolean;
  categoryData?: Category;
}

// Fallback mock data for when Supabase doesn't have coordinates
const FALLBACK_MARKERS: FallaMarker[] = [
  {
    id: 'mock-1',
    name: 'Falla Plaza del Ayuntamiento',
    district: 'Plaza del Ayuntamiento',
    category: 'special',
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    latitude: 39.4699,
    longitude: -0.3763,
    description_es: 'La falla oficial del Ayuntamiento de Valencia',
    description_en: 'The official falla of Valencia City Hall',
  },
  {
    id: 'mock-2',
    name: 'Falla Na Jordana',
    district: 'El Carmen',
    category: 'special',
    image: 'https://images.unsplash.com/photo-1671639045782-93f73d559236?w=400',
    latitude: 39.4789,
    longitude: -0.3772,
    description_es: 'Una de las fallas más antiguas y prestigiosas',
    description_en: 'One of the oldest and most prestigious fallas',
  },
  {
    id: 'mock-3',
    name: 'Falla Convento Jerusalén',
    district: 'Ruzafa',
    category: 'special',
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
    latitude: 39.4652,
    longitude: -0.3789,
    description_es: 'Conocida por sus críticas sociales',
    description_en: 'Known for its social criticism',
  },
  {
    id: 'mock-4',
    name: 'Falla Exposición',
    district: 'Exposición',
    category: 'firstA',
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    latitude: 39.4621,
    longitude: -0.3687,
    description_es: 'Ubicada junto a los Jardines del Turia',
    description_en: 'Located next to Turia Gardens',
  },
  {
    id: 'mock-5',
    name: 'Falla Cuba-Literato Azorín',
    district: 'Ruzafa',
    category: 'firstA',
    image: 'https://images.unsplash.com/photo-1671639045782-93f73d559236?w=400',
    latitude: 39.4589,
    longitude: -0.3754,
    description_es: 'Falla del barrio de Ruzafa',
    description_en: 'Falla from Ruzafa neighborhood',
  },
  {
    id: 'mock-6',
    name: 'Falla Sueca-Literato Azorín',
    district: 'Ruzafa',
    category: 'special',
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
    latitude: 39.4612,
    longitude: -0.3721,
    description_es: 'Una de las más emblemáticas de Ruzafa',
    description_en: 'One of the most emblematic in Ruzafa',
  },
  {
    id: 'mock-7',
    name: 'Falla Plaza del Pilar',
    district: 'Centro Histórico',
    category: 'firstB',
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    latitude: 39.4754,
    longitude: -0.3756,
    description_es: 'Falla tradicional del centro histórico',
    description_en: 'Traditional falla from historic center',
  },
  {
    id: 'mock-8',
    name: 'Falla Almirante Cadarso',
    district: 'Gran Vía',
    category: 'firstA',
    image: 'https://images.unsplash.com/photo-1671639045782-93f73d559236?w=400',
    latitude: 39.4635,
    longitude: -0.3698,
    description_es: 'Gran falla con temáticas variadas',
    description_en: 'Large falla with varied themes',
  },
  {
    id: 'mock-9',
    name: 'Falla Mosen Sorell',
    district: 'El Carmen',
    category: 'special',
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
    latitude: 39.4782,
    longitude: -0.3749,
    description_es: 'Falla de gran tamaño y detalle',
    description_en: 'Large and detailed falla',
  },
  {
    id: 'mock-10',
    name: 'Falla Antiga de Campanar',
    district: 'Campanar',
    category: 'firstA',
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    latitude: 39.4823,
    longitude: -0.3912,
    description_es: 'Histórica falla del barrio de Campanar',
    description_en: 'Historic falla from Campanar neighborhood',
  },
];

// Map category name to category type
function getCategoryType(categoryName: string): FallaMarker['category'] {
  const normalized = categoryName.toLowerCase();
  if (normalized.includes('especial') || normalized.includes('special')) return 'special';
  if (normalized.includes('primera a') || normalized.includes('first a')) return 'firstA';
  if (normalized.includes('primera b') || normalized.includes('first b')) return 'firstB';
  if (normalized.includes('segunda a') || normalized.includes('second a')) return 'secondA';
  if (normalized.includes('segunda b') || normalized.includes('second b')) return 'secondB';
  if (normalized.includes('infantil') || normalized.includes('children')) return 'infantil';
  return 'firstA'; // default
}

// Transform Supabase falla to map marker
function transformToMarker(falla: FallaWithCategory, index: number): FallaMarker | null {
  // Debug log first few fallas
  if (index < 3) {
    console.log(`[transformToMarker] Falla ${index}:`, {
      id: falla.id,
      name: falla.name,
      lat: falla.lat,
      lng: falla.lng,
      latType: typeof falla.lat,
      lngType: typeof falla.lng,
      category: falla.category,
    });
  }

  // Skip fallas without coordinates (check both null/undefined AND 0)
  const lat = falla.lat ? Number(falla.lat) : null;
  const lng = falla.lng ? Number(falla.lng) : null;
  
  if (lat === null || lng === null || isNaN(lat) || isNaN(lng)) {
    console.log(`[transformToMarker] Skipping falla ${falla.name} - no valid coords:`, { lat, lng });
    return null;
  }

  const category = falla.category;
  const categoryType = category ? getCategoryType(category.name_es) : 'firstA';

  // Extract district from address (e.g., "Plaza del Ayuntamiento, Valencia" -> "Plaza del Ayuntamiento")
  const district = falla.address?.split(',')[0]?.trim() || 'Valencia';

  return {
    id: falla.id,
    name: falla.name,
    district,
    category: categoryType,
    image: falla.image_url || 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    latitude: lat,
    longitude: lng,
    description_es: falla.description_es,
    description_en: falla.description_en,
    artist: falla.artist,
    is_featured: falla.is_featured,
    categoryData: category,
  };
}

/**
 * Hook to fetch all fallas with their categories
 */
export function useFallas(categoryId?: string) {
  return useQuery({
    queryKey: ['fallas', categoryId],
    queryFn: async () => {
      const fallas = await getFallas(categoryId);
      return fallas as FallaWithCategory[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (previously cacheTime)
  });
}

/**
 * Hook to fetch fallas as map markers
 * Falls back to mock data if Supabase data doesn't have coordinates
 */
export function useFallasMarkers(categoryId?: string) {
  const { data: fallas, isLoading, error, ...rest } = useFallas(categoryId);

  // Debug logging
  console.log('[useFallasMarkers] isLoading:', isLoading, 'error:', error, 'fallas count:', fallas?.length);
  if (error) {
    console.error('[useFallasMarkers] Error fetching fallas:', error);
  }

  const supabaseMarkers: FallaMarker[] = fallas
    ? fallas.map((f, i) => transformToMarker(f, i)).filter((m): m is FallaMarker => m !== null)
    : [];

  // Use fallback if no valid markers from Supabase
  const markers = supabaseMarkers.length > 0 ? supabaseMarkers : FALLBACK_MARKERS;

  console.log('[useFallasMarkers] Transformed markers:', supabaseMarkers.length, 'Using fallback:', supabaseMarkers.length === 0);

  return {
    ...rest,
    isLoading,
    error,
    data: markers,
    markers, // alias for convenience
    usingFallback: supabaseMarkers.length === 0,
  };
}

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}
