import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialNodes = [
	{
		id: String(crypto.randomUUID()),
		position: { x: 0, y: 0 },
		data: { label: 'Hello' }
	},
	{
		id: String(crypto.randomUUID()),
		position: { x: 100, y: 100 },
		data: { label: 'World' }
	}
];
let initialEdges = [];
if (browser) {
	const storedNodes = localStorage.getItem('nodesState');
	if (storedNodes && storedNodes !== 'undefined') {
		initialNodes = JSON.parse(storedNodes) ?? [];
	}
	const storedEdges = localStorage.getItem('edgesState');
	if (storedEdges && storedEdges !== 'undefined') {
		initialEdges = JSON.parse(storedEdges) ?? [];
	}
}

export const nodesState = writable(initialNodes);
export const edgesState = writable(initialEdges);

export const selectedNodeId = writable('');
export const clearInput = writable(false);

export const nodeOrientation = writable('vertical');

export const hasEdgeLabel = writable(false);
export const edgeLabel = writable('');


if (browser) {
	nodesState.subscribe((value) => {
		localStorage.setItem('nodesState', JSON.stringify(value));
	});
	edgesState.subscribe((value) => {
		localStorage.setItem('edgesState', JSON.stringify(value));
	});
}
