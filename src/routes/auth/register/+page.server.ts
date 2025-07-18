import { fail } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/prisma';
import { withDatabaseRetry } from '$lib/database-utils';
import { isValidEmail } from '$lib/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString()?.trim();
		const email = data.get('email')?.toString()?.toLowerCase().trim();
		const password = data.get('password')?.toString();
		const confirmPassword = data.get('confirmPassword')?.toString();
		const role = data.get('role')?.toString() as 'freelancer' | 'client';

		// Validation
		const fieldErrors: Record<string, string> = {};

		if (!name || name.length < 2) {
			fieldErrors.name = 'Name must be at least 2 characters long';
		}

		if (!email) {
			fieldErrors.email = 'Email is required';
		} else if (!isValidEmail(email)) {
			fieldErrors.email = 'Please enter a valid email address';
		}

		if (!password) {
			fieldErrors.password = 'Password is required';
		} else if (password.length < 8) {
			fieldErrors.password = 'Password must be at least 8 characters long';
		}

		if (!confirmPassword) {
			fieldErrors.confirmPassword = 'Please confirm your password';
		} else if (password !== confirmPassword) {
			fieldErrors.confirmPassword = 'Passwords do not match';
		}

		if (!role || !['freelancer', 'client'].includes(role)) {
			return fail(400, {
				error: 'Please select whether you want to find work or hire talent'
			});
		}

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, {
				error: 'Please fix the errors below',
				fieldErrors
			});
		}

		try {
			// Check if user already exists with retry logic
			const existingUser = await withDatabaseRetry(async () => {
				return await prisma.user.findUnique({
					where: { email }
				});
			}, prisma);

			if (existingUser) {
				return fail(400, {
					error: 'An account with this email already exists',
					fieldErrors: {
						email: 'An account with this email already exists'
					}
				});
			}

			// Hash password
			const passwordHash = await bcrypt.hash(password, 10);

			// Create user with retry logic
			const user = await withDatabaseRetry(async () => {
				return await prisma.user.create({
					data: {
						name,
						email,
						passwordHash,
						role,
						status: 'active'
					}
				});
			}, prisma);

			// Create freelancer profile if role is freelancer
			if (role === 'freelancer') {
				await withDatabaseRetry(async () => {
					return await prisma.freelancerProfile.create({
						data: {
							userId: user.id,
							bio: '',
							skills: [],
							portfolioLinks: []
						}
					});
				}, prisma);
			}

			// Registration successful - return success response to trigger client-side redirect with countdown
			return {
				success: true,
				message: 'Account created successfully!'
			};

		} catch (error) {
			console.error('Registration error:', error);
			
			// Check if it's a database connectivity issue
			if (error instanceof Error && (
				error.message.includes("Can't reach database server") ||
				error.message.includes('database server is running') ||
				error.message.includes('ENOTFOUND') ||
				error.message.includes('connection refused')
			)) {
				return fail(503, {
					error: 'Database temporarily unavailable. Please try again in a few moments. If the issue persists, contact support.'
				});
			}
			
			// Generic database error
			if (error instanceof Error && error.message.includes('prisma')) {
				return fail(500, {
					error: 'Database error occurred. Please try again later or contact support if the issue persists.'
				});
			}
			
			return fail(500, {
				error: 'An unexpected error occurred during registration. Please try again.'
			});
		}
	}
};
