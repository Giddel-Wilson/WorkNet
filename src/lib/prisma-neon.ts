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

// Enhanced Prisma client with retry logic for Neon
class NeonPrismaClient extends PrismaClient {
	constructor(options?: any) {
		super({
			...options,
			log: dev ? ['query', 'error', 'warn'] : ['error'],
			// Add connection pool settings optimized for Neon
			datasources: {
				db: {
					url: process.env.DATABASE_URL,
				},
			},
		});
	}

	// Override query method to add retry logic
	async $queryRaw(query: any, ...values: any[]): Promise<any> {
		let lastError: Error | null = null;
		
		for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
			try {
				return await super.$queryRaw(query, ...values);
			} catch (error) {
				lastError = error as Error;
				
				// Check if it's a connection error that might be resolved by retrying
				if (
					error instanceof Error &&
					(error.message.includes("Can't reach database server") ||
					 error.message.includes("connection refused") ||
					 error.message.includes("ENOTFOUND"))
				) {
					if (attempt < MAX_RETRIES) {
						console.log(`Database connection failed (attempt ${attempt}/${MAX_RETRIES}), retrying in ${RETRY_DELAY}ms...`);
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

	// Override other critical methods
	async user() {
		return this.withRetry(() => super.user);
	}

	async freelancerProfile() {
		return this.withRetry(() => super.freelancerProfile);
	}

	async job() {
		return this.withRetry(() => super.job);
	}

	async proposal() {
		return this.withRetry(() => super.proposal);
	}

	async message() {
		return this.withRetry(() => super.message);
	}

	async review() {
		return this.withRetry(() => super.review);
	}

	private async withRetry<T>(operation: () => T): Promise<T> {
		let lastError: Error | null = null;
		
		for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
			try {
				// First, try to connect to ensure database is awake
				await this.$connect();
				return operation();
			} catch (error) {
				lastError = error as Error;
				
				if (
					error instanceof Error &&
					(error.message.includes("Can't reach database server") ||
					 error.message.includes("connection refused") ||
					 error.message.includes("ENOTFOUND"))
				) {
					if (attempt < MAX_RETRIES) {
						console.log(`Database connection failed (attempt ${attempt}/${MAX_RETRIES}), retrying in ${RETRY_DELAY}ms...`);
						await delay(RETRY_DELAY * attempt);
						continue;
					}
				}
				
				throw error;
			}
		}
		
		throw lastError;
	}
}

// Use global connection in development to prevent too many connections
const prisma = globalThis.__prisma || new NeonPrismaClient();

if (dev) {
	globalThis.__prisma = prisma;
}

export { prisma };
