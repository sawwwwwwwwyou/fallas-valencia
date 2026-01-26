import React from 'react';
import { ViewStyle, StyleSheet, View, Text } from 'react-native';
import { MotiView } from 'moti';

interface PulseViewProps {
  children?: React.ReactNode;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export function PulseView({ 
  children, 
  size = 12, 
  color = '#FF4444',
  style 
}: PulseViewProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Pulsing ring */}
      <MotiView
        from={{
          opacity: 0.6,
          scale: 1,
        }}
        animate={{
          opacity: 0,
          scale: 2,
        }}
        transition={{
          type: 'timing',
          duration: 1500,
          loop: true,
        }}
        style={[
          styles.pulse,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      />
      {/* Static dot */}
      <View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      />
      {children}
    </View>
  );
}

interface LiveBadgeProps {
  style?: ViewStyle;
}

export function LiveBadge({ style }: LiveBadgeProps) {
  return (
    <View style={[styles.badge, style]}>
      <PulseView size={8} color="#FF4444" />
      <Text style={styles.liveText}>LIVE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
  },
  dot: {},
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  liveText: {
    color: '#FF4444',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
