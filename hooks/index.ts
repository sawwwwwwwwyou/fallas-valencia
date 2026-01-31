// Supabase + React Query hooks
export { useFallas, useFallasMarkers, useCategories } from './useFallas';
export type { FallaMarker } from './useFallas';

export {
  useFavorites,
  useFavoriteItems,
  useAddFavorite,
  useRemoveFavorite,
  useToggleFavorite,
  useIsFavorite,
} from './useFavorites';
export type { SavedItem } from './useFavorites';

// POI hooks (mercados, viewpoints, museums)
export { usePOIs, usePOIMarkers, useMercados, MARKER_CONFIG } from './usePOIs';
export type { MapMarker, MapMarkerType } from './usePOIs';
