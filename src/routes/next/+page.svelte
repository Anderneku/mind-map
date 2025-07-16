<script lang="ts">
	import { SvelteFlow, Background } from '@xyflow/svelte';
	import { nodesState } from '$lib/store.js';
	import '@xyflow/svelte/dist/style.css';

	let nodes = $state.raw([
		{
			id: '1',
			position: $nodesState[0]?.position || { x: 0, y: 0 },
			data: { label: 'Hello' }
		},
		{
			id: '2',
			position: $nodesState[1]?.position || { x: 0, y: 0 },
			data: { label: 'World' }
		}
	]);
</script>

<div style:width="100vw" style:height="100vh">
	<SvelteFlow bind:nodes fitView>
		<Background />
	</SvelteFlow>
</div>
