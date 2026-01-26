import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors, shadows, borderRadius, timing } from '../lib/theme';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  index?: number;
  variant?: 'standard' | 'hero' | 'compact';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AnimatedCard({ 
  children, 
  onPress, 
  style, 
  index = 0,
  variant = 'standard' 
}: AnimatedCardProps) {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(
      pressed.value,
      [0, 1],
      [variant === 'hero' ? 0.15 : 0.08, variant === 'hero' ? 0.2 : 0.12]
    );
    
    return {
      transform: [
        { scale: withSpring(scale.value, { 
          damping: timing.spring.damping, 
          stiffness: timing.spring.stiffness 
        }) },
        { 
          translateY: interpolate(
            pressed.value,
            [0, 1],
            [0, -2]
          )
        },
      ],
      shadowOpacity,
    };
  });

  const handlePressIn = () => {
    scale.value = 0.97;
    pressed.value = withSpring(1, { damping: 20 });
  };

  const handlePressOut = () => {
    scale.value = 1;
    pressed.value = withSpring(0, { damping: 20 });
  };

  const variantShadow = variant === 'hero' ? shadows.cardHero : shadows.card;
  const variantRadius = variant === 'hero' 
    ? borderRadius.xl 
    : variant === 'compact' 
      ? borderRadius.md 
      : borderRadius.lg;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card, 
        { borderRadius: variantRadius },
        variantShadow,
        style, 
        animatedStyle
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.white,
  },
});
