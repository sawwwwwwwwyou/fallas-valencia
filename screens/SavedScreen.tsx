import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MotiView } from 'moti';
import { useAuth } from '../contexts/AuthContext';
import { getFavorites, removeFavorite } from '../lib/supabase';
import { RootStackParamList, Falla } from '../App';
import {
  AnimatedCard,
  AnimatedScreen,
  HeartButton,
  SkeletonList,
} from '../components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FavoriteItem {
  id: string;
  falla: Falla;
}

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user, signOut } = useAuth();
  
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!user) return;
    
    try {
      const data = await getFavorites(user.id);
      setFavorites(data as any);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFavorites();
  }, [loadFavorites]);

  const handleRemoveFavorite = async (fallaId: string) => {
    if (!user) return;
    
    Alert.alert(
      'Eliminar favorito',
      '¿Estás seguro de que quieres eliminar esta falla de tus favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFavorite(user.id, fallaId);
              setFavorites(prev => prev.filter(f => f.falla.id !== fallaId));
            } catch (error) {
              console.error('Error removing favorite:', error);
              Alert.alert('Error', 'No se pudo eliminar el favorito');
            }
          },
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  const renderFavorite = ({ item, index }: { item: FavoriteItem; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateX: -30 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        type: 'spring',
        damping: 15,
        delay: index * 80,
      }}
    >
      <AnimatedCard
        style={styles.card}
        onPress={() => navigation.navigate('FallaDetail', { falla: item.falla })}
      >
        <View style={styles.cardImage}>
          <Text style={styles.cardEmoji}>🔥</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardCategory}>{item.falla.category}</Text>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.falla.name}
          </Text>
          <Text style={styles.cardAddress} numberOfLines={1}>
            {item.falla.address}
          </Text>
        </View>
        <View style={styles.cardActions}>
          <HeartButton
            initialFavorite={true}
            onToggle={() => handleRemoveFavorite(item.falla.id)}
            size={22}
          />
          <Text style={styles.chevron}>›</Text>
        </View>
      </AnimatedCard>
    </MotiView>
  );

  const renderEmptyState = () => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 400 }}
      style={styles.emptyContainer}
    >
      <Text style={styles.emptyEmoji}>⭐</Text>
      <Text style={styles.emptyTitle}>No tienes favoritos</Text>
      <Text style={styles.emptyText}>
        Explora las fallas y añade tus favoritas tocando el corazón
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.exploreButtonText}>Explorar fallas</Text>
      </TouchableOpacity>
    </MotiView>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>
        <View>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.favoritesCount}>
            {favorites.length} {favorites.length === 1 ? 'favorito' : 'favoritos'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <AnimatedScreen style={styles.container}>
        {renderHeader()}
        <SkeletonList count={4} />
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen style={styles.container}>
      {renderHeader()}
      
      {favorites.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
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
        />
      )}
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  favoritesCount: {
    fontSize: 12,
    color: '#888',
  },
  signOutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFE5D9',
  },
  signOutText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
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
  cardCategory: {
    fontSize: 11,
    color: '#FF6B35',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
