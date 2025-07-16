import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/prisma';
import { isValidEmail } from '$lib/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ request, cookies }) => {
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
			// Check if user already exists
			const existingUser = await prisma.user.findUnique({
				where: { email }
			});

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

			// Create user
			const user = await prisma.user.create({
				data: {
					name,
					email,
					passwordHash,
					role,
					status: 'active'
				}
			});

			// Create freelancer profile if role is freelancer
			if (role === 'freelancer') {
				await prisma.freelancerProfile.create({
					data: {
						userId: user.id,
						bio: '',
						skills: [],
						portfolioLinks: []
					}
				});
			}

			// Registration successful - redirect to login
			throw redirect(302, '/auth/login?registered=true');

		} catch (error) {
			if (error instanceof Error && error.message.includes('redirect')) {
				throw error; // Re-throw redirect errors
			}
			
			console.error('Registration error:', error);
			return fail(500, {
				error: 'An error occurred during registration. Please try again.'
			});
		}
	}
};
