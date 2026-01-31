import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Platform, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { ClockIcon, FlameIcon } from './icons';
import { EventWithDetails } from '../types/database';

interface EventsFeedProps {
  events: EventWithDetails[];
  onEventPress?: (event: EventWithDetails) => void;
  language?: string;
  showHeader?: boolean;
}

// Hero Event Card with countdown
function HeroEventCard({
  event,
  onPress,
  language = 'es',
}: {
  event: EventWithDetails;
  onPress?: () => void;
  language?: string;
}) {
  const [countdown, setCountdown] = useState('--:--:--');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const eventTime = new Date(event.start_time);
      const diff = eventTime.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('¡Ahora!');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.start_time]);

  const title = language === 'en' && event.title_en ? event.title_en : event.title_es;
  const eventTime = new Date(event.start_time);
  const formattedTime = eventTime.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Pulse animation for live badge
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 300 }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          borderRadius: 24,
          overflow: 'hidden',
          height: 192, // h-48 in design = 12rem = 192px
          marginHorizontal: 24, // px-6 in design
          marginBottom: 24,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        {/* Background Image */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1708848462812-8645bf6f264e?w=800',
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 24, // Explicit radius for image
          }}
          resizeMode="cover"
        />

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Live Badge */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 16,
              right: 16,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E63946',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 20,
              gap: 4,
            },
            pulseStyle,
          ]}
        >
          <FlameIcon size={12} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
            Live
          </Text>
        </Animated.View>

        {/* Content with glassmorphism */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {Platform.OS === 'web' ? (
            <View
              style={{
                padding: 20,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderTopWidth: 1,
                borderTopColor: 'rgba(255,255,255,0.2)',
                borderBottomLeftRadius: 24, // Match parent radius
                borderBottomRightRadius: 24,
                // @ts-ignore - web-only CSS property
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <HeroContent
                title={title}
                event={event}
                formattedTime={formattedTime}
                countdown={countdown}
              />
            </View>
          ) : (
            <BlurView
              intensity={40}
              tint="dark"
              style={{
                padding: 20,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                overflow: 'hidden',
              }}
            >
              <HeroContent
                title={title}
                event={event}
                formattedTime={formattedTime}
                countdown={countdown}
              />
            </BlurView>
          )}
        </View>
      </Pressable>
    </MotiView>
  );
}

function HeroContent({
  title,
  event,
  formattedTime,
  countdown,
}: {
  title: string;
  event: EventWithDetails;
  formattedTime: string;
  countdown: string;
}) {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
        <Text style={{ fontSize: 24 }}>{event.event_type?.icon || '💥'}</Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#fff',
            fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
          }}
        >
          {title}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
        <ClockIcon size={16} color="rgba(255,255,255,0.9)" />
        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
          {formattedTime} - {event.location || 'Valencia'}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
          Starts in
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#FFB800',
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
          }}
        >
          {countdown}
        </Text>
      </View>
    </>
  );
}

// Event type color mapping
const EVENT_DOT_COLORS: Record<string, string> = {
  'ofrenda': '#E8F5E9', // Light green for flowers
  'mascletà': '#FFEBEE', // Light red for explosions
  'cremà': '#FCE4EC', // Light pink for burning
  'castillo': '#FFF3E0', // Light orange for fireworks
  'cabalgata': '#FFF3E0', // Light orange for parades
  'despertà': '#E3F2FD', // Light blue for morning wake-up
  'pasacalle': '#F3E5F5', // Light purple for parades
  'concierto': '#E0F7FA', // Light cyan for concerts
  'default': '#FF6B35', // Orange fallback
};

function getEventDotColor(typeName?: string): string {
  if (!typeName) return EVENT_DOT_COLORS.default;
  const key = typeName.toLowerCase();
  return EVENT_DOT_COLORS[key] || EVENT_DOT_COLORS.default;
}

