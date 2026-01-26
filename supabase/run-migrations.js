// Run SQL migrations via Supabase
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://symayyolvynvynomgtgl.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'sb_secret_YOUR_KEY_HERE';

async function runSQL(sql) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
    body: JSON.stringify({ sql }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SQL Error: ${error}`);
  }
  
  return response.json();
}

async function main() {
  console.log('Running Fallas Valencia migrations...\n');
  
  // Read SQL files
  const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  
  console.log('Schema SQL loaded:', schemaSQL.length, 'bytes');
  console.log('Seed SQL loaded:', seedSQL.length, 'bytes');
  
  console.log('\nNote: Execute these SQL files manually in Supabase SQL Editor:');
  console.log('1. Go to: https://supabase.com/dashboard/project/symayyolvynvynomgtgl/sql');
  console.log('2. Copy and paste schema.sql, click Run');
  console.log('3. Copy and paste seed.sql, click Run');
}

main().catch(console.error);
