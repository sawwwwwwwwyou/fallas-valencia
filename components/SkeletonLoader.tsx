import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MotiView } from 'moti';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  style 
}: SkeletonProps) {
  return (
    <MotiView
      from={{
        opacity: 0.5,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: 'timing',
        duration: 800,
        loop: true,
      }}
      style={[
        styles.skeleton,
        {
          width: width as any,
          height,
          borderRadius,
        },
        style,
      ]}
    />
  );
}

interface SkeletonCardProps {
  style?: ViewStyle;
}

export function SkeletonCard({ style }: SkeletonCardProps) {
  return (
    <View style={[styles.card, style]}>
      <MotiView
        from={{ opacity: 0.4 }}
        animate={{ opacity: 0.8 }}
        transition={{
          type: 'timing',
          duration: 1000,
          loop: true,
        }}
        style={styles.shimmerOverlay}
      />
      <Skeleton width={60} height={60} borderRadius={8} />
      <View style={styles.cardContent}>
        <Skeleton width={80} height={12} style={styles.mb8} />
        <Skeleton width="90%" height={16} style={styles.mb8} />
        <Skeleton width="70%" height={14} />
      </View>
    </View>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <MotiView
          key={index}
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 300,
            delay: index * 100,
          }}
        >
          <SkeletonCard />
        </MotiView>
      ))}
    </View>
  );
}

interface SkeletonGridItemProps {
  style?: ViewStyle;
}

export function SkeletonGridItem({ style }: SkeletonGridItemProps) {
  return (
    <MotiView
      from={{ opacity: 0.4 }}
      animate={{ opacity: 0.8 }}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true,
      }}
      style={[styles.gridItem, style]}
    >
      <Skeleton width={60} height={60} borderRadius={30} />
      <Skeleton width={80} height={14} style={{ marginTop: 12 }} />
      <Skeleton width={60} height={12} style={{ marginTop: 4 }} />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E0E0E0',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  mb8: {
    marginBottom: 8,
  },
  list: {
    padding: 16,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
});
