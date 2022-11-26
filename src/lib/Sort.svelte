<script lang="ts" context="module">
	export interface SortLabels {
		asc?: { title: string; html: string };
		desc?: { title: string; html: string };
		unsorted?: { title: string; html: string };
	}

	let globalLabels: SortLabels;

	export function setSortLabels(labels: SortLabels) {
		globalLabels = labels;
	}
</script>

<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { STATE_KEY, type State } from './state';
	const dispatch = createEventDispatcher();
	const stateContext = getContext<State>(STATE_KEY);

	export let dir = 'none';
	export let key: string;
	export let labels: SortLabels = {
		asc: { title: 'Ascending', html: '&#8593;' },
		desc: { title: 'Desceding', html: '&#8595;' },
		unsorted: { title: 'Unsorted', html: '&#8645;' },
		...globalLabels
	};

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
