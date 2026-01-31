import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { POI, POIType, POIWithType } from '../types/database';

// Marker types for map display
export type MapMarkerType = 'falla' | 'mercado' | 'viewpoint' | 'museum';

export interface MapMarker {
  id: string;
  type: MapMarkerType;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  description_es?: string | null;
  description_en?: string | null;
  // For fallas
  category?: 'special' | 'firstA' | 'firstB' | 'secondA' | 'secondB' | 'infantil';
  district?: string;
  image?: string;
  artist?: string | null;
  is_featured?: boolean;
}

// Marker styling config
export const MARKER_CONFIG: Record<MapMarkerType, {
  emoji: string;
  color: string;
  gradientColors: [string, string];
  label_es: string;
  label_en: string;
}> = {
  falla: {
    emoji: '🔥',
    color: '#FF6B35',
    gradientColors: ['#FF6B35', '#E63946'],
    label_es: 'Fallas',
    label_en: 'Fallas',
  },
  mercado: {
    emoji: '🛍️',
    color: '#10B981',
    gradientColors: ['#10B981', '#059669'],
    label_es: 'Mercados',
    label_en: 'Markets',
  },
  viewpoint: {
    emoji: '🎆',
    color: '#8B5CF6',
    gradientColors: ['#8B5CF6', '#7C3AED'],
    label_es: 'Miradores',
    label_en: 'Viewpoints',
  },
  museum: {
    emoji: '🏛️',
    color: '#3B82F6',
    gradientColors: ['#3B82F6', '#2563EB'],
    label_es: 'Museos',
    label_en: 'Museums',
  },
};

// Static viewpoints data (since these are specific locations for fireworks viewing)
const STATIC_VIEWPOINTS: MapMarker[] = [
  {
    id: 'viewpoint-palau-arts',
    type: 'viewpoint',
    name: 'Palau de les Arts',
    address: 'Av. del Professor López Piñero, 1',
    latitude: 39.4558,
    longitude: -0.3534,
    description_es: 'Punto principal para ver la Mascletà y los fuegos artificiales de Fallas. Vista panorámica del río Turia.',
    description_en: 'Main viewpoint for Mascletà and Fallas fireworks. Panoramic view of Turia river.',
  },
  {
    id: 'viewpoint-turia-riverbed',
    type: 'viewpoint',
    name: 'Jardines del Turia',
    address: 'Passeig de la Pechina',
    latitude: 39.4632,
    longitude: -0.3751,
    description_es: 'Excelente ubicación en la ribera del antiguo río Turia para ver los castillos de fuegos artificiales.',
    description_en: 'Excellent location on the old Turia riverbed for watching fireworks displays.',
  },
  {
    id: 'viewpoint-puente-flores',
    type: 'viewpoint',
    name: 'Puente de las Flores',
    address: 'Pont de les Flors',
    latitude: 39.4712,
    longitude: -0.3761,
    description_es: 'Puente icónico con vistas perfectas hacia la Ciudad de las Artes y los fuegos.',
    description_en: 'Iconic bridge with perfect views towards City of Arts and fireworks.',
  },
];

// Static mercados data for Fallas period
const STATIC_MERCADOS: MapMarker[] = [
  {
    id: 'mercado-central',
    type: 'mercado',
    name: 'Mercado Central de Valencia',
    address: 'Plaça de la Ciutat de Bruges',
    latitude: 39.4737,
    longitude: -0.3789,
    description_es: 'El mercado modernista más grande de Europa. Durante Fallas, productos especiales y buñuelos.',
    description_en: 'Europe\'s largest modernist market. Special products and buñuelos during Fallas.',
  },
  {
    id: 'mercado-colon',
    type: 'mercado',
    name: 'Mercado de Colón',
    address: 'Carrer de Jorge Juan, 19',
    latitude: 39.4679,
    longitude: -0.3658,
    description_es: 'Elegante edificio modernista convertido en espacio gastronómico.',
    description_en: 'Elegant modernist building converted into gastronomic space.',
  },
  {
    id: 'mercado-ruzafa',
    type: 'mercado',
    name: 'Mercado de Ruzafa',
    address: 'Carrer del Pintor Salvador Abril, 5',
    latitude: 39.4612,
    longitude: -0.3713,
    description_es: 'Mercado tradicional en el corazón del barrio más trendy de Valencia.',
    description_en: 'Traditional market in the heart of Valencia\'s trendiest neighborhood.',
  },
  {
    id: 'feria-fallas',
    type: 'mercado',
    name: 'Feria de Fallas',
    address: 'Alameda - Pont de Fusta',
    latitude: 39.4765,
    longitude: -0.3720,
    description_es: 'Feria tradicional de Fallas con atracciones, comida típica y artículos falleros.',
    description_en: 'Traditional Fallas fair with attractions, typical food and Fallas merchandise.',
  },
];

