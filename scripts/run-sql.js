const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  connectionString: 'postgresql://postgres.symayyolvynvynomgtgl:PZMKES93Mrn8kWW3@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    const sql = fs.readFileSync('./scripts/insert-events.sql', 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = sql.split(';').filter(s => s.trim());
    
    for (const stmt of statements) {
      if (stmt.trim()) {
        try {
          const result = await client.query(stmt);
          if (result.rows && result.rows.length > 0) {
            console.log('Result:', result.rows);
          } else if (result.rowCount !== null) {
            console.log(`Affected rows: ${result.rowCount}`);
          }
        } catch (e) {
          console.log('Statement:', stmt.substring(0, 50) + '...');
          console.error('Error:', e.message);
        }
      }
    }
    
    // Final count
    const count = await client.query(`
      SELECT event_type, COUNT(*) as total 
      FROM events 
      WHERE start_time >= '2025-01-01' AND start_time < '2026-01-01' 
      GROUP BY event_type 
      ORDER BY event_type
    `);
    console.log('\n=== RESUMEN FINAL ===');
    console.log(count.rows);
    
    const total = await client.query(`SELECT COUNT(*) FROM events WHERE start_time >= '2025-01-01' AND start_time < '2026-01-01'`);
    console.log(`Total eventos 2025: ${total.rows[0].count}`);
    
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.end();
  }
}

run();
