const SUPABASE_URL = 'https://symayyolvynvynomgtgl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FWscmRem-aN095lbgCnLNQ_fXYw3AMP';

// Координаты локаций
const LOCATIONS = {
  'Plaza Ayuntamiento': { lat: 39.4699, lng: -0.3763 },
  'Palau de les Arts': { lat: 39.4558, lng: -0.3536 },
  'Torres de Serranos': { lat: 39.4792, lng: -0.3756 },
  'Calle de la Paz': { lat: 39.4710, lng: -0.3740 },
  'Plaza de la Virgen': { lat: 39.4756, lng: -0.3750 },
  'Calle Colón': { lat: 39.4690, lng: -0.3710 }
};

// Все события
const events = [];

// === МАСКЛЕТЫ (23 feb - 19 mar, 14:00) ===
const mascletasData = [
  { date: '2025-02-23', pirotecnia: 'Pirotecnia Valenciana' },
  { date: '2025-03-01', pirotecnia: 'Pirotecnia Peñarroja' },
  { date: '2025-03-02', pirotecnia: 'Pirotecnia Gironina' },
  { date: '2025-03-03', pirotecnia: 'Pirotecnia Alto Palancia' },
  { date: '2025-03-04', pirotecnia: 'Pirotecnia Dragón', cancelled: true },
  { date: '2025-03-05', pirotecnia: 'Pirotecnia Pibierzo', cancelled: true },
  { date: '2025-03-06', pirotecnia: 'Pirotecnia Zaragozana', cancelled: true },
  { date: '2025-03-07', pirotecnia: 'Reyes-Martí' },
  { date: '2025-03-08', pirotecnia: 'Pirotecnia Nadal-Martí' },
  { date: '2025-03-09', pirotecnia: 'Pirotecnia Alpujarreña' },
  { date: '2025-03-10', pirotecnia: 'Pirotecnia Turís' },
  { date: '2025-03-11', pirotecnia: 'Pirotecnia Tomas' },
  { date: '2025-03-12', pirotecnia: 'Pirotecnia Crespo' },
  { date: '2025-03-13', pirotecnia: 'Pirotecnia Tamarit' },
  { date: '2025-03-14', pirotecnia: 'Pirotecnia Hermanos Caballer' },
  { date: '2025-03-15', pirotecnia: 'Pirotecnia Aitana' },
  { date: '2025-03-16', pirotecnia: 'Pirotecnia Valenciana' },
  { date: '2025-03-17', pirotecnia: 'Pirotecnia Vulcano' },
  { date: '2025-03-18', pirotecnia: 'Pirotecnia del Mediterráneo' },
  { date: '2025-03-19', pirotecnia: 'Pirotecnia Caballer FX' }
];

mascletasData.forEach(m => {
  const dateObj = new Date(m.date);
  const dayName = dateObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  events.push({
    title: m.cancelled ? `Mascletà - ${m.pirotecnia} (CANCELADA)` : `Mascletà - ${m.pirotecnia}`,
    description: m.cancelled 
      ? `Mascletà cancelada por lluvia. ${m.pirotecnia}`
      : `Espectáculo pirotécnico diurno a cargo de ${m.pirotecnia}. Plaza del Ayuntamiento.`,
    start_time: `${m.date}T14:00:00+01:00`,
    location: 'Plaza del Ayuntamiento',
    event_type: 'mascletà',
    pirotecnia: m.pirotecnia,
    best_viewing_location: 'Plaza del Ayuntamiento - llegar mínimo 30 min antes'
  });
});

// === САЛЮТЫ (Castillos) ===
const castillosData = [
  { date: '2025-02-28', time: '00:00', location: 'Plaza Ayuntamiento', pirotecnia: 'Pirotecnia del Mediterráneo' },
  { date: '2025-03-01', time: '00:00', location: 'Plaza Ayuntamiento', pirotecnia: 'Pirotecnia Gironina' },
  { date: '2025-03-02', time: '20:00', location: 'Plaza Ayuntamiento', pirotecnia: 'Pirotecnia Zaragozana' },
  { date: '2025-03-07', time: '00:00', location: 'Plaza Ayuntamiento', pirotecnia: 'Pirotecnia Pibierzo' },
  { date: '2025-03-08', time: '00:00', location: 'Plaza Ayuntamiento', pirotecnia: 'Reyes-Martí' },
  { date: '2025-03-09', time: '20:00', location: 'Plaza Ayuntamiento', pirotecnia: 'Pirotecnia Alto Palancia' },
  { date: '2025-03-15', time: '00:00', location: 'Plaza Ayuntamiento', pirotecnia: 'Pirotecnia Valenciana', special: 'Nit de l\'Albà' },
  { date: '2025-03-16', time: '00:00', location: 'Palau de les Arts', pirotecnia: 'Pirotecnia Vulcano' },
  { date: '2025-03-17', time: '00:00', location: 'Palau de les Arts', pirotecnia: 'Pirotecnia Tamarit' },
  { date: '2025-03-18', time: '00:00', location: 'Palau de les Arts', pirotecnia: 'Pirotecnia Hermanos Caballer', special: 'Nit del Foc' }
];

castillosData.forEach(c => {
  const title = c.special 
    ? `Castillo - ${c.special} (${c.pirotecnia})`
    : `Castillo - ${c.pirotecnia}`;
  
  const isPalau = c.location.includes('Palau');
  
  events.push({
    title: title,
    description: c.special
      ? `${c.special}. Espectáculo de fuegos artificiales a cargo de ${c.pirotecnia}.`
      : `Espectáculo nocturno de fuegos artificiales a cargo de ${c.pirotecnia}.`,
    start_time: `${c.date}T${c.time}:00+01:00`,
    location: c.location,
    event_type: 'castillo',
    pirotecnia: c.pirotecnia,
    best_viewing_location: isPalau 
      ? 'Jardines del Turia, evitar puentes (cerrados)'
      : 'Plaza del Ayuntamiento o calles adyacentes'
  });
});

