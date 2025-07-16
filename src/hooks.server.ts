import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { getSession } from '$lib/auth';
import { prisma } from '$lib/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	// Get session from cookies
	const session = getSession(event.cookies);
	
	// Add user to locals for use in pages
	if (session) {
		try {
			// Verify user still exists and is active
			const user = await prisma.user.findUnique({
				where: { id: session.userId },
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					status: true,
					avatarUrl: true
				}
			});

			if (user && user.status === 'active') {
				event.locals.user = {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					status: user.status,
					avatarUrl: user.avatarUrl
				};
			} else {
				// User doesn't exist or is not active, clear session
				event.cookies.delete('session', { path: '/' });
			}
		} catch (error) {
			console.error('Session verification error:', error);
			// Clear invalid session
			event.cookies.delete('session', { path: '/' });
		}
	}

	const { pathname } = event.url;
	const user = event.locals.user;

	// Protected routes that require authentication
	const protectedRoutes = ['/dashboard', '/admin', '/api'];
	const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

	// Admin-only routes
	const adminRoutes = ['/admin'];
	const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

	// API routes that don't require auth
	const publicApiRoutes = ['/api/auth'];
	const isPublicApiRoute = publicApiRoutes.some(route => pathname.startsWith(route));

	// Auth pages (redirect if already logged in)
	const authPages = ['/auth/login', '/auth/register'];
	const isAuthPage = authPages.includes(pathname);

	// Redirect logic
	if (isAuthPage && user) {
		// User is already logged in, redirect to dashboard
		throw redirect(302, getDashboardPath(user.role));
	}

	if (isProtectedRoute && !isPublicApiRoute && !user) {
		// Protected route requires authentication
		const redirectTo = encodeURIComponent(pathname + event.url.search);
		throw redirect(302, `/auth/login?redirectTo=${redirectTo}`);
	}

	if (isAdminRoute && user?.role !== 'admin') {
		// Admin route requires admin role
		throw redirect(302, '/auth/login');
	}

	// Check for suspended/deactivated users on all pages except auth
	if (user && user.status !== 'active' && !isAuthPage) {
		event.cookies.delete('session', { path: '/' });
		throw redirect(302, '/auth/login');
	}

	const response = await resolve(event);
	return response;
};

function getDashboardPath(role: string): string {
	switch (role) {
		case 'admin':
			return '/admin/dashboard';
		case 'freelancer':
			return '/dashboard/freelancer';
		case 'client':
			return '/dashboard/client';
		default:
			return '/dashboard';
	}
}
