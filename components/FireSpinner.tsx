import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { MotiView } from 'moti';

interface FireSpinnerProps {
  size?: number;
  style?: ViewStyle;
}

export function FireSpinner({ size = 50, style }: FireSpinnerProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Main fire */}
      <MotiView
        from={{
          scale: 0.8,
          opacity: 0.6,
          translateY: 0,
        }}
        animate={{
          scale: 1.2,
          opacity: 1,
          translateY: -5,
        }}
        transition={{
          type: 'timing',
          duration: 500,
          loop: true,
        }}
      >
        <Text style={{ fontSize: size }}>🔥</Text>
      </MotiView>
      
      {/* Side flames */}
      <MotiView
        style={styles.leftFlame}
        from={{
          scale: 0.6,
          opacity: 0.4,
          rotate: '-15deg',
        }}
        animate={{
          scale: 0.9,
          opacity: 0.8,
          rotate: '-25deg',
        }}
        transition={{
          type: 'timing',
          duration: 400,
          loop: true,
          delay: 100,
        }}
      >
        <Text style={{ fontSize: size * 0.5 }}>🔥</Text>
      </MotiView>
      
      <MotiView
        style={styles.rightFlame}
        from={{
          scale: 0.6,
          opacity: 0.4,
          rotate: '15deg',
        }}
        animate={{
          scale: 0.9,
          opacity: 0.8,
          rotate: '25deg',
        }}
        transition={{
          type: 'timing',
          duration: 400,
          loop: true,
          delay: 200,
        }}
      >
        <Text style={{ fontSize: size * 0.5 }}>🔥</Text>
      </MotiView>
    </View>
  );
}

interface RefreshControlProps {
  refreshing: boolean;
}

export function FireRefreshIndicator({ refreshing }: RefreshControlProps) {
  if (!refreshing) return null;
  
  return (
    <View style={styles.refreshContainer}>
      <FireSpinner size={40} />
      <MotiView
        from={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ 
          type: 'timing', 
          duration: 600, 
          loop: true 
        }}
      >
        <Text style={styles.refreshText}>Cargando...</Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  leftFlame: {
    position: 'absolute',
    left: -10,
    bottom: 5,
  },
  rightFlame: {
    position: 'absolute',
    right: -10,
    bottom: 5,
  },
  refreshContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  refreshText: {
    marginTop: 8,
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
});
