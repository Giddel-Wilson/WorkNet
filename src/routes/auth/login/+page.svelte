<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let loading = false;
	let email = '';
	let password = '';

	// Handle form submission with loading state
	const handleSubmit = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			if (result.type === 'success') {
				const redirectTo = $page.url.searchParams.get('redirectTo') || '/dashboard';
				goto(redirectTo);
			}
		};
	};
</script>

<svelte:head>
	<title>Login - WorkNet</title>
	<meta name="description" content="Login to your WorkNet account" />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<!-- Logo and Header -->
		<div class="text-center">
			<h1 class="text-4xl font-bold text-primary mb-2">WorkNet</h1>
			<h2 class="text-2xl font-semibold text-gray-900 mb-2">Sign in to your account</h2>
			<p class="text-sm text-gray-600">
				Don't have an account?
				<a href="/auth/register" class="font-medium text-accent hover:text-accent-dark transition-colors">
					Register here
				</a>
			</p>
		</div>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
			<!-- Error Messages -->
			{#if form?.error}
				<div class="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm text-red-800">{form.error}</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Login Form -->
			<form method="POST" action="?/login" use:enhance={handleSubmit} class="space-y-6">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">
						Email address
					</label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={email}
							disabled={loading}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							placeholder="Enter your email"
						/>
					</div>
					{#if form?.fieldErrors?.email}
						<p class="mt-1 text-sm text-red-600">{form.fieldErrors.email}</p>
					{/if}
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">
						Password
					</label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							bind:value={password}
							disabled={loading}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							placeholder="Enter your password"
						/>
					</div>
					{#if form?.fieldErrors?.password}
						<p class="mt-1 text-sm text-red-600">{form.fieldErrors.password}</p>
					{/if}
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							class="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
						/>
						<label for="remember-me" class="ml-2 block text-sm text-gray-900">
							Remember me
						</label>
					</div>

					<div class="text-sm">
						<a href="/auth/forgot-password" class="font-medium text-accent hover:text-accent-dark transition-colors">
							Forgot your password?
						</a>
					</div>
				</div>

				<div>
					<button
						type="submit"
						disabled={loading || !email || !password}
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{#if loading}
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Signing in...
						{:else}
							Sign in
						{/if}
					</button>
				</div>
			</form>

			<!-- Alternative Login Options -->
			<div class="mt-6">
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300" />
					</div>
					<div class="relative flex justify-center text-sm">
						<span class="px-2 bg-white text-gray-500">New to WorkNet?</span>
					</div>
				</div>

				<div class="mt-6">
					<a
						href="/auth/register"
						class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
					>
						Create a new account
					</a>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div class="mt-8 text-center">
			<p class="text-xs text-gray-500">
				By signing in, you agree to our
				<a href="/terms" class="text-accent hover:text-accent-dark">Terms of Service</a>
				and
				<a href="/privacy" class="text-accent hover:text-accent-dark">Privacy Policy</a>
			</p>
		</div>
	</div>
</div>

<style>
	:global(.text-primary) {
		color: #1B1F3B;
	}
	
	:global(.bg-primary) {
		background-color: #1B1F3B;
	}
	
	:global(.bg-primary-dark) {
		background-color: #151829;
	}
	
	:global(.text-accent) {
		color: #38B2AC;
	}
	
	:global(.text-accent-dark) {
		color: #2C7A7B;
	}
	
	:global(.focus\:ring-accent:focus) {
		--tw-ring-color: #38B2AC;
	}
	
	:global(.focus\:border-accent:focus) {
		border-color: #38B2AC;
	}
	
	:global(.focus\:ring-primary:focus) {
		--tw-ring-color: #1B1F3B;
	}
</style>