import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  style?: any;
}

export function LanguageSwitcher({ style }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={toggleLanguage}
      activeOpacity={0.8}
    >
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>
          {language === 'es' ? '🇪🇸' : '🇬🇧'}
        </Text>
      </View>
      <Text style={styles.label}>
        {language === 'es' ? 'ES' : 'EN'}
      </Text>
    </TouchableOpacity>
  );
}

// Floating version for debug
export function FloatingLanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <TouchableOpacity
      style={styles.floating}
      onPress={toggleLanguage}
      activeOpacity={0.8}
    >
      <Text style={styles.floatingFlag}>
        {language === 'es' ? '🇪🇸' : '🇬🇧'}
      </Text>
      <Text style={styles.floatingLabel}>
        {language === 'es' ? 'ES' : 'EN'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flagContainer: {
    marginRight: 6,
  },
  flag: {
    fontSize: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  floating: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  floatingFlag: {
    fontSize: 20,
    marginRight: 6,
  },
  floatingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});
