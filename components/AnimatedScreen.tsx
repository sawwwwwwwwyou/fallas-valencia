import React from 'react';
import { ViewStyle } from 'react-native';
import { MotiView } from 'moti';

interface AnimatedScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function AnimatedScreen({ children, style }: AnimatedScreenProps) {
  return (
    <MotiView
      from={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: 'timing',
        duration: 300,
      }}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </MotiView>
  );
}

export function SlideInScreen({ children, style }: AnimatedScreenProps) {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateX: 50,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
      }}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </MotiView>
  );
}

export function ScaleInScreen({ children, style }: AnimatedScreenProps) {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 100,
      }}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </MotiView>
  );
}
