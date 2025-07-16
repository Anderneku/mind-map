<script lang="ts">
	import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/svelte';

	let { data, sourcePosition, targetPosition }: NodeProps = $props();
</script>

<p>{data.label}</p>
<NodeResizer minWidth={100} minHeight={30} color="#9e86ed" />
<div
	style="width:100%; display:flex; text-align:center; justify-content:center; padding:20px; background: transparent; border-radius: 10px; height:100%; color: #1b1a34;"
>
</div>
<Handle style="width:10px; height:10px;" type="target" position={Position.Top} />
