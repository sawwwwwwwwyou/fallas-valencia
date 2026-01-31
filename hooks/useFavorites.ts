import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite } from '../lib/supabase';
import { FavoriteWithFalla, Falla, Category } from '../types/database';

// Type for saved items in the UI
export interface SavedItem {
  id: string;
  type: 'falla' | 'event';
  name: string;
  location: string;
  category?: string;
  time?: string;
  image: string;
  saved: boolean;
  // Extended data
  fallaId?: string;
  description_es?: string | null;
  description_en?: string | null;
}

// Transform favorite to SavedItem
function transformToSavedItem(favorite: FavoriteWithFalla): SavedItem | null {
  const falla = favorite.falla;
  if (!falla) return null;

  // Extract district from address
  const location = falla.address?.split(',')[0]?.trim() || 'Valencia';

  // Get category name if available
  const categoryName = (falla as any).category?.name_es || 'Falla';

  return {
    id: favorite.id,
    type: 'falla',
    name: falla.name,
    location,
    category: categoryName,
    image: falla.image_url || 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    saved: true,
    fallaId: falla.id,
    description_es: falla.description_es,
    description_en: falla.description_en,
  };
}

/**
 * Hook to fetch user's favorites
 */
export function useFavorites(userId: string | undefined) {
  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      if (!userId) return [];
      const favorites = await getFavorites(userId);
      return favorites as FavoriteWithFalla[];
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch favorites as SavedItems for UI
 */
export function useFavoriteItems(userId: string | undefined) {
  const { data: favorites, ...rest } = useFavorites(userId);

  const items: SavedItem[] = favorites
    ? favorites.map(transformToSavedItem).filter((item): item is SavedItem => item !== null)
    : [];

  return {
    ...rest,
    data: items,
    items, // alias for convenience
  };
}

/**
 * Hook to add a falla to favorites
 */
export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, fallaId }: { userId: string; fallaId: string }) =>
      addFavorite(userId, fallaId),
    onSuccess: (_, { userId }) => {
      // Invalidate favorites query to refetch
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
    },
  });
}

/**
 * Hook to remove a falla from favorites
 */
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, fallaId }: { userId: string; fallaId: string }) =>
      removeFavorite(userId, fallaId),
    onSuccess: (_, { userId }) => {
      // Invalidate favorites query to refetch
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
    },
  });
}

/**
 * Hook to toggle favorite status
 */
export function useToggleFavorite() {
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();

  return {
    toggle: async (userId: string, fallaId: string, currentlySaved: boolean) => {
      if (currentlySaved) {
        await removeMutation.mutateAsync({ userId, fallaId });
      } else {
        await addMutation.mutateAsync({ userId, fallaId });
      }
    },
    isLoading: addMutation.isPending || removeMutation.isPending,
    error: addMutation.error || removeMutation.error,
  };
}

/**
 * Check if a falla is in favorites
 */
export function useIsFavorite(userId: string | undefined, fallaId: string) {
  const { data: favorites } = useFavorites(userId);

  if (!favorites) return false;
  return favorites.some((f) => f.falla_id === fallaId);
}
