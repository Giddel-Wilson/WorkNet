import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const user = locals.user;

	if (user) {
		return json({
			authenticated: true,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				status: user.status,
				avatarUrl: user.avatarUrl
			}
		});
	}

	return json({
		authenticated: false,
		user: null
	});
};
