// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			status?: number;
		}
		
		interface Locals {
			user?: {
				id: string;
				name: string;
				email: string;
				role: string; // "freelancer" | "client" | "admin"
				status: string; // "active" | "suspended" | "deactivated"
				avatarUrl?: string | null;
			};
		}
		
		interface PageData {
			user?: App.Locals['user'];
		}
		
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
