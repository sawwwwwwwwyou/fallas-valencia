-- Fallas Valencia Seed Data
-- Real data from Valencia

-- Categories (6 категорий)
INSERT INTO categories (name_es, name_en, color, icon, sort_order) VALUES
  ('Sección Especial', 'Special Section', '#FFD700', '⭐', 1),
  ('Primera A', 'First A', '#FF6B35', '🔥', 2),
  ('Primera B', 'First B', '#FF8C42', '🔥', 3),
  ('Segunda A', 'Second A', '#FFA07A', '🔥', 4),
  ('Segunda B', 'Second B', '#FFB347', '🔥', 5),
  ('Infantil', 'Children', '#87CEEB', '👶', 6);

-- Event Types (8 типов событий)
INSERT INTO event_types (name_es, name_en, icon, color, description_es, description_en) VALUES
  ('Mascletà', 'Mascletà', '🎇', '#FF4500', 'Espectáculo pirotécnico diurno en la Plaza del Ayuntamiento', 'Daytime fireworks show at City Hall Square'),
  ('Castillo', 'Fireworks', '🎆', '#9400D3', 'Fuegos artificiales nocturnos', 'Nighttime fireworks display'),
  ('Cremà', 'Burning', '🔥', '#FF0000', 'Quema de las fallas', 'Burning of the fallas'),
  ('Ofrenda', 'Flower Offering', '🌹', '#FF69B4', 'Ofrenda de flores a la Virgen', 'Flower offering to the Virgin'),
  ('Plantà', 'Installation', '🏗️', '#4CAF50', 'Instalación de las fallas', 'Installation of the fallas'),
  ('Despertà', 'Wake-up Call', '🎺', '#FFD700', 'Despertar con petardos por las calles', 'Wake-up call with firecrackers'),
  ('Cabalgata', 'Parade', '🎪', '#9C27B0', 'Desfile fallero', 'Fallas parade'),
  ('Nit del Foc', 'Night of Fire', '✨', '#FF1493', 'Gran castillo de fuegos artificiales', 'Grand fireworks display');

-- POI Types (5 типов)
INSERT INTO poi_types (name_es, name_en, icon) VALUES
  ('Restaurante', 'Restaurant', '🍽️'),
  ('Museo', 'Museum', '🏛️'),
  ('Feria', 'Fair', '🎪'),
  ('Horchatería', 'Horchata Shop', '🥤'),
  ('Tienda pirotecnia', 'Fireworks Shop', '🧨');

