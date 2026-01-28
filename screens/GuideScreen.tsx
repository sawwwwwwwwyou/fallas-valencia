import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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

// Colors matching the design
const COLORS = {
  primary: '#FF6B35',
  flameRed: '#E63946',
  warmCream: '#FFF8F0',
  gold: '#FFB800',
};

interface GuideCategory {
  id: string;
  titleKey: string;
  subtitleKey: string;
  emoji: string;
  gradient: [string, string];
  screen: keyof RootStackParamList;
}

// Topics matching design
const GUIDE_TOPICS: GuideCategory[] = [
  {
    id: 'history',
    titleKey: 'guide.history',
    subtitleKey: 'Origins & Evolution',
    emoji: '📜',
    gradient: [COLORS.primary, COLORS.flameRed],
    screen: 'GuideGlossary',
  },
  {
    id: 'crema',
    titleKey: 'guide.crema',
    subtitleKey: 'The Grand Finale',
    emoji: '🔥',
    gradient: [COLORS.flameRed, '#FF4500'],
    screen: 'GuideFireworks',
  },
  {
    id: 'fireworks',
    titleKey: 'guide.fireworks',
    subtitleKey: 'Firework Shows',
    emoji: '💥',
    gradient: [COLORS.gold, '#FFD700'],
    screen: 'GuideFireworks',
  },
  {
    id: 'food',
    titleKey: 'guide.food',
    subtitleKey: 'Gastronomy Guide',
    emoji: '🥘',
    gradient: [COLORS.primary, COLORS.gold],
    screen: 'GuideFairs',
  },
  {
    id: 'artists',
    titleKey: 'guide.artists',
    subtitleKey: 'Meet the Creators',
    emoji: '🎨',
    gradient: ['#9333EA', '#C084FC'],
    screen: 'GuideExhibitions',
  },
  {
    id: 'music',
    titleKey: 'guide.music',
    subtitleKey: 'Traditional Performances',
    emoji: '🎵',
    gradient: ['#EC4899', '#F472B6'],
    screen: 'GuideNightlife',
  },
];

const QUICK_TIPS = [
  {
    icon: '💡',
    titleKey: 'guide.tip1',
    descriptionKey: 'guide.tip1Desc',
  },
  {
    icon: '🕐',
    titleKey: 'guide.tip2',
    descriptionKey: 'guide.tip2Desc',
  },
  {
    icon: '📷',
    titleKey: 'guide.tip3',
    descriptionKey: 'guide.tip3Desc',
  },
];

const GLOSSARY_ITEMS = [
  { term: 'Falla', definition: 'Satirical monument made of wood and papier-mâché' },
  { term: 'Fallero/Fallera', definition: 'Person who participates in the festival' },
  { term: 'Ninot', definition: 'Individual figure that makes up a Falla' },
];

// Glassmorphism Card wrapper
function GlassCard({
  children,
  style,
  noBlur = false,
}: {
  children: React.ReactNode;
  style?: any;
  noBlur?: boolean;
}) {
  // Use BlurView on native, fallback on web
  if (Platform.OS === 'web' || noBlur) {
    return (
      <View style={[styles.glassCardWeb, noBlur && styles.noBlurCard, style]}>
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

// Topic Card Component
function TopicCard({
  topic,
  index,
  onPress
}: {
  topic: GuideCategory;
  index: number;
  onPress: () => void;
}) {
  const { t } = useLanguage();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400, delay: index * 50 }}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <GlassCard style={styles.topicCard} noBlur={Platform.OS === 'web'}>
          <View style={styles.topicContent}>
            <LinearGradient
              colors={topic.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.topicGradient}
            >
              <Text style={styles.topicEmoji}>{topic.emoji}</Text>
            </LinearGradient>
            <View style={styles.topicInfo}>
              <Text style={styles.topicTitle}>{t(topic.titleKey)}</Text>
              <Text style={styles.topicSubtitle}>{topic.subtitleKey}</Text>
            </View>
            <Text style={styles.topicArrow}>›</Text>
          </View>
        </GlassCard>
      </TouchableOpacity>
    </MotiView>
  );
}

