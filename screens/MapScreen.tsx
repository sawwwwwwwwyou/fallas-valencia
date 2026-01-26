import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Falla } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Simplified map view with markers
const FALLA_MARKERS = [
  { id: '1', name: 'Ayuntamiento', x: 50, y: 40, category: 'special' },
  { id: '2', name: 'Na Jordana', x: 35, y: 30, category: 'special' },
  { id: '3', name: 'Convento', x: 65, y: 50, category: 'special' },
  { id: '4', name: 'Exposición', x: 25, y: 60, category: 'firstA' },
  { id: '5', name: 'Cuba', x: 70, y: 35, category: 'firstA' },
];

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

  return (
    <View style={styles.container}>
      {/* Simplified map representation */}
      <View style={styles.mapContainer}>
        <View style={styles.map}>
          <Text style={styles.mapTitle}>{t('map.title')}</Text>
          
          {FALLA_MARKERS.map((marker) => (
            <TouchableOpacity
              key={marker.id}
              style={[
                styles.marker,
                { left: `${marker.x}%`, top: `${marker.y}%` },
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
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
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
