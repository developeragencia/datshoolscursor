/**
 * Environment Variables Validation
 * Validates and exports all required environment variables
 */

function validateEnv() {
  const requiredVars = ['DATABASE_URL'] as const;
  const missing: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    console.error('❌ MISSING REQUIRED ENVIRONMENT VARIABLES:');
    console.error(`   ${missing.join(', ')}`);
    console.error('\n📋 Available environment variables:');
    console.error(`   ${Object.keys(process.env).filter(k => !k.includes('KEY') && !k.includes('SECRET')).join(', ')}`);
    console.error('\n💡 Make sure to set these variables in your Render dashboard:');
    console.error('   1. Go to https://dashboard.render.com');
    console.error('   2. Select your service');
    console.error('   3. Go to Environment tab');
    console.error('   4. Add the missing variables');
    
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Warn about optional variables
  if (!process.env.SESSION_SECRET) {
    console.warn('⚠️  SESSION_SECRET not set, using generated default (not recommended for production)');
  }

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn('⚠️  GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set. Google OAuth will not work.');
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    SESSION_SECRET: process.env.SESSION_SECRET || generateSessionSecret(),
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '5000', 10),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  };
}

function generateSessionSecret(): string {
  // Generate a random session secret if not provided
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validate and export environment variables
export const env = validateEnv();

console.log('✅ Environment variables validated successfully');
console.log(`   NODE_ENV: ${env.NODE_ENV}`);
console.log(`   PORT: ${env.PORT}`);
console.log(`   DATABASE_URL: ${env.DATABASE_URL.substring(0, 30)}...`);
console.log(`   SESSION_SECRET: ${env.SESSION_SECRET.substring(0, 10)}...`);
console.log(`   GOOGLE_CLIENT_ID: ${env.GOOGLE_CLIENT_ID ? 'Set ✓' : 'Not set ✗'}`);
console.log(`   GOOGLE_CLIENT_SECRET: ${env.GOOGLE_CLIENT_SECRET ? 'Set ✓' : 'Not set ✗'}`);
