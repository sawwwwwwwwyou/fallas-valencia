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

const STRIKE_SCHEDULE = [
  {
    date: '14 marzo',
    times: ['12:00-14:30'],
  },
  {
    date: '15 marzo',
    times: ['11:00-14:00', '20:00-22:00'],
  },
  {
    date: '16 marzo',
    times: ['00:05-02:00', '11:30-14:00', '19:30-21:30', '22:45-00:00'],
  },
  {
    date: '17 marzo',
    times: ['00:30-02:30', '12:30-15:00', '20:30-22:30'],
  },
  {
    date: '18 marzo',
    times: ['01:00-03:00', '12:45-15:15', '17:00-19:00', '22:45-00:00'],
  },
  {
    date: '19 marzo',
    times: ['04:30-06:30', '12:40-15:00'],
  },
];

export default function GuideTransportScreen() {
  const { t } = useLanguage();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Strike Warning Banner */}
      <View style={styles.strikeBanner}>
        <Text style={styles.strikeEmoji}>⚠️</Text>
        <View style={styles.strikeContent}>
          <Text style={styles.strikeTitle}>{t('transport.strikeTitle')}</Text>
          <Text style={styles.strikeSubtitle}>{t('transport.strikeWarning')}</Text>
        </View>
      </View>

      {/* Strike Schedule */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🚨</Text>
          <Text style={styles.sectionTitle}>{t('transport.strikeSchedule')}</Text>
        </View>
        
        <View style={styles.card}>
          {STRIKE_SCHEDULE.map((day, index) => (
            <View key={index} style={[styles.strikeDay, index > 0 && styles.strikeDayBorder]}>
              <Text style={styles.strikeDateLabel}>{day.date}</Text>
              <View style={styles.strikeTimesContainer}>
                {day.times.map((time, timeIndex) => (
                  <View key={timeIndex} style={styles.strikeTimeTag}>
                    <Text style={styles.strikeTimeText}>{time}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
          <Text style={styles.strikeNote}>{t('transport.strikeNote')}</Text>
        </View>
      </View>

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
          <View style={styles.highlightRow}>
            <Text style={styles.highlightLabel}>🎉 {t('transport.march15_19')}</Text>
            <Text style={styles.highlightValue}>{t('transport.allNight')}</Text>
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

      {/* Bus Section - EMT */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🚌</Text>
          <Text style={styles.sectionTitle}>{t('transport.bus')}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.warningText}>{t('transport.busWarning')}</Text>
          <Text style={styles.cardText}>{t('transport.busInfo')}</Text>
          
          <View style={styles.appButtons}>
            <TouchableOpacity 
              style={[styles.appButton, { backgroundColor: '#FF6B35' }]}
              onPress={() => openLink('https://emtvalencia.info/fallas25/')}
            >
              <Text style={styles.appButtonText}>🚌 EMT Fallas 2025</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.linkButton, { marginTop: 12 }]}
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
          <View style={styles.parkingTip}>
            <Text style={styles.parkingTipEmoji}>💡</Text>
            <Text style={styles.parkingTipText}>{t('transport.parkingRecommend')}</Text>
          </View>
          
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

          <View style={styles.parkingItem}>
            <Text style={styles.parkingName}>P+R Manises</Text>
            <Text style={styles.parkingDesc}>{t('transport.parkingManises')}</Text>
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
  strikeBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#E63946',
  },
  strikeEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  strikeContent: {
    flex: 1,
  },
  strikeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C62828',
    marginBottom: 4,
  },
  strikeSubtitle: {
    fontSize: 14,
    color: '#C62828',
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
  strikeDay: {
    paddingVertical: 12,
  },
  strikeDayBorder: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  strikeDateLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C62828',
    marginBottom: 8,
  },
  strikeTimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  strikeTimeTag: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  strikeTimeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#C62828',
  },
  strikeNote: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 12,
    textAlign: 'center',
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
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E8F5E9',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
  },
  highlightLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
  highlightValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
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
  parkingTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    marginHorizontal: -16,
    marginTop: -16,
    marginBottom: 16,
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  parkingTipEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  parkingTipText: {
    flex: 1,
    fontSize: 14,
    color: '#F57C00',
    fontWeight: '500',
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