// Static museums/exhibitions data
const STATIC_MUSEUMS: MapMarker[] = [
  {
    id: 'museo-fallero',
    type: 'museum',
    name: 'Museo Fallero',
    address: 'Plaça de Monteolivete, 4',
    latitude: 39.4600,
    longitude: -0.3600,
    description_es: 'Colección de ninots indultados desde 1934. La historia viva de las Fallas.',
    description_en: 'Collection of pardoned ninots since 1934. The living history of Fallas.',
  },
  {
    id: 'exposicion-ninot',
    type: 'museum',
    name: 'Exposición del Ninot',
    address: 'La Marina de València',
    latitude: 39.4527,
    longitude: -0.3235,
    description_es: 'Exposición anual donde se muestran los ninots candidatos a ser indultados del fuego.',
    description_en: 'Annual exhibition showing ninots candidates to be pardoned from the fire.',
  },
  {
    id: 'museo-artista-fallero',
    type: 'museum',
    name: 'Museo del Artista Fallero',
    address: 'Carrer de l\'Almirall Cadarso, 27',
    latitude: 39.4640,
    longitude: -0.3701,
    description_es: 'Taller-museo donde se puede ver cómo se crean las fallas.',
    description_en: 'Workshop-museum where you can see how fallas are created.',
  },
];

/**
 * Hook to fetch POIs from Supabase
 */
export function usePOIs(typeSlug?: string) {
  return useQuery({
    queryKey: ['pois', typeSlug],
    queryFn: async () => {
      let query = supabase
        .from('pois')
        .select('*, poi_type:poi_types(*)')
        .eq('is_active', true);

      const { data, error } = await query.order('name');
      if (error) throw error;
      return data as POIWithType[];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Transform POI to MapMarker
 */
function transformPOIToMarker(poi: POIWithType): MapMarker | null {
  if (!poi.lat || !poi.lng) return null;

  // Determine type based on poi_type name
  const typeName = poi.poi_type?.name_en?.toLowerCase() || '';
  let type: MapMarkerType = 'mercado';
  
  if (typeName.includes('viewpoint') || typeName.includes('mirador')) {
    type = 'viewpoint';
  } else if (typeName.includes('museum') || typeName.includes('museo') || typeName.includes('exhibition')) {
    type = 'museum';
  }

  return {
    id: poi.id,
    type,
    name: poi.name,
    address: poi.address || undefined,
    latitude: poi.lat,
    longitude: poi.lng,
    description_es: poi.description_es,
    description_en: poi.description_en,
  };
}

/**
 * Hook to get all POI markers (mercados, viewpoints, museums)
 * Uses static data + Supabase data
 */
export function usePOIMarkers() {
  const { data: pois, isLoading, error } = usePOIs();

  // Transform Supabase POIs
  const supabasePOIs: MapMarker[] = pois
    ? pois.map(transformPOIToMarker).filter((m): m is MapMarker => m !== null)
    : [];

  // Combine with static data (static data as fallback/additions)
  const allMercados = [
    ...STATIC_MERCADOS,
    ...supabasePOIs.filter(m => m.type === 'mercado' && !STATIC_MERCADOS.some(s => s.id === m.id)),
  ];
  
  const allViewpoints = [
    ...STATIC_VIEWPOINTS,
    ...supabasePOIs.filter(m => m.type === 'viewpoint' && !STATIC_VIEWPOINTS.some(s => s.id === m.id)),
  ];
  
  const allMuseums = [
    ...STATIC_MUSEUMS,
    ...supabasePOIs.filter(m => m.type === 'museum' && !STATIC_MUSEUMS.some(s => s.id === m.id)),
  ];

  return {
    isLoading,
    error,
    mercados: allMercados,
    viewpoints: allViewpoints,
    museums: allMuseums,
    all: [...allMercados, ...allViewpoints, ...allMuseums],
  };
}

/**
 * Hook specifically for mercados
 */
export function useMercados() {
  return useQuery({
    queryKey: ['mercados'],
    queryFn: async () => {
      const { data } = await supabase.from('pois')
        .select('*, poi_type:poi_types(*)')
        .eq('is_active', true);
      
      // Filter to mercado types and transform
      const supabaseMercados = (data || [])
        .filter((poi: POIWithType) => {
          const typeName = poi.poi_type?.name_en?.toLowerCase() || '';
          return typeName.includes('market') || typeName.includes('mercado') || typeName.includes('feria');
        })
        .map(transformPOIToMarker)
        .filter((m): m is MapMarker => m !== null);

      // Return static + supabase (deduplicated)
      return [
        ...STATIC_MERCADOS,
        ...supabaseMercados.filter(m => !STATIC_MERCADOS.some(s => s.id === m.id)),
      ];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
