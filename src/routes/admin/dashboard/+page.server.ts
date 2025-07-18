import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	
	if (!user) {
		throw redirect(302, '/auth/login');
	}
	
	// Check if user is actually an admin
	if (user.role !== 'admin') {
		throw redirect(302, '/dashboard');
	}
	
	return {
		user
	};
};
