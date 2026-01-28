import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, shadows, typography, spacing, components } from '../lib/theme';
import { ListIcon, MapIcon, FavoritesIcon, GuideIcon, EventsIcon } from './icons';

interface TabIconProps {
  emoji?: string;
  icon?: 'list' | 'map' | 'favorites' | 'guide' | 'events';
  focused: boolean;
  color: string;
}

export function AnimatedTabIcon({ emoji, icon, focused, color }: TabIconProps) {
  const scale = useSharedValue(focused ? 1.1 : 1);
  const translateY = useSharedValue(focused ? -2 : 0);

  useEffect(() => {
    if (focused) {
      scale.value = withTiming(1.15, { duration: 300 });
      translateY.value = withTiming(-4, { duration: 300 });
    } else {
      scale.value = withTiming(1, { duration: 250 });
      translateY.value = withTiming(0, { duration: 250 });
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  // Render SVG icon if specified
  const renderIcon = () => {
    const iconColor = focused ? colors.primary.orange : colors.text.tertiary;
    switch (icon) {
      case 'list':
        return <ListIcon size={28} color={iconColor} focused={focused} />;
      case 'map':
        return <MapIcon size={28} color={iconColor} focused={focused} />;
      case 'favorites':
        return <FavoritesIcon size={28} color={iconColor} focused={focused} />;
      case 'guide':
        return <GuideIcon size={28} color={iconColor} focused={focused} />;
      case 'events':
        return <EventsIcon size={28} color={iconColor} focused={focused} />;
      default:
        // Fallback to emoji if no icon specified
        return <Text style={[styles.tabIcon, { color }]}>{emoji}</Text>;
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      {renderIcon()}
    </Animated.View>
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
  activeColor = colors.primary.orange,
  inactiveColor = colors.text.tertiary,
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
          size: components.tabBar.iconSize
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
  const bgOpacity = useSharedValue(isFocused ? 0.12 : 0);

  useEffect(() => {
    bgOpacity.value = withTiming(isFocused ? 0.12 : 0, { duration: 200 });
  }, [isFocused]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: `rgba(255, 107, 53, ${bgOpacity.value})`,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
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
        {/* Active indicator dot */}
        {isFocused && <View style={styles.activeIndicator} />}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: `rgba(29, 53, 87, 0.08)`, // Subtle navy border
    paddingBottom: 24, // Safe area
    paddingTop: spacing.sm,
    // Frosted glass shadow
    ...shadows.tabBar,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabButtonInner: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  tabIcon: {
    fontSize: components.tabBar.iconSize,
  },
  tabLabel: {
    fontSize: components.tabBar.labelSize,
    marginTop: spacing.xs,
    fontWeight: typography.weights.semibold,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary.orange,
  },
});
