import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

// Vercel-friendly connection guard
declare global {
	var __prisma: PrismaClient | undefined;
}

// Retry configuration for Neon database
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Create a function to wait/delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced error handling for Neon database
async function executeWithRetry<T>(operation: () => Promise<T>): Promise<T> {
	let lastError: Error | null = null;
	
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			return await operation();
		} catch (error) {
			lastError = error as Error;
			
			// Check if it's a connection error that might be resolved by retrying
			if (
				error instanceof Error &&
				(error.message.includes("Can't reach database server") ||
				 error.message.includes("connection refused") ||
				 error.message.includes("ENOTFOUND") ||
				 error.message.includes("P1001"))
			) {
				if (attempt < MAX_RETRIES) {
					console.log(`Database connection failed (attempt ${attempt}/${MAX_RETRIES}), retrying in ${RETRY_DELAY * attempt}ms...`);
					await delay(RETRY_DELAY * attempt); // Exponential backoff
					continue;
				}
			}
			
			// Re-throw if not a connection error or max retries reached
			throw error;
		}
	}
	
	throw lastError;
}

// Use global connection in development to prevent too many connections
const basePrisma = globalThis.__prisma || new PrismaClient({
	log: dev ? ['query', 'error', 'warn'] : ['error'],
});

if (dev) {
	globalThis.__prisma = basePrisma;
}

// Create a proxy to wrap database operations with retry logic
const prisma = new Proxy(basePrisma, {
	get(target, prop) {
		const value = target[prop as keyof PrismaClient];
		
		// If it's a model (like user, job, etc.), wrap its methods
		if (value && typeof value === 'object' && 'findUnique' in value) {
			return new Proxy(value, {
				get(modelTarget, modelProp) {
					const modelValue = modelTarget[modelProp as keyof typeof modelTarget];
					
					// Wrap database operations with retry logic
					if (typeof modelValue === 'function' && 
						['findUnique', 'findMany', 'create', 'update', 'delete', 'upsert', 'count'].includes(modelProp as string)) {
						return (...args: unknown[]) => {
							return executeWithRetry(() => (modelValue as (...args: unknown[]) => Promise<unknown>).apply(modelTarget, args));
						};
					}
					
					return modelValue;
				}
			});
		}
		
		// For other methods like $connect, $disconnect, etc.
		if (typeof value === 'function' && prop.toString().startsWith('$')) {
			return (...args: unknown[]) => {
				return executeWithRetry(() => (value as (...args: unknown[]) => Promise<unknown>).apply(target, args));
			};
		}
		
		return value;
	}
});

export { prisma };
