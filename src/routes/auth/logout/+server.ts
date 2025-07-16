import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	// Clear the session cookie
	cookies.delete('session', {
		path: '/',
		httpOnly: true,
		secure: false, // Set to true in production
		sameSite: 'strict'
	});

	// Redirect to login page
	throw redirect(302, '/auth/login');
};
