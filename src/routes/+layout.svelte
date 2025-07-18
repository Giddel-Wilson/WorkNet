<script lang="ts">
	import '../app.css';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
	
	const user = data.user;
</script>

<div class="min-h-screen bg-white">
	<!-- Main content -->
	<main>
		{@render children()}
	</main>
	
	<!-- Toast notifications -->
	<ToastContainer />
</div>
