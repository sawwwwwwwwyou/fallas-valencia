import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  RefreshControl,
  Pressable,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MotiView } from 'moti';
import { RootStackParamList } from '../App';
import { Event as EventType, EventWithDetails } from '../types/database';
import { getEvents } from '../lib/supabase';
import {
  AnimatedCard,
  AnimatedScreen,
  FireRefreshIndicator,
  SkeletonList,
  EventsFeed,
} from '../components';
import { CalendarIcon, ClockIcon, LocationIcon } from '../components/icons';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../lib/theme';
import { useLanguage } from '../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Event type colors
const EVENT_TYPE_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  'mascletà': { bg: '#FFEBEE', text: '#C62828', icon: '💥' },
  'castillo': { bg: '#FFF3E0', text: '#E65100', icon: '🎆' },
  'despertà': { bg: '#E3F2FD', text: '#1565C0', icon: '🎺' },
  'ofrenda': { bg: '#E8F5E9', text: '#2E7D32', icon: '💐' },
  'cremà': { bg: '#FCE4EC', text: '#AD1457', icon: '🔥' },
  'pasacalle': { bg: '#F3E5F5', text: '#7B1FA2', icon: '🎭' },
  'concierto': { bg: '#E0F7FA', text: '#00838F', icon: '🎵' },
  'default': { bg: colors.background.ash, text: colors.text.secondary, icon: '📅' },
};

function getEventTypeStyle(typeName?: string) {
  if (!typeName) return EVENT_TYPE_COLORS.default;
  const key = typeName.toLowerCase();
  return EVENT_TYPE_COLORS[key] || EVENT_TYPE_COLORS.default;
}

// Format time as "HH:MM"
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

// Get section title based on date
function getDateSection(dateString: string, t: (key: string) => string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return t('events.today');
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return t('events.tomorrow');
  } else {
    // Check if within this week
    const weekEnd = new Date(todayOnly);
    weekEnd.setDate(weekEnd.getDate() + 7);
    if (dateOnly <= weekEnd) {
      return t('events.thisWeek');
    }
    // Format as date
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }
}

// Group events by date section
function groupEventsByDate(events: EventWithDetails[], t: (key: string) => string) {
  const sections: { title: string; data: EventWithDetails[] }[] = [];
  const sectionMap = new Map<string, EventWithDetails[]>();

  events.forEach(event => {
    const section = getDateSection(event.start_time, t);
    if (!sectionMap.has(section)) {
      sectionMap.set(section, []);
    }
    sectionMap.get(section)!.push(event);
  });

  sectionMap.forEach((data, title) => {
    sections.push({ title, data });
  });

  return sections;
}

// Event Type Badge Component
function EventTypeBadge({ typeName, icon }: { typeName?: string; icon?: string }) {
  const { t } = useLanguage();
  const style = getEventTypeStyle(typeName);

  return (
    <View style={[styles.typeBadge, { backgroundColor: style.bg }]}>
      <Text style={styles.typeBadgeIcon}>{icon || style.icon}</Text>
      <Text style={[styles.typeBadgeText, { color: style.text }]}>
        {typeName?.toUpperCase() || t('common.event')}
      </Text>
    </View>
  );
}

// Event Card Component
function EventCard({
  event,
  index,
  onPress,
  language,
}: {
  event: EventWithDetails;
  index: number;
  onPress: () => void;
  language: string;
}) {
  const typeStyle = getEventTypeStyle(event.event_type?.name_es);
  const title = language === 'en' && event.title_en ? event.title_en : event.title_es;
  const typeName = language === 'en' && event.event_type?.name_en
    ? event.event_type.name_en
    : event.event_type?.name_es;

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 200 }}
    >
      <AnimatedCard
        style={styles.card}
        onPress={onPress}
        variant="standard"
      >
        {/* Time column */}
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>{formatTime(event.start_time)}</Text>
          {event.end_time && (
            <Text style={styles.endTimeText}>— {formatTime(event.end_time)}</Text>
          )}
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <EventTypeBadge
            typeName={typeName}
            icon={event.event_type?.icon}
          />

          <Text style={styles.cardTitle} numberOfLines={2}>
            {title}
          </Text>

          {/* Location */}
          {event.location && (
            <View style={styles.locationRow}>
              <LocationIcon size={14} color={colors.text.tertiary} />
              <Text style={styles.locationText} numberOfLines={1}>
                {event.location}
              </Text>
            </View>
          )}

          {/* Falla link */}
          {event.falla && (
            <View style={styles.fallaRow}>
              <Text style={styles.fallaLabel}>Falla:</Text>
              <Text style={styles.fallaName} numberOfLines={1}>
                {event.falla.name}
              </Text>
            </View>
          )}
        </View>

        {/* Indicator */}
        <View style={[styles.indicator, { backgroundColor: typeStyle.text }]} />
      </AnimatedCard>
    </MotiView>
  );
}