-- Fallas (15 реальных фальяс из Валенсии)
INSERT INTO fallas (name, category_id, address, lat, lng, description_es, description_en, artist, is_featured) VALUES
  ('Falla Plaza del Ayuntamiento', (SELECT id FROM categories WHERE name_es = 'Sección Especial'), 'Plaza del Ayuntamiento, Valencia', 39.4699, -0.3763, 'La falla oficial del Ayuntamiento de Valencia', 'The official falla of Valencia City Hall', 'Varios artistas', true),
  ('Falla Na Jordana', (SELECT id FROM categories WHERE name_es = 'Sección Especial'), 'C/ Na Jordana, Valencia', 39.4789, -0.3772, 'Una de las fallas más antiguas y prestigiosas', 'One of the oldest and most prestigious fallas', 'Manolo Martín', true),
  ('Falla Convento Jerusalén', (SELECT id FROM categories WHERE name_es = 'Sección Especial'), 'C/ Convento Jerusalén - Matemático Marzal', 39.4652, -0.3789, 'Conocida por sus críticas sociales', 'Known for its social criticism', 'José Ramón Espuig', true),
  ('Falla Exposición', (SELECT id FROM categories WHERE name_es = 'Primera A'), 'C/ Exposición, Valencia', 39.4621, -0.3687, 'Ubicada junto a los Jardines del Turia', 'Located next to Turia Gardens', 'Latorre y Sanz', false),
  ('Falla Cuba-Literato Azorín', (SELECT id FROM categories WHERE name_es = 'Primera A'), 'C/ Cuba - Literato Azorín', 39.4589, -0.3754, 'Falla del barrio de Ruzafa', 'Falla from Ruzafa neighborhood', 'Vicente Llácer', false),
  ('Falla Sueca-Literato Azorín', (SELECT id FROM categories WHERE name_es = 'Sección Especial'), 'C/ Sueca - Literato Azorín', 39.4612, -0.3721, 'Una de las más emblemáticas de Ruzafa', 'One of the most emblematic in Ruzafa', 'Paco Torres', true),
  ('Falla Plaza del Pilar', (SELECT id FROM categories WHERE name_es = 'Primera B'), 'Plaza del Pilar, Valencia', 39.4754, -0.3756, 'Falla tradicional del centro histórico', 'Traditional falla from historic center', 'Luis Herrero', false),
  ('Falla Almirante Cadarso', (SELECT id FROM categories WHERE name_es = 'Primera A'), 'C/ Almirante Cadarso, Valencia', 39.4635, -0.3698, 'Gran falla con temáticas variadas', 'Large falla with varied themes', 'Julio Monterrubio', false),
  ('Falla Reino de Valencia', (SELECT id FROM categories WHERE name_es = 'Segunda A'), 'C/ Reino de Valencia, Valencia', 39.4701, -0.3634, 'Falla del ensanche valenciano', 'Falla from Valencia expansion area', 'Sergio Alarcón', false),
  ('Falla Maestro Gozalbo', (SELECT id FROM categories WHERE name_es = 'Segunda A'), 'C/ Maestro Gozalbo, Valencia', 39.4678, -0.3712, 'Falla con gran tradición barrial', 'Falla with strong neighborhood tradition', 'José Manuel Alares', false),
  ('Falla Doctor Collado', (SELECT id FROM categories WHERE name_es = 'Primera B'), 'C/ Doctor Collado, Valencia', 39.4734, -0.3689, 'Ubicada en el barrio del Carmen', 'Located in El Carmen neighborhood', 'David Sánchez', false),
  ('Falla Lepanto-Guillem de Castro', (SELECT id FROM categories WHERE name_es = 'Segunda B'), 'C/ Lepanto - Guillem de Castro', 39.4745, -0.3801, 'Falla con diseños innovadores', 'Falla with innovative designs', 'Pere Baenas', false),
  ('Falla Plaza de la Merced', (SELECT id FROM categories WHERE name_es = 'Infantil'), 'Plaza de la Merced, Valencia', 39.4712, -0.3778, 'Falla infantil muy querida', 'Beloved children falla', 'Marina Buenaventura', false),
  ('Falla Mosen Sorell', (SELECT id FROM categories WHERE name_es = 'Sección Especial'), 'C/ Mosen Sorell, Valencia', 39.4782, -0.3749, 'Falla de gran tamaño y detalle', 'Large and detailed falla', 'Ceballos y Sanabria', true),
  ('Falla L''Antiga de Campanar', (SELECT id FROM categories WHERE name_es = 'Primera A'), 'Campanar, Valencia', 39.4823, -0.3912, 'Histórica falla del barrio de Campanar', 'Historic falla from Campanar neighborhood', 'Ramón Espí', false);

