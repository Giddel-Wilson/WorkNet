<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toasts } from '$lib/stores/toast';
	import { onMount } from 'svelte';
	import type { ActionData, SubmitFunction } from './$types';

	export let form: ActionData;

	// Type assertions for form data
	$: formWithErrors = form as { error: string; fieldErrors?: Record<string, string> } | null;

	let loading = false;
	let email = '';
	let password = '';
	let confirmPassword = '';
	let name = '';
	let role: 'freelancer' | 'client' = 'freelancer';
	let showSuccessMessage = false;
	let redirectCountdown = 5;

	// Check for success message from URL
	$: isSuccess = $page.url.searchParams.get('success') === 'true';

	// Show error toasts when form errors occur
	$: if (formWithErrors?.error) {
		toasts.error(formWithErrors.error);
	}

	// Handle form submission with loading state
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			if (result.type === 'success') {
				// Registration successful
				showSuccessMessage = true;
				toasts.success('Account created successfully! Redirecting to login page...');
				
				// Start countdown for redirect
				const countdownInterval = setInterval(() => {
					redirectCountdown--;
					if (redirectCountdown <= 0) {
						clearInterval(countdownInterval);
						goto('/auth/login?registered=true');
					}
				}, 1000);
				
				return;
			}
		};
	};
</script>

<svelte:head>
	<title>Register - WorkNet</title>
	<meta name="description" content="Create your WorkNet account" />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<!-- Logo and Header -->
		<div class="text-center">
			<h1 class="text-4xl font-bold text-slate-900 mb-2">WorkNet</h1>
			<h2 class="text-2xl font-semibold text-gray-900 mb-2">Create your account</h2>
			<p class="text-sm text-gray-600">
				Already have an account?
				<a href="/auth/login" class="font-medium text-slate-600 hover:text-slate-900 transition-colors">
					Sign in here
				</a>
			</p>
		</div>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
			<!-- Success Message with Countdown -->
			{#if showSuccessMessage}
				<div class="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3 flex-1">
							<h3 class="text-sm font-medium text-green-800">Account Created Successfully!</h3>
							<p class="text-sm text-green-700 mt-1">
								Redirecting to login page in {redirectCountdown} seconds...
							</p>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Success Message from URL -->
			{#if isSuccess}
				<div class="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm text-green-800">Registration successful! Please log in with your credentials.</p>
						</div>
					</div>
				</div>
			{/if}

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
							<p class="text-sm text-red-800">{formWithErrors?.error || form?.error}</p>
						</div>
					</div>
				</div>
			{/if}

			{#if !showSuccessMessage}
				<!-- Registration Form -->
				<form method="POST" action="?/register" use:enhance={handleSubmit} class="space-y-6">
				<!-- Role Selection -->
				<fieldset>
					<legend class="block text-sm font-medium text-gray-700 mb-3">
						I want to:
					</legend>
					<div class="grid grid-cols-2 gap-3">
						<label for="role-freelancer" class="cursor-pointer">
							<input
								id="role-freelancer"
								type="radio"
								name="role"
								value="freelancer"
								bind:group={role}
								class="sr-only"
							/>
							<div class="p-4 border rounded-lg text-center transition-all {role === 'freelancer' ? 'border-slate-500 bg-slate-50 text-slate-700' : 'border-gray-300 hover:border-gray-400'}">
								<svg class="h-6 w-6 mx-auto mb-2 {role === 'freelancer' ? 'text-slate-600' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								<span class="text-sm font-medium">Find Work</span>
								<p class="text-xs text-gray-500 mt-1">I'm a freelancer</p>
							</div>
						</label>

						<label for="role-client" class="cursor-pointer">
							<input
								id="role-client"
								type="radio"
								name="role"
								value="client"
								bind:group={role}
								class="sr-only"
							/>
							<div class="p-4 border rounded-lg text-center transition-all {role === 'client' ? 'border-slate-500 bg-slate-50 text-slate-700' : 'border-gray-300 hover:border-gray-400'}">
								<svg class="h-6 w-6 mx-auto mb-2 {role === 'client' ? 'text-slate-600' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
								<span class="text-sm font-medium">Hire Talent</span>
								<p class="text-xs text-gray-500 mt-1">I'm a client</p>
							</div>
						</label>
					</div>
				</fieldset>

				<!-- Name Field -->
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">
						Full Name
					</label>
					<div class="mt-1">
						<input
							id="name"
							name="name"
							type="text"
							required
							bind:value={name}
							disabled={loading}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							placeholder="Enter your full name"
						/>
					</div>
					{#if formWithErrors?.fieldErrors?.name}
						<p class="mt-1 text-sm text-red-600">{formWithErrors.fieldErrors.name}</p>
					{/if}
				</div>

				<!-- Email Field -->
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
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							placeholder="Enter your email"
						/>
					</div>
					{#if formWithErrors?.fieldErrors?.email}
						<p class="mt-1 text-sm text-red-600">{formWithErrors.fieldErrors.email}</p>
					{/if}
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">
						Password
					</label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							required
							bind:value={password}
							disabled={loading}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							placeholder="Create a password"
						/>
					</div>
					{#if formWithErrors?.fieldErrors?.password}
						<p class="mt-1 text-sm text-red-600">{formWithErrors.fieldErrors.password}</p>
					{/if}
				</div>

				<!-- Confirm Password Field -->
				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700">
						Confirm Password
					</label>
					<div class="mt-1">
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							bind:value={confirmPassword}
							disabled={loading}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							placeholder="Confirm your password"
						/>
					</div>
					{#if formWithErrors?.fieldErrors?.confirmPassword}
						<p class="mt-1 text-sm text-red-600">{formWithErrors.fieldErrors.confirmPassword}</p>
					{/if}
				</div>

				<!-- Terms and Conditions -->
				<div class="flex items-center">
					<input
						id="agree-terms"
						name="agree-terms"
						type="checkbox"
						required
						class="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
					/>
					<label for="agree-terms" class="ml-2 block text-sm text-gray-900">
						I agree to the
						<a href="/terms" class="text-slate-600 hover:text-slate-900">Terms of Service</a>
						and
						<a href="/privacy" class="text-slate-600 hover:text-slate-900">Privacy Policy</a>
					</label>
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						disabled={loading || !name || !email || !password || !confirmPassword}
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{#if loading}
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Creating account...
						{:else}
							Create Account
						{/if}
					</button>
				</div>
			</form>
			{/if}
		</div>

		<!-- Footer -->
		<div class="mt-8 text-center">
			<p class="text-xs text-gray-500">
				By creating an account, you agree to our
				<a href="/terms" class="text-slate-600 hover:text-slate-900">Terms of Service</a>
				and
				<a href="/privacy" class="text-slate-600 hover:text-slate-900">Privacy Policy</a>
			</p>
		</div>
	</div>
</div>
