import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GuidePracticalInfoScreen() {
  const { t } = useLanguage();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const openAppStore = () => {
    const url = Platform.OS === 'ios' 
      ? 'https://apps.apple.com/es/app/fallas-2025/id1553669307'
      : 'https://play.google.com/store/apps/details?id=com.fallas.app';
    openLink(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Tickets Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🎟️</Text>
          <Text style={styles.sectionTitle}>{t('practical.tickets')}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('practical.specialCategory')}</Text>
          <Text style={styles.cardText}>{t('practical.ticketsDesc')}</Text>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://www.visitvalencia.com/shop/fallas/')}
          >
            <Text style={styles.linkButtonText}>🎫 {t('practical.buyTickets')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Exposición del Ninot */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🎨</Text>
          <Text style={styles.sectionTitle}>Exposición del Ninot</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.expoInfo}>
            <View style={styles.expoRow}>
              <Text style={styles.expoLabel}>📍</Text>
              <Text style={styles.expoValue}>Museo de las Ciencias</Text>
            </View>
            <View style={styles.expoRow}>
              <Text style={styles.expoLabel}>📅</Text>
              <Text style={styles.expoValue}>{t('practical.untilMarch15')}</Text>
            </View>
            <View style={styles.expoRow}>
              <Text style={styles.expoLabel}>💰</Text>
              <Text style={styles.expoValue}>3€</Text>
            </View>
          </View>
          
          <View style={styles.expoNote}>
            <Text style={styles.expoNoteText}>{t('practical.ninotVote')}</Text>
          </View>
        </View>
      </View>

      {/* Museums */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🏛️</Text>
          <Text style={styles.sectionTitle}>{t('practical.museums')}</Text>
        </View>
        
        <View style={styles.museumCard}>
          <Text style={styles.museumName}>Museu Faller</Text>
          <Text style={styles.museumDesc}>{t('practical.museuFallerDesc')}</Text>
          <Text style={styles.museumAddress}>Plaza Monteolivete, 4</Text>
        </View>
        
        <View style={styles.museumCard}>
          <Text style={styles.museumName}>Museu de l'Artista Faller</Text>
          <Text style={styles.museumDesc}>{t('practical.museuArtistaDesc')}</Text>
          <Text style={styles.museumAddress}>C/ Visitación, 1</Text>
        </View>
      </View>

      {/* Official App */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>📱</Text>
          <Text style={styles.sectionTitle}>{t('practical.officialApp')}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardText}>{t('practical.appDesc')}</Text>
          
          <View style={styles.appButtons}>
            <TouchableOpacity 
              style={[styles.appButton, { backgroundColor: '#34A853' }]}
              onPress={() => openLink('https://play.google.com/store/apps/details?id=com.fallas.app')}
            >
              <Text style={styles.appButtonText}>▶️ Android</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.appButton, { backgroundColor: '#007AFF' }]}
              onPress={() => openLink('https://apps.apple.com/es/app/fallas-2025/id1553669307')}
            >
              <Text style={styles.appButtonText}>🍎 iOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bullfighting */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🐂</Text>
          <Text style={styles.sectionTitle}>{t('practical.bullfighting')}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Feria Taurina de Fallas</Text>
          <Text style={styles.cardText}>{t('practical.bullfightingDesc')}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍</Text>
            <Text style={styles.infoValue}>Plaza de Toros de Valencia</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅</Text>
            <Text style={styles.infoValue}>11 - 19 {t('practical.march')}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://entradasplazadevalencia.janto.es/')}
          >
            <Text style={styles.linkButtonText}>🎫 {t('practical.buyBullfightTickets')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Useful Links */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🔗</Text>
          <Text style={styles.sectionTitle}>{t('practical.usefulLinks')}</Text>
        </View>
        
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => openLink('https://www.visitvalencia.com/fallas')}
          >
            <Text style={styles.linkItemEmoji}>🌐</Text>
            <Text style={styles.linkItemText}>Visit Valencia - Fallas</Text>
            <Text style={styles.linkArrow}>›</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => openLink('https://www.fallas.com')}
          >
            <Text style={styles.linkItemEmoji}>🔥</Text>
            <Text style={styles.linkItemText}>Fallas.com</Text>
            <Text style={styles.linkArrow}>›</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => openLink('https://jfrivas.com/fallas')}
          >
            <Text style={styles.linkItemEmoji}>📍</Text>
            <Text style={styles.linkItemText}>JF Rivas - {t('practical.fallaLocations')}</Text>
            <Text style={styles.linkArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  linkButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  linkButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  expoInfo: {
    gap: 8,
  },
  expoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expoLabel: {
    fontSize: 16,
    width: 24,
  },
  expoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  expoNote: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: -16,
    marginBottom: -16,
    marginTop: 16,
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  expoNoteText: {
    fontSize: 13,
    color: '#1565C0',
    textAlign: 'center',
    fontWeight: '500',
  },
  museumCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  museumName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  museumDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 8,
  },
  museumAddress: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
  },
  appButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  appButton: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  appButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    width: 24,
  },
  infoValue: {
    fontSize: 14,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkItemEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  linkItemText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  linkArrow: {
    fontSize: 24,
    color: '#ccc',
  },
});
