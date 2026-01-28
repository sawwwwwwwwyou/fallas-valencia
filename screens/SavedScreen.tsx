import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
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
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { getFavorites, removeFavorite } from '../lib/supabase';
import { RootStackParamList, Falla } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LocationIcon, StarIcon, FlameIcon, CheckIcon } from '../components/icons';
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

interface SavedFalla {
  id: string;
  falla: Falla;
  visited: boolean;
  burnt: boolean;
}

// Mock data matching the design
const MOCK_SAVED_FALLAS: SavedFalla[] = [
  {
    id: '1',
    falla: {
      id: 'f1',
      name: 'Falla Plaza del Ayuntamiento',
      category: 'Sección Especial',
      address: 'Centro',
      description: '',
    },
    visited: true,
    burnt: true,
  },
  {
    id: '2',
    falla: {
      id: 'f2',
      name: 'Falla Convento Jerusalén',
      category: 'Sección Especial',
      address: 'Ruzafa',
      description: '',
    },
    visited: false,
    burnt: false,
  },
];

// Progress Card Component
function ProgressCard({ visited, total }: { visited: number; total: number }) {
  const progress = (visited / total) * 100;
  
  return (
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <View style={styles.progressFlame}>
            <FlameIcon size={24} color="#FF6B35" />
          </View>
        </View>
        <View style={styles.progressNumbers}>
          <Text style={styles.progressCount}>{visited}</Text>
          <Text style={styles.progressTotal}>/{total}</Text>
          <Text style={styles.progressText}>Fallas Visited</Text>
        </View>
        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
          <View style={[styles.progressDot, { left: `${Math.max(progress - 2, 0)}%` }]} />
        </View>
      </View>
    </MotiView>
  );
}

// Saved Falla Card Component
function SavedFallaCard({ 
  item, 
  index,
  onPress,
  onToggleVisited,
  language,
}: { 
  item: SavedFalla; 
  index: number;
  onPress: () => void;
  onToggleVisited: () => void;
  language: string;
}) {
  const isSpecial = item.falla.category === 'Sección Especial';
  
  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 300, delay: index * 100 }}
    >
      <TouchableOpacity 
        style={styles.fallaCard}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {/* Image with overlay */}
        <View style={styles.fallaImageContainer}>
          <Image
            source={{
              uri: index === 0 
                ? 'https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?w=300'
                : 'https://images.unsplash.com/photo-1760121002397-70751ea3c113?w=300'
            }}
            style={styles.fallaImage}
            resizeMode="cover"
          />
          {/* Checkmark overlay for visited */}
          {item.visited && (
            <View style={styles.visitedOverlay}>
              <CheckIcon size={24} color="#fff" />
            </View>
          )}
          {/* Burnt badge */}
          {item.burnt && (
            <View style={styles.burntBadge}>
              <Text style={styles.burntBadgeText}>BURNT</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.fallaContent}>
          <View style={styles.fallaHeader}>
            <Text style={styles.fallaTitle} numberOfLines={2}>
              {item.falla.name}
            </Text>
            {isSpecial && (
              <StarIcon size={18} color="#FFB800" filled />
            )}
          </View>
          
          <View style={styles.fallaLocation}>
            <LocationIcon size={12} color={colors.text.tertiary} />
            <Text style={styles.fallaAddress}>{item.falla.address}</Text>
          </View>
          
          <Text style={styles.fallaCategory}>{item.falla.category}</Text>

          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              item.visited ? styles.actionButtonVisited : styles.actionButtonMark,
            ]}
            onPress={onToggleVisited}
            activeOpacity={0.8}
          >
            {item.visited ? (
              <>
                <CheckIcon size={16} color="#fff" />
                <Text style={styles.actionButtonTextVisited}>Visited</Text>
              </>
            ) : (
              <Text style={styles.actionButtonTextMark}>Mark as Visited</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

// Header Component
function SavedHeader() {
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  
  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.headerTitle}>
        {language === 'es' ? 'Guardado' : 'Saved'}
      </Text>
      <Text style={styles.headerSubtitle}>
        {language === 'es' 
          ? 'Tu experiencia personal del festival' 
          : 'Your personal festival journey'}
      </Text>
    </View>
  );
}

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const { language } = useLanguage();
  
  const [savedFallas, setSavedFallas] = useState<SavedFalla[]>(MOCK_SAVED_FALLAS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const visitedCount = savedFallas.filter(f => f.visited).length;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleToggleVisited = (id: string) => {
    setSavedFallas(prev => 
      prev.map(f => 
        f.id === id ? { ...f, visited: !f.visited } : f
      )
    );
  };

  const handleFallaPress = (falla: Falla) => {
    navigation.navigate('FallaDetail', { falla });
  };

  if (loading) {
    return (
      <AnimatedScreen style={styles.container}>
        <SavedHeader />
        <SkeletonList count={3} />
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.orange}
            colors={[colors.primary.orange]}
          />
        }
      >
        {/* Header */}
        <SavedHeader />

        {/* Progress Card */}
        <View style={styles.section}>
          <ProgressCard visited={visitedCount} total={50} />
        </View>

        {/* Saved Fallas Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'es' ? 'Fallas Guardadas' : 'Saved Fallas'}
          </Text>
          
          {savedFallas.map((item, index) => (
            <SavedFallaCard
              key={item.id}
              item={item}
              index={index}
              onPress={() => handleFallaPress(item.falla)}
              onToggleVisited={() => handleToggleVisited(item.id)}
              language={language}
            />
          ))}
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  // Header
  header: {
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  headerSubtitle: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
  },
  // Section
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.h4,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  // Progress Card
  progressCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.card,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: typography.sizes.caption,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  progressFlame: {
    opacity: 0.8,
  },
  progressNumbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  progressCount: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text.primary,
  },
  progressTotal: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.text.tertiary,
  },
  progressText: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background.ash,
    borderRadius: 4,
    position: 'relative',
    overflow: 'visible',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary.flame,
    borderRadius: 4,
  },
  progressDot: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary.flame,
    borderWidth: 3,
    borderColor: colors.background.white,
  },
  // Falla Card
  fallaCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.card,
  },
  fallaImageContainer: {
    width: 100,
    height: 140,
    position: 'relative',
  },
  fallaImage: {
    width: '100%',
    height: '100%',
  },
  visitedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 185, 129, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  burntBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.primary.flame,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  burntBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  fallaContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  fallaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  fallaTitle: {
    flex: 1,
    fontSize: typography.sizes.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  fallaLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.xs,
  },
  fallaAddress: {
    fontSize: typography.sizes.caption,
    color: colors.text.tertiary,
  },
  fallaCategory: {
    fontSize: typography.sizes.small,
    color: colors.primary.orange,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  // Action Buttons
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.pill,
    gap: 6,
  },
  actionButtonVisited: {
    backgroundColor: '#10B981',
  },
  actionButtonMark: {
    backgroundColor: colors.primary.orange,
  },
  actionButtonTextVisited: {
    color: '#fff',
    fontSize: typography.sizes.caption,
    fontWeight: '600',
  },
  actionButtonTextMark: {
    color: '#fff',
    fontSize: typography.sizes.caption,
    fontWeight: '600',
  },
});
