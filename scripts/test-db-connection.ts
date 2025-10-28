/**
 * Test Database Connection Script
 * 
 * This script tests the connection to the database
 * and displays connection information
 * 
 * Usage: npx tsx scripts/test-db-connection.ts
 */

import { Pool } from '@neondatabase/serverless';
import ws from 'ws';

// Configure WebSocket for Neon
import { neonConfig } from '@neondatabase/serverless';
neonConfig.webSocketConstructor = ws as any;

async function testConnection() {
  console.log('🔍 Testing Database Connection...\n');

  // Get DATABASE_URL from environment
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ ERROR: DATABASE_URL not found in environment variables');
    console.log('\n💡 Please set DATABASE_URL in your environment:');
    console.log('   export DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"');
    process.exit(1);
  }

  // Parse and display connection info (without password)
  try {
    const url = new URL(databaseUrl);
    console.log('📊 Connection Details:');
    console.log(`   Host:     ${url.hostname}`);
    console.log(`   Port:     ${url.port || '5432'}`);
    console.log(`   Database: ${url.pathname.slice(1).split('?')[0]}`);
    console.log(`   Username: ${url.username}`);
    console.log(`   SSL:      ${url.searchParams.get('sslmode') || 'not specified'}`);
    console.log('');
  } catch (error) {
    console.error('⚠️  Warning: Could not parse DATABASE_URL');
  }

  // Test connection
  const pool = new Pool({ connectionString: databaseUrl });

  try {
    console.log('🔄 Attempting connection...');
    
    const client = await pool.connect();
    console.log('✅ Successfully connected to database!\n');

    // Test query
    console.log('🔍 Running test query...');
    const result = await client.query('SELECT version(), current_database(), current_user');
    
    console.log('📊 Database Information:');
    console.log(`   PostgreSQL Version: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    console.log(`   Current Database:   ${result.rows[0].current_database}`);
    console.log(`   Current User:       ${result.rows[0].current_user}`);
    console.log('');

    // Check tables
    console.log('🔍 Checking existing tables...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    if (tablesResult.rows.length > 0) {
      console.log('📋 Existing Tables:');
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    } else {
      console.log('⚠️  No tables found. Run migrations with: npm run db:push');
    }

    client.release();
    await pool.end();

    console.log('\n✅ Database connection test completed successfully!');
    process.exit(0);

  } catch (error: any) {
    console.error('\n❌ Database connection failed!');
    console.error('   Error:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Troubleshooting:');
      console.log('   - Check if the host is correct');
      console.log('   - Verify your internet connection');
    } else if (error.code === '28P01') {
      console.log('\n💡 Troubleshooting:');
      console.log('   - Check if username and password are correct');
      console.log('   - Verify DATABASE_URL format');
    } else if (error.message.includes('SSL')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   - Add ?sslmode=require to your DATABASE_URL');
    }
    
    await pool.end();
    process.exit(1);
  }
}

// Run the test
testConnection().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

