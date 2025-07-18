import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	
	if (!user) {
		throw redirect(302, '/auth/login');
	}

	// Redirect to role-specific dashboard
	switch (user.role) {
		case 'admin':
			throw redirect(302, '/admin/dashboard');
		case 'freelancer':
			throw redirect(302, '/dashboard/freelancer');
		case 'client':
			throw redirect(302, '/dashboard/client');
		default:
			throw redirect(302, '/dashboard/freelancer'); // Default fallback
	}
};
