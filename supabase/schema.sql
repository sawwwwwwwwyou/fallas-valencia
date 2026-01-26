-- Fallas Valencia Database Schema
-- Created: 2026-01-26

-- Categories (Sección Especial, Primera A, etc.)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  color TEXT DEFAULT '#FF6B35',
  icon TEXT DEFAULT '🔥',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Fallas (main sculptures)
CREATE TABLE IF NOT EXISTS fallas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  address TEXT,
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  description_es TEXT,
  description_en TEXT,
  image_url TEXT,
  year INT DEFAULT 2025,
  artist TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Event Types (mascletà, cremà, ofrenda, etc.)
CREATE TABLE IF NOT EXISTS event_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT DEFAULT '🎆',
  color TEXT DEFAULT '#FFD700',
  description_es TEXT,
  description_en TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Events (specific occurrences)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type_id UUID REFERENCES event_types(id),
  falla_id UUID REFERENCES fallas(id),
  title_es TEXT NOT NULL,
  title_en TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location TEXT,
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  description_es TEXT,
  description_en TEXT,
  is_cancelled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- POI Types (Points of Interest types)
CREATE TABLE IF NOT EXISTS poi_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT DEFAULT '📍',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- POIs (restaurants, museums, etc.)
CREATE TABLE IF NOT EXISTS pois (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poi_type_id UUID REFERENCES poi_types(id),
  name TEXT NOT NULL,
  address TEXT,
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  description_es TEXT,
  description_en TEXT,
  image_url TEXT,
  website TEXT,
  phone TEXT,
  hours JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Favorites
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  falla_id UUID REFERENCES fallas(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, falla_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_fallas_category ON fallas(category_id);
CREATE INDEX IF NOT EXISTS idx_events_falla ON events(falla_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type_id);
CREATE INDEX IF NOT EXISTS idx_events_start ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_pois_type ON pois(poi_type_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE fallas ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE poi_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE pois ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read fallas" ON fallas FOR SELECT USING (true);
CREATE POLICY "Public read event_types" ON event_types FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read poi_types" ON poi_types FOR SELECT USING (true);
CREATE POLICY "Public read pois" ON pois FOR SELECT USING (true);
CREATE POLICY "Public read favorites" ON favorites FOR SELECT USING (true);

-- Allow insert/update/delete for favorites
CREATE POLICY "Public insert favorites" ON favorites FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete favorites" ON favorites FOR DELETE USING (true);
