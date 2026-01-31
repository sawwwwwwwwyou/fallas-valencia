import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { RootStackParamList, MainTabsParamList, Falla } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LocationIcon, StarIcon, NavigationIcon } from '../components/icons';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';
import { useFallasMarkers, FallaMarker, useToggleFavorite, useFavorites } from '../hooks';
import { useAuth } from '../contexts/AuthContext';

import MapComponent from '../components/MapComponent';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MapRouteProp = RouteProp<MainTabsParamList, 'Mapa'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Filter Pill Component
function FilterPill({
  icon,
  label,
  active = false,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 5 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
    >
      <TouchableOpacity
        style={[
          styles.filterPill,
          active && styles.filterPillActive,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {icon}
        <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    </MotiView>
  );
}

// Animated Map Marker (for native fallback)
function MapMarker({
  active = false,
  style,
  onPress,
}: {
  active?: boolean;
  style?: any;
  onPress?: () => void;
}) {
  const ripple1Scale = useSharedValue(1);
  const ripple1Opacity = useSharedValue(1);
  const ripple2Scale = useSharedValue(1);
  const ripple2Opacity = useSharedValue(1);

  React.useEffect(() => {
    if (!active) {
      ripple1Scale.value = 1;
      ripple1Opacity.value = 0;
      ripple2Scale.value = 1;
      ripple2Opacity.value = 0;
      return;
    }

    // First ripple - 4s duration (2x slower)
    ripple1Scale.value = withRepeat(
      withTiming(2.5, { duration: 4000 }),
      -1,
      false
    );
    ripple1Opacity.value = withRepeat(
      withTiming(0, { duration: 4000 }),
      -1,
      false
    );

    // Second staggered ripple
    const staggeredDelay = 2000;
    const timeout = setTimeout(() => {
      ripple2Scale.value = withRepeat(
        withTiming(2.5, { duration: 4000 }),
        -1,
        false
      );
      ripple2Opacity.value = withRepeat(
        withTiming(0, { duration: 4000 }),
        -1,
        false
      );
    }, staggeredDelay);

    return () => clearTimeout(timeout);
  }, [active]);

  const ripple1Style = useAnimatedStyle(() => ({
    transform: [{ scale: ripple1Scale.value }],
    opacity: ripple1Opacity.value,
  }));

  const ripple2Style = useAnimatedStyle(() => ({
    transform: [{ scale: ripple2Scale.value }],
    opacity: ripple2Opacity.value,
  }));

  return (
    <View style={[styles.markerContainer, style]}>
      {/* Ripple Rings - Only for active */}
      {active && (
        <>
          <Animated.View style={[styles.markerRipple, ripple1Style]} />
          <Animated.View style={[styles.markerRipple, ripple2Style]} />
        </>
      )}

      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.markerOutline}>
        <LinearGradient
          colors={['#FF6B35', '#E63946']}
          style={[styles.marker, active && styles.markerSpecial]}
        >
          <Text style={styles.markerEmoji}>🔥</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

// User Location Pulse (for native fallback)
function UserLocationPulse() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.5, { duration: 2000 }),
      -1,
      true
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 2000 }),
        withTiming(0.5, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.userLocation}>
      <Animated.View style={[styles.userPulse, pulseStyle]} />
      <View style={styles.userDot} />
    </View>
  );
}

// Bottom Sheet Height
const BOTTOM_SHEET_HEIGHT = 160;

