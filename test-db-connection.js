import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function testConnection() {
  console.log('Testing database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
  
  try {
    // Test 1: Basic connection
    console.log('🔄 Attempting to connect...');
    await prisma.$connect();
    console.log('✅ Connection successful!');
    
    // Test 2: Simple query
    console.log('🔄 Testing simple query...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query successful:', result);
    
    // Test 3: Check if tables exist
    console.log('🔄 Checking tables...');
    const userCount = await prisma.user.count();
    console.log('✅ User table accessible, count:', userCount);
    
    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Connection failed:', error);
    console.error('Error details:');
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
