// Direct database migration using pg
const { Client } = require('pg');

// Connection string for Supabase Postgres
// Try pooler connection - using session pooler port 5432 
const connectionString = 'postgresql://postgres.symayyolvynvynomgtgl:PZMKES93Mrn8kWW3@aws-0-eu-west-1.pooler.supabase.com:5432/postgres';

const migrationSQL = `
-- Add missing columns to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS event_type VARCHAR(50);
ALTER TABLE events ADD COLUMN IF NOT EXISTS pirotecnia VARCHAR(100);
ALTER TABLE events ADD COLUMN IF NOT EXISTS best_viewing_location TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS description_en TEXT;

-- Add description columns to event_types if missing
ALTER TABLE event_types ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE event_types ADD COLUMN IF NOT EXISTS description_en TEXT;

-- INSERT policies
DROP POLICY IF EXISTS "Public insert mercados" ON mercados;
CREATE POLICY "Public insert mercados" ON mercados FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert exhibitions" ON exhibitions;
CREATE POLICY "Public insert exhibitions" ON exhibitions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert events" ON events;
CREATE POLICY "Public insert events" ON events FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert event_types" ON event_types;
CREATE POLICY "Public insert event_types" ON event_types FOR INSERT WITH CHECK (true);
`;

async function runMigration() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected!\n');

    console.log('Running migration...');
    await client.query(migrationSQL);
    console.log('Migration complete!\n');

    // Verify columns
    console.log('Verifying events table columns:');
    const eventsResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'events' 
      ORDER BY ordinal_position
    `);
    eventsResult.rows.forEach(r => console.log(`  - ${r.column_name}: ${r.data_type}`));

    console.log('\nVerifying mercados table exists:');
    const mercadosResult = await client.query(`SELECT COUNT(*) FROM mercados`);
    console.log(`  - mercados rows: ${mercadosResult.rows[0].count}`);

    console.log('\nVerifying exhibitions table exists:');
    const exhibitionsResult = await client.query(`SELECT COUNT(*) FROM exhibitions`);
    console.log(`  - exhibitions rows: ${exhibitionsResult.rows[0].count}`);

    console.log('\n✅ Schema migration successful!');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
