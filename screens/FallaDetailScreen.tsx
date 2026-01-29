import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { RootStackParamList } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import {
  ScaleInScreen,
  IconButton,
  RippleButton,
  FavoriteStar,
  LiveBadge,
  StaggerItem,
} from '../components';
import {
  colors,
  getCategoryColor,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../lib/theme';

type DetailRouteProp = RouteProp<RootStackParamList, 'FallaDetail'>;
type DetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FallaDetail'>;

const { width, height } = Dimensions.get('window');

// Category Badge Component
function CategoryBadge({ category }: { category: string }) {
  const catColor = getCategoryColor(category);

  return (
    <View style={[styles.categoryBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
      <Text style={[styles.categoryBadgeText, { color: colors.text.inverse }]}>
        {category.toUpperCase()}
      </Text>
    </View>
  );
}

export default function FallaDetailScreen() {
  const navigation = useNavigation<DetailNavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { falla } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useLanguage();
  const catColor = getCategoryColor(falla.category);

  const scrollY = useSharedValue(0);

  const handleViewOnMap = () => {
    // Close the detail screen and navigate to Mapa tab
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainTabs',
            state: {
              routes: [
                { name: 'Lista' },
                { name: 'Mapa' },
                { name: 'Guardado' },
                { name: 'Guía' },
              ],
              index: 1, // Mapa tab
            },
          },
        ],
      })
    );
  };

  const heroAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [-100, 0],
          [1.5, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <ScaleInScreen style={[styles.container, { paddingTop: insets.top }] as any}>
      {/* Header with close button */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: 100 }}
        style={styles.header}
      >
        <IconButton
          icon="✕"
          onPress={() => navigation.goBack()}
          backgroundColor={colors.background.ash}
        />
        <Text style={styles.headerTitle}>{t('header.detail')}</Text>
        <FavoriteStar
          initialFavorite={isFavorite}
          onToggle={setIsFavorite}
          size={28}
        />
      </MotiView>

      {/* Hero image area */}
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
        style={styles.heroContainer}
      >
        <Animated.View style={[
          styles.hero,
          { backgroundColor: catColor.primary },
          heroAnimatedStyle
        ]}>
          <MotiView
            from={{ scale: 0.5, rotate: '-20deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            transition={{ type: 'timing', duration: 600, delay: 400 }}
          >
            <Text style={styles.heroEmoji}>🔥</Text>
          </MotiView>
          <CategoryBadge category={falla.category} />
          {falla.id === '1' && <LiveBadge style={{ marginTop: spacing.sm }} />}
        </Animated.View>
      </MotiView>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <StaggerItem index={0} delay={300}>
          <Text style={styles.title}>{falla.name}</Text>
        </StaggerItem>

        <StaggerItem index={1} delay={300}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>{falla.address}</Text>
          </View>
        </StaggerItem>

        {/* Stats Row */}
        <StaggerItem index={2} delay={300}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statText}>324m</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⭐</Text>
              <Text style={styles.statText}>4.8</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>👁</Text>
              <Text style={styles.statText}>45k</Text>
            </View>
          </View>
        </StaggerItem>

        <StaggerItem index={3} delay={300}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('detail.description')}</Text>
            <Text style={styles.description}>{falla.description}</Text>
          </View>
        </StaggerItem>

        <StaggerItem index={4} delay={300}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('detail.events')}</Text>

            <MotiView
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 400, delay: 500 }}
            >
              <View style={styles.eventCard}>
                <Text style={styles.eventIcon}>🎆</Text>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{t('detail.mascleta')}</Text>
                  <Text style={styles.eventTime}>14:00 - Plaza del Ayuntamiento</Text>
                </View>
                <LiveBadge />
              </View>
            </MotiView>

            <MotiView
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 400, delay: 600 }}
            >
              <View style={styles.eventCard}>
                <Text style={styles.eventIcon}>🔥</Text>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{t('detail.crema')}</Text>
                  <Text style={styles.eventTime}>19 {t('common.march')} - 22:00</Text>
                </View>
              </View>
            </MotiView>
          </View>
        </StaggerItem>

        <StaggerItem index={5} delay={300}>
          <RippleButton
            title={t('detail.viewOnMap')}
            color={colors.primary.orange}
            style={styles.primaryButton}
            onPress={handleViewOnMap}
          />
        </StaggerItem>

        <StaggerItem index={6} delay={300}>
          <RippleButton
            title={isFavorite ? "⭐ ✓" : t('detail.addToFavorites')}
            color={isFavorite ? colors.primary.gold : colors.background.ash}
            textStyle={{ color: isFavorite ? colors.text.inverse : colors.text.primary }}
            onPress={() => setIsFavorite(!isFavorite)}
          />
        </StaggerItem>
      </ScrollView>
    </ScaleInScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: `rgba(29, 53, 87, 0.08)`,
    backgroundColor: colors.background.white,
  },
  headerTitle: {
    fontSize: typography.sizes.h4,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  heroContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  hero: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 80,
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  categoryBadgeText: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.bold,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.h1,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  infoText: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  statText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.sizes.bodyLarge,
    color: colors.text.secondary,
    lineHeight: typography.lineHeights.bodyLarge,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  eventIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: typography.sizes.h4,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  eventTime: {
    fontSize: typography.sizes.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
});
