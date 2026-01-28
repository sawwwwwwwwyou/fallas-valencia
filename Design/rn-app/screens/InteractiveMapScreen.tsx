import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const MONUMENTS = [
  {
    id: 1,
    name: 'Convento Jerusalén',
    category: 'Especial',
    distance: '350m away',
    position: { top: '52%', left: '42%' },
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
  },
  {
    id: 2,
    name: 'Plaza del Ayuntamiento',
    category: 'Especial',
    distance: '500m away',
    position: { top: '35%', left: '65%' },
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
  },
];

export default function InteractiveMapScreen() {
  const [selectedMonument, setSelectedMonument] = useState(MONUMENTS[0]);

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <View style={styles.mapBackground}>
        {/* Map texture overlay */}
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABrCqlun-rrY3FU6EKjshJUm5N22dFB5r-sLuajopYB30jg-WPruGgK5GJy8Zd4USmzSJF2iOCD_hEr1f4SNpWUOIp5C5TYMbP2NX6X4zazUPXdcsaPM9YDELClNW09I10FJAjwkVJphhq6zlK46KqoCxgNLn5l0F2F-aSwPbqy7E5pdT6xwR_jBZHh4Hz17dgx7xUhVNTJoOIU8L_tb3f39iTHw9EsszKDFv9oBFpbJSEGcuGGSoVHOuY3UrXZbF7Nhes8bmz9t0',
          }}
          style={styles.mapTexture}
        />

        {/* Decorative blocks */}
        <View style={[styles.decorBlock, { top: '20%', left: '10%', width: 120, height: 120 }]} />
        <View style={[styles.decorBlock, { top: '60%', right: '15%', width: 180, height: 240 }]} />

        {/* Monument Markers */}
        {MONUMENTS.map((monument, index) => (
          <TouchableOpacity
            key={monument.id}
            style={[
              styles.markerContainer,
              {
                top: monument.position.top,
                left: monument.position.left,
              },
            ]}
            onPress={() => setSelectedMonument(monument)}
            activeOpacity={0.8}
          >
            {/* Selected label */}
            {selectedMonument.id === monument.id && (
              <BlurView intensity={80} tint="light" style={styles.markerLabel}>
                <Text style={styles.markerLabelText}>{monument.name}</Text>
              </BlurView>
            )}

            {/* Marker icon */}
            <AnimatedMarker isSelected={selectedMonument.id === monument.id} />

            {/* Shadow */}
            <View style={styles.markerShadow} />
          </TouchableOpacity>
        ))}

        {/* Standard orange markers */}
        {[
          { top: '28%', left: '25%' },
          { top: '22%', left: '55%' },
          { top: '65%', left: '80%' },
          { top: '72%', left: '20%' },
          { top: '45%', right: '10%' },
        ].map((pos, index) => (
          <View
            key={`standard-${index}`}
            style={[
              styles.standardMarker,
              {
                top: pos.top,
                left: pos.left,
                right: pos.right,
              },
            ]}
          />
        ))}

        {/* User location (pulsing blue dot) */}
        <View style={styles.userLocationContainer}>
          {/* Direction cone */}
          <View style={styles.directionCone} />
          
          {/* Pulsing effect */}
          <PulsingDot />
          
          {/* Blue dot */}
          <View style={styles.userDot} />
        </View>
      </View>

      {/* Search bar and filters */}
      <BlurView intensity={90} tint="light" style={styles.searchContainer}>
        <View style={styles.searchRow}>
          {/* Search bar */}
          <BlurView intensity={80} tint="light" style={styles.searchBar}>
            <MaterialIcons name="search" size={24} color={COLORS.primary} />
            <Text style={styles.searchPlaceholder}>Find a Falla...</Text>
            <TouchableOpacity style={styles.filterButton}>
              <MaterialIcons name="tune" size={20} color="#666" />
            </TouchableOpacity>
          </BlurView>

          {/* Layers button */}
          <BlurView intensity={80} tint="light" style={styles.layersButton}>
            <MaterialIcons name="layers" size={24} color="#333" />
          </BlurView>
        </View>

        {/* Filter chips */}
        <View style={styles.chipsContainer}>
          <View style={styles.chipActive}>
            <Text style={styles.chipActiveText}>All Fallas</Text>
          </View>
          <BlurView intensity={80} tint="light" style={styles.chip}>
            <MaterialIcons name="near-me" size={16} color="#666" />
            <Text style={styles.chipText}>Near Me</Text>
          </BlurView>
          <BlurView intensity={80} tint="light" style={styles.chip}>
            <MaterialIcons name="star" size={16} color={COLORS.gold} />
            <Text style={styles.chipText}>Section Especial</Text>
          </BlurView>
        </View>
      </BlurView>

      {/* Map controls */}
      <View style={styles.mapControls}>
        <BlurView intensity={80} tint="light" style={styles.controlButton}>
          <MaterialIcons name="my-location" size={24} color={COLORS.primary} />
        </BlurView>
        <BlurView intensity={80} tint="light" style={styles.controlButton}>
          <MaterialIcons name="3d-rotation" size={24} color="#333" />
        </BlurView>
      </View>

      {/* Bottom preview card */}
      <View style={styles.previewCardContainer}>
        <BlurView intensity={90} tint="light" style={styles.previewCard}>
          {/* Top gradient line */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.gold, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.previewTopGradient}
          />

          <View style={styles.previewContent}>
            {/* Thumbnail */}
            <Image source={{ uri: selectedMonument.image }} style={styles.previewThumbnail} />

            {/* Info */}
            <View style={styles.previewInfo}>
              <View style={styles.previewHeader}>
                <Text style={styles.previewTitle} numberOfLines={1}>
                  {selectedMonument.name}
                </Text>
                <TouchableOpacity>
                  <MaterialIcons name="favorite-border" size={20} color="#999" />
                </TouchableOpacity>
              </View>

              <View style={styles.previewMeta}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{selectedMonument.category}</Text>
                </View>
                <Text style={styles.distanceText}>• {selectedMonument.distance}</Text>
              </View>

              {/* Actions */}
              <View style={styles.previewActions}>
                <TouchableOpacity style={styles.navigateButton}>
                  <MaterialIcons name="directions" size={16} color="#fff" />
                  <Text style={styles.navigateText}>Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

