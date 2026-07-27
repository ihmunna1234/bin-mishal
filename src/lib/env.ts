/**
 * Environment Variable Validator for Bin Misal Travels ERP & Web App
 * Validates critical environment variables upon module load.
 */

function validateEnv() {
  const isProduction = process.env.NODE_ENV === 'production';

  const requiredVars = [
    { key: 'DATABASE_URL', critical: true, message: 'Database connection string is required for Prisma.' },
    { key: 'NEXT_PUBLIC_SUPABASE_URL', critical: true, message: 'Supabase URL is required for database & authentication.' },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', critical: true, message: 'Supabase Anon Key is required for client operations.' },
    { key: 'ADMIN_SEED_SECRET', critical: false, message: 'Admin seed secret key recommended for database seeding.' },
  ];

  const missing: string[] = [];

  for (const { key, critical, message } of requiredVars) {
    const value = process.env[key];
    if (!value || value.trim() === '') {
      if (critical) {
        missing.push(`${key}: ${message}`);
      } else {
        console.warn(`[ENV WARNING] Missing non-critical environment variable: ${key}`);
      }
    }
  }

  if (missing.length > 0) {
    const errorMsg = `\n=======================================================\nCRITICAL FATAL ERROR: Missing Required Environment Variables\n=======================================================\n${missing.join(
      '\n'
    )}\n=======================================================\n`;
    
    console.error(errorMsg);
  }

  // Verify SSL mode in production database connection
  if (isProduction && process.env.DATABASE_URL) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl.includes('sslmode=') && !dbUrl.includes('supabase.co')) {
      console.warn('[SECURITY WARNING] DATABASE_URL in production should enforce SSL (sslmode=require).');
    }
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL || '',
    DIRECT_URL: process.env.DIRECT_URL || process.env.DATABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    ADMIN_SEED_SECRET: process.env.ADMIN_SEED_SECRET || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
}

export const env = validateEnv();
