-- Сначала добавим поле is_cancelled если его нет
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_cancelled BOOLEAN DEFAULT false;

-- Удаляем все события 2025 года
DELETE FROM events WHERE start_time >= '2025-01-01' AND start_time < '2026-01-01';

-- МАСКЛЕТЫ (20 записей)
INSERT INTO events (title, description, start_time, location, event_type, pirotecnia, best_viewing_location, is_cancelled) VALUES
('Mascletà - Pirotecnia Valenciana', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Valenciana. Plaza del Ayuntamiento.', '2025-02-23T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Valenciana', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Peñarroja', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Peñarroja. Plaza del Ayuntamiento.', '2025-03-01T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Peñarroja', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Gironina', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Gironina. Plaza del Ayuntamiento.', '2025-03-02T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Gironina', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Alto Palancia', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Alto Palancia. Plaza del Ayuntamiento.', '2025-03-03T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Alto Palancia', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Dragón (CANCELADA)', 'Mascletà cancelada por lluvia. Pirotecnia Dragón', '2025-03-04T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Dragón', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', true),
('Mascletà - Pirotecnia Pibierzo (CANCELADA)', 'Mascletà cancelada por lluvia. Pirotecnia Pibierzo', '2025-03-05T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Pibierzo', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', true),
('Mascletà - Pirotecnia Zaragozana (CANCELADA)', 'Mascletà cancelada por lluvia. Pirotecnia Zaragozana', '2025-03-06T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Zaragozana', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', true),
('Mascletà - Reyes-Martí', 'Espectáculo pirotécnico diurno a cargo de Reyes-Martí. Plaza del Ayuntamiento.', '2025-03-07T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Reyes-Martí', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Nadal-Martí', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Nadal-Martí. Plaza del Ayuntamiento.', '2025-03-08T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Nadal-Martí', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Alpujarreña', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Alpujarreña. Plaza del Ayuntamiento.', '2025-03-09T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Alpujarreña', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Turís', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Turís. Plaza del Ayuntamiento.', '2025-03-10T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Turís', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Tomas', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Tomas. Plaza del Ayuntamiento.', '2025-03-11T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Tomas', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Crespo', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Crespo. Plaza del Ayuntamiento.', '2025-03-12T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Crespo', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Tamarit', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Tamarit. Plaza del Ayuntamiento.', '2025-03-13T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Tamarit', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Hermanos Caballer', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Hermanos Caballer. Plaza del Ayuntamiento.', '2025-03-14T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Hermanos Caballer', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Aitana', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Aitana. Plaza del Ayuntamiento.', '2025-03-15T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Aitana', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Valenciana', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Valenciana. Plaza del Ayuntamiento.', '2025-03-16T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Valenciana', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Vulcano', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Vulcano. Plaza del Ayuntamiento.', '2025-03-17T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Vulcano', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia del Mediterráneo', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia del Mediterráneo. Plaza del Ayuntamiento.', '2025-03-18T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia del Mediterráneo', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false),
('Mascletà - Pirotecnia Caballer FX', 'Espectáculo pirotécnico diurno a cargo de Pirotecnia Caballer FX. Plaza del Ayuntamiento.', '2025-03-19T14:00:00+01:00', 'Plaza del Ayuntamiento', 'mascletà', 'Pirotecnia Caballer FX', 'Plaza del Ayuntamiento - llegar mínimo 30 min antes', false);

-- CASTILLOS (10 записей)
INSERT INTO events (title, description, start_time, location, event_type, pirotecnia, best_viewing_location, is_cancelled) VALUES
('Castillo - Pirotecnia del Mediterráneo', 'Espectáculo nocturno de fuegos artificiales a cargo de Pirotecnia del Mediterráneo.', '2025-02-28T00:00:00+01:00', 'Plaza Ayuntamiento', 'castillo', 'Pirotecnia del Mediterráneo', 'Plaza del Ayuntamiento o calles adyacentes', false),
('Castillo - Pirotecnia Gironina', 'Espectáculo nocturno de fuegos artificiales a cargo de Pirotecnia Gironina.', '2025-03-01T00:00:00+01:00', 'Plaza Ayuntamiento', 'castillo', 'Pirotecnia Gironina', 'Plaza del Ayuntamiento o calles adyacentes', false),
('Castillo - Pirotecnia Zaragozana', 'Espectáculo nocturno de fuegos artificiales a cargo de Pirotecnia Zaragozana.', '2025-03-02T20:00:00+01:00', 'Plaza Ayuntamiento', 'castillo', 'Pirotecnia Zaragozana', 'Plaza del Ayuntamiento o calles adyacentes', false),
('Castillo - Pirotecnia Pibierzo', 'Espectáculo nocturno de fuegos artificiales a cargo de Pirotecnia Pibierzo.', '2025-03-07T00:00:00+01:00', 'Plaza Ayuntamiento', 'castillo', 'Pirotecnia Pibierzo', 'Plaza del Ayuntamiento o calles adyacentes', false),
('Castillo - Reyes-Martí', 'Espectáculo nocturno de fuegos artificiales a cargo de Reyes-Martí.', '2025-03-08T00:00:00+01:00', 'Plaza Ayuntamiento', 'castillo', 'Reyes-Martí', 'Plaza del Ayuntamiento o calles adyacentes', false),
('Castillo - Pirotecnia Alto Palancia', 'Espectáculo nocturno de fuegos artificiales a cargo de Pirotecnia Alto Palancia.', '2025-03-09T20:00:00+01:00', 'Plaza Ayuntamiento', 'castillo', 'Pirotecnia Alto Palancia', 'Plaza del Ayuntamiento o calles adyacentes', false),
('Castillo - Nit de l''Albà (Pirotecnia Valenciana)', 'Nit de l''Albà. Espectáculo de fuegos artificiales a cargo de Pirotecnia Valenciana.', '2025-03-15T00:00:00+01:00', 'Plaza Ayuntamiento', 'castillo', 'Pirotecnia Valenciana', 'Plaza del Ayuntamiento o calles adyacentes', false),
('Castillo - Pirotecnia Vulcano', 'Espectáculo nocturno de fuegos artificiales a cargo de Pirotecnia Vulcano.', '2025-03-16T00:00:00+01:00', 'Palau de les Arts', 'castillo', 'Pirotecnia Vulcano', 'Jardines del Turia, evitar puentes (cerrados)', false),
('Castillo - Pirotecnia Tamarit', 'Espectáculo nocturno de fuegos artificiales a cargo de Pirotecnia Tamarit.', '2025-03-17T00:00:00+01:00', 'Palau de les Arts', 'castillo', 'Pirotecnia Tamarit', 'Jardines del Turia, evitar puentes (cerrados)', false),
('Castillo - Nit del Foc (Pirotecnia Hermanos Caballer)', 'Nit del Foc. Espectáculo de fuegos artificiales a cargo de Pirotecnia Hermanos Caballer.', '2025-03-18T00:00:00+01:00', 'Palau de les Arts', 'castillo', 'Pirotecnia Hermanos Caballer', 'Jardines del Turia, evitar puentes (cerrados)', false);

-- EVENTOS PRINCIPALES (10 записей)
INSERT INTO events (title, description, start_time, location, event_type, pirotecnia, best_viewing_location, is_cancelled) VALUES
('La Crida', 'Inicio oficial de las Fallas. La Fallera Mayor proclama el comienzo de las fiestas desde las Torres de Serranos.', '2025-02-23T19:30:00+01:00', 'Torres de Serranos', 'general', NULL, 'Plaza de los Fueros o Calle Serranos', false),
('Cabalgata del Ninot', 'Desfile tradicional de ninots y carrozas por las calles del centro.', '2025-03-09T17:30:00+01:00', 'Calle de la Paz', 'cabalgata', NULL, 'Calle de la Paz o Plaza de la Reina', false),
('Plantà Infantil', 'Colocación de los monumentos falleros infantiles en toda la ciudad.', '2025-03-15T09:00:00+01:00', 'Toda la ciudad', 'plantà', NULL, 'Diferentes barrios de Valencia', false),
('Plantà Mayor', 'Colocación de los monumentos falleros mayores. Los artistas dan los últimos retoques.', '2025-03-16T08:00:00+01:00', 'Toda la ciudad', 'plantà', NULL, 'Sección Especial en Plaza del Ayuntamiento', false),
('Ofrenda de Flores - Día 1', 'Miles de falleras ofrecen flores a la Virgen de los Desamparados. Primer día de la ofrenda.', '2025-03-17T15:30:00+01:00', 'Plaza de la Virgen', 'ofrenda', NULL, 'Calle San Vicente o Plaza de la Virgen', false),
('Ofrenda de Flores - Día 2', 'Segundo día de la ofrenda. Continuación del desfile de falleras con flores.', '2025-03-18T15:30:00+01:00', 'Plaza de la Virgen', 'ofrenda', NULL, 'Calle San Vicente o Plaza de la Virgen', false),
('Correfoc', 'Espectáculo de fuego con diablos y petardos corriendo por las calles.', '2025-03-19T19:00:00+01:00', 'Calle Colón', 'general', NULL, 'Calle Colón - ¡llevar ropa vieja y gorra!', false),
('Cremà Infantil', 'Quema de las fallas infantiles en toda la ciudad.', '2025-03-19T20:00:00+01:00', 'Toda la ciudad', 'cremà', NULL, 'Cualquier falla infantil de tu barrio', false),
('Cremà Mayor', 'Quema de las fallas mayores. El fuego consume los monumentos en toda Valencia.', '2025-03-19T22:00:00+01:00', 'Toda la ciudad', 'cremà', NULL, 'Fallas de Sección Especial', false),
('Cremà Municipal', 'La última falla en arder. Cierre oficial de las Fallas con la quema de la falla del Ayuntamiento.', '2025-03-19T23:00:00+01:00', 'Plaza del Ayuntamiento', 'cremà', NULL, 'Plaza del Ayuntamiento - llegar muy temprano', false);

-- Verificar cuántos registros se insertaron
SELECT event_type, COUNT(*) as total FROM events WHERE start_time >= '2025-01-01' AND start_time < '2026-01-01' GROUP BY event_type;
