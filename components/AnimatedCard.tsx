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
    return {
      transform: [
        { scale: scale.value },
      ],
      opacity: interpolate(pressed.value, [0, 1], [1, 0.9]),
    };
  });

  const handlePressIn = () => {
    scale.value = 0.98;
    pressed.value = 1;
  };

  const handlePressOut = () => {
    scale.value = 1;
    pressed.value = 0;
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
