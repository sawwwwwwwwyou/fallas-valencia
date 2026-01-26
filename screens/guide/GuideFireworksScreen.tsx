import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GuideFireworksScreen() {
  const { t } = useLanguage();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Alert Banner */}
      <View style={styles.alertBanner}>
        <Text style={styles.alertEmoji}>⚠️</Text>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>{t('fireworks.banHours')}</Text>
          <Text style={styles.alertText}>{t('fireworks.banText')}</Text>
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
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
});
