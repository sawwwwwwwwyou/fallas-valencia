import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

interface GuideCategory {
  id: string;
  titleKey: string;
  subtitleKey: string;
  emoji: string;
  color: string;
  bgColor: string;
  screen: keyof RootStackParamList;
}

// Updated colors to match Fallas design system
const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'fireworks',
    titleKey: 'guide.fireworks',
    subtitleKey: 'header.fireworks',
    emoji: '🧨',
    color: colors.primary.flame,
    bgColor: '#FFEBEB',
    screen: 'GuideFireworks',
  },
  {
    id: 'transport',
    titleKey: 'guide.transport',
    subtitleKey: 'header.transport',
    emoji: '🚌',
    color: colors.semantic.success,
    bgColor: '#E6F7F5',
    screen: 'GuideTransport',
  },
  {
    id: 'exhibitions',
    titleKey: 'guide.exhibitions',
    subtitleKey: 'header.exhibitions',
    emoji: '🎨',
    color: colors.secondary.ceramic,
    bgColor: '#E8F4FA',
    screen: 'GuideExhibitions',
  },
  {
    id: 'fairs',
    titleKey: 'guide.fairs',
    subtitleKey: 'header.fairs',
    emoji: '🎪',
    color: colors.primary.orange,
    bgColor: '#FFF0EB',
    screen: 'GuideFairs',
  },
  {
    id: 'nightlife',
    titleKey: 'guide.nightlife',
    subtitleKey: 'header.nightlife',
    emoji: '💃',
    color: colors.secondary.coral,
    bgColor: '#FFF5F0',
    screen: 'GuideNightlife',
  },
  {
    id: 'bullfighting',
    titleKey: 'guide.bullfighting',
    subtitleKey: 'header.bullfighting',
    emoji: '🐂',
    color: colors.primary.navy,
    bgColor: '#F0F2F5',
    screen: 'GuideBullfighting',
  },
  {
    id: 'glossary',
    titleKey: 'guide.glossary',
    subtitleKey: 'header.glossary',
    emoji: '📚',
    color: colors.secondary.ceramic,
    bgColor: '#E8F4FA',
    screen: 'GuideGlossary',
  },
];

export default function GuideScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t, language } = useLanguage();

  const renderCategory = (category: GuideCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryCard, { backgroundColor: category.bgColor }]}
      onPress={() => navigation.navigate(category.screen as any)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
        <Text style={styles.emoji}>{category.emoji}</Text>
      </View>
      <Text style={styles.categoryTitle}>{t(category.titleKey)}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>{t('guide.title')}</Text>
      <Text style={styles.subheader}>{t('guide.subtitle')}</Text>
      
      <View style={styles.grid}>
        {GUIDE_CATEGORIES.map(renderCategory)}
      </View>
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
    fontSize: typography.sizes.h2,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subheader: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.card,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emoji: {
    fontSize: 32,
  },
  categoryTitle: {
    fontSize: typography.sizes.h4,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
