<script lang="ts">
	import { DEFAULT_SORT_LABELS } from '$lib/constants';
	import type { SortDirection, SortEventArgs, SortLabels } from '$lib/interfaces';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let dir: SortDirection | 'none' = 'none';
	export let key: string;
	export let labels: SortLabels = DEFAULT_SORT_LABELS;
	export let type = 'string';

	$: selected = dir === 'asc' ? labels.asc : dir === 'desc' ? labels.desc : labels.unsorted;

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

<button class="sort" title={selected?.title} on:click={onClick}>
	{@html selected?.html}
</button>

<style>
	.sort {
		right: 0;
		cursor: pointer;
		position: absolute;
		padding: 0 0.25em;
		color: #999;
	}
</style>
