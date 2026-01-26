import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GuideTransportScreen() {
  const { t } = useLanguage();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Metro Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🚇</Text>
          <Text style={styles.sectionTitle}>{t('transport.metro')}</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('transport.hours')}</Text>
            <Text style={styles.infoValue}>05:30 - 00:30</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('transport.march15_19')}</Text>
            <Text style={styles.infoValue}>{t('transport.allNight')}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.tip}>{t('transport.metroTip')}</Text>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://www.metrovalencia.es')}
          >
            <Text style={styles.linkButtonText}>{t('transport.officialSite')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bus Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🚌</Text>
          <Text style={styles.sectionTitle}>{t('transport.bus')}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.warningText}>{t('transport.busWarning')}</Text>
          <Text style={styles.cardText}>{t('transport.busInfo')}</Text>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://www.emtvalencia.es')}
          >
            <Text style={styles.linkButtonText}>{t('transport.busApp')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Parking Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🅿️</Text>
          <Text style={styles.sectionTitle}>{t('transport.parking')}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardText}>{t('transport.parkingRecommend')}</Text>
          
          <View style={styles.parkingItem}>
            <Text style={styles.parkingName}>Parking Ciudad de las Artes</Text>
            <Text style={styles.parkingDesc}>{t('transport.parkingArts')}</Text>
          </View>
          
          <View style={styles.parkingItem}>
            <Text style={styles.parkingName}>Parking Mestalla</Text>
            <Text style={styles.parkingDesc}>{t('transport.parkingMestalla')}</Text>
          </View>
          
          <View style={styles.parkingItem}>
            <Text style={styles.parkingName}>P+R Beniferri</Text>
            <Text style={styles.parkingDesc}>{t('transport.parkingFree')}</Text>
          </View>
        </View>
      </View>

      {/* Taxi Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🚕</Text>
          <Text style={styles.sectionTitle}>{t('transport.taxi')}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardText}>{t('transport.taxiInfo')}</Text>
          
          <View style={styles.appButtons}>
            <TouchableOpacity 
              style={[styles.appButton, { backgroundColor: '#00B0FF' }]}
              onPress={() => openLink('https://cabify.com')}
            >
              <Text style={styles.appButtonText}>Cabify</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.appButton, { backgroundColor: '#FFD700' }]}
              onPress={() => openLink('https://www.freenowtaxi.com')}
            >
              <Text style={[styles.appButtonText, { color: '#000' }]}>Free Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  tip: {
    fontSize: 14,
    color: '#4CAF50',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  warningText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    marginBottom: 8,
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
  parkingItem: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  parkingName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  parkingDesc: {
    fontSize: 13,
    color: '#666',
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
});
