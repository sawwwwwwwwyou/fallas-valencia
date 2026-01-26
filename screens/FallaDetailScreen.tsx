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

type DetailRouteProp = RouteProp<RootStackParamList, 'FallaDetail'>;
type DetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FallaDetail'>;

const { width, height } = Dimensions.get('window');

export default function FallaDetailScreen() {
  const navigation = useNavigation<DetailNavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { falla } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useLanguage();

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
        transition={{ type: 'spring', damping: 20, delay: 100 }}
        style={styles.header}
      >
        <IconButton 
          icon="✕"
          onPress={() => navigation.goBack()}
          backgroundColor="#f0f0f0"
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
        transition={{ type: 'spring', damping: 15, delay: 200 }}
        style={styles.heroContainer}
      >
        <Animated.View style={[styles.hero, heroAnimatedStyle]}>
          <MotiView
            from={{ scale: 0.5, rotate: '-20deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            transition={{ type: 'spring', damping: 10, delay: 400 }}
          >
            <Text style={styles.heroEmoji}>🔥</Text>
          </MotiView>
          <Text style={styles.heroCategory}>{falla.category}</Text>
          {falla.id === '1' && <LiveBadge style={{ marginTop: 8 }} />}
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

        <StaggerItem index={2} delay={300}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('detail.description')}</Text>
            <Text style={styles.description}>{falla.description}</Text>
          </View>
        </StaggerItem>

        <StaggerItem index={3} delay={300}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('detail.events')}</Text>
            
            <MotiView
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'spring', damping: 15, delay: 500 }}
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
              transition={{ type: 'spring', damping: 15, delay: 600 }}
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

        <StaggerItem index={4} delay={300}>
          <RippleButton 
            title={t('detail.viewOnMap')}
            color="#FF6B35"
            style={styles.primaryButton}
            onPress={handleViewOnMap}
          />
        </StaggerItem>

        <StaggerItem index={5} delay={300}>
          <RippleButton 
            title={isFavorite ? "⭐ ✓" : t('detail.addToFavorites')}
            color={isFavorite ? "#FFB800" : "#f0f0f0"}
            textStyle={{ color: isFavorite ? '#fff' : '#333' }}
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
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  heroContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  hero: {
    height: 200,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 80,
  },
  heroCategory: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  eventIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  primaryButton: {
    marginBottom: 12,
  },
});
