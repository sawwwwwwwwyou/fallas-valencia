import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  index?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AnimatedCard({ children, onPress, style, index = 0 }: AnimatedCardProps) {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scale.value, { damping: 15, stiffness: 150 }) },
        { 
          translateY: interpolate(
            pressed.value,
            [0, 1],
            [0, -2]
          )
        },
      ],
      shadowOpacity: interpolate(pressed.value, [0, 1], [0.1, 0.2]),
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

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.card, style, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});
