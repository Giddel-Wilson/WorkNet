import type { Cookies } from '@sveltejs/kit';
import type { UserRole, UserStatus } from '@prisma/client';

export interface SessionUser {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status?: UserStatus;
	avatarUrl?: string | null;
}

export interface SessionData {
	id: string;
	userId: string;
	name: string;
	email: string;
	role: UserRole;
	avatarUrl?: string | null;
}

/**
 * Get the current user session from cookies
 */
export function getSession(cookies: Cookies): SessionData | null {
	try {
		const sessionCookie = cookies.get('session');
		if (!sessionCookie) return null;

		const session = JSON.parse(sessionCookie) as SessionData;
		return session;
	} catch {
		return null;
	}
}

/**
 * Clear the user session
 */
export function clearSession(cookies: Cookies): void {
	cookies.delete('session', {
		path: '/',
		httpOnly: true,
		secure: false, // Set to true in production
		sameSite: 'strict'
	});
}

/**
 * Check if user has required role
 */
export function hasRole(user: SessionUser | null, requiredRole: UserRole): boolean {
	return user?.role === requiredRole;
}

/**
 * Check if user has any of the required roles
 */
export function hasAnyRole(user: SessionUser | null, requiredRoles: UserRole[]): boolean {
	return user ? requiredRoles.includes(user.role) : false;
}

/**
 * Check if user is admin
 */
export function isAdmin(user: SessionUser | null): boolean {
	return hasRole(user, 'admin');
}

/**
 * Check if user is freelancer
 */
export function isFreelancer(user: SessionUser | null): boolean {
	return hasRole(user, 'freelancer');
}

/**
 * Check if user is client
 */
export function isClient(user: SessionUser | null): boolean {
	return hasRole(user, 'client');
}

/**
 * Check if user account is active
 */
export function isActiveUser(user: SessionUser | null): boolean {
	return user?.status === 'active' || user?.status === undefined; // undefined for backward compatibility
}

/**
 * Get redirect path based on user role
 */
export function getDefaultRedirectPath(role: UserRole): string {
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
