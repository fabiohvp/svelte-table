<script lang="ts">
	import { DEFAULT_SORT_LABELS } from '$lib/constants';
	import type { SortEventArgs, SortLabels } from '$lib/interfaces';
	import { createEventDispatcher } from 'svelte';
	import type { SortDirection } from './sort';

	const dispatch = createEventDispatcher();

	export let dir: SortDirection | 'none' = 'none';
	export let key: string;
	export let labels: SortLabels = DEFAULT_SORT_LABELS;
	export let type = 'string';

	function onClick(event: MouseEvent) {
		dir = dir === 'desc' ? 'asc' : 'desc';

		const detail: SortEventArgs = {
			originalEvent: event,
			dir,
			key,
			type
		};
		dispatch('sort', detail);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="sort" on:click={onClick}>
	{#if dir === 'asc'}
		<span title={labels.asc?.title}>
			{@html labels.asc?.html}
		</span>
	{:else if dir === 'desc'}
		<span title={labels.desc?.title}>
			{@html labels.desc?.html}
		</span>
	{:else}
		<span title={labels.unsorted?.title}>
			{@html labels.unsorted?.html}
		</span>
	{/if}
</span>

<style>
	.sort {
		right: 0;
		cursor: pointer;
		position: absolute;
		padding: 0 0.25em;
		color: #999;
	}
</style>
