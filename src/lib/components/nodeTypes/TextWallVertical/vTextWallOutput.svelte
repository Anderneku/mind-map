<script lang="ts">
	import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/svelte';

	let { data, sourcePosition, targetPosition }: NodeProps = $props();
</script>


<NodeResizer minWidth={100} minHeight={30} color="#9e86ed" />
<div
	style="width:100%; display:flex;  justify-content:center; align-items:center;  padding:20px; background: #1b1a34; border-radius: 10px; height:100%; color: white;"
>
	<p style=" width:100%; text-align:center; word-wrap:break-word; font-size:12pt;">{data.label}</p>
</div>
<Handle style="width:10px; height:10px;"  type="target" position={Position.Top} />
