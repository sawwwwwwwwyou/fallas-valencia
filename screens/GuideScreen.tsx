import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { RootStackParamList } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  colors, 
  typography, 
  spacing, 
  borderRadius,
  shadows,
} from '../lib/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SIZE = (SCREEN_WIDTH - spacing.md * 3) / 2;

interface GuideCategory {
  id: string;
  titleKey: string;
  subtitleKey: string;
  emoji: string;
  gradient: [string, string];
  screen: keyof RootStackParamList;
}

// Updated to match design with gradients and emojis
const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'fireworks',
    titleKey: 'guide.fireworks',
    subtitleKey: 'Fireworks Guide',
    emoji: '🎆',
    gradient: ['#E63946', '#FF6B35'],
    screen: 'GuideFireworks',
  },
  {
    id: 'transport',
    titleKey: 'guide.transport',
    subtitleKey: 'Getting Around',
    emoji: '🚇',
    gradient: ['#10B981', '#34D399'],
    screen: 'GuideTransport',
  },
  {
    id: 'exhibitions',
    titleKey: 'guide.exhibitions',
    subtitleKey: 'Art & Culture',
    emoji: '🎨',
    gradient: ['#3B82F6', '#60A5FA'],
    screen: 'GuideExhibitions',
  },
  {
    id: 'fairs',
    titleKey: 'guide.fairs',
    subtitleKey: 'Local Fairs',
    emoji: '🎪',
    gradient: ['#FF6B35', '#FFB800'],
    screen: 'GuideFairs',
  },
  {
    id: 'nightlife',
    titleKey: 'guide.nightlife',
    subtitleKey: 'Night Fun',
    emoji: '🌙',
    gradient: ['#8B5CF6', '#A78BFA'],
    screen: 'GuideNightlife',
  },
  {
    id: 'bullfighting',
    titleKey: 'guide.bullfighting',
    subtitleKey: 'Tradition',
    emoji: '🐂',
    gradient: ['#1E3A5F', '#3B5998'],
    screen: 'GuideBullfighting',
  },
  {
    id: 'glossary',
    titleKey: 'guide.glossary',
    subtitleKey: 'Terms & Words',
    emoji: '📖',
    gradient: ['#EC4899', '#F472B6'],
    screen: 'GuideGlossary',
  },
  {
    id: 'history',
    titleKey: 'guide.history',
    subtitleKey: 'Fallas Origins',
    emoji: '🔥',
    gradient: ['#F59E0B', '#FBBF24'],
    screen: 'GuideGlossary', // Reuse glossary for now
  },
];

// Shine animation component
function ShineOverlay({ delay = 0 }: { delay?: number }) {
  const translateX = useSharedValue(-CARD_SIZE);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withRepeat(
        withTiming(CARD_SIZE * 2, { duration: 3000 }),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.shineOverlay, animatedStyle]}>
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.shineGradient}
      />
    </Animated.View>
  );
}

// Guide Card Component
function GuideCard({ 
  category, 
  index, 
  onPress 
}: { 
  category: GuideCategory; 
  index: number;
  onPress: () => void;
}) {
  const { t } = useLanguage();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 300, delay: index * 50 }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={styles.cardWrapper}
      >
        <View style={styles.card}>
          {/* Gradient Background */}
          <LinearGradient
            colors={category.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          />
          
          {/* Glass overlay */}
          <View style={styles.glassOverlay} />
          
          {/* Dot pattern (simplified) */}
          <View style={styles.patternOverlay}>
            {[...Array(6)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    top: 10 + (i % 3) * 30,
                    left: 10 + Math.floor(i / 3) * 30,
                  },
                ]}
              />
            ))}
          </View>

          {/* Content */}
          <View style={styles.cardContent}>
            {/* Emoji + Icon circle */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{category.emoji}</Text>
              <View style={styles.iconCircle}>
                <Text style={styles.iconCircleText}>→</Text>
              </View>
            </View>

            {/* Text */}
            <View style={styles.cardFooter}>
              <Text style={styles.cardTitle}>{t(category.titleKey)}</Text>
              <Text style={styles.cardSubtitle}>{category.subtitleKey}</Text>
            </View>
          </View>

          {/* Shine effect */}
          <ShineOverlay delay={index * 500 + 2000} />
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

// Featured Card Component
function FeaturedCard() {
  const { language } = useLanguage();
  
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20 }}
      style={styles.featuredWrapper}
    >
      <TouchableOpacity activeOpacity={0.9}>
        <View style={styles.featuredCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800',
            }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
            style={styles.featuredGradient}
          />
          
          {/* Glassmorphism content */}
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>
              {language === 'es' ? 'Sabores de Valencia' : 'Taste of Valencia'}
            </Text>
            <Text style={styles.featuredSubtitle}>
              {language === 'es' 
                ? 'Descubre la gastronomía tradicional' 
                : 'Discover traditional Valencian dishes'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

export default function GuideScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t, language } = useLanguage();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.header}>
        {language === 'es' ? 'Guía' : 'Guide'}
      </Text>
      <Text style={styles.subheader}>
        {language === 'es' 
          ? 'Todo lo que necesitas saber sobre las Fallas' 
          : 'Everything you need to know about Fallas'}
      </Text>

      {/* Featured Card */}
      <FeaturedCard />

      {/* Section Title */}
      <Text style={styles.sectionTitle}>
        {language === 'es' ? 'Temas' : 'Topics'}
      </Text>

      {/* Grid of Cards */}
      <View style={styles.grid}>
        {GUIDE_CATEGORIES.map((category, index) => (
          <GuideCard
            key={category.id}
            category={category}
            index={index}
            onPress={() => navigation.navigate(category.screen as any)}
          />
        ))}
      </View>

      {/* Bottom spacing */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subheader: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.h3,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  // Featured Card
  featuredWrapper: {
    marginBottom: spacing.lg,
  },
  featuredCard: {
    height: 160,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  featuredImage: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  // Card
  cardWrapper: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: spacing.md,
  },
  card: {
    flex: 1,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  dot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  cardContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardEmoji: {
    fontSize: 40,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardFooter: {
    marginTop: 'auto',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  // Shine
  shineOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    overflow: 'hidden',
  },
  shineGradient: {
    flex: 1,
    width: 60,
  },
});
