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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Real Valencia coordinates for fallas
const FALLA_MARKERS = [
  { 
    id: '1', 
    name: 'Falla de la Sección Especial', 
    district: 'Plaza del Ayuntamiento', 
    category: 'special',
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
  },
  { 
    id: '2', 
    name: 'Falla Convento Jerusalén', 
    district: 'Ruzafa', 
    category: 'special',
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
  },
  { 
    id: '3', 
    name: 'Falla Antiga de Campanar', 
    district: 'Campanar', 
    category: 'firstA',
    image: 'https://images.unsplash.com/photo-1671639045782-93f73d559236?w=400',
  },
];

// OpenStreetMap iframe URL centered on Valencia
const OSM_EMBED_URL = 'https://www.openstreetmap.org/export/embed.html?bbox=-0.4050%2C39.4500%2C-0.3500%2C39.4900&layer=mapnik&marker=39.4699%2C-0.3763';

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
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15 }}
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

// Animated Map Marker
function MapMarker({ 
  special = false, 
  delay = 0,
  style,
  onPress,
}: { 
  special?: boolean;
  delay?: number;
  style?: any;
  onPress?: () => void;
}) {
  const bounce = useSharedValue(0);

  React.useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  return (
    <Animated.View style={[styles.markerContainer, style, animatedStyle]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {special && <View style={styles.markerGlow} />}
        <LinearGradient
          colors={['#FF6B35', '#E63946']}
          style={[styles.marker, special && styles.markerSpecial]}
        >
          <Text style={styles.markerEmoji}>🔥</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

// User Location Pulse
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

  const CardWrapper = Platform.OS === 'web' ? View : BlurView;
  const cardProps = Platform.OS === 'web' 
    ? { style: styles.previewCardWeb }
    : { intensity: 80, tint: 'light' as const, style: styles.previewCard };

  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
      style={styles.previewWrapper}
    >
      <CardWrapper {...cardProps}>
        <TouchableOpacity 
          style={styles.previewContent}
          onPress={onPress}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: marker.image }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.previewInfo}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle} numberOfLines={2}>
                {marker.name}
              </Text>
              {isSpecial && (
                <StarIcon size={20} color="#FFB800" filled />
              )}
            </View>
            <View style={styles.previewLocation}>
              <LocationIcon size={14} color={colors.text.tertiary} />
              <Text style={styles.previewDistrict}>{marker.district}</Text>
            </View>
            <TouchableOpacity 
              style={styles.directionsButton}
              onPress={onGetDirections}
            >
              <Text style={styles.directionsButtonText}>
                {language === 'es' ? 'Cómo llegar' : 'Get Directions'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </CardWrapper>
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
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.district},Valencia,Spain`);
  };

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <iframe
            src={OSM_EMBED_URL}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="Valencia Fallas Map"
          />
        ) : (
          <View style={styles.mapPlaceholder}>
            <LinearGradient
              colors={['#FFE8D6', '#FFDCC1', '#FFE5CD']}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.mapPlaceholderText}>🗺️</Text>
          </View>
        )}
        
        {/* Animated Markers overlay */}
        <View style={styles.markersOverlay}>
          <MapMarker 
            special 
            style={{ top: '25%', left: '35%' }}
            onPress={() => handleMarkerPress(FALLA_MARKERS[0])}
          />
          <MapMarker 
            special 
            delay={300}
            style={{ top: '45%', left: '55%' }}
            onPress={() => handleMarkerPress(FALLA_MARKERS[1])}
          />
          <MapMarker 
            delay={600}
            style={{ top: '60%', left: '30%' }}
            onPress={() => handleMarkerPress(FALLA_MARKERS[2])}
          />
          
          {/* User location */}
          <View style={styles.userLocationContainer}>
            <UserLocationPulse />
          </View>
        </View>
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
    backgroundColor: colors.background.cream,
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
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  previewCardWeb: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.9)',
    // @ts-ignore
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    ...shadows.card,
  },
  previewContent: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  previewImage: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.lg,
  },
  previewInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  previewLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  previewDistrict: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  directionsButton: {
    backgroundColor: colors.primary.orange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  directionsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
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
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: borderRadius.lg,
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
    color: colors.text.secondary,
  },
});
