import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { RootStackParamList, Falla } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LocationIcon, StarIcon, NavigationIcon } from '../components/icons';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';

// Conditionally import WebMapbox only on web
let WebMapbox: React.ComponentType<any> | null = null;
if (Platform.OS === 'web') {
  WebMapbox = require('../components/WebMapbox').default;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Real Valencia coordinates for fallas
const FALLA_MARKERS = [
  {
    id: '1',
    name: 'Falla Plaza del Ayuntamiento',
    district: 'Plaza del Ayuntamiento',
    category: 'special' as const,
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    latitude: 39.4699,
    longitude: -0.3763,
  },
  {
    id: '2',
    name: 'Falla Convento Jerusalén',
    district: 'Ruzafa',
    category: 'special' as const,
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
    latitude: 39.4589,
    longitude: -0.3723,
  },
  {
    id: '3',
    name: 'Falla Na Jordana',
    district: 'El Carmen',
    category: 'special' as const,
    image: 'https://images.unsplash.com/photo-1671639045782-93f73d559236?w=400',
    latitude: 39.4789,
    longitude: -0.3803,
  },
  {
    id: '4',
    name: 'Falla Antiga de Campanar',
    district: 'Campanar',
    category: 'firstA' as const,
    image: 'https://images.unsplash.com/photo-1671639045782-93f73d559236?w=400',
    latitude: 39.4820,
    longitude: -0.4010,
  },
  {
    id: '5',
    name: 'Falla Cuba-Literato Azorín',
    district: 'Ruzafa',
    category: 'firstA' as const,
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    latitude: 39.4560,
    longitude: -0.3670,
  },
  {
    id: '6',
    name: 'Falla Exposición',
    district: 'Exposición',
    category: 'special' as const,
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
    latitude: 39.4750,
    longitude: -0.3650,
  },
];

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

// Bottom Preview Card
function PreviewCard({
  marker,
  onPress,
  onGetDirections,
  language,
}: {
  marker: typeof FALLA_MARKERS[0];
  onPress: () => void;
  onGetDirections: () => void;
  language: string;
}) {
  const isSpecial = marker.category === 'special';

  return (
    <MotiView
      from={{ translateY: 50, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400 }}
      style={styles.previewWrapper}
    >
      <View style={styles.previewCard}>
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
              {/* You can replace this emoji with an actual Image component */}
              {/* <Image source={require('./path-to-character.png')} style={styles.characterImage} /> */}
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
              <TouchableOpacity style={styles.heartButton}>
                <Text style={styles.heartIcon}>♡</Text>
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
    </MotiView>
  );
}

export default function MapScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t, language } = useLanguage();
  const [selectedMarker, setSelectedMarker] = useState<typeof FALLA_MARKERS[0] | null>(
    FALLA_MARKERS[0]
  );
  const [filterSpecial, setFilterSpecial] = useState(false);
  const [filterNearMe, setFilterNearMe] = useState(false);

  const getCategoryLabel = (category: string) => {
    return category === 'special' ? t('category.special') : t('category.firstA');
  };

  const handleMarkerPress = (marker: typeof FALLA_MARKERS[0]) => {
    setSelectedMarker(marker);
  };

  const handleNavigateToFalla = () => {
    if (!selectedMarker) return;

    const falla: Falla = {
      id: selectedMarker.id,
      name: selectedMarker.name,
      category: getCategoryLabel(selectedMarker.category),
      address: `${selectedMarker.district}, Valencia`,
      description: language === 'es'
        ? `Una de las fallas más emblemáticas de Valencia.`
        : `One of the most emblematic fallas of Valencia.`,
    };
    navigation.navigate('FallaDetail', { falla });
  };

  const openDirections = () => {
    if (!selectedMarker) return;
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.latitude},${selectedMarker.longitude}`);
  };

  // Filter markers
  const filteredMarkers = FALLA_MARKERS.filter(marker => {
    if (filterSpecial && marker.category !== 'special') return false;
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' && WebMapbox ? (
          <WebMapbox
            markers={filteredMarkers}
            onMarkerClick={handleMarkerPress}
            selectedMarkerId={selectedMarker?.id}
            showUserLocation={true}
          />
        ) : (
          // Native fallback with placeholder and overlay markers
          <>
            <View style={styles.mapPlaceholder}>
              <LinearGradient
                colors={['#1A1A1A', '#0D0D0D', '#1A1A1A']}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={styles.mapPlaceholderText}>🗺️</Text>
              <Text style={styles.mapPlaceholderSubtext}>
                {language === 'es' ? 'Mapa de Valencia' : 'Valencia Map'}
              </Text>
            </View>

            {/* Animated Markers overlay */}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 800 }}
              style={styles.markersOverlay}
            >
              <MapMarker
                active={selectedMarker?.id === FALLA_MARKERS[0].id}
                style={{ top: '25%', left: '35%' }}
                onPress={() => handleMarkerPress(FALLA_MARKERS[0])}
              />
              <MapMarker
                active={selectedMarker?.id === FALLA_MARKERS[1].id}
                style={{ top: '45%', left: '55%' }}
                onPress={() => handleMarkerPress(FALLA_MARKERS[1])}
              />
              <MapMarker
                active={selectedMarker?.id === FALLA_MARKERS[3].id}
                style={{ top: '60%', left: '30%' }}
                onPress={() => handleMarkerPress(FALLA_MARKERS[3])}
              />

              {/* User location */}
              <View style={styles.userLocationContainer}>
                <UserLocationPulse />
              </View>
            </MotiView>
          </>
        )}
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

      {/* Bottom Preview Card */}
      {selectedMarker && (
        <PreviewCard
          marker={selectedMarker}
          onPress={handleNavigateToFalla}
          onGetDirections={openDirections}
          language={language}
        />
      )}

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
    </View>
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
  // Preview Card
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
