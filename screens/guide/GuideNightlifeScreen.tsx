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

export default function GuideNightlifeScreen() {
  const { t } = useLanguage();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoEmoji}>🌙</Text>
        <Text style={styles.infoText}>{t('nightlife.info')}</Text>
      </View>

      {/* Verbenas Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('nightlife.verbenas')}</Text>
        <Text style={styles.sectionDesc}>{t('nightlife.verbenasDesc')}</Text>
        
        <View style={styles.card}>
          <View style={styles.verbenaItem}>
            <Text style={styles.verbenaName}>Verbena Plaza del Carmen</Text>
            <Text style={styles.verbenaInfo}>El Carmen • 23:00 - 04:00</Text>
          </View>
          <View style={styles.verbenaItem}>
            <Text style={styles.verbenaName}>Verbena Ruzafa</Text>
            <Text style={styles.verbenaInfo}>Ruzafa • 23:00 - 04:00</Text>
          </View>
          <View style={styles.verbenaItem}>
            <Text style={styles.verbenaName}>Verbena Benimaclet</Text>
            <Text style={styles.verbenaInfo}>Benimaclet • 22:00 - 03:00</Text>
          </View>
        </View>
      </View>

      {/* Concerts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('nightlife.concerts')}</Text>
        
        <View style={styles.concertCard}>
          <View style={styles.concertDate}>
            <Text style={styles.concertDay}>15</Text>
            <Text style={styles.concertMonth}>MAR</Text>
          </View>
          <View style={styles.concertInfo}>
            <Text style={styles.concertName}>Gran Verbena de Fallas</Text>
            <Text style={styles.concertLocation}>📍 Viveros Gardens</Text>
          </View>
        </View>

        <View style={styles.concertCard}>
          <View style={styles.concertDate}>
            <Text style={styles.concertDay}>18</Text>
            <Text style={styles.concertMonth}>MAR</Text>
          </View>
          <View style={styles.concertInfo}>
            <Text style={styles.concertName}>Nit del Foc Concert</Text>
            <Text style={styles.concertLocation}>📍 Plaza del Ayuntamiento</Text>
          </View>
        </View>
      </View>

      {/* Clubs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('nightlife.clubs')}</Text>
        
        <View style={styles.card}>
          <View style={styles.clubItem}>
            <View style={styles.clubHeader}>
              <Text style={styles.clubName}>Mya Club</Text>
              <View style={styles.clubBadge}>
                <Text style={styles.clubBadgeText}>Electro</Text>
              </View>
            </View>
            <Text style={styles.clubAddress}>C/ Historiador Diago, 8</Text>
          </View>
          
          <View style={styles.clubItem}>
            <View style={styles.clubHeader}>
              <Text style={styles.clubName}>Jerusalem Club</Text>
              <View style={styles.clubBadge}>
                <Text style={styles.clubBadgeText}>House</Text>
              </View>
            </View>
            <Text style={styles.clubAddress}>C/ Jerusalén, 3</Text>
          </View>
          
          <View style={styles.clubItem}>
            <View style={styles.clubHeader}>
              <Text style={styles.clubName}>La3 Club</Text>
              <View style={styles.clubBadge}>
                <Text style={styles.clubBadgeText}>Indie</Text>
              </View>
            </View>
            <Text style={styles.clubAddress}>C/ Padre Tomás Montañana</Text>
          </View>
        </View>
      </View>

      {/* Map Link */}
      <TouchableOpacity 
        style={styles.mapLink}
        onPress={() => Linking.openURL('https://www.google.com/maps')}
      >
        <Text style={styles.mapLinkText}>{t('nightlife.mapLink')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 16,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#E91E6320',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E91E6340',
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#252542',
    borderRadius: 12,
    padding: 4,
  },
  verbenaItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333355',
  },
  verbenaName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  verbenaInfo: {
    fontSize: 13,
    color: '#E91E63',
  },
  concertCard: {
    flexDirection: 'row',
    backgroundColor: '#252542',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  concertDate: {
    width: 50,
    height: 50,
    backgroundColor: '#E91E63',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  concertDay: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  concertMonth: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  concertInfo: {
    flex: 1,
  },
  concertName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  concertLocation: {
    fontSize: 13,
    color: '#aaa',
  },
  clubItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333355',
  },
  clubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  clubName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  clubBadge: {
    backgroundColor: '#E91E6330',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  clubBadgeText: {
    fontSize: 11,
    color: '#E91E63',
    fontWeight: '600',
  },
  clubAddress: {
    fontSize: 13,
    color: '#888',
  },
  mapLink: {
    backgroundColor: '#E91E63',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  mapLinkText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
