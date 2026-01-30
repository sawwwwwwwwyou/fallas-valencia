import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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

// Set Mapbox access token
const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN || '';
Mapbox.setAccessToken(MAPBOX_TOKEN);

export interface FallaMarker {
  id: string;
  name: string;
  district: string;
  category: 'special' | 'firstA' | 'firstB' | 'second';
  latitude: number;
  longitude: number;
  image?: string;
}

interface NativeMapboxProps {
  markers: FallaMarker[];
  onMarkerClick?: (marker: FallaMarker) => void;
  selectedMarkerId?: string | null;
  showUserLocation?: boolean;
}

// Custom Fallas style with orange roads (identical to web)
const FALLAS_STYLE_URL = 'mapbox://styles/clawdik/cmkzi1tq6000c01sa71184yeo';

// Animated marker component with ripple rings
function AnimatedMarker({
  marker,
  isSelected,
  isSpecial,
  onPress,
}: {
  marker: FallaMarker;
  isSelected: boolean;
  isSpecial: boolean;
  onPress: () => void;
}) {
  // Ripple animation for selected marker
  const ripple1Scale = useSharedValue(1);
  const ripple1Opacity = useSharedValue(0);
  const ripple2Scale = useSharedValue(1);
  const ripple2Opacity = useSharedValue(0);

  // Glow animation for special markers
  const glowOpacity = useSharedValue(0.6);

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

  useEffect(() => {
    if (isSpecial) {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 2000 }),
          withTiming(0.4, { duration: 2000 })
        ),
        -1,
        true
      );
    }
  }, [isSpecial]);

  const ripple1Style = useAnimatedStyle(() => ({
    transform: [{ scale: ripple1Scale.value }],
    opacity: ripple1Opacity.value,
  }));

  const ripple2Style = useAnimatedStyle(() => ({
    transform: [{ scale: ripple2Scale.value }],
    opacity: ripple2Opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.markerContainer}>
      {/* Ripple rings for selected marker */}
      {isSelected && (
        <>
          <Animated.View style={[styles.selectedRing, ripple1Style]} />
          <Animated.View style={[styles.selectedRing, ripple2Style]} />
        </>
      )}

      {/* Glow effect for special markers */}
      {isSpecial && (
        <Animated.View style={[styles.markerGlow, glowStyle]} />
      )}

      {/* Marker body with gradient */}
      <View
        style={[
          styles.markerBody,
          isSpecial && styles.markerSpecial,
          isSelected && styles.markerSelected,
        ]}
        onTouchEnd={onPress}
      >
        <LinearGradient
          colors={['#FF6B35', '#E63946']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.markerGradient}
        >
          <Text style={styles.markerEmoji}>🔥</Text>
        </LinearGradient>
      </View>

      {/* Marker tail */}
      <View style={styles.markerTail} />
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
    shadowColor: '#E63946',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
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
  markerGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 184, 0, 0.6)',
    top: 10,
    left: 10,
  },
});