// Timeline Event Item
function TimelineEvent({
  event,
  index,
  onPress,
  language = 'es',
}: {
  event: EventWithDetails;
  index: number;
  onPress?: () => void;
  language?: string;
}) {
  const title = language === 'en' && event.title_en ? event.title_en : event.title_es;
  const eventTime = new Date(event.start_time);
  const formattedTime = eventTime.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Get color based on event type
  const dotColor = getEventDotColor(event.event_type?.name_es);
  const isCancelled = event.is_cancelled;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 200 }}
        style={{
          flexDirection: 'row',
          gap: 16,
          marginBottom: 24,
          // paddingHorizontal moved to parent container for proper line alignment
        }}
      >
        {/* Timeline dot - colored by event type */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: isCancelled ? '#E0E0E0' : dotColor,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderWidth: 2,
            borderColor: isCancelled ? '#BDBDBD' : 'rgba(255,107,53,0.3)',
          }}
        >
          <Text style={{ fontSize: 18, opacity: isCancelled ? 0.5 : 1 }}>
            {event.event_type?.icon || '📅'}
          </Text>
        </View>

        {/* Card with subtle gradient */}
        <LinearGradient
          colors={isCancelled 
            ? ['rgba(240,240,240,0.98)', 'rgba(230,230,230,0.95)']
            : ['rgba(255,255,255,0.98)', 'rgba(255,248,240,0.95)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            flex: 1,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: isCancelled ? '#E0E0E0' : 'rgba(255,107,53,0.2)',
          }}
        >
          {/* Cancelled badge */}
          {isCancelled && (
            <View
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: '#C62828',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff' }}>
                CANCELADO
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: isCancelled ? '#9E9E9E' : '#2d2d2d',
                flex: 1,
                textDecorationLine: isCancelled ? 'line-through' : 'none',
              }}
              numberOfLines={2}
            >
              {title}
            </Text>
            <Text 
              style={{ 
                fontSize: 12, 
                color: isCancelled ? '#BDBDBD' : 'rgba(45,45,45,0.6)',
                marginLeft: isCancelled ? 0 : 8,
              }}
            >
              {formattedTime}
            </Text>
          </View>

          <Text 
            style={{ 
              fontSize: 14, 
              color: isCancelled ? '#BDBDBD' : 'rgba(45,45,45,0.6)',
              textDecorationLine: isCancelled ? 'line-through' : 'none',
            }}
          >
            {event.location || 'Valencia'}
          </Text>

          {/* Pirotecnia info */}
          {event.pirotecnia && !isCancelled && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                gap: 4,
              }}
            >
              <Text style={{ fontSize: 14 }}>🎆</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#E65100',
                  fontWeight: '500',
                }}
              >
                {event.pirotecnia}
              </Text>
            </View>
          )}
        </LinearGradient>
      </MotiView>
    </Pressable>
  );
}

// Header Component matching original design
function FeedHeader() {
  const insets = useSafeAreaInsets();
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.05, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: insets.top + 16, paddingBottom: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text
          style={{
            fontSize: 36,
            fontWeight: '400',
            color: '#2d2d2d',
            fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
          }}
        >
          Fallas 2025
        </Text>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E63946',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 20,
              gap: 4,
            },
            pulseStyle,
          ]}
        >
          <FlameIcon size={12} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
            Live
          </Text>
        </Animated.View>
      </View>
      <Text style={{ fontSize: 14, color: 'rgba(45,45,45,0.6)' }}>
        March 15-19, 2025
      </Text>
    </View>
  );
}

export function EventsFeed({ events, onEventPress, language = 'es', showHeader = true }: EventsFeedProps) {
  if (events.length === 0) {
    return null;
  }

  const [heroEvent, ...timelineEvents] = events;

  return (
    <View>
      {/* Header like original design */}
      {showHeader && <FeedHeader />}

      {/* Today section label */}
      <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#2d2d2d' }}>
          Today
        </Text>
      </View>

      {/* Hero Card */}
      {heroEvent && (
        <HeroEventCard
          event={heroEvent}
          onPress={() => onEventPress?.(heroEvent)}
          language={language}
        />
      )}

      {/* Timeline with vertical line */}
      {timelineEvents.length > 0 && (
        <View style={{ position: 'relative', paddingHorizontal: 24 }}>
          {/* Vertical line - centered on dots (dot 40px, center at 20px, line width 2px) */}
          <View
            style={{
              position: 'absolute',
              left: 24 + 19, // padding + (dot_width/2 - line_width/2) = 24 + 19 = 43
              top: 20,
              bottom: 20,
              width: 2,
              backgroundColor: 'rgba(255,107,53,0.3)',
            }}
          />

          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              onPress={() => onEventPress?.(event)}
              language={language}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default EventsFeed;