-- Events (15 eventos para Fallas 2025)
INSERT INTO events (event_type_id, falla_id, title_es, title_en, start_time, end_time, location, lat, lng, description_es, description_en) VALUES
  ((SELECT id FROM event_types WHERE name_es = 'Mascletà'), NULL, 'Mascletà oficial 1 de marzo', 'Official Mascletà March 1', '2025-03-01 14:00:00+01', '2025-03-01 14:20:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3763, 'Primera mascletà oficial de Fallas 2025', 'First official mascletà of Fallas 2025'),
  ((SELECT id FROM event_types WHERE name_es = 'Mascletà'), NULL, 'Mascletà 15 de marzo', 'Mascletà March 15', '2025-03-15 14:00:00+01', '2025-03-15 14:20:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3763, 'Mascletà a mitad de fiestas', 'Mid-festival mascletà'),
  ((SELECT id FROM event_types WHERE name_es = 'Plantà'), NULL, 'Plantà general infantil', 'Children Plantà', '2025-03-15 08:00:00+01', '2025-03-15 23:59:00+01', 'Toda Valencia', NULL, NULL, 'Instalación de todas las fallas infantiles', 'Installation of all children fallas'),
  ((SELECT id FROM event_types WHERE name_es = 'Plantà'), NULL, 'Plantà general mayores', 'Adult Plantà', '2025-03-16 08:00:00+01', '2025-03-16 23:59:00+01', 'Toda Valencia', NULL, NULL, 'Instalación de todas las fallas mayores', 'Installation of all adult fallas'),
  ((SELECT id FROM event_types WHERE name_es = 'Ofrenda'), NULL, 'Ofrenda a la Virgen - Día 1', 'Flower Offering - Day 1', '2025-03-17 16:00:00+01', '2025-03-17 23:00:00+01', 'Plaza de la Virgen', 39.4757, -0.3753, 'Primer día de ofrenda de flores', 'First day of flower offering'),
  ((SELECT id FROM event_types WHERE name_es = 'Ofrenda'), NULL, 'Ofrenda a la Virgen - Día 2', 'Flower Offering - Day 2', '2025-03-18 16:00:00+01', '2025-03-18 23:00:00+01', 'Plaza de la Virgen', 39.4757, -0.3753, 'Segundo día de ofrenda de flores', 'Second day of flower offering'),
  ((SELECT id FROM event_types WHERE name_es = 'Castillo'), NULL, 'Castillo 17 de marzo', 'Fireworks March 17', '2025-03-17 01:00:00+01', '2025-03-17 01:30:00+01', 'Paseo de la Alameda', 39.4739, -0.3641, 'Espectáculo nocturno de fuegos artificiales', 'Nighttime fireworks display'),
  ((SELECT id FROM event_types WHERE name_es = 'Nit del Foc'), NULL, 'Nit del Foc', 'Night of Fire', '2025-03-18 01:00:00+01', '2025-03-18 02:00:00+01', 'Paseo de la Alameda', 39.4739, -0.3641, 'El mayor espectáculo pirotécnico de las fiestas', 'The biggest fireworks show of the festival'),
  ((SELECT id FROM event_types WHERE name_es = 'Cabalgata'), NULL, 'Cabalgata del Ninot', 'Ninot Parade', '2025-03-16 18:00:00+01', '2025-03-16 20:00:00+01', 'Centro de Valencia', 39.4699, -0.3763, 'Desfile de las comisiones falleras', 'Parade of fallas commissions'),
  ((SELECT id FROM event_types WHERE name_es = 'Despertà'), NULL, 'Despertà 19 de marzo', 'Wake-up Call March 19', '2025-03-19 07:30:00+01', '2025-03-19 08:30:00+01', 'Toda Valencia', NULL, NULL, 'Última despertà de las fiestas', 'Last wake-up call of the festival'),
  ((SELECT id FROM event_types WHERE name_es = 'Cremà'), NULL, 'Cremà infantil', 'Children Cremà', '2025-03-19 22:00:00+01', '2025-03-19 23:00:00+01', 'Toda Valencia', NULL, NULL, 'Quema de todas las fallas infantiles', 'Burning of all children fallas'),
  ((SELECT id FROM event_types WHERE name_es = 'Cremà'), NULL, 'Cremà general', 'General Cremà', '2025-03-20 00:00:00+01', '2025-03-20 01:00:00+01', 'Toda Valencia', NULL, NULL, 'Quema de todas las fallas mayores excepto Ayuntamiento', 'Burning of all adult fallas except City Hall'),
  ((SELECT id FROM event_types WHERE name_es = 'Cremà'), (SELECT id FROM fallas WHERE name = 'Falla Plaza del Ayuntamiento'), 'Cremà Ayuntamiento', 'City Hall Cremà', '2025-03-20 01:00:00+01', '2025-03-20 02:00:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3763, 'La última falla en quemarse', 'The last falla to burn'),
  ((SELECT id FROM event_types WHERE name_es = 'Mascletà'), NULL, 'Mascletà 19 de marzo', 'Mascletà March 19', '2025-03-19 14:00:00+01', '2025-03-19 14:20:00+01', 'Plaza del Ayuntamiento', 39.4699, -0.3763, 'Última mascletà de Fallas', 'Last mascletà of Fallas'),
  ((SELECT id FROM event_types WHERE name_es = 'Cabalgata'), NULL, 'Cabalgata del Fuego', 'Fire Parade', '2025-03-19 19:00:00+01', '2025-03-19 21:00:00+01', 'Centro de Valencia', 39.4699, -0.3763, 'Desfile con fuego antes de la cremà', 'Fire parade before the cremà');

-- POIs (10 lugares reales de Valencia)
INSERT INTO pois (poi_type_id, name, address, lat, lng, description_es, description_en, website) VALUES
  ((SELECT id FROM poi_types WHERE name_es = 'Horchatería'), 'Horchatería Santa Catalina', 'Plaza de Santa Catalina 6, Valencia', 39.4742, -0.3776, 'La horchatería más famosa de Valencia desde 1820', 'The most famous horchata shop in Valencia since 1820', 'https://www.horchatasantacatalina.com'),
  ((SELECT id FROM poi_types WHERE name_es = 'Restaurante'), 'Casa Montaña', 'C/ José Benlliure 69, Valencia', 39.4563, -0.3234, 'Taberna histórica con los mejores vinos', 'Historic tavern with the best wines', 'https://www.casamontana.net'),
  ((SELECT id FROM poi_types WHERE name_es = 'Museo'), 'Museo Fallero', 'Plaza Monteolivete 4, Valencia', 39.4598, -0.3589, 'Colección de ninots indultados desde 1934', 'Collection of pardoned ninots since 1934', 'https://www.ffrm.es/museo-fallero'),
  ((SELECT id FROM poi_types WHERE name_es = 'Museo'), 'Ciudad de las Artes y las Ciencias', 'Av. del Professor López Piñero 7, Valencia', 39.4545, -0.3503, 'Complejo cultural y de entretenimiento', 'Cultural and entertainment complex', 'https://www.cac.es'),
  ((SELECT id FROM poi_types WHERE name_es = 'Feria'), 'Feria de Atracciones', 'Paseo de la Alameda, Valencia', 39.4739, -0.3641, 'Gran feria con atracciones durante las fallas', 'Large fair with attractions during fallas', NULL),
  ((SELECT id FROM poi_types WHERE name_es = 'Horchatería'), 'Horchatería Daniel', 'Av. de la Horchata 41, Alboraia', 39.5012, -0.3523, 'Horchatería tradicional en Alboraia', 'Traditional horchata shop in Alboraia', 'https://www.horchatadaniel.com'),
  ((SELECT id FROM poi_types WHERE name_es = 'Restaurante'), 'La Pepica', 'Paseo de Neptuno 6, Valencia', 39.4523, -0.3245, 'Restaurante de paella junto al mar desde 1898', 'Seaside paella restaurant since 1898', 'https://www.lapepica.com'),
  ((SELECT id FROM poi_types WHERE name_es = 'Tienda pirotecnia'), 'Pirotecnia Ricardo Caballer', 'Godella, Valencia', 39.5234, -0.4012, 'Una de las pirotecnias más famosas de España', 'One of the most famous fireworks companies in Spain', 'https://www.ricardocaballer.com'),
  ((SELECT id FROM poi_types WHERE name_es = 'Museo'), 'Lonja de la Seda', 'Plaza del Mercado s/n, Valencia', 39.4739, -0.3789, 'Patrimonio de la Humanidad UNESCO', 'UNESCO World Heritage Site', 'https://www.visitvalencia.com/lonja'),
  ((SELECT id FROM poi_types WHERE name_es = 'Feria'), 'Mercado Central', 'Plaza del Mercado s/n, Valencia', 39.4735, -0.3791, 'Uno de los mercados más grandes de Europa', 'One of the largest markets in Europe', 'https://www.mercadocentralvalencia.es');
