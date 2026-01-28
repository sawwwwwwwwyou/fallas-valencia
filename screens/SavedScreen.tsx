import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList, Falla } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LocationIcon, CheckIcon, FlameIcon, HeartIcon } from '../components/icons';
import {
  AnimatedScreen,
  SkeletonList,
} from '../components';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../lib/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Colors matching the design
const COLORS = {
  primary: '#FF6B35',
  flameRed: '#E63946',
  gold: '#FFB800',
  warmCream: '#FFF8F0',
};

type FilterType = 'all' | 'fallas' | 'events';

interface SavedItem {
  id: string;
  type: 'falla' | 'event';
  name: string;
  location: string;
  category?: string;
  time?: string;
  image: string;
  saved: boolean;
}

// Mock data matching the design
const SAVED_ITEMS: SavedItem[] = [
  {
    id: '1',
    type: 'falla',
    name: 'Falla Convento Jerusalén',
    location: 'Ruzafa',
    category: 'Especial',
    image: 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=400',
    saved: true,
  },
  {
    id: '2',
    type: 'event',
    name: 'Mascletà',
    time: '14:00',
    location: 'Plaza del Ayuntamiento',
    image: 'https://images.unsplash.com/photo-1708848462812-8645bf6f264e?w=400',
    saved: true,
  },
  {
    id: '3',
    type: 'falla',
    name: 'Plaza del Ayuntamiento',
    location: 'Ciutat Vella',
    category: 'Especial',
    image: 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=400',
    saved: true,
  },
  {
    id: '4',
    type: 'event',
    name: 'Ofrenda de Flores',
    time: '16:00',
    location: 'Plaza de la Virgen',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    saved: true,
  },
];

// Glassmorphism Card wrapper
function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.glassCardWeb, style]}>
        {children}
      </View>
    );
  }

  return (
    <BlurView intensity={80} tint="light" style={[styles.glassCard, style]}>
      {children}
    </BlurView>
  );
}

// Filter Tab Component
function FilterTab({
  label,
  icon,
  isActive,
  onPress,
}: {
  label: string;
  icon?: string;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.filterTab, isActive && styles.filterTabActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && <Text style={styles.filterIcon}>{icon}</Text>}
      <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// Progress Card Component
function ProgressCard({ visitedCount, totalCount }: { visitedCount: number; totalCount: number }) {
  const { t } = useLanguage();
  const progressPercent = (visitedCount / totalCount) * 100;

  return (
    <GlassCard style={styles.progressCard}>
      <View style={styles.progressContent}>
        <View style={styles.progressLeft}>
          <Text style={styles.progressTitle}>{t('saved.progress')}</Text>
          <View style={styles.progressCountRow}>
            <Text style={styles.progressVisited}>{visitedCount}</Text>
            <Text style={styles.progressTotal}>/{totalCount}</Text>
            <Text style={styles.progressLabel}>{t('saved.fallasVisited')}</Text>
          </View>
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
              <View style={[styles.progressDot, { left: `${progressPercent}%` }]} />
            </View>
          </View>
        </View>
        <Text style={styles.progressEmoji}>🔥</Text>
      </View>
    </GlassCard>
  );
}

// Saved Item Card Component
function SavedItemCard({
  item,
  index,
  onPress,
  onToggleSaved,
  language,
}: {
  item: SavedItem;
  index: number;
  onPress: () => void;
  onToggleSaved: () => void;
  language: string;
}) {
  const { t } = useLanguage();
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300, delay: index * 100 }}
    >
      <GlassCard style={styles.itemCard}>
        {/* Top gradient line */}
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
              <TouchableOpacity onPress={onToggleSaved}>
                <Text style={styles.heartIcon}>{item.saved ? '❤️' : '🤍'}</Text>
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
                  <Text style={styles.timeIcon}>🕐</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              )}
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>

            {/* Actions */}
            <View style={styles.itemActions}>
              <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
                <Text style={styles.primaryButtonIcon}>🧭</Text>
                <Text style={styles.primaryButtonText}>
                  {t('saved.navigate')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>
                  {t('saved.details')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </GlassCard>
    </MotiView >
  );
}

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState(SAVED_ITEMS);
  const [filter, setFilter] = useState<FilterType>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'fallas') return item.type === 'falla';
    if (filter === 'events') return item.type === 'event';
    return true;
  });

  const toggleSaved = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleItemPress = (item: SavedItem) => {
    if (item.type === 'falla') {
      navigation.navigate('FallaDetail', {
        falla: {
          id: item.id,
          name: item.name,
          category: item.category || '',
          address: item.location,
          description: '',
        },
      });
    }
  };

  return (
    <AnimatedScreen style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View>
            <Text style={styles.title}>
              {t('saved.title')}
            </Text>
            <Text style={styles.subtitle}>
              {filteredItems.length} {t('saved.subtitle')}
            </Text>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareIcon}>📤</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Card */}
        <ProgressCard visitedCount={2} totalCount={50} />

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <FilterTab
            label={t('saved.filter.all')}
            isActive={filter === 'all'}
            onPress={() => setFilter('all')}
          />
          <FilterTab
            label={t('saved.filter.fallas')}
            icon="🔥"
            isActive={filter === 'fallas'}
            onPress={() => setFilter('fallas')}
          />
          <FilterTab
            label={t('saved.filter.events')}
            icon="📅"
            isActive={filter === 'events'}
            onPress={() => setFilter('events')}
          />
        </View>

        {/* Items List */}
        <View style={styles.itemsList}>
          {filteredItems.map((item, index) => (
            <SavedItemCard
              key={item.id}
              item={item}
              index={index}
              onPress={() => handleItemPress(item)}
              onToggleSaved={() => toggleSaved(item.id)}
              language={language}
            />
          ))}
        </View>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📌</Text>
            <Text style={styles.emptyTitle}>
              {t('saved.emptyTitle')}
            </Text>
            <Text style={styles.emptySubtitle}>
              {t('saved.emptySubtitle')}
            </Text>
          </View>
        )}

        {/* Bottom Padding */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.warmCream,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
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
    borderRadius: 24,
    backgroundColor: 'rgba(255,107,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    fontSize: 20,
  },
  // Glass Card styles
  glassCard: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
  },
  glassCardWeb: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      },
    }),
  },
  // Filter Tabs
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
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
  filterIcon: {
    fontSize: 14,
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
  // Items List
  itemsList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  itemCard: {
    marginBottom: spacing.md,
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
    borderRadius: borderRadius.md,
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
  heartIcon: {
    fontSize: 20,
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
  timeIcon: {
    fontSize: 12,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  locationIcon: {
    fontSize: 12,
  },
  locationText: {
    fontSize: 11,
    color: '#666',
  },
  // Actions
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
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },
  primaryButtonIcon: {
    fontSize: 14,
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryButton: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
  },
  // Progress Card
  progressCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLeft: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 4,
  },
  progressCountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  progressVisited: {
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressTotal: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.4)',
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)',
    marginLeft: 8,
  },
  progressBarContainer: {
    width: '100%',
    paddingRight: 40,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    position: 'relative',
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressDot: {
    position: 'absolute',
    top: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.flameRed,
    marginLeft: -7,
  },
  progressEmoji: {
    fontSize: 48,
  },
});
