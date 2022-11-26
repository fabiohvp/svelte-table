<script lang="ts">
	import { DEFAULT_SORT_LABELS } from '$lib/constants';
	import { STATE_KEY, type SortLabels, type State } from '$lib/state';
	import { createEventDispatcher, getContext } from 'svelte';
	const dispatch = createEventDispatcher();
	const stateContext = getContext<State>(STATE_KEY);

	export let dir = 'none';
	export let key: string;
	export let labels: SortLabels = DEFAULT_SORT_LABELS;

	function onClick(event: MouseEvent) {
		const state = stateContext.getState();
		let rows;

		const detail = {
			originalEvent: event,
			key,
			dir: dir !== 'desc' ? 'desc' : 'asc',
			preventDefault: false,
			rows: state.filteredRows
		};

		dispatch('sort', detail);

		if (detail.preventDefault !== true) {
			dir = detail.dir;
		}
		stateContext.setRows(detail.rows);
	}
</script>

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
