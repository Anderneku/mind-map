<script lang="ts">
	import {
		SvelteFlow,
		Controls,
		Background,
		MiniMap,
		Panel,
		type ColorMode,
		type EdgeTypes,
		MarkerType
	} from '@xyflow/svelte';
	import { nodesState, edgesState, selectedNodeId, clearInput, hasEdgeLabel, nodetype } from '$lib/store.js';
	import {
		StretchVertical,
		StretchHorizontal,
		Pause,
		Play,
		Lasso,
		ArrowDown
	} from '@lucide/svelte';

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

	let selectedNodeOrientation = $state('vertical');

	let shouldPlay = $state(false);
	let shouldArrow = $state(false);

	$effect(() => {
		nodesState.set(nodes);
		edgesState.set(edges);
		selectedNodeInput = clear() || '';
	});

	function onContextMenu(e) {
		e.preventDefault();
		console.log(e);
		mousey = e.clientY;
		mousex = e.clientX;
		showContextMenu = true;
	}
	function handleClickOutside() {
		if (showContextMenu) {
			showContextMenu = false;
		}
	}
	import { onMount } from 'svelte';
	import LassoTool from '$lib/components/LassoTool.svelte';
	onMount(() => {
		window.addEventListener('click', handleClickOutside);
	});

	function handleConnection({ source, target }) {
		edgesState.update((edges) => {
			if (shouldArrow) {
				return [
					...edges,
					{
						id: String(crypto.randomUUID()),
						source,
						target,
						type: selectedEdgeType,
						label: $hasEdgeLabel ? edgeLabelInput : '',
						animated: shouldPlay,
						markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 }
					}
				];
			} else {
				return [
					...edges,
					{
						id: String(crypto.randomUUID()),
						source,
						target,
						type: selectedEdgeType,
						label: $hasEdgeLabel ? edgeLabelInput : '',
						animated: shouldPlay
					}
				];
			}
		});
	}

	function handleNodeClick(e) {
		selectedNodeInput = e.node.data.label;
		selectedNodeId.set(e.node.id);
		currenntNodeId = e.node.id;
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
	function handleEdgeLabelInputChange() {
		if (edgeLabelInput != '') {
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

	let isLassoActive = $state(false);
	let partial = $state(true);

	let colorMode: ColorMode = $state('light');

	import NormalInput from '$lib/components/nodeTypes/NormalHorizontal/NormalInput.svelte';
	import NormalDefault from '$lib/components/nodeTypes/NormalHorizontal/NormalDefault.svelte';
	import NormalOutput from '$lib/components/nodeTypes/NormalHorizontal/NormalOutput.svelte';
	import VNormalDefault from '$lib/components/nodeTypes/NormalVertical/vNormalDefault.svelte';
	import VNormalInput from '$lib/components/nodeTypes/NormalVertical/vNormalInput.svelte';
	import VNormalOutput from '$lib/components/nodeTypes/NormalVertical/vNormalOutput.svelte';
	import GroupDefault from '$lib/components/nodeTypes/GroupHorizontal/GroupDefault.svelte';
	import GroupInput from '$lib/components/nodeTypes/GroupHorizontal/GroupInput.svelte';
	import GroupOutput from '$lib/components/nodeTypes/GroupHorizontal/GroupOutput.svelte';
	import VGroupDefault from '$lib/components/nodeTypes/GroupVertical/vGroupDefault.svelte';
	import VGroupInput from '$lib/components/nodeTypes/GroupVertical/vGroupInput.svelte';
	import VGroupOutput from '$lib/components/nodeTypes/GroupVertical/vGroupOutput.svelte';
	import TextWallDefault from '$lib/components/nodeTypes/TextWallHorizontal/TextWallDefault.svelte';
	import TextWallInput from '$lib/components/nodeTypes/TextWallHorizontal/TextWallInput.svelte';
	import TextWallOutput from '$lib/components/nodeTypes/TextWallHorizontal/TextWallOutput.svelte';
	import VTextWallDefault from '$lib/components/nodeTypes/TextWallVertical/vTextWallDefault.svelte';
	import VTextWallInput from '$lib/components/nodeTypes/TextWallVertical/vTextWallInput.svelte';
	import VTextWallOutput from '$lib/components/nodeTypes/TextWallVertical/vTextWallOutput.svelte';
	const nodeTypes = {
		TextWallDefault,
		TextWallInput,
		TextWallOutput,
		VTextWallDefault,
		VTextWallInput,
		VTextWallOutput,

		GroupDefault,
		GroupInput,
		GroupOutput,
		VGroupDefault,
		VGroupInput,
		VGroupOutput,


		NormalInput,
		NormalDefault,
		NormalOutput,
		VNormalDefault,
		VNormalInput,
		VNormalOutput
	};
</script>

<div style:width="100vw" style:height="100vh">
	<div
		class="absolute z-50 flex h-20 w-full items-center justify-center border-b-2 border-[#1b1a34] bg-white p-4"
	>
		<div class="flex h-12 w-full justify-between rounded-4xl bg-[#cddbe975]">
			<input
				type="text"
				placeholder="Node Label"
				oninput={handleNodeInputChange}
				bind:value={selectedNodeInput}
				class="placeholder:text-gray-760 rounded-4xl border-2 border-[#1b1a34] bg-[#cddbe975] text-[#1b1a34]"
			/>
			<input
				type="text"
				placeholder="Connection Label"
				oninput={handleEdgeLabelInputChange}
				bind:value={edgeLabelInput}
				class="placeholder:text-gray-760 rounded-4xl border-2 border-[#1b1a34] bg-[#cddbe975] text-[#1b1a34]"
			/>

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
					onclick={() => {selectedNodeType = 'input'; nodetype.set("input") }}
					style:background={selectedNodeType == 'input' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Input</button
				>
				<button
					onclick={() => {selectedNodeType = 'default'; nodetype.set("default")}}
					style:background={selectedNodeType == 'default' ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="min-w-20 cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					>Default</button
				>
				<button
					onclick={() => {selectedNodeType = 'output'; nodetype.set("output")}}
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
					style:background={shouldPlay ? 'transparent' : '#1b1a34'}
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
			<div class="flex items-center gap-1 rounded-4xl bg-[#928eff]">
				<button
					onclick={() => (isLassoActive = !isLassoActive)}
					style:background={isLassoActive ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					><Lasso /></button
				>
			</div>
			<div class="flex items-center gap-1 rounded-4xl bg-[#928eff]">
				<button
					onclick={() => (shouldArrow = !shouldArrow)}
					style:background={shouldArrow ? '#1b1a34' : 'transparent'}
					style:color="white"
					class="cursor-pointer rounded-4xl border-2 border-[#1b1a34] p-2 hover:bg-[#1b1a34] hover:text-white"
					><ArrowDown /></button
				>
			</div>
		</div>
	</div>
	{#if nodes}
		<SvelteFlow
			{colorMode}
			{nodeTypes}
			onnodeclick={handleNodeClick}
			oncontextmenu={onContextMenu}
			bind:nodes
			bind:edges
			onconnect={handleConnection}
			fitView
			proOptions={{ hideAttribution: true }}
		>
			<Background />
			<ContextMenu
				{showContextMenu}
				{mousex}
				{mousey}
				nodeType={selectedNodeType}
				orientation={selectedNodeOrientation}
			/>
			<MiniMap />
			<Controls />
			{#if isLassoActive}
				<LassoTool {partial} />
				<Panel class="text-red-600" position="bottom-center">Lasso Mode is Active</Panel>
			{/if}
		</SvelteFlow>
	{/if}
</div>
