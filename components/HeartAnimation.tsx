import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface HeartButtonProps {
  initialFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
  size?: number;
  style?: ViewStyle;
}

export function HeartButton({ 
  initialFavorite = false, 
  onToggle,
  size = 24,
  style 
}: HeartButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const handlePress = () => {
    const newState = !isFavorite;
    
    if (newState) {
      // Favorite animation - bounce with rotation
      scale.value = withSequence(
        withSpring(1.4, { damping: 8, stiffness: 300 }),
        withSpring(0.9, { damping: 8, stiffness: 300 }),
        withSpring(1, { damping: 8, stiffness: 200 })
      );
      rotation.value = withSequence(
        withTiming(-15, { duration: 100 }),
        withTiming(15, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
    } else {
      // Unfavorite - simple scale down
      scale.value = withSequence(
        withTiming(0.8, { duration: 100 }),
        withSpring(1, { damping: 15 })
      );
    }

    setIsFavorite(newState);
    onToggle?.(newState);
  };

  return (
    <Pressable onPress={handlePress} style={style}>
      <Animated.Text 
        style={[
          styles.heart, 
          { fontSize: size },
          animatedStyle
        ]}
      >
        {isFavorite ? '❤️' : '🤍'}
      </Animated.Text>
    </Pressable>
  );
}

interface FavoriteStarProps {
  initialFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
  size?: number;
  style?: ViewStyle;
}

export function FavoriteStar({ 
  initialFavorite = false, 
  onToggle,
  size = 24,
  style 
}: FavoriteStarProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const handlePress = () => {
    const newState = !isFavorite;
    
    if (newState) {
      scale.value = withSequence(
        withSpring(1.5, { damping: 6, stiffness: 400 }),
        withSpring(1, { damping: 10 })
      );
      rotation.value = withSequence(
        withTiming(360, { duration: 400 }),
        withTiming(0, { duration: 0 })
      );
    } else {
      scale.value = withSequence(
        withTiming(0.7, { duration: 100 }),
        withSpring(1, { damping: 15 })
      );
    }

    setIsFavorite(newState);
    onToggle?.(newState);
  };

  return (
    <Pressable onPress={handlePress} style={style}>
      <Animated.Text 
        style={[
          styles.heart, 
          { fontSize: size },
          animatedStyle
        ]}
      >
        {isFavorite ? '⭐' : '☆'}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heart: {
    textAlign: 'center',
  },
});
