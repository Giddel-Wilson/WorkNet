import { prisma } from '$lib/prisma';
import { warmUpDatabase } from '$lib/database-utils';

// Warm up database on app startup
warmUpDatabase(prisma).catch(error => {
  console.error('❌ Failed to warm up database on startup:', error);
});

export { prisma };
