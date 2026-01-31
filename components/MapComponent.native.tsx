import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { INITIAL_VIEW_STATE } from '../lib/maplibre-fallas-style';
import { MARKER_CONFIG, MapMarkerType } from '../hooks/usePOIs';

// Set Mapbox access token
const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN || '';
Mapbox.setAccessToken(MAPBOX_TOKEN);

export interface FallaMarker {
  id: string;
  name: string;
  district?: string;
  category?: 'special' | 'firstA' | 'firstB' | 'second' | 'secondA' | 'secondB' | 'infantil';
  latitude: number;
  longitude: number;
  image?: string;
  // New: marker type for different POI types
  type?: MapMarkerType;
}

interface NativeMapboxProps {
  markers: FallaMarker[];
  onMarkerClick?: (marker: FallaMarker) => void;
  selectedMarkerId?: string | null;
  showUserLocation?: boolean;
}

// Custom Fallas style with orange roads (identical to web)
const FALLAS_STYLE_URL = 'mapbox://styles/clawdik/cmkzi1tq6000c01sa71184yeo';

// Animated marker component with ripple rings - supports different marker types
function AnimatedMarker({
  marker,
  isSelected,
  isSpecial,
  onPress,
  scale = 1,
}: {
  marker: FallaMarker;
  isSelected: boolean;
  isSpecial: boolean;
  onPress: () => void;
  scale?: number;
}) {
  // Get marker config based on type
  const markerType: MapMarkerType = marker.type || 'falla';
  const config = MARKER_CONFIG[markerType];
  
  // Dynamic sizes based on zoom scale
  const markerSize = Math.round(44 * scale);
  const containerSize = Math.round(80 * scale);
  const emojiSize = Math.round(22 * scale);
  const tailWidth = Math.round(8 * scale);
  const tailHeight = Math.round(12 * scale);
  // Ripple animation for selected marker
  const ripple1Scale = useSharedValue(1);
  const ripple1Opacity = useSharedValue(0);
  const ripple2Scale = useSharedValue(1);
  const ripple2Opacity = useSharedValue(0);

  useEffect(() => {
    if (isSelected) {
      // First ripple
      ripple1Scale.value = 1;
      ripple1Opacity.value = 1;
      ripple1Scale.value = withRepeat(
        withTiming(2.2, { duration: 3000, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
      ripple1Opacity.value = withRepeat(
        withTiming(0, { duration: 3000, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );

      // Second ripple (staggered)
      setTimeout(() => {
        ripple2Scale.value = 1;
        ripple2Opacity.value = 1;
        ripple2Scale.value = withRepeat(
          withTiming(2.2, { duration: 3000, easing: Easing.out(Easing.ease) }),
          -1,
          false
        );
        ripple2Opacity.value = withRepeat(
          withTiming(0, { duration: 3000, easing: Easing.out(Easing.ease) }),
          -1,
          false
        );
      }, 1500);
    } else {
      ripple1Scale.value = 1;
      ripple1Opacity.value = 0;
      ripple2Scale.value = 1;
      ripple2Opacity.value = 0;
    }
  }, [isSelected]);

  const ripple1Style = useAnimatedStyle(() => ({
    transform: [{ scale: ripple1Scale.value }],
    opacity: ripple1Opacity.value,
  }));

  const ripple2Style = useAnimatedStyle(() => ({
    transform: [{ scale: ripple2Scale.value }],
    opacity: ripple2Opacity.value,
  }));

  // Get ripple color based on marker type
  const getRippleColor = () => {
    switch (markerType) {
      case 'mercado': return 'rgba(16, 185, 129, 0.4)';
      case 'viewpoint': return 'rgba(139, 92, 246, 0.4)';
      case 'museum': return 'rgba(59, 130, 246, 0.4)';
      default: return 'rgba(255, 184, 0, 0.4)';
    }
  };

  return (
    <View style={[styles.markerContainer, { width: containerSize, height: containerSize }]}>
      {/* Ripple rings for selected marker */}
      {isSelected && (
        <>
          <Animated.View style={[styles.selectedRing, ripple1Style, { 
            width: markerSize, 
            height: markerSize, 
            borderRadius: markerSize / 2,
            top: (containerSize - markerSize) / 2,
            left: (containerSize - markerSize) / 2,
            backgroundColor: getRippleColor(),
          }]} />
          <Animated.View style={[styles.selectedRing, ripple2Style, { 
            width: markerSize, 
            height: markerSize, 
            borderRadius: markerSize / 2,
            top: (containerSize - markerSize) / 2,
            left: (containerSize - markerSize) / 2,
            backgroundColor: getRippleColor(),
          }]} />
        </>
      )}

      {/* Marker body with gradient */}
      <View
        style={[
          styles.markerBody,
          { width: markerSize, height: markerSize, borderRadius: markerSize / 2 },
          isSpecial && styles.markerSpecial,
          isSelected && styles.markerSelected,
        ]}
        onTouchEnd={onPress}
      >
        <LinearGradient
          colors={config.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.markerGradient}
        >
          <Text style={[styles.markerEmoji, { fontSize: emojiSize }]}>{config.emoji}</Text>
        </LinearGradient>
      </View>

      {/* Marker tail */}
      <View style={[styles.markerTail, {
        borderLeftWidth: tailWidth,
        borderRightWidth: tailWidth,
        borderTopWidth: tailHeight,
        borderTopColor: config.gradientColors[1],
      }]} />
    </View>
  );
}

export default function NativeMapbox({
  markers,
  onMarkerClick,
  selectedMarkerId,
  showUserLocation = true,
}: NativeMapboxProps) {
  const cameraRef = useRef<Mapbox.Camera>(null);
  const mapRef = useRef<Mapbox.MapView>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(INITIAL_VIEW_STATE.zoom);

  // Calculate marker scale based on zoom level
  // At zoom 10 and below: small (0.5x), zoom 14+: full size (1x)
  const getMarkerScale = (zoom: number) => {
    if (zoom <= 10) return 0.5;
    if (zoom >= 14) return 1;
    // Linear interpolation between zoom 10-14
    return 0.5 + ((zoom - 10) / 4) * 0.5;
  };

  const markerScale = getMarkerScale(currentZoom);

  useEffect(() => {
    if (isMapLoaded && selectedMarkerId) {
      const marker = markers.find(m => m.id === selectedMarkerId);
      if (marker && cameraRef.current) {
        cameraRef.current.setCamera({
          centerCoordinate: [marker.longitude, marker.latitude],
          zoomLevel: 15,
          animationDuration: 1000,
        });
      }
    }
  }, [selectedMarkerId, isMapLoaded, markers]);

  const handleMarkerPress = (marker: FallaMarker) => {
    onMarkerClick?.(marker);
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        ref={mapRef}
        style={styles.map}
        styleURL={FALLAS_STYLE_URL}
        onDidFinishLoadingMap={() => setIsMapLoaded(true)}
        onCameraChanged={(state) => {
          if (state.properties.zoom !== undefined) {
            setCurrentZoom(state.properties.zoom);
          }
        }}
        logoEnabled={false}
        attributionEnabled={false}
      >
        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={INITIAL_VIEW_STATE.zoom}
          centerCoordinate={[INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude]}
          animationMode="flyTo"
          animationDuration={1000}
        />

        {/* User Location */}
        {showUserLocation && (
          <Mapbox.UserLocation
            visible={true}
            showsUserHeadingIndicator={true}
            androidRenderMode="normal"
          />
        )}

        {/* Falla Markers */}
        {markers.map((marker) => {
          const isSelected = selectedMarkerId === marker.id;
          const isSpecial = marker.category === 'special';

          return (
            <Mapbox.MarkerView
              key={marker.id}
              id={marker.id}
              coordinate={[marker.longitude, marker.latitude]}
            >
              <AnimatedMarker
                marker={marker}
                isSelected={isSelected}
                isSpecial={isSpecial}
                onPress={() => handleMarkerPress(marker)}
                scale={markerScale}
              />
            </Mapbox.MarkerView>
          );
        })}
      </Mapbox.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 80,
    height: 80,
  },
  markerBody: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // Shadow only on Android, iOS renders it as a ring
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        // No shadow on iOS for non-selected markers
      },
    }),
  },
  markerGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerEmoji: {
    fontSize: 22,
  },
  markerSpecial: {
    borderColor: '#FFB800',
    shadowColor: '#FFB800',
    shadowOpacity: 0.6,
  },
  markerSelected: {
    transform: [{ scale: 1.15 }],
    shadowRadius: 20,
    shadowOpacity: 0.8,
  },
  markerTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#E63946',
    marginTop: -2,
  },
  selectedRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 184, 0, 0.4)',
    top: 18,
    left: 18,
  },
});
