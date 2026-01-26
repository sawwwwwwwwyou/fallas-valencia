import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <View
        style={{
          borderRadius: 24,
          overflow: 'hidden',
          height: 200,
          marginHorizontal: 16,
          marginBottom: 24,
        }}
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
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderTopWidth: 1,
                borderTopColor: 'rgba(255,255,255,0.2)',
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
            <BlurView intensity={40} tint="dark" style={{ padding: 20 }}>
              <HeroContent
                title={title}
                event={event}
                formattedTime={formattedTime}
                countdown={countdown}
              />
            </BlurView>
          )}
        </View>
      </View>
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
          Empieza en
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

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 300, delay: index * 100 }}
      style={{
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
        paddingHorizontal: 16,
      }}
    >
      {/* Timeline dot */}
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#FF6B35',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>{event.event_type?.icon || '📅'}</Text>
      </View>

      {/* Card */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: 'rgba(255,107,53,0.2)',
        }}
      >
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
              color: '#2d2d2d',
              flex: 1,
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text style={{ fontSize: 12, color: 'rgba(45,45,45,0.6)' }}>
            {formattedTime}
          </Text>
        </View>
        
        <Text style={{ fontSize: 14, color: 'rgba(45,45,45,0.6)' }}>
          {event.location || 'Valencia'}
        </Text>
      </View>
    </MotiView>
  );
}

export function EventsFeed({ events, onEventPress, language = 'es' }: EventsFeedProps) {
  if (events.length === 0) {
    return null;
  }

  const [heroEvent, ...timelineEvents] = events;

  return (
    <View style={{ paddingTop: 16 }}>
      {/* Hero Card */}
      {heroEvent && (
        <HeroEventCard
          event={heroEvent}
          onPress={() => onEventPress?.(heroEvent)}
          language={language}
        />
      )}

      {/* Timeline section header */}
      {timelineEvents.length > 0 && (
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#2d2d2d' }}>
            Próximos eventos
          </Text>
        </View>
      )}

      {/* Timeline with vertical line */}
      <View style={{ position: 'relative' }}>
        {/* Vertical line */}
        <View
          style={{
            position: 'absolute',
            left: 36,
            top: 20,
            bottom: 20,
            width: 2,
            backgroundColor: 'rgba(255,107,53,0.3)',
          }}
        />

        {/* Timeline events */}
        {timelineEvents.slice(0, 5).map((event, index) => (
          <TimelineEvent
            key={event.id}
            event={event}
            index={index}
            onPress={() => onEventPress?.(event)}
            language={language}
          />
        ))}
      </View>
    </View>
  );
}

export default EventsFeed;
