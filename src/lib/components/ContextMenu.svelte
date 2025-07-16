<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { Position, useSvelteFlow } from '@xyflow/svelte';
	import { nodesState, selectedNodeId, clearInput } from '$lib/store.js';
	import { onMount } from 'svelte';

	let mouseX = 0;
	let mouseY = 0;

	// Set up listener once
	onMount(() => {
		const updateMouse = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		window.addEventListener('mousemove', updateMouse);

		return () => {
			window.removeEventListener('mousemove', updateMouse);
		};
	});

	let newNodeId;
	let { showContextMenu, mousey, mousex, nodeType, orientation } = $props();

	const { screenToFlowPosition } = useSvelteFlow();
	function addNewNode(e) {
		clearInput.set(true);
		newNodeId = String(crypto.randomUUID());
		selectedNodeId.set(newNodeId);
		if (orientation == "vertical"){

			const newNode: Node = {
				id: newNodeId,
				type: nodeType,
				data: { label: `Node #${$nodesState.length + 1}` },
				// project the screen coordinates to pane coordinates
				position: screenToFlowPosition({
					x: mouseX,
					y: mouseY
				})
				// set the origin of the new node so it is centered
			};
			nodesState.update((nodes) => {
				return [...nodes, newNode];
			});
		} else{
			if (nodeType == "default"){
				const newNode: Node = {
					id: newNodeId,
					type: nodeType,
					sourcePosition: Position.Right,
					targetPosition: Position.Left,
					data: { label: `Node #${$nodesState.length + 1}` },
					// project the screen coordinates to pane coordinates
					position: screenToFlowPosition({
						x: mouseX,
						y: mouseY
					})
					// set the origin of the new node so it is centered
				};
				nodesState.update((nodes) => {
					return [...nodes, newNode];
				});
			} else if (nodeType == "input"){
				const newNode: Node = {
					id: newNodeId,
					type: nodeType,
					sourcePosition: Position.Right,
					data: { label: `Node #${$nodesState.length + 1}` },
					// project the screen coordinates to pane coordinates
					position: screenToFlowPosition({
						x: mouseX,
						y: mouseY
					})
					// set the origin of the new node so it is centered
				};
				nodesState.update((nodes) => {
					return [...nodes, newNode];
				});
				
			} else if (nodeType == "output"){
				const newNode: Node = {
					id: newNodeId,
					type: nodeType,
					targetPosition: Position.Left,
					data: { label: `Node #${$nodesState.length + 1}` },
					// project the screen coordinates to pane coordinates
					position: screenToFlowPosition({
						x: mouseX,
						y: mouseY
					})
					// set the origin of the new node so it is centered
				};
				nodesState.update((nodes) => {
					return [...nodes, newNode];
				});

			}

		}
	}
</script>

{#if showContextMenu}
	<div
		class="absolute z-50 w-72 rounded-md border-2 border-[#1b1a34] bg-white shadow-lg"
		style="position: absolute; top: {mousey}px; left: {mousex}px;"
	>
		<ul class="space-y-1">
			<li
				onclick={addNewNode}
				class="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-[#1b1a34] hover:text-white"
			>
				<Plus /> Add a Node
			</li>
			<li
				class="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-[#1b1a34] hover:text-white"
			>
				🖨️ Print
			</li>
			<li
				class="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-[#1b1a34] hover:text-white"
			>
				🌙 Toggle Dark Mode
			</li>
		</ul>
	</div>
{/if}