// Section Header Component
function SectionHeader({ title }: { title: string }) {
  const isToday = title.includes('Hoy') || title.includes('Today');

  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionDot, isToday && styles.sectionDotActive]} />
      <Text style={[styles.sectionTitle, isToday && styles.sectionTitleActive]}>
        {title}
      </Text>
      {isToday && <View style={styles.sectionLine} />}
    </View>
  );
}

// Helper to create fixed time for today
function getTodayAt(hours: number, minutes: number = 0): string {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

// Mock events for demo when no real events exist
// Times match the design EXACTLY: Mascletà (hero) + 4 timeline events
const MOCK_EVENTS: EventWithDetails[] = [
  // Hero event - Mascletà
  {
    id: 'mock-1',
    title_es: 'Mascletà',
    title_en: 'Mascletà',
    start_time: getTodayAt(14, 0), // 14:00 - Plaza del Ayuntamiento
    end_time: null,
    location: 'Plaza del Ayuntamiento',
    description_es: 'Espectáculo de fuegos artificiales diurno',
    event_type: { id: '1', name_es: 'Mascletà', name_en: 'Mascletà', icon: '💥' },
    falla: null,
  },
  // Timeline event 1 - matches design
  {
    id: 'mock-2',
    title_es: 'Ofrenda de Flores',
    title_en: 'Flower Offering',
    start_time: getTodayAt(16, 0), // 16:00 - Plaza de la Virgen
    end_time: null,
    location: 'Plaza de la Virgen',
    description_es: 'Ofrenda floral a la Virgen de los Desamparados',
    event_type: { id: '2', name_es: 'Ofrenda', name_en: 'Offering', icon: '🌺' },
    falla: null,
  },
  // Timeline event 2 - matches design
  {
    id: 'mock-3',
    title_es: 'Cabalgata del Fuego',
    title_en: 'Fire Parade',
    start_time: getTodayAt(18, 30), // 18:30 - Calle Colón
    end_time: null,
    location: 'Calle Colón',
    description_es: 'Desfile de carrozas con pirotecnia',
    event_type: { id: '3', name_es: 'Cabalgata', name_en: 'Parade', icon: '🔥' },
    falla: null,
  },
  // Timeline event 3 - matches design
  {
    id: 'mock-4',
    title_es: 'Castell de Foc',
    title_en: 'Fireworks Castle',
    start_time: getTodayAt(22, 0), // 22:00 - Jardín del Turia
    end_time: null,
    location: 'Jardín del Turia',
    description_es: 'Espectáculo de fuegos artificiales nocturno',
    event_type: { id: '4', name_es: 'Castillo', name_en: 'Fireworks', icon: '🎆' },
    falla: null,
  },
  // Timeline event 4 - matches design (La Cremà at 01:00)
  {
    id: 'mock-5',
    title_es: 'La Cremà',
    title_en: 'The Burning',
    start_time: getTodayAt(25, 0), // 01:00 next day (25 = 1am tomorrow)
    end_time: null,
    location: 'Citywide',
    description_es: 'La quema de las fallas - el momento culminante',
    event_type: { id: '5', name_es: 'Cremà', name_en: 'Burning', icon: '🔥' },
    falla: null,
  },
  // Additional events for scrollable demo
  {
    id: 'mock-6',
    title_es: 'Despertà',
    title_en: 'Wake-up Call',
    start_time: getTodayAt(32, 0), // 08:00 next day
    end_time: null,
    location: 'Barrio del Carmen',
    description_es: 'Despertador tradicional con petardos por las calles',
    event_type: { id: '6', name_es: 'Despertà', name_en: 'Wake-up', icon: '🎺' },
    falla: null,
  },
  {
    id: 'mock-7',
    title_es: 'Pasacalle Infantil',
    title_en: 'Children\'s Parade',
    start_time: getTodayAt(34, 0), // 10:00 next day
    end_time: null,
    location: 'Centro Histórico',
    description_es: 'Desfile de las comisiones infantiles',
    event_type: { id: '7', name_es: 'Pasacalle', name_en: 'Parade', icon: '🎭' },
    falla: null,
  },
  {
    id: 'mock-8',
    title_es: 'Concierto de Bandas',
    title_en: 'Band Concert',
    start_time: getTodayAt(36, 0), // 12:00 next day
    end_time: null,
    location: 'Plaza de la Virgen',
    description_es: 'Concierto de música tradicional valenciana',
    event_type: { id: '8', name_es: 'Concierto', name_en: 'Concert', icon: '🎵' },
    falla: null,
  },
  {
    id: 'mock-9',
    title_es: 'Visita a Monumentos',
    title_en: 'Monument Tours',
    start_time: getTodayAt(38, 0), // 14:00 next day
    end_time: null,
    location: 'Toda la ciudad',
    description_es: 'Recorrido guiado por las fallas más destacadas',
    event_type: { id: '9', name_es: 'Visita', name_en: 'Tour', icon: '🗿' },
    falla: null,
  },
] as EventWithDetails[];

// Empty State Component
function EmptyState({ t }: { t: (key: string) => string }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📅</Text>
      <Text style={styles.emptyTitle}>{t('events.noEvents')}</Text>
      <Text style={styles.emptySubtitle}>{t('events.checkLater')}</Text>
    </View>
  );
}