// Bottom Preview Card with Bottom Sheet behavior
function BottomSheetPreviewCard({
  marker,
  isVisible,
  onPress,
  onGetDirections,
  onClose,
  onToggleFavorite,
  isFavorite,
  language,
}: {
  marker: FallaMarker | null;
  isVisible: boolean;
  onPress: () => void;
  onGetDirections: () => void;
  onClose: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  language: string;
}) {
  const translateY = useSharedValue(BOTTOM_SHEET_HEIGHT + 100);
  const context = useSharedValue({ y: 0 });

  // Animate visibility
  useEffect(() => {
    if (isVisible && marker) {
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 200,
      });
    } else {
      translateY.value = withSpring(BOTTOM_SHEET_HEIGHT + 100, {
        damping: 20,
        stiffness: 200,
      });
    }
  }, [isVisible, marker]);

  // Pan gesture for swipe down to dismiss
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      // Only allow dragging down
      const newY = context.value.y + event.translationY;
      translateY.value = Math.max(0, newY);
    })
    .onEnd((event) => {
      // If dragged more than 50px or velocity is high, dismiss
      if (event.translationY > 50 || event.velocityY > 500) {
        translateY.value = withSpring(BOTTOM_SHEET_HEIGHT + 100, {
          damping: 20,
          stiffness: 200,
        });
        runOnJS(onClose)();
      } else {
        // Snap back
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const isSpecial = marker?.category === 'special';

  if (!marker) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.previewWrapper, animatedStyle]}>
        <View style={styles.previewCard}>
          {/* Drag Handle */}
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Orange gradient top line */}
          <LinearGradient
            colors={['#FF6B35', '#FFB800', '#FF6B35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.previewTopGradient}
          />

          <View style={styles.previewContent}>
            {/* Character Illustration */}
            <View style={styles.previewImageContainer}>
              <LinearGradient
                colors={['#FFF8F0', '#FFE8D6', '#FFF8F0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.characterBackground}
              >
                <Text style={styles.characterEmoji}>🎭</Text>
              </LinearGradient>
            </View>

            {/* Info Section */}
            <View style={styles.previewInfo}>
              {/* Title and Heart */}
              <View style={styles.previewHeader}>
                <Text style={styles.previewTitle} numberOfLines={1}>
                  {marker.name}
                </Text>
                <TouchableOpacity style={styles.heartButton} onPress={onToggleFavorite}>
                  <Text style={styles.heartIcon}>{isFavorite ? '❤️' : '♡'}</Text>
                </TouchableOpacity>
              </View>

              {/* Badge and Distance */}
              <View style={styles.previewMeta}>
                {isSpecial && (
                  <View style={styles.especialBadge}>
                    <Text style={styles.especialBadgeText}>ESPECIAL</Text>
                  </View>
                )}
                <Text style={styles.distanceText}>• 350m away</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.previewActions}>
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={onGetDirections}
                  activeOpacity={0.8}
                >
                  <NavigationIcon size={16} color="#FFFFFF" />
                  <Text style={styles.navigateButtonText}>Navigate</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={onPress}
                  activeOpacity={0.8}
                >
                  <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

export default function MapScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<MapRouteProp>();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [selectedMarker, setSelectedMarker] = useState<FallaMarker | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [filterSpecial, setFilterSpecial] = useState(false);
  const [filterNearMe, setFilterNearMe] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Fetch fallas from Supabase
  const { markers: allMarkers, isLoading, error } = useFallasMarkers();
  
  // Favorites
  const { data: favorites } = useFavorites(user?.id);
  const { toggle: toggleFavorite, isLoading: isTogglingFavorite } = useToggleFavorite();
  
  // Check if selected marker is favorite
  const isSelectedFavorite = selectedMarker && favorites 
    ? favorites.some(f => f.falla_id === selectedMarker.id)
    : false;

  // Handle navigation from SavedScreen with selectedFallaId
  useEffect(() => {
    const selectedFallaId = route.params?.selectedFallaId;
    if (selectedFallaId && allMarkers.length > 0) {
      const marker = allMarkers.find(m => m.id === selectedFallaId);
      if (marker) {
        setSelectedMarker(marker);
        setIsPanelVisible(true);
      }
      // Clear the param after handling to avoid re-triggering
      navigation.setParams({ selectedFallaId: undefined } as any);
    }
  }, [route.params?.selectedFallaId, allMarkers]);

  const getCategoryLabel = (category: string) => {
    return category === 'special' ? t('category.special') : t('category.firstA');
  };

  const handleMarkerPress = (marker: FallaMarker) => {
    setSelectedMarker(marker);
    setIsPanelVisible(true);
  };

  const handleClosePanel = () => {
    setIsPanelVisible(false);
  };

  const handleNavigateToFalla = () => {
    if (!selectedMarker) return;

    const falla: Falla = {
      id: selectedMarker.id,
      name: selectedMarker.name,
      category: getCategoryLabel(selectedMarker.category),
      address: `${selectedMarker.district}, Valencia`,
      description: language === 'es'
        ? (selectedMarker.description_es || `Una de las fallas más emblemáticas de Valencia.`)
        : (selectedMarker.description_en || `One of the most emblematic fallas of Valencia.`),
    };
    navigation.navigate('FallaDetail', { falla });
  };

  const openDirections = () => {
    if (!selectedMarker) return;
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.latitude},${selectedMarker.longitude}`);
  };

  const handleToggleFavorite = useCallback(async () => {
    if (!selectedMarker) return;
    
    if (!user) {
      if (Platform.OS === 'web') {
        window.alert(language === 'es' ? 'Inicia sesión para guardar favoritos' : 'Sign in to save favorites');
      } else {
        Alert.alert(
          language === 'es' ? 'Iniciar sesión' : 'Sign In',
          language === 'es' ? 'Inicia sesión para guardar favoritos' : 'Sign in to save favorites'
        );
      }
      return;
    }
    
    try {
      await toggleFavorite(user.id, selectedMarker.id, isSelectedFavorite);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  }, [selectedMarker, user, isSelectedFavorite, toggleFavorite, language]);

  // Get user location for Near Me filter
  useEffect(() => {
    if (filterNearMe && !userLocation) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.log('Geolocation error:', error);
            // Fallback to Valencia center if geolocation fails
            setUserLocation({ lat: 39.4699, lng: -0.3763 });
          }
        );
      } else {
        // Fallback to Valencia center
        setUserLocation({ lat: 39.4699, lng: -0.3763 });
      }
    }
  }, [filterNearMe, userLocation]);

  // Calculate distance between two points (Haversine formula)
  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Filter markers
  const filteredMarkers = allMarkers.filter(marker => {
    if (filterSpecial && marker.category !== 'special') return false;
    if (filterNearMe && userLocation) {
      const distance = getDistance(userLocation.lat, userLocation.lng, marker.latitude, marker.longitude);
      if (distance > 1) return false; // Within 1km
    }
    return true;
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary.orange} />
            <Text style={styles.loadingText}>Loading fallas...</Text>
          </View>
        ) : (
          <MapComponent
            markers={filteredMarkers}
            onMarkerClick={handleMarkerPress}
            selectedMarkerId={selectedMarker?.id}
            showUserLocation={true}
          />
        )}
      </View>

      {/* Version Label */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>v0.0.5</Text>
      </View>

      {/* Filter Pills */}
      <View style={styles.filterContainer}>
        <FilterPill
          icon={<NavigationIcon size={16} color={filterNearMe ? '#fff' : colors.primary.orange} />}
          label={language === 'es' ? 'Cerca de mí' : 'Near Me'}
          active={filterNearMe}
          onPress={() => setFilterNearMe(!filterNearMe)}
        />
        <FilterPill
          icon={<StarIcon size={16} color={filterSpecial ? '#fff' : '#FFB800'} filled />}
          label="Especial"
          active={filterSpecial}
          onPress={() => setFilterSpecial(!filterSpecial)}
        />
      </View>

      {/* Bottom Sheet Preview Card */}
      <BottomSheetPreviewCard
        marker={selectedMarker}
        isVisible={isPanelVisible}
        onPress={handleNavigateToFalla}
        onGetDirections={openDirections}
        onClose={handleClosePanel}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isSelectedFavorite}
        language={language}
      />

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendDotSpecial]} />
            <Text style={styles.legendText}>{t('map.legend.special')}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>{t('map.legend.firstA')}</Text>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // Match map style to prevent flash
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 14,
  },
  versionContainer: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontWeight: '500',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 64,
  },
  mapPlaceholderSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  markersOverlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  // Markers
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerGlow: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFB800',
    opacity: 0.3,
    transform: [{ translateX: -5 }, { translateY: -5 }],
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  markerSpecial: {
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  markerOutline: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 2,
    ...shadows.card,
  },
  markerRipple: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 184, 0, 0.4)',
    zIndex: -1,
  },
  markerEmoji: {
    fontSize: 20,
  },
  // User Location
  userLocationContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  userLocation: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
  },
  userDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    borderWidth: 2,
    borderColor: '#fff',
    ...shadows.card,
  },
  // Filter Pills
  filterContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    ...shadows.card,
  },
  filterPillActive: {
    backgroundColor: colors.primary.orange,
    borderColor: colors.primary.orange,
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  filterPillTextActive: {
    color: '#fff',
  },
  // Preview Card / Bottom Sheet
  previewWrapper: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  previewCard: {
    borderRadius: 24,
    backgroundColor: '#F8F6F5',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  closeButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  previewTopGradient: {
    height: 4,
    width: '100%',
    opacity: 0.8,
  },
  previewContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  previewImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  characterBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterEmoji: {
    fontSize: 48,
    textAlign: 'center',
  },
  characterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  previewInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  previewTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  heartButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  previewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  especialBadge: {
    backgroundColor: '#FFF8E7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  especialBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8B6914',
    letterSpacing: 0.5,
  },
  distanceText: {
    fontSize: 10,
    color: colors.text.tertiary,
    fontWeight: '500',
  },
  previewActions: {
    flexDirection: 'row',
    gap: 8,
  },
  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primary.orange,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: colors.primary.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E8E5E3',
  },
  detailsButtonText: {
    color: colors.text.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  // Legend
  legendContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 5,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    padding: 12,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.orange,
  },
  legendDotSpecial: {
    backgroundColor: '#FFB800',
  },
  legendText: {
    fontSize: 12,
    color: '#ccc',
  },
});
