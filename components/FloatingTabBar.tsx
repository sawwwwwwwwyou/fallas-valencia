import React from 'react';
import { View, Pressable, Text, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { EventsIcon, MapIcon, FavoritesIcon, GuideIcon } from './icons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FloatingTabBarProps extends BottomTabBarProps {}

export function FloatingTabBar({ state, descriptors, navigation }: FloatingTabBarProps) {
  const tabs = [
    { icon: EventsIcon, label: 'Eventos' },
    { icon: MapIcon, label: 'Mapa' },
    { icon: FavoritesIcon, label: 'Guardado' },
    { icon: GuideIcon, label: 'Guía' },
  ];

  return (
    <View className="absolute bottom-4 left-4 right-4 z-50">
      {Platform.OS === 'web' ? (
        // Web with CSS backdrop-filter for glassmorphism
        <View
          className="rounded-[28px] p-2 border border-white/40"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            // @ts-ignore - web-only CSS property
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
          }}
        >
          <TabButtons
            state={state}
            descriptors={descriptors}
            navigation={navigation}
            tabs={tabs}
          />
        </View>
      ) : (
        // Native - BlurView
        <BlurView
          intensity={80}
          tint="light"
          className="rounded-[28px] overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <View className="p-2 border border-white/40 bg-white/30">
            <TabButtons
              state={state}
              descriptors={descriptors}
              navigation={navigation}
              tabs={tabs}
            />
          </View>
        </BlurView>
      )}
    </View>
  );
}

interface TabButtonsProps extends BottomTabBarProps {
  tabs: Array<{ icon: any; label: string }>;
}

function TabButtons({ state, navigation, tabs }: TabButtonsProps) {
  return (
    <View className="flex-row items-center justify-around">
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const { icon: Icon, label } = tabs[index];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            key={route.key}
            icon={Icon}
            label={label}
            isActive={isActive}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

interface TabButtonProps {
  icon: any;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function TabButton({ icon: Icon, label, isActive, onPress }: TabButtonProps) {
  const scale = useSharedValue(1);
  const bgOpacity = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    bgOpacity.value = withTiming(isActive ? 1 : 0, { duration: 150 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bgAnimatedStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
    >
      <View
        style={{
          position: 'relative',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 20,
          overflow: 'hidden',
          minWidth: 60,
        }}
      >
        {/* Active gradient background */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 20,
              overflow: 'hidden',
            },
            bgAnimatedStyle,
          ]}
        >
          <LinearGradient
            colors={['#FF6B35', '#E63946']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </Animated.View>

        {/* Icon and Label */}
        <View style={{ position: 'relative', zIndex: 10, alignItems: 'center' }}>
          <Icon
            size={24}
            color={isActive ? '#FFFFFF' : 'rgba(45, 45, 45, 0.6)'}
            focused={isActive}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: '500',
              marginTop: 2,
              color: isActive ? '#FFFFFF' : 'rgba(45, 45, 45, 0.6)',
            }}
          >
            {label}
          </Text>
        </View>

        {/* Fire particles disabled - too small to see, wastes CPU */}
        {/* {isActive && <FireParticles />} */}
      </View>
    </AnimatedPressable>
  );
}

function FireParticles() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <MotiView
          key={i}
          from={{
            translateX: 0,
            translateY: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            translateX: (Math.random() - 0.5) * 20,
            translateY: -30,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            type: 'timing',
            duration: 1000,
            loop: true,
            delay: i * 300,
          }}
          className="absolute top-0 w-1 h-1 bg-gold rounded-full"
        />
      ))}
    </>
  );
}

export default FloatingTabBar;
