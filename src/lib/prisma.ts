import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

// Vercel-friendly connection guard
declare global {
	var __prisma: PrismaClient | undefined;
}

// Use global connection in development to prevent too many connections
const prisma = globalThis.__prisma || new PrismaClient({
	log: dev ? ['query', 'error', 'warn'] : ['error'],
});

if (dev) {
	globalThis.__prisma = prisma;
}

export { prisma };
