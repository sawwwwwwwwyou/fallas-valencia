import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

const SAVED_ITEMS = [
  {
    id: 1,
    type: 'falla',
    name: 'Falla Convento Jerusalén',
    location: 'Ruzafa',
    category: 'Especial',
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    saved: true,
  },
  {
    id: 2,
    type: 'event',
    name: 'Mascletà',
    time: '14:00',
    location: 'Plaza del Ayuntamiento',
    image: 'https://images.unsplash.com/photo-1708848462812-8645bf6f264e?w=400',
    saved: true,
  },
  {
    id: 3,
    type: 'falla',
    name: 'Plaza del Ayuntamiento',
    location: 'Ciutat Vella',
    category: 'Especial',
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
    saved: true,
  },
  {
    id: 4,
    type: 'event',
    name: 'Ofrenda de Flores',
    time: '16:00',
    location: 'Plaza de la Virgen',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    saved: true,
  },
];

export default function SavedFavoritesScreen() {
  const [items, setItems] = useState(SAVED_ITEMS);
  const [filter, setFilter] = useState<'all' | 'fallas' | 'events'>('all');

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'fallas') return item.type === 'falla';
    if (filter === 'events') return item.type === 'event';
    return true;
  });

  const toggleSaved = (id: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, saved: !item.saved } : item)));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Your Plan</Text>
            <Text style={styles.subtitle}>{filteredItems.length} saved items</Text>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <MaterialIcons name="share" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Filter tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'fallas' && styles.filterTabActive]}
            onPress={() => setFilter('fallas')}
          >
            <MaterialIcons
              name="local-fire-department"
              size={16}
              color={filter === 'fallas' ? '#fff' : '#666'}
            />
            <Text style={[styles.filterText, filter === 'fallas' && styles.filterTextActive]}>Fallas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'events' && styles.filterTabActive]}
            onPress={() => setFilter('events')}
          >
            <MaterialIcons name="event" size={16} color={filter === 'events' ? '#fff' : '#666'} />
            <Text style={[styles.filterText, filter === 'events' && styles.filterTextActive]}>Events</Text>
          </TouchableOpacity>
        </View>

        {/* Items list */}
        <View style={styles.itemsList}>
          {filteredItems.map((item) => (
            <BlurView key={item.id} intensity={80} tint="light" style={styles.itemCard}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.gold, COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.itemTopGradient}
              />
              
              <View style={styles.itemContent}>
                {/* Image */}
                <Image source={{ uri: item.image }} style={styles.itemImage} />

                {/* Info */}
                <View style={styles.itemInfo}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity onPress={() => toggleSaved(item.id)}>
                      <MaterialIcons
                        name={item.saved ? 'favorite' : 'favorite-border'}
                        size={24}
                        color={item.saved ? COLORS.flameRed : '#ccc'}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.itemMeta}>
                    {item.type === 'falla' && item.category && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.category}</Text>
                      </View>
                    )}
                    {item.type === 'event' && item.time && (
                      <View style={styles.timeBadge}>
                        <MaterialIcons name="access-time" size={12} color="#666" />
                        <Text style={styles.timeText}>{item.time}</Text>
                      </View>
                    )}
                    <MaterialIcons name="place" size={12} color="#666" />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>

                  <View style={styles.itemActions}>
                    <TouchableOpacity style={styles.primaryButton}>
                      <MaterialIcons name="directions" size={16} color="#fff" />
                      <Text style={styles.primaryButtonText}>Navigate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BlurView>
          ))}
        </View>

        {/* Bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.warmCream,
  },
  contentContainer: {
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 4,
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255,107,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterTabActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  itemsList: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  itemCard: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  itemTopGradient: {
    height: 3,
    opacity: 0.8,
  },
  itemContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
    gap: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B8860B',
    textTransform: 'uppercase',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  locationText: {
    fontSize: 11,
    color: '#666',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryButton: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
  },
});
