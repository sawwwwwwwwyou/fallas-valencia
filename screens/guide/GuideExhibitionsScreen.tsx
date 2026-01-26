import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

interface Exhibition {
  id: string;
  nameKey: string;
  nameEs: string;
  emoji: string;
  address: string;
  hours: string;
  priceKey: string;
  descKey: string;
}

const EXHIBITIONS: Exhibition[] = [
  {
    id: '1',
    nameKey: 'exhibitions.ninot',
    nameEs: 'Exposición del Ninot',
    emoji: '🎭',
    address: 'Museo de las Ciencias Príncipe Felipe',
    hours: '10:00 - 20:00',
    priceKey: '4€',
    descKey: 'exhibitions.ninotDesc',
  },
  {
    id: '2',
    nameKey: 'exhibitions.fallero',
    nameEs: 'Museo Fallero',
    emoji: '🏛️',
    address: 'Plaza Monteolivete, 4',
    hours: '10:00 - 19:00 / 10:00 - 14:00',
    priceKey: 'exhibitions.freeSunday',
    descKey: 'exhibitions.falleroDesc',
  },
  {
    id: '3',
    nameKey: 'exhibitions.artist',
    nameEs: 'Museo del Artista Fallero',
    emoji: '🎨',
    address: 'C/ Ricard Sanmartí, s/n',
    hours: '10:00 - 14:00, 16:00 - 19:00',
    priceKey: 'exhibitions.free',
    descKey: 'exhibitions.artistDesc',
  },
  {
    id: '4',
    nameKey: 'exhibitions.costume',
    nameEs: 'Exposición de Indumentaria',
    emoji: '👗',
    address: 'Museo de la Seda, C/ Hospital, 7',
    hours: '10:00 - 19:00',
    priceKey: '7€',
    descKey: 'exhibitions.costumeDesc',
  },
];

export default function GuideExhibitionsScreen() {
  const { t, language } = useLanguage();

  const getPrice = (priceKey: string) => {
    if (priceKey.startsWith('exhibitions.')) {
      return t(priceKey);
    }
    return priceKey;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.intro}>{t('exhibitions.intro')}</Text>

      {EXHIBITIONS.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <View style={styles.cardTitles}>
              <Text style={styles.cardName}>{t(item.nameKey)}</Text>
              <Text style={styles.cardNameEs}>{item.nameEs}</Text>
            </View>
          </View>
          
          <Text style={styles.cardDesc}>{t(item.descKey)}</Text>
          
          <View style={styles.cardInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{t('exhibitions.address')}</Text>
              <Text style={styles.infoValue}>{item.address}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{t('exhibitions.hours')}</Text>
              <Text style={styles.infoValue}>{item.hours}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{t('exhibitions.price')}</Text>
              <Text style={styles.infoValue}>{getPrice(item.priceKey)}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>{t('exhibitions.showOnMap')}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  intro: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 40,
    marginRight: 14,
  },
  cardTitles: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  cardNameEs: {
    fontSize: 14,
    color: '#9C27B0',
    fontStyle: 'italic',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardInfo: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
    width: 80,
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  mapButton: {
    backgroundColor: '#9C27B015',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#9C27B0',
    fontWeight: '600',
    fontSize: 14,
  },
});
