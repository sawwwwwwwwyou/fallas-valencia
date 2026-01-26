import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MotiView } from 'moti';
import { RootStackParamList, Falla } from '../App';
import { 
  AnimatedCard, 
  AnimatedScreen, 
  HeartButton,
  LiveBadge,
  FireRefreshIndicator,
  SkeletonList,
} from '../components';

const FALLAS_DATA: Falla[] = [
  {
    id: '1',
    name: 'Falla Plaza del Ayuntamiento',
    category: 'Sección Especial',
    address: 'Plaza del Ayuntamiento, Valencia',
    description: 'La falla principal de Valencia, ubicada en la plaza más emblemática de la ciudad. Cada año presenta monumentos espectaculares con crítica social y artística.',
  },
  {
    id: '2',
    name: 'Falla Na Jordana',
    category: 'Sección Especial',
    address: 'C/ Na Jordana, Valencia',
    description: 'Una de las fallas más antiguas y tradicionales. Famosa por su creatividad y sus ninots de alta calidad artística.',
  },
  {
    id: '3',
    name: 'Falla Convento Jerusalén',
    category: 'Sección Especial',
    address: 'C/ Convento Jerusalén - Matemático Marzal',
    description: 'Conocida por sus monumentos innovadores y su uso de nuevas tecnologías en el arte fallero.',
  },
  {
    id: '4',
    name: 'Falla Exposición',
    category: 'Primera A',
    address: 'C/ Exposición, Valencia',
    description: 'Falla del barrio de la Exposición, con una larga tradición y participación vecinal activa.',
  },
  {
    id: '5',
    name: 'Falla Cuba-Literato Azorín',
    category: 'Primera A',
    address: 'C/ Cuba - Literato Azorín',
    description: 'Destaca por sus diseños originales y su fuerte identidad de barrio.',
  },
  {
    id: '6',
    name: 'Falla Sueca-Literato Azorín',
    category: 'Sección Especial',
    address: 'C/ Sueca - Literato Azorín',
    description: 'Una de las fallas más premiadas de Valencia, con monumentos que destacan por su perfección técnica.',
  },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderFalla = ({ item, index }: { item: Falla; index: number }) => (
    <MotiView
      from={{
        opacity: 0,
        translateY: 30,
        scale: 0.95,
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
        delay: index * 80,
      }}
    >
      <AnimatedCard 
        style={styles.card}
        onPress={() => navigation.navigate('FallaDetail', { falla: item })}
      >
        <View style={styles.cardImage}>
          <Text style={styles.cardEmoji}>🔥</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardCategory}>{item.category}</Text>
            {item.id === '1' && <LiveBadge style={styles.liveBadge} />}
          </View>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.cardAddress} numberOfLines={1}>{item.address}</Text>
        </View>
        <View style={styles.cardActions}>
          <HeartButton 
            initialFavorite={favorites.has(item.id)}
            onToggle={() => toggleFavorite(item.id)}
            size={22}
          />
          <Text style={styles.chevron}>›</Text>
        </View>
      </AnimatedCard>
    </MotiView>
  );

  if (loading) {
    return (
      <AnimatedScreen style={styles.container}>
        <SkeletonList count={6} />
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen style={styles.container}>
      <FlatList
        data={FALLAS_DATA}
        renderItem={renderFalla}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF6B35"
            colors={['#FF6B35']}
          />
        }
        ListHeaderComponent={
          refreshing ? <FireRefreshIndicator refreshing={refreshing} /> : null
        }
      />
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 30,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 11,
    color: '#FF6B35',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  liveBadge: {
    marginLeft: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 13,
    color: '#888',
  },
  cardActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  chevron: {
    fontSize: 24,
    color: '#ccc',
  },
});
