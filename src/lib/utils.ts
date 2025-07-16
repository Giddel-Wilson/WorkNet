/**
 * Utility functions for WorkNet application
 */

/**
 * Format currency amounts
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	}).format(amount);
}

/**
 * Format dates in a user-friendly way
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(dateObj);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 },
		{ label: 'week', seconds: 604800 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 1 }
	];

	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
		}
	}

	return 'Just now';
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Generate a random color for user avatars
 */
export function generateAvatarColor(userId: string): string {
	const colors = [
		'#38B2AC', // teal
		'#9F7AEA', // purple
		'#ED8936', // orange
		'#4299E1', // blue
		'#48BB78', // green
		'#ED64A6', // pink
		'#F56565', // red
		'#38A169'  // darker green
	];

	// Simple hash function to get consistent color for user
	let hash = 0;
	for (let i = 0; i < userId.length; i++) {
		hash = userId.charCodeAt(i) + ((hash << 5) - hash);
	}
	
	return colors[Math.abs(hash) % colors.length];
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (password.length < 8) {
		errors.push('Password must be at least 8 characters long');
	}
	
	if (!/[A-Z]/.test(password)) {
		errors.push('Password must contain at least one uppercase letter');
	}
	
	if (!/[a-z]/.test(password)) {
		errors.push('Password must contain at least one lowercase letter');
	}
	
	if (!/\d/.test(password)) {
		errors.push('Password must contain at least one number');
	}

	return {
		isValid: errors.length === 0,
		errors
	};
}

/**
 * Generate initials from a name
 */
export function getInitials(name: string): string {
	return name
		.split(' ')
		.map(part => part.charAt(0).toUpperCase())
		.slice(0, 2)
		.join('');
}

/**
 * Sleep/delay function for async operations
 */
export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;
	
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(...args), delay);
	};
}

/**
 * Convert file size to human readable format
 */
export function formatFileSize(bytes: number): string {
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	if (bytes === 0) return '0 Bytes';
	
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Check if user can perform action based on role
 */
export function canPerformAction(
	userRole: string,
	action: string,
	resourceOwnerId?: string,
	userId?: string
): boolean {
	// Admin can do everything
	if (userRole === 'admin') return true;

	// Role-based permissions
	const permissions: Record<string, string[]> = {
		freelancer: [
			'view:jobs',
			'create:proposal',
			'view:own_proposals',
			'edit:own_profile',
			'send:message'
		],
		client: [
			'create:job',
			'view:own_jobs',
			'edit:own_jobs',
			'view:proposals',
			'accept:proposal',
			'send:message'
		]
	};

	const userPermissions = permissions[userRole] || [];
	
	// Check if user has permission for this action
	if (!userPermissions.includes(action)) return false;

	// Check ownership for own resources
	if (action.includes('own') && resourceOwnerId !== userId) return false;

	return true;
}
