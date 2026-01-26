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

export default function GuideBullfightingScreen() {
  const { t } = useLanguage();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🐂</Text>
        <Text style={styles.heroTitle}>{t('bullfighting.hero')}</Text>
        <Text style={styles.heroSubtitle}>{t('bullfighting.heroSub')}</Text>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>{t('bullfighting.info')}</Text>
      </View>

      {/* Schedule Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('bullfighting.schedule')}</Text>
        
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleRow}>
            <View style={styles.scheduleDate}>
              <Text style={styles.scheduleDateText}>10 MAR</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleType}>{t('bullfighting.corrida')}</Text>
              <Text style={styles.scheduleTime}>17:00</Text>
            </View>
          </View>
          
          <View style={styles.scheduleRow}>
            <View style={styles.scheduleDate}>
              <Text style={styles.scheduleDateText}>15 MAR</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleType}>{t('bullfighting.corrida')}</Text>
              <Text style={styles.scheduleTime}>17:00</Text>
            </View>
          </View>
          
          <View style={styles.scheduleRow}>
            <View style={styles.scheduleDate}>
              <Text style={styles.scheduleDateText}>17 MAR</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleType}>{t('bullfighting.corrida')}</Text>
              <Text style={styles.scheduleTime}>17:00</Text>
            </View>
          </View>
          
          <View style={[styles.scheduleRow, styles.scheduleRowLast]}>
            <View style={[styles.scheduleDate, styles.scheduleDateHighlight]}>
              <Text style={[styles.scheduleDateText, { color: '#fff' }]}>19 MAR</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleType}>{t('bullfighting.granCorrida')}</Text>
              <Text style={styles.scheduleTime}>17:00 • {t('bullfighting.mainEvent')}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tickets Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('bullfighting.tickets')}</Text>
        
        <View style={styles.card}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{t('bullfighting.sol')}</Text>
            <Text style={styles.priceValue}>{t('common.from')} 15€</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{t('bullfighting.sombra')}</Text>
            <Text style={styles.priceValue}>{t('common.from')} 40€</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{t('bullfighting.barrera')}</Text>
            <Text style={styles.priceValue}>{t('common.from')} 80€</Text>
          </View>
          
          <Text style={styles.tip}>{t('bullfighting.tip')}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.buyButton}
          onPress={() => Linking.openURL('https://www.torosvalencia.com')}
        >
          <Text style={styles.buyButtonText}>{t('bullfighting.buyTickets')}</Text>
        </TouchableOpacity>
      </View>

      {/* Location Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('bullfighting.howToGet')}</Text>
        
        <View style={styles.card}>
          <Text style={styles.addressTitle}>Plaza de Toros de Valencia</Text>
          <Text style={styles.addressText}>C/ Xàtiva, 28, 46004 Valencia</Text>
          
          <View style={styles.transportRow}>
            <Text style={styles.transportIcon}>🚇</Text>
            <Text style={styles.transportText}>{t('bullfighting.metro')}</Text>
          </View>
          <View style={styles.transportRow}>
            <Text style={styles.transportIcon}>🚶</Text>
            <Text style={styles.transportText}>{t('bullfighting.walk')}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapButtonText}>{t('bullfighting.openMap')}</Text>
        </TouchableOpacity>
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
  heroCard: {
    backgroundColor: '#795548',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  heroEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#D7CCC8',
    textAlign: 'center',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scheduleRowLast: {
    borderBottomWidth: 0,
  },
  scheduleDate: {
    backgroundColor: '#79554815',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  scheduleDateHighlight: {
    backgroundColor: '#795548',
  },
  scheduleDateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#795548',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  scheduleTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#555',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#795548',
  },
  tip: {
    fontSize: 13,
    color: '#4CAF50',
    marginTop: 8,
    fontStyle: 'italic',
  },
  buyButton: {
    backgroundColor: '#795548',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  transportIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  transportText: {
    fontSize: 14,
    color: '#555',
  },
  mapButton: {
    backgroundColor: '#79554815',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  mapButtonText: {
    color: '#795548',
    fontWeight: '600',
    fontSize: 14,
  },
});
