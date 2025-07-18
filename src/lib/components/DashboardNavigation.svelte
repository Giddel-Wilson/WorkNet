<script lang="ts">
	import type { User } from '@prisma/client';
	
	interface Props {
		user: User;
		currentPath?: string;
	}
	
	let { user, currentPath = '' }: Props = $props();
	
	// Mobile menu state
	let mobileMenuOpen = $state(false);
	
	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};
	
	// Navigation items based on user role
	const getNavItems = (userRole: string) => {
		const common = [
			{ href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
			{ href: '/messages', label: 'Messages', icon: 'messages' },
			{ href: '/settings', label: 'Settings', icon: 'settings' }
		];
		
		if (userRole === 'freelancer') {
			return [
				{ href: '/dashboard/freelancer', label: 'Dashboard', icon: 'dashboard' },
				{ href: '/jobs', label: 'Find Jobs', icon: 'search' },
				{ href: '/proposals', label: 'My Proposals', icon: 'proposals' },
				{ href: '/profile', label: 'Profile', icon: 'profile' },
				{ href: '/messages', label: 'Messages', icon: 'messages' },
				{ href: '/settings', label: 'Settings', icon: 'settings' }
			];
		} else if (userRole === 'client') {
			return [
				{ href: '/dashboard/client', label: 'Dashboard', icon: 'dashboard' },
				{ href: '/jobs/post', label: 'Post a Job', icon: 'plus' },
				{ href: '/jobs/manage', label: 'Manage Jobs', icon: 'briefcase' },
				{ href: '/freelancers', label: 'Find Freelancers', icon: 'search' },
				{ href: '/messages', label: 'Messages', icon: 'messages' },
				{ href: '/settings', label: 'Settings', icon: 'settings' }
			];
		} else if (userRole === 'admin') {
			return [
				{ href: '/admin/dashboard', label: 'Admin Dashboard', icon: 'dashboard' },
				{ href: '/admin/users', label: 'Users', icon: 'users' },
				{ href: '/admin/jobs', label: 'Jobs', icon: 'briefcase' },
				{ href: '/admin/reports', label: 'Reports', icon: 'reports' },
				{ href: '/settings', label: 'Settings', icon: 'settings' }
			];
		}
		
		return common;
	};
	
	const navItems = $derived(getNavItems(user.role));
	
	// Check if current path matches nav item
	const isActive = (href: string) => {
		return currentPath === href || currentPath.startsWith(href + '/');
	};
	
	// Get icon SVG
	const getIcon = (iconName: string) => {
		const icons = {
			dashboard: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v5a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />',
			search: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />',
			plus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />',
			briefcase: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
			messages: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />',
			settings: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
			profile: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />',
			proposals: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />',
			users: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />',
			reports: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />'
		};
		return icons[iconName] || icons.dashboard;
	};
</script>

<nav class="bg-white border-b border-gray-200 shadow-sm">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-sm">W</span>
					</div>
					<span class="text-xl font-bold text-gray-900">WorkNet</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-1">
				{#each navItems as item}
					<a 
						href={item.href} 
						class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isActive(item.href) 
							? 'bg-blue-50 text-blue-700 border border-blue-200' 
							: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{@html getIcon(item.icon)}
						</svg>
						<span>{item.label}</span>
					</a>
				{/each}
			</div>

			<!-- User Profile & Actions -->
			<div class="hidden md:flex items-center space-x-4">
				<div class="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50">
					<div class="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
						{#if user.avatarUrl}
							<img src={user.avatarUrl} alt={user.name} class="w-8 h-8 rounded-full object-cover" />
						{:else}
							<span class="text-white text-sm font-semibold">{user.name.charAt(0).toUpperCase()}</span>
						{/if}
					</div>
					<div class="flex flex-col min-w-0">
						<span class="text-sm font-semibold text-gray-900 truncate">{user.name}</span>
						<span class="text-xs text-gray-500 capitalize">{user.role}</span>
					</div>
				</div>
				
				<div class="h-6 w-px bg-gray-300"></div>
				
				<a 
					href="/auth/logout" 
					class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-red-200"
				>
					Sign out
				</a>
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden">
				<button 
					onclick={toggleMobileMenu}
					class="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
					aria-label="Toggle mobile menu"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if mobileMenuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						{/if}
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="md:hidden border-t border-gray-200 bg-white">
				<div class="px-2 pt-2 pb-3 space-y-1">
					{#each navItems as item}
						<a 
							href={item.href} 
							class="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 {isActive(item.href) 
								? 'bg-blue-50 text-blue-700 border border-blue-200' 
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								{@html getIcon(item.icon)}
							</svg>
							<span>{item.label}</span>
						</a>
					{/each}
				</div>
				
				<div class="border-t border-gray-200 pt-4 pb-3">
					<div class="flex items-center px-5">
						<div class="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
							{#if user.avatarUrl}
								<img src={user.avatarUrl} alt={user.name} class="w-10 h-10 rounded-full object-cover" />
							{:else}
								<span class="text-white font-semibold">{user.name.charAt(0).toUpperCase()}</span>
							{/if}
						</div>
						<div class="ml-3">
							<div class="text-base font-semibold text-gray-900">{user.name}</div>
							<div class="text-sm text-gray-500 capitalize">{user.role}</div>
						</div>
					</div>
					<div class="mt-3 px-2">
						<a 
							href="/auth/logout" 
							class="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
						>
							Sign out
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</nav>
