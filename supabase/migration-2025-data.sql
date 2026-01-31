-- Migration: Fallas 2025 Data Import
-- Date: 2025-02-02

------------------------------------------------------------
-- 1. ADD NEW COLUMNS TO EVENTS TABLE
------------------------------------------------------------
ALTER TABLE events ADD COLUMN IF NOT EXISTS event_type VARCHAR(50);
ALTER TABLE events ADD COLUMN IF NOT EXISTS pirotecnia VARCHAR(100);
ALTER TABLE events ADD COLUMN IF NOT EXISTS external_link VARCHAR(500);
ALTER TABLE events ADD COLUMN IF NOT EXISTS best_viewing_location TEXT;

------------------------------------------------------------
-- 2. CREATE MERCADOS TABLE
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mercados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  google_maps_link TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE mercados ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read mercados" ON mercados FOR SELECT USING (true);

------------------------------------------------------------
-- 3. CREATE EXHIBITIONS TABLE
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS exhibitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  dates VARCHAR(100),
  price VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description_es TEXT,
  description_en TEXT,
  website TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE exhibitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read exhibitions" ON exhibitions FOR SELECT USING (true);

------------------------------------------------------------
-- 4. INSERT EVENT TYPES
------------------------------------------------------------
INSERT INTO event_types (name_es, name_en, icon, color, description_es, description_en) VALUES
  ('Mascletà', 'Mascletà', '💥', '#FF4500', 'Espectáculo pirotécnico diurno con petardos', 'Daytime pyrotechnic show with firecrackers'),
  ('Castillo', 'Fireworks', '🎆', '#FFD700', 'Fuegos artificiales nocturnos', 'Night fireworks display'),
  ('Cremà', 'Cremà', '🔥', '#FF6B35', 'Quema de las fallas', 'Burning of the fallas'),
  ('Ofrenda', 'Ofrenda', '💐', '#FF69B4', 'Ofrenda de flores a la Virgen', 'Flower offering to the Virgin'),
  ('Cabalgata', 'Parade', '🎭', '#9B59B6', 'Desfile tradicional', 'Traditional parade'),
  ('Despertà', 'Despertà', '🎺', '#3498DB', 'Despertar matutino con petardos', 'Morning wake-up with firecrackers'),
  ('Correfoc', 'Correfoc', '👹', '#E74C3C', 'Desfile con fuego y demonios', 'Fire run with demons'),
  ('Ceremonia', 'Ceremony', '🏛️', '#2ECC71', 'Evento ceremonial oficial', 'Official ceremonial event')
ON CONFLICT DO NOTHING;

