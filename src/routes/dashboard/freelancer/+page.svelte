<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const user = data.user;
</script>

<svelte:head>
	<title>Freelancer Dashboard - WorkNet</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
		<p class="mt-2 text-gray-600">Manage your projects and find new opportunities</p>
	</div>

	<!-- Quick Stats -->
	<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Active Projects</p>
					<p class="text-2xl font-semibold text-gray-900">3</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Proposals Sent</p>
					<p class="text-2xl font-semibold text-gray-900">12</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Earnings</p>
					<p class="text-2xl font-semibold text-gray-900">$5,280</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Rating</p>
					<p class="text-2xl font-semibold text-gray-900">4.8</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Browse Jobs -->
		<div class="bg-white rounded-lg shadow-soft p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Find New Work</h3>
			<div class="space-y-4">
				<a href="/jobs" class="block w-full bg-accent text-white text-center py-3 px-4 rounded-md hover:bg-accent-600 transition-colors">
					Browse All Jobs
				</a>
				<div class="grid grid-cols-2 gap-3">
					<a href="/jobs?category=web-development" class="text-sm text-accent hover:text-accent-600 text-center py-2 px-3 border border-accent rounded-md hover:bg-accent-50 transition-colors">
						Web Development
					</a>
					<a href="/jobs?category=design" class="text-sm text-accent hover:text-accent-600 text-center py-2 px-3 border border-accent rounded-md hover:bg-accent-50 transition-colors">
						Design
					</a>
					<a href="/jobs?category=writing" class="text-sm text-accent hover:text-accent-600 text-center py-2 px-3 border border-accent rounded-md hover:bg-accent-50 transition-colors">
						Writing
					</a>
					<a href="/jobs?category=marketing" class="text-sm text-accent hover:text-accent-600 text-center py-2 px-3 border border-accent rounded-md hover:bg-accent-50 transition-colors">
						Marketing
					</a>
				</div>
			</div>
		</div>

		<!-- Profile Management -->
		<div class="bg-white rounded-lg shadow-soft p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Profile & Settings</h3>
			<div class="space-y-3">
				<a href="/profile" class="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary-50 rounded-md transition-colors">
					Edit Profile
				</a>
				<a href="/portfolio" class="block w-full text-left px-4 py-2 text-sm text-accent hover:bg-accent-50 rounded-md transition-colors">
					Manage Portfolio
				</a>
				<a href="/proposals" class="block w-full text-left px-4 py-2 text-sm text-purple hover:bg-purple-50 rounded-md transition-colors">
					My Proposals
				</a>
				<a href="/messages" class="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
					Messages
				</a>
			</div>
		</div>
	</div>

	<!-- Recent Activity -->
	<div class="mt-8">
		<div class="bg-white rounded-lg shadow-soft">
			<div class="px-6 py-4 border-b border-gray-200">
				<h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
			</div>
			<div class="px-6 py-4">
				<div class="text-sm text-gray-500 text-center py-8">
					No recent activity to display. Start by browsing jobs or updating your profile!
				</div>
			</div>
		</div>
	</div>
</div>