export default function EventsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<EventWithDetails[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setError(null);
      const data = await getEvents();
      // Filter only future events and sort by start_time
      const now = new Date();
      const futureEvents = (data as EventWithDetails[])
        .filter(e => new Date(e.start_time) >= now ||
          new Date(e.start_time).toDateString() === now.toDateString())
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
      setEvents(futureEvents);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  }, [loadEvents]);

  // Group events by date
  const sections = useMemo(() => {
    return groupEventsByDate(events, t);
  }, [events, t]);

  const handleEventPress = useCallback((event: EventWithDetails) => {
    // If event has a falla, navigate to falla detail
    if (event.falla) {
      navigation.navigate('FallaDetail', {
        falla: {
          id: event.falla.id,
          name: event.falla.name,
          category: event.falla.category?.name_es || '',
          address: event.falla.address || '',
          description: event.falla.description_es || '',
        }
      });
    }
    // TODO: Add EventDetail screen for non-falla events
  }, [navigation]);

  if (loading) {
    return (
      <AnimatedScreen style={styles.container}>
        <SkeletonList count={6} />
      </AnimatedScreen>
    );
  }

  // If we have events for today, show the new EventsFeed design
  const todayEvents = events.filter(e => {
    const eventDate = new Date(e.start_time).toDateString();
    const today = new Date().toDateString();
    return eventDate === today;
  });

  // Use mock data for demo when no real events
  const displayEvents = todayEvents.length > 0 ? todayEvents : MOCK_EVENTS;

  // Always show EventsFeed with header (like original design)
  return (
    <AnimatedScreen style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.orange}
            colors={[colors.primary.orange]}
          />
        }
      >
        <EventsFeed
          events={displayEvents}
          onEventPress={handleEventPress}
          language={language}
          showHeader={true}
        />
      </ScrollView>
    </AnimatedScreen>
  );

  // Fallback to sections view (kept for reference)
  /*
  return (
    <AnimatedScreen style={styles.container}>
      {sections.length === 0 ? (
        <EmptyState t={t} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <EventCard 
              event={item} 
              index={index}
              onPress={() => handleEventPress(item)}
              language={language}
            />
          )}
          renderSectionHeader={({ section }) => (
            <SectionHeader title={section.title} />
          )}
          contentContainerStyle={[styles.list, { paddingBottom: 100 }]}
          stickySectionHeadersEnabled={false}
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
      )}
    </AnimatedScreen>
  );
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  list: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.tertiary,
    marginRight: spacing.sm,
  },
  sectionDotActive: {
    backgroundColor: colors.primary.flame,
  },
  sectionTitle: {
    fontSize: typography.sizes.h4,
    fontWeight: typography.weights.bold,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
  sectionTitleActive: {
    color: colors.primary.flame,
  },
  sectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.primary.flame,
    marginLeft: spacing.sm,
    opacity: 0.3,
  },
  // Event Card
  card: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    overflow: 'hidden',
    ...shadows.card,
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: spacing.xs,
  },
  timeText: {
    fontSize: typography.sizes.h4,
    fontWeight: typography.weights.bold,
    color: colors.primary.navy,
  },
  endTimeText: {
    fontSize: typography.sizes.small,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
    gap: 4,
  },
  typeBadgeIcon: {
    fontSize: 12,
  },
  typeBadgeText: {
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  locationText: {
    fontSize: typography.sizes.caption,
    color: colors.text.tertiary,
    flex: 1,
  },
  fallaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  fallaLabel: {
    fontSize: typography.sizes.caption,
    color: colors.text.tertiary,
  },
  fallaName: {
    fontSize: typography.sizes.caption,
    color: colors.primary.orange,
    fontWeight: typography.weights.medium,
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
  },
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
