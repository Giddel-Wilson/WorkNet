import type { LayoutServerLoad } from './$types';
// Initialize database on startup
import '$lib/database-init';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user
	};
};
