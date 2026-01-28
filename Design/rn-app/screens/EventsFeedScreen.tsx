import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

export default function EventsFeedScreen() {
  const [countdown, setCountdown] = useState('02:45:30');

  useEffect(() => {
    const interval = setInterval(() => {
      const [h, m, s] = countdown.split(':').map(Number);
      let newS = s - 1;
      let newM = m;
      let newH = h;

      if (newS < 0) {
        newS = 59;
        newM -= 1;
      }
      if (newM < 0) {
        newM = 59;
        newH -= 1;
      }

      setCountdown(
        `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}:${String(newS).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const events = [
    { time: '16:00', title: 'Ofrenda de Flores', emoji: '🌺', location: 'Plaza de la Virgen' },
    { time: '18:30', title: 'Cabalgata del Fuego', emoji: '🔥', location: 'Calle Colón' },
    { time: '22:00', title: 'Castell de Foc', emoji: '🎆', location: 'Jardín del Turia' },
    { time: '01:00', title: 'La Cremà', emoji: '🔥', location: 'Citywide' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Fallas 2025</Text>
          <View style={styles.liveBadge}>
            <MaterialIcons name="local-fire-department" size={14} color="#fff" />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>March 15-19, 2025</Text>
      </View>

      {/* Today Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.heroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1708848462812-8645bf6f264e?w=800' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          />
          <BlurView intensity={30} tint="dark" style={styles.heroContent}>
            <View style={styles.heroHeader}>
              <Text style={styles.heroEmoji}>💥</Text>
              <Text style={styles.heroTitle}>Mascletà</Text>
            </View>
            <View style={styles.heroInfo}>
              <MaterialIcons name="access-time" size={16} color="rgba(255,255,255,0.9)" />
              <Text style={styles.heroInfoText}>14:00 - Plaza del Ayuntamiento</Text>
            </View>
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownLabel}>Starts in</Text>
              <Text style={styles.countdownTime}>{countdown}</Text>
            </View>
          </BlurView>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.section}>
        <View style={styles.timeline}>
          {events.map((event, index) => (
            <Animated.View
              key={index}
              entering={FadeInLeft.delay(index * 100)}
              style={styles.timelineItem}
            >
              {/* Connecting line */}
              {index < events.length - 1 && <View style={styles.timelineLine} />}
              
              {/* Dot with emoji */}
              <View style={styles.timelineDot}>
                <Text style={styles.timelineEmoji}>{event.emoji}</Text>
              </View>

              {/* Event card */}
              <BlurView intensity={80} tint="light" style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </BlurView>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Bottom padding for tab bar */}
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
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.flameRed,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    gap: 4,
  },
  liveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: SPACING.md,
    color: '#1a1a1a',
  },
  heroCard: {
    height: 200,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  heroContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  heroEmoji: {
    fontSize: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  heroInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  heroInfoText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countdownLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  countdownTime: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.gold,
    fontVariant: ['tabular-nums'],
  },
  timeline: {
    position: 'relative',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 19,
    top: 40,
    width: 2,
    height: '100%',
    backgroundColor: `${COLORS.primary}30`,
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    zIndex: 1,
  },
  timelineEmoji: {
    fontSize: 20,
  },
  eventCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: `${COLORS.primary}20`,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  eventTime: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
  eventLocation: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
});
