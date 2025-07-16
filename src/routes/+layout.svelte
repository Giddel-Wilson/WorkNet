<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
	
	const user = data.user;
</script>

<div class="min-h-screen bg-white">
	<!-- Navigation for authenticated users only -->
	{#if user}
		<nav class="bg-white border-b border-slate-200">
			<div class="max-w-6xl mx-auto px-6">
				<div class="flex justify-between items-center h-16">
					<div class="flex items-center">
						<a href="/" class="text-2xl font-bold text-slate-900">
							WorkNet
						</a>
					</div>
					
					<div class="flex items-center space-x-6">
						{#if user.role === 'freelancer'}
							<a href="/jobs" class="text-slate-600 hover:text-slate-900 font-medium">Browse Jobs</a>
							<a href="/dashboard/freelancer" class="text-slate-600 hover:text-slate-900 font-medium">Dashboard</a>
						{:else if user.role === 'client'}
							<a href="/jobs/create" class="text-slate-600 hover:text-slate-900 font-medium">Post Job</a>
							<a href="/dashboard/client" class="text-slate-600 hover:text-slate-900 font-medium">Dashboard</a>
						{:else if user.role === 'admin'}
							<a href="/admin/dashboard" class="text-slate-600 hover:text-slate-900 font-medium">Admin</a>
						{/if}
						
						<div class="flex items-center space-x-3">
							<span class="text-sm text-slate-600">Welcome, {user.name}</span>
							<div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
								<span class="text-slate-700 text-sm font-medium">
									{user.name.charAt(0).toUpperCase()}
								</span>
							</div>
							<a href="/auth/logout" class="text-sm text-slate-500 hover:text-slate-700">Logout</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	{/if}

	<!-- Main content -->
	<main>
		{@render children()}
	</main>
</div>
