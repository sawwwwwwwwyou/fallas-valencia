import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 3) / 2;

const GUIDE_TOPICS = [
  {
    id: 1,
    title: 'History',
    subtitle: 'Origins & Evolution',
    icon: 'history-edu',
    gradient: [COLORS.primary, COLORS.flameRed],
    emoji: '📜',
  },
  {
    id: 2,
    title: 'La Cremà',
    subtitle: 'The Grand Finale',
    icon: 'local-fire-department',
    gradient: [COLORS.flameRed, '#FF4500'],
    emoji: '🔥',
  },
  {
    id: 3,
    title: 'Mascletà',
    subtitle: 'Firework Shows',
    icon: 'celebration',
    gradient: [COLORS.gold, '#FFD700'],
    emoji: '💥',
  },
  {
    id: 4,
    title: 'Traditional Food',
    subtitle: 'Gastronomy Guide',
    icon: 'restaurant',
    gradient: [COLORS.primary, COLORS.gold],
    emoji: '🥘',
  },
  {
    id: 5,
    title: 'Fallero Artists',
    subtitle: 'Meet the Creators',
    icon: 'palette',
    gradient: ['#9333EA', '#C084FC'],
    emoji: '🎨',
  },
  {
    id: 6,
    title: 'Music & Dance',
    subtitle: 'Traditional Performances',
    icon: 'music-note',
    gradient: ['#EC4899', '#F472B6'],
    emoji: '🎵',
  },
];

const QUICK_TIPS = [
  {
    icon: 'lightbulb',
    title: 'Best viewing spots',
    description: 'Top locations to experience the festivities',
  },
  {
    icon: 'schedule',
    title: 'Avoid the crowds',
    description: 'Timing tips for a better experience',
  },
  {
    icon: 'photo-camera',
    title: 'Photo opportunities',
    description: 'Most Instagrammable moments',
  },
];

export default function GuideScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Cultural Guide</Text>
          <Text style={styles.subtitle}>Learn about Las Fallas</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <MaterialIcons name="search" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Featured banner */}
      <BlurView intensity={80} tint="light" style={styles.featuredBanner}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.flameRed]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredContent}>
            <Text style={styles.featuredEmoji}>🎊</Text>
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredTitle}>Welcome to Fallas!</Text>
              <Text style={styles.featuredSubtitle}>Your complete guide to Valencia's biggest festival</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#fff" />
          </View>
        </LinearGradient>
      </BlurView>

      {/* Topics grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Topics</Text>
        <View style={styles.topicsGrid}>
          {GUIDE_TOPICS.map((topic) => (
            <TouchableOpacity key={topic.id} activeOpacity={0.8}>
              <BlurView intensity={80} tint="light" style={styles.topicCard}>
                <LinearGradient
                  colors={topic.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.topicGradient}
                >
                  <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                </LinearGradient>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
                </View>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Tips</Text>
        {QUICK_TIPS.map((tip, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8}>
            <BlurView intensity={80} tint="light" style={styles.tipCard}>
              <View style={styles.tipIconContainer}>
                <MaterialIcons name={tip.icon as any} size={24} color={COLORS.primary} />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </BlurView>
          </TouchableOpacity>
        ))}
      </View>

      {/* Glossary section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Terms</Text>
        <BlurView intensity={80} tint="light" style={styles.glossaryCard}>
          {[
            { term: 'Falla', definition: 'Satirical monument made of wood and papier-mâché' },
            { term: 'Fallero/Fallera', definition: 'Person who participates in the festival' },
            { term: 'Ninot', definition: 'Individual figure that makes up a Falla' },
          ].map((item, index, arr) => (
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
        </BlurView>
      </View>

      {/* Bottom padding */}
      <View style={{ height: 100 }} />
    </ScrollView>
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
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255,107,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredBanner: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  featuredGradient: {
    padding: SPACING.md,
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
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: SPACING.md,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topicCard: {
    width: CARD_WIDTH,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
    marginBottom: 0,
  },
  topicGradient: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicEmoji: {
    fontSize: 36,
  },
  topicInfo: {
    padding: 12,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  topicSubtitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 12,
    overflow: 'hidden',
    gap: 12,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: 'rgba(255,107,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
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
  glossaryCard: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: SPACING.md,
    overflow: 'hidden',
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
