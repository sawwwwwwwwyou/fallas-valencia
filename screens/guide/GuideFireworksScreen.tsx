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

export default function GuideFireworksScreen() {
  const { t } = useLanguage();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Alert Banner - Prohibited Hours */}
      <View style={styles.alertBanner}>
        <Text style={styles.alertEmoji}>⚠️</Text>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>{t('fireworks.banHours')}</Text>
          <Text style={styles.alertText}>{t('fireworks.banText')}</Text>
        </View>
      </View>

      {/* Prohibited Times Detail */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('fireworks.prohibitedTimes')}</Text>
        <View style={styles.card}>
          <View style={styles.prohibitedRow}>
            <Text style={styles.prohibitedEmoji}>🚫</Text>
            <View style={styles.prohibitedInfo}>
              <Text style={styles.prohibitedTime}>09:00 - 10:00</Text>
              <Text style={styles.prohibitedReason}>{t('fireworks.morningRest')}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.prohibitedRow}>
            <Text style={styles.prohibitedEmoji}>🚫</Text>
            <View style={styles.prohibitedInfo}>
              <Text style={styles.prohibitedTime}>15:00 - 17:00</Text>
              <Text style={styles.prohibitedReason}>{t('fireworks.afternoonRest')}</Text>
            </View>
          </View>
          <View style={styles.warningNote}>
            <Text style={styles.warningNoteText}>{t('fireworks.fineWarning')}</Text>
          </View>
        </View>
      </View>

      {/* Safety Rules */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('fireworks.safetyRules')}</Text>
        <View style={styles.card}>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleEmoji}>👂</Text>
            <Text style={styles.ruleText}>{t('fireworks.rule1')}</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleEmoji}>👶</Text>
            <Text style={styles.ruleText}>{t('fireworks.rule2')}</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleEmoji}>🔥</Text>
            <Text style={styles.ruleText}>{t('fireworks.rule3')}</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleEmoji}>📍</Text>
            <Text style={styles.ruleText}>{t('fireworks.rule4')}</Text>
          </View>
        </View>
      </View>

      {/* Types */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('fireworks.types')}</Text>
        
        <View style={styles.typeCard}>
          <Text style={styles.typeName}>Mascletà</Text>
          <Text style={styles.typeDesc}>{t('fireworks.mascletaDesc')}</Text>
        </View>

        <View style={styles.typeCard}>
          <Text style={styles.typeName}>Castillo de fuegos</Text>
          <Text style={styles.typeDesc}>{t('fireworks.castilloDesc')}</Text>
        </View>

        <View style={styles.typeCard}>
          <Text style={styles.typeName}>Tro de Bac</Text>
          <Text style={styles.typeDesc}>{t('fireworks.troDesc')}</Text>
        </View>
      </View>

      {/* Where to Buy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('fireworks.whereToBuy')}</Text>
        <View style={styles.card}>
          <View style={styles.shopItem}>
            <Text style={styles.shopName}>Pirotecnia Caballer</Text>
            <Text style={styles.shopAddress}>C/ San Vicente Mártir, 87</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.shopItem}>
            <Text style={styles.shopName}>Pirotecnia Zarzoso</Text>
            <Text style={styles.shopAddress}>{t('fireworks.tempKiosk')}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.shopItem}>
            <Text style={styles.shopName}>{t('fireworks.kiosks')}</Text>
            <Text style={styles.shopAddress}>{t('fireworks.kiosksInfo')}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.instagramButton}
            onPress={() => openLink('https://www.instagram.com/p/CpZt7zLto7y/')}
          >
            <Text style={styles.instagramButtonText}>📍 {t('fireworks.seeLocations')}</Text>
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
  alertBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  alertEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#856404',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#856404',
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
  prohibitedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  prohibitedEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  prohibitedInfo: {
    flex: 1,
  },
  prohibitedTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E63946',
    marginBottom: 2,
  },
  prohibitedReason: {
    fontSize: 13,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  warningNote: {
    backgroundColor: '#FFEBEE',
    marginHorizontal: -16,
    marginBottom: -16,
    marginTop: 12,
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  warningNoteText: {
    fontSize: 12,
    color: '#C62828',
    textAlign: 'center',
    fontWeight: '500',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleEmoji: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
    textAlign: 'center',
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  typeCard: {
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
  typeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 6,
  },
  typeDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  shopItem: {
    paddingVertical: 8,
  },
  shopName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  shopAddress: {
    fontSize: 13,
    color: '#666',
  },
  instagramButton: {
    backgroundColor: '#E1306C',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  instagramButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
