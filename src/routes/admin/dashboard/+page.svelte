<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const user = data.user;
</script>

<svelte:head>
	<title>Admin Dashboard - WorkNet</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
		<p class="mt-2 text-gray-600">Manage users, jobs, and platform activities</p>
	</div>

	<!-- Quick Stats -->
	<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Total Users</p>
					<p class="text-2xl font-semibold text-gray-900">1,234</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Active Jobs</p>
					<p class="text-2xl font-semibold text-gray-900">89</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Flagged Content</p>
					<p class="text-2xl font-semibold text-gray-900">12</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Revenue</p>
					<p class="text-2xl font-semibold text-gray-900">$45,230</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<div class="bg-white rounded-lg shadow-soft p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">User Management</h3>
			<div class="space-y-3">
				<a href="/admin/users" class="block w-full text-left px-4 py-2 text-sm text-accent hover:bg-accent-50 rounded-md transition-colors">
					View All Users
				</a>
				<a href="/admin/users/suspended" class="block w-full text-left px-4 py-2 text-sm text-warning hover:bg-warning-50 rounded-md transition-colors">
					Suspended Users
				</a>
				<a href="/admin/users/create" class="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary-50 rounded-md transition-colors">
					Create Admin User
				</a>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Content Moderation</h3>
			<div class="space-y-3">
				<a href="/admin/jobs/flagged" class="block w-full text-left px-4 py-2 text-sm text-warning hover:bg-warning-50 rounded-md transition-colors">
					Flagged Jobs
				</a>
				<a href="/admin/proposals/flagged" class="block w-full text-left px-4 py-2 text-sm text-warning hover:bg-warning-50 rounded-md transition-colors">
					Flagged Proposals
				</a>
				<a href="/admin/reviews" class="block w-full text-left px-4 py-2 text-sm text-accent hover:bg-accent-50 rounded-md transition-colors">
					Review Reports
				</a>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Platform Analytics</h3>
			<div class="space-y-3">
				<a href="/admin/analytics" class="block w-full text-left px-4 py-2 text-sm text-accent hover:bg-accent-50 rounded-md transition-colors">
					Platform Statistics
				</a>
				<a href="/admin/logs" class="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
					Admin Action Logs
				</a>
				<a href="/admin/reports" class="block w-full text-left px-4 py-2 text-sm text-purple hover:bg-purple-50 rounded-md transition-colors">
					Generate Reports
				</a>
			</div>
		</div>
	</div>

	<!-- Recent Activity -->
	<div class="mt-8">
		<div class="bg-white rounded-lg shadow-soft">
			<div class="px-6 py-4 border-b border-gray-200">
				<h3 class="text-lg font-medium text-gray-900">Recent Admin Actions</h3>
			</div>
			<div class="px-6 py-4">
				<div class="text-sm text-gray-500 text-center py-8">
					No recent admin actions to display.
				</div>
			</div>
		</div>
	</div>
</div>
