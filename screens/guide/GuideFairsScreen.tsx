import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

interface Fair {
  id: string;
  nameKey: string;
  nameEs: string;
  emoji: string;
  location: string;
  dates: string;
  typeKey: string;
  descKey: string;
}

const FAIRS: Fair[] = [
  {
    id: '1',
    nameKey: 'fairs.book',
    nameEs: 'Fira del Llibre',
    emoji: '📚',
    location: 'Plaza del Ayuntamiento',
    dates: '1-19',
    typeKey: 'fairs.type.books',
    descKey: 'fairs.bookDesc',
  },
  {
    id: '2',
    nameKey: 'fairs.horchata',
    nameEs: 'Feria de la Horchata',
    emoji: '🥤',
    location: 'Plaza de la Reina',
    dates: '15-19',
    typeKey: 'fairs.type.food',
    descKey: 'fairs.horchataDesc',
  },
  {
    id: '3',
    nameKey: 'fairs.ruzafa',
    nameEs: 'Mercadito de Ruzafa',
    emoji: '🎪',
    location: 'Barrio de Ruzafa',
    dates: '1-19',
    typeKey: 'fairs.type.souvenirs',
    descKey: 'fairs.ruzafaDesc',
  },
  {
    id: '4',
    nameKey: 'fairs.pyro',
    nameEs: 'Feria de Pirotecnia',
    emoji: '🧨',
    location: 'C/ San Vicente',
    dates: '1-19',
    typeKey: 'fairs.type.pyro',
    descKey: 'fairs.pyroDesc',
  },
  {
    id: '5',
    nameKey: 'fairs.attractions',
    nameEs: 'Feria de Atracciones',
    emoji: '🎡',
    location: 'Avenida de Francia',
    dates: '1 MAR - 1 APR',
    typeKey: 'fairs.type.entertainment',
    descKey: 'fairs.attractionsDesc',
  },
];

export default function GuideFairsScreen() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: t('fairs.filter.all') },
    { key: 'food', label: t('fairs.filter.food') },
    { key: 'books', label: t('fairs.filter.books') },
    { key: 'souvenirs', label: t('fairs.filter.souvenirs') },
  ];

  const getFilterKey = (typeKey: string) => {
    const map: Record<string, string> = {
      'fairs.type.books': 'books',
      'fairs.type.food': 'food',
      'fairs.type.souvenirs': 'souvenirs',
      'fairs.type.pyro': 'souvenirs',
      'fairs.type.entertainment': 'all',
    };
    return map[typeKey] || 'all';
  };

  const filteredFairs = activeFilter === 'all' 
    ? FAIRS 
    : FAIRS.filter(f => getFilterKey(f.typeKey) === activeFilter);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <TouchableOpacity 
            key={filter.key} 
            style={[styles.filterChip, activeFilter === filter.key && styles.filterChipActive]}
            onPress={() => setActiveFilter(filter.key)}
          >
            <Text style={[styles.filterText, activeFilter === filter.key && styles.filterTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredFairs.map((fair) => (
        <View key={fair.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>{fair.emoji}</Text>
            <View style={styles.cardTitles}>
              <Text style={styles.cardName}>{t(fair.nameKey)}</Text>
              <Text style={styles.cardNameEs}>{fair.nameEs}</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{t(fair.typeKey)}</Text>
            </View>
          </View>
          
          <Text style={styles.cardDesc}>{t(fair.descKey)}</Text>
          
          <View style={styles.cardMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{fair.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📅</Text>
              <Text style={styles.metaText}>{fair.dates} {t('common.march')}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>{t('fairs.showOnMap')}</Text>
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
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipActive: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  filterText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardEmoji: {
    fontSize: 36,
    marginRight: 12,
  },
  cardTitles: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  cardNameEs: {
    fontSize: 13,
    color: '#FF9800',
  },
  typeBadge: {
    backgroundColor: '#FF980015',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 11,
    color: '#FF9800',
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
  },
  mapButton: {
    backgroundColor: '#FF980010',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#FF9800',
    fontWeight: '600',
    fontSize: 14,
  },
});
