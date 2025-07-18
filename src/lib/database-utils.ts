import { PrismaClient } from '@prisma/client';

// Database warm-up utility for Neon
export async function warmUpDatabase(prisma: PrismaClient): Promise<boolean> {
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 2000; // 2 seconds
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🔄 Warming up database (attempt ${attempt}/${MAX_RETRIES})...`);
      
      // Try to connect
      await prisma.$connect();
      
      // Test with a simple query
      await prisma.$queryRaw`SELECT 1 as test`;
      
      console.log('✅ Database warmed up successfully!');
      return true;
      
    } catch (error) {
      console.log(`❌ Database warm-up failed (attempt ${attempt}/${MAX_RETRIES})`);
      
      if (attempt < MAX_RETRIES) {
        console.log(`⏳ Waiting ${RETRY_DELAY}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error('❌ Database warm-up failed after all retries:', error);
        throw error;
      }
    }
  }
  
  return false;
}

// Database operation wrapper with automatic warm-up
export async function withDatabaseRetry<T>(
  operation: () => Promise<T>,
  prisma: PrismaClient
): Promise<T> {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const isConnectionError = error instanceof Error && (
        error.message.includes("Can't reach database server") ||
        error.message.includes("connection refused") ||
        error.message.includes("ENOTFOUND") ||
        error.message.includes("P1001")
      );
      
      if (isConnectionError && attempt < MAX_RETRIES) {
        console.log(`🔄 Database connection lost, attempting to reconnect (${attempt}/${MAX_RETRIES})...`);
        
        try {
          await warmUpDatabase(prisma);
          console.log('⏳ Retrying operation...');
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          continue;
        } catch (warmupError) {
          console.error('❌ Database warm-up failed:', warmupError);
        }
      }
      
      throw error;
    }
  }
  
  throw new Error('Database operation failed after all retries');
}