// Animated marker component
function AnimatedMarker({ isSelected }: { isSelected: boolean }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isSelected ? 1.15 : 1) }],
    };
  });

  return (
    <Animated.View style={[styles.marker, isSelected && styles.markerSelected, animatedStyle]}>
      <MaterialIcons
        name="local-fire-department"
        size={isSelected ? 32 : 20}
        color={COLORS.primary}
      />
    </Animated.View>
  );
}

// Pulsing dot animation
function PulsingDot() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  scale.value = withRepeat(
    withSequence(withTiming(1.5, { duration: 2000 }), withTiming(1, { duration: 0 })),
    -1
  );

  opacity.value = withRepeat(
    withSequence(withTiming(0, { duration: 2000 }), withTiming(0.5, { duration: 0 })),
    -1
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.pulsingRing, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.warmMap,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: COLORS.warmMap,
  },
  mapTexture: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
    tintColor: '#8B6239',
  },
  decorBlock: {
    position: 'absolute',
    backgroundColor: COLORS.sandRoad,
    borderRadius: BORDER_RADIUS.md,
    opacity: 0.5,
    transform: [{ rotate: '12deg' }],
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  markerLabel: {
    position: 'absolute',
    top: -40,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
  },
  markerLabelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  markerSelected: {
    width: 56,
    height: 56,
    borderWidth: 3,
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  markerShadow: {
    marginTop: 4,
    width: 16,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  standardMarker: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  userLocationContainer: {
    position: 'absolute',
    top: '75%',
    left: '50%',
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionCone: {
    position: 'absolute',
    top: -40,
    width: 96,
    height: 96,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    transform: [{ rotate: '0deg' }],
  },
  pulsingRing: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 122, 255, 0.4)',
  },
  userDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(253, 248, 240, 0.9)',
    overflow: 'hidden',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 4,
    paddingRight: 4,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
    gap: 8,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layersButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chipActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  chipActiveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  mapControls: {
    position: 'absolute',
    right: SPACING.md,
    bottom: 200,
    gap: 12,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  previewCardContainer: {
    position: 'absolute',
    bottom: 96,
    left: SPACING.md,
    right: SPACING.md,
  },
  previewCard: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  previewTopGradient: {
    height: 4,
    opacity: 0.8,
  },
  previewContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  previewThumbnail: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#f0f0f0',
  },
  previewInfo: {
    flex: 1,
    gap: 4,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  previewTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    marginRight: 8,
  },
  previewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B8860B',
    textTransform: 'uppercase',
  },
  distanceText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  previewActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  navigateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  detailsButton: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
});
