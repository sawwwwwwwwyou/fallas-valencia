import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { MotiView } from 'moti';

interface StaggerListProps {
  children: React.ReactNode[];
  delay?: number;
  staggerDelay?: number;
  style?: ViewStyle;
}

export function StaggerList({ 
  children, 
  delay = 0, 
  staggerDelay = 100,
  style 
}: StaggerListProps) {
  return (
    <View style={style}>
      {React.Children.map(children, (child, index) => (
        <MotiView
          key={index}
          from={{
            opacity: 0,
            translateY: 20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
            scale: 1,
          }}
          transition={{
            type: 'timing',
            duration: 400,
            delay: delay + (index * staggerDelay),
          }}
        >
          {child}
        </MotiView>
      ))}
    </View>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  index: number;
  delay?: number;
}

export function StaggerItem({ children, index, delay = 0 }: StaggerItemProps) {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: 30,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        scale: 1,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: delay + (index * 80),
      }}
    >
      {children}
    </MotiView>
  );
}
