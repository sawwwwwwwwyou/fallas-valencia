import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  interpolateColor,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

interface TabIconProps {
  emoji: string;
  focused: boolean;
  color: string;
}

export function AnimatedTabIcon({ emoji, focused, color }: TabIconProps) {
  const scale = useSharedValue(focused ? 1.15 : 1);
  const translateY = useSharedValue(focused ? -2 : 0);

  useEffect(() => {
    if (focused) {
      // Bounce animation when selected
      scale.value = withSequence(
        withSpring(1.3, { damping: 8, stiffness: 300 }),
        withSpring(1.15, { damping: 10, stiffness: 200 })
      );
      translateY.value = withSpring(-4, { damping: 15, stiffness: 150 });
    } else {
      scale.value = withSpring(1, { damping: 15 });
      translateY.value = withSpring(0, { damping: 15 });
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.Text style={[styles.tabIcon, { color }, animatedStyle]}>
      {emoji}
    </Animated.Text>
  );
}

interface CustomTabBarProps extends BottomTabBarProps {
  activeColor?: string;
  inactiveColor?: string;
}

export function CustomTabBar({ 
  state, 
  descriptors, 
  navigation,
  activeColor = '#FF6B35',
  inactiveColor = '#999',
}: CustomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        
        const icon = options.tabBarIcon?.({ 
          focused: isFocused, 
          color: isFocused ? activeColor : inactiveColor,
          size: 24 
        });

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <AnimatedTabButton
            key={route.key}
            label={typeof label === 'string' ? label : route.name}
            icon={icon}
            isFocused={isFocused}
            onPress={onPress}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
          />
        );
      })}
    </View>
  );
}

interface AnimatedTabButtonProps {
  label: string;
  icon: React.ReactNode;
  isFocused: boolean;
  onPress: () => void;
  activeColor: string;
  inactiveColor: string;
}

function AnimatedTabButton({
  label,
  icon,
  isFocused,
  onPress,
  activeColor,
  inactiveColor,
}: AnimatedTabButtonProps) {
  const scale = useSharedValue(1);
  const bgOpacity = useSharedValue(isFocused ? 0.1 : 0);

  useEffect(() => {
    bgOpacity.value = withSpring(isFocused ? 0.12 : 0, { damping: 20 });
  }, [isFocused]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: `rgba(255, 107, 53, ${bgOpacity.value})`,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabButton}
    >
      <Animated.View style={[styles.tabButtonInner, containerStyle]}>
        {icon}
        <Text 
          style={[
            styles.tabLabel, 
            { color: isFocused ? activeColor : inactiveColor }
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 20, // Safe area
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabButtonInner: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
});
