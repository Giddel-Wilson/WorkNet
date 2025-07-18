import { PrismaClient } from '@prisma/client';

// Simple connection test
const prisma = new PrismaClient();

async function warmUpDatabase() {
  console.log('🔄 Warming up database connection...');
  
  let retries = 5;
  const delay = 2000; // 2 seconds
  
  while (retries > 0) {
    try {
      await prisma.$connect();
      console.log('✅ Database connection established!');
      
      // Test with a simple query
      const result = await prisma.$queryRaw`SELECT 1 as test`;
      console.log('✅ Database is responsive:', result);
      
      await prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(`❌ Connection failed, retries left: ${retries - 1}`);
      retries--;
      
      if (retries > 0) {
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('❌ Final connection attempt failed:', error.message);
        throw error;
      }
    }
  }
  
  return false;
}

warmUpDatabase().catch(console.error);
