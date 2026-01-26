import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MotiView } from 'moti';
import { RootStackParamList, Falla } from '../App';
import { 
  AnimatedCard, 
  AnimatedScreen, 
  HeartButton,
  LiveBadge,
  FireRefreshIndicator,
  SkeletonList,
} from '../components';
import { 
  colors, 
  getCategoryColor, 
  typography, 
  spacing, 
  borderRadius,
  shadows,
} from '../lib/theme';

// Category icons for visual distinction
const CATEGORY_ICONS: Record<string, string> = {
  'Sección Especial': '🏆',
  'Primera A': '🥇',
  'Primera B': '🥈',
  'Segunda A': '🥉',
  'Segunda B': '🎖️',
  'Tercera A': '🎗️',
  'Tercera B': '🎀',
  'Lacas': '🏅',
};

// Category sort order (Lacas must be last!)
const CATEGORY_ORDER: Record<string, number> = {
  'Sección Especial': 1,
  'Primera A': 2,
  'Primera B': 3,
  'Segunda A': 4,
  'Segunda B': 5,
  'Tercera A': 6,
  'Tercera B': 7,
  'Lacas': 999, // Always last
};

const getCategoryIcon = (category: string): string => {
  return CATEGORY_ICONS[category] || '🔥';
};

const sortByCategory = (a: Falla, b: Falla): number => {
  const orderA = CATEGORY_ORDER[a.category] ?? 100;
  const orderB = CATEGORY_ORDER[b.category] ?? 100;
  return orderA - orderB;
};

const FALLAS_DATA: Falla[] = [
  {
    id: '1',
    name: 'Falla Plaza del Ayuntamiento',
    category: 'Sección Especial',
    address: 'Plaza del Ayuntamiento, Valencia',
    description: 'La falla principal de Valencia, ubicada en la plaza más emblemática de la ciudad. Cada año presenta monumentos espectaculares con crítica social y artística.',
  },
  {
    id: '2',
    name: 'Falla Na Jordana',
    category: 'Sección Especial',
    address: 'C/ Na Jordana, Valencia',
    description: 'Una de las fallas más antiguas y tradicionales. Famosa por su creatividad y sus ninots de alta calidad artística.',
  },
  {
    id: '3',
    name: 'Falla Convento Jerusalén',
    category: 'Sección Especial',
    address: 'C/ Convento Jerusalén - Matemático Marzal',
    description: 'Conocida por sus monumentos innovadores y su uso de nuevas tecnologías en el arte fallero.',
  },
  {
    id: '4',
    name: 'Falla Exposición',
    category: 'Primera A',
    address: 'C/ Exposición, Valencia',
    description: 'Falla del barrio de la Exposición, con una larga tradición y participación vecinal activa.',
  },
  {
    id: '5',
    name: 'Falla Cuba-Literato Azorín',
    category: 'Primera A',
    address: 'C/ Cuba - Literato Azorín',
    description: 'Destaca por sus diseños originales y su fuerte identidad de barrio.',
  },
  {
    id: '6',
    name: 'Falla Sueca-Literato Azorín',
    category: 'Sección Especial',
    address: 'C/ Sueca - Literato Azorín',
    description: 'Una de las fallas más premiadas de Valencia, con monumentos que destacan por su perfección técnica.',
  },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Category Badge Component
function CategoryBadge({ category }: { category: string }) {
  const catColor = getCategoryColor(category);
  
  return (
    <View style={[styles.categoryBadge, { backgroundColor: catColor.background }]}>
      <Text style={[styles.categoryBadgeText, { color: catColor.text }]}>
        {category.toUpperCase()}
      </Text>
    </View>
  );
}

export default function ListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderFalla = ({ item, index }: { item: Falla; index: number }) => {
    const catColor = getCategoryColor(item.category);
    const isEspecial = item.category === 'Sección Especial';
    
    return (
      <MotiView
        from={{
          opacity: 0,
          translateY: 20,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          scale: 1,
        }}
        transition={{
          type: 'timing',
          duration: 300,
          delay: index * 50,
        }}
      >
        <AnimatedCard 
          style={styles.card}
          onPress={() => navigation.navigate('FallaDetail', { falla: item })}
          variant={isEspecial ? 'hero' : 'standard'}
        >
          <View style={[
            styles.cardImage, 
            { backgroundColor: catColor.background }
          ]}>
            <Text style={styles.cardEmoji}>{getCategoryIcon(item.category)}</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <CategoryBadge category={item.category} />
              {item.id === '1' && <LiveBadge style={styles.liveBadge} />}
            </View>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.cardAddress} numberOfLines={1}>{item.address}</Text>
            {/* Distance indicator (placeholder) */}
            <View style={styles.metaRow}>
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceIcon}>🔥</Text>
                <Text style={styles.distanceText}>324m</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardActions}>
            <HeartButton 
              initialFavorite={favorites.has(item.id)}
              onToggle={() => toggleFavorite(item.id)}
              size={22}
            />
            <Text style={styles.chevron}>›</Text>
          </View>
        </AnimatedCard>
      </MotiView>
    );
  };

  if (loading) {
    return (
      <AnimatedScreen style={styles.container}>
        <SkeletonList count={6} />
      </AnimatedScreen>
    );
  }

  // Sort fallas by category (Lacas always last)
  const sortedFallas = [...FALLAS_DATA].sort(sortByCategory);

  return (
    <AnimatedScreen style={styles.container}>
      <FlatList
        data={sortedFallas}
        renderItem={renderFalla}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.orange}
            colors={[colors.primary.orange]}
          />
        }
        ListHeaderComponent={
          refreshing ? <FireRefreshIndicator refreshing={refreshing} /> : null
        }
      />
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream, // Warm cream, not gray!
  },
  list: {
    padding: spacing.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.card,
  },
  cardImage: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 32,
  },
  cardContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryBadgeText: {
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.5,
  },
  liveBadge: {
    marginLeft: spacing.sm,
  },
  cardTitle: {
    fontSize: typography.sizes.h4,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  cardAddress: {
    fontSize: typography.sizes.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `rgba(255, 107, 53, 0.1)`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  distanceIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  distanceText: {
    fontSize: typography.sizes.small,
    color: colors.primary.orange,
    fontWeight: typography.weights.semibold,
  },
  cardActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  chevron: {
    fontSize: 24,
    color: colors.text.tertiary,
  },
});
