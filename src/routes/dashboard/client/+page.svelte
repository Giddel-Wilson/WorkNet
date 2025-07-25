<script lang="ts">
	import type { PageData } from './$types';
	import DashboardNavigation from '$lib/components/DashboardNavigation.svelte';
	import { page } from '$app/stores';

	let { data }: { data: PageData } = $props();
	const user = data.user;
</script>

<svelte:head>
	<title>Client Dashboard - WorkNet</title>
</svelte:head>

<DashboardNavigation {user} currentPath={$page.url.pathname} />

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">Client Dashboard</h1>
		<p class="mt-2 text-gray-600">Manage your projects and find talented freelancers</p>
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
					<p class="text-sm font-medium text-gray-500">Active Jobs</p>
					<p class="text-2xl font-semibold text-gray-900">5</p>
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
					<p class="text-sm font-medium text-gray-500">Proposals Received</p>
					<p class="text-2xl font-semibold text-gray-900">28</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Completed Projects</p>
					<p class="text-2xl font-semibold text-gray-900">12</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-soft p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-8 w-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-500">Total Spent</p>
					<p class="text-2xl font-semibold text-gray-900">$18,540</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Post New Job -->
		<div class="bg-white rounded-lg shadow-soft p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Post New Project</h3>
			<div class="space-y-4">
				<a href="/jobs/create" class="block w-full bg-accent text-white text-center py-3 px-4 rounded-md hover:bg-accent-600 transition-colors">
					Post a New Job
				</a>
				<div class="grid grid-cols-1 gap-3">
					<a href="/freelancers" class="text-sm text-accent hover:text-accent-600 text-center py-2 px-3 border border-accent rounded-md hover:bg-accent-50 transition-colors">
						Browse Freelancers
					</a>
					<a href="/jobs/drafts" class="text-sm text-gray-600 hover:text-gray-800 text-center py-2 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
						Continue Draft
					</a>
				</div>
			</div>
		</div>

		<!-- Manage Projects -->
		<div class="bg-white rounded-lg shadow-soft p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Manage Projects</h3>
			<div class="space-y-3">
				<a href="/jobs/active" class="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary-50 rounded-md transition-colors">
					Active Projects
				</a>
				<a href="/proposals/received" class="block w-full text-left px-4 py-2 text-sm text-accent hover:bg-accent-50 rounded-md transition-colors">
					Review Proposals
				</a>
				<a href="/jobs/completed" class="block w-full text-left px-4 py-2 text-sm text-success hover:bg-success-50 rounded-md transition-colors">
					Completed Projects
				</a>
				<a href="/messages" class="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
					Messages
				</a>
			</div>
		</div>
	</div>

	<!-- Recent Jobs -->
	<div class="mt-8">
		<div class="bg-white rounded-lg shadow-soft">
			<div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-lg font-medium text-gray-900">Your Recent Jobs</h3>
				<a href="/jobs" class="text-sm text-accent hover:text-accent-600">View All</a>
			</div>
			<div class="px-6 py-4">
				<div class="text-sm text-gray-500 text-center py-8">
					No jobs posted yet. <a href="/jobs/create" class="text-accent hover:text-accent-600">Post your first job</a> to get started!
				</div>
			</div>
		</div>
	</div>
</div>