------------------------------------------------------------
-- 5. INSERT MASCLETÀS (14:00, Plaza Ayuntamiento)
------------------------------------------------------------
INSERT INTO events (title_es, title_en, event_type, start_time, location, lat, lng, pirotecnia, is_cancelled) VALUES
  ('Mascletà', 'Mascletà', 'mascletà', '2025-02-23 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Valenciana', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-01 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Peñarroja', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-02 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Gironina', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-03 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Alto Palancia', false),
  ('Mascletà (CANCELADA)', 'Mascletà (CANCELLED)', 'mascletà', '2025-03-04 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Dragón', true),
  ('Mascletà (CANCELADA)', 'Mascletà (CANCELLED)', 'mascletà', '2025-03-05 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Pibierzo', true),
  ('Mascletà (CANCELADA)', 'Mascletà (CANCELLED)', 'mascletà', '2025-03-06 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Zaragozana', true),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-07 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Reyes-Martí', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-08 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Nadal-Martí', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-09 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Alpujarreña', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-10 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Turís', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-11 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Tomas', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-12 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Crespo', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-13 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Tamarit', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-14 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Hermanos Caballer', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-15 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Aitana', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-16 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Valenciana', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-17 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Vulcano', false),
  ('Mascletà', 'Mascletà', 'mascletà', '2025-03-18 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia del Mediterráneo', false),
  ('Mascletà Final', 'Final Mascletà', 'mascletà', '2025-03-19 14:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Caballer FX', false);

------------------------------------------------------------
-- 6. INSERT CASTILLOS (FIREWORKS)
------------------------------------------------------------
INSERT INTO events (title_es, title_en, event_type, start_time, location, lat, lng, pirotecnia, best_viewing_location, is_cancelled) VALUES
  ('Castillo de Fuegos', 'Fireworks Display', 'castillo', '2025-02-28 00:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia del Mediterráneo', NULL, false),
  ('Castillo de Fuegos', 'Fireworks Display', 'castillo', '2025-03-01 00:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Gironina', NULL, false),
  ('Castillo de Fuegos', 'Fireworks Display', 'castillo', '2025-03-02 20:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Zaragozana', NULL, false),
  ('Castillo de Fuegos', 'Fireworks Display', 'castillo', '2025-03-07 00:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Pibierzo', NULL, false),
  ('Castillo de Fuegos', 'Fireworks Display', 'castillo', '2025-03-08 00:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Reyes-Martí', NULL, false),
  ('Castillo de Fuegos', 'Fireworks Display', 'castillo', '2025-03-09 20:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Alto Palancia', NULL, false),
  ('Nit de l''Albà', 'Night of Alba', 'castillo', '2025-03-15 00:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Pirotecnia Valenciana', NULL, false),
  ('Castillo de Fuegos', 'Fireworks Display', 'castillo', '2025-03-16 00:00:00+01', 'Palau de les Arts', 39.4561, -0.3545, 'Pirotecnia Vulcano', 'Jardines del Túria, Puente de las Flores, Puente de la Exposición', false),
  ('Castillo de Fuegos', 'Fireworks Display', 'castillo', '2025-03-17 00:00:00+01', 'Palau de les Arts', 39.4561, -0.3545, 'Pirotecnia Tamarit', 'Jardines del Túria, Puente de las Flores, Puente de la Exposición', false),
  ('Nit del Foc', 'Night of Fire', 'castillo', '2025-03-18 00:00:00+01', 'Palau de les Arts', 39.4561, -0.3545, 'Pirotecnia Hermanos Caballer', 'Jardines del Túria, Puente de las Flores, Puente de la Exposición', false);

------------------------------------------------------------
-- 7. INSERT MAIN EVENTS
------------------------------------------------------------
INSERT INTO events (title_es, title_en, event_type, start_time, end_time, location, lat, lng, description_es, description_en, is_cancelled) VALUES
  -- Crida
  ('La Crida - Apertura Fallas 2025', 'La Crida - Fallas 2025 Opening', 'ceremonia', '2025-02-23 19:30:00+01', '2025-02-23 21:00:00+01', 'Torres de Serranos', 39.4792, -0.3759, 'Ceremonia oficial de apertura de las Fallas con la Fallera Mayor', 'Official Fallas opening ceremony with the Fallera Mayor', false),
  
  -- Cabalgata del Ninot
  ('Cabalgata del Ninot', 'Ninot Parade', 'cabalgata', '2025-03-09 17:30:00+01', '2025-03-09 20:00:00+01', 'Calle de la Paz', 39.4712, -0.3738, 'Desfile tradicional con ninots y comparsas', 'Traditional parade with ninots and groups', false),
  
  -- Plantà
  ('Plantà Infantil', 'Children''s Falla Installation', 'ceremonia', '2025-03-15 09:00:00+01', '2025-03-15 18:00:00+01', 'Toda la ciudad', 39.4699, -0.3774, 'Instalación de las fallas infantiles en toda la ciudad', 'Installation of children''s fallas throughout the city', false),
  ('Plantà Mayor', 'Main Falla Installation', 'ceremonia', '2025-03-16 08:00:00+01', '2025-03-16 18:00:00+01', 'Toda la ciudad', 39.4699, -0.3774, 'Instalación de las fallas mayores en toda la ciudad', 'Installation of main fallas throughout the city', false),
  
  -- Ofrenda
  ('Ofrenda de Flores - Día 1', 'Flower Offering - Day 1', 'ofrenda', '2025-03-17 15:30:00+01', '2025-03-18 01:00:00+01', 'Plaza de la Virgen', 39.4759, -0.3752, 'Primer día de ofrenda floral a la Virgen de los Desamparados', 'First day of flower offering to the Virgin of the Forsaken', false),
  ('Ofrenda de Flores - Día 2', 'Flower Offering - Day 2', 'ofrenda', '2025-03-18 15:30:00+01', '2025-03-19 01:00:00+01', 'Plaza de la Virgen', 39.4759, -0.3752, 'Segundo día de ofrenda floral a la Virgen de los Desamparados', 'Second day of flower offering to the Virgin of the Forsaken', false),
  
  -- Correfoc
  ('Correfoc', 'Fire Run', 'correfoc', '2025-03-19 19:00:00+01', '2025-03-19 20:30:00+01', 'Calle Colón', 39.4692, -0.3700, 'Desfile de fuego con demonios y carretillas', 'Fire run parade with demons and fire wheels', false),
  
  -- Cremàs
  ('Cremà Infantil', 'Children''s Falla Burning', 'cremà', '2025-03-19 20:00:00+01', '2025-03-19 21:00:00+01', 'Toda la ciudad', 39.4699, -0.3774, 'Quema de las fallas infantiles', 'Burning of children''s fallas', false),
  ('Cremà Falla Infantil Municipal', 'Municipal Children''s Falla Burning', 'cremà', '2025-03-19 21:00:00+01', '2025-03-19 21:30:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Quema de la falla infantil municipal', 'Burning of the municipal children''s falla', false),
  ('Cremà Mayor', 'Main Falla Burning', 'cremà', '2025-03-19 22:00:00+01', '2025-03-19 23:00:00+01', 'Toda la ciudad', 39.4699, -0.3774, 'Quema de las fallas mayores', 'Burning of main fallas', false),
  ('Cremà Falla Municipal', 'Municipal Falla Burning', 'cremà', '2025-03-19 23:00:00+01', '2025-03-19 23:59:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3774, 'Quema de la falla municipal - cierre oficial de las Fallas', 'Burning of the municipal falla - official end of Fallas', false);

------------------------------------------------------------
-- 8. INSERT MERCADOS (MARKETS)
------------------------------------------------------------
INSERT INTO mercados (name, location, latitude, longitude, google_maps_link) VALUES
  ('Mercado de Fallas de l''Antiga de Campanar', 'Campanar', 39.4825, -0.3978, 'https://maps.google.com/?q=39.4825,-0.3978'),
  ('Mercado de la Falla Avenida Malvarrosa', 'Malvarrosa', 39.4804, -0.3283, 'https://maps.google.com/?q=39.4804,-0.3283'),
  ('Mercadito de la Falla Pelayo – Matemático Marzal', 'Centro', 39.4733, -0.3789, 'https://maps.google.com/?q=39.4733,-0.3789'),
  ('Mercadito de la Falla Convento Jerusalén', 'Centro', 39.4718, -0.3810, 'https://maps.google.com/?q=39.4718,-0.3810'),
  ('Mercado de la Falla Ferroviaria', 'Estación del Norte', 39.4661, -0.3772, 'https://maps.google.com/?q=39.4661,-0.3772'),
  ('Mercado de la Falla Cuba-Literato Azorín', 'Ruzafa', 39.4596, -0.3736, 'https://maps.google.com/?q=39.4596,-0.3736'),
  ('Mercado de la Falla Cuba-Puerto Rico', 'Ruzafa', 39.4588, -0.3722, 'https://maps.google.com/?q=39.4588,-0.3722'),
  ('Mercado de Falla Doctor Serrano-Carlos Cervera', 'Benimaclet', 39.4889, -0.3583, 'https://maps.google.com/?q=39.4889,-0.3583'),
  ('Mercado de la Falla Reino de Valencia', 'Pla del Real', 39.4756, -0.3644, 'https://maps.google.com/?q=39.4756,-0.3644');

------------------------------------------------------------
-- 9. INSERT EXHIBITIONS
------------------------------------------------------------
INSERT INTO exhibitions (name, location, dates, price, latitude, longitude, description_es, description_en, website) VALUES
  ('Exposición del Ninot', 'Museo de las Ciencias', 'Hasta 15 marzo', '3€', 39.4553, -0.3515, 'Exposición de ninots indultados de cada falla. Los visitantes pueden votar por su favorito.', 'Exhibition of pardoned ninots from each falla. Visitors can vote for their favorite.', 'https://www.cac.es'),
  ('Exposición Falla Municipal', 'Centro del Carmen (CCCC)', '7-19 marzo', 'Gratis', 39.4789, -0.3807, 'Exposición del proceso de creación de la falla municipal', 'Exhibition of the municipal falla creation process', 'https://www.consorcimuseus.gva.es/centro-del-carmen/'),
  ('Museu Faller', 'Monteolivete', 'Permanente', '2€', 39.4589, -0.3633, 'Museo dedicado a la historia de las Fallas con ninots indultados históricos', 'Museum dedicated to the history of Fallas with historical pardoned ninots', 'http://www.ffrv.es/es/museo-fallero/'),
  ('Museu de l''Artista Faller', 'Ciudad Fallera', 'Permanente', 'Gratis', 39.4961, -0.4148, 'Museo sobre el arte y oficio de los artistas falleros', 'Museum about the art and craft of falla artists', NULL);
