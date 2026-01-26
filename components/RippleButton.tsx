import React, { useCallback } from 'react';
import { 
  Pressable, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  View,
  Text,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface RippleButtonProps {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
  rippleColor?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function RippleButton({ 
  children,
  title,
  onPress, 
  style,
  textStyle,
  color = '#FF6B35',
  rippleColor = 'rgba(255,255,255,0.3)',
}: RippleButtonProps) {
  const scale = useSharedValue(1);
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 200 });
    rippleScale.value = 0;
    rippleOpacity.value = 1;
    rippleScale.value = withTiming(4, { duration: 400 });
    rippleOpacity.value = withTiming(0, { duration: 400 });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  }, []);

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, { backgroundColor: color }, style, buttonStyle]}
    >
      <Animated.View 
        style={[
          styles.ripple, 
          { backgroundColor: rippleColor },
          rippleStyle
        ]} 
      />
      {children || (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </AnimatedPressable>
  );
}

interface IconButtonProps {
  icon: string;
  onPress?: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export function IconButton({
  icon,
  onPress,
  size = 44,
  color = '#333',
  backgroundColor = '#f0f0f0',
  style,
}: IconButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.iconButton,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
        animatedStyle,
      ]}
    >
      <Text style={{ fontSize: size * 0.5, color }}>{icon}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  ripple: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