// === EVENTOS PRINCIPALES ===
const mainEvents = [
  {
    title: 'La Crida',
    description: 'Inicio oficial de las Fallas. La Fallera Mayor proclama el comienzo de las fiestas desde las Torres de Serranos.',
    start_time: '2025-02-23T19:30:00+01:00',
    location: 'Torres de Serranos',
    event_type: 'general',
    best_viewing_location: 'Plaza de los Fueros o Calle Serranos'
  },
  {
    title: 'Cabalgata del Ninot',
    description: 'Desfile tradicional de ninots y carrozas por las calles del centro.',
    start_time: '2025-03-09T17:30:00+01:00',
    location: 'Calle de la Paz',
    event_type: 'cabalgata',
    best_viewing_location: 'Calle de la Paz o Plaza de la Reina'
  },
  {
    title: 'Plantà Infantil',
    description: 'Colocación de los monumentos falleros infantiles en toda la ciudad.',
    start_time: '2025-03-15T09:00:00+01:00',
    location: 'Toda la ciudad',
    event_type: 'plantà',
    best_viewing_location: 'Diferentes barrios de Valencia'
  },
  {
    title: 'Plantà Mayor',
    description: 'Colocación de los monumentos falleros mayores. Los artistas dan los últimos retoques.',
    start_time: '2025-03-16T08:00:00+01:00',
    location: 'Toda la ciudad',
    event_type: 'plantà',
    best_viewing_location: 'Sección Especial en Plaza del Ayuntamiento'
  },
  {
    title: 'Ofrenda de Flores - Día 1',
    description: 'Miles de falleras ofrecen flores a la Virgen de los Desamparados. Primer día de la ofrenda.',
    start_time: '2025-03-17T15:30:00+01:00',
    location: 'Plaza de la Virgen',
    event_type: 'ofrenda',
    best_viewing_location: 'Calle San Vicente o Plaza de la Virgen'
  },
  {
    title: 'Ofrenda de Flores - Día 2',
    description: 'Segundo día de la ofrenda. Continuación del desfile de falleras con flores.',
    start_time: '2025-03-18T15:30:00+01:00',
    location: 'Plaza de la Virgen',
    event_type: 'ofrenda',
    best_viewing_location: 'Calle San Vicente o Plaza de la Virgen'
  },
  {
    title: 'Correfoc',
    description: 'Espectáculo de fuego con diablos y petardos corriendo por las calles.',
    start_time: '2025-03-19T19:00:00+01:00',
    location: 'Calle Colón',
    event_type: 'general',
    best_viewing_location: 'Calle Colón - ¡llevar ropa vieja y gorra!'
  },
  {
    title: 'Cremà Infantil',
    description: 'Quema de las fallas infantiles en toda la ciudad.',
    start_time: '2025-03-19T20:00:00+01:00',
    location: 'Toda la ciudad',
    event_type: 'cremà',
    best_viewing_location: 'Cualquier falla infantil de tu barrio'
  },
  {
    title: 'Cremà Mayor',
    description: 'Quema de las fallas mayores. El fuego consume los monumentos en toda Valencia.',
    start_time: '2025-03-19T22:00:00+01:00',
    location: 'Toda la ciudad',
    event_type: 'cremà',
    best_viewing_location: 'Fallas de Sección Especial'
  },
  {
    title: 'Cremà Municipal',
    description: 'La última falla en arder. Cierre oficial de las Fallas con la quema de la falla del Ayuntamiento.',
    start_time: '2025-03-19T23:00:00+01:00',
    location: 'Plaza del Ayuntamiento',
    event_type: 'cremà',
    best_viewing_location: 'Plaza del Ayuntamiento - llegar muy temprano'
  }
];

mainEvents.forEach(e => {
  events.push({
    ...e,
    pirotecnia: e.pirotecnia || null
  });
});

// Нормализовать все записи - добавить недостающие поля
const normalizedEvents = events.map(e => ({
  title: e.title,
  description: e.description,
  start_time: e.start_time,
  location: e.location,
  event_type: e.event_type,
  pirotecnia: e.pirotecnia || null,
  best_viewing_location: e.best_viewing_location || null,
  external_link: e.external_link || null
}));

// === INSERT INTO SUPABASE ===
async function insertEvents() {
  console.log(`Total eventos a insertar: ${normalizedEvents.length}`);
  
  // Primero eliminar eventos existentes de 2025
  console.log('Eliminando eventos existentes de 2025...');
  const deleteUrl = `${SUPABASE_URL}/rest/v1/events?start_time=gte.2025-01-01&start_time=lt.2026-01-01`;
  
  const deleteRes = await fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=representation'
    }
  });
  
  const deleted = await deleteRes.json().catch(() => []);
  console.log(`Eliminados: ${Array.isArray(deleted) ? deleted.length : 0} registros`);
  
  // Insertar nuevos eventos
  console.log('Insertando nuevos eventos...');
  const insertUrl = `${SUPABASE_URL}/rest/v1/events`;
  
  const insertRes = await fetch(insertUrl, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(normalizedEvents)
  });
  
  if (!insertRes.ok) {
    const err = await insertRes.text();
    console.error('Error al insertar:', err);
    return;
  }
  
  const inserted = await insertRes.json();
  console.log(`Insertados: ${inserted.length} eventos`);
  
  // Resumen por tipo
  const byType = {};
  normalizedEvents.forEach(e => {
    byType[e.event_type] = (byType[e.event_type] || 0) + 1;
  });
  console.log('\nResumen por tipo:');
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
}

insertEvents().catch(console.error);
