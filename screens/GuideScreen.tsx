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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface GuideCategory {
  id: string;
  titleKey: string;
  subtitleKey: string;
  emoji: string;
  color: string;
  screen: keyof RootStackParamList;
}

const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'fireworks',
    titleKey: 'guide.fireworks',
    subtitleKey: 'header.fireworks',
    emoji: '🧨',
    color: '#FF4444',
    screen: 'GuideFireworks',
  },
  {
    id: 'transport',
    titleKey: 'guide.transport',
    subtitleKey: 'header.transport',
    emoji: '🚌',
    color: '#4CAF50',
    screen: 'GuideTransport',
  },
  {
    id: 'exhibitions',
    titleKey: 'guide.exhibitions',
    subtitleKey: 'header.exhibitions',
    emoji: '🎨',
    color: '#9C27B0',
    screen: 'GuideExhibitions',
  },
  {
    id: 'fairs',
    titleKey: 'guide.fairs',
    subtitleKey: 'header.fairs',
    emoji: '🎪',
    color: '#FF9800',
    screen: 'GuideFairs',
  },
  {
    id: 'nightlife',
    titleKey: 'guide.nightlife',
    subtitleKey: 'header.nightlife',
    emoji: '💃',
    color: '#E91E63',
    screen: 'GuideNightlife',
  },
  {
    id: 'bullfighting',
    titleKey: 'guide.bullfighting',
    subtitleKey: 'header.bullfighting',
    emoji: '🐂',
    color: '#795548',
    screen: 'GuideBullfighting',
  },
  {
    id: 'glossary',
    titleKey: 'guide.glossary',
    subtitleKey: 'header.glossary',
    emoji: '📚',
    color: '#2196F3',
    screen: 'GuideGlossary',
  },
];

export default function GuideScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t, language } = useLanguage();

  const renderCategory = (category: GuideCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryCard, { backgroundColor: category.color + '15' }]}
      onPress={() => navigation.navigate(category.screen as any)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color + '25' }]}>
        <Text style={styles.emoji}>{category.emoji}</Text>
      </View>
      <Text style={styles.categoryTitle}>{t(category.titleKey)}</Text>
      <Text style={styles.categorySubtitle}>
        {language === 'en' ? t(category.subtitleKey) : t(category.titleKey)}
      </Text>
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
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
