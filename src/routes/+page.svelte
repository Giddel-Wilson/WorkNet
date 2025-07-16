<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const user = data.user;
	
	// Mobile menu state
	let mobileMenuOpen = $state(false);
	
	const toggleMobileMenu = () => {
		console.log('Toggle menu clicked, current state:', mobileMenuOpen);
		mobileMenuOpen = !mobileMenuOpen;
		console.log('New state:', mobileMenuOpen);
	};
</script>

<svelte:head>
	<title>WorkNet - Freelancer Marketplace</title>
	<meta name="description" content="Connect with talented freelancers or find your next project on WorkNet" />
</svelte:head>

{#if user}
	<!-- Authenticated user dashboard -->
	<div class="min-h-screen bg-white">
		<div class="max-w-4xl mx-auto px-6 py-20">
			<div class="text-center mb-16">
				<h1 class="text-5xl font-bold text-slate-900 mb-6">
					Welcome back, {user.name}
				</h1>
				<p class="text-xl text-slate-600">
					Ready to continue your journey?
				</p>
			</div>

			<div class="grid gap-6 {user.role === 'admin' ? 'max-w-md mx-auto' : 'md:grid-cols-2'}">
				{#if user.role === 'admin'}
					<a href="/admin/dashboard" 
					   class="block p-8 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
						<div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
							<svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-slate-900 mb-2">Admin Dashboard</h3>
						<p class="text-slate-600">Manage users and platform operations</p>
					</a>
				{:else if user.role === 'freelancer'}
					<a href="/dashboard/freelancer" 
					   class="block p-8 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
						<div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
							<svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-slate-900 mb-2">My Dashboard</h3>
						<p class="text-slate-600">View projects and proposals</p>
					</a>
					
					<a href="/jobs" 
					   class="block p-8 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
						<div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
							<svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-slate-900 mb-2">Browse Jobs</h3>
						<p class="text-slate-600">Find new opportunities</p>
					</a>
				{:else if user.role === 'client'}
					<a href="/dashboard/client" 
					   class="block p-8 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
						<div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
							<svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-slate-900 mb-2">My Dashboard</h3>
						<p class="text-slate-600">Manage projects and proposals</p>
					</a>
					
					<a href="/jobs/create" 
					   class="block p-8 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
						<div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
							<svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-slate-900 mb-2">Post a Job</h3>
						<p class="text-slate-600">Find the perfect freelancer</p>
					</a>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<!-- Public landing page -->
	<div class="bg-white">
		<!-- Header -->
		<header class="bg-white border-b border-slate-200">
			<nav class="max-w-6xl mx-auto px-6">
				<div class="flex justify-between items-center h-16">
					<!-- Logo -->
					<div class="flex items-center">
						<a href="/" class="text-2xl font-bold text-slate-900">
							WorkNet
						</a>
					</div>

					<!-- Desktop Navigation -->
					<div class="hidden lg:flex items-center justify-between w-full">	
                        <div class="flex mx-auto space-x-10">
                            <a href="/about" class="text-slate-600 hover:text-slate-900 font-medium">About</a>
						    <a href="/services" class="text-slate-600 hover:text-slate-900 font-medium">Services</a>
						    <a href="/contact" class="text-slate-600 hover:text-slate-900 font-medium">Contact</a>
                        </div>
                        <div class="flex items-center space-x-8">
                            <a href="/auth/login" class="text-slate-600 hover:text-slate-900 font-medium">Sign In</a>
						    <a href="/auth/register" class="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
							    Get Started
						    </a>
                        </div>
					</div>

					<!-- Mobile menu button -->
					<div class="lg:hidden">
						<button 
							onclick={toggleMobileMenu}
							class="text-slate-600 hover:text-slate-900 focus:outline-none focus:text-slate-900"
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
					<div class="lg:hidden border-t border-slate-200 py-4">
						<div class="flex flex-col space-y-4">
							<a href="/about" class="text-slate-600 hover:text-slate-900 font-medium px-2 py-1">About</a>
							<a href="/services" class="text-slate-600 hover:text-slate-900 font-medium px-2 py-1">Services</a>
							<a href="/contact" class="text-slate-600 hover:text-slate-900 font-medium px-2 py-1">Contact</a>
							<div class="border-t border-slate-200 pt-4 mt-4">
								<a href="/auth/login" class="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 block mb-3">Sign In</a>
								<a href="/auth/register" class="bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors px-4 py-2 block text-center">
									Get Started
								</a>
							</div>
						</div>
					</div>
				{/if}
			</nav>
		</header>

		<!-- Hero Section -->
		<section class="py-16 md:py-24 lg:py-32 bg-white">
			<div class="max-w-6xl mx-auto px-6">
				<div class="text-center">
					<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 md:mb-8">
						We build products that users love.
					</h1>
					
					<p class="text-lg md:text-xl text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto">
						Connect with talented freelancers or find your next project on WorkNet - the modern freelancer marketplace.
					</p>
					
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<a href="/auth/register" 
						   class="px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
							Get Started
						</a>
						
						<a href="/auth/login" 
						   class="px-6 md:px-8 py-3 md:py-4 border border-slate-300 text-slate-900 rounded-lg font-medium hover:border-slate-400 transition-colors">
							Sign In
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Services Section -->
		<section class="py-16 md:py-20 bg-slate-900">
			<div class="max-w-6xl mx-auto px-6">
				<div class="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
					<div>
						<h2 class="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
							Services we can help you with.
						</h2>
						
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-slate-300">
							<div>
								<h3 class="font-medium mb-2">Web Development</h3>
								<h3 class="font-medium mb-2">Mobile Apps</h3>
								<h3 class="font-medium mb-2">UI/UX Design</h3>
								<h3 class="font-medium mb-2">Digital Marketing</h3>
								<h3 class="font-medium mb-2">Content Writing</h3>
								<h3 class="font-medium mb-2">SEO Optimization</h3>
							</div>
							<div>
								<h3 class="font-medium mb-2">Graphics Design</h3>
								<h3 class="font-medium mb-2">Video Editing</h3>
								<h3 class="font-medium mb-2">Data Analysis</h3>
								<h3 class="font-medium mb-2">Consulting</h3>
								<h3 class="font-medium mb-2">Project Management</h3>
								<h3 class="font-medium mb-2">And much more...</h3>
							</div>
						</div>
					</div>
					
					<div class="text-center lg:text-right">
						<div class="text-6xl md:text-7xl lg:text-8xl font-bold text-white">12.</div>
						<p class="text-slate-400 mt-2 md:mt-4">Years of experience</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section class="py-16 md:py-20 bg-white">
			<div class="max-w-6xl mx-auto px-6">
				<div class="text-center mb-12 md:mb-16">
					<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
						Why choose WorkNet?
					</h2>
					<p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
						The modern platform designed for freelancers and clients to collaborate effectively.
					</p>
				</div>

				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					<div class="text-center">
						<div class="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
							<svg class="w-7 h-7 md:w-8 md:h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h3 class="text-lg md:text-xl font-semibold text-slate-900 mb-3 md:mb-4">Quality Freelancers</h3>
						<p class="text-slate-600 text-sm md:text-base">Connect with vetted professionals who deliver exceptional results.</p>
					</div>

					<div class="text-center">
						<div class="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
							<svg class="w-7 h-7 md:w-8 md:h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						</div>
						<h3 class="text-lg md:text-xl font-semibold text-slate-900 mb-3 md:mb-4">Secure Payments</h3>
						<p class="text-slate-600 text-sm md:text-base">Safe and reliable payment processing with dispute resolution.</p>
					</div>

					<div class="text-center sm:col-span-2 lg:col-span-1">
						<div class="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
							<svg class="w-7 h-7 md:w-8 md:h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<h3 class="text-lg md:text-xl font-semibold text-slate-900 mb-3 md:mb-4">Fast Delivery</h3>
						<p class="text-slate-600 text-sm md:text-base">Get your projects completed quickly with our efficient workflow.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="py-16 md:py-20 bg-slate-50">
			<div class="max-w-4xl mx-auto px-6 text-center">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
					Ready to get started?
				</h2>
				<p class="text-lg md:text-xl text-slate-600 mb-8 md:mb-10">
					Join thousands of freelancers and clients building the future of work.
				</p>
				
				<a href="/auth/register" 
				   class="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
					Start Your Journey
					<svg class="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</a>
			</div>
		</section>

		<!-- Footer -->
		<footer class="bg-slate-900 text-white">
			<div class="max-w-6xl mx-auto px-6 py-12 md:py-16">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<!-- Company Info -->
					<div class="md:col-span-2 lg:col-span-1">
						<h3 class="text-xl font-bold mb-4">WorkNet</h3>
						<p class="text-slate-400 text-sm mb-4">
							The modern freelancer marketplace connecting talented professionals with innovative clients worldwide.
						</p>
						<div class="flex space-x-4">
							<a href="#" class="text-slate-400 hover:text-white transition-colors">
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
								</svg>
							</a>
							<a href="#" class="text-slate-400 hover:text-white transition-colors">
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
									<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</a>
							<a href="#" class="text-slate-400 hover:text-white transition-colors">
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
								</svg>
							</a>
						</div>
					</div>

					<!-- Quick Links -->
					<div>
						<h4 class="font-semibold mb-4">Platform</h4>
						<ul class="space-y-2 text-sm text-slate-400">
							<li><a href="/jobs" class="hover:text-white transition-colors">Browse Jobs</a></li>
							<li><a href="/freelancers" class="hover:text-white transition-colors">Find Freelancers</a></li>
							<li><a href="/auth/register" class="hover:text-white transition-colors">Sign Up</a></li>
							<li><a href="/auth/login" class="hover:text-white transition-colors">Sign In</a></li>
						</ul>
					</div>

					<!-- Services -->
					<div>
						<h4 class="font-semibold mb-4">Services</h4>
						<ul class="space-y-2 text-sm text-slate-400">
							<li><a href="#" class="hover:text-white transition-colors">Web Development</a></li>
							<li><a href="#" class="hover:text-white transition-colors">Mobile Apps</a></li>
							<li><a href="#" class="hover:text-white transition-colors">UI/UX Design</a></li>
							<li><a href="#" class="hover:text-white transition-colors">Digital Marketing</a></li>
						</ul>
					</div>

					<!-- Support -->
					<div>
						<h4 class="font-semibold mb-4">Support</h4>
						<ul class="space-y-2 text-sm text-slate-400">
							<li><a href="/help" class="hover:text-white transition-colors">Help Center</a></li>
							<li><a href="/contact" class="hover:text-white transition-colors">Contact Us</a></li>
							<li><a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a></li>
							<li><a href="/terms" class="hover:text-white transition-colors">Terms of Service</a></li>
						</ul>
					</div>
				</div>

				<div class="border-t border-slate-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
					<p class="text-slate-400 text-sm text-center md:text-left">
						© 2025 WorkNet. All rights reserved.
					</p>
					<div class="flex space-x-6 mt-4 md:mt-0">
						<a href="/privacy" class="text-slate-400 hover:text-white text-sm transition-colors">Privacy</a>
						<a href="/terms" class="text-slate-400 hover:text-white text-sm transition-colors">Terms</a>
						<a href="/cookies" class="text-slate-400 hover:text-white text-sm transition-colors">Cookies</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
{/if}
