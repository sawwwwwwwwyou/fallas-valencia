// Import Fallas 2025 Data via Supabase REST API
const https = require('https');

const SUPABASE_URL = 'https://symayyolvynvynomgtgl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FWscmRem-aN095lbgCnLNQ_fXYw3AMP';

async function supabaseRequest(table, data, method = 'POST') {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '[]'));
        } else {
          reject(new Error(`${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function main() {
  console.log('Starting Fallas 2025 data import...\n');

  // 1. Insert Event Types
  console.log('1. Inserting event types...');
  const eventTypes = [
    { name_es: 'Mascletà', name_en: 'Mascletà', icon: '💥', color: '#FF4500', description_es: 'Espectáculo pirotécnico diurno con petardos', description_en: 'Daytime pyrotechnic show with firecrackers' },
    { name_es: 'Castillo', name_en: 'Fireworks', icon: '🎆', color: '#FFD700', description_es: 'Fuegos artificiales nocturnos', description_en: 'Night fireworks display' },
    { name_es: 'Cremà', name_en: 'Cremà', icon: '🔥', color: '#FF6B35', description_es: 'Quema de las fallas', description_en: 'Burning of the fallas' },
    { name_es: 'Ofrenda', name_en: 'Ofrenda', icon: '💐', color: '#FF69B4', description_es: 'Ofrenda de flores a la Virgen', description_en: 'Flower offering to the Virgin' },
    { name_es: 'Cabalgata', name_en: 'Parade', icon: '🎭', color: '#9B59B6', description_es: 'Desfile tradicional', description_en: 'Traditional parade' },
    { name_es: 'Despertà', name_en: 'Despertà', icon: '🎺', color: '#3498DB', description_es: 'Despertar matutino con petardos', description_en: 'Morning wake-up with firecrackers' },
    { name_es: 'Correfoc', name_en: 'Correfoc', icon: '👹', color: '#E74C3C', description_es: 'Desfile con fuego y demonios', description_en: 'Fire run with demons' },
    { name_es: 'Ceremonia', name_en: 'Ceremony', icon: '🏛️', color: '#2ECC71', description_es: 'Evento ceremonial oficial', description_en: 'Official ceremonial event' }
  ];

  try {
    const typesResult = await supabaseRequest('event_types', eventTypes);
    console.log(`   ✓ Inserted ${typesResult.length} event types`);
  } catch (e) {
    console.log(`   ⚠ Event types may already exist: ${e.message}`);
  }

  // 2. Insert Mascletàs (20 events)
  console.log('\n2. Inserting Mascletàs...');
  const mascletasData = [
    { date: '2025-02-23', pirotecnia: 'Pirotecnia Valenciana', cancelled: false },
    { date: '2025-03-01', pirotecnia: 'Pirotecnia Peñarroja', cancelled: false },
    { date: '2025-03-02', pirotecnia: 'Pirotecnia Gironina', cancelled: false },
    { date: '2025-03-03', pirotecnia: 'Pirotecnia Alto Palancia', cancelled: false },
    { date: '2025-03-04', pirotecnia: 'Pirotecnia Dragón', cancelled: true },
    { date: '2025-03-05', pirotecnia: 'Pirotecnia Pibierzo', cancelled: true },
    { date: '2025-03-06', pirotecnia: 'Pirotecnia Zaragozana', cancelled: true },
    { date: '2025-03-07', pirotecnia: 'Reyes-Martí', cancelled: false },
    { date: '2025-03-08', pirotecnia: 'Pirotecnia Nadal-Martí', cancelled: false },
    { date: '2025-03-09', pirotecnia: 'Pirotecnia Alpujarreña', cancelled: false },
    { date: '2025-03-10', pirotecnia: 'Pirotecnia Turís', cancelled: false },
    { date: '2025-03-11', pirotecnia: 'Pirotecnia Tomas', cancelled: false },
    { date: '2025-03-12', pirotecnia: 'Pirotecnia Crespo', cancelled: false },
    { date: '2025-03-13', pirotecnia: 'Pirotecnia Tamarit', cancelled: false },
    { date: '2025-03-14', pirotecnia: 'Pirotecnia Hermanos Caballer', cancelled: false },
    { date: '2025-03-15', pirotecnia: 'Pirotecnia Aitana', cancelled: false },
    { date: '2025-03-16', pirotecnia: 'Pirotecnia Valenciana', cancelled: false },
    { date: '2025-03-17', pirotecnia: 'Pirotecnia Vulcano', cancelled: false },
    { date: '2025-03-18', pirotecnia: 'Pirotecnia del Mediterráneo', cancelled: false },
    { date: '2025-03-19', pirotecnia: 'Pirotecnia Caballer FX', cancelled: false, title_suffix: ' Final' }
  ];

  const mascletas = mascletasData.map(m => ({
    title_es: m.cancelled ? 'Mascletà (CANCELADA)' : `Mascletà${m.title_suffix || ''}`,
    title_en: m.cancelled ? 'Mascletà (CANCELLED)' : `Mascletà${m.title_suffix || ''}`,
    event_type: 'mascletà',
    start_time: `${m.date}T14:00:00+01:00`,
    location: 'Plaza del Ayuntamiento',
    lat: 39.4699,
    lng: -0.3774,
    pirotecnia: m.pirotecnia,
    is_cancelled: m.cancelled
  }));

  try {
    const mascletasResult = await supabaseRequest('events', mascletas);
    console.log(`   ✓ Inserted ${mascletasResult.length} Mascletàs`);
  } catch (e) {
    console.log(`   ✗ Error: ${e.message}`);
  }

  // 3. Insert Castillos (10 events)
  console.log('\n3. Inserting Castillos (fireworks)...');
  const castillos = [
    { title_es: 'Castillo de Fuegos', title_en: 'Fireworks Display', event_type: 'castillo', start_time: '2025-02-28T00:00:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, pirotecnia: 'Pirotecnia del Mediterráneo', is_cancelled: false },
    { title_es: 'Castillo de Fuegos', title_en: 'Fireworks Display', event_type: 'castillo', start_time: '2025-03-01T00:00:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, pirotecnia: 'Pirotecnia Gironina', is_cancelled: false },
    { title_es: 'Castillo de Fuegos', title_en: 'Fireworks Display', event_type: 'castillo', start_time: '2025-03-02T20:00:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, pirotecnia: 'Pirotecnia Zaragozana', is_cancelled: false },
    { title_es: 'Castillo de Fuegos', title_en: 'Fireworks Display', event_type: 'castillo', start_time: '2025-03-07T00:00:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, pirotecnia: 'Pirotecnia Pibierzo', is_cancelled: false },
    { title_es: 'Castillo de Fuegos', title_en: 'Fireworks Display', event_type: 'castillo', start_time: '2025-03-08T00:00:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, pirotecnia: 'Reyes-Martí', is_cancelled: false },
    { title_es: 'Castillo de Fuegos', title_en: 'Fireworks Display', event_type: 'castillo', start_time: '2025-03-09T20:00:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, pirotecnia: 'Pirotecnia Alto Palancia', is_cancelled: false },
    { title_es: 'Nit de l\'Albà', title_en: 'Night of Alba', event_type: 'castillo', start_time: '2025-03-15T00:00:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, pirotecnia: 'Pirotecnia Valenciana', is_cancelled: false },
    { title_es: 'Castillo de Fuegos', title_en: 'Fireworks Display', event_type: 'castillo', start_time: '2025-03-16T00:00:00+01:00', location: 'Palau de les Arts', lat: 39.4561, lng: -0.3545, pirotecnia: 'Pirotecnia Vulcano', best_viewing_location: 'Jardines del Túria, Puente de las Flores, Puente de la Exposición', is_cancelled: false },
    { title_es: 'Castillo de Fuegos', title_en: 'Fireworks Display', event_type: 'castillo', start_time: '2025-03-17T00:00:00+01:00', location: 'Palau de les Arts', lat: 39.4561, lng: -0.3545, pirotecnia: 'Pirotecnia Tamarit', best_viewing_location: 'Jardines del Túria, Puente de las Flores, Puente de la Exposición', is_cancelled: false },
    { title_es: 'Nit del Foc', title_en: 'Night of Fire', event_type: 'castillo', start_time: '2025-03-18T00:00:00+01:00', location: 'Palau de les Arts', lat: 39.4561, lng: -0.3545, pirotecnia: 'Pirotecnia Hermanos Caballer', best_viewing_location: 'Jardines del Túria, Puente de las Flores, Puente de la Exposición', is_cancelled: false }
  ];

  try {
    const castillosResult = await supabaseRequest('events', castillos);
    console.log(`   ✓ Inserted ${castillosResult.length} Castillos`);
  } catch (e) {
    console.log(`   ✗ Error: ${e.message}`);
  }

  // 4. Insert Main Events (11 events)
  console.log('\n4. Inserting main events...');
  const mainEvents = [
    { title_es: 'La Crida - Apertura Fallas 2025', title_en: 'La Crida - Fallas 2025 Opening', event_type: 'ceremonia', start_time: '2025-02-23T19:30:00+01:00', end_time: '2025-02-23T21:00:00+01:00', location: 'Torres de Serranos', lat: 39.4792, lng: -0.3759, description_es: 'Ceremonia oficial de apertura de las Fallas con la Fallera Mayor', description_en: 'Official Fallas opening ceremony with the Fallera Mayor', is_cancelled: false },
    { title_es: 'Cabalgata del Ninot', title_en: 'Ninot Parade', event_type: 'cabalgata', start_time: '2025-03-09T17:30:00+01:00', end_time: '2025-03-09T20:00:00+01:00', location: 'Calle de la Paz', lat: 39.4712, lng: -0.3738, description_es: 'Desfile tradicional con ninots y comparsas', description_en: 'Traditional parade with ninots and groups', is_cancelled: false },
    { title_es: 'Plantà Infantil', title_en: 'Children\'s Falla Installation', event_type: 'ceremonia', start_time: '2025-03-15T09:00:00+01:00', end_time: '2025-03-15T18:00:00+01:00', location: 'Toda la ciudad', lat: 39.4699, lng: -0.3774, description_es: 'Instalación de las fallas infantiles en toda la ciudad', description_en: 'Installation of children\'s fallas throughout the city', is_cancelled: false },
    { title_es: 'Plantà Mayor', title_en: 'Main Falla Installation', event_type: 'ceremonia', start_time: '2025-03-16T08:00:00+01:00', end_time: '2025-03-16T18:00:00+01:00', location: 'Toda la ciudad', lat: 39.4699, lng: -0.3774, description_es: 'Instalación de las fallas mayores en toda la ciudad', description_en: 'Installation of main fallas throughout the city', is_cancelled: false },
    { title_es: 'Ofrenda de Flores - Día 1', title_en: 'Flower Offering - Day 1', event_type: 'ofrenda', start_time: '2025-03-17T15:30:00+01:00', end_time: '2025-03-18T01:00:00+01:00', location: 'Plaza de la Virgen', lat: 39.4759, lng: -0.3752, description_es: 'Primer día de ofrenda floral a la Virgen de los Desamparados', description_en: 'First day of flower offering to the Virgin of the Forsaken', is_cancelled: false },
    { title_es: 'Ofrenda de Flores - Día 2', title_en: 'Flower Offering - Day 2', event_type: 'ofrenda', start_time: '2025-03-18T15:30:00+01:00', end_time: '2025-03-19T01:00:00+01:00', location: 'Plaza de la Virgen', lat: 39.4759, lng: -0.3752, description_es: 'Segundo día de ofrenda floral a la Virgen de los Desamparados', description_en: 'Second day of flower offering to the Virgin of the Forsaken', is_cancelled: false },
    { title_es: 'Correfoc', title_en: 'Fire Run', event_type: 'correfoc', start_time: '2025-03-19T19:00:00+01:00', end_time: '2025-03-19T20:30:00+01:00', location: 'Calle Colón', lat: 39.4692, lng: -0.3700, description_es: 'Desfile de fuego con demonios y carretillas', description_en: 'Fire run parade with demons and fire wheels', is_cancelled: false },
    { title_es: 'Cremà Infantil', title_en: 'Children\'s Falla Burning', event_type: 'cremà', start_time: '2025-03-19T20:00:00+01:00', end_time: '2025-03-19T21:00:00+01:00', location: 'Toda la ciudad', lat: 39.4699, lng: -0.3774, description_es: 'Quema de las fallas infantiles', description_en: 'Burning of children\'s fallas', is_cancelled: false },
    { title_es: 'Cremà Falla Infantil Municipal', title_en: 'Municipal Children\'s Falla Burning', event_type: 'cremà', start_time: '2025-03-19T21:00:00+01:00', end_time: '2025-03-19T21:30:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, description_es: 'Quema de la falla infantil municipal', description_en: 'Burning of the municipal children\'s falla', is_cancelled: false },
    { title_es: 'Cremà Mayor', title_en: 'Main Falla Burning', event_type: 'cremà', start_time: '2025-03-19T22:00:00+01:00', end_time: '2025-03-19T23:00:00+01:00', location: 'Toda la ciudad', lat: 39.4699, lng: -0.3774, description_es: 'Quema de las fallas mayores', description_en: 'Burning of main fallas', is_cancelled: false },
    { title_es: 'Cremà Falla Municipal', title_en: 'Municipal Falla Burning', event_type: 'cremà', start_time: '2025-03-19T23:00:00+01:00', end_time: '2025-03-19T23:59:00+01:00', location: 'Plaza del Ayuntamiento', lat: 39.4699, lng: -0.3774, description_es: 'Quema de la falla municipal - cierre oficial de las Fallas', description_en: 'Burning of the municipal falla - official end of Fallas', is_cancelled: false }
  ];

  try {
    const mainEventsResult = await supabaseRequest('events', mainEvents);
    console.log(`   ✓ Inserted ${mainEventsResult.length} main events`);
  } catch (e) {
    console.log(`   ✗ Error: ${e.message}`);
  }

  // 5. Insert Mercados (9 markets)
  console.log('\n5. Inserting Mercados...');
  const mercados = [
    { name: 'Mercado de Fallas de l\'Antiga de Campanar', location: 'Campanar', latitude: 39.4825, longitude: -0.3978, google_maps_link: 'https://maps.google.com/?q=39.4825,-0.3978' },
    { name: 'Mercado de la Falla Avenida Malvarrosa', location: 'Malvarrosa', latitude: 39.4804, longitude: -0.3283, google_maps_link: 'https://maps.google.com/?q=39.4804,-0.3283' },
    { name: 'Mercadito de la Falla Pelayo – Matemático Marzal', location: 'Centro', latitude: 39.4733, longitude: -0.3789, google_maps_link: 'https://maps.google.com/?q=39.4733,-0.3789' },
    { name: 'Mercadito de la Falla Convento Jerusalén', location: 'Centro', latitude: 39.4718, longitude: -0.3810, google_maps_link: 'https://maps.google.com/?q=39.4718,-0.3810' },
    { name: 'Mercado de la Falla Ferroviaria', location: 'Estación del Norte', latitude: 39.4661, longitude: -0.3772, google_maps_link: 'https://maps.google.com/?q=39.4661,-0.3772' },
    { name: 'Mercado de la Falla Cuba-Literato Azorín', location: 'Ruzafa', latitude: 39.4596, longitude: -0.3736, google_maps_link: 'https://maps.google.com/?q=39.4596,-0.3736' },
    { name: 'Mercado de la Falla Cuba-Puerto Rico', location: 'Ruzafa', latitude: 39.4588, longitude: -0.3722, google_maps_link: 'https://maps.google.com/?q=39.4588,-0.3722' },
    { name: 'Mercado de Falla Doctor Serrano-Carlos Cervera', location: 'Benimaclet', latitude: 39.4889, longitude: -0.3583, google_maps_link: 'https://maps.google.com/?q=39.4889,-0.3583' },
    { name: 'Mercado de la Falla Reino de Valencia', location: 'Pla del Real', latitude: 39.4756, longitude: -0.3644, google_maps_link: 'https://maps.google.com/?q=39.4756,-0.3644' }
  ];

  try {
    const mercadosResult = await supabaseRequest('mercados', mercados);
    console.log(`   ✓ Inserted ${mercadosResult.length} mercados`);
  } catch (e) {
    console.log(`   ✗ Error: ${e.message}`);
  }

  // 6. Insert Exhibitions (4 exhibitions)
  console.log('\n6. Inserting Exhibitions...');
  const exhibitions = [
    { name: 'Exposición del Ninot', location: 'Museo de las Ciencias', dates: 'Hasta 15 marzo', price: '3€', latitude: 39.4553, longitude: -0.3515, description_es: 'Exposición de ninots indultados de cada falla. Los visitantes pueden votar por su favorito.', description_en: 'Exhibition of pardoned ninots from each falla. Visitors can vote for their favorite.', website: 'https://www.cac.es' },
    { name: 'Exposición Falla Municipal', location: 'Centro del Carmen (CCCC)', dates: '7-19 marzo', price: 'Gratis', latitude: 39.4789, longitude: -0.3807, description_es: 'Exposición del proceso de creación de la falla municipal', description_en: 'Exhibition of the municipal falla creation process', website: 'https://www.consorcimuseus.gva.es/centro-del-carmen/' },
    { name: 'Museu Faller', location: 'Monteolivete', dates: 'Permanente', price: '2€', latitude: 39.4589, longitude: -0.3633, description_es: 'Museo dedicado a la historia de las Fallas con ninots indultados históricos', description_en: 'Museum dedicated to the history of Fallas with historical pardoned ninots', website: 'http://www.ffrv.es/es/museo-fallero/' },
    { name: 'Museu de l\'Artista Faller', location: 'Ciudad Fallera', dates: 'Permanente', price: 'Gratis', latitude: 39.4961, longitude: -0.4148, description_es: 'Museo sobre el arte y oficio de los artistas falleros', description_en: 'Museum about the art and craft of falla artists', website: null }
  ];

  try {
    const exhibitionsResult = await supabaseRequest('exhibitions', exhibitions);
    console.log(`   ✓ Inserted ${exhibitionsResult.length} exhibitions`);
  } catch (e) {
    console.log(`   ✗ Error: ${e.message}`);
  }

  console.log('\n========================================');
  console.log('SUMMARY:');
  console.log('- Event types: 8');
  console.log('- Mascletàs: 20 (3 cancelled)');
  console.log('- Castillos: 10');
  console.log('- Main events: 11');
  console.log('- Mercados: 9');
  console.log('- Exhibitions: 4');
  console.log('TOTAL: 62 records');
  console.log('========================================');
}

main().catch(console.error);
