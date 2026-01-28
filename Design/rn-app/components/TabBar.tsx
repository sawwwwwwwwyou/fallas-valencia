import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#FF6B35',
  flameRed: '#E63946',
  gold: '#FFB800',
  warmCream: '#FFF8F0',
};

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? COLORS.primary : '#9CA3AF';
    const iconSize = 28;

    switch (routeName) {
      case 'Events':
        return <MaterialIcons name="local-fire-department" size={iconSize} color={iconColor} />;
      case 'Map':
        return <MaterialIcons name="map" size={iconSize} color={iconColor} />;
      case 'Saved':
        return <MaterialIcons name="favorite" size={iconSize} color={iconColor} />;
      case 'Guide':
        return <MaterialIcons name="menu-book" size={iconSize} color={iconColor} />;
      default:
        return <MaterialIcons name="circle" size={iconSize} color={iconColor} />;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <View style={styles.tabsContainer}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.title || route.name;
            const isFocused = state.index === index;

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
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tab}
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.iconContainer]}>
                  {getIcon(route.name, isFocused)}
                </Animated.View>
                <Animated.Text
                  style={[
                    styles.label,
                    {
                      color: isFocused ? COLORS.primary : '#9CA3AF',
                      fontWeight: isFocused ? '700' : '500',
                    },
                  ]}
                >
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  blurContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 24,
    height: 72,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
  },
});
