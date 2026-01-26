import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Falla } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Real Valencia coordinates for fallas
const FALLA_MARKERS = [
  { id: '1', name: 'Ayuntamiento', lat: 39.4699, lng: -0.3763, category: 'special' },
  { id: '2', name: 'Na Jordana', lat: 39.4785, lng: -0.3795, category: 'special' },
  { id: '3', name: 'Convento', lat: 39.4672, lng: -0.3712, category: 'special' },
  { id: '4', name: 'Exposición', lat: 39.4635, lng: -0.3845, category: 'firstA' },
  { id: '5', name: 'Cuba', lat: 39.4715, lng: -0.3685, category: 'firstA' },
];

// OpenStreetMap iframe URL centered on Valencia
const OSM_EMBED_URL = 'https://www.openstreetmap.org/export/embed.html?bbox=-0.4050%2C39.4500%2C-0.3500%2C39.4900&layer=mapnik&marker=39.4699%2C-0.3763';

export default function MapScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t, language } = useLanguage();

  const getCategoryLabel = (category: string) => {
    return category === 'special' ? t('category.special') : t('category.firstA');
  };

  const getDescription = (name: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      en: {
        default: `Description of Falla ${name}. One of the most emblematic fallas of Valencia with a rich fallero tradition.`,
      },
      es: {
        default: `Descripción de la falla ${name}. Una de las fallas más emblemáticas de Valencia con una rica tradición fallera.`,
      },
    };
    return descriptions[language].default;
  };

  const handleMarkerPress = (marker: typeof FALLA_MARKERS[0]) => {
    const falla: Falla = {
      id: marker.id,
      name: `Falla ${marker.name}`,
      category: getCategoryLabel(marker.category),
      address: 'Valencia, España',
      description: getDescription(marker.name),
    };
    navigation.navigate('FallaDetail', { falla });
  };

  const openFullMap = () => {
    Linking.openURL('https://www.openstreetmap.org/#map=15/39.4699/-0.3763');
  };

  // Web version with real map
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {/* Real OpenStreetMap iframe */}
          <iframe
            src={OSM_EMBED_URL}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 16,
            }}
            title="Valencia Fallas Map"
          />
          
          {/* Overlay with markers */}
          <View style={styles.markersOverlay}>
            {FALLA_MARKERS.map((marker) => (
              <TouchableOpacity
                key={marker.id}
                style={[
                  styles.overlayMarker,
                  marker.category === 'special' && styles.markerSpecial,
                ]}
                onPress={() => handleMarkerPress(marker)}
              >
                <Text style={styles.markerIcon}>🔥</Text>
                <Text style={styles.overlayMarkerText}>{marker.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Open full map button */}
        <TouchableOpacity style={styles.fullMapButton} onPress={openFullMap}>
          <Text style={styles.fullMapButtonText}>
            {language === 'es' ? '🗺️ Abrir mapa completo' : '🗺️ Open full map'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.markerSpecial]} />
            <Text style={styles.legendText}>{t('map.legend.special')}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>{t('map.legend.firstA')}</Text>
          </View>
        </View>
      </View>
    );
  }

  // Native version - simplified placeholder (would use react-native-maps)
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.map}>
          <Text style={styles.mapTitle}>{t('map.title')}</Text>
          <Text style={styles.mapSubtitle}>
            {language === 'es' 
              ? 'Toca un marcador para ver detalles' 
              : 'Tap a marker for details'}
          </Text>
          
          {FALLA_MARKERS.map((marker, index) => (
            <TouchableOpacity
              key={marker.id}
              style={[
                styles.marker,
                { 
                  left: `${30 + (index % 3) * 20}%`, 
                  top: `${25 + Math.floor(index / 3) * 25}%` 
                },
                marker.category === 'special' && styles.markerSpecial,
              ]}
              onPress={() => handleMarkerPress(marker)}
            >
              <Text style={styles.markerIcon}>🔥</Text>
              <View style={styles.markerLabel}>
                <Text style={styles.markerText}>{marker.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity style={styles.fullMapButton} onPress={openFullMap}>
        <Text style={styles.fullMapButtonText}>
          {language === 'es' ? '🗺️ Abrir en Google Maps' : '🗺️ Open in Google Maps'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.markerSpecial]} />
          <Text style={styles.legendText}>{t('map.legend.special')}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>{t('map.legend.firstA')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
    backgroundColor: '#E8F4E8',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 16,
  },
  mapTitle: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mapSubtitle: {
    position: 'absolute',
    top: 40,
    left: 16,
    fontSize: 12,
    color: '#666',
  },
  markersOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  overlayMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  overlayMarkerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  markerSpecial: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
  },
  markerIcon: {
    fontSize: 24,
  },
  markerLabel: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  markerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
  fullMapButton: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  fullMapButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
});
