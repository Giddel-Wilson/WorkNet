import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { warmUpDatabase } from './src/lib/database-utils.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');
  
  // Warm up database first
  await warmUpDatabase(prisma);
  
  // Create test users
  console.log('Creating test users...');
  
  const testPassword = await bcrypt.hash('password123', 10);
  
  // Create a test freelancer
  const freelancer = await prisma.user.upsert({
    where: { email: 'test@freelancer.com' },
    update: {},
    create: {
      email: 'test@freelancer.com',
      name: 'Test Freelancer',
      passwordHash: testPassword,
      role: 'freelancer',
      status: 'active'
    }
  });
  console.log('✅ Created freelancer:', freelancer.email);
  
  // Create freelancer profile
  await prisma.freelancerProfile.upsert({
    where: { userId: freelancer.id },
    update: {},
    create: {
      userId: freelancer.id,
      bio: 'Test freelancer bio',
      skills: ['JavaScript', 'React', 'Node.js'],
      portfolioLinks: []
    }
  });
  
  // Create a test client
  const client = await prisma.user.upsert({
    where: { email: 'test@client.com' },
    update: {},
    create: {
      email: 'test@client.com',
      name: 'Test Client',
      passwordHash: testPassword,
      role: 'client',
      status: 'active'
    }
  });
  console.log('✅ Created client:', client.email);
  
  console.log('🎉 Database seeding completed!');
  console.log('Test accounts:');
  console.log('- Freelancer: test@freelancer.com / password123');
  console.log('- Client: test@client.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
