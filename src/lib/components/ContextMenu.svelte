<script lang="ts">
	import { Plus, NotebookPen, Group, AlignJustify } from '@lucide/svelte';
	import { Position, useSvelteFlow } from '@xyflow/svelte';
	import { nodesState, selectedNodeId, clearInput } from '$lib/store.js';
	import { onMount } from 'svelte';
	import { nonpassive } from 'svelte/legacy';

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
	function addNewNode() {
		clearInput.set(true);
		newNodeId = String(crypto.randomUUID());
		selectedNodeId.set(newNodeId);
		if (orientation == 'vertical') {
			if (nodeType == 'default') {
				const newNode: Node = {
					id: newNodeId,
					style: "z-index:100",
					zIndex: 100,
					type: 'VNormalDefault',
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
			} else if (nodeType == 'input') {
				const newNode: Node = {
					id: newNodeId,
					zIndex: 100,
					style: "z-index:100",
					type: 'VNormalInput',
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
			} else if (nodeType == 'output') {
				const newNode: Node = {
					id: newNodeId,
					zIndex: 100,
					style: "z-index:100",
					type: 'VNormalOutput',
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
		} else {
			if (nodeType == 'default') {
				const newNode: Node = {
					id: newNodeId,
					zIndex: 100,
					style: "z-index:100",
					type: 'NormalDefault',
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
			} else if (nodeType == 'input') {
				const newNode: Node = {
					id: newNodeId,
					zIndex: 100,
					style: "z-index:100",
					type: 'NormalInput',
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
			} else if (nodeType == 'output') {
				const newNode: Node = {
					id: newNodeId,
					zIndex: 100,
					style: "z-index:100",
					type: 'NormalOutput',
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

	function addNewTextWall() {
		newNodeId = String(crypto.randomUUID());
		if (orientation == 'vertical') {
			if (nodeType == 'default') {
				const newNode: Node = {
					id: newNodeId,
					type: 'VTextWallDefault',
					style: "background: transparent",
					zIndex: 10,
					data: { label: `TextWall #${$nodesState.length + 1}` },
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
			} else if (nodeType == 'input') {
				const newNode: Node = {
					id: newNodeId,
					zIndex: 10,
					style: "background: transparent",
					type: 'VTextWallInput',
					data: { label: `TextWall #${$nodesState.length + 1}` },
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
			} else if (nodeType == 'output') {
				const newNode: Node = {
					id: newNodeId,
					zIndex: 10,
					style: "background: transparent",
					type: 'VTextWallOutput',
					data: { label: `TextWall #${$nodesState.length + 1}` },
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
		} else {
			if (nodeType == 'default') {
				const newNode: Node = {
					id: newNodeId,
					zIndex: 10,
					style: "background: transparent",
					type: 'TextWallDefault',
					data: { label: `TextWall #${$nodesState.length + 1}` },
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
			} else if (nodeType == 'input') {
				const newNode: Node = {
					id: newNodeId,
					style: "background: transparent",
					type: 'TextWallInput',
					zIndex: 10,
					data: { label: `TextWall #${$nodesState.length + 1}` },
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
			} else if (nodeType == 'output') {
				const newNode: Node = {
					id: newNodeId,
					type: 'TextWallOutput',
					style: "background: transparent",
					zIndex: 10,
					data: { label: `TextWall #${$nodesState.length + 1}` },
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

	function addNewGroup() {
		newNodeId = String(crypto.randomUUID());
		if (orientation == 'vertical') {
			if (nodeType == 'default') {
				const newNode: Node = {
					id: newNodeId,
					type: 'VGroupDefault',
					style: "background: transparent",
					zIndex: 10,
					data: { label: `"Group" #${$nodesState.length + 1}` },
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
			} else if (nodeType == 'input') {
				const newNode: Node = {
					id: newNodeId,
					style: "background: transparent",
					type: 'VGroupInput',
					zIndex: 10,
					data: { label: `Group #${$nodesState.length + 1}` },
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
			} else if (nodeType == 'output') {
				const newNode: Node = {
					id: newNodeId,
					style: "background: transparent",
					type: 'VGroupOutput',
					zIndex: 10,
					data: { label: `Group #${$nodesState.length + 1}` },
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
		} else {
			if (nodeType == 'default') {
				const newNode: Node = {
					id: newNodeId,
					type: 'GroupDefault',
					style: "background: transparent",
					zIndex: 10,
					data: { label: `"Group" #${$nodesState.length + 1}` },
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
			} else if (nodeType == 'input') {
				const newNode: Node = {
					id: newNodeId,
					type: 'GroupInput',
					style: "background: transparent",
					zIndex: 10,
					data: { label: `Group #${$nodesState.length + 1}` },
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
			} else if (nodeType == 'output') {
				const newNode: Node = {
					id: newNodeId,
					type: 'GroupOutput',
					style: "background: transparent",
					zIndex: 10,
					data: { label: `Group #${$nodesState.length + 1}` },
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
		<ul class="flex flex-col justify-center space-y-1">
			<li
				onclick={addNewNode}
				class="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-[#1b1a34] hover:text-white"
			>
				<Plus size="20" />Add a Node
			</li>
			<li
				onclick={addNewTextWall}
				class="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-[#1b1a34] hover:text-white"
			>
				<AlignJustify size="20" />Add a Text Wall
			</li>
			<li
				onclick={addNewGroup}
				class="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-[#1b1a34] hover:text-white"
			>
				<Group size="20" />Add a Group
			</li>
			<li class="flex cursor-default items-center gap-4 px-4 py-2 text-gray-500">
				<NotebookPen size="20" />Backspace to delete
			</li>
		</ul>
	</div>
{/if}
