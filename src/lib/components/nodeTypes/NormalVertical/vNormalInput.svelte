<script lang="ts">
	import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/svelte';

	let { data, sourcePosition, targetPosition }: NodeProps = $props();
</script>

<Handle style="width:10px; height:10px;" type="source" position={Position.Bottom} />
<div class="px-8">
	{data.label}
</div>
