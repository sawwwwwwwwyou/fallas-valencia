import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

type ClosurePeriod = 'before' | 'mascleta' | 'main' | 'after';

function getCurrentPeriod(): ClosurePeriod {
  const now = new Date();
  const year = now.getFullYear();
  
  const march1 = new Date(year, 2, 1);
  const march16 = new Date(year, 2, 16);
  const march20 = new Date(year, 2, 20, 4, 0); // 4:00 AM March 20
  
  if (now < march1) return 'before';
  if (now >= march1 && now < march16) return 'mascleta';
  if (now >= march16 && now < march20) return 'main';
  return 'after';
}

export default function GuideStreetClosuresScreen() {
  const { t } = useLanguage();
  const period = useMemo(() => getCurrentPeriod(), []);

  const openMetroSite = () => {
    Linking.openURL('https://www.metrovalencia.es');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Current Status Banner */}
      <View style={[styles.statusBanner, getStatusStyle(period)]}>
        <Text style={styles.statusEmoji}>{getStatusEmoji(period)}</Text>
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusTitle}>{t(`closures.status.${period}`)}</Text>
          <Text style={styles.statusDesc}>{t(`closures.status.${period}Desc`)}</Text>
        </View>
      </View>

      {/* Mascleta Period (March 1-15) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>💥</Text>
          <Text style={styles.sectionTitle}>{t('closures.mascleta')}</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>{t('closures.dates')}</Text>
            <Text style={styles.dateValue}>1-15 {t('common.march')}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.cardText}>{t('closures.mascletaInfo')}</Text>
          
          <View style={styles.zoneItem}>
            <View style={[styles.zoneDot, { backgroundColor: '#FFB800' }]} />
            <Text style={styles.zoneText}>{t('closures.mascletaZone')}</Text>
          </View>
        </View>
      </View>

      {/* Main Days (March 16-19) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🔥</Text>
          <Text style={styles.sectionTitle}>{t('closures.mainDays')}</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>{t('closures.dates')}</Text>
            <Text style={styles.dateValue}>16-19 {t('common.march')}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.warningText}>{t('closures.mainWarning')}</Text>
          <Text style={styles.cardText}>{t('closures.mainInfo')}</Text>
        </View>
      </View>

      {/* Zones Map */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🗺️</Text>
          <Text style={styles.sectionTitle}>{t('closures.zones')}</Text>
        </View>
        
        <View style={styles.card}>
          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E63946' }]} />
              <Text style={styles.legendText}>{t('closures.zoneClosed')}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFB800' }]} />
              <Text style={styles.legendText}>{t('closures.zoneControl')}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          {/* Zone descriptions */}
          <View style={styles.zoneSection}>
            <Text style={styles.zoneTitle}>🔴 {t('closures.redZone')}</Text>
            <Text style={styles.zoneDesc}>{t('closures.redZoneDesc')}</Text>
            <View style={styles.zoneLocations}>
              <Text style={styles.locationItem}>• Plaza del Ayuntamiento</Text>
              <Text style={styles.locationItem}>• Calle Paz</Text>
              <Text style={styles.locationItem}>• Calle Colón</Text>
              <Text style={styles.locationItem}>• Calle San Vicente</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.zoneSection}>
            <Text style={styles.zoneTitle}>🟡 {t('closures.yellowZone')}</Text>
            <Text style={styles.zoneDesc}>{t('closures.yellowZoneDesc')}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.zoneSection}>
            <Text style={styles.zoneTitle}>🎆 {t('closures.fireworksZone')}</Text>
            <Text style={styles.zoneDesc}>{t('closures.fireworksZoneDesc')}</Text>
            <View style={styles.zoneLocations}>
              <Text style={styles.locationItem}>• Palau de les Arts</Text>
              <Text style={styles.locationItem}>• Puente de las Flores</Text>
              <Text style={styles.locationItem}>• Puente de Aragón</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>💡</Text>
          <Text style={styles.sectionTitle}>{t('closures.recommendations')}</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.tipItem}>
            <Text style={styles.tipEmoji}>🚇</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{t('closures.tipMetro')}</Text>
              <Text style={styles.tipDesc}>{t('closures.tipMetroDesc')}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.tipItem}>
            <Text style={styles.tipEmoji}>🅿️</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{t('closures.tipParking')}</Text>
              <Text style={styles.tipDesc}>{t('closures.tipParkingDesc')}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.tipItem}>
            <Text style={styles.tipEmoji}>📍</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{t('closures.tipPlan')}</Text>
              <Text style={styles.tipDesc}>{t('closures.tipPlanDesc')}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.metroButton} onPress={openMetroSite}>
            <Text style={styles.metroButtonText}>{t('closures.openMetro')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom padding */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function getStatusEmoji(period: ClosurePeriod): string {
  switch (period) {
    case 'before': return '📅';
    case 'mascleta': return '🚧';
    case 'main': return '⛔';
    case 'after': return '✅';
  }
}

function getStatusStyle(period: ClosurePeriod) {
  switch (period) {
    case 'before': return { backgroundColor: '#4CAF50' };
    case 'mascleta': return { backgroundColor: '#FFB800' };
    case 'main': return { backgroundColor: '#E63946' };
    case 'after': return { backgroundColor: '#4CAF50' };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  statusDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
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
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  warningText: {
    fontSize: 14,
    color: '#E63946',
    fontWeight: '600',
    marginBottom: 8,
  },
  zoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  zoneDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  zoneText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#555',
  },
  zoneSection: {
    marginBottom: 4,
  },
  zoneTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  zoneDesc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  zoneLocations: {
    marginLeft: 8,
  },
  locationItem: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  tipDesc: {
    fontSize: 13,
    color: '#666',
  },
  metroButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  metroButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
