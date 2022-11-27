<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { DEFAULT_TABLE_LABELS } from './constants';
	import type { SortEventArgs, SortLabels } from './interfaces';
	const dispatch = createEventDispatcher();

	export let dir = 'none';
	export let key: string;
	export let labels: SortLabels = DEFAULT_TABLE_LABELS.sort;

	function onClick(event: MouseEvent) {
		const detail: SortEventArgs = {
			originalEvent: event,
			key,
			dir: dir === 'desc' ? 'asc' : 'desc'
		};
		dispatch('sort', detail);

		if (!event.defaultPrevented) {
			dir = detail.dir;
		}
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
