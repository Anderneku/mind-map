<script lang="ts">
	import { SvelteFlow, Controls, Background, MiniMap, type ColorMode } from '@xyflow/svelte';
	import { nodesState, edgesState, selectedNodeId, clearInput, hasEdgeLabel } from '$lib/store.js';
	import { StretchVertical, StretchHorizontal, Pause, Play } from '@lucide/svelte';

	import '@xyflow/svelte/dist/style.css';

	import ContextMenu from '$lib/components/ContextMenu.svelte';

	let nodes = $derived($nodesState);
	let edges = $derived($edgesState);
	let showContextMenu = $state(false);

	let mousex = $state(0);
	let mousey = $state(0);

	let selectedNodeInput = $state('');
	let edgeLabelInput = $state('');

	let selectedEdgeType = $state('bezier');
	let selectedNodeType = $state('default');

	let selectedNodeOrientation = $state("vertical");

	let shouldPlay = $state(false);

	$effect(() => {
		nodesState.set(nodes);
		edgesState.set(edges);
		selectedNodeInput = clear() || '';
	});

	function onContextMenu(e) {
		e.preventDefault();
		mousey = e.clientY;
		mousex = e.clientX;
		showContextMenu = true;
	}
	function handleClickOutside(e) {
		if (showContextMenu) {
			showContextMenu = false;
		}
	}
	import { onMount, onDestroy } from 'svelte';
	onMount(() => {
		window.addEventListener('click', handleClickOutside);
	});

	function handleConnection({ source, target }) {
		edgesState.update((edges) => {
			return [
				...edges,
				{ id: String(crypto.randomUUID()), source, target, type: selectedEdgeType, label: $hasEdgeLabel ? edgeLabelInput : "", animated: shouldPlay }
			];
		});
	}

	function handleNodeClick(e) {
		selectedNodeInput = e.node.data.label;
		selectedNodeId.set(e.node.id);
	}

	function handleNodeInputChange() {
		nodesState.update((nodes) => {
			return nodes.map((node) => {
				if (node.id === $selectedNodeId) {
					return { ...node, data: { ...node.data, label: selectedNodeInput } };
				}
				return node;
			});
		});
	}
	function handleEdgeLabelInputChange(){
		if (edgeLabelInput != ""){
			$hasEdgeLabel = true;
		} else {
			$hasEdgeLabel = false;
		}
	}

	function clear() {
		if ($clearInput) {
			for (let node of nodes) {
				if (node.id === $selectedNodeId) {
					selectedNodeInput = node.data.label;
				}
			}
			clearInput.set(false);
			return selectedNodeInput;
		}
		return selectedNodeInput;
	}
</script>

<div style:width="100vw" style:height="100vh">
	<div
		class="absolute z-50 flex h-20 w-full items-center justify-center border-b-2 border-[#1b1a34] bg-white p-4"
	>
		<div class="flex h-12 w-full justify-between rounded-4xl bg-[#cddbe975]">
			<input
				type="text"
				placeholder="Node Label"
				onchange={handleNodeInputChange}
				bind:value={selectedNodeInput}
				class="rounded-4xl border-2 text-[#1b1a34] bg-[#cddbe975] placeholder:text-gray-760 border-[#1b1a34]"
			/>
			<input type="text" placeholder="Connection Label" onchange={handleEdgeLabelInputChange} bind:value={edgeLabelInput} class="rounded-4xl border-2 placeholder:text-gray-760 border-[#1b1a34] bg-[#cddbe975] text-[#1b1a34]" />

			<!-- Line Type Group -->
			<div class="flex items-center gap-1 rounded-4xl bg-[#928eff]">
				<span class="px-4 text-white">Line:</span>
				<button
					onclick={() => (selectedEdgeType = 'bezier')}
					style:background={selectedEdgeType == 'bezier' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Bezier</button
				>
				<button
					onclick={() => (selectedEdgeType = 'step')}
					style:background={selectedEdgeType == 'step' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="min-w-20 cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Step</button
				>
				<button
					onclick={() => (selectedEdgeType = 'smoothstep')}
					style:background={selectedEdgeType == 'smoothstep' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class=" cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Smoothstep</button
				>
				<button
					onclick={() => (selectedEdgeType = 'straight')}
					style:background={selectedEdgeType == 'straight' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Straight</button
				>
			</div>

			<!-- Node Type Group -->
			<div class="flex items-center gap-1 rounded-4xl bg-[#928eff]">
				<span class="px-4 text-white">Node:</span>
				<button
					onclick={() => (selectedNodeType = 'input')}
					style:background={selectedNodeType == 'input' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Input</button
				>
				<button
					onclick={() => (selectedNodeType = 'default')}
					style:background={selectedNodeType == 'default' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="min-w-20 cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Default</button
				>
				<button
					onclick={() => (selectedNodeType = 'output')}
					style:background={selectedNodeType == 'output' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class=" cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Output</button
				>
			</div>

			<!-- Orientation Type Group -->
			<div class="flex items-center gap-1 rounded-4xl bg-[#928eff]">
				<button
					onclick={() => (selectedNodeOrientation = 'vertical')}
					style:background={selectedNodeOrientation == 'vertical' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					><StretchHorizontal /></button
				>
				<button
					onclick={() => (selectedNodeOrientation = 'horizontal')}
					style:background={selectedNodeOrientation == 'horizontal' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					><StretchVertical /></button
				>
			</div>

			<div class="flex items-center gap-1 rounded-4xl bg-[#928eff]">
				<button
					onclick={() => (shouldPlay = false)}
					style:background={shouldPlay  ? 'transparent' : '#1b1a34'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					><Pause /></button
				>
				<button
					onclick={() => (shouldPlay = true)}
					style:background={shouldPlay ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					><Play /></button
				>
			</div>
		</div>
	</div>
	{#if nodes}
		<SvelteFlow
			onnodeclick={handleNodeClick}
			oncontextmenu={onContextMenu}
			bind:nodes
			bind:edges
			onconnect={handleConnection}
			fitView
			proOptions={{ hideAttribution: true }}
		>
			<Background />
			<ContextMenu {showContextMenu} {mousex} {mousey} nodeType={selectedNodeType} orientation={selectedNodeOrientation} />
			<MiniMap />
			<Controls />
		</SvelteFlow>
	{/if}
</div>
