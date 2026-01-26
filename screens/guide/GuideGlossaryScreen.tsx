import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

interface GlossaryTerm {
  id: string;
  termKey: string;
  termEs: string;
  pronunciation: string;
  definitionKey: string;
  emoji: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: '1',
    termKey: 'glossary.mascleta',
    termEs: 'Mascletà',
    pronunciation: 'mas-kle-TA',
    definitionKey: 'glossary.mascletaDef',
    emoji: '💥',
  },
  {
    id: '2',
    termKey: 'glossary.crema',
    termEs: 'Cremà',
    pronunciation: 'kre-MA',
    definitionKey: 'glossary.cremaDef',
    emoji: '🔥',
  },
  {
    id: '3',
    termKey: 'glossary.planta',
    termEs: 'Plantà',
    pronunciation: 'plan-TA',
    definitionKey: 'glossary.plantaDef',
    emoji: '🏗️',
  },
  {
    id: '4',
    termKey: 'glossary.ofrenda',
    termEs: 'Ofrenda',
    pronunciation: 'o-FREN-da',
    definitionKey: 'glossary.ofrendaDef',
    emoji: '💐',
  },
  {
    id: '5',
    termKey: 'glossary.ninot',
    termEs: 'Ninot',
    pronunciation: 'ni-NOT',
    definitionKey: 'glossary.ninotDef',
    emoji: '🎭',
  },
  {
    id: '6',
    termKey: 'glossary.falla',
    termEs: 'Falla',
    pronunciation: 'FA-ya',
    definitionKey: 'glossary.fallaDef',
    emoji: '🎨',
  },
  {
    id: '7',
    termKey: 'glossary.fallero',
    termEs: 'Fallero/Fallera',
    pronunciation: 'fa-YE-ro / fa-YE-ra',
    definitionKey: 'glossary.falleroDef',
    emoji: '👗',
  },
  {
    id: '8',
    termKey: 'glossary.casal',
    termEs: 'Casal',
    pronunciation: 'ka-SAL',
    definitionKey: 'glossary.casalDef',
    emoji: '🏠',
  },
  {
    id: '9',
    termKey: 'glossary.verbena',
    termEs: 'Verbena',
    pronunciation: 'ver-BE-na',
    definitionKey: 'glossary.verbenaDef',
    emoji: '💃',
  },
  {
    id: '10',
    termKey: 'glossary.correfoc',
    termEs: 'Correfoc',
    pronunciation: 'korre-FOK',
    definitionKey: 'glossary.correfocDef',
    emoji: '😈',
  },
  {
    id: '11',
    termKey: 'glossary.desperta',
    termEs: 'Despertà',
    pronunciation: 'des-per-TA',
    definitionKey: 'glossary.despertaDef',
    emoji: '⏰',
  },
  {
    id: '12',
    termKey: 'glossary.nitDelFoc',
    termEs: 'Nit del Foc',
    pronunciation: 'nit del FOK',
    definitionKey: 'glossary.nitDelFocDef',
    emoji: '🎆',
  },
];

export default function GuideGlossaryScreen() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  
  const filteredTerms = GLOSSARY_TERMS.filter(term => 
    t(term.termKey).toLowerCase().includes(search.toLowerCase()) ||
    term.termEs.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t('glossary.search')}
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {filteredTerms.map((term) => (
          <View key={term.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{term.emoji}</Text>
              <View style={styles.cardTitles}>
                <Text style={styles.cardTerm}>{t(term.termKey)}</Text>
                <View style={styles.cardSubRow}>
                  <Text style={styles.cardTermEs}>{term.termEs}</Text>
                  <Text style={styles.cardPronunciation}>[{term.pronunciation}]</Text>
                </View>
              </View>
            </View>
            <Text style={styles.cardDefinition}>{t(term.definitionKey)}</Text>
          </View>
        ))}
        
        {filteredTerms.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🤷</Text>
            <Text style={styles.emptyText}>{t('glossary.notFound')}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: '#333',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 32,
    marginRight: 14,
  },
  cardTitles: {
    flex: 1,
  },
  cardTerm: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  cardSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  cardTermEs: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  cardPronunciation: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
    fontStyle: 'italic',
  },
  cardDefinition: {
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
