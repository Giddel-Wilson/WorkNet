import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/prisma';
import { withDatabaseRetry } from '$lib/database-utils';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		// Validation
		if (!email || !password) {
			return fail(400, {
				error: 'Email and password are required',
				fieldErrors: {
					email: !email ? 'Email is required' : undefined,
					password: !password ? 'Password is required' : undefined
				}
			});
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address',
				fieldErrors: {
					email: 'Please enter a valid email address'
				}
			});
		}

		try {
			// Find user by email with retry logic
			const user = await withDatabaseRetry(async () => {
				return await prisma.user.findUnique({
					where: { email: email.toLowerCase() },
					select: {
						id: true,
						name: true,
						email: true,
						passwordHash: true,
						role: true,
						status: true,
						avatarUrl: true
					}
				});
			}, prisma);

			if (!user) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}

			// Check if user account is active
			if (user.status !== 'active') {
				let message = 'Your account is not active';
				if (user.status === 'suspended') {
					message = 'Your account has been suspended. Please contact support.';
				} else if (user.status === 'deactivated') {
					message = 'Your account has been deactivated. Please contact support.';
				}
				
				return fail(400, {
					error: message
				});
			}

			// Verify password
			const validPassword = await bcrypt.compare(password, user.passwordHash);
			if (!validPassword) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}

			// Create session
			const sessionId = crypto.randomUUID();
			const sessionData = {
				userId: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				avatarUrl: user.avatarUrl
			};

			// Set secure session cookie
			cookies.set('session', JSON.stringify({ id: sessionId, ...sessionData }), {
				path: '/',
				maxAge: 60 * 60 * 24 * 7, // 7 days
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict'
			});

			// Redirect based on user role
			const redirectTo = url.searchParams.get('redirectTo');
			
			if (redirectTo) {
				throw redirect(302, redirectTo);
			}

			switch (user.role) {
				case 'admin':
					throw redirect(302, '/admin/dashboard');
				case 'freelancer':
					throw redirect(302, '/dashboard/freelancer');
				case 'client':
					throw redirect(302, '/dashboard/client');
				default:
					throw redirect(302, '/dashboard');
			}

		} catch (error) {
			// Check if it's a SvelteKit redirect (redirects are thrown as special objects)
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
				throw error; // Re-throw redirect errors
			}
			
			console.error('Login error:', error);
			
			// Check if it's a database connectivity issue
			if (error instanceof Error && (
				error.message.includes("Can't reach database server") ||
				error.message.includes('database server is running') ||
				error.message.includes('ENOTFOUND') ||
				error.message.includes('connection refused')
			)) {
				return fail(503, {
					error: 'Database temporarily unavailable. Please try again in a few moments.'
				});
			}
			
			// Generic database error
			if (error instanceof Error && error.message.includes('prisma')) {
				return fail(500, {
					error: 'Database error occurred. Please try again later.'
				});
			}
			
			return fail(500, {
				error: 'An unexpected error occurred during login. Please try again.'
			});
		}
	}
};