// Tip Card Component
function TipCard({
  tip,
  index
}: {
  tip: typeof QUICK_TIPS[0];
  index: number;
}) {
  const { t } = useLanguage();

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 300, delay: index * 100 }}
    >
      <TouchableOpacity activeOpacity={0.8}>
        <GlassCard style={styles.tipCard} noBlur={Platform.OS === 'web'}>
          <View style={styles.tipIconContainer}>
            <Text style={styles.tipIcon}>{tip.icon}</Text>
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{t(tip.titleKey)}</Text>
            <Text style={styles.tipDescription}>{t(tip.descriptionKey)}</Text>
          </View>
          <Text style={styles.tipArrow}>›</Text>
        </GlassCard>
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
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            {language === 'es' ? 'Guía Cultural' : 'Cultural Guide'}
          </Text>
          <Text style={styles.subtitle}>
            {language === 'es' ? 'Aprende sobre las Fallas' : 'Learn about Las Fallas'}
          </Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Banner */}
      <MotiView
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
      >
        <GlassCard style={styles.featuredBanner}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.flameRed]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredContent}>
              <Text style={styles.featuredEmoji}>🎊</Text>
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredTitle}>
                  {language === 'es' ? '¡Bienvenido a Fallas!' : 'Welcome to Fallas!'}
                </Text>
                <Text style={styles.featuredSubtitle}>
                  {language === 'es'
                    ? 'Tu guía completa del festival más grande de Valencia'
                    : "Your complete guide to Valencia's biggest festival"}
                </Text>
              </View>
              <Text style={styles.featuredArrow}>→</Text>
            </View>
          </LinearGradient>
        </GlassCard>
      </MotiView>

      {/* Topics Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {language === 'es' ? 'Explorar Temas' : 'Explore Topics'}
        </Text>
        <View style={styles.topicsGrid}>
          {GUIDE_TOPICS.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={index}
              onPress={() => navigation.navigate(topic.screen as any)}
            />
          ))}
        </View>
      </View>

      {/* Quick Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {language === 'es' ? 'Consejos Rápidos' : 'Quick Tips'}
        </Text>
        {QUICK_TIPS.map((tip, index) => (
          <TipCard key={index} tip={tip} index={index} />
        ))}
      </View>

      {/* Glossary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {language === 'es' ? 'Términos Comunes' : 'Common Terms'}
        </Text>
        <GlassCard style={styles.glossaryCard} noBlur={Platform.OS === 'web'}>
          {GLOSSARY_ITEMS.map((item, index, arr) => (
            <View key={index}>
              <View style={styles.glossaryItem}>
                <View style={styles.glossaryDot} />
                <View style={styles.glossaryText}>
                  <Text style={styles.glossaryTerm}>{item.term}</Text>
                  <Text style={styles.glossaryDefinition}>{item.definition}</Text>
                </View>
              </View>
              {index < arr.length - 1 && <View style={styles.glossaryDivider} />}
            </View>
          ))}
        </GlassCard>
      </View>

      {/* Bottom Padding */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  contentContainer: {
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
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
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,107,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
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
  noBlurCard: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      web: {
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      },
    }),
  },
  // Featured Banner
  featuredBanner: {
    marginBottom: spacing.lg,
  },
  featuredGradient: {
    padding: spacing.md,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featuredEmoji: {
    fontSize: 32,
  },
  featuredTextContainer: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  featuredSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  featuredArrow: {
    fontSize: 24,
    color: '#fff',
  },
  // Sections
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: spacing.md,
  },
  // Topics Grid
  topicsGrid: {
    gap: 12,
  },
  topicCard: {
    width: '100%',
    marginBottom: 0,
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicGradient: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicEmoji: {
    fontSize: 32,
  },
  topicInfo: {
    flex: 1,
    padding: 16,
  },
  topicTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  topicSubtitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
  },
  topicArrow: {
    fontSize: 24,
    color: '#ccc',
    marginRight: 16,
  },
  // Tip Cards
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: 12,
    gap: 12,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(255,107,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipIcon: {
    fontSize: 24,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  tipDescription: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
  },
  tipArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  // Glossary
  glossaryCard: {
    padding: spacing.md,
  },
  glossaryItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  glossaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 6,
  },
  glossaryText: {
    flex: 1,
  },
  glossaryTerm: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  glossaryDefinition: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    lineHeight: 18,
  },
  glossaryDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 20,
  },
});
